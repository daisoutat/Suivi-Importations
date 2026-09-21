# -*- coding: utf-8 -*-
"""
Modules d'intelligence du Chatbot — Industries Radisson.

Fournit, de maniere purement additive et sans dependance vers le code serveur :

  1. Knowledge Graph  : graphe de connaissances relie fournisseurs, fiches,
                        destinations, conteneurs, ports et statuts. Reconstruit
                        de facon paresseuse des que la donnee change
                        (signature de contenu -> refresh_graph).
  2. RAG local        : moteur de recherche lexicale (BM25) sur un corpus
                        construit a partir de la base interne (fiches,
                        fournisseurs, documents telecharges). Le "fine-tuning"
                        local = lexicon metier (FR/EN) + alias + classifieur
                        d'intentions, sans API externe.
  3. Recherche web    : sources live externes (DuckDuckGo Instant Answer puis
                        Wikipedia), mise en cache bornee avec TTL.
                        SEGREGATION STRICTE : un contexte interroge est soit
                        interne (base de donnees) soit externe (web), jamais
                        les deux melanges dans une meme reponse.
  4. Documents        : extraction de texte depuis TXT/MD/CSV/JSON/EML, PDF
                        (pypdf), DOCX (python-docx), XLSX (openpyxl). Les
                        textes extraits rejoignent le corpus RAG interne.
  5. Analyse comm.    : detection proactive de risque de retard dans les
                        communications fournisseurs (mots-clis, dates).
  6. Notifications    : moteur proactif (retards depassant la tolerance,
                        arrives proches, fiches verrouillees, documents
                        manquants), filtre par preferences utilisateur.

Toutes les fonctions prennent une connexion SQLite `conn` en parametre et
n'ecrivent QUE dans leurs propres tables (`kg_nodes`, `kg_edges`,
`assistant_docs`) ; les tables metier restent en lecture seule.
"""
import hashlib
import io
import json
import math
import re
import threading
import time
import unicodedata
import urllib.parse
import urllib.request
from datetime import date, datetime

# --------------------------------------------------------------------------
# Outils textuels generaux (tokenisation, normalisation FR/EN sans accents).
# --------------------------------------------------------------------------

_NFD = re.compile(r"[\u0300-\u036f]")


def _norm(s):
    s = unicodedata.normalize("NFD", str(s or "").lower())
    return _NFD.sub("", s)


def _tokens(s):
    return [t for t in re.findall(r"[a-z0-9]+", _norm(s)) if len(t) >= 2]


def _today():
    return date.today().isoformat()


def _days_until(iso_date):
    if not iso_date:
        return None
    try:
        d = datetime.strptime(iso_date[:10], "%Y-%m-%d").date()
        return (d - date.today()).days
    except (ValueError, TypeError):
        return None


def _arrival_ref(row):
    """Reference d'arrivee pour les calculs de delais/retards/phase :
    ETA DEST (destination) en priorite, repli sur ETA historique.
    Compatible dict et sqlite3.Row."""
    if not row:
        return None
    for key in ("eta_dest", "eta", "eta_van"):
        try:
            v = row[key]
        except (KeyError, IndexError):
            v = None
        v = (v or "").strip()
        if v:
            return v
    return None


def _get_setting(conn, key, default=None):
    row = conn.execute("SELECT value FROM settings WHERE key=?", (key,)).fetchone()
    if row is not None and row["value"] is not None:
        return row["value"]
    return default


# --------------------------------------------------------------------------
# Lexique metier local ("fine-tuning") : vocabulaire logistique FR/EN pondere.
# Utilise pour la recherche, la desambiguation et la classification.
# --------------------------------------------------------------------------

DOMAIN_LEXICON = (
    "fiche import importation arrival arrivee contenaire conteneur container "
    "fournisseur supplier destination port loading discharge etd eta retard "
    "delays overdue customs douane douanes board railway rail douanier "
    "bill lading connaissement connaissement maritime transitaire freight "
    "forwarder po inbsip pallets palettes incoterm fob cif exw ddp dap cfr "
    "cpt cip etf bol consolide consolidation manutention quay quais doc "
    "document invoice facture declaration declarant manifeste empotage "
    "deport dewatering depot ship vessel navire bateau cargo freight freightage "
    "taux rate tarif tariff vat tva duty taxes taxe mnti snit prospect "
    "chaine supply acheminement tracking suivi verrouille locked brouillard "
    "inspection qc qualite reception receiving entrepot warehouse stock"
)

_LEX_TOKENS = frozenset(_tokens(DOMAIN_LEXICON))

_STOP = frozenset(
    "le la les de du des un une et ou mais pour sur avec dans est sont que qui quoi"
    "quel quelle quels quelles mon ma mes ton ta tes ses sa son ce cette ces"
    "the a an and of to for on in with is are what which how many from at by"
    "com comment je tu il elle on nous vous ils merci svp please".split()
)

_SYNONYMS = {
    "arrive": "arrive", "arrivee": "arrive", "arrivees": "arrive",
    "arrivals": "arrive", "arrival": "arrive",
    "retard": "retard", "retards": "retard", "overdue": "retard", "late": "retard",
    "fournisseur": "fournisseur", "fournisseurs": "fournisseur",
    "supplier": "fournisseur", "suppliers": "fournisseur",
    "fournisseurs": "fournisseur",
    "conteneur": "conteneur", "conteneurs": "conteneur",
    "container": "conteneur", "containers": "conteneur",
    "statut": "statut", "status": "statut",
    "document": "document", "documents": "document", "rapport": "document",
    "report": "document", "facture": "document", "invoice": "document",
    "graphique": "graphique", "graph": "graphique", "chart": "graphique",
    "diagramme": "graphique", "diagram": "graphique", "graphe": "graphique",
    "carte": "graphique",
    "alerte": "alerte", "alert": "alerte", "alerte": "alerte",
    "statistique": "statistiques", "stats": "statistiques",
    "statistic": "statistiques", "statistics": "statistiques",
    "nombre": "statistiques", "count": "statistiques",
    "notif": "notif", "notification": "notif", "notifications": "notif",
    "notice": "notif",
    "web": "web", "internet": "web", "enligne": "web", "online": "web",
    "recherche": "web", "search": "web",
    "verrouille": "verrouille", "verrouillee": "verrouille",
    "locked": "verrouille", "lock": "verrouille",
    "aide": "aide", "help": "aide",
}

# --------------------------------------------------------------------------
# Schema assistant (tables purement additionnelles).
# --------------------------------------------------------------------------

SCHEMA_SQL = """
CREATE TABLE IF NOT EXISTS kg_nodes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ntype TEXT NOT NULL,
    label TEXT NOT NULL,
    skey TEXT NOT NULL,
    meta TEXT
);
CREATE INDEX IF NOT EXISTS idx_kg_nodes_skey ON kg_nodes(skey);
CREATE INDEX IF NOT EXISTS idx_kg_nodes_type ON kg_nodes(ntype);
CREATE TABLE IF NOT EXISTS kg_edges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    src INTEGER NOT NULL,
    dst INTEGER NOT NULL,
    rel TEXT NOT NULL,
    weight REAL NOT NULL DEFAULT 1.0,
    meta TEXT
);
CREATE INDEX IF NOT EXISTS idx_kg_edges_src ON kg_edges(src);
CREATE INDEX IF NOT EXISTS idx_kg_edges_dst ON kg_edges(dst);
CREATE TABLE IF NOT EXISTS assistant_docs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    original_name TEXT NOT NULL,
    content_type TEXT,
    size INTEGER,
    parsed INTEGER NOT NULL DEFAULT 0,
    chars INTEGER NOT NULL DEFAULT 0,
    text TEXT,
    import_id INTEGER,
    created_at TEXT
);
"""


def ensure_schema(conn):
    """Cree les tables du module assistant si absentes (additif)."""
    conn.executescript(SCHEMA_SQL)
    conn.commit()


# --------------------------------------------------------------------------
# Knowledge Graph : construction + requetes.
# --------------------------------------------------------------------------

_STATUS_META = {"transit": "#3b82f6", "customs": "#f59e0b", "delivered": "#16a34a"}


def _import_phase(eta, done, total):
    d = _days_until(eta)
    done = done or 0
    total = total or 0
    if total and done >= total:
        return "delivered"
    if d is not None and d < 0:
        return "customs"
    return "transit"


def _upsert_node(conn, ntype, label, skey, meta=None):
    row = conn.execute("SELECT id FROM kg_nodes WHERE skey=?", (skey,)).fetchone()
    if row:
        conn.execute("UPDATE kg_nodes SET label=?, meta=? WHERE id=?",
                     (label, json.dumps(meta, ensure_ascii=False), row["id"]))
        return row["id"]
    cur = conn.execute(
        "INSERT INTO kg_nodes (ntype, label, skey, meta) VALUES (?,?,?,?)",
        (ntype, label, skey, json.dumps(meta, ensure_ascii=False)))
    return cur.lastrowid


def _upsert_edge(conn, src, dst, rel, weight=1.0, meta=None):
    if src == dst or src is None or dst is None:
        return
    cur = conn.execute(
        "INSERT INTO kg_edges (src, dst, rel, weight, meta) VALUES (?,?,?,?,?)",
        (src, dst, rel, float(weight), json.dumps(meta, ensure_ascii=False)))


