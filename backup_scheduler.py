"""Planificateur de sauvegardes automatiques (module portable, stdlib uniquement).

- Chaque jour a HH:MM (env BACKUP_HOUR/BACKUP_MINUTE, defaut 15:00), un instantane
  complet de la base SQLite (toutes les tables) est ecrit dans data/backups/
  (fichier site_backup_<horodatage>.json) et, si un compte SMTP est configure
  dans l'environnement, envoye par courriel au destinataire (defaut daisouta@gmail.com).
- Aucun acces reseau si SMTP absent : la sauvegarde locale reste fonctionnelle.
- Ne leve jamais d'exception vers l'appelant (serveur Web ou endpoint) : toute
  erreur est capturee et renvoyee dans le dictionnaire de resultat.
"""

import base64
import glob
import json
import os
import smtplib
import sqlite3
import threading
import time
from datetime import datetime, timedelta
from email.header import Header
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formatdate

DEFAULT_HOUR = 15
DEFAULT_MINUTE = 0
DEFAULT_RECIPIENT = "daisouta@gmail.com"
DEFAULT_SMTP_PORT = 465
DEFAULT_KEEP = 30

_state = {
    "started": False,
    "next_run": None,
    "last_run": None,
    "last_file": None,
    "last_result": None,
    "last_error": None,
}
_lock = threading.Lock()
_stop_evt = None


def _env(key, default):
    val = os.environ.get(key)
    return val if val not in (None, "") else default


def _as_int(val, default):
    try:
        return int(val)
    except (TypeError, ValueError):
        return default


def _db_path():
    import server
    return server.DB_PATH


def _backup_dir():
    import server
    d = os.path.join(server.DATA_DIR, "backups")
    os.makedirs(d, exist_ok=True)
    return d


def _smtp_conf():
    host = _env("SMTP_HOST", "")
    user = _env("SMTP_USER", "")
    pwd = _env("SMTP_APP_PASSWORD", "")
    port = _as_int(_env("SMTP_PORT", str(DEFAULT_SMTP_PORT)), DEFAULT_SMTP_PORT)
    frm = _env("BACKUP_FROM", user)
    return host, port, user, pwd, frm


def email_configured():
    host, _p, user, pwd, _f = _smtp_conf()
    return bool(host and user and pwd)


def schedule():
    h = _as_int(_env("BACKUP_HOUR", str(DEFAULT_HOUR)), DEFAULT_HOUR)
    m = _as_int(_env("BACKUP_MINUTE", str(DEFAULT_MINUTE)), DEFAULT_MINUTE)
    h = max(0, min(23, h))
    m = max(0, min(59, m))
    return "%02d:%02d" % (h, m)


def enabled():
    return _env("BACKUP_ENABLED", "1") not in ("0", "false", "no", "off", "")


def recipient():
    return _env("BACKUP_RECIPIENT", DEFAULT_RECIPIENT)


def _next_run(now=None):
    now = now or datetime.now()
    hh, mm = schedule().split(":")
    candidate = now.replace(hour=int(hh), minute=int(mm), second=0, microsecond=0)
    if candidate <= now:
        candidate += timedelta(days=1)
    return candidate


def _iter_rows(row):
    out = {}
    for col, val in zip(row.keys(), row):
        if val is None:
            out[col] = None
        elif isinstance(val, (bytes, bytearray, memoryview)):
            data = bytes(val)
            out[col] = "b64:" + base64.b64encode(data).decode("ascii")
        elif isinstance(val, (datetime,)):
            out[col] = val.isoformat()
        else:
            out[col] = val
    return out


def build_snapshot():
    """Instantane JSON complet (toutes les tables) -> dict {meta, tables}."""
    db = _db_path()
    conn = sqlite3.connect("file:%s?mode=ro" % db, uri=True)
    conn.row_factory = sqlite3.Row
    try:
        tables = [r[0] for r in conn.execute(
            "SELECT name FROM sqlite_master WHERE type='table' "
            "AND name NOT LIKE 'sqlite_%' ORDER BY name").fetchall()]
        out, rows_total = {}, 0
        for tname in tables:
            rows = [dict(_iter_rows(row)) for row in
                    conn.execute("SELECT * FROM %s" % tname).fetchall()]
            out[tname] = rows
            rows_total += len(rows)
    finally:
        conn.close()
    return {
        "meta": {
            "app": "radisson-suivi-importation",
            "type": "full-backup",
            "generated_at": datetime.now().isoformat(),
            "table_count": len(out),
            "row_count": rows_total,
        },
        "tables": out,
    }


def _payload_bytes(snapshot):
    return json.dumps(snapshot, ensure_ascii=False, indent=1).encode("utf-8")


