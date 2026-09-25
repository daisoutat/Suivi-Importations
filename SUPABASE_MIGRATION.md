# Migration SQLite -> Supabase (PostgreSQL)

L'application utilise désormais `db.py`, une couche d'accès qui reproduit
l'interface `sqlite3.Connection`. Le moteur est choisi **automatiquement** en
fonction de la variable d'environnement `DATABASE_URL` :

| `DATABASE_URL` absent / non-postgres | SQLite : `data/radisson.db` (comportement historique, inchangé) |
|---|---|
| `DATABASE_URL=postgres://...` ou `postgresql://...` | PostgreSQL (Supabase) |

Toutes les requêtes SQL du backend (`server.py`, `ai.py`, `reconcile.py`,
`backup_scheduler.py`) restent **identiques** ; `db.py` traduit la syntaxe
SQLite (`?`, `PRAGMA`, `AUTOINCREMENT`, `COLLATE NOCASE`, `INSERT OR IGNORE`,
`printf(...)`) vers PostgreSQL à l'exécution. Les réponses de l'API et
l'interface web sont donc 100 % identiques dans les deux modes.

> Le `DATABASE_URL` est lu uniquement depuis l'environnement du process.
> Sur Render, définissez-le dans le dashboard (pas de fichier `.env`).

---

## 1. Créer le projet Supabase

1. Créez un compte sur https://supabase.com et un **nouveau projet** (région
   proche de vos utilisateurs, mot de passe de base de données fort).
2. Notez le `Project Ref` (identifiant courts dans l'URL `...supabase.co`).
3. **Aucun schéma manuel à créer** : `init_db()` est exécuté au démarrage et
   génère automatiquement toutes les tables (et les migrations « fresh seeds »)
   à partir des DDL traduits. Vous pouvez vérifier votre schéma après le
   premier démarrage dans **Table Editor**.

## 2. Récupérer la chaîne de connexion

Dashboard → **Project Settings → Database → Connection string**.

- **URI classique** (port 5432, + sslmode=require recommandé) :
  `DATABASE_URL=postgresql://postgres.<PROJECT_REF>:<PASSWORD>@db.<PROJECT_REF>.supabase.co:5432/postgres`
- **Pooler transactionnel Supabase** (recommandé pour Render, port 6543) :
  `DATABASE_URL=postgresql://postgres.<PROJECT_REF>:<PASSWORD>@aws-0-<REGION>.pooler.supabase.com:6543/postgres`

Valeur complète (échappez les caractères spéciaux du mot de passe si besoin) :

```
DATABASE_URL=postgresql://postgres.xxxxxx:<PASSWORD>@aws-0-eu-west-3.pooler.supabase.com:6543/postgres
```

## 3. Déployer sur Render

1. Dans le dashboard Render, ouvrez votre **Web Service** existant.
2. **Environment** → **Add Environment Variable** :
   - `DATABASE_URL` = la chaîne de connexion ci-dessus.
   - Renseignez aussi vos variables SMTP existantes (`SMTP_*`) si le
     service e-mail n'est pas déjà configuré.
3. **Deploy**. Au démarrage, le serveur exécute `init_db()` : le schéma
   Postgres est créé automatiquement et le seed initial injecté.

Vérification rapide : ouvrez l'application, connectez-vous. Le tableau de bord
et `/api/stats` doivent répondre normalement.

## 4. Migrer les données existantes (optionnel mais recommandé)

Deux formats de sauvegarde sont acceptés par **Paramètres → Sauvegardes →
Restaurer** (`POST /api/import`) :

- **Ancien format** : un `.zip` contenant `radisson.db` (exporté avant
  migration). Le serveur lit le fichier SQLite et le copie table par table
  dans PostgreSQL, en respectant l'ordre des clés étrangères.
- **Nouveau format** : un `.zip` contenant `radisson_snapshot.json` (export
  généré par `GET /api/backup`, qui fonctionne dans les deux modes).

Procédure :

1. **Avant la migration** : sur l'ancien environnement, téléchargez une
   sauvegarde (*Paramètres → Sauvegardes → « Télécharger la sauvegarde »*,
   bouton `/api/backup`). Gardez ce `.zip` précieusement.
2. **Après déploiement** de la nouvelle version : connectez-vous comme admin
   et **Restaurer** ce même `.zip` sur le nouveau serveur. La base précédente
   est d'abord conservée sous `data/backups/pre_restore_*.json`.

> La restauration fonctionne dans les deux modes ; le format `radisson.db`
> reste accepté en mode PostgreSQL, ce qui rend la bascule réversible.

## 5. Pièces jointes (attachments)

Les documents sont stockés **sur le disque** (`data/attachments/`), pas dans la
base. Sur Render, le disque est éphémère :

- Les sauvegardes `.zip` compriment toujours les fichiers d'`attachments/`.
- À chaque redémarrage Render, réimportez une sauvegarde (restaurer le `.zip`)
  pour retrouver les pièces jointes — ou connectez un **Disque persistant** /
  stockage d'objet pour ce dossier.

## 6. Fiabilité et garde-fous

- **Réversibilité** : supprimez `DATABASE_URL` (ou redéployez sur un
  environnement sans cette variable) et l'application repasse en mode SQLite.
- **Messages d'erreur bilingues** : si la connexion PostgreSQL échoue, l'API
  répond `500 {"error": "Connexion à la base de données impossible. / Unable
  to connect to the database. ..."}` (le mot de passe est masqué).
- **Case-insensitive** : les recherches « contenant » qui utilisaient
  `COLLATE NOCASE` sont traduites en `LOWER(...)` pour conserver un
  comportement identique (ex. recherche de fournisseurs, de n° de série).
- **Numérotation** : l'historique des numéros est préservé (les identifiants ne
  sont pas réinitialisés lors d'une migration).

## 7. Défauts connus / limites

- **SSH/accès direct Supabase** : les tests d'intégration ont été validés
  contre un PostgreSQL 18 local ; le comportement Supabase (pooler, sslmode)
  est identique mais n'a pas été validé de bout en bout.
- Les fichiers journaux (`err.log`, `out.log`, `server.err.log`, etc.) sont des
  artéfacts locaux de développement, non versionnés.