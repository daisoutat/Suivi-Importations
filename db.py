"""Couche d'acces aux donnees (Data access layer) - SQLite / PostgreSQL (Supabase).

Le moteur est choisi automatiquement au demarrage :
- si la variable d'environnement DATABASE_URL (postgres:// ou postgresql://)
  est definie -> PostgreSQL (Supabase),
- sinon -> SQLite local (comportement strictement identique a l'existant).

L'API exposee est un sous-ensemble compatible de `sqlite3.Connection` utilise
par server.py, ai.py, reconcile.py et backup_scheduler.py :

    db_conn(db_path) -> connexion
        .execute(sql, params)  ->curseur {fetchone, fetchall, lastrowid, rowcount}
        .executemany(sql, seq) | .executescript(sql)
        .commit() / .rollback() / .close()
        .row_factory            (attribut de compatibilite, ignore en mode PG)

Les lignes retournees (CompatRow) supportent row["col"], row[0], dict(row),
tuple(row), row.keys(), iteration (valeurs), comme sqlite3.Row.

En cas d'echec de connexion ou d'operation critique, DatabaseConnError est leve
avec un message bilingue (FR / EN) directement affichable par l'interface.
"""

import os
import re
import threading
from decimal import Decimal

BASE = os.path.dirname(os.path.abspath(__file__))

_DATABASE_URL = os.environ.get("DATABASE_URL", "").strip()
if _DATABASE_URL.startswith(("'", '"')) and _DATABASE_URL[-1:] == _DATABASE_URL[0]:
    _DATABASE_URL = _DATABASE_URL[1:-1].strip()
if _DATABASE_URL.startswith("postgres://"):
    _DATABASE_URL = "postgresql://" + _DATABASE_URL[len("postgres://"):]

PG_ENABLED = _DATABASE_URL.startswith("postgresql://")

# Tables dont la cle primaire est un `id` auto-incremente (BIGSERIAL) : la
# valeur est recuperee avec `RETURNING id` pour emuler cursor.lastrowid.
_SERIAL_TABLES = frozenset({
    "suppliers", "imports", "checklist_items", "attachments",
    "reconcile_runs", "users", "import_events",
    "kg_nodes", "kg_edges", "assistant_docs",
})

# Ordre d'application lors d'une restauration : respecte les cles etrangeres.
_IMPORT_ORDER = [
    "settings", "users", "suppliers", "imports", "checklist_items",
    "attachments", "import_events", "reconcile_runs",
    "kg_nodes", "kg_edges", "assistant_docs",
]


class DatabaseConnError(Exception):
    """Erreur de connexion/operation bilingue (FR / EN), sans secret."""

    def __init__(self, detail):
        self.detail = _scrub(detail)
        super().__init__(
            "Connexion à la base de données impossible. / Unable to connect to "
            "the database. — %s" % self.detail
        )

    def friendly(self):
        return self.__str__()


def _scrub(text):
    """Masque un eventuel mot de passe present dans une URL de connexion."""
    if not text:
        return text
    return re.sub(r"(password\s*=\s*)([^@/\"'&\s]+)", r"\1***", str(text))


def pg_enabled():
    return PG_ENABLED


# --------------------------------------------------------------------------
# SQLite (fallback par defaut) : comportement byte-pour-byte identique.
# --------------------------------------------------------------------------