def graph_signature(conn):
    """Empreinte du contenu metier : ne reconstruit le graphe que si la donnee change."""
    vals = []
    for tbl, cols in (("imports", "COUNT(*), COALESCE(MAX(updated_at),''), COALESCE(MAX(created_at),''), COALESCE(MAX(id),0)"),):
        vals.append(repr(tuple(conn.execute("SELECT %s FROM %s" % (cols, tbl)).fetchone())))
    for tbl, cols in (("suppliers", "COUNT(*), COALESCE(MAX(updated_at),''), COALESCE(MAX(created_at),''), COALESCE(MAX(id),0)"),
                      ("checklist_items", "COUNT(*), COALESCE(MAX(id),0)"),
                      ("assistant_docs", "COUNT(*), COALESCE(MAX(id),0)")):
        vals.append(repr(tuple(conn.execute("SELECT %s FROM %s" % (cols, tbl)).fetchone())))
    return hashlib.sha1("|".join(vals).encode("utf-8")).hexdigest()


_DOC_EXTS = (".txt", ".md", ".markdown", ".csv", ".json", ".eml", ".log", ".html")

_build_lock = threading.Lock()


def _extract_text(name, data, ctype=None):
    """Extrait le texte d'un fichier. Renvoie (texte, note) sans jamais lever."""
    name = str(name or "")
    low = name.lower()
    ext = "." + low.rsplit(".", 1)[-1] if "." in low else ""
    try:
        if ext in (".txt", ".md", ".markdown", ".log", ".csv", ".json", ".html"):
            raw = data.decode("utf-8", errors="replace")
            return _clean_text(raw), "OK (" + (ext or "texte") + ")"
        if ext == ".eml":
            import email
            msg = email.message_from_bytes(data)
            body = ""
            if msg.is_multipart():
                for part in msg.walk():
                    if part.get_content_type() == "text/plain" and part.get_payload(decode=True):
                        body = part.get_payload(decode=True).decode("utf-8", errors="replace")
                        break
            else:
                body = msg.get_payload(decode=True) or ""
                if isinstance(body, bytes):
                    body = body.decode("utf-8", errors="replace")
            head = "\n".join("%s: %s" % (k, v) for k, v in [
                ("Subject", msg.get("Subject") or ""), ("From", msg.get("From") or ""),
                ("Date", msg.get("Date") or "")])
            return _clean_text(head + "\n\n" + str(body)), "OK (eml)"
        if ext == ".pdf":
            try:
                from pypdf import PdfReader
            except Exception:
                return "", "pypdf indisponible / pypdf unavailable"
            reader = PdfReader(io.BytesIO(data))
            text = "\n".join((p.extract_text() or "") for p in reader.pages)
            return _clean_text(text), "OK (pdf, %d pages)" % len(reader.pages)
        if ext in (".doc", ".docx"):
            try:
                import docx
            except Exception:
                return "", "python-docx indisponible / python-docx unavailable"
            if ext == ".docx":
                doc = docx.Document(io.BytesIO(data))
                return _clean_text("\n".join(p.text for p in doc.paragraphs)), "OK (docx)"
            return "", "format .doc legacy — convertissez en .docx/.pdf"
        if ext in (".xls", ".xlsx"):
            if ext == ".xlsx":
                try:
                    import openpyxl
                except Exception:
                    return "", "openpyxl indisponible / openpyxl unavailable"
                wb = openpyxl.load_workbook(io.BytesIO(data), read_only=True, data_only=True)
                rows = []
                for ws in wb.worksheets:
                    for row in ws.iter_rows(values_only=True):
                        rows.append("\t".join("" if v is None else str(v) for v in row))
                wb.close()
                return _clean_text("\n".join(rows)), "OK (xlsx)"
            return "", "format .xls legacy — convertissez en .xlsx"
        return "", "type non analyse / type not parsed"
    except Exception as exc:
        return "", "erreur d'analyse: %s / parse error: %s" % (type(exc).__name__, exc)


def _clean_text(t):
    t = re.sub(r"[ \t]+", " ", str(t or ""))
    t = re.sub(r"\n{3,}", "\n\n", t)
    return t.strip()


_PARSE_EXTS = frozenset({".txt", ".md", ".markdown", ".csv", ".json", ".eml", ".log",
                         ".html", ".pdf", ".docx", ".doc", ".xlsx", ".xls"})


def list_documents(conn, limit=50):
    rows = conn.execute(
        "SELECT id, original_name, content_type, size, parsed, chars, import_id, created_at "
        "FROM assistant_docs ORDER BY id DESC LIMIT ?", (limit,)).fetchall()
    return [dict(r) for r in rows]


def add_document(conn, original_name, ctype, data, import_id=None):
    """Analyse un fichier et indexe son texte dans le corpus interne (RAG)."""
    original_name = str(original_name or "document")
    text, note = _extract_text(original_name, data, ctype)
    cur = conn.execute(
        "INSERT INTO assistant_docs (original_name, content_type, size, parsed, chars, text, import_id, created_at) "
        "VALUES (?,?,?,?,?,?,?,?)",
        (original_name, ctype or "", len(data), 1 if text else 0, len(text),
         text if text else None, import_id, datetime.now().isoformat(timespec="seconds")))
    parsed = 1 if text else 0
    conn.commit()
    refresh_graph(conn, force=False)
    return {"id": cur.lastrowid, "original_name": original_name, "parsed": parsed,
            "chars": len(text), "note": note}


def refresh_graph(conn, force=False):
    """Reconstruit le Knowledge Graph si la signature de la donnee a change."""
    with _build_lock:
        sig = graph_signature(conn)
        cur = _get_setting(conn, "assistant_kg_sig", None) or "none"
        if not force and cur == sig:
            return False
        conn.execute("DELETE FROM kg_edges")
        conn.execute("DELETE FROM kg_nodes")
        _build_graph(conn)
        _set_local_setting(conn, "assistant_kg_sig", sig)
        conn.commit()
        return True


def _set_local_setting(conn, key, value):
    conn.execute(
        "INSERT INTO settings (key, value) VALUES (?,?) "
        "ON CONFLICT(key) DO UPDATE SET value=excluded.value", (key, value))


def _build_graph(conn):
    today = _today()
    total_by_imp = dict((r[0], r[1]) for r in conn.execute(
        "SELECT import_id, COUNT(*) FROM checklist_items GROUP BY import_id").fetchall())
    done_by_imp = dict((r[0], r[1]) for r in conn.execute(
        "SELECT import_id, COUNT(*) FROM checklist_items WHERE status='done' GROUP BY import_id").fetchall())

    sup_rows = conn.execute("SELECT * FROM suppliers").fetchall()
    sup_by_id = {}
    for s in sup_rows:
        meta = {"city": s["city"] or "", "country": s["country"] or "",
                "contact": s["contact"] or "", "email": s["email"] or ""}
        sid = _upsert_node(conn, "supplier", s["name"], "s:%d" % s["id"], meta)
        sup_by_id[s["id"]] = sid
        city = (s["city"] or "").strip()
        if city:
            cid = _upsert_node(conn, "city", city.title(), "city:%s" % city.lower())
            _upsert_edge(conn, sid, cid, "located_in", 1.0)

    imp_rows = conn.execute(
        "SELECT * FROM imports WHERE deleted=0 AND COALESCE(deleted,0)=0").fetchall()
    for i in imp_rows:
        meta = {
            "serial": i["serial"] or "", "dest": i["destination"] or "",
            "po": i["po_number"] or "", "doc": i["doc_number"] or "",
            "eta": i["eta"] or "", "eta_dest": i["eta_dest"] or "", "locked": i["locked"] or 0,
            "done": done_by_imp.get(i["id"], 0), "total": total_by_imp.get(i["id"], 0),
        }
        phase = _import_phase(_arrival_ref(i), meta["done"], meta["total"])
        meta["phase"] = phase
        iid = _upsert_node(conn, "import", (i["serial"] or "FI%06d" % i["id"]),
                           "i:%s" % (i["serial"] or str(i["id"])), meta)
        sup = sup_by_id.get(i["supplier_id"])
        if sup:
            _upsert_edge(conn, sup, iid, "supplies", 1.0)
            _upsert_edge(conn, iid, sup, "ordered_from", 1.0)
        if i["destination"]:
            did = _upsert_node(conn, "destination", i["destination"], "dest:%s" % _norm(i["destination"]))
            _upsert_edge(conn, iid, did, "ships_to", 1.0)
        if i["container"]:
            cid = _upsert_node(conn, "container", i["container"], "c:%s" % _norm(i["container"]))
            _upsert_edge(conn, iid, cid, "uses_container", 1.0)
        if i["origin"]:
            oid = _upsert_node(conn, "origin", i["origin"], "origin:%s" % _norm(i["origin"]))
            _upsert_edge(conn, iid, oid, "from", 1.0)
        if i["port_of_loading"]:
            pid = _upsert_node(conn, "port", i["port_of_loading"], "port:%s" % _norm(i["port_of_loading"]))
            _upsert_edge(conn, iid, pid, "loaded_at", 1.0)
        if i["port_of_discharge"]:
            pid = _upsert_node(conn, "port", i["port_of_discharge"], "port:%s" % _norm(i["port_of_discharge"]))
            _upsert_edge(conn, iid, pid, "discharged_at", 1.0)
        stid = _upsert_node(conn, "status", phase, "st:%s" % phase,
                            {"color": _STATUS_META.get(phase, "#6b7280")})
        _upsert_edge(conn, iid, stid, "has_status", 1.0)

        tasks = conn.execute(
            "SELECT task_key, task_label_fr, task_label_en, status FROM checklist_items WHERE import_id=?",
            (i["id"],)).fetchall()
        for t in tasks:
            key = (t["task_label_fr"] or t["task_label_en"] or t["task_key"] or "tache").lower().strip()
            tid = _upsert_node(conn, "task", (t["task_label_fr"] or t["task_label_en"] or t["task_key"] or "task"),
                               "t:%s" % _norm(key))
            w = 1.0 if t["status"] == "done" else 0.35
            _upsert_edge(conn, iid, tid, "has_task", w, {"status": t["status"]})

    docs = conn.execute("SELECT * FROM assistant_docs WHERE parsed=1 AND text IS NOT NULL").fetchall()
    for d in docs:
        nid = _upsert_node(conn, "document", d["original_name"], "d:%d" % d["id"])
        if d["import_id"]:
            imp = conn.execute("SELECT id, serial FROM imports WHERE id=?", (d["import_id"],)).fetchone()
            if imp:
                iid = _upsert_node(conn, "import", imp["serial"] or "", "i:%d" % imp["id"], {})
                _upsert_edge(conn, iid, nid, "has_document", 1.0)


