"""Rapprochement facture fournisseur / bon de commande (Excel).

Module purement additif : il ne touche a aucune table existante et sert de
moteur de comparaison "programmatique" entre un fichier FACTURE et un fichier
BON DE COMMANDE, tous deux au format Excel (.xlsx) a structure de colonnes
identique : Item Code / Description / Quantity / Unit Price.

Equivalents Excel mis en oeuvre ici :

* RECHERCHEV : la correspondance de ligne est basee sur le code article.
  Un index {code -> [index des lignes restantes du PO]} joue la colonne de
  recherche ; le premier doublon non consomme est aligne comme le ferait
  RECHERCHEV sur la premiere occurrence non vide.
* Tableau croise dynamique : un second passe regroupe par code article les
  quantites et montants (qte * prix) cumules cote facture vs cote PO pour
  faire ressortir tout ecart cumule qu'une comparaison ligne a ligne
  masquerait (doublons, lignes en trop, ecarts de total).
* Conditionnel strict : une ligne est valide (statuts exacts) uniquement si
  les QUATRE colonnes matchent a l'identique apres normalisation :
  - statut "oui"  -> correspondance parfaite (code + description + qte + prix)
  - statut "neuf" -> toute divergence, erreur, code absent ou ligne en trop.

La normalisation delimite la comparaison : les decimaux sont compares via
decimal.Decimal quantises (qte 0.000001, prix 0.0001) pour absorber le bruit
machine des nombres flottants Excel ; les textes sont compares en minuscules
sans accents ni espaces superflus.
"""

import csv
import io
import re
import time
import unicodedata
from collections import defaultdict, deque
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP

import openpyxl

# Exporte en README/setup : openpyxl est deja present dans requirements.txt.
# Alternative cote client : SheetJS (xlsx) pour un parsing navigateur ; ici le
# parsing est effectue cote serveur pour la securite (validation des colonnes,
# limites de taille, aucun stockage du fichier brut).

MAX_RECONCILE_ROWS = 5000

# Depouillement des accents (e -> e, ca -> a, ...) via decomposition NFD.
_ACCENT_RE = re.compile(r"[\u0300-\u036f]")


def fold(text):
    """Supprime les accents d'une chaine (insensible aux accents)."""
    if text is None:
        return ""
    norm = unicodedata.normalize("NFD", str(text))
    return _ACCENT_RE.sub("", norm)


def norm_text(value):
    """Texte compare : minuscules, sans accents, espaces coalesces."""
    return re.sub(r"\s+", " ", fold(str(value)).strip().lower())


def norm_code(value):
    """Code article compare : en majuscules, sans accents ni espaces."""
    return re.sub(r"\s+", "", fold(str(value)).strip().upper())


def to_decimal(value, only_positive=False):
    """Convertit n'importe quelle valeur Excel en Decimal strict.

    Gere les entiers/floats (via ``repr`` pour eviter le bruit binaire),
    les chaines tel que "$1 234.56", "1 234,56", "1,99", plus/moins.
    Retourne ``None`` si la valeur n'est pas un nombre utilisable.
    """
    if value is None or isinstance(value, bool):
        return None
    if isinstance(value, Decimal):
        d = value
    elif isinstance(value, (int, float)):
        try:
            d = Decimal(value if isinstance(value, int) else repr(value))
        except InvalidOperation:
            return None
    else:
        raw = re.sub(r"[^0-9+\-.,]", "", str(value).strip())
        if not raw:
            return None
        if "," in raw and "." in raw:
            # Le dernier separateur est le decimal ; l'autre est un millier.
            if raw.rfind(",") > raw.rfind("."):
                raw = raw.replace(".", "").replace(",", ".")
            else:
                raw = raw.replace(",", "")
        elif "," in raw:
            raw = raw.replace(",", ".")
        if raw in ("", "-", "+", ".", ",", "-.", "+."):
            return None
        try:
            d = Decimal(raw)
        except InvalidOperation:
            return None
    if not d.is_finite():
        return None
    if only_positive and d < 0:
        return None
    return d


