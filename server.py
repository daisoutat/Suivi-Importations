import hashlib
import html
import json
import mimetypes
import os
import re
import secrets
import shutil
import sqlite3
import tempfile
import threading
import time
import urllib.request
import zipfile
from datetime import datetime, timedelta
from email import policy
from email.parser import BytesParser
from html.parser import HTMLParser
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from io import BytesIO
from urllib.parse import parse_qs, unquote, urlparse
from xml.sax.saxutils import escape

import ai
import backup_scheduler
import reconcile

BASE = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE, "static")
DATA_DIR = os.path.join(BASE, "data")
DB_PATH = os.path.join(DATA_DIR, "radisson.db")
ATTACH_DIR = os.path.join(DATA_DIR, "attachments")
MAX_UPLOAD = 10 * 1024 * 1024
ALLOWED_ATT_EXT = frozenset(
    {".pdf", ".doc", ".docx", ".xls", ".xlsx",
     ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp", ".tif", ".tiff", ".svg"}
)
HOST = os.environ.get("RADISSON_HOST", "0.0.0.0")
PORT = int(os.environ.get("RADISSON_PORT", "8000"))
DEFAULT_PASSWORD = "radisson"
SESSION_TTL = 60 * 60 * 12
LOGIN_LIMIT = 5
LOCK_SECONDS = 60

# Parametres applicatifs (stockes dans la table `settings`, cle/valeur).
# Ils alimentent les nouveaux modules de la page Parametres (taux de change,
# gestion des importations) et restent purement additifs.
DEFAULT_FX_BASE = "USD"
DEFAULT_FX_SYNC_MIN = 30
ALLOWED_FX_BASE = ("USD", "CAD", "EUR", "GBP", "CNY", "MXN")
DEFAULT_INCOTERM = "FOB"
DEFAULT_DELAY_TOLERANCE_DAYS = 3
DEFAULT_EMAIL_TEMPLATE_FR = (
    "Bonjour {supplier},\n\n"
    "Nous vous informons d'un retard sur la fiche {serial} ({destination}) "
    "dont l'arrivee etait initialement prevue le {eta}.\n"
    "Merci de nous confirmer une nouvelle date des que possible.\n\n"
    "Cordialement,\nIndustries Radisson"
)
DEFAULT_EMAIL_TEMPLATE_EN = (
    "Hello {supplier},\n\n"
    "We would like to inform you of a delay on record {serial} ({destination}) "
    "initially expected to arrive on {eta}.\n"
    "Please confirm a new date as soon as possible.\n\n"
    "Best regards,\nIndustries Radisson"
)

# Evenements de notification (perte de rien : preferences utilisateur stockees
# dans `users.prefs`, chaque cle etant un canal email/in-app).
NOTIFICATION_EVENTS = (
    ("delays", "notif_delays"),
    ("locked", "notif_locked"),
    ("arrival", "notif_arrival"),
)
NOTIFICATION_CHANNELS = ("email", "app")
NOTIFICATION_KEYS = frozenset(
    "%s_%s" % (evt, ch) for evt, _ in NOTIFICATION_EVENTS for ch in NOTIFICATION_CHANNELS
)

TASKS = [
    ("dropbox", "VÃ©rification Dropbox", "Dropbox verification"),
    ("api", "Support d'intÃ©gration API", "API integration support"),
    ("docs", "Collecte des documents (facture, packing list)", "Documents collection (invoice, packing list)"),
    ("broker_docs", "Envoi des documents au courtier", "Documents sent to customs broker"),
    ("broker_notify", "Avis au courtier de douane", "Customs broker notified"),
    ("drayage", "Transportation booking", "Transportation booking"),
    ("container_track", "Suivi du conteneur", "Container tracking"),
    ("delivery", "Confirmation de livraison", "Delivery confirmation"),
]

STATUSES = ("pending", "progress", "done", "na")

# Taches considerees comme critiques pour l'estimation des retards. La liste
# couvre les taches generiques et, via des motifs LIKE, les taches propres aux
# fournisseurs (factures / BOL). Utilisee par le module de prediction.
CRITICAL_TASK_KEYS = (
    "docs", "broker_docs", "broker_notify", "drayage", "container_track", "delivery",
)

sessions = {}
sessions_lock = threading.Lock()
login_guard = {}
login_guard_lock = threading.Lock()


def hash_password(pw, salt=None):
    salt = salt or secrets.token_hex(16)
    h = hashlib.pbkdf2_hmac("sha256", pw.encode("utf-8"), bytes.fromhex(salt), 120000).hex()
    return "pbkdf2$%s$%s" % (salt, h)


def verify_password(pw, stored):
    if not stored:
        return False
    if stored.startswith("pbkdf2$"):
        try:
            _, salt, expected = stored.split("$", 2)
            return hash_password(pw or "", salt) == stored
        except ValueError:
            return False
    return hashlib.sha256((pw or "").encode("utf-8")).hexdigest() == stored


def is_valid_username(username):
    return bool(username) and len(username) >= 3 and len(username) <= 40 and bool(re.fullmatch(r"[A-Za-z0-9_\-]+", username))


def now_iso():
    return datetime.now().isoformat(timespec="seconds")


def clean_file_name(original):
    base = os.path.basename(original or "").strip()
    base = re.sub(r'[\\/:*?"<>|\x00-\x1f]+', "_", base).strip()
    base = re.sub(r"_+", "_", base).strip("._ ") or "file"
    return base


def stored_file_name(original):
    clean = clean_file_name(original)
    ext = os.path.splitext(clean)[1].lower()
    return clean, secrets.token_hex(8) + ext


def remove_stored_file(stored):
    if not stored:
        return
    path = os.path.join(ATTACH_DIR, stored)
    if os.path.isfile(path):
        try:
            os.remove(path)
        except OSError:
            pass


# ---------------------------------------------------------------------------
# Assainissement HTML coté serveur (anti-XSS) pour les zones riches de l'editeur.
# Approche additive et conservatrice : le texte brut (notes simple ligne) est
# conserve a l'identique, seules les balises/attributs hors liste blanche sont
# retires. Les liens `data:` (image ou PDF) sont preserves pour ne pas casser
# les pieces jointes inserees hors-ligne, ainsi que les URL relatives au serveur
# (`/api/rte/files/...`) produites par l'upload securisee.
# ---------------------------------------------------------------------------

ALLOWED_RICH_TAGS = frozenset({
    "p", "br", "div", "span", "b", "strong", "i", "em", "u", "s", "strike",
    "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "code",
    "pre", "hr", "a", "img", "table", "thead", "tbody", "tfoot", "tr", "td",
    "th", "caption", "figure", "figcaption", "em",
})
ALLOWED_RICH_ATTRS = frozenset({
    "href", "src", "target", "rel", "title", "alt", "width", "height",
    "align", "colspan", "rowspan", "start", "type", "class",
})


def _rich_url_ok(value):
    """Valide un URL pour href/src (protocoles HTTP(S)/mailto/tel/ftp,
    chemins relatifs serveur ou data: image/PDF uniquement)."""
    low = str(value or "").strip().lower()
    if not low:
        return False
    if low.startswith(("javascript:", "vbscript:", "data:text/html", "data:image/svg")):
        return False
    if low.startswith("data:"):
        return low.startswith("data:image/") or low.startswith("data:application/pdf")
    if low.startswith(("//", "/", "#", "./", "../")):
        return True
    if ":" not in low:
        return True
    m = re.match(r"^([a-z][a-z0-9+\-.]*):", low)
    return bool(m) and m.group(1) in ("http", "https", "mailto", "tel", "ftp")


class _RichHTMLFilter(HTMLParser):
    """Reconstruit le HTML en ne gardant que la liste blanche."""

    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.out = []

    def handle_data(self, data):
        self.out.append(data)

    def handle_entityref(self, name):
        self.out.append("&" + name + ";")

    def handle_charref(self, name):
        self.out.append("&#" + name + ";")

    def handle_starttag(self, tag, attrs):
        self._emit(tag, attrs, self_closing=False)

    def handle_startendtag(self, tag, attrs):
        self._emit(tag, attrs, self_closing=True)

    def handle_endtag(self, tag):
        if tag.lower() in ALLOWED_RICH_TAGS:
            self.out.append("</" + tag.lower() + ">")

    def _emit(self, tag, attrs, self_closing):
        t = tag.lower()
        if t not in ALLOWED_RICH_TAGS:
            return
        kept = ""
        for k, v in attrs:
            kl = (k or "").lower()
            if kl.startswith("on") or kl not in ALLOWED_RICH_ATTRS:
                continue
            val = html.unescape("" if v is None else str(v))
            if kl in ("href", "src"):
                if not _rich_url_ok(val):
                    continue
            elif kl == "target":
                if val not in ("_blank", "_self", "_top", "_parent"):
                    continue
            elif kl == "rel":
                toks = [x for x in val.split() if x in ("noopener", "noreferrer")]
                if not toks:
                    continue
                val = " ".join(toks)
            kept += ' %s="%s"' % (kl, html.escape(val, quote=True))
        sep = "/" if self_closing and t not in ("br", "hr", "img") else ""
        self.out.append("<" + t + kept + sep + ">")


def sanitize_rich_html(text):
    """Assainit un contenu riche cote serveur. Le texte sans balise passe
    tel quel ; sinon seules les balises/attributs autorises survivent."""
    if text is None:
        return ""
    raw = str(text)
    if not raw.strip():
        return ""
    if "<" not in raw:
        return raw
    p = _RichHTMLFilter()
    p.feed(raw)
    p.close()
    return "".join(p.out)


def link_list_from_item(item):
    """Normalise le champ lien d'une tache de checklist vers une liste de URLs.

    Le client envoie soit la liste canonique `links` (array), soit l'ancien
    champ mono-valeur `link` (string). Retourne toujours une liste de chaines
    non vides afin de preserver les donnees historiques sans perte.
    """
    raw = item.get("links")
    if isinstance(raw, list):
        return [str(x).strip() for x in raw if isinstance(x, str) and str(x).strip()]
    legacy = item.get("link")
    if isinstance(legacy, str) and legacy.strip():
        return [legacy.strip()]
    return []


def link_list_from_storage(raw, fallback=""):
    """Depile la colonne `links` (JSON). En l'absence de liste valide, retombe
    automatiquement sur l'ancienne colonne `link` (adaptation sans perte des
    enregistrements herites a une seule URL)."""
    if raw:
        try:
            arr = json.loads(raw)
            if isinstance(arr, list):
                return [str(x).strip() for x in arr if isinstance(x, str) and str(x).strip()]
        except (TypeError, ValueError):
            pass
    if isinstance(fallback, str) and fallback.strip():
        return [fallback.strip()]
    return []


def db_conn():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    conn.execute("PRAGMA journal_mode = WAL")
    return conn


def init_db():
    os.makedirs(DATA_DIR, exist_ok=True)
    os.makedirs(ATTACH_DIR, exist_ok=True)
    conn = db_conn()
    conn.executescript(
        """
        CREATE TABLE IF NOT EXISTS suppliers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            code TEXT,
            city TEXT,
            country TEXT,
            contact TEXT,
            email TEXT,
            notes TEXT,
            created_at TEXT,
            updated_at TEXT
        );
        CREATE TABLE IF NOT EXISTS imports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            supplier_id INTEGER NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
            serial TEXT,
            destination TEXT,
            origin TEXT,
            port_of_loading TEXT,
            port_of_discharge TEXT,
            po_number TEXT,
            inbsip TEXT,
            doc_number TEXT,
            pallets INTEGER,
            transitaire_bol TEXT,
            container TEXT,
            etd TEXT,
            eta TEXT,
            eta_van TEXT,
            eta_dest TEXT,
            qc_sampling_qc INTEGER NOT NULL DEFAULT 0,
            qc_sampling_reception INTEGER NOT NULL DEFAULT 0,
            notes TEXT,
            add_info TEXT,
            created_at TEXT,
            updated_at TEXT,
            deleted INTEGER NOT NULL DEFAULT 0,
            locked INTEGER NOT NULL DEFAULT 0
        );
        CREATE TABLE IF NOT EXISTS checklist_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            import_id INTEGER NOT NULL REFERENCES imports(id) ON DELETE CASCADE,
            task_key TEXT,
            task_label_fr TEXT,
            task_label_en TEXT,
            status TEXT NOT NULL DEFAULT 'pending',
            notes TEXT,
            link TEXT,
            meta TEXT,
            position INTEGER NOT NULL DEFAULT 0
        );
        CREATE TABLE IF NOT EXISTS attachments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            import_id INTEGER NOT NULL REFERENCES imports(id) ON DELETE CASCADE,
            stored_name TEXT NOT NULL,
            original_name TEXT NOT NULL,
            content_type TEXT,
            size INTEGER,
            created_at TEXT
        );
        CREATE TABLE IF NOT EXISTS reconcile_runs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            invoice_file TEXT,
            po_file TEXT,
            created_at TEXT,
            stats TEXT,
            result TEXT
        );
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT
        );
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE COLLATE NOCASE,
            password_hash TEXT NOT NULL,
            display_name TEXT,
            role TEXT NOT NULL DEFAULT 'user',
            prefs TEXT,
            created_at TEXT,
            updated_at TEXT
        );
        -- Journal d'audit : historique des modifications par fiche (création,
        -- modification, verrouillage, documents, corbeille...). Purement additif.
        CREATE TABLE IF NOT EXISTS import_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            import_id INTEGER NOT NULL REFERENCES imports(id) ON DELETE CASCADE,
            user_id INTEGER,
            username TEXT,
            display_name TEXT,
            action TEXT NOT NULL,
            detail TEXT,
            created_at TEXT
        );
        CREATE INDEX IF NOT EXISTS idx_import_events_import ON import_events(import_id, id);
        """
    )
    u_cols = [r["name"] for r in conn.execute("PRAGMA table_info(users)").fetchall()]
    if "prefs" not in u_cols:
        # Preferences de notification par utilisateur (JSON) : ajout additif.
        conn.execute("ALTER TABLE users ADD COLUMN prefs TEXT")
    r_cols = [r["name"] for r in conn.execute("PRAGMA table_info(reconcile_runs)").fetchall()]
    if "saved" not in r_cols:
        # Migration additive : bouton "Enregistrer" -> flag de validation sur
        # un rapprochement deja archive. Aucune perte, aucune reecriture.
        conn.execute("ALTER TABLE reconcile_runs ADD COLUMN saved INTEGER NOT NULL DEFAULT 0")
    if "saved_at" not in r_cols:
        conn.execute("ALTER TABLE reconcile_runs ADD COLUMN saved_at TEXT")
    cols = [r["name"] for r in conn.execute("PRAGMA table_info(checklist_items)").fetchall()]
    if "link" not in cols:
        conn.execute("ALTER TABLE checklist_items ADD COLUMN link TEXT")
    if "links" not in cols:
        # Migration additive : liste de hyperliens (JSON) par tache, cote a cote
        # de l'ancien champ mono-valeur `link` (compatibilite ascendante).
        conn.execute("ALTER TABLE checklist_items ADD COLUMN links TEXT")
    imp_cols = [r["name"] for r in conn.execute("PRAGMA table_info(imports)").fetchall()]
    if "serial" not in imp_cols:
        conn.execute("ALTER TABLE imports ADD COLUMN serial TEXT")
    if "deleted" not in imp_cols:
        conn.execute("ALTER TABLE imports ADD COLUMN deleted INTEGER NOT NULL DEFAULT 0")
    if "po_inbsip" in imp_cols and "po_number" not in imp_cols:
        conn.execute("ALTER TABLE imports ADD COLUMN po_number TEXT")
        conn.execute("UPDATE imports SET po_number = po_inbsip")
        imp_cols.append("po_number")
    for col in ["origin", "port_of_loading", "port_of_discharge", "inbsip"]:
        if col not in imp_cols:
            conn.execute(f"ALTER TABLE imports ADD COLUMN {col} TEXT")
    for col in ["eta_van", "eta_dest"]:
        if col not in imp_cols:
            conn.execute(f"ALTER TABLE imports ADD COLUMN {col} TEXT")
    for col in ["qc_sampling_qc", "qc_sampling_reception"]:
        if col not in imp_cols:
            conn.execute(f"ALTER TABLE imports ADD COLUMN {col} INTEGER NOT NULL DEFAULT 0")
    cl_cols = [r["name"] for r in conn.execute("PRAGMA table_info(checklist_items)").fetchall()]
    if "meta" not in cl_cols:
        conn.execute("ALTER TABLE checklist_items ADD COLUMN meta TEXT")
    if "add_info" not in imp_cols:
        conn.execute("ALTER TABLE imports ADD COLUMN add_info TEXT")
        if "add_info_value" in imp_cols:
            for prow in conn.execute(
                "SELECT id, add_info_type, add_info_value FROM imports WHERE add_info_value IS NOT NULL AND add_info_value <> ''"
            ).fetchall():
                conn.execute("UPDATE imports SET add_info=? WHERE id=?",
                             (json.dumps([{"type": prow["add_info_type"] or "", "value": prow["add_info_value"]}]),
                              prow["id"]))
    if "locked" not in imp_cols:
        # Verrouillage de fiche (nouvelle colonne, valeur par defaut = non verrouille).
        conn.execute("ALTER TABLE imports ADD COLUMN locked INTEGER NOT NULL DEFAULT 0")
    conn.execute("UPDATE checklist_items SET task_label_fr='Transportation booking', "
                 "task_label_en='Transportation booking' WHERE task_key='drayage'")
    has = conn.execute("SELECT value FROM settings WHERE key='password_hash'").fetchone()
    if has is None:
        conn.execute("INSERT INTO settings (key, value) VALUES ('password_hash', ?)",
                     (hash_password(DEFAULT_PASSWORD),))
    seed(conn)
    migrate_supplier_renames(conn)
    ensure_predefined_suppliers(conn)
    if conn.execute("SELECT COUNT(*) AS n FROM users").fetchone()["n"] == 0:
        conn.execute(
            "INSERT INTO users (username, password_hash, display_name, role, created_at, updated_at) "
            "VALUES (?,?,?,?,?,?)",
            ("admin", get_password_hash(conn), "Admin", "admin", now_iso(), now_iso()),
        )
    conn.execute(
        "UPDATE imports SET serial = 'FI' || printf('%06d', "
        "(SELECT COUNT(*) FROM imports i2 WHERE i2.id <= imports.id)) WHERE serial IS NULL"
    )
    if conn.execute("SELECT 1 FROM settings WHERE key='serial_renumber_v2'").fetchone() is None:
        rows = conn.execute("SELECT id FROM imports ORDER BY (deleted=0) DESC, id ASC").fetchall()
        for i, row in enumerate(rows, start=1):
            conn.execute("UPDATE imports SET serial=? WHERE id=?",
                         ("FI%06d" % i, row["id"]))
        conn.execute(
            "INSERT INTO settings (key, value) VALUES ('import_serial_next', ?) "
            "ON CONFLICT(key) DO UPDATE SET value=excluded.value",
            (str(len(rows) + 1),),
        )
        conn.execute("INSERT INTO settings (key, value) VALUES ('serial_renumber_v2', '1') ON CONFLICT(key) DO UPDATE SET value=excluded.value")
        conn.execute("INSERT INTO settings (key, value) VALUES ('serial_renumber_v1', '1') ON CONFLICT(key) DO UPDATE SET value=excluded.value")
    elif conn.execute("SELECT 1 FROM settings WHERE key='serial_renumber_v1'").fetchone() is None:
        rows = conn.execute("SELECT id FROM imports ORDER BY id ASC").fetchall()
        for i, row in enumerate(rows, start=1):
            conn.execute("UPDATE imports SET serial=? WHERE id=?",
                         ("FI%06d" % i, row["id"]))
        conn.execute(
            "INSERT INTO settings (key, value) VALUES ('import_serial_next', ?) "
            "ON CONFLICT(key) DO UPDATE SET value=excluded.value",
            (str(len(rows) + 1),),
        )
        conn.execute("INSERT INTO settings (key, value) VALUES ('serial_renumber_v1', '1') ON CONFLICT(key) DO UPDATE SET value=excluded.value")
    elif conn.execute("SELECT 1 FROM settings WHERE key='import_serial_next'").fetchone() is None:
        max_n = conn.execute(
            "SELECT MAX(CAST(substr(serial, 3) AS INTEGER)) AS m FROM imports WHERE serial LIKE 'FI%'"
        ).fetchone()["m"]
        conn.execute("INSERT INTO settings (key, value) VALUES ('import_serial_next', ?)",
                     (str((max_n or 0) + 1),))
    conn.commit()

    # Module assistant : schema (tables additionnelles) puis initialisation
    # du Knowledge Graph (reconstruction seulement si la donnee a change).
    try:
        ai.ensure_schema(conn)
        if ai.refresh_graph(conn):
            _ng = conn.execute("SELECT COUNT(*) FROM kg_nodes").fetchone()[0]
            _eg = conn.execute("SELECT COUNT(*) FROM kg_edges").fetchone()[0]
            print("[assistant] Knowledge Graph initialise : %d noeuds, %d aretes" % (_ng, _eg))
        else:
            print("[assistant] Knowledge Graph deja a jour")
    except Exception:
        print("[assistant] echec initialisation module assistant")
    conn.close()


def migrate_supplier_renames(conn):
    """Migration unique et idempotente (marqueur settings: supplier_rename_v1).

    - Supprime definitivement les enregistrements de l'ancien fournisseur MICOTA.
    - Transfere l'identite GIOLONG-B vers MICOTA (nom + cles de taches `giolong_*`),
      en conservant l'integralite de ses donnees historiques.
    - Corrige NATIVA en NAVITA (nom + cles de taches `nativa_*`).
    """
    if conn.execute("SELECT 1 FROM settings WHERE key='supplier_rename_v1'").fetchone() is not None:
        return
    # 1) Efface l'ancien MICOTA (imports, liste de verification, pieces jointes).
    for row in conn.execute(
        "SELECT id FROM suppliers WHERE name = 'MICOTA' COLLATE NOCASE"
    ).fetchall():
        sid = row["id"]
        for att in conn.execute(
            "SELECT a.stored_name FROM attachments a JOIN imports i ON i.id = a.import_id "
            "WHERE i.supplier_id = ?", (sid,)
        ).fetchall():
            remove_stored_file(att["stored_name"])
        conn.execute("DELETE FROM imports WHERE supplier_id = ?", (sid,))
        conn.execute("DELETE FROM suppliers WHERE id = ?", (sid,))
    # 2) GIOLONG-B -> MICOTA en preservant donnees et cles de taches.
    conn.execute(
        "UPDATE checklist_items SET task_key = REPLACE(task_key, 'giolong_', 'micota_') "
        "WHERE task_key LIKE 'giolong\\_%' ESCAPE '\\'"
    )
    conn.execute("UPDATE suppliers SET name = 'MICOTA' WHERE name = 'GIOLONG-B' COLLATE NOCASE")
    # 3) NATIVA -> NAVITA.
    conn.execute(
        "UPDATE checklist_items SET task_key = REPLACE(task_key, 'nativa_', 'navita_') "
        "WHERE task_key LIKE 'nativa\\_%' ESCAPE '\\'"
    )
    conn.execute("UPDATE suppliers SET name = 'NAVITA' WHERE name = 'NATIVA' COLLATE NOCASE")
    conn.execute(
        "INSERT INTO settings (key, value) VALUES ('supplier_rename_v1', '1') "
        "ON CONFLICT(key) DO UPDATE SET value=excluded.value"
    )


def ensure_predefined_suppliers(conn):
    """Ajoute les 4 fournisseurs fiches au registre s'ils sont absents (idempotent)."""
    for name, code in [
        ("MECO", "MEC"),
        ("INGENIOUS", "ING"),
        ("NAVITA", "NAT"),
        ("MICOTA", "MCT"),
    ]:
        row = conn.execute(
            "SELECT id FROM suppliers WHERE name = ? COLLATE NOCASE", (name,)
        ).fetchone()
        if row is None:
            conn.execute(
                "INSERT INTO suppliers (name, code, city, country, contact, email, notes, created_at, updated_at) "
                "VALUES (?,?,?,?,?,?,?,?,?)",
                (name, code, "", "", "", "", "", now_iso(), now_iso()),
            )


def seed(conn):
    if conn.execute("SELECT COUNT(*) AS n FROM suppliers").fetchone()["n"] > 0:
        return
    today = datetime.now().date()
    seed_suppliers = [
        ("Mico", "MIC", "Shanghai", "Chine", "Clara Wei", "clara.wei@mico.example"),
        ("Micota", "MCT", "Ningbo", "Chine", "David Lin", "d.lin@micota.example"),
        ("Ingenious", "ING", "Oakville", "Canada", "Marc Tremblay", "m.tremblay@ingenious.example"),
        ("Navita", "NAV", "Monterrey", "Mexique", "Sofia Ruiz", "s.ruiz@navita.example"),
        ("MECO", "MEC", "", "", "", ""),
    ]
    supplier_ids = {}
    for idx, (name, code, city, country, contact, email) in enumerate(seed_suppliers):
        cur = conn.execute(
            "INSERT INTO suppliers (name, code, city, country, contact, email, created_at, updated_at) "
            "VALUES (?,?,?,?,?,?,?,?)",
            (name, code, city, country, contact, email, now_iso(), now_iso()),
        )
        supplier_ids[name] = cur.lastrowid

    seed_imports = [
        ("Mico", "Shanghai", "Yangshan", "MontrÃ©al, QC", "MontrÃ©al", "PO-7001", "INBSIP-219", "DOC-2101", 22,
         "DB Schenker", "MSKU7012345", 8, 15, "Premier envoi de la saison.", None),
        ("Mico", "Shanghai", "Ningbo", "Sherbrooke, QC", "MontrÃ©al", "PO-7004", "INBSIP-231", "DOC-2144", 14,
         "DB Schenker", "MSKU7045218", 22, 29, "Acheminement port Ã  Port.", None),
        ("Micota", "Shenzhen", "Shekou", "MontrÃ©al, QC", "MontrÃ©al", "PO-7102", "INBSIP-244", "DOC-2190", 8,
         "Kuehne+Nagel", "MSCU7788123", 12, 20, "Palettes ISPM-15 requises.", None),
        ("Ingenious", "Oakville", "MontrÃ©al (routier)", "Sherbrooke, QC", "Sherbrooke", "PO-7201", "INBSIP-250", "DOC-2215", 0,
         "RÃ©seau de camionnage", "TRK-8891", -2, 1, "Transport routier direct.", 1),
        ("Navita", "Monterrey", "Altamira", "MontrÃ©al, QC", "MontrÃ©al", "PO-7303", "INBSIP-262", "DOC-2240", 18,
         "DSV", "CMAU6600117", 30, 45, "Conteneur 40' HC.", 2),
    ]
    for (sup, origin, pol, dest, pod, po_no, inbsip_no, doc, pal, bol, cont, etd_d, eta_d, notes, progress) in seed_imports:
        sid = supplier_ids[sup]
        etd = (today + timedelta(days=int(etd_d))).isoformat()
        eta = (today + timedelta(days=int(eta_d))).isoformat()
        cur = conn.execute(
            "INSERT INTO imports (supplier_id, destination, origin, port_of_loading, port_of_discharge, po_number, inbsip, "
            "doc_number, pallets, transitaire_bol, container, etd, eta, notes, created_at, updated_at) "
            "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            (sid, dest, origin, pol, pod, po_no, inbsip_no, doc, pal, bol, cont, etd, eta, notes, now_iso(), now_iso()),
        )
        iid = cur.lastrowid
        for pos, (key, fr, en) in enumerate(TASKS):
            status = "done" if (progress is not None and pos < progress) else "pending"
            conn.execute(
                "INSERT INTO checklist_items (import_id, task_key, task_label_fr, task_label_en, status, position) "
                "VALUES (?,?,?,?,?,?)",
                (iid, key, fr, en, status, pos),
            )


def get_password_hash(conn):
    row = conn.execute("SELECT value FROM settings WHERE key='password_hash'").fetchone()
    return row["value"] if row else hash_password(DEFAULT_PASSWORD)


def set_password_hash(conn, value):
    conn.execute("INSERT INTO settings (key, value) VALUES ('password_hash', ?) "
                 "ON CONFLICT(key) DO UPDATE SET value=excluded.value", (value,))


def make_token():
    return secrets.token_urlsafe(32)


def session_valid(token):
    with sessions_lock:
        row = sessions.get(token)
        if not row:
            return False
        if row["exp"] < time.time():
            sessions.pop(token, None)
            return False
        return True


def login_allowed(ip):
    with login_guard_lock:
        rec = login_guard.get(ip)
        if not rec:
            return True
        if rec["lock_until"] > time.time():
            return False
        return True


def register_failure(ip):
    with login_guard_lock:
        rec = login_guard.get(ip) or {"fails": 0, "lock_until": 0}
        rec["fails"] += 1
        if rec["fails"] >= LOGIN_LIMIT:
            rec["lock_until"] = time.time() + LOCK_SECONDS
            rec["fails"] = 0
        login_guard[ip] = rec


def clear_guard(ip):
    with login_guard_lock:
        login_guard.pop(ip, None)


def get_setting(conn, key, default=None):
    row = conn.execute("SELECT value FROM settings WHERE key=?", (key,)).fetchone()
    if row is not None and row["value"] is not None:
        return row["value"]
    return default


def set_setting(conn, key, value):
    conn.execute(
        "INSERT INTO settings (key, value) VALUES (?,?) "
        "ON CONFLICT(key) DO UPDATE SET value=excluded.value",
        (key, str(value)),
    )


def _as_int(v, default=None):
    try:
        return int(v)
    except (TypeError, ValueError):
        return default


RATES_SOURCE = "https://open.er-api.com/v6/latest"
RATES_FAIL_TTL = 2 * 60
rates_store = {"rates": None, "fetched_at": 0.0, "last_attempt": 0.0}
rates_lock = threading.Lock()
_rates_cfg = None


def invalidate_rates():
    """Invalide le cache des taux afin de forcer un rafraichissement apres
    un changement de configuration (base, cle API ou frequence)."""
    global _rates_cfg
    _rates_cfg = None
    with rates_lock:
        rates_store["rates"] = None


def _fetch_rates(url):
    req = urllib.request.Request(url, headers={
        "User-Agent": "radisson-import-tracker/1.0",
        "Accept": "application/json",
    })
    with urllib.request.urlopen(req, timeout=6) as resp:
        body = json.loads(resp.read().decode("utf-8"))
    if body.get("result") != "success" or not isinstance(body.get("rates"), dict):
        return None
    return body["rates"]


def get_rates():
    conn = db_conn()
    try:
        base = get_setting(conn, "fx_base", DEFAULT_FX_BASE) or DEFAULT_FX_BASE
        sync_min = _as_int(get_setting(conn, "fx_sync_min", str(DEFAULT_FX_SYNC_MIN)),
                           DEFAULT_FX_SYNC_MIN)
        api_key = (get_setting(conn, "fx_api_key", "") or "").strip()
    finally:
        conn.close()
    if base not in ALLOWED_FX_BASE:
        base = DEFAULT_FX_BASE
    if not sync_min or sync_min < 5:
        sync_min = DEFAULT_FX_SYNC_MIN
    ttl = sync_min * 60
    now = time.time()
    global _rates_cfg
    with rates_lock:
        cfg = (base, sync_min, api_key)
        if _rates_cfg != cfg:
            _rates_cfg = cfg
            rates_store["rates"] = None
            rates_store["fetched_at"] = 0.0
    with rates_lock:
        fresh = rates_store["rates"] is not None and now - rates_store["fetched_at"] < ttl
        if not fresh and now - rates_store["last_attempt"] >= RATES_FAIL_TTL:
            rates_store["last_attempt"] = now
            url = "%s/%s" % (RATES_SOURCE, base)
            try:
                rates = _fetch_rates(url)
            except Exception:
                rates = None
            if rates is None and api_key:
                try:
                    rates = _fetch_rates(url + "?apikey=" + api_key)
                except Exception:
                    rates = None
            if rates is not None:
                rates_store["rates"] = rates
                rates_store["fetched_at"] = now
        return rates_store["rates"]


class App(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, fmt, *args):
        pass

    def send_head_text(self, status, body, ctype="application/json"):
        payload = body.encode("utf-8") if isinstance(body, str) else body
        self.send_response(status)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(payload)

    def json_out(self, status, obj):
        self.send_head_text(status, json.dumps(obj, ensure_ascii=False))

    def error(self, status, message):
        self.json_out(status, {"error": message})

    def read_body(self):
        length = int(self.headers.get("Content-Length") or 0)
        if length > 2 * 1024 * 1024:
            raise ValueError("body too large")
        raw = self.rfile.read(length) if length else b""
        return json.loads(raw.decode("utf-8")) if raw else {}

    def session_user(self):
        cookie = self.headers.get("Cookie") or ""
        m = re.search(r"sid=([^;]+)", cookie)
        if not m or not session_valid(m.group(1)):
            return None
        with sessions_lock:
            row = sessions.get(m.group(1))
        if not row:
            return None
        conn = db_conn()
        try:
            u = conn.execute(
                "SELECT id, username, display_name, role FROM users WHERE id=?",
                (row["user_id"],),
            ).fetchone()
        finally:
            conn.close()
        return dict(u) if u else None

    def require_auth(self):
        return self.session_user()

    def require_admin(self):
        user = self.session_user()
        if user is None:
            self.error(HTTPStatus.UNAUTHORIZED, "unauthorized")
            return None
        if user["role"] != "admin":
            self.error(HTTPStatus.FORBIDDEN, "forbidden")
            return None
        return user

    def send_static(self, path):
        if path in ("", "/"):
            path = "/index.html"
        rel = unquote(path.lstrip("/"))
        full = os.path.normpath(os.path.join(STATIC_DIR, rel))
        if not full.startswith(os.path.normpath(STATIC_DIR)) or not os.path.isfile(full):
            self.error(HTTPStatus.NOT_FOUND, "not found")
            return
        ctype, _ = mimetypes.guess_type(full)
        with open(full, "rb") as fh:
            data = fh.read()
        self.send_head_text(HTTPStatus.OK, data, ctype or "application/octet-stream")

    def handle_get(self, path, qs):
        if path in ('', '/'):
           path = '/index.html'
        if path.startswith("/api/"):
            parts = [p for p in path.split("/") if p]
            self.api_get(parts, qs)
            return
        self.send_static(path)

    def api_get(self, parts, qs):
        token = self.require_auth()
        if token is None:
            self.error(HTTPStatus.UNAUTHORIZED, "unauthorized")
            return
        conn = db_conn()
        try:
            if parts[1:] == ["me"]:
                prefs = self.user_prefs(conn, token["id"])
                self.json_out(200, {
                    "id": token["id"], "username": token["username"],
                    "display_name": token["display_name"], "role": token["role"],
                    "prefs": prefs,
                })
            elif parts[1:] == ["settings"]:
                self.json_out(200, self.get_app_settings(conn, token))
            elif parts[1:] == ["backup", "status"]:
                self.json_out(200, backup_scheduler.status())
            elif parts[1:] == ["backup"]:
                if self.require_admin() is None:
                    return
                self.do_backup(conn)
            elif parts[1:] == ["reconcile", "runs"]:
                self.list_reconcile_runs(conn)
            elif len(parts) == 4 and parts[1] == "reconcile" and parts[2] == "runs":
                try:
                    self.get_reconcile_run(conn, int(parts[3]))
                except ValueError:
                    self.error(HTTPStatus.BAD_REQUEST, "bad request")
            elif len(parts) == 4 and parts[1] == "rte" and parts[2] == "files":
                self.do_rte_file(parts[3])
            elif parts[1:] == ["users"]:
                user = self.require_admin()
                if user is None:
                    return
                rows = conn.execute(
                    "SELECT id, username, display_name, role, created_at FROM users ORDER BY id"
                ).fetchall()
                self.json_out(200, {"users": [dict(r) for r in rows]})
            elif parts[1:] == ["rates"]:
                rates = get_rates()
                base = get_setting(conn, "fx_base", DEFAULT_FX_BASE)
                sync_min = _as_int(get_setting(conn, "fx_sync_min", str(DEFAULT_FX_SYNC_MIN)),
                                   DEFAULT_FX_SYNC_MIN) or DEFAULT_FX_SYNC_MIN
                self.json_out(200, {
                    "rates": rates,
                    "updated_at": rates_store["fetched_at"] if rates else None,
                    "base": base,
                    "sync_min": sync_min,
                })
            elif parts[1:] == ["suppliers"]:
                rows = conn.execute("SELECT * FROM suppliers ORDER BY name").fetchall()
                self.json_out(200, {"suppliers": [dict(r) for r in rows]})
            elif len(parts) == 3 and parts[1] == "suppliers":
                row = conn.execute("SELECT * FROM suppliers WHERE id=?", (int(parts[2]),)).fetchone()
                if not row:
                    self.error(HTTPStatus.NOT_FOUND, "supplier not found")
                    return
                self.json_out(200, dict(row))
            elif parts == ["api", "imports"]:
                rows = self.query_imports(conn, qs)
                self.json_out(200, {"imports": rows})
            elif parts[1:] == ["imports", "export"]:
                self.do_export_upcoming_xlsx(conn, qs)
            elif len(parts) == 4 and parts[1] == "imports" and parts[3] == "history":
                # Historique des modifications (createur + actions chronologiques).
                self.json_out(200, self.get_import_history(conn, int(parts[2])))
            elif len(parts) == 3 and parts[1] == "imports":
                row = self.get_import_detail(conn, int(parts[2]))
                if not row:
                    self.error(HTTPStatus.NOT_FOUND, "import not found")
                    return
                self.json_out(200, row)
            elif parts[1:] == ["template"]:
                self.json_out(200, {"tasks": [{"key": k, "fr": f, "en": e} for k, f, e in TASKS]})
            elif parts[1:] == ["stats"]:
                self.json_out(200, self.stats(conn))
            elif parts[1:] == ["kanban"]:
                # Vue Kanban dynamique (colonnes = etapes du cycle d'importation).
                self.json_out(200, self.get_kanban(conn))
            elif parts[1:] == ["prediction"]:
                # Prediction des retards (score de risque + estimation).
                self.json_out(200, self.get_prediction(conn))
            elif parts[1:] == ["performance"]:
                # Performance des fournisseurs (ponctualite, avancement, documents).
                self.json_out(200, self.get_performance(conn))
            elif parts[1:] == ["assistant", "status"]:
                self.json_out(200, ai.assistant_status(conn))
            elif parts[1:] == ["assistant", "kg"]:
                try:
                    limit = min(int((qs.get("limit") or ["120"])[0]), 500)
                except (TypeError, ValueError):
                    limit = 120
                self.json_out(200, ai.kg_graph_payload(conn, limit))
            elif parts[1:] == ["assistant", "notifications"]:
                prefs = self.user_prefs(conn, token["id"])
                lang = (qs.get("lang") or ["fr"])[0]
                try:
                    limit = min(int((qs.get("limit") or ["8"])[0]), 20)
                except (TypeError, ValueError):
                    limit = 8
                self.json_out(200, {
                    "items": ai.assistant_notifications(conn, prefs, lang=lang, limit=limit),
                })
            elif parts[1:] == ["assistant", "documents"]:
                self.json_out(200, {"documents": ai.list_documents(conn)})
            elif parts[1:] == ["health"]:
                self.json_out(200, {"status": "ok"})
            elif parts[1:] == ["logout"]:
                cookie = self.headers.get("Cookie") or ""
                m = re.search(r"sid=([^;]+)", cookie)
                if m:
                    with sessions_lock:
                        sessions.pop(m.group(1), None)
                self.send_response(HTTPStatus.OK)
                self.send_header("Set-Cookie", "sid=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0")
                body = json.dumps({"ok": True}).encode("utf-8")
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Length", str(len(body)))
                self.send_header("Cache-Control", "no-store")
                self.end_headers()
                self.wfile.write(body)
            else:
                self.error(HTTPStatus.NOT_FOUND, "endpoint not found")
        finally:
            conn.close()

    def query_imports(self, conn, qs):
        sql = ("SELECT i.*, s.name AS supplier_name, "
               "(SELECT COUNT(*) FROM checklist_items c WHERE c.import_id=i.id AND c.status IN ('done','na')) AS _done, "
               "(SELECT COUNT(*) FROM checklist_items c WHERE c.import_id=i.id) AS _total "
               "FROM imports i JOIN suppliers s ON s.id = i.supplier_id")
        conds = []
        params = []
        supplier_id = (qs.get("supplier_id") or [None])[0]
        search = (qs.get("search") or [None])[0]
        deleted = (qs.get("deleted") or [None])[0]
        if deleted == "1":
            conds.append("(i.deleted = 1)")
        else:
            conds.append("(i.deleted = 0 OR i.deleted IS NULL)")
        if supplier_id:
            conds.append("i.supplier_id = ?")
            params.append(int(supplier_id))
        locked = (qs.get("locked") or [None])[0]
        # Filtre « Archives » : locked=1 -> uniquement les fiches verrouillees ;
        # locked=0 -> uniquement les fiches actives (jamais les verrouillees).
        if locked == "1":
            conds.append("COALESCE(i.locked,0) = 1")
        elif locked == "0":
            conds.append("COALESCE(i.locked,0) = 0")
        if search:
            conds.append("(i.po_number LIKE ? OR i.inbsip LIKE ? OR i.container LIKE ? OR i.doc_number LIKE ? OR s.name LIKE ?)")
            like = f"%{search}%"
            params.extend([like, like, like, like, like])
        if conds:
            sql += " WHERE " + " AND ".join(conds)
        sql += " ORDER BY i.eta"
        return [dict(r) for r in conn.execute(sql, params).fetchall()]

    def build_xlsx(self, headers, rows, sheet_name):
        def col_letter(i):
            s = ""
            while i >= 0:
                s = chr(65 + (i % 26)) + s
                i = i // 26 - 1
            return s

        def text_cell(ref, value):
            return '<c r="%s" t="inlineStr"><is><t xml:space="preserve">%s</t></is></c>' % (
                ref, escape(str(value)))

        def num_cell(ref, value):
            return '<c r="%s"><v>%s</v></c>' % (ref, value)

        def empty_cell(ref):
            return '<c r="%s"/>' % ref

        lines = ['<row r="1">']
        for i, h in enumerate(headers):
            lines.append(text_cell("%s1" % col_letter(i), h))
        lines.append("</row>")
        for ri, row in enumerate(rows, start=2):
            lines.append('<row r="%d">' % ri)
            for ci, val in enumerate(row):
                ref = "%s%d" % (col_letter(ci), ri)
                if val is None or val == "":
                    lines.append(empty_cell(ref))
                elif isinstance(val, bool):
                    lines.append(num_cell(ref, 1 if val else 0))
                elif isinstance(val, (int, float)):
                    lines.append(num_cell(ref, val))
                else:
                    lines.append(text_cell(ref, val))
            lines.append("</row>")

        worksheet = (
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
            '<sheetData>%s</sheetData></worksheet>' % "".join(lines)
        )
        workbook = (
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
            'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
            '<sheets><sheet name="%s" sheetId="1" r:id="rId1"/></sheets></workbook>'
            % escape(sheet_name)
        )
        content_types = (
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
            '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
            '<Default Extension="xml" ContentType="application/xml"/>'
            '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
            '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
            '</Types>'
        )
        root_rels = (
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'
            '</Relationships>'
        )
        workbook_rels = (
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>'
            '</Relationships>'
        )
        buf = BytesIO()
        with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
            zf.writestr("[Content_Types].xml", content_types)
            zf.writestr("_rels/.rels", root_rels)
            zf.writestr("xl/workbook.xml", workbook)
            zf.writestr("xl/_rels/workbook.xml.rels", workbook_rels)
            zf.writestr("xl/worksheets/sheet1.xml", worksheet)
        return buf.getvalue()

    def do_export_upcoming_xlsx(self, conn, qs):
        lang = (qs.get("lang") or ["fr"])[0]
        if lang not in ("fr", "en"):
            lang = "fr"
        today = datetime.now().date().isoformat()
        rows = conn.execute(
            "SELECT i.*, s.name AS supplier_name, "
            "(SELECT COUNT(*) FROM checklist_items c WHERE c.import_id=i.id AND c.status IN ('done','na')) AS _done, "
            "(SELECT COUNT(*) FROM checklist_items c WHERE c.import_id=i.id) AS _total "
            "FROM imports i LEFT JOIN suppliers s ON s.id=i.supplier_id "
            "WHERE (i.deleted = 0 OR i.deleted IS NULL) "
            "AND COALESCE(NULLIF(i.eta_dest, ''), i.eta) IS NOT NULL "
            "AND COALESCE(NULLIF(i.eta_dest, ''), i.eta) <> '' "
            "AND COALESCE(NULLIF(i.eta_dest, ''), i.eta) >= ? "
            "ORDER BY COALESCE(NULLIF(i.eta_dest, ''), i.eta) ASC",
            (today,),
        ).fetchall()
        if lang == "en":
            headers = ["Supplier", "Destination", "PO / INBSIP", "Doc #", "# of pallets",
                       "Forwarder / BOL", "Container", "ETD", "ETA", "Checklist"]
            sheet_name = "Upcoming arrivals"
            fname = "upcoming_arrivals.xlsx"
        else:
            headers = ["Fournisseur", "Destination", "PO / INBSIP", "NÂ° document", "Nb de palettes",
                       "Transitaire / BOL", "Conteneur", "ETD", "ETA", "Liste de vÃ©rification"]
            sheet_name = "Prochaines arrivÃ©es"
            fname = "prochaines_arrivees.xlsx"
        data = []
        for r in rows:
            data.append([
                r["supplier_name"] or "",
                r["destination"] or "",
                " / ".join(x for x in (r["po_number"], r["inbsip"]) if x),
                r["doc_number"] or "",
                r["pallets"] if r["pallets"] is not None else 0,
                r["transitaire_bol"] or "",
                r["container"] or "",
                r["etd"] or "",
                r["eta"] or "",
                "%d/%d" % (r["_done"] or 0, r["_total"] or 0),
            ])
        payload = self.build_xlsx(headers, data, sheet_name)
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type",
                         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        self.send_header("Content-Disposition", 'attachment; filename="%s"' % fname)
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def get_import_detail(self, conn, imp_id):
        base = conn.execute(
            "SELECT i.*, s.name AS supplier_name FROM imports i JOIN suppliers s ON s.id=i.supplier_id "
            "WHERE i.id=?", (imp_id,)
        ).fetchone()
        if not base:
            return None
        tasks = conn.execute(
            "SELECT id, task_key, task_label_fr, task_label_en, status, notes, link, links, meta, position "
            "FROM checklist_items WHERE import_id=? ORDER BY position, id", (imp_id,)
        ).fetchall()
        atts = conn.execute(
            "SELECT id, original_name, content_type, size, created_at "
            "FROM attachments WHERE import_id=? ORDER BY id", (imp_id,)
        ).fetchall()
        checklist = []
        for r in tasks:
            d = dict(r)
            d["links"] = link_list_from_storage(d.get("links"), d.get("link"))
            checklist.append(d)
        return {"import": dict(base), "checklist": checklist,
                "attachments": [dict(r) for r in atts]}

    def list_attachments(self, conn, imp_id):
        rows = conn.execute(
            "SELECT id, original_name, content_type, size, created_at "
            "FROM attachments WHERE import_id=? ORDER BY id", (imp_id,)
        ).fetchall()
        return [dict(r) for r in rows]

    def log_event(self, conn, imp_id, user, action, detail=""):
        """Journal d'audit : enregistre une action liee a une fiche (historique)."""
        conn.execute(
            "INSERT INTO import_events (import_id, user_id, username, display_name, action, detail, created_at) "
            "VALUES (?,?,?,?,?,?,?)",
            (imp_id, (user or {}).get("id"), (user or {}).get("username"),
             (user or {}).get("display_name"), action, detail or "", now_iso()),
        )

    def get_import_history(self, conn, imp_id):
        """Renvoie le createur initial + la liste chronologique des actions."""
        base = conn.execute(
            "SELECT id, serial, created_at, updated_at, locked FROM imports WHERE id=?", (imp_id,)
        ).fetchone()
        rows = conn.execute(
            "SELECT id, user_id, username, display_name, action, detail, created_at "
            "FROM import_events WHERE import_id=? ORDER BY id ASC", (imp_id,)
        ).fetchall()
        events = [dict(r) for r in rows]
        created = next((e for e in events if e["action"] == "create"), None)
        return {
            "import_id": imp_id,
            "created_at": (base["created_at"] if base else None),
            "created_by": ({"username": created["username"], "display_name": created["display_name"]}
                           if created else None),
            "events": events,
        }

    def do_toggle_lock(self, conn, imp_id, user, body):
        """Verrouille / deverrouille une fiche et journalise l'action."""
        row = conn.execute("SELECT locked FROM imports WHERE id=?", (imp_id,)).fetchone()
        if not row:
            self.error(HTTPStatus.NOT_FOUND, "import not found")
            return
        want = body.get("locked") if isinstance(body, dict) else None
        locked = (0 if row["locked"] else 1) if want is None else (1 if want else 0)
        conn.execute("UPDATE imports SET locked=?, updated_at=? WHERE id=?",
                     (locked, now_iso(), imp_id))
        self.log_event(conn, imp_id, user, "lock" if locked else "unlock")
        conn.commit()
        self.json_out(200, {"ok": True, "locked": bool(locked)})

    # ------------------------------------------- modules d'analyse (Kanban,
    # prediction des retards, performance fournisseurs). Ces vues sont calculees
    # a la demande a partir des donnees reelles (imports + checklist_items +
    # suppliers) : rien n'est duplique en base, l'affichage reste donc synchronise
    # en temps reel avec l'etat courant des fiches.

    def active_import_rows(self, conn):
        """Fiches non supprimees, avec avancement de checklist et taches critiques
        encore ouvertes (necessaires au calcul du risque de retard)."""
        crit_ph = ",".join("?" * len(CRITICAL_TASK_KEYS))
        sql = (
            "SELECT i.*, s.name AS supplier_name, "
            "(SELECT COUNT(*) FROM checklist_items c WHERE c.import_id=i.id AND c.status IN ('done','na')) AS _done, "
            "(SELECT COUNT(*) FROM checklist_items c WHERE c.import_id=i.id) AS _total, "
            "(SELECT COUNT(*) FROM checklist_items c WHERE c.import_id=i.id "
            " AND c.status NOT IN ('done','na') "
            " AND (c.task_key IN (" + crit_ph + ") "
            "      OR c.task_key LIKE '%invoice%' OR c.task_key LIKE '%facture%' "
            "      OR c.task_key LIKE '%bol%')) AS open_critical "
            "FROM imports i JOIN suppliers s ON s.id=i.supplier_id "
            "WHERE (i.deleted = 0 OR i.deleted IS NULL) "
            "ORDER BY COALESCE(NULLIF(i.eta_dest, ''), i.eta)"
        )
        params = list(CRITICAL_TASK_KEYS)
        return [dict(r) for r in conn.execute(sql, params).fetchall()]

    @staticmethod
    def progress_ratio(row):
        """Part de taches completees (0..1) pour une fiche."""
        total = row.get("_total") or 0
        if total <= 0:
            return 0.0
        return float(row.get("_done") or 0) / float(total)

    @staticmethod
    def day_diff(value, ref):
        """Ecart en jours entre une date ISO et une date de reference (v - ref)."""
        try:
            v = datetime.fromisoformat(str(value)[:10]).date()
        except (TypeError, ValueError):
            return None
        return (v - ref).days

    @staticmethod
    def arrival_ref(row):
        """Reference d'arrivee pour TOUS les calculs de delais/retards :
        ETA DEST (destination) par defaut, repli sur l'ETA historique des
        fiches anciennes (aucune donnee de retard perdue)."""
        if not row:
            return None
        for key in ("eta_dest", "eta", "eta_van"):
            try:
                v = row.get(key)
            except (KeyError, IndexError):
                v = None
            v = (v or "").strip()
            if v:
                return v
        return None

    def import_summary(self, row):
        """Resume compact d'une fiche pour les cartes et tableaux des modules."""
        return {
            "id": row["id"],
            "serial": row.get("serial"),
            "supplier_id": row.get("supplier_id"),
            "supplier_name": row.get("supplier_name"),
            "destination": row.get("destination"),
            "po_number": row.get("po_number"),
            "inbsip": row.get("inbsip"),
            "doc_number": row.get("doc_number"),
            "container": row.get("container"),
            "transitaire_bol": row.get("transitaire_bol"),
            "pallets": row.get("pallets"),
            "etd": row.get("etd"),
            "eta": row.get("eta"),
            "locked": row.get("locked") or 0,
            "done": row.get("_done") or 0,
            "total": row.get("_total") or 0,
            "progress": round(self.progress_ratio(row) * 100, 1),
        }

    # Ordre de presentation des colonnes du Kanban.
    KANBAN_STAGES = ("scheduled", "in_transit", "arriving", "arrived", "completed")

    def kanban_stage(self, row, today):
        """Etape d'une fiche :
        completed  -> checklist entierement complete
        arrived    -> ETA depassee mais checklist incomplete
        arriving   -> ETA dans les 7 prochains jours
        in_transit -> ETD atteint, ETA a plus de 7 jours
        scheduled  -> depart non encore effectue (regle par defaut)."""
        total = row.get("_total") or 0
        if total > 0 and self.progress_ratio(row) >= 1.0:
            return "completed"
        days_eta = self.day_diff(self.arrival_ref(row), today)
        if days_eta is not None and days_eta < 0:
            return "arrived"
        if days_eta is not None and days_eta <= 7:
            return "arriving"
        days_etd = self.day_diff(row.get("etd"), today)
        if days_etd is not None and days_etd <= 0:
            return "in_transit"
        return "scheduled"

    def get_kanban(self, conn):
        today = datetime.now().date()
        groups = {key: [] for key in self.KANBAN_STAGES}
        for row in self.active_import_rows(conn):
            groups[self.kanban_stage(row, today)].append(self.import_summary(row))
        return {
            "generated_at": now_iso(),
            "stages": [{"key": key, "count": len(groups[key]), "imports": groups[key]}
                       for key in self.KANBAN_STAGES],
        }

    def supplier_delay_factor(self, conn):
        """Retard moyen observe par fournisseur sur les fiches dont l'ETA est
        depassee (nombre moyen de taches encore ouvertes). Sert d'historique au
        modele de prediction."""
        today = datetime.now().date()
        rows = self.active_import_rows(conn)
        acc = {}
        for r in rows:
            days = self.day_diff(self.arrival_ref(r), today)
            if days is None or days >= 0:
                continue
            remaining = (r.get("_total") or 0) - (r.get("_done") or 0)
            acc.setdefault(r["supplier_id"], []).append(max(remaining, 0))
        return {sid: (sum(v) / len(v)) for sid, v in acc.items() if v}

    def predict_import(self, row, today, factor):
        """Estimation heuristique du risque de retard d'une fiche. Retourne un
        score 0-100, un niveau (low/medium/high), un nombre de jours de retard
        estime et la liste des raisons (cles de traduction cote client)."""
        reasons = []
        score = 0
        days_eta = self.day_diff(self.arrival_ref(row), today)
        prog = self.progress_ratio(row)
        total = row.get("_total") or 0

        if not self.arrival_ref(row):
            score += 20
            reasons.append("missing_eta")
        if not row.get("etd"):
            reasons.append("missing_etd")
        if not row.get("doc_number"):
            score += 10
            reasons.append("missing_doc")

        days_etd = self.day_diff(row.get("etd"), today)
        if total > 0:
            if prog >= 1.0:
                score -= 15  # checklist complete : risque nettement reduit
            if days_etd is not None and days_eta is not None:
                span = days_eta - days_etd
                if span > 0:
                    elapsed = max(0, min(span, -days_etd))
                    gap = (elapsed / span) - prog
                    if gap > 0.25:
                        score += 25
                        reasons.append("behind_schedule")
                    elif gap > 0.1:
                        score += 12
                        reasons.append("slightly_behind")

        if days_eta is not None and days_eta < 0 and (total == 0 or prog < 1.0):
            score += 30 + min(abs(days_eta), 30)
            reasons.append("eta_passed")

        if days_eta is not None and 0 <= days_eta <= 7 and total > 0 and prog < 0.6:
            score += 20
            reasons.append("close_eta_incomplete")

        open_critical = row.get("open_critical") or 0
        if open_critical > 0 and days_eta is not None and days_eta <= 7:
            score += 8 * open_critical
            reasons.append("critical_tasks_open")

        f = factor or 0
        score += min(f * 4, 15)
        if f >= 1.5:
            reasons.append("supplier_history")

        score = max(0, min(100, int(round(score))))
        level = "high" if score >= 60 else ("medium" if score >= 30 else "low")
        predicted = int(round(score / 20.0)) + (1 if f >= 1.5 else 0)
        predicted = max(0, min(predicted, 15))
        item = self.import_summary(row)
        item.update({
            "days_to_eta": days_eta,
            "open_critical": open_critical,
            "risk_score": score,
            "risk_level": level,
            "predicted_delay_days": predicted,
            "reasons": reasons,
        })
        return item

    def get_prediction(self, conn):
        today = datetime.now().date()
        factors = self.supplier_delay_factor(conn)
        items = [self.predict_import(r, today, factors.get(r["supplier_id"], 0.0))
                 for r in self.active_import_rows(conn)]
        order = {"high": 0, "medium": 1, "low": 2}
        items.sort(key=lambda x: (order.get(x["risk_level"], 3), -x["risk_score"], x.get("eta") or "9999"))
        summary = {
            "high": sum(1 for i in items if i["risk_level"] == "high"),
            "medium": sum(1 for i in items if i["risk_level"] == "medium"),
            "low": sum(1 for i in items if i["risk_level"] == "low"),
            "at_risk": sum(1 for i in items if i["risk_level"] in ("high", "medium")),
            "avg_delay_days": round(sum(i["predicted_delay_days"] for i in items) / len(items), 1) if items else 0,
        }
        return {"generated_at": now_iso(), "summary": summary, "items": items}

    def get_performance(self, conn):
        today = datetime.now().date()
        buckets = {}
        for r in self.active_import_rows(conn):
            b = buckets.setdefault(r["supplier_id"], {
                "supplier_id": r["supplier_id"], "name": r.get("supplier_name"),
                "imports": 0, "completed": 0, "past_due": 0, "on_time": 0,
                "delay_sum": 0, "progress_sum": 0.0, "with_doc": 0, "pallets": 0,
            })
            prog = self.progress_ratio(r)
            total = r.get("_total") or 0
            done = r.get("_done") or 0
            complete = total > 0 and done >= total
            b["imports"] += 1
            b["progress_sum"] += prog
            b["pallets"] += r.get("pallets") or 0
            if r.get("doc_number"):
                b["with_doc"] += 1
            if complete:
                b["completed"] += 1
            days_eta = self.day_diff(self.arrival_ref(r), today)
            if days_eta is not None and days_eta < 0:
                b["past_due"] += 1
                if complete:
                    b["on_time"] += 1
                else:
                    b["delay_sum"] += abs(days_eta)
        out = []
        for b in buckets.values():
            n = b["imports"] or 1
            past = b["past_due"]
            on_time_rate = (b["on_time"] / past) if past else None
            avg_progress = b["progress_sum"] / n
            docs_rate = b["with_doc"] / n
            avg_delay = (b["delay_sum"] / past) if past else 0.0
            # Score pondere (0-100) : ponctualite 50, avancement 30, documents 20.
            on_time_component = on_time_rate if on_time_rate is not None else avg_progress
            score = int(round(on_time_component * 50 + avg_progress * 30 + docs_rate * 20))
            grade = "A" if score >= 85 else "B" if score >= 70 else "C" if score >= 50 else "D"
            out.append({
                "supplier_id": b["supplier_id"], "name": b["name"],
                "imports": b["imports"], "completed": b["completed"],
                "past_due": past, "on_time": b["on_time"],
                "on_time_rate": None if on_time_rate is None else round(on_time_rate * 100, 1),
                "avg_progress": round(avg_progress * 100, 1),
                "docs_rate": round(docs_rate * 100, 1),
                "avg_delay_days": round(avg_delay, 1),
                "pallets": b["pallets"], "score": score, "grade": grade,
            })
        out.sort(key=lambda x: (-x["score"], x["name"] or ""))
        return {"generated_at": now_iso(), "suppliers": out}

    def stats(self, conn):
        today = datetime.now().date().isoformat()
        week = (datetime.now().date() + timedelta(days=7)).isoformat()
        active = conn.execute(
            "SELECT COUNT(*) AS n FROM imports WHERE deleted = 0 OR deleted IS NULL"
        ).fetchone()["n"]
        arrivals = conn.execute(
            "SELECT COUNT(*) AS n FROM imports WHERE (deleted = 0 OR deleted IS NULL) "
            "AND COALESCE(NULLIF(eta_dest, ''), eta) BETWEEN ? AND ? "
            "AND COALESCE(NULLIF(eta_dest, ''), eta) >= ?",
            (today, week, today),
        ).fetchone()["n"]
        total_tasks = conn.execute(
            "SELECT COUNT(*) AS n FROM checklist_items c JOIN imports i ON i.id = c.import_id "
            "WHERE i.deleted = 0 OR i.deleted IS NULL"
        ).fetchone()["n"]
        done_tasks = conn.execute(
            "SELECT COUNT(*) AS n FROM checklist_items c JOIN imports i ON i.id = c.import_id "
            "WHERE (i.deleted = 0 OR i.deleted IS NULL) AND c.status IN ('done','na')"
        ).fetchone()["n"]
        suppliers = conn.execute("SELECT COUNT(*) AS n FROM suppliers").fetchone()["n"]
        by_supplier = conn.execute(
            "SELECT s.name AS name, COUNT(i.id) AS imports, "
            "COALESCE(SUM((SELECT COUNT(*) FROM checklist_items c WHERE c.import_id=i.id)),0) AS tasks, "
            "COALESCE(SUM((SELECT COUNT(*) FROM checklist_items c WHERE c.import_id=i.id "
            "AND c.status IN ('done','na'))),0) AS done "
            "FROM suppliers s LEFT JOIN imports i ON i.supplier_id = s.id AND (i.deleted = 0 OR i.deleted IS NULL) "
            "GROUP BY s.id ORDER BY s.name"
        ).fetchall()
        return {
            "active_imports": active,
            "arrivals_7d": arrivals,
            "checklist_done": done_tasks,
            "checklist_total": total_tasks,
            "suppliers": suppliers,
            "by_supplier": [dict(r) for r in by_supplier],
        }

    def handle_post(self, path):
        parts = [p for p in path.split("/") if p]
        if parts[:1] != ["api"]:
            self.error(HTTPStatus.NOT_FOUND, "not found")
            return
        if parts[1:] == ["login"]:
            self.do_login()
            return
        token = self.require_auth()
        if token is None:
            self.error(HTTPStatus.UNAUTHORIZED, "unauthorized")
            return
        conn = db_conn()
        try:
            if parts[1:] == ["password"]:
                self.do_password(conn, token["id"])
            elif parts[1:] == ["users"]:
                if self.require_admin() is None:
                    return
                self.do_create_user(conn)
            elif parts[1:] == ["suppliers"]:
                self.do_create_supplier(conn)
            elif parts[1:] == ["imports"]:
                self.do_create_import(conn, token)
            elif parts[1:] == ["import"]:
                if self.require_admin() is None:
                    return
                self.do_import_backup(conn)
            elif parts[1:] == ["backup", "now"]:
                if self.require_admin() is None:
                    return
                res = backup_scheduler.run_snapshot()
                self.json_out(200, res)
            elif len(parts) == 4 and parts[1] == "imports" and parts[3] == "attachments":
                self.do_upload_attachments(conn, int(parts[2]), token)
            elif parts[1:] == ["assistant", "chat"]:
                self.do_assistant_chat(conn)
            elif parts[1:] == ["assistant", "search"]:
                self.do_assistant_search(conn)
            elif parts[1:] == ["assistant", "email-risk"]:
                self.do_assistant_email_risk(conn)
            elif parts[1:] == ["assistant", "documents"]:
                self.do_assistant_upload(conn)
            elif parts[1:] == ["reconcile"]:
                self.do_reconcile(conn, token)
            elif parts[1:] == ["rte", "upload"]:
                self.do_rte_upload()
            else:
                self.error(HTTPStatus.NOT_FOUND, "endpoint not found")
        finally:
            conn.close()

    def handle_put(self, path):
        parts = [p for p in path.split("/") if p]
        if parts[:1] != ["api"]:
            self.error(HTTPStatus.NOT_FOUND, "not found")
            return
        resource = parts[1]
        target = parts[2] if len(parts) >= 3 else ""
        sub = parts[3] if len(parts) >= 4 else ""
        token = self.require_auth()
        if token is None:
            self.error(HTTPStatus.UNAUTHORIZED, "unauthorized")
            return
        conn = db_conn()
        try:
            try:
                body = self.read_body()
            except ValueError:
                self.error(HTTPStatus.BAD_REQUEST, "bad body")
                return
            if resource == "suppliers" and len(parts) == 3:
                self.do_update_supplier(conn, int(target), body)
            elif resource == "settings" and len(parts) == 2:
                self.do_update_settings(conn, token, body)
            elif resource == "users" and len(parts) == 3:
                if self.require_admin() is None:
                    return
                self.do_update_user(conn, int(target), body, token["id"], token["role"])
            elif resource == "imports" and len(parts) == 3:
                self.do_update_import(conn, int(target), body, token)
            elif resource == "imports" and len(parts) == 4 and sub == "checklist":
                self.do_update_checklist(conn, int(target), body, token)
            elif resource == "imports" and len(parts) == 4 and sub == "lock":
                # Verrouillage / deverrouillage d'une fiche (toggle + journal).
                self.do_toggle_lock(conn, int(target), token, body)
            elif resource == "imports" and len(parts) == 4 and sub == "trash":
                self.do_soft_delete_import(conn, int(target), True, token)
            elif resource == "imports" and len(parts) == 4 and sub == "restore":
                self.do_soft_delete_import(conn, int(target), False, token)
            elif resource == "reconcile" and len(parts) == 5 and parts[2] == "runs" and parts[4] == "save":
                # Bouton "Enregistrer" : marque le rapprochement comme valide.
                self.save_reconcile_run(conn, int(parts[3]), token)
            else:
                self.error(HTTPStatus.NOT_FOUND, "endpoint not found")
        finally:
            conn.close()

    def handle_delete(self, path):
        parts = [p for p in path.split("/") if p]
        if parts[:1] != ["api"]:
            self.error(HTTPStatus.NOT_FOUND, "not found")
            return
        token = self.require_auth()
        if token is None:
            self.error(HTTPStatus.UNAUTHORIZED, "unauthorized")
            return
        conn = db_conn()
        try:
            if len(parts) == 3 and parts[1] == "suppliers":
                self.do_delete_supplier(conn, int(parts[2]))
            elif len(parts) == 3 and parts[1] == "users":
                if self.require_admin() is None:
                    return
                self.do_delete_user(conn, int(parts[2]), token["id"])
            elif len(parts) == 3 and parts[1] == "imports":
                self.do_delete_import(conn, int(parts[2]))
            elif len(parts) == 5 and parts[1] == "imports" and parts[3] == "attachments":
                self.do_delete_attachment(conn, int(parts[2]), int(parts[4]), token)
            else:
                self.error(HTTPStatus.NOT_FOUND, "endpoint not found")
        finally:
            conn.close()

    def do_login(self):
        ip = self.client_address[0]
        if not login_allowed(ip):
            self.error(HTTPStatus.TOO_MANY_REQUESTS, "locked")
            return
        try:
            body = self.read_body()
        except ValueError:
            self.error(HTTPStatus.BAD_REQUEST, "bad body")
            return
        username = str(body.get("username") or "").strip()
        pw = body.get("password")
        conn = db_conn()
        try:
            u = conn.execute(
                "SELECT * FROM users WHERE username = ? COLLATE NOCASE", (username,)
            ).fetchone()
        finally:
            conn.close()
        if not u or not verify_password(pw, u["password_hash"]):
            register_failure(ip)
            self.error(HTTPStatus.UNAUTHORIZED, "invalid password")
            return
        clear_guard(ip)
        token = make_token()
        with sessions_lock:
            sessions[token] = {"user_id": u["id"], "exp": time.time() + SESSION_TTL}
        payload = "sid=" + token
        payload += "; Path=/; HttpOnly; SameSite=Strict; Max-Age=43200"
        self.send_response(HTTPStatus.OK)
        self.send_header("Set-Cookie", payload)
        self.send_header("Content-Type", "application/json")
        body = json.dumps({
            "token": token,
            "user": {"id": u["id"], "username": u["username"],
                     "display_name": u["display_name"], "role": u["role"]},
        }).encode("utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_password(self, conn, user_id):
        try:
            body = self.read_body()
        except ValueError:
            self.error(HTTPStatus.BAD_REQUEST, "bad body")
            return
        current = body.get("current")
        new = body.get("new")
        if not current or not new or len(new) < 6:
            self.error(HTTPStatus.BAD_REQUEST, "weak password")
            return
        u = conn.execute("SELECT password_hash FROM users WHERE id=?", (user_id,)).fetchone()
        if not u or not verify_password(current, u["password_hash"]):
            self.error(HTTPStatus.UNAUTHORIZED, "wrong current password")
            return
        conn.execute("UPDATE users SET password_hash=?, updated_at=? WHERE id=?",
                     (hash_password(new), now_iso(), user_id))
        conn.commit()
        self.json_out(200, {"ok": True})

    def user_prefs(self, conn, user_id):
        row = conn.execute("SELECT prefs FROM users WHERE id=?", (user_id,)).fetchone()
        if not row or not row["prefs"]:
            return {}
        try:
            p = json.loads(row["prefs"])
        except (TypeError, ValueError):
            return {}
        if not isinstance(p, dict):
            return {}
        return {k: bool(v) for k, v in p.items() if k in NOTIFICATION_KEYS}

    def get_app_settings(self, conn, token):
        sync_min = _as_int(get_setting(conn, "fx_sync_min", str(DEFAULT_FX_SYNC_MIN)),
                           DEFAULT_FX_SYNC_MIN) or DEFAULT_FX_SYNC_MIN
        tolerance = _as_int(get_setting(conn, "imp_delay_tolerance",
                                        str(DEFAULT_DELAY_TOLERANCE_DAYS)),
                            DEFAULT_DELAY_TOLERANCE_DAYS)
        return {
            "fx": {
                "base": get_setting(conn, "fx_base", DEFAULT_FX_BASE) or DEFAULT_FX_BASE,
                "sync_min": sync_min,
                "has_api_key": bool((get_setting(conn, "fx_api_key", "") or "").strip()),
            },
            "imp": {
                "incoterm_default": get_setting(conn, "imp_incoterm", DEFAULT_INCOTERM) or DEFAULT_INCOTERM,
                "delay_tolerance_days": tolerance,
                "email_template_fr": get_setting(conn, "imp_email_fr", DEFAULT_EMAIL_TEMPLATE_FR),
                "email_template_en": get_setting(conn, "imp_email_en", DEFAULT_EMAIL_TEMPLATE_EN),
            },
            "notifications": self.user_prefs(conn, token["id"]),
        }

    def do_update_settings(self, conn, token, body):
        if not isinstance(body, dict):
            self.error(HTTPStatus.BAD_REQUEST, "bad body")
            return
        fx_changed = False
        fx = body.get("fx")
        if isinstance(fx, dict):
            if "base" in fx and str(fx.get("base") or "").strip():
                base = str(fx["base"]).strip().upper()
                if base in ALLOWED_FX_BASE:
                    set_setting(conn, "fx_base", base)
                    fx_changed = True
            if "sync_min" in fx:
                sm = _as_int(fx.get("sync_min"))
                if sm is not None and 5 <= sm <= 1440:
                    set_setting(conn, "fx_sync_min", sm)
                    fx_changed = True
            if "api_key" in fx and fx["api_key"] is not None:
                set_setting(conn, "fx_api_key", str(fx["api_key"]).strip())
                fx_changed = True
        notifs = body.get("notifications")
        if isinstance(notifs, dict):
            upd = {}
            for k, v in notifs.items():
                if k in NOTIFICATION_KEYS:
                    upd[k] = bool(v)
            if upd:
                merged = dict(self.user_prefs(conn, token["id"]))
                merged.update(upd)
                conn.execute("UPDATE users SET prefs=?, updated_at=? WHERE id=?",
                             (json.dumps(merged), now_iso(), token["id"]))
        imp = body.get("imp")
        if isinstance(imp, dict):
            if "incoterm_default" in imp and str(imp.get("incoterm_default") or "").strip():
                set_setting(conn, "imp_incoterm", str(imp["incoterm_default"]).strip())
            if "delay_tolerance_days" in imp:
                d = _as_int(imp.get("delay_tolerance_days"))
                if d is not None and 0 <= d <= 365:
                    set_setting(conn, "imp_delay_tolerance", d)
            for key in ("imp_email_fr", "imp_email_en"):
                if key in imp and imp[key] is not None:
                    set_setting(conn, key, sanitize_rich_html(str(imp[key])))
        conn.commit()
        if fx_changed:
            invalidate_rates()
        self.json_out(200, self.get_app_settings(conn, token))

    def do_backup(self, conn):
        """Sauvegarde manuelle : archive ZIP (base de donnees + documents).
        Acces reserve aux administrateurs (verifie par l'appelant)."""
        try:
            conn.execute("PRAGMA wal_checkpoint(FULL)")
        except Exception:
            pass
        tmpdb = tempfile.mktemp(prefix="radisson_backup_", suffix=".db")
        buf = BytesIO()
        try:
            src = sqlite3.connect(DB_PATH)
            try:
                dst = sqlite3.connect(tmpdb)
                try:
                    src.backup(dst)
                    dst.commit()
                finally:
                    dst.close()
            finally:
                src.close()
            with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
                zf.write(tmpdb, arcname="radisson.db")
                for base_dir, _dirs, files in os.walk(ATTACH_DIR):
                    for fn in files:
                        full = os.path.join(base_dir, fn)
                        if os.path.isfile(full):
                            zf.write(full, arcname="attachments/" + fn)
        finally:
            if os.path.isfile(tmpdb):
                try:
                    os.remove(tmpdb)
                except OSError:
                    pass
        payload = buf.getvalue()
        fname = "radisson_backup_%s.zip" % datetime.now().strftime("%Y%m%d_%H%M%S")
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", "application/zip")
        self.send_header("Content-Disposition", 'attachment; filename="%s"' % fname)
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(payload)

    def do_import_backup(self, conn):
        """Restauration securisee d'une sauvegarde (.zip ou .db).
        L'ancienne base est conservee dans data/backups avant remplacement
        (aucune perte) et les documents sont ajoutes sans rien supprimer."""
        try:
            parts = self.read_upload_parts(max_size=64 * 1024 * 1024)
        except ValueError:
            self.error(HTTPStatus.BAD_REQUEST, "bad upload")
            return
        payload = None
        fname = ""
        for part in parts:
            if part.get("filename") and part["data"]:
                payload = part["data"]
                fname = clean_file_name(part["filename"]).lower()
                break
        if payload is None:
            self.error(HTTPStatus.BAD_REQUEST, "file required")
            return
        workdir = tempfile.mkdtemp(prefix="radisson_restore_")
        attachments = []
        try:
            if fname.endswith(".zip"):
                try:
                    zf = zipfile.ZipFile(BytesIO(payload), "r")
                except zipfile.BadZipFile:
                    self.error(HTTPStatus.BAD_REQUEST, "invalid backup: not a zip")
                    return
                with zf:
                    names = set(zf.namelist())
                    if "radisson.db" not in names:
                        self.error(HTTPStatus.BAD_REQUEST, "invalid backup: no database")
                        return
                    db_bytes = zf.read("radisson.db")
                    attachments = [
                        n[len("attachments/"):] for n in names
                        if n.startswith("attachments/") and not n.endswith("/")
                    ]
            else:
                db_bytes = payload
            tmpdb = os.path.join(workdir, "radisson.db")
            with open(tmpdb, "wb") as fh:
                fh.write(db_bytes)
            try:
                chk = sqlite3.connect(tmpdb)
                try:
                    row = chk.execute("PRAGMA quick_check").fetchone()
                    if not row or row[0] != "ok":
                        self.error(HTTPStatus.BAD_REQUEST, "invalid database file")
                        return
                    tables = set(r[0] for r in chk.execute(
                        "SELECT name FROM sqlite_master WHERE type='table'").fetchall())
                    if not {"imports", "checklist_items", "users"} <= tables:
                        self.error(HTTPStatus.BAD_REQUEST, "invalid backup database")
                        return
                finally:
                    chk.close()
            except sqlite3.Error:
                self.error(HTTPStatus.BAD_REQUEST, "invalid database file")
                return
            safe_dir = os.path.join(DATA_DIR, "backups")
            os.makedirs(safe_dir, exist_ok=True)
            stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            conn.execute("PRAGMA wal_checkpoint(FULL)")
            conn.commit()
            shutil.copyfile(DB_PATH, os.path.join(safe_dir, "pre_restore_%s.db" % stamp))
            with open(DB_PATH, "wb") as fh:
                fh.write(db_bytes)
            for suffix in ("-wal", "-shm"):
                p = DB_PATH + suffix
                if os.path.exists(p):
                    try:
                        os.remove(p)
                    except OSError:
                        pass
            if fname.endswith(".zip") and attachments:
                with zipfile.ZipFile(BytesIO(payload), "r") as zf:
                    for n in attachments:
                        base_name = os.path.basename(n)
                        if not base_name:
                            continue
                        with open(os.path.join(ATTACH_DIR, base_name), "wb") as fh:
                            fh.write(zf.read("attachments/" + n))
            restored = sqlite3.connect(DB_PATH)
            restored.row_factory = sqlite3.Row
            try:
                n = restored.execute("SELECT COUNT(*) AS n FROM imports").fetchone()["n"]
            finally:
                restored.close()
            self.json_out(200, {"ok": True, "message": "backup restored", "imports": n})
        finally:
            shutil.rmtree(workdir, ignore_errors=True)

    def do_create_user(self, conn):
        try:
            body = self.read_body()
        except ValueError:
            self.error(HTTPStatus.BAD_REQUEST, "bad body")
            return
        username = str(body.get("username") or "").strip()
        display = str(body.get("display_name") or "").strip() or username
        pw = body.get("password") or ""
        role = body.get("role") or "user"
        if not is_valid_username(username):
            self.error(HTTPStatus.BAD_REQUEST, "weak username")
            return
        if len(pw) < 6:
            self.error(HTTPStatus.BAD_REQUEST, "weak password")
            return
        if role not in ("user", "admin"):
            self.error(HTTPStatus.BAD_REQUEST, "bad role")
            return
        exists = conn.execute(
            "SELECT 1 FROM users WHERE username = ? COLLATE NOCASE", (username,)
        ).fetchone()
        if exists:
            self.error(HTTPStatus.CONFLICT, "username exists")
            return
        cur = conn.execute(
            "INSERT INTO users (username, password_hash, display_name, role, created_at, updated_at) "
            "VALUES (?,?,?,?,?,?)",
            (username, hash_password(pw), display, role, now_iso(), now_iso()),
        )
        conn.commit()
        self.json_out(200, {"ok": True, "id": cur.lastrowid})

    def do_update_user(self, conn, uid, body, self_id, self_role):
        target = conn.execute("SELECT * FROM users WHERE id=?", (uid,)).fetchone()
        if not target:
            self.error(HTTPStatus.NOT_FOUND, "user not found")
            return
        display = body.get("display_name")
        if display is not None:
            display = str(display).strip() or target["display_name"]
        new_role = body.get("role", target["role"])
        if new_role not in ("user", "admin"):
            self.error(HTTPStatus.BAD_REQUEST, "bad role")
            return
        if uid == self_id and new_role != target["role"]:
            self.error(HTTPStatus.BAD_REQUEST, "cannot change own role")
            return
        if target["role"] == "admin" and new_role != "admin":
            admins = conn.execute("SELECT COUNT(*) AS n FROM users WHERE role='admin'").fetchone()["n"]
            if admins <= 1:
                self.error(HTTPStatus.BAD_REQUEST, "last admin")
                return
        cols = ["display_name=?", "role=?", "updated_at=?"]
        vals = [display if display is not None else target["display_name"], new_role, now_iso()]
        pw = body.get("password")
        if pw is not None:
            if len(pw) < 6:
                self.error(HTTPStatus.BAD_REQUEST, "weak password")
                return
            cols.append("password_hash=?")
            vals.append(hash_password(pw))
        vals.append(uid)
        conn.execute("UPDATE users SET " + ", ".join(cols) + " WHERE id=?", vals)
        conn.commit()
        self.json_out(200, {"ok": True})

    def do_delete_user(self, conn, uid, self_id):
        if uid == self_id:
            self.error(HTTPStatus.BAD_REQUEST, "cannot delete self")
            return
        target = conn.execute("SELECT * FROM users WHERE id=?", (uid,)).fetchone()
        if not target:
            self.error(HTTPStatus.NOT_FOUND, "user not found")
            return
        if target["role"] == "admin":
            admins = conn.execute("SELECT COUNT(*) AS n FROM users WHERE role='admin'").fetchone()["n"]
            if admins <= 1:
                self.error(HTTPStatus.BAD_REQUEST, "last admin")
                return
        conn.execute("DELETE FROM users WHERE id=?", (uid,))
        conn.commit()
        self.json_out(200, {"ok": True})

    def clean_fields(self, body, allowed):
        out = {}
        for key in allowed:
            if key in body:
                out[key] = body[key]
        return out

    def do_create_supplier(self, conn):
        try:
            body = self.read_body()
        except ValueError:
            self.error(HTTPStatus.BAD_REQUEST, "bad body")
            return
        name = (body.get("name") or "").strip()
        if not name:
            self.error(HTTPStatus.BAD_REQUEST, "name required")
            return
        fields = self.clean_fields(body, ["code", "city", "country", "contact", "email", "notes"])
        if "notes" in fields:
            fields["notes"] = sanitize_rich_html(fields["notes"])
        cur = conn.execute(
            "INSERT INTO suppliers (name, code, city, country, contact, email, notes, created_at, updated_at) "
            "VALUES (?,?,?,?,?,?,?,?,?)",
            (name, fields.get("code", ""), fields.get("city", ""), fields.get("country", ""),
             fields.get("contact", ""), fields.get("email", ""), fields.get("notes", ""), now_iso(), now_iso()),
        )
        conn.commit()
        self.json_out(200, {"id": cur.lastrowid})

    def do_update_supplier(self, conn, sup_id, body):
        fields = self.clean_fields(body, ["name", "code", "city", "country", "contact", "email", "notes"])
        if "notes" in fields:
            fields["notes"] = sanitize_rich_html(fields["notes"])
        if "name" in fields:
            fields["name"] = (fields["name"] or "").strip()
            if not fields["name"]:
                self.error(HTTPStatus.BAD_REQUEST, "name required")
                return
        fields["updated_at"] = now_iso()
        if not fields:
            self.error(HTTPStatus.BAD_REQUEST, "no fields")
            return
        sets = ", ".join(f"{k}=?" for k in fields)
        conn.execute(f"UPDATE suppliers SET {sets} WHERE id=?", (*fields.values(), sup_id))
        conn.commit()
        self.json_out(200, {"ok": True})

    def do_create_import(self, conn, user=None):
        try:
            body = self.read_body()
        except ValueError:
            self.error(HTTPStatus.BAD_REQUEST, "bad body")
            return
        supplier_id = body.get("supplier_id")
        if not supplier_id:
            self.error(HTTPStatus.BAD_REQUEST, "supplier_id required")
            return
        fields = self.clean_fields(body, ["origin", "port_of_loading", "destination", "port_of_discharge",
                                           "po_number", "inbsip", "doc_number", "pallets", "transitaire_bol",
                                           "container", "etd", "eta", "eta_van", "eta_dest",
                                           "qc_sampling_qc", "qc_sampling_reception", "notes", "add_info"])
        # `notes` est une zone riche (editeur WYSIWYG) ; `add_info` est un JSON, non assaini.
        if "notes" in fields:
            fields["notes"] = sanitize_rich_html(fields["notes"])
        pallets = fields.get("pallets")
        serial = self.next_import_serial(conn)
        ts = now_iso()
        cur = conn.execute(
            "INSERT INTO imports (supplier_id, serial, origin, port_of_loading, destination, port_of_discharge, "
            "po_number, inbsip, doc_number, pallets, transitaire_bol, "
            "container, etd, eta, eta_van, eta_dest, qc_sampling_qc, qc_sampling_reception, notes, add_info, created_at, updated_at) "
            "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            (supplier_id, serial, fields.get("origin", ""), fields.get("port_of_loading", ""), fields.get("destination", ""),
             fields.get("port_of_discharge", ""), fields.get("po_number", ""), fields.get("inbsip", ""),
             fields.get("doc_number", ""), pallets, fields.get("transitaire_bol", ""),
             fields.get("container", ""), fields.get("etd", ""), fields.get("eta", ""),
             fields.get("eta_van", ""), fields.get("eta_dest", ""),
             1 if fields.get("qc_sampling_qc") else 0, 1 if fields.get("qc_sampling_reception") else 0,
             fields.get("notes", ""), fields.get("add_info", ""),
             ts, ts),
        )
        iid = cur.lastrowid
        self.log_event(conn, iid, user, "create")
        conn.commit()
        self.json_out(200, {"id": iid, "serial": serial, "created_at": ts, "locked": False})

    def next_import_serial(self, conn):
        row = conn.execute(
            "UPDATE settings SET value = CAST(value AS INTEGER) + 1 "
            "WHERE key='import_serial_next' RETURNING CAST(value AS INTEGER) - 1 AS n"
        ).fetchone()
        if row is not None:
            return "FI%06d" % int(row["n"])
        max_n = conn.execute(
            "SELECT MAX(CAST(substr(serial, 3) AS INTEGER)) AS m FROM imports WHERE serial LIKE 'FI%'"
        ).fetchone()["m"]
        return "FI%06d" % ((max_n or 0) + 1)

    def do_update_import(self, conn, imp_id, body, user=None):
        # Garde « Archives » : une fiche verrouillée (locked=1) est en lecture seule
        # stricte. Le seul passage autorise est l'action unlock qui passe par
        # l'endpoint dedie /api/imports/<id>/lock (do_toggle_lock), jamais par un
        # update generique. On rejette donc toute modification ici (RFC 422).
        row = conn.execute("SELECT locked FROM imports WHERE id=?", (imp_id,)).fetchone()
        if not row:
            self.error(HTTPStatus.NOT_FOUND, "import not found")
            return
        if row["locked"]:
            self.error(HTTPStatus.UNPROCESSABLE_ENTITY, "record_locked_update")
            return
        fields = self.clean_fields(body, ["origin", "port_of_loading", "supplier_id", "destination", "port_of_discharge",
                                           "po_number", "inbsip", "doc_number", "pallets", "transitaire_bol",
                                           "container", "etd", "eta", "eta_van", "eta_dest",
                                           "qc_sampling_qc", "qc_sampling_reception", "notes", "add_info"])
        if "notes" in fields:
            fields["notes"] = sanitize_rich_html(fields["notes"])
        fields["updated_at"] = now_iso()
        for col in ["qc_sampling_qc", "qc_sampling_reception"]:
            if col in fields:
                fields[col] = 1 if fields[col] else 0
        if not fields:
            self.error(HTTPStatus.BAD_REQUEST, "no fields")
            return
        sets = ", ".join(f"{k}=?" for k in fields)
        conn.execute(f"UPDATE imports SET {sets} WHERE id=?", (*fields.values(), imp_id))
        self.log_event(conn, imp_id, user, "update")
        conn.commit()
        self.json_out(200, {"ok": True})

    def do_update_checklist(self, conn, imp_id, body, user=None):
        items = body.get("items")
        if not isinstance(items, list):
            self.error(HTTPStatus.BAD_REQUEST, "items required")
            return
        conn.execute("DELETE FROM checklist_items WHERE import_id=?", (imp_id,))
        for pos, it in enumerate(items):
            status = it.get("status") if it.get("status") in STATUSES else "pending"
            links = link_list_from_item(it)
            conn.execute(
                "INSERT INTO checklist_items (import_id, task_key, task_label_fr, task_label_en, status, notes, link, links, meta, position) "
                "VALUES (?,?,?,?,?,?,?,?,?,?)",
                (imp_id, it.get("task_key"), it.get("task_label_fr", ""), it.get("task_label_en", ""),
                 status, sanitize_rich_html(it.get("notes")),
                 links[0] if links else "", json.dumps(links), it.get("meta", ""), pos),
            )
        self.log_event(conn, imp_id, user, "checklist", "%d" % len(items))
        conn.commit()
        self.json_out(200, {"ok": True})

    def read_upload_parts(self, max_size=None):
        content_type = self.headers.get("Content-Type", "")
        limit = max_size or MAX_UPLOAD
        length = int(self.headers.get("Content-Length") or 0)
        if length <= 0 or length > limit:
            raise ValueError("bad size")
        if "multipart/form-data" not in content_type:
            raise ValueError("not multipart")
        raw = self.rfile.read(length)
        framed = b"Content-Type: " + content_type.encode("utf-8") + b"\r\n\r\n" + raw
        msg = BytesParser(policy=policy.default).parsebytes(framed)
        if not msg.is_multipart():
            raise ValueError("parse failed")
        parts = []
        for part in msg.iter_parts():
            if part.is_multipart():
                continue
            parts.append({
                "name": part.get_param("name", header="content-disposition"),
                "filename": part.get_filename(),
                "content_type": part.get_content_type(),
                "data": part.get_payload(decode=True) or b"",
            })
        return parts

    def do_upload_attachments(self, conn, imp_id, user=None):
        exists = conn.execute("SELECT 1 FROM imports WHERE id=?", (imp_id,)).fetchone()
        if not exists:
            self.error(HTTPStatus.NOT_FOUND, "import not found")
            return
        try:
            parts = self.read_upload_parts()
        except ValueError:
            self.error(HTTPStatus.BAD_REQUEST, "bad upload")
            return
        for part in parts:
            if not (part.get("filename") and part["data"]):
                continue
            original = part["filename"]
            ext = os.path.splitext(original.lower())[1]
            if ext not in ALLOWED_ATT_EXT:
                self.error(HTTPStatus.BAD_REQUEST, "type not allowed")
                return
        added = []
        for part in parts:
            if not (part.get("filename") and part["data"]):
                continue
            original = part["filename"]
            clean, stored = stored_file_name(original)
            ctype = part.get("content_type") or mimetypes.guess_type(clean)[0] or "application/octet-stream"
            with open(os.path.join(ATTACH_DIR, stored), "wb") as fh:
                fh.write(part["data"])
            conn.execute(
                "INSERT INTO attachments (import_id, stored_name, original_name, content_type, size, created_at) "
                "VALUES (?,?,?,?,?,?)",
                (imp_id, stored, clean, ctype, len(part["data"]), now_iso()),
            )
            added.append(clean)
        if added:
            self.log_event(conn, imp_id, user, "document_add", ", ".join(added))
        conn.commit()
        self.json_out(200, {"ok": True, "attachments": self.list_attachments(conn, imp_id)})

    def do_delete_attachment(self, conn, imp_id, att_id, user=None):
        row = conn.execute(
            "SELECT stored_name, original_name FROM attachments WHERE id=? AND import_id=?", (att_id, imp_id)
        ).fetchone()
        if not row:
            self.error(HTTPStatus.NOT_FOUND, "attachment not found")
            return
        conn.execute("DELETE FROM attachments WHERE id=?", (att_id,))
        self.log_event(conn, imp_id, user, "document_remove", row["original_name"])
        conn.commit()
        remove_stored_file(row["stored_name"])
        self.json_out(200, {"ok": True, "attachments": self.list_attachments(conn, imp_id)})

    # ------------------------------------------------------------------
    # Editeur enrichi (RTE) : upload securisé + servation des fichiers.
    # POST /api/rte/upload (multipart, champ "file") -> {"url": ...}
    # GET  /api/rte/files/<stored> (auth requise, type MIME + no-store).
    # Le client embarque d'abord le fichier en `data:` (synchrone, aucun
    # blob), puis remplace l'URL par celle du serveur si l'upload aboutit.
    # ------------------------------------------------------------------

    def do_rte_upload(self):
        try:
            parts = self.read_upload_parts()
        except ValueError:
            self.error(HTTPStatus.BAD_REQUEST, "bad upload")
            return
        for part in parts:
            if not (part.get("filename") and part["data"]):
                continue
            original = part["filename"]
            ext = os.path.splitext(original.lower())[1]
            if ext not in ALLOWED_ATT_EXT:
                self.error(HTTPStatus.BAD_REQUEST, "type not allowed")
                return
            clean, stored = stored_file_name(original)
            ctype = part.get("content_type") or mimetypes.guess_type(clean)[0] or "application/octet-stream"
            with open(os.path.join(ATTACH_DIR, stored), "wb") as fh:
                fh.write(part["data"])
            self.json_out(200, {
                "ok": True,
                "url": "/api/rte/files/" + stored,
                "name": clean,
                "content_type": ctype,
            })
            return
        self.error(HTTPStatus.BAD_REQUEST, "file required")

    def do_rte_file(self, stored):
        name = os.path.basename(stored or "")
        if not name or name != stored:
            self.error(HTTPStatus.BAD_REQUEST, "bad name")
            return
        full = os.path.normpath(os.path.join(ATTACH_DIR, name))
        if not full.startswith(os.path.normpath(ATTACH_DIR)) or not os.path.isfile(full):
            self.error(HTTPStatus.NOT_FOUND, "not found")
            return
        ctype, _ = mimetypes.guess_type(full)
        with open(full, "rb") as fh:
            data = fh.read()
        self.send_head_text(HTTPStatus.OK, data, ctype or "application/octet-stream")

    # ------------------------------------------------------------------
    # Rapprochement facture / bon de commande (module reconciliation).
    # Endpoint: POST /api/reconcile (multipart: invoice + po).
    # Lecture seule sur les fichiers : aucun fichier brut n'est stocke sur
    # disque ; seul le resultat normalise est archive dans reconcile_runs.
    # ------------------------------------------------------------------

    def do_reconcile(self, conn, user):
        try:
            parts = self.read_upload_parts()
        except ValueError:
            self.error(HTTPStatus.BAD_REQUEST, "bad upload")
            return
        files = {}
        for part in parts:
            name = part.get("name")
            if name in ("invoice", "po") and part.get("filename") and part.get("data"):
                files[name] = (part["filename"], part["data"])
        missing = [k for k in ("invoice", "po") if k not in files]
        if missing:
            self.json_out(HTTPStatus.BAD_REQUEST, {
                "error": "reconcile_missing_files",
                "code": "files",
                "message": "Fichiers requis : invoice + po",
                "missing": missing,
            })
            return
        invoice_name, invoice_data = files["invoice"]
        po_name, po_data = files["po"]
        try:
            result = reconcile.reconcile_bytes(invoice_data, invoice_name, po_data, po_name)
        except reconcile.ReconcileError as exc:
            self.json_out(HTTPStatus.BAD_REQUEST, {
                "error": "reconcile_failed",
                "code": exc.code,
                "message": exc.message,
                "missing": exc.missing or [],
            })
            return
        except Exception:
            self.json_out(HTTPStatus.INTERNAL_SERVER_ERROR, {
                "error": "reconcile_failed",
                "code": "internal",
                "message": "Erreur interne du rapprochement.",
            })
            return
        # Archive (synchronisation temps reel avec la base, additive uniquement).
        conn.execute(
            "INSERT INTO reconcile_runs (username, invoice_file, po_file, created_at, stats, result) "
            "VALUES (?,?,?,?,?,?)",
            (
                user["username"] if user else "?",
                invoice_name, po_name, now_iso(),
                json.dumps(result["stats"], ensure_ascii=False),
                json.dumps(result, ensure_ascii=False),
            ),
        )
        conn.commit()
        run_id = conn.execute("SELECT last_insert_rowid() AS i").fetchone()["i"]
        result["run_id"] = run_id
        self.json_out(HTTPStatus.OK, result)

    def list_reconcile_runs(self, conn):
        rows = conn.execute(
            "SELECT id, username, invoice_file, po_file, created_at, stats, saved, saved_at "
            "FROM reconcile_runs ORDER BY id DESC LIMIT 20"
        ).fetchall()
        out = []
        for r in rows:
            item = dict(r)
            try:
                item["stats"] = json.loads(item["stats"] or "{}")
            except Exception:
                item["stats"] = {}
            out.append(item)
        self.json_out(HTTPStatus.OK, {"runs": out})

    def get_reconcile_run(self, conn, run_id):
        row = conn.execute(
            "SELECT id, username, invoice_file, po_file, created_at, stats, result, saved, saved_at "
            "FROM reconcile_runs WHERE id=?", (run_id,)
        ).fetchone()
        if not row:
            self.error(HTTPStatus.NOT_FOUND, "run not found")
            return
        item = dict(row)
        try:
            item["stats"] = json.loads(item["stats"] or "{}")
            item["result"] = json.loads(item["result"] or "{}")
        except Exception:
            item["result"] = None
        self.json_out(HTTPStatus.OK, item)

    def save_reconcile_run(self, conn, run_id, user):
        """Marque un rapprochement deja archive comme valide/approuve
        (bouton "Enregistrer" du module). Additif : seuls saved/saved_at
        sont mis a jour, le resultat archive reste strictement identique."""
        row = conn.execute(
            "SELECT id FROM reconcile_runs WHERE id=?", (run_id,)
        ).fetchone()
        if not row:
            self.error(HTTPStatus.NOT_FOUND, "run not found")
            return
        conn.execute(
            "UPDATE reconcile_runs SET saved=1, saved_at=? WHERE id=?",
            (now_iso(), run_id),
        )
        conn.commit()
        self.json_out(HTTPStatus.OK, {
            "ok": True,
            "run_id": run_id,
            "saved": 1,
            "saved_at": now_iso(),
            "saved_by": user["username"] if user else None,
        })

    def do_assistant_chat(self, conn):
        try:
            body = self.read_body()
        except ValueError:
            self.error(HTTPStatus.BAD_REQUEST, "bad request")
            return
        lang = body.get("lang") or "fr"
        page = body.get("page") or "dashboard"
        self.json_out(200, ai.answer_chat(conn, {"message": body.get("message")}, lang, page))

    def do_assistant_search(self, conn):
        try:
            body = self.read_body()
        except ValueError:
            self.error(HTTPStatus.BAD_REQUEST, "bad request")
            return
        lang = body.get("lang") or "fr"
        res = ai.external_search(str(body.get("q") or ""), lang)
        res.update({"source": "external", "data_segregated": True})
        self.json_out(200, res)

    def do_assistant_email_risk(self, conn):
        try:
            body = self.read_body()
        except ValueError:
            self.error(HTTPStatus.BAD_REQUEST, "bad request")
            return
        subject = str(body.get("subject") or "")
        content = str(body.get("body") or "")
        lang = body.get("lang") or "fr"
        res = ai.analyze_communication(subject, content, lang)
        imp_id = self._safe_int(body.get("import_id"))
        if imp_id:
            row = conn.execute("SELECT serial, eta FROM imports WHERE id=?", (imp_id,)).fetchone()
            if row:
                res["record"] = {"id": imp_id, "serial": row["serial"] or "", "eta": row["eta"] or ""}
        self.json_out(200, res)

    def _safe_int(self, v):
        try:
            return int(v)
        except (TypeError, ValueError):
            return None

    def do_assistant_upload(self, conn):
        try:
            parts = self.read_upload_parts(max_size=8 * 1024 * 1024)
        except ValueError:
            self.error(HTTPStatus.BAD_REQUEST, "bad upload")
            return
        added = []
        for part in parts:
            if not (part.get("filename") and part["data"]):
                continue
            ext = os.path.splitext(part["filename"].lower())[1]
            if ext not in ai._PARSE_EXTS:
                self.error(HTTPStatus.BAD_REQUEST, "type not allowed")
                return
        for part in parts:
            if not (part.get("filename") and part["data"]):
                continue
            res = ai.add_document(conn, part["filename"],
                                  part.get("content_type") or "", part["data"])
            added.append(res)
        self.json_out(200, {"ok": True, "documents": added})

    def do_delete_import(self, conn, imp_id, user=None):
        # Garde « Archives » : on ne supprime pas une fiche verrouillée.
        row = conn.execute("SELECT locked FROM imports WHERE id=?", (imp_id,)).fetchone()
        if row and row["locked"]:
            self.error(HTTPStatus.UNPROCESSABLE_ENTITY, "record_locked_delete")
            return
        files = conn.execute(
            "SELECT stored_name FROM attachments WHERE import_id=?", (imp_id,)
        ).fetchall()
        conn.execute("DELETE FROM imports WHERE id=?", (imp_id,))
        conn.commit()
        for row in files:
            remove_stored_file(row["stored_name"])
        self.json_out(200, {"ok": True})

    def do_soft_delete_import(self, conn, imp_id, to_trash, user=None):
        row = conn.execute("SELECT 1 FROM imports WHERE id=?", (imp_id,)).fetchone()
        if not row:
            self.error(HTTPStatus.NOT_FOUND, "import not found")
            return
        conn.execute("UPDATE imports SET deleted=?, updated_at=? WHERE id=?",
                     (1 if to_trash else 0, now_iso(), imp_id))
        self.log_event(conn, imp_id, user, "trash" if to_trash else "restore")
        conn.commit()
        self.json_out(200, {"ok": True})

    def do_delete_supplier(self, conn, sup_id):
        files = conn.execute(
            "SELECT a.stored_name FROM attachments a JOIN imports i ON i.id=a.import_id "
            "WHERE i.supplier_id=?", (sup_id,)
        ).fetchall()
        conn.execute("DELETE FROM suppliers WHERE id=?", (sup_id,))
        conn.commit()
        for row in files:
            remove_stored_file(row["stored_name"])
        self.json_out(200, {"ok": True})

    def do_GET(self):
        parsed = urlparse(self.path)
        try:
            qs = parse_qs(parsed.query)
            self.handle_get(parsed.path, qs)
        except (ValueError, KeyError):
            self.error(HTTPStatus.BAD_REQUEST, "bad request")

    def do_POST(self):
        parsed = urlparse(self.path)
        try:
            self.handle_post(parsed.path)
        except (ValueError, KeyError):
            self.error(HTTPStatus.BAD_REQUEST, "bad request")

    def do_PUT(self):
        parsed = urlparse(self.path)
        try:
            self.handle_put(parsed.path)
        except (ValueError, KeyError):
            self.error(HTTPStatus.BAD_REQUEST, "bad request")

    def do_DELETE(self):
        parsed = urlparse(self.path)
        try:
            self.handle_delete(parsed.path)
        except (ValueError, KeyError):
            self.error(HTTPStatus.BAD_REQUEST, "bad request")


def main():
    init_db()
    backup_scheduler.start()
    print("Sauvegarde automatique: %s (envoi par courriel: %s)" % (
        "activee a " + backup_scheduler.schedule() if backup_scheduler.enabled()
        else "desactivee (BACKUP_ENABLED=0)",
        "oui" if backup_scheduler.email_configured() else "non - stockage local uniquement"))
    server = ThreadingHTTPServer((HOST, PORT), App)
    print(f"Suivi d'importation - Industries Radisson")
    print(f"Lecture: http://localhost:{PORT}  (rÃ©seau local: http://<cette-IP>:{PORT})")
    print(f"Mot de passe par dÃ©faut: {DEFAULT_PASSWORD}  (changez-le dans ParamÃ¨tres)")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nArrÃªt.")
        server.server_close()


if __name__ == "__main__":
    main()