def _sqlite_conn(db_path):
    import sqlite3
    conn = sqlite3.connect(db_path, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    conn.execute("PRAGMA journal_mode = WAL")
    return conn


# --------------------------------------------------------------------------
# PostgreSQL (Supabase) : adaptateur de compatibilite.
# --------------------------------------------------------------------------

def _norm_value(v):
    """PostgreSQL renvoie `numeric` (Decimal) pour AVG/SUM/ROUND : on normalise
    vers int (entier) / float (decimal) afin de reproduire exactement les types
    numeriques que SQLite renvoyait (int pour les agregats entiers, float sinon)."""
    if isinstance(v, Decimal):
        try:
            if v == v.to_integral_value():
                return int(v)
            return float(v)
        except Exception:
            return float(v)
    return v


class CompatRow(dict):
    """Ligne compatible sqlite3.Row : acces par nom ET par index."""

    __slots__ = ("_keys",)

    def __init__(self, keys, values):
        super().__init__()
        self._keys = tuple(keys)
        for k, v in zip(keys, values):
            dict.__setitem__(self, k, _norm_value(v))

    def __getitem__(self, key):
        if isinstance(key, int):
            return dict.__getitem__(self, self._keys[key])
        return dict.__getitem__(self, key)

    def __iter__(self):
        return (dict.__getitem__(self, k) for k in self._keys)

    def keys(self):
        return self._keys


class PGResult(object):
    """Curseur simplifie : fetchone / fetchall / lastrowid / rowcount."""

    def __init__(self, cols, rows, lastrowid=None, rowcount=-1):
        self.cols = cols
        self.rows = rows
        self._i = 0
        self.lastrowid = lastrowid
        self.rowcount = rowcount

    def fetchone(self):
        if self._i >= len(self.rows):
            return None
        r = self.rows[self._i]
        self._i += 1
        return r

    def fetchall(self):
        r = self.rows[self._i:]
        self._i = len(self.rows)
        return r

    def close(self):
        pass

    def __iter__(self):
        return iter(self.rows)

    @property
    def description(self):
        return [(c, None, None, None, None, None, None) for c in self.cols]


class PGConnection(object):
    """Facade sqlite3-alike autour d'une connexion PostgreSQL (autocommit)."""

    def __init__(self, raw):
        self._pg = raw
        self._pg.autocommit = True
        self.row_factory = None
        self._closed = False

    # -- primitives internes -------------------------------------------------
    _INSERT_RE = re.compile(r"(?is)^\s*INSERT\s+INTO\s+([A-Za-z_][A-Za-z0-9_]*)\b")
    _PRAGMA_TABLE_INFO = re.compile(
        r"(?is)^\s*PRAGMA\s+table_info\(\s*([A-Za-z_][A-Za-z0-9_]*)\s*\)\s*$")

    @classmethod
    def _translate(cls, sql):
        sql = cls._translate_printf(sql)
        sql = cls._translate_collate_nocase(sql)
        sql = cls._map_placeholders(sql)
        if re.search(r"(?i)INSERT\s+OR\s+REPLACE\s+INTO", sql):
            raise DatabaseConnError(
                "INSERT OR REPLACE n'est pas pris en charge en mode PostgreSQL / "
                "not supported in PostgreSQL mode.")
        had_ignore = bool(re.search(r"(?i)INSERT\s+OR\s+IGNORE\s+INTO", sql))
        sql = re.sub(r"(?i)\bINSERT\s+OR\s+IGNORE\s+INTO\b", "INSERT INTO", sql)
        if had_ignore and re.search(r"(?i)\bON\s+CONFLICT\b", sql) is None:
            sql = sql.rstrip().rstrip(";").strip() + " ON CONFLICT DO NOTHING"
        sql = re.sub(r"(?i)\bINTEGER\s+PRIMARY\s+KEY\s+AUTOINCREMENT\b",
                     "BIGSERIAL PRIMARY KEY", sql)
        sql = re.sub(r"(?i)\bAUTOINCREMENT\b", "", sql)
        sql = re.sub(r"(?i)\bCOLLATE\s+NOCASE\b", "", sql)
        return sql

    _COLLATE_NOCASE_RE = re.compile(
        r"(?i)\b([A-Za-z_][A-Za-z0-9_.]*)\s*(=|<>)"
        r"\s*(\?|'(?:[^']|'')*')\s+COLLATE\s+NOCASE\b")

    @classmethod
    def _translate_collate_nocase(cls, sql):
        """SQLite `col = 'X' COLLATE NOCASE` -> `LOWER(col) = LOWER('X')` pour
        conserver la comparaison insensible a la casse en PostgreSQL (SQLite
        est insensible a la casse pour les ASCII par defaut)."""
        return cls._COLLATE_NOCASE_RE.sub(
            r"LOWER(\1) \2 LOWER(\3)", sql)

    @classmethod
    def _translate_printf(cls, sql):
        """SQLite `printf('%06d', X)` -> PostgreSQL `lpad(CAST(X AS text), 6, '0')`
        (printf n'existe pas cote PostgreSQL)."""
        out = []
        i, n = 0, len(sql)
        while i < n:
            ch = sql[i]
            if ch == "'":
                j = i + 1
                while j < n:
                    if sql[j] == "'":
                        if j + 1 < n and sql[j + 1] == "'":
                            j += 2
                            continue
                        break
                    j += 1
                out.append(sql[i:j + 1])
                i = j + 1
                continue
            if not re.match(r"(?i)\bprintf\s*\(", sql[i:]):
                out.append(ch)
                i += 1
                continue
            p = i + re.match(r"(?i)\bprintf", sql[i:]).end()
            while p < n and sql[p] != "(":
                p += 1
            p += 1
            if p >= n or sql[p] != "'":
                out.append(ch)
                i += 1
                continue
            q = sql.find("'", p + 1)
            if q < 0:
                out.append(ch)
                i += 1
                continue
            mf = re.fullmatch(r"%0(\d+)d", sql[p + 1:q])
            if not mf:
                out.append(ch)
                i += 1
                continue
            width = mf.group(1)
            k = q + 1
            while k < n and sql[k] in " \t\r\n":
                k += 1
            if k < n and sql[k] == ",":
                k += 1
            start, q2, depth = k, k, 0
            while q2 < n:
                c = sql[q2]
                if c == "'":
                    j2 = q2 + 1
                    while j2 < n:
                        if sql[j2] == "'":
                            if j2 + 1 < n and sql[j2 + 1] == "'":
                                j2 += 2
                                continue
                            break
                        j2 += 1
                    q2 = j2 + 1
                    continue
                if c == "(":
                    depth += 1
                elif c == ")":
                    if depth == 0:
                        expr = sql[start:q2].strip()
                        out.append("lpad(CAST(%s AS text), %s, '0')" % (expr, width))
                        i = q2 + 1
                        break
                    depth -= 1
                q2 += 1
            else:
                out.append(ch)
                i += 1
        return "".join(out)

    @staticmethod
    def _map_placeholders(sql):
        """Convertit `?` -> `%s`, hors chaines entre apostrophes."""
        out = []
        i, n, in_str = 0, len(sql), False
        while i < n:
            ch = sql[i]
            if in_str:
                out.append(ch)
                if ch == "'":
                    if i + 1 < n and sql[i + 1] == "'":
                        out.append("'")
                        i += 1
                    else:
                        in_str = False
            elif ch == "'":
                in_str = True
                out.append(ch)
            elif ch == "?":
                out.append("%s")
            else:
                out.append(ch)
            i += 1
        return "".join(out)

    def _pragma(self, sql):
        m = self._PRAGMA_TABLE_INFO.match(sql)
        if m:
            tname = m.group(1)
            q = (
                "SELECT c.ordinal_position - 1 AS cid, c.column_name AS name, "
                "       c.data_type AS type, "
                "       CASE c.is_nullable WHEN 'YES' THEN 0 ELSE 1 END AS notnull, "
                "       c.column_default AS dflt_value, "
                "       COALESCE(pk.ordinal_position, 0) AS pk "
                "FROM information_schema.columns c "
                "LEFT JOIN ("
                "    SELECT kcu.column_name, kcu.ordinal_position "
                "    FROM information_schema.table_constraints tc "
                "    JOIN information_schema.key_column_usage kcu "
                "      ON kcu.constraint_name = tc.constraint_name "
                "     AND kcu.table_schema = tc.table_schema "
                "    WHERE tc.table_schema = 'public' AND tc.table_name = %s "
                "      AND tc.constraint_type = 'PRIMARY KEY'"
                ") pk ON pk.column_name = c.column_name "
                "WHERE c.table_schema = 'public' AND c.table_name = %s "
                "ORDER BY c.ordinal_position"
            )
            cur = self._pg.cursor()
            try:
                cur.execute(q, (tname, tname))
                rows = [CompatRow(["cid", "name", "type", "notnull", "dflt_value", "pk"],
                                  list(r)) for r in cur.fetchall()]
            finally:
                cur.close()
            return PGResult(["cid", "name", "type", "notnull", "dflt_value", "pk"],
                            rows, lastrowid=None, rowcount=len(rows))
        # PRAGMAs compatibles: foreign_keys / journal_mode / wal_checkpoint /
        # quick_check -> no-op volontaire.
        return PGResult([], [], lastrowid=None, rowcount=0)

    # -- API publique ------------------------------------------------
    def execute(self, sql, params=None):
        if self._closed:
            raise DatabaseConnError("Connexion fermee / connection closed.")
        translated = self._translate(sql.strip())
        if translated.upper().startswith("PRAGMA"):
            return self._pragma(translated)
        if not translated:
            return PGResult([], [])
        if translated[:6].upper() == "INSERT":
            m = self._INSERT_RE.match(translated)
            if (m and m.group(1) in _SERIAL_TABLES
                    and "RETURNING" not in translated.upper()):
                translated = translated.rstrip().rstrip(";").strip() + " RETURNING id"
        cur = self._pg.cursor()
        try:
            cur.execute(translated, tuple(params) if params is not None else None)
            is_insert = translated[:6].upper() == "INSERT"
            cols = [c[0] for c in cur.description] if cur.description else []
            lastid = None
            if is_insert and "RETURNING" in translated.upper():
                row = cur.fetchone()
                lastid = row[0] if row else None
                return PGResult(cols, [], lastrowid=lastid, rowcount=cur.rowcount)
            rows = [CompatRow(cols, list(r)) for r in cur.fetchall()] if cols else []
            return PGResult(cols, rows, lastrowid=lastid, rowcount=cur.rowcount)
        finally:
            cur.close()

    def executemany(self, sql, seq_of_params):
        for params in seq_of_params:
            self.execute(sql, params)
        return PGResult([], [], lastrowid=None, rowcount=-1)

    def executescript(self, script):
        for stmt in _split_statements(script):
            if stmt:
                self.execute(stmt)
        return PGResult([], [])

    def _begin(self):
        self._pg.autocommit = False

    def _commit(self):
        if not self._pg.autocommit:
            self._pg.commit()
            self._pg.autocommit = True

    def _rollback(self):
        if not self._pg.autocommit:
            self._pg.rollback()
            self._pg.autocommit = True

    def commit(self):
        self._commit()

    def rollback(self):
        self._rollback()

    def close(self):
        if self._closed:
            return
        self._closed = True
        if not self._pg.autocommit:
            try:
                self._pg.rollback()
            except Exception:
                pass
            self._pg.autocommit = True
        _release(self._pg)


def _split_statements(script):
    """Decoupe un script SQL sur les `;` hors chaines entre apostrophes."""
    out, cur, i, n, in_str = [], [], 0, len(script or ""), False
    while i < n:
        ch = script[i]
        if in_str:
            cur.append(ch)
            if ch == "'":
                if i + 1 < n and script[i + 1] == "'":
                    cur.append("'")
                    i += 1
                else:
                    in_str = False
        elif ch == "'":
            in_str = True
            cur.append(ch)
        elif ch == ";":
            out.append("".join(cur))
            cur = []
        else:
            cur.append(ch)
        i += 1
    out.append("".join(cur))
    return [s.strip() for s in out if s and s.strip()]


# --------------------------------------------------------------------------
# Connexions.
# --------------------------------------------------------------------------

_pool = None
_pool_failed = None
_pool_lock = threading.Lock()


def _acquire():
    global _pool, _pool_failed
    if _pool is None:
        with _pool_lock:
            if _pool is None:
                if _pool_failed is not None:
                    raise DatabaseConnError(_pool_failed)
                try:
                    import psycopg2
                    from psycopg2 import pool
                except Exception as exc:  # pragma: no cover
                    _pool_failed = (
                        "module psycopg2-binary manquant (pip install "
                        "psycopg2-binary) / module psycopg2-binary missing "
                        "(%s)" % _scrub(str(exc)))
                    raise DatabaseConnError(_pool_failed)
                try:
                    _pool = pool.ThreadedConnectionPool(1, 12, _DATABASE_URL)
                except Exception as exc:
                    _pool_failed = _scrub(str(exc))
                    raise DatabaseConnError(_pool_failed)
    try:
        raw = _pool.getconn()
    except Exception as exc:
        raise DatabaseConnError(_scrub(str(exc)))
    raw.reset()
    return raw


def _release(raw):
    global _pool
    if _pool is not None:
        try:
            _pool.putconn(raw)
        except Exception:
            try:
                raw.close()
            except Exception:
                pass


def db_conn(db_path=None):
    """Retourne une connexion compatible sqlite3 (SQLite par defaut, sinon PG)."""
    if PG_ENABLED:
        return PGConnection(_acquire())
    return _sqlite_conn(db_path or os.path.join(BASE, "data", "radisson.db"))


# --------------------------------------------------------------------------
# Utilites de sauvegarde / restauration (mode PG).
# --------------------------------------------------------------------------

def list_tables(conn):
    """Noms des tables applicatives (hors tables systeme)."""
    if isinstance(conn, PGConnection):
        rows = conn.execute(
            "SELECT table_name FROM information_schema.tables "
            "WHERE table_schema='public' AND table_type='BASE TABLE' "
            "ORDER BY table_name").fetchall()
        return [r[0] for r in rows]
    rows = conn.execute(
        "SELECT name FROM sqlite_master WHERE type='table' "
        "AND name NOT LIKE 'sqlite_%' ORDER BY name").fetchall()
    return [r[0] for r in rows]


def dump_all(conn, tables=None):
    """Retourne {table: [rowdict, ...]} pour les tables donnees (ou toutes)."""
    out = {}
    for tname in (tables or list_tables(conn)):
        out[tname] = [dict(r) for r in conn.execute(
            'SELECT * FROM "%s"' % tname).fetchall()]
    return out


def export_snapshot(conn):
    """Instantane complet compatible backup_scheduler.build_snapshot()."""
    from datetime import datetime
    tables = dump_all(conn)
    rows_total = sum(len(r) for r in tables.values())
    return {
        "meta": {
            "app": "radisson-suivi-importation",
            "type": "full-backup",
            "generated_at": datetime.now().isoformat(),
            "table_count": len(tables),
            "row_count": rows_total,
        },
        "tables": tables,
    }


def apply_tables(conn, data):
    """Restaure les tables donnees (TRUNCATE + INSERT) dans un ordre FK-safe.

    En mode SQLite, ceci n'est pas utilise (les sauvegardes sont des copies de
    fichiers). En mode PG, l'ensemble est applique dans une transaction unique.
    """
    if not isinstance(conn, PGConnection):
        raise DatabaseConnError(
            "Restauration par instantane reservee au mode PostgreSQL / snapshot "
            "restore is only supported in PostgreSQL mode.")

    current = set(list_tables(conn))
    to_apply = [t for t in _IMPORT_ORDER if t in data and t in current]
    to_apply += [t for t in data if t not in _IMPORT_ORDER and t in current]
    missing = [t for t in data if t not in current]

    conn._begin()
    try:
        for tname in to_apply:
            conn.execute('TRUNCATE TABLE "%s" RESTART IDENTITY CASCADE' % tname)
        for tname in to_apply:
            rows = data[tname]
            for row in rows:
                cols = list(row.keys())
                if not cols:
                    continue
                sql = 'INSERT INTO "%s" (%s) VALUES (%s)' % (
                    tname,
                    ", ".join('"%s"' % c for c in cols),
                    ", ".join(["%s"] * len(cols)),
                )
                conn.execute(sql, [row[c] for c in cols])
        # Re-aligner les sequences apres insertion d'ids explicites.
        for tname in to_apply:
            rows = data[tname]
            if not rows or "id" not in (rows[0] or {}):
                continue
            try:
                conn.execute(
                    "SELECT setval(pg_get_serial_sequence('%s','id'), "
                    "COALESCE(MAX(id),1), MAX(id) IS NOT NULL) FROM \"%s\""
                    % (tname, tname))
            except Exception:
                pass
        conn._commit()
    except Exception:
        conn._rollback()
        raise
    return {"applied": to_apply, "missing": missing, "rows": sum(
        len(data.get(t, [])) for t in to_apply)}