def qdec(value, dp):
    """Quantise un Decimal a ``dp`` decimales (arrondi bancaire demi-sup)."""
    return value.quantize(Decimal(1).scaleb(-dp), rounding=ROUND_HALF_UP)


def json_num(d):
    """Decimal -> float arrondi propre pour la reponse JSON."""
    if d is None:
        return None
    return round(float(d), 4)


def qty_eq(a, b):
    """Egalite machine des quantites (tol. 1e-6)."""
    if a is None or b is None:
        return False
    return qdec(a, 6) == qdec(b, 6)


def price_eq(a, b):
    """Egalite machine des prix unitaires (tol. 1e-4)."""
    if a is None or b is None:
        return False
    return qdec(a, 4) == qdec(b, 4)


def desc_eq(a, b):
    """Egalite des descriptions apres normalisation."""
    return norm_text(a) == norm_text(b)


# Alias de colonnes reconnus (insensibles aux accents / a la casse et a
# l'ordre des colonnes). Identification = colonnes "strictes" du spec.
_COLUMN_ALIASES = {
    "code": {
        "item code", "code", "code article", "code article produit",
        "article code", "article #", "item #", "item no", "sku",
        "ref", "reference", "code produit", "code sku", "produit #",
    },
    "description": {
        "description", "designation", "libelle", "item description",
        "product description", "produit", "product", "article",
        "designation article",
    },
    "quantity": {
        "quantity", "quantite", "qty", "qte", "qt", "qnt", "quant",
        "unit", "units", "unite", "unit quantity", "quantite commandee",
        "quantity ordered", "qty ordered", "quantite facturee",
    },
    "unit price": {
        "unit price", "prix unitaire", "price", "prix", "unit cost",
        "cout unitaire", "prix unitaire", "price unit", "unit",
        "prix de vente", "price per unit",
    },
}


def _lookup_column(value):
    """Nom de colonne canonique pour une en-tete donnee, ou ``None``."""
    key = norm_text(value)
    for canonical, aliases in _COLUMN_ALIASES.items():
        # compare aussi sans espaces pour "Item  Code"/"Prix Unitaire"
        if key in aliases or re.sub(r"\s+", "", key) in {re.sub(r"\s+", "", a) for a in aliases}:
            return canonical
    return None


class ReconcileError(Exception):
    """Erreur structurelle du rapprochement (code exploitable cote UI)."""

    def __init__(self, code, message, missing=None):
        super().__init__(message)
        self.code = code          # xls / columns / rows / empty / big
        self.message = message
        self.missing = missing or []   # colonnes manquantes (canonical keys)


def _find_header(rows_iterable):
    """Detecte la ligne d'en-tete (4 colonnes requises, ordre libre).

    Parcourt les premieres lignes a la recherche d'une combinaison contenant
    code + description + quantite + prix. Retourne
    ``(mapping, labels, header_idx)`` ou ``mapping`` traduit la colonne
    canonique -> index, ``labels`` la colonne canonique -> libelle reel.
    """
    for idx, row in enumerate(rows_iterable):
        if idx >= 40:
            break
        mapping = {}
        labels = {}
        for col_idx, cell in enumerate(row):
            canonical = _lookup_column(cell)
            if canonical is not None:
                mapping[canonical] = col_idx
                labels[canonical] = str(cell).strip() if cell is not None else ""
        if {"code", "description", "quantity", "unit price"} <= set(mapping):
            return mapping, labels, idx
    return None, None, None


def _is_total_row(values):
    """Ignorer les lignes de totaux / sous-totaux (code vide + marqueur)."""
    desc = norm_text(values.get("description") or "")
    return desc in {
        "total", "totaux", "subtotal", "sous-total", "grand total",
        "total general", "somme", "tva", "remise", "discount", "rabais",
    }