def _save_snapshot(payload, snapshot):
    d = _backup_dir()
    name = "site_backup_%s.json" % datetime.now().strftime("%Y%m%d_%H%M%S")
    path = os.path.join(d, name)
    with open(path, "wb") as fh:
        fh.write(payload)
    keep = max(1, _as_int(_env("BACKUP_KEEP", str(DEFAULT_KEEP)), DEFAULT_KEEP))
    files = sorted(glob.glob(os.path.join(d, "site_backup_*.json")), reverse=True)
    for stale in files[keep:]:
        try:
            os.remove(stale)
        except OSError:
            pass
    return name


def _email_snapshot(name, payload, snapshot):
    host, port, user, pwd, frm = _smtp_conf()
    if not (host and user and pwd):
        return (False, "SMTP non configuré (stockage local uniquement)")
    meta = snapshot.get("meta", {})
    subject = "Sauvegarde automatique / Automatic backup — %s" % (
        meta.get("generated_at", datetime.now().isoformat()))
    body_fr = (
        "Sauvegarde automatique du site Suivi d'importation.\n"
        "Tables : %s\nLignes : %s\nFichier : %s\n"
        "Généré le : %s\n"
    ) % (meta.get("table_count", "?"), meta.get("row_count", "?"), name,
         meta.get("generated_at", "?"))
    body_en = ("\nAutomatic backup of the import-tracking site.\n"
               "Tables: %s\nRows: %s\nFile: %s\nGenerated at: %s\n"
               ) % (meta.get("table_count", "?"), meta.get("row_count", "?"), name,
                    meta.get("generated_at", "?"))
    msg = MIMEMultipart()
    msg["From"] = frm or user
    msg["To"] = recipient()
    msg["Date"] = formatdate(localtime=True)
    msg["Subject"] = Header(subject, "utf-8")
    msg.attach(MIMEText(body_fr + body_en, "plain", "utf-8"))
    part = MIMEText(payload.decode("utf-8"), "json", "utf-8")
    part.add_header("Content-Disposition", "attachment; filename=\"%s\"" % name)
    msg.attach(part)
    smtp = smtplib.SMTP_SSL(host, port, timeout=30)
    try:
        smtp.login(user, pwd)
        smtp.sendmail(frm or user, [recipient()], msg.as_string())
    finally:
        try:
            smtp.quit()
        except Exception:
            pass
    return (True, "")


def run_snapshot():
    """Execute une sauvegarde immediate : instantane -> fichier -> courriel (si SMTP).
    Retourne toujours un dict (jamais d'exception)."""
    try:
        snapshot = build_snapshot()
        payload = _payload_bytes(snapshot)
        name = _save_snapshot(payload, snapshot)
        emailed, reason = _email_snapshot(name, payload, snapshot)
        res = {
            "ok": True,
            "file": name,
            "size": len(payload),
            "rows": snapshot["meta"]["row_count"],
            "tables": snapshot["meta"]["table_count"],
            "emailed": emailed,
            "email_note": reason,
        }
        with _lock:
            _state["last_run"] = datetime.now().isoformat()
            _state["last_file"] = name
            _state["last_result"] = res
            _state["last_error"] = None
            _state["next_run"] = _next_run().isoformat()
        return res
    except Exception as e:  # pragma: no cover - file/disk/encode failures
        with _lock:
            _state["last_error"] = str(e)
            _state["last_run"] = datetime.now().isoformat()
            _state["last_result"] = None
        return {"ok": False, "error": str(e)}


def _loop():
    global _stop_evt
    while not _stop_evt.is_set():
        nxt = _next_run()
        with _lock:
            _state["next_run"] = nxt.isoformat()
        wait = (nxt - datetime.now()).total_seconds()
        if wait > 0 and _stop_evt.wait(wait):
            break
        run_snapshot()
        if not _stop_evt.is_set():
            _stop_evt.wait(2)


def start():
    """Demarre (une seule fois) le thread daemon du planificateur."""
    with _lock:
        if _state["started"]:
            return
        if not enabled():
            _state["next_run"] = None
            return
        _stop_evt = threading.Event()
        thr = threading.Thread(target=_loop, name="radisson-backup-scheduler", daemon=True)
        thr.start()
        _state["started"] = True
        _state["next_run"] = _next_run().isoformat()


def stop():
    """Arrete le planificateur (usage tests)."""
    with _lock:
        if _stop_evt is not None:
            _stop_evt.set()
        _state["started"] = False


def status():
    """Etat courant (endpoint GET /api/backup/status)."""
    with _lock:
        last_result = _state["last_result"]
        res = {
            "enabled": enabled(),
            "schedule": schedule(),
            "recipient": recipient(),
            "email_configured": email_configured(),
            "next_run": _state["next_run"],
            "last_run": _state["last_run"],
            "last_file": _state["last_file"],
            "last_error": _state["last_error"],
        }
        if last_result:
            res["last_rows"] = last_result.get("rows")
            res["last_tables"] = last_result.get("tables")
            res["last_size"] = last_result.get("size")
            res["last_emailed"] = last_result.get("emailed")
            res["last_email_note"] = last_result.get("email_note")
        return res