def kg_search_nodes(conn, query, limit=6):
    """Cherche les entites du graphe dont le libelle correspond a la requete."""
    nq = _tokens(query) or [_norm(query)]
    nq = [t for t in nq if len(t) >= 2]
    if not nq:
        return []
    rows = conn.execute("SELECT * FROM kg_nodes").fetchall()
    scored = []
    for r in rows:
        tks = set(_tokens(r["label"]))
        score = sum((2.0 if t in nq else 0.0) for t in tks)
        # chevauchement sous-chaine pour conteneurs/PO/serials
        blob = _norm(r["label"])
        for t in nq:
            if t in blob and len(t) >= 3:
                score += 1.0
        if r["ntype"] == "import" and nq[0][:2] in ("fi", "po", "msk", "cma", "inb", "doc", "bol"):
            # priorite aux fiches sur une valeur de reference
            score += 0.5
        if score > 0:
            scored.append((score, dict(r)))
    scored.sort(key=lambda x: (-x[0], x[1]["ntype"]))
    return [x[1] for x in scored[:limit]]


def kg_facts_about(conn, node):
    """Collecte les faits (1-hop) autour d'un nœud, lisibles et structures."""
    facts = []
    if not node:
        return facts
    nid = node["id"]
    for e in conn.execute(
            "SELECT e.rel, e.weight, e.meta, n.label, n.ntype FROM kg_edges e "
            "JOIN kg_nodes n ON n.id = e.dst WHERE e.src=? ORDER BY e.weight DESC", (nid,)).fetchall():
        facts.append({"rel": e["rel"], "target": e["label"], "type": e["ntype"], "weight": e["weight"]})
    for e in conn.execute(
            "SELECT e.rel, e.weight, e.meta, n.label, n.ntype FROM kg_edges e "
            "JOIN kg_nodes n ON n.id = e.src WHERE e.dst=? ORDER BY e.weight DESC", (nid,)).fetchall():
        facts.append({"rel": "reverse:" + e["rel"], "target": e["label"], "type": e["ntype"], "weight": e["weight"]})
    return facts


def kg_shortest_path(conn, a, b, max_depth=5):
    """Plus court chemin entre deux nœuds du graphe (BFS borne)."""
    if not a or not b:
        return None
    if a["id"] == b["id"]:
        return [a["label"]]
    graph = {}
    for e in conn.execute("SELECT src, dst, rel FROM kg_edges").fetchall():
        graph.setdefault(e["src"], []).append((e["dst"], e["rel"]))
        graph.setdefault(e["dst"], []).append((e["src"], "reverse:" + e["rel"]))
    start, goal = a["id"], b["id"]
    prev = {start: None}
    frontier = [start]
    for _ in range(max_depth):
        nxt = []
        for cur in frontier:
            for (neigh, rel) in graph.get(cur, []):
                if neigh in prev:
                    continue
                prev[neigh] = (cur, rel)
                if neigh == goal:
                    path = [goal]
                    node = goal
                    rels = []
                    while prev[node] is not None:
                        cur, rel = prev[node]
                        rels.append(rel)
                        path.append(cur)
                        node = cur
                    path.reverse()
                    rels.reverse()
                    labels = {}
                    for r in conn.execute("SELECT id, label FROM kg_nodes").fetchall():
                        labels[r["id"]] = r["label"]
                    return [{"label": labels.get(i, str(i)), "rel": rels[k] if k < len(rels) else None}
                            for k, i in enumerate(path)]
                nxt.append(neigh)
        frontier = nxt
    return None


def kg_graph_payload(conn, limit=120):
    """Export des nœuds/arêtes pour visualisation (limite par securite)."""
    nodes = []
    for r in conn.execute("SELECT id, ntype, label FROM kg_nodes ORDER BY id LIMIT ?", (limit,)).fetchall():
        nodes.append({"id": r["id"], "type": r["ntype"], "label": r["label"]})
    edge_rows = conn.execute(
        "SELECT e.src, e.dst, e.rel FROM kg_edges e JOIN kg_nodes n ON n.id=e.src "
        "JOIN kg_nodes m ON m.id=e.dst LIMIT ?", (limit * 2,)).fetchall()
    present = set(n["id"] for n in nodes)
    edges = [{"src": e["src"], "dst": e["dst"], "rel": e["rel"]}
             for e in edge_rows if e["src"] in present and e["dst"] in present]
    return {"nodes": nodes, "edges": edges}


# --------------------------------------------------------------------------
# RAG interne : corpus + index BM25.
# --------------------------------------------------------------------------

def _build_corpus(conn):
    """Construit les chunks indexables a partir de la base interne uniquement."""
    chunks = []
    for s in conn.execute("SELECT * FROM suppliers").fetchall():
        chunks.append({
            "kind": "supplier", "id": s["id"],
            "text": "| ".join(filter(None, [
                "fournisseur supplier " + (s["name"] or ""), s["code"] or "",
                s["city"] or "", s["country"] or "", s["contact"] or "",
                s["email"] or ""])),
        })
    sup_names = dict((r["id"], r["name"]) for r in conn.execute(
        "SELECT id, name FROM suppliers").fetchall())
    for i in conn.execute("SELECT * FROM imports WHERE deleted=0 AND COALESCE(deleted,0)=0").fetchall():
        chunks.append({
            "kind": "import", "id": i["id"],
            "text": "| ".join(filter(None, [
                "fiche import record " + (i["serial"] or ""), (i["serial"] or ""),
                "fournisseur supplier " + (sup_names.get(i["supplier_id"]) or ""),
                "po " + (i["po_number"] or ""), "inbsip " + (i["inbsip"] or ""),
                "doc " + (i["doc_number"] or ""), "container " + (i["container"] or ""),
                "bol " + (i["transitaire_bol"] or ""), "destination " + (i["destination"] or ""),
                "origin " + (i["origin"] or ""), "port " + (i["port_of_loading"] or ""),
                "port " + (i["port_of_discharge"] or ""), "etd " + (i["etd"] or ""),
                "eta " + (i["eta"] or ""), "notes " + (i["notes"] or "")])),
            "eta": i["eta"],
        })
        if (i["serial"] or "").strip():
            chunks[-1]["ref"] = i["serial"]
    for d in conn.execute("SELECT * FROM assistant_docs WHERE parsed=1 AND text IS NOT NULL").fetchall():
        chunks.append({
            "kind": "document", "id": d["id"],
            "text": "| ".join(filter(None, ["document rapport report " + (d["original_name"] or ""),
                                            (d["text"] or "")[:4000]])),
            "name": d["original_name"],
        })
    # faits du graphe en tant que chunks (vision croisee)
    for r in conn.execute(
            "SELECT s.label AS src, e.rel, t.label AS dst FROM kg_edges e "
            "JOIN kg_nodes s ON s.id=e.src JOIN kg_nodes t ON t.id=e.dst "
            "WHERE e.weight >= 0.9 ORDER BY e.id LIMIT 300").fetchall():
        chunks.append({
            "kind": "fact", "id": r["rel"], "text": "| ".join((r["src"] or "", r["rel"], r["dst"] or "")),
        })
    return chunks


def _bm25_index(chunks):
    """Index lexical : token -> liste (chunk_idx, tf)."""
    df, docs = {}, {}
    dl, n = 0, len(chunks)
    if not n:
        return {}, chunks, 0.0, n
    for idx, c in enumerate(chunks):
        words = [w for w in _tokens(c["text"]) if w not in _STOP]
        tfs = {}
        for w in words:
            tfs[w] = tfs.get(w, 0) + 1
        docs[idx] = tfs
        dl += len(tfs)
        for w in tfs:
            df[w] = df.get(w, 0) + 1
    return df, docs, (dl / max(1, n)) if n else 0.0, n


def _search_internal(query, conn, k=6):
    """Recherche BM25 dans le corpus interne. Segregation : aucun acces web."""
    chunks = _build_corpus(conn)
    df, docs, avgdl, n = _bm25_index(chunks)
    if not chunks:
        return [], []
    qw = [w for w in _tokens(query) if w not in _STOP]
    if not qw:
        return [], chunks
    k1, b = 1.5, 0.75
    scores = {}
    for idx, tfs in docs.items():
        dl = sum(tfs.values())
        s = 0.0
        for w in qw:
            tf = tfs.get(w, 0)
            if tf == 0:
                continue
            idf = math.log((n - df.get(w, 0) + 0.5) / (df.get(w, 0) + 0.5) + 1.0)
            s += idf * (tf * (k1 + 1)) / (tf + k1 * (1 - b + b * dl / avgdl))
        if s > 0:
            scores[idx] = s
    ranked = sorted(scores.items(), key=lambda x: -x[1])[:k]
    return [(chunks[idx], s) for idx, s in ranked], chunks


# --------------------------------------------------------------------------
# Classifieur d'intentions (FR/EN).
# --------------------------------------------------------------------------