def _extract_rows_cols(mapping, future_rows):
    """Consomme les lignes de donnees : conversion en dict colonnes canoniques.

    Lignes vides ou de totaux ecartees. Limite MAX_RECONCILE_ROWS.
    """
    rows = []
    for row in future_rows:
        if len(rows) >= MAX_RECONCILE_ROWS:
            raise ReconcileError(
                "big",
                "Trop de lignes (max %d)" % MAX_RECONCILE_ROWS,
            )
        if not isinstance(row, (tuple, list)):
            continue
        values = {}
        for canonical, col_idx in mapping.items():
            cell = row[col_idx] if col_idx < len(row) else None
            if isinstance(cell, str):
                values[canonical] = cell.strip()
            else:
                values[canonical] = cell
        code = norm_code(values.get("code") or "")
        has_data = any(v is not None for v in values.values())
        if not has_data:
            continue
        if _is_total_row(values):
            continue
        if not code and not norm_text(values.get("description") or ""):
            continue
        rows.append(values)
    return rows


def parse_excel_bytes(data, filename):
    """Analyse un fichier .xlsx / .csv / .xls en lignes normalisees.

    Renvoie ``(mapping, labels, rows, meta)`` ou
      * mapping : {canonical: col_idx} positions des colonnes detectees,
      * labels  : {canonical: "libelle reel"} pour la synthese,
      * rows    : liste de dicte {code, description, quantity, unit price},
      * meta    : {sheet, header_row}.
    """
    lower = filename.lower()
    if lower.endswith(".xls") and not lower.endswith(".xlsx"):
        raise ReconcileError(
            "xls",
            "Les fichiers .xls classiques ne sont pas supportes : "
            "reexportez en .xlsx ou en .csv.",
        )
    if lower.endswith(".csv"):
        return _parse_csv(data, filename)

    if not openpyxl:
        raise ReconcileError(
            "columns", "openpyxl indisponible : impossible d'analyser la facture."
        )

    try:
        wb = openpyxl.load_workbook(io.BytesIO(data), read_only=True, data_only=True)
    except Exception:
        raise ReconcileError("columns", "Fichier Excel invalide.")

    # Selection du premier onglet contenant la structure de colonnes attendue
    # (le plus souvent le seul onglet d'une facture / commande).
    for ws in wb.worksheets:
        all_rows = list(ws.iter_rows(values_only=True))
        if not all_rows:
            continue
        mapping, labels, header_idx = _find_header(iter(all_rows))
        if mapping is None:
            continue
        rows = _extract_rows_cols(mapping, all_rows[header_idx + 1:])
        return mapping, labels, rows, {"sheet": ws.title, "header_row": header_idx + 1}
    wb.close()
    raise ReconcileError(
        "columns",
        "En-tetes introuvables. Colonnes requises : Item Code, Description, "
        "Quantity, Unit Price.",
    )


def _parse_csv(data, filename):
    """Variante CSV (stdlib) : memes regles de normalisation que l'Excel."""
    text = data.decode("utf-8-sig", errors="replace")
    sample = text[:4096]
    try:
        dialect = csv.Sniffer().sniff(sample, delimiters=",;\t|")
    except csv.Error:
        dialect = csv.excel
    reader = csv.reader(io.StringIO(text), dialect)
    all_rows = list(reader)
    mapping, labels, header_idx = _find_header(iter(all_rows))
    if mapping is None:
        raise ReconcileError(
            "columns",
            "En-tetes CSV introuvables. Colonnes requises : Item Code, "
            "Description, Quantity, Unit Price.",
        )
    rows = _extract_rows_cols(mapping, all_rows[header_idx + 1:])
    return mapping, labels, rows, {"sheet": "CSV", "header_row": header_idx + 1}


def _decimal_pair(row, canonical):
    """Quantite / prix extraits d'une ligne normalisee (Decimal ou None)."""
    value = row.get(canonical)
    if isinstance(value, bool):
        return None
    return to_decimal(value)


def match_invoice_po(invoice_rows, po_rows):
    """Cœur du moteur : simulation RECHERCHEV + tableau croise dynamique.

    Algorithme en deux passes sur le PO :

    1) Pass "exact" : chaque ligne facture avec un code repertorie est jumelée
       a une ligne PO non consommee de meme code dont qte, prix ET description
       correspondent ; statut "oui".
    2) Pass "residuel" : les lignes facture restantes consomment la premiere
       ligne PO non consommee de meme code (le "premier doublon" comme
       RECHERCHEV) et recoivent "neuf" avec la raison exacte de l'ecart.
    3) Les lignes PO jamais consommees sont des lignes en trop : "neuf".

    Un deuxieme passe par code article (pivot) verifie les totaux cumules
    qte/montant facture vs PO pour reveler tout desequilibre sous-jacent.
    """
    # Index du PO par code article (RECHERCHEV). deque = premier doublon restant.
    po_by_code = defaultdict(deque)
    for idx, row in enumerate(po_rows):
        code = norm_code(row.get("code") or "")
        if code:
            po_by_code[code].append(idx)

    consumed = set()
    results = []
    oui = 0
    neuf = 0

    def make_row(row, status, reason):
        return {
            "status": status,
            "reason": reason,
            "code": norm_code(row.get("code") or ""),
            "inv_desc": row.get("description") or "",
            "inv_qty": json_num(_decimal_pair(row, "quantity")),
            "inv_price": json_num(_decimal_pair(row, "unit price")),
        }

    # --- Passe 1 : jumelages parfaits (oui) ---
    pending_inv = []
    for row in invoice_rows:
        code = norm_code(row.get("code") or "")
        iq = _decimal_pair(row, "quantity")
        ip = _decimal_pair(row, "unit price")
        desc_n = norm_text(row.get("description") or "")
        candidate = None
        for pidx in list(po_by_code.get(code, [])):
            if pidx in consumed:
                continue
            pr = po_rows[pidx]
            pq = _decimal_pair(pr, "quantity")
            pp = _decimal_pair(pr, "unit price")
            if (qty_eq(iq, pq) and price_eq(ip, pp)
                    and (not desc_n or desc_eq(row.get("description"), pr.get("description")))):
                candidate = pidx
                break
        if candidate is None:
            pending_inv.append((row, iq, ip, desc_n, code))
            continue
        consumed.add(candidate)
        pr = po_rows[candidate]
        out = make_row(row, "oui", None)
        out.update({
            "po_desc": pr.get("description") or "",
            "po_qty": json_num(_decimal_pair(pr, "quantity")),
            "po_price": json_num(_decimal_pair(pr, "unit price")),
            "diff_qty": 0.0,
            "diff_price": 0.0,
        })
        results.append(out)
        oui += 1

    # --- Passe 2 : lignes facture restantes -> premier doublon PO non consomme.
    for row, iq, ip, desc_n, code in pending_inv:
        remaining = [pidx for pidx in po_by_code.get(code, []) if pidx not in consumed]
        if not remaining:
            if not code:
                reason = "missing"
            elif code in po_by_code:
                reason = "match"          # code present mais plus de ligne restante
            else:
                reason = "code"           # jamais present dans le PO
            out = make_row(row, "neuf", reason or "code")
            out.update({"po_desc": "", "po_qty": None, "po_price": None,
                        "diff_qty": None, "diff_price": None})
            results.append(out)
            neuf += 1
            continue
        pidx = remaining[0]
        consumed.add(pidx)
        pr = po_rows[pidx]
        pq = _decimal_pair(pr, "quantity")
        pp = _decimal_pair(pr, "unit price")
        # Ordre de raison : valeur manquante > prix > quantite > description.
        if iq is None or ip is None or pq is None or pp is None:
            reason = "missing"
        elif not price_eq(ip, pp):
            reason = "price"
        elif not qty_eq(iq, pq):
            reason = "qty"
        elif not desc_eq(row.get("description"), pr.get("description")):
            reason = "description"
        else:
            reason = "code"  # jamais atteint ; garde defensive
        out = make_row(row, "neuf", reason or "code")
        out.update({
            "po_desc": pr.get("description") or "",
            "po_qty": json_num(pq),
            "po_price": json_num(pp),
            "diff_qty": json_num(iq - pq) if iq is not None and pq is not None else None,
            "diff_price": json_num(ip - pp) if ip is not None and pp is not None else None,
        })
        results.append(out)
        neuf += 1

    # --- Passe 3 : lignes PO sans aucune ligne facture correspondante ---
    for idx, pr in enumerate(po_rows):
        code = norm_code(pr.get("code") or "")
        if idx in consumed or not code:
            continue
        pq = _decimal_pair(pr, "quantity")
        pp = _decimal_pair(pr, "unit price")
        out = {
            "status": "neuf",
            "reason": "extra",           # ligne presente dans le PO, absente de la facture
            "code": code,
            "inv_desc": "",
            "inv_qty": None,
            "inv_price": None,
            "po_desc": pr.get("description") or "",
            "po_qty": json_num(pq),
            "po_price": json_num(pp),
            "diff_qty": json_num(-pq) if pq is not None else None,
            "diff_price": json_num(-pp) if pp is not None else None,
        }
        results.append(out)
        neuf += 1

    # --- Tableau croise dynamique : totaux cumules par code article ---
    pivot_map = {}
    for row in invoice_rows:
        code = norm_code(row.get("code") or "")
        if not code:
            continue
        q = _decimal_pair(row, "quantity") or Decimal(0)
        p = _decimal_pair(row, "unit price") or Decimal(0)
        agg = pivot_map.setdefault(code, {"iq": Decimal(0), "ia": Decimal(0), "n": 0})
        agg["iq"] += q
        agg["ia"] += q * p
        agg["n"] += 1
    for idx, pr in enumerate(po_rows):
        code = norm_code(pr.get("code") or "")
        if not code:
            continue
        q = _decimal_pair(pr, "quantity") or Decimal(0)
        p = _decimal_pair(pr, "unit price") or Decimal(0)
        agg = pivot_map.setdefault(code, {"iq": Decimal(0), "ia": Decimal(0), "n": 0})
        if "pq" not in agg:
            agg["pq"] = Decimal(0)
            agg["pa"] = Decimal(0)
            agg["pn"] = 0
        agg["pq"] += q
        agg["pa"] += q * p
        agg["pn"] += 1
    pivot = []
    for code, agg in pivot_map.items():
        iq = agg.get("iq", Decimal(0))
        ia = agg.get("ia", Decimal(0))
        pq = agg.get("pq", Decimal(0))
        pa = agg.get("pa", Decimal(0))
        ok = (qty_eq(iq, pq) and price_eq(ia, pa))
        pivot.append({
            "code": code,
            "inv_qty": json_num(iq),
            "po_qty": json_num(pq),
            "inv_amount": json_num(ia),
            "po_amount": json_num(pa),
            "status": "oui" if ok else "neuf",
        })

    return {
        "rows": results,
        "pivot": pivot,
        "oui": oui,
        "neuf": neuf,
    }


def reconcile_bytes(invoice_data, invoice_name, po_data, po_name):
    """Point d'entree serveur : analyse + comparaison + synthese complete."""
    inv_header, inv_labels, inv_rows, inv_meta = parse_excel_bytes(invoice_data, invoice_name)
    po_header, po_labels, po_rows, po_meta = parse_excel_bytes(po_data, po_name)

    # Pivot cellule : somme condensee (tableau croise dynamique "$/qte total").
    res = match_invoice_po(inv_rows, po_rows)

    total = len(res["rows"])
    rate = round((res["oui"] / total) * 100, 1) if total else 0.0

    return {
        "ok": True,
        "invoice_file": invoice_name,
        "po_file": po_name,
        "invoice_sheet": inv_meta["sheet"],
        "po_sheet": po_meta["sheet"],
        "columns": inv_labels,
        "generated_at": int(time.time()),
        "stats": {
            "invoice_lines": len(inv_rows),
            "po_lines": len(po_rows),
            "oui": res["oui"],
            "neuf": res["neuf"],
            "line_count": total,
            "rate": rate,
        },
        "rows": res["rows"],
        "pivot": res["pivot"],
    }