_INTENT_RULES = [
    ("greeting", ("bonjour", "salut", "hello", " hi ", "hey", "bonsoir", "coucou", "good morning", "good afternoon", "good evening")),
    ("thanks", ("merci", "thank you", "thanks", "great job")),
    ("help", ("aide", " help", "que faites", "quoi faire", "comment ca marche", "comment fonctionne", "can you", "peux tu", "peux-tu")),
    ("web", ("web:", "web ", "internet", "enligne", "search web", "recherche web", "actualite", "news", "reglement", "tarif", "duty rate", "taux de fret", "cours du", "cotation", "google")),
    ("chart", ("graphique", "graph", "chart", "diagramme", "graphe", "donut", "camembert", "visualisation", "carte des", "repartition par")),
    ("arrivals", ("arriv", "arrival", "prochaine", "next", "a venir", "upcoming", "bientot", "quand arrive", "quand arrive", "eta de", "dans les")),
    ("overdue", ("retard", "overdue", "depasse", "en retard", "late", "recu en retard")),
    ("suppliers", ("fournisseur", "supplier", "contact", "code fournisseur")),
    ("alerts", ("alerte", "alert", "manquant", "missing", "sans document", "verrouille")),
    ("stats", ("combien", "statistiques", "stats", "nombre", "total de", "avancement", "progress", "chiffres")),
    ("documents", ("document", "rapport", "report", "facture", "invoice", "pdf", "mes documents", "upload")),
    ("notifications", ("notif", "notification", "proactif", "alertes de retard")),
    ("relations", ("relie", "relie a", "lien entre", "connection", "connexion", "chemin", "shortest", "rapport entre", "comment", "qui transporte", "graph")),
    ("status", ("statut", "status", "suivi", "où", "ou est", "where is", "track", "fiche", "record", "po ", "inbsip", "container", "conteneur", "cont", "bol", "etd", "eta", "arrive le", "quand")),
]


def classify_intent(raw_q):
    nq = " " + _norm(raw_q) + " "
    if nq.strip().startswith(_norm("web:")) or (
            " " + _norm("web") + " " in nq and nq.split()[0] == _norm("web:")):
        return "web"
    tokens = nq.split()
    best, best_score = "unknown", 0
    for intent, words in _INTENT_RULES:
        score = 0
        for w in words:
            nw = _norm(w)
            if not nw:
                continue
            if " " in nw:
                if nw in nq:
                    score += 1
            elif len(nw) >= 4:
                if any(tk.startswith(nw) for tk in tokens):
                    score += 1
            elif " " + nw + " " in nq:
                score += 1
        if score > best_score:
            best, best_score = intent, score
    if best == "web" and best_score == 0 and nq.strip().startswith("web"):
        return "web"
    return best


# --------------------------------------------------------------------------
# Recherche web externe (strictement separee du contexte interne).
# --------------------------------------------------------------------------

ASSISTANT_WEB_TTL = 6 * 3600
_web_cache = {}
_web_cache_lock = threading.Lock()
_web_cache_max = 96

_UA = "radisson-import-tracker/1.0 (chatbot-assistant)"


def _http_json(url, timeout=5):
    req = urllib.request.Request(url, headers={"User-Agent": _UA, "Accept": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            raw = resp.read()
        if not raw:
            return None
        return json.loads(raw.decode("utf-8", errors="replace"))
    except Exception:
        return None


def _ddg_search(q):
    params = {"q": q, "format": "json", "no_html": 1, "no_redirect": 1, "skip_disambig": 1}
    url = "https://api.duckduckgo.com/?" + urllib.parse.urlencode(params)
    data = _http_json(url)
    if not data:
        return []
    out = []
    if data.get("AbstractText") and data.get("AbstractURL"):
        out.append({"title": data.get("Heading") or q,
                    "abstract": data["AbstractText"][:600],
                    "url": data["AbstractURL"], "provider": "duckduckgo"})
    for top in (data.get("RelatedTopics") or []):
        if "Topics" in top:
            for t in top["Topics"]:
                if t.get("Text") and t.get("FirstURL"):
                    out.append({"title": t.get("Text", "").split(" - ")[0][:120] or q,
                                "abstract": t["Text"][:600],
                                "url": t["FirstURL"], "provider": "duckduckgo"})
        elif top.get("Text") and top.get("FirstURL"):
            out.append({"title": top.get("Text", "").split(" - ")[0][:120] or q,
                        "abstract": top["Text"][:600],
                        "url": top["FirstURL"], "provider": "duckduckgo"})
    return out[:4]


def _wiki_search(q, lang="en"):
    base = "https://%s.wikipedia.org" % lang
    params = {"action": "query", "list": "search", "srsearch": q,
              "srlimit": 2, "format": "json", "srprop": ""}
    data = _http_json(base + "/w/api.php?" + urllib.parse.urlencode(params))
    if not data or not (data.get("query") or {}).get("search"):
        return []
    out = []
    for hit in data["query"]["search"][:2]:
        title = hit.get("title", "")
        summ = _http_json(base + "/api/rest_v1/page/summary/" +
                          urllib.parse.quote(title.replace(" ", "_")), timeout=4)
        if summ and summ.get("extract"):
            out.append({"title": summ.get("title") or title,
                        "abstract": summ["extract"][:600],
                        "url": (summ.get("content_urls") or {}).get("desktop", {}).get("page") or
                               (summ.get("descriptionurl") or ""),
                        "provider": "wikipedia"})
    return out


def external_search(query, lang="fr"):
    """Recherche web live, cachee (TTL) et bornee. Source : externe uniquement."""
    nq = _norm(query).strip()
    if not nq:
        return {"ok": False, "results": [], "note": "query vide / empty query"}
    with _web_cache_lock:
        hit = _web_cache.get(nq)
        now = time.time()
        if hit and (now - hit["at"]) < ASSISTANT_WEB_TTL:
            return {"ok": True, "results": hit["results"], "note": "cache",
                    "ttl": int(ASSISTANT_WEB_TTL - (now - hit["at"]))}
    wiki_lang = "fr" if lang == "fr" else "en"
    results = _ddg_search(query) or ([] if _ddg_search(query) else [])
    if not results:
        results = _wiki_search(query, wiki_lang)
    with _web_cache_lock:
        _web_cache[nq] = {"at": time.time(), "results": results}
        if len(_web_cache) > _web_cache_max:
            for k in list(_web_cache)[:max(0, len(_web_cache) - _web_cache_max)]:
                _web_cache.pop(k, None)
    return {"ok": bool(results), "results": results,
            "note": "vue fraiche / fresh fetch" if results else "aucun resultat / no results"}


# --------------------------------------------------------------------------
# Reponses internes (base de donnees) — segregation stricte assuree par
# des chemins de code distincts (jamais de melange interne/externe).
# --------------------------------------------------------------------------

_PHRASES = {
    "fr": {
        "help": ("Demandez-moi :\n• le statut d'une fiche (PO, conteneur, N° document, N° FI)\n"
                 "• les prochaines arrivées ou les retards\n• un fournisseur\n"
                 "• les statistiques et les graphiques\n• un rapport ou un document téléversé\n"
                 "• une recherche sur le web (préfixez par « web: » ou demandez « que dit internet… »)"),
        "no_data": "Aucune donnée pour le moment.",
        "arr_head": "Arrivées à venir ({d} jours) :",
        "arr_row": "• {ref} — {sup} → {dest}. ETA {eta} ({rel})",
        "arr_none": "Aucune arrivée prévue sous {d} jours.",
        "overdue_head": "Fiches en retard (au-delà de la tolérance) :",
        "overdue_row": "• {ref} — ETA {eta} ({d} j de retard) — {sup}",
        "overdue_none": "Aucune fiche en retard.",
        "sup_head": "{n} fournisseur(s) :",
        "sup_row": "• {name} — {city}, {country}",
        "sup_info": "{name} — Contact : {contact} · {email}. {n} fiche(s) active(s).",
        "sup_none": "Fournisseur introuvable pour « {q} ».",
        "status_head": "Fiche {ref} — {sup} → {dest}",
        "status_meta": "Container : {container} · PO : {po} · Doc : {doc} · BOL : {bol}",
        "status_eta": "ETA : {eta} ({rel})",
        "status_phase": "Phase : {phase}.",
        "status_cl": "Checklist : {done}/{total} tâches.",
        "alerts_none": "Aucune alerte active (documents manquants / verrous / retards).",
        "alerts_none_docs": "Aucune fiche sans n° de document.",
        "alerts_docs": "Fiche(s) sans n° de document :",
        "alerts_locked": "Fiche(s) verrouillée(s) :",
        "stats_line": "Fiches actives : {active} · Arrivées ≤ 7 j : {soon} · Retards : {over} · Checklist moyenne : {pct}%.",
        "notif_head": "Alertes proactives ({n}) :",
        "doc_search": "Documents trouvés ({n}) :",
        "doc_none": "Aucun document analysé. Téléversez un fichier (PDF, DOCX, XLSX, TXT, EML…) pour que je puisse le lire.",
        "doc_upload_chip": "Téléverser un document",
        "kg_head": "Base de connaissances — {label}",
        "kg_fact": "→ {target} ({rel})",
        "kg_path_head": "Plus court chemin : {a} → {b}",
        "kg_path_row": "{label}",
        "chart_head": "Répartition — {dim}",
        "web_head": "Résultat web — {q}",
        "web_row": "• {title}\n  {abstract}\n  → {url}",
        "web_none": "Aucun résultat externe trouvé pour « {q} ».",
        "web_hint": "Source externe (Internet). Les données internes ne sont pas utilisées ici.",
        "unknown": "Je n'ai pas compris. Quelques pistes :",
        "sugg_status": "Statut du PO1233",
        "sugg_arr": "Prochaines arrivées",
        "sugg_stats": "Statistiques globales",
        "sugg_chart": "Graphique par destination",
        "sugg_web": "web: réglementation importation Canada 2026",
        "sugg_docs": "Mes documents",
        "sugg_notif": "Mes notifications",
        "go_status": "Ouvrir la fiche",
        "go_dashboard": "Tableau de bord",
        "go_kanban": "Kanban",
        "go_prediction": "Prévisions",
        "go_analytics": "Analytique",
        "ask_web": "Rechercher sur le web",
    },
    "en": {
        "help": ("Ask me for:\n• the status of a record (PO, container, document #, FI #)\n"
                 "• upcoming arrivals or delays\n• a supplier\n"
                 "• statistics and charts\n• a report or an uploaded document\n"
                 "• a web search (prefix with “web:” or ask “what does the internet say about…” )"),
        "no_data": "No data at the moment.",
        "arr_head": "Upcoming arrivals ({d} days):",
        "arr_row": "• {ref} — {sup} → {dest}. ETA {eta} ({rel})",
        "arr_none": "No arrival scheduled within {d} days.",
        "overdue_head": "Overdue records (past tolerance):",
        "overdue_row": "• {ref} — ETA {eta} ({d} d late) — {sup}",
        "overdue_none": "No overdue records.",
        "sup_head": "{n} supplier(s):",
        "sup_row": "• {name} — {city}, {country}",
        "sup_info": "{name} — Contact: {contact} · {email}. {n} active record(s).",
        "sup_none": "No supplier found for “{q}”.",
        "status_head": "Record {ref} — {sup} → {dest}",
        "status_meta": "Container: {container} · PO: {po} · Doc: {doc} · BOL: {bol}",
        "status_eta": "ETA: {eta} ({rel})",
        "status_phase": "Phase: {phase}.",
        "status_cl": "Checklist: {done}/{total} tasks.",
        "alerts_none": "No active alert (missing documents / locks / delays).",
        "alerts_none_docs": "No record missing a document number.",
        "alerts_docs": "Records missing a document number:",
        "alerts_locked": "Locked records:",
        "stats_line": "Active records: {active} · Arrivals ≤ 7 d: {soon} · Overdue: {over} · Avg checklist: {pct}%.",
        "notif_head": "Proactive alerts ({n}):",
        "doc_search": "Documents found ({n}):",
        "doc_none": "No analyzed document yet. Upload a file (PDF, DOCX, XLSX, TXT, EML…) so I can read it.",
        "doc_upload_chip": "Upload a document",
        "kg_head": "Knowledge base — {label}",
        "kg_fact": "→ {target} ({rel})",
        "kg_path_head": "Shortest path: {a} → {b}",
        "kg_path_row": "{label}",
        "chart_head": "Breakdown — {dim}",
        "web_head": "Web result — {q}",
        "web_row": "• {title}\n  {abstract}\n  → {url}",
        "web_none": "No external result for “{q}”.",
        "web_hint": "External source (Internet). Internal data is not used here.",
        "unknown": "I didn't get that. A few ideas:",
        "sugg_status": "Status of PO1233",
        "sugg_arr": "Upcoming arrivals",
        "sugg_stats": "Global statistics",
        "sugg_chart": "Chart by destination",
        "sugg_web": "web: Canada import regulations 2026",
        "sugg_docs": "My documents",
        "sugg_notif": "My notifications",
        "go_status": "Open record",
        "go_dashboard": "Dashboard",
        "go_kanban": "Kanban",
        "go_prediction": "Forecasts",
        "go_analytics": "Analytics",
        "ask_web": "Search the web",
    },
}


def _phrases(lang):
    return _PHRASES.get("fr" if lang != "en" else "en", _PHRASES["fr"])


def _phase_label(phase, lang):
    return {"fr": {"transit": "en transit", "customs": "aux douanes", "delivered": "livrée"},
            "en": {"transit": "in transit", "customs": "at customs", "delivered": "delivered"}}["fr" if lang != "en" else "en"].get(phase, phase)


def _import_row_dict(conn, iid):
    i = conn.execute("SELECT * FROM imports WHERE id=?", (iid,)).fetchone()
    if not i:
        return None
    sup = conn.execute("SELECT name FROM suppliers WHERE id=?", (i["supplier_id"],)).fetchone()
    done = conn.execute("SELECT COUNT(*) FROM checklist_items WHERE import_id=? AND status='done'", (iid,)).fetchone()[0]
    total = conn.execute("SELECT COUNT(*) FROM checklist_items WHERE import_id=?", (iid,)).fetchone()[0]
    return {
        "id": i["id"], "serial": i["serial"] or "", "supplier": sup["name"] if sup else "—",
        "dest": i["destination"] or "", "po": i["po_number"] or "",
        "doc": i["doc_number"] or "", "container": i["container"] or "",
        "bol": i["transitaire_bol"] or "", "eta": i["eta"] or "",
        "eta_dest": i["eta_dest"] or "", "etd": i["etd"] or "", "locked": i["locked"] or 0, "done": done, "total": total,
    }


def _rel_text(days, lang):
    if days is None:
        return "—"
    if days == 0:
        return "aujourd'hui/today"
    if days < 0:
        return ("%d j de retard" % abs(days)) if lang == "fr" else ("%d d late" % abs(days))
    return ("dans %d j" % days) if lang == "fr" else ("in %d d" % days)


# --------------------------------------------------------------------------
# Analyse de communications (e-mails) : detections de risque proactives.
# --------------------------------------------------------------------------

_RISK_PATTERNS = [
    ("delay", 0.5, (r"delai", r"retard", r"delay", r"late", r"postpon", r"report(?:e|ee)?(\s|$)",
                     r"slightly later", r"next week", r"next month", r"week delay")),
    ("congestion", 0.45, (r"congestion", r"surplus", r"backlog", r"quay", r"quais", r"port congestion",
                          r"vessel berth", r"pas de place")),
    ("strike", 0.6, (r"greve", r"strike", r"gr\u00e8ve", r"walkout", r"lockout")),
    ("capacity", 0.4, (r"capacity short", r"no capacity", r"overbooked", r"pas de capacite",
                       r"container short", r"shortage", r"manque de conteneur")),
    ("customs", 0.5, (r"customs hold", r"douane", r"detention", r"inspection", r"document missing",
                      r"dossier incomplet", r"hs code", r"incomplete documents")),
    ("weather", 0.3, (r"storm", r"typhoon", r"ouragan", r"strong winds", r"bad weather",
                      r"mauvais temps", r"rought")),
    ("schedule", 0.35, (r"changes? to our schedule", r"revised eta", r"nouvel eta", r"new eta",
                        r"nominal arrival", r"amended")),
    ("urgency", 0.25, (r"asap", r"as soon as possible", r"urgence", r"urgent", r"sous 48")),
]


def analyze_communication(subject, body, lang="fr"):
    """Score de risque 0-100 a partir d'une communication fournisseur."""
    text = _norm("%s %s" % (subject or "", body or ""))
    if not text.strip():
        return {"score": 0, "level": "low", "signals": [], "reason": _PHRASES(lang).get("no_data", "")}
    signals = []
    total = 0.0
    for kind, weight, pats in _RISK_PATTERNS:
        for p in pats:
            if re.search(p, text):
                signals.append({"kind": kind, "weight": weight,
                                "label": _signal_label(kind, lang)})
                total += weight
                break
    total = min(total, 1.0)
    score = int(total * 100)
    if score >= 70:
        level = "critical"
    elif score >= 45:
        level = "high"
    elif score >= 20:
        level = "medium"
    else:
        level = "low"
    reason = _risk_reason(level, len(signals), lang)
    return {"score": score, "level": level, "signals": signals[:6], "reason": reason}


def _signal_label(kind, lang):
    labels = {
        "fr": {"delay": "retard annoncé", "congestion": "congestion portuaire",
               "strike": "grève", "capacity": "manque de capacité", "customs": "retenue douanière",
               "weather": "météo", "schedule": "changement d'horaire", "urgency": "urgence"},
        "en": {"delay": "announced delay", "congestion": "port congestion",
               "strike": "strike", "capacity": "capacity shortage", "customs": "customs hold",
               "weather": "weather", "schedule": "schedule change", "urgency": "urgency"},
    }
    return labels.get(lang, labels["en"]).get(kind, kind)


def _risk_reason(level, n, lang):
    fr = {"critical": "Risque critique détecté.", "high": "Risque élevé détecté.",
          "medium": "Risque modéré détecté.", "low": "Risque faible / normal."}
    en = {"critical": "Critical risk detected.", "high": "High risk detected.",
          "medium": "Moderate risk detected.", "low": "Low / normal risk."}
    table = fr if lang != "en" else en
    return table.get(level, table["low"])


# --------------------------------------------------------------------------
# Notifications proactives.
# --------------------------------------------------------------------------

_NOTIF_TYPES = ("delay", "arrival", "locked", "missing_doc")


def assistant_notifications(conn, prefs=None, lang="fr", limit=8):
    """Alertes proactives issues de la base interne uniquement."""
    prefs = prefs or {}
    tolerance = 3
    try:
        tolerance = int(_get_setting(conn, "imp_delay_tolerance", "3") or 3)
    except (TypeError, ValueError):
        tolerance = 3
    today = _today()
    items = []
    for i in conn.execute("SELECT * FROM imports WHERE deleted=0 AND COALESCE(deleted,0)=0").fetchall():
        sup = conn.execute("SELECT name FROM suppliers WHERE id=?", (i["supplier_id"],)).fetchone()
        supname = sup["name"] if sup else "—"
        serial = i["serial"] or ("FI%06d" % i["id"])
        d = _days_until(_arrival_ref(i))
        if d is not None and d < 0 and abs(d) >= tolerance:
            if prefs.get("delays_app") is not False or prefs.get("delays_email"):
                items.append({
                    "type": "delay", "priority": min(3, 1 + abs(d) // 3),
                    "record_id": i["id"], "serial": serial,
                    "title": (_("delay") or ("Retard sur %s" % serial)) if False else
                             (("Retard : {s} de {d} j").format(s=serial, d=abs(d)) if lang == "fr"
                              else ("Delay: {s} by {d} d").format(s=serial, d=abs(d))),
                    "detail": ("%s → %s · ETA %s" % (supname, i["destination"] or "—", i["eta"] or "—")),
                })
        if d is not None and 0 <= d <= 3:
            if prefs.get("arrival_app") is not False or prefs.get("arrival_email"):
                items.append({
                    "type": "arrival", "priority": 2,
                    "record_id": i["id"], "serial": serial,
                    "title": (("Arrivée prochaine : {s} dans {d} j").format(s=serial, d=d) if lang == "fr"
                              else ("Arrival soon: {s} in {d} d").format(s=serial, d=d)),
                    "detail": ("%s → %s · ETA %s" % (supname, i["destination"] or "—", i["eta"] or "—")),
                })
        if i["locked"]:
            if prefs.get("locked_app") is not False or prefs.get("locked_email"):
                items.append({
                    "type": "locked", "priority": 2,
                    "record_id": i["id"], "serial": serial,
                    "title": (("Fiche verrouillée : {s}").format(s=serial) if lang == "fr"
                              else ("Locked record: {s}").format(s=serial)),
                    "detail": ("%s → %s" % (supname, i["destination"] or "—")),
                })
        if not (i["doc_number"] or "").strip():
            if prefs.get("missing_doc_app") or prefs.get("delays_app") is not False:
                items.append({
                    "type": "missing_doc", "priority": 1,
                    "record_id": i["id"], "serial": serial,
                    "title": (("Document manquant : {s}").format(s=serial) if lang == "fr"
                              else ("Missing document: {s}").format(s=serial)),
                    "detail": ("%s → %s" % (supname, i["destination"] or "—")),
                })
    items.sort(key=lambda x: (-x["priority"], x["serial"]))
    return items[:limit]


def _unused_removed():
    pass


# --------------------------------------------------------------------------
# Orchestrateur du chatbot (reponses internes + web, jamais melangees).
# --------------------------------------------------------------------------

_FAST_REF_RE = re.compile(r"(fi\d{3,}|po-?[a-z0-9-]{3,}|msku\d{3,}|cma[uc]\d{3,}|inbsip[-\s]?\d{2,})", re.I)


def _find_import_by_ref(conn, query):
    m = _FAST_REF_RE.search(query)
    if not m:
        return None
    ref = m.group(1)
    like = "%" + ref.lower() + "%"
    for col in ("serial", "po_number", "inbsip", "doc_number", "container", "transitaire_bol"):
        row = conn.execute(
            "SELECT id FROM imports WHERE deleted=0 AND COALESCE(deleted,0)=0 "
            "AND lower(COALESCE(%s,'')) LIKE ? ORDER BY id DESC LIMIT 1" % col, (like,)).fetchone()
        if row:
            return row["id"]
    return None


def answer_internal(conn, query, lang, page):
    """Construit une reponse a partir de la base interne UNIQUEMENT.
    Appelee uniquement pour les intentions internes ; le canal web n'est
    jamais sollicite ici (segmentation stricte des sources)."""
    P = _phrases(lang)
    intent = classify_intent(query)
    qn = _norm(query)
    actions = page_actions(page, lang)
    suggestions = suggest_for(query, lang)

    if intent in ("greeting", "thanks"):
        return {"answer": P["help"] if intent == "greeting" else P.get("no_data", "OK"),
                "source": "system", "citations": [], "quick_actions": actions,
                "payload": None, "suggestions": suggestions, "page": page}

    if intent == "help":
        return {"answer": P["help"], "source": "system", "citations": [],
                "quick_actions": actions, "payload": None, "suggestions": suggestions, "page": page}

    if intent == "status":
        iid = _find_import_by_ref(conn, query)
        if not iid:
            hits, _ = _search_internal(query, conn, k=2)
            imp = next((c for c, s in hits if c["kind"] == "import"), None)
            if imp:
                iid = imp["id"]
        if iid:
            r = _import_row_dict(conn, iid)
            if r:
                d = _days_until(_arrival_ref(r))
                lines = [P["status_head"].format(ref=r["serial"], sup=r["supplier"], dest=r["dest"])]
                if r["container"] or r["po"] or r["doc"] or r["bol"]:
                    lines.append(P["status_meta"].format(container=r["container"] or "—",
                                                         po=r["po"] or "—", doc=r["doc"] or "—", bol=r["bol"] or "—"))
                if r["eta"]:
                    lines.append(P["status_eta"].format(eta=r["eta"], rel=_rel_text(d, lang)))
                phase = _import_phase(_arrival_ref(r), r["done"], r["total"])
                lines.append(P["status_phase"].format(phase=_phase_label(phase, lang)))
                lines.append(P["status_cl"].format(done=r["done"], total=r["total"]))
                if r["locked"]:
                    lines.append("🔒 " + P["alerts_locked"].split("(")[0].strip())
                citations = [{"kicker": "BD", "label": r["serial"], "url": None}]
                card = [{"label": P["go_status"] + " " + r["serial"], "act": "open", "id": r["id"]}]
                return {"answer": "\n".join(lines), "source": "internal", "citations": citations,
                        "quick_actions": card + actions, "payload": None,
                        "suggestions": suggestions, "page": page}
        # pas de fiche precise -> repli sur les statistiques si pertinent
        if re.search(r"(stats|statist|combien|count|nombre)", qn):
            return _stats_answer(conn, lang, page)

    if intent == "arrivals":
        return _arrivals_answer(conn, lang, page, qn)

    if intent == "overdue":
        return _overdue_answer(conn, lang, page)

    if intent == "suppliers":
        return _suppliers_answer(conn, query, lang, page)

    if intent == "alerts":
        return _alerts_answer(conn, lang, page)

    if intent == "stats":
        return _stats_answer(conn, lang, page)

    if intent == "chart":
        return _chart_answer(conn, query, lang, page)

    if intent == "documents":
        return _documents_answer(conn, query, lang, page)

    if intent == "notifications":
        return _notifications_answer(conn, qn, lang, page)

    if intent == "relations":
        return _relations_answer(conn, query, lang, page)

    # intention inconnue -> recherche lexicale puis propositions
    hits, _ = _search_internal(query, conn, k=3)
    if hits:
        top = hits[0][0]
        if top["kind"] == "import":
            r = _import_row_dict(conn, top["id"])
            if r:
                return _status_answer_dict(r, lang, page, actions)
        if top["kind"] == "supplier":
            s = conn.execute("SELECT * FROM suppliers WHERE id=?", (top["id"],)).fetchone()
            if s:
                n = conn.execute("SELECT COUNT(*) FROM imports WHERE supplier_id=?", (s["id"],)).fetchone()[0]
                P2 = _phrases(lang)
                ans = P2["sup_info"].format(name=s["name"], contact=s["contact"] or "—",
                                            email=s["email"] or "—", n=n)
                return {"answer": ans, "source": "internal",
                        "citations": [{"kicker": "BD", "label": s["name"], "url": None}],
                        "quick_actions": actions, "payload": None,
                        "suggestions": suggestions, "page": page}
        if top["kind"] == "document":
            return _documents_answer(conn, query, lang, page)

    P2 = _phrases(lang)
    web_chip = {"label": P2["ask_web"], "act": "send", "q": "web: " + (query[:60] or "")}
    help_chip = {"label": P2.get("sugg_stats", "Stats"), "act": "send", "q": "statistiques"}
    return {"answer": P2["unknown"] + "\n" + P2["help"],
            "source": "system", "citations": [],
            "quick_actions": actions + [web_chip, help_chip],
            "payload": None, "suggestions": suggestions + [P2["sugg_web"]], "page": page}


def _status_answer_dict(r, lang, page, actions):
    P = _phrases(lang)
    d = _days_until(_arrival_ref(r))
    lines = [P["status_head"].format(ref=r["serial"], sup=r["supplier"], dest=r["dest"])]
    if r["container"] or r["po"] or r["doc"] or r["bol"]:
        lines.append(P["status_meta"].format(container=r["container"] or "—",
                                             po=r["po"] or "—", doc=r["doc"] or "—", bol=r["bol"] or "—"))
    if r["eta"]:
        lines.append(P["status_eta"].format(eta=r["eta"], rel=_rel_text(d, lang)))
    phase = _import_phase(_arrival_ref(r), r["done"], r["total"])
    lines.append(P["status_phase"].format(phase=_phase_label(phase, lang)))
    lines.append(P["status_cl"].format(done=r["done"], total=r["total"]))
    return {"answer": "\n".join(lines), "source": "internal",
            "citations": [{"kicker": "BD", "label": r["serial"], "url": None}],
            "quick_actions": [{"label": P["go_status"] + " " + r["serial"], "act": "open", "id": r["id"]}] + actions,
            "payload": None, "suggestions": suggest_for("status", lang), "page": page}


def _arrivals_answer(conn, lang, page, qn):
    P = _phrases(lang)
    m = re.search(r"(\d{1,2})\s*([jd])", qn)
    days = int(m.group(1)) if m else 7
    rows = conn.execute(
        "SELECT * FROM imports WHERE deleted=0 AND COALESCE(deleted,0)=0 "
        "AND COALESCE(NULLIF(eta_dest,''), eta) IS NOT NULL "
        "AND COALESCE(NULLIF(eta_dest,''), eta) <> '' "
        "ORDER BY COALESCE(NULLIF(eta_dest,''), eta) LIMIT 12").fetchall()
    up = []
    for i in rows:
        d = _days_until(_arrival_ref(i))
        if d is not None and d >= 0 and d <= days:
            sup = conn.execute("SELECT name FROM suppliers WHERE id=?", (i["supplier_id"],)).fetchone()
            up.append({"id": i["id"], "serial": i["serial"] or "", "sup": sup["name"] if sup else "—",
                       "dest": i["destination"] or "", "eta": i["eta"] or "", "d": d})
    if not up:
        return {"answer": P["arr_none"].format(d=days), "source": "internal", "citations": [],
                "quick_actions": page_actions(page, lang), "payload": None,
                "suggestions": suggest_for("arrivals", lang), "page": page}
    lines = [P["arr_head"].format(d=days)] + [
        P["arr_row"].format(ref=u["serial"], sup=u["sup"], dest=u["dest"], eta=u["eta"], rel=_rel_text(u["d"], lang))
        for u in up[:6]]
    payload = {"kind": "table", "title": P["arr_head"].format(d=days),
               "columns": ["Ref", "Fournisseur/Supplier", "Destination", "ETA", "J/D"],
               "rows": [[u["serial"], u["sup"], u["dest"], u["eta"], str(u["d"])] for u in up[:8]]}
    cards = [{"label": u["serial"], "act": "open", "id": u["id"]} for u in up[:3]]
    return {"answer": "\n".join(lines), "source": "internal", "citations": [],
            "quick_actions": cards + page_actions(page, lang), "payload": payload,
            "suggestions": suggest_for("arrivals", lang), "page": page}


def _overdue_answer(conn, lang, page):
    P = _phrases(lang)
    tol = 3
    try:
        tol = int(_get_setting(conn, "imp_delay_tolerance", "3") or 3)
    except (TypeError, ValueError):
        tol = 3
    over = []
    for i in conn.execute(
            "SELECT * FROM imports WHERE deleted=0 AND COALESCE(deleted,0)=0 "
            "AND COALESCE(NULLIF(eta_dest,''), eta) IS NOT NULL "
            "AND COALESCE(NULLIF(eta_dest,''), eta) <> ''").fetchall():
        d = _days_until(_arrival_ref(i))
        if d is not None and d < 0 and abs(d) >= tol:
            sup = conn.execute("SELECT name FROM suppliers WHERE id=?", (i["supplier_id"],)).fetchone()
            over.append({"id": i["id"], "serial": i["serial"] or "", "sup": sup["name"] if sup else "—",
                         "dest": i["destination"] or "", "eta": i["eta"] or "", "d": abs(d)})
    over.sort(key=lambda x: -x["d"])
    if not over:
        return {"answer": P["overdue_none"], "source": "internal", "citations": [],
                "quick_actions": page_actions(page, lang), "payload": None,
                "suggestions": suggest_for("overdue", lang), "page": page}
    lines = [P["overdue_head"]] + [P["overdue_row"].format(ref=o["serial"], eta=o["eta"], d=o["d"], sup=o["sup"])
                                   for o in over[:6]]
    payload = {"kind": "bar", "title": P["overdue_head"].replace(":", ""),
               "labels": [o["serial"] for o in over[:8]],
               "values": [o["d"] for o in over[:8]], "unit": "j/d"}
    cards = [{"label": o["serial"], "act": "open", "id": o["id"]} for o in over[:3]]
    return {"answer": "\n".join(lines), "source": "internal", "citations": [],
            "quick_actions": cards + page_actions(page, lang), "payload": payload,
            "suggestions": suggest_for("overdue", lang), "page": page}


def _suppliers_answer(conn, query, lang, page):
    P = _phrases(lang)
    found = None
    for s in conn.execute("SELECT * FROM suppliers").fetchall():
        blob = " ".join(str(x or "") for x in (s["name"], s["code"], s["city"], s["country"]))
        if any(t in _norm(blob) for t in _tokens(query)):
            found = s
            break
    if found:
        n = conn.execute("SELECT COUNT(*) FROM imports WHERE supplier_id=? AND deleted=0", (found["id"],)).fetchone()[0]
        ans = P["sup_info"].format(name=found["name"], contact=found["contact"] or "—",
                                   email=found["email"] or "—", n=n)
        cards = [{"label": P["go_dashboard"], "act": "nav", "hash": "#/dashboard"}]
        return {"answer": ans, "source": "internal",
                "citations": [{"kicker": "BD", "label": found["name"], "url": None}],
                "quick_actions": cards + page_actions(page, lang), "payload": None,
                "suggestions": suggest_for("suppliers", lang), "page": page}
    rows = conn.execute("SELECT * FROM suppliers ORDER BY name").fetchall()
    if not rows:
        return {"answer": P["no_data"], "source": "internal", "citations": [],
                "quick_actions": page_actions(page, lang), "payload": None, "suggestions": [], "page": page}
    lines = [P["sup_head"].format(n=len(rows))] + [
        P["sup_row"].format(name=s["name"], city=s["city"] or "—", country=s["country"] or "—")
        for s in rows[:10]]
    payload = {"kind": "table", "title": P["sup_head"].format(n=len(rows)),
               "columns": ["Fournisseur/Supplier", "Ville/City", "Pays/Country"],
               "rows": [[s["name"], s["city"] or "—", s["country"] or "—"] for s in rows[:10]]}
    return {"answer": "\n".join(lines), "source": "internal", "citations": [],
            "quick_actions": page_actions(page, lang), "payload": payload,
            "suggestions": suggest_for("suppliers", lang), "page": page}


def _alerts_answer(conn, lang, page):
    P = _phrases(lang)
    lines = []
    cards = []
    docs = [r for r in conn.execute(
        "SELECT * FROM imports WHERE deleted=0 AND COALESCE(deleted,0)=0 "
        "AND (doc_number IS NULL OR doc_number='')").fetchall()]
    if docs:
        lines.append(P["alerts_docs"])
        for i in docs[:5]:
            sup = conn.execute("SELECT name FROM suppliers WHERE id=?", (i["supplier_id"],)).fetchone()
            ref = i["serial"] or ("FI%06d" % i["id"])
            lines.append("• %s — %s" % (ref, sup["name"] if sup else "—"))
            cards.append({"label": ref, "act": "open", "id": i["id"]})
    locked = [r for r in conn.execute(
        "SELECT * FROM imports WHERE deleted=0 AND COALESCE(deleted,0)=0 AND locked=1").fetchall()]
    if locked:
        lines.append(P["alerts_locked"])
        for i in locked[:5]:
            ref = i["serial"] or ("FI%06d" % i["id"])
            lines.append("• %s 🔒" % ref)
            cards.append({"label": ref, "act": "open", "id": i["id"]})
    if not lines:
        return {"answer": P["alerts_none"], "source": "internal", "citations": [],
                "quick_actions": page_actions(page, lang), "payload": None,
                "suggestions": suggest_for("alerts", lang), "page": page}
    return {"answer": "\n".join(lines), "source": "internal", "citations": [],
            "quick_actions": cards + page_actions(page, lang), "payload": None,
            "suggestions": suggest_for("alerts", lang), "page": page}


def _stats_answer(conn, lang, page):
    P = _phrases(lang)
    rows = conn.execute("SELECT * FROM imports WHERE deleted=0 AND COALESCE(deleted,0)=0").fetchall()
    active = len(rows)
    soon = sum(1 for i in rows if (_days_until(_arrival_ref(i)) if _arrival_ref(i) else None) is not None and 0 <= _days_until(_arrival_ref(i)) <= 7)
    over = sum(1 for i in rows if (_days_until(_arrival_ref(i)) if _arrival_ref(i) else None) is not None and _days_until(_arrival_ref(i)) < 0)
    total = 0
    done = 0
    for i in rows:
        t = conn.execute("SELECT COUNT(*) FROM checklist_items WHERE import_id=?", (i["id"],)).fetchone()[0]
        d = conn.execute("SELECT COUNT(*) FROM checklist_items WHERE import_id=? AND status='done'", (i["id"],)).fetchone()[0]
        total += t
        done += d
    pct = round((done / total) * 100) if total else 0
    ans = P["stats_line"].format(active=active, soon=soon, over=over, pct=pct)
    phases = {"transit": 0, "customs": 0, "delivered": 0}
    for i in rows:
        t = conn.execute("SELECT COUNT(*) FROM checklist_items WHERE import_id=?", (i["id"],)).fetchone()[0]
        d = conn.execute("SELECT COUNT(*) FROM checklist_items WHERE import_id=? AND status='done'", (i["id"],)).fetchone()[0]
        phases[_import_phase(_arrival_ref(i), d, t)] += 1
    payload = {"kind": "donut", "title": P.get("chart_head", "Répartition").replace("{dim}", "status"),
               "labels": list(phases.keys()), "values": [phases[k] for k in phases]}
    return {"answer": ans, "source": "internal", "citations": [],
            "quick_actions": page_actions(page, lang), "payload": payload,
            "suggestions": suggest_for("stats", lang), "page": page}


def _chart_answer(conn, query, lang, page):
    P = _phrases(lang)
    qn = _norm(query)
    rows = conn.execute("SELECT * FROM imports WHERE deleted=0 AND COALESCE(deleted,0)=0").fetchall()
    if not rows:
        return {"answer": P["no_data"], "source": "internal", "citations": [],
                "quick_actions": page_actions(page, lang), "payload": None, "suggestions": [], "page": page}
    dim = "destination"
    if re.search(r"fournisseur|supplier", qn):
        dim = "supplier"
    counts = {}
    for i in rows:
        key = (i["supplier_id"] if dim == "supplier" else (i["destination"] or "—")) or "—"
        if dim == "supplier":
            s = conn.execute("SELECT name FROM suppliers WHERE id=?", (i["supplier_id"],)).fetchone()
            key = s["name"] if s else str(key)
        counts[key] = counts.get(key, 0) + 1
    items = sorted(counts.items(), key=lambda x: -x[1])[:10]
    labels = [k for k, _ in items]
    values = [v for _, v in items]
    title = P["chart_head"].replace("{dim}", dim)
    return {"answer": title + " : " + ", ".join("%s (%d)" % (k, v) for k, v in items),
            "source": "internal", "citations": [],
            "quick_actions": page_actions(page, lang),
            "payload": {"kind": "bar", "title": title, "labels": labels, "values": values, "unit": "n"},
            "suggestions": suggest_for("chart", lang), "page": page}


def _documents_answer(conn, query, lang, page):
    P = _phrases(lang)
    docs = conn.execute("SELECT * FROM assistant_docs WHERE parsed=1 ORDER BY id DESC LIMIT 20").fetchall()
    if not docs:
        return {"answer": P["doc_none"], "source": "internal", "citations": [],
                "quick_actions": [{"label": P["doc_upload_chip"], "act": "send", "q": "help"}] + page_actions(page, lang),
                "payload": None, "suggestions": [P["sugg_docs"]], "page": page}
    hits, _ = _search_internal("document " + query, conn, k=3)
    text_hits = [c for c, s in hits if c["kind"] == "document"]
    if not text_hits:
        return {"answer": P["doc_search"].format(n=len(docs)), "source": "internal",
                "citations": [{"kicker": "DOC", "label": d["original_name"], "url": None} for d in docs[:5]],
                "quick_actions": page_actions(page, lang), "payload": None,
                "suggestions": [P["sugg_docs"]], "page": page}
    lines = [P["doc_search"].format(n=len(text_hits))]
    citations = []
    for c in text_hits:
        lines.append("• " + c["name"])
        citations.append({"kicker": "DOC", "label": c["name"], "url": None})
    return {"answer": "\n".join(lines), "source": "internal", "citations": citations,
            "quick_actions": page_actions(page, lang), "payload": None,
            "suggestions": [P["sugg_docs"]], "page": page}


def _notifications_answer(conn, qn, lang, page):
    P = _phrases(lang)
    items = assistant_notifications(conn, {}, lang=lang, limit=8)
    if not items:
        return {"answer": P["alerts_none"], "source": "internal", "citations": [],
                "quick_actions": page_actions(page, lang), "payload": None,
                "suggestions": suggest_for("stats", lang), "page": page}
    lines = [P["notif_head"].format(n=len(items))] + [
        "• %s — %s" % (it["title"], it["detail"]) for it in items]
    cards = [{"label": it["serial"], "act": "open", "id": it["record_id"]} for it in items[:3] if it["record_id"]]
    return {"answer": "\n".join(lines), "source": "internal", "citations": [],
            "quick_actions": cards + page_actions(page, lang), "payload": None,
            "suggestions": suggest_for("notifications", lang), "page": page}


def _relations_answer(conn, query, lang, page):
    P = _phrases(lang)
    nodes = kg_search_nodes(conn, query, limit=8)
    if not nodes:
        return _documents_answer(conn, query, lang, page) if "document" in _norm(query) else \
            {"answer": P["unknown"] + "\n" + P["help"], "source": "system", "citations": [],
             "quick_actions": page_actions(page, lang), "payload": None,
             "suggestions": suggest_for("help", lang), "page": page}
    cand = [n for n in nodes if n["ntype"] in ("import", "supplier", "container", "destination")]
    if len(cand) >= 2:
        path = kg_shortest_path(conn, cand[0], cand[1])
        if path:
            steps = " · ".join(("→ %s" % p["label"]) if p["rel"] is None else
                               ("%s → %s" % (p["rel"].replace("reverse:", "← "), p["label"]))
                               for p in path[1:])
            ans = P["kg_path_head"].format(a=path[0]["label"], b=path[-1]["label"]) + "\n" + steps
            return {"answer": ans, "source": "knowledge", "citations": [],
                    "quick_actions": page_actions(page, lang), "payload": None,
                    "suggestions": suggest_for("relations", lang), "page": page}
    node = cand[0] if cand else nodes[0]
    facts = kg_facts_about(conn, node)
    lines = [P["kg_head"].format(label=node["label"])] + [
        P["kg_fact"].format(target=f["target"], rel=f["rel"].replace("reverse:", "← ")) for f in facts[:12]]
    if not facts:
        lines.append(P["no_data"])
    return {"answer": "\n".join(lines), "source": "knowledge",
            "citations": [{"kicker": "KG", "label": node["label"], "url": None}],
            "quick_actions": page_actions(page, lang), "payload": None,
            "suggestions": suggest_for("relations", lang), "page": page}


def answer_external(conn, raw_q, lang, page):
    """Reponse a partir du WEB UNIQUEMENT. La base interne n'est jamais
    interrogee ici (segmentation stricte)."""
    P = _phrases(lang)
    q = _norm(raw_q).replace("web:", "", 1).strip() or raw_q
    r = external_search(raw_q if _norm(raw_q).startswith("web:") else raw_q, lang)
    if not r["ok"] or not r["results"]:
        return {"answer": P["web_none"].format(q=raw_q.strip()), "source": "external",
                "citations": [], "quick_actions": [],
                "payload": None, "suggestions": [P["sugg_web"]], "page": page}
    lines = [P["web_head"].format(q=raw_q.strip()), P["web_hint"]]
    cites = []
    for it in r["results"]:
        lines.append(P["web_row"].format(title=it["title"], abstract=it["abstract"], url=it["url"]))
        cites.append({"kicker": "WEB", "label": it["title"], "url": it["url"]})
    s = suggest_for("web", lang)
    return {"answer": "\n".join(lines), "source": "external", "citations": cites,
            "quick_actions": [], "payload": None, "suggestions": s, "page": page}


# --------------------------------------------------------------------------
# Contextualisation (page courante) + suggestions de suivi.
# --------------------------------------------------------------------------

def page_actions(page, lang):
    P = _phrases(lang)
    acts = []
    if page and page != "dashboard":
        acts.append({"label": P["go_dashboard"], "act": "nav", "hash": "#/dashboard"})
    if page != "kanban":
        acts.append({"label": P["go_kanban"], "act": "nav", "hash": "#/kanban"})
    if page != "prediction":
        acts.append({"label": P["go_prediction"], "act": "nav", "hash": "#/prediction"})
    if page != "analytics":
        acts.append({"label": P["go_analytics"], "act": "nav", "hash": "#/analytics"})
    acts.append({"label": P["sugg_arr"], "act": "send", "q": "arrivals"})
    acts.append({"label": P["sugg_stats"], "act": "send", "q": "statistiques"})
    return acts[:6]


def suggest_for(intent, lang):
    P = _phrases(lang)
    return list(dict.fromkeys([
        P["sugg_status"], P["sugg_arr"], P["sugg_stats"], P["sugg_chart"],
        P["sugg_docs"], P["sugg_notif"], P["sugg_web"]]))[:5]


def answer_chat(conn, payload, lang, page):
    """Point d'entree du chatbot. Enforce la segregation interne/web."""
    q = str(payload.get("message") or "").strip()
    lang = "fr" if str(lang) != "en" else "en"
    page = str(page or "dashboard")
    if not q:
        P = _phrases(lang)
        return {"answer": P["help"], "source": "system", "citations": [],
                "quick_actions": page_actions(page, lang), "payload": None,
                "suggestions": suggest_for("help", lang), "page": page,
                "data_segregated": True}
    refresh_graph(conn)
    intent = classify_intent(q)
    if intent == "web" or _norm(q).strip().startswith("web"):
        resp = answer_external(conn, q, lang, page)
    else:
        resp = answer_internal(conn, q, lang, page)
    resp["data_segregated"] = True
    resp["intent"] = intent
    return resp


def assistant_status(conn):
    """Etat du module : graphe, documents, cache web, segregation."""
    refresh_graph(conn)
    n_nodes = conn.execute("SELECT COUNT(*) FROM kg_nodes").fetchone()[0]
    n_edges = conn.execute("SELECT COUNT(*) FROM kg_edges").fetchone()[0]
    n_docs = conn.execute("SELECT COUNT(*) FROM assistant_docs").fetchone()[0]
    with _web_cache_lock:
        cache = len(_web_cache)
    return {
        "kg_ready": n_nodes > 0,
        "kg_nodes": n_nodes, "kg_edges": n_edges,
        "docs": n_docs,
        "web_cache": cache, "web_ttl_seconds": ASSISTANT_WEB_TTL,
        "model": "domain-lexicon + BM25 retrieval (local, FR/EN)",
        "segregation": "strict: internal-DB vs external-web contexts are never mixed",
        "endpoints": ["/api/assistant/chat", "/api/assistant/search", "/api/assistant/kg",
                      "/api/assistant/documents", "/api/assistant/email-risk",
                      "/api/assistant/notifications", "/api/assistant/status"],
    }