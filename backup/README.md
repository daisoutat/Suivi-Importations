# Sauvegarde automatique quotidienne (MongoDB Atlas → CSV → e-mail)

Module Node.js portable, **sans aucune écriture disque** (adapté au free tier Render / filesystem éphémère).
Il extrait chaque jour à **15h00** les fiches d'import de MongoDB Atlas, les convertit en CSV **en mémoire**, puis
les envoie par e-mail à **daisouta@gmail.com** via Nodemailer (SMTP Gmail / App Password). En cas d'échec, il
journalise l'erreur **sans jamais faire planter le serveur Express**.

> Aucun impact sur l'application : le module est autonome et ne modifie aucune donnée de la base (lecture seule,
> `readPreference=secondaryPreferred` pour ne pas charger le primary qui sert le temps réel).

---

## 1. Dépendances requises (npm)

```
npm install node-cron nodemailer mongodb fast-csv --save
```

| Package     | Rôle                          |
|-------------|-------------------------------|
| `node-cron` | Planification `0 15 * * *`    |
| `mongodb`   | Pilote officiel (cursor stream, lecture seule) |
| `fast-csv`  | Conversion JSON→CSV en flux, en mémoire, avec BOM UTF-8 (Excel) |
| `nodemailer`| Transport SMTP et pièce jointe en buffer |

*(Alternative acceptée : `json2csv` à la place de `fast-csv` — voir note au §5.)*

## 2. Où placer le fichier

Copiez `backup.service.js` dans le projet Node (ex. `src/backup.service.js` ou `services/backup.service.js`),
puis **démarrez le planificateur quand le serveur Express démarre** :

```js
// server.js (ou app.js / index.js)
require('./src/backup.service').startBackupScheduler();
```

## 3. Variables d'environnement

### Fichier `.env` (local) — puis copiez les mêmes clés dans Render
Reportez-vous à `backup/.env.example` pour le jeu complet. Clés minimales :

```
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/?retryWrites=true&w=majority
MONGO_IMPORTS_COLLECTION=imports
EMAIL_USER=youraddress@gmail.com
EMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
BACKUP_RECIPIENT=daisouta@gmail.com
BACKUP_CRON=0 15 * * *
BACKUP_CRON_TZ=America/Montreal        # optionnel
BACKUP_ENABLED=true
```

**Gmail App Password** (16 caractères, espaces admis) : activer l'authentification à deux facteurs sur le compte
expéditeur → Compte Google → Sécurité → *App passwords* → générer pour "Mail". N'utilisez **jamais** le mot de
passe du compte Google directement.

### Configuration dans Render (Dashboard)
1. Ouvrez **votre service** (Web Service) dans le dashboard Render.
2. Onglet **Environment** → section **Environment Variables** → **Add Environment Variable** (une par ligne).
3. Collez chaque clé du fichier `.env` ci-dessus (valeur secrète masquée après sauvegarde).
4. **Save Changes** → Render redéploie automatiquement. Vérifiez les logs de démarrage :
   `[backup.service] Planificateur actif : cron=0 15 * * *`.

## 4. Vérification immédiate (avant le passage à 15h00)

### a) Test manuel unique (export + e-mail)
```
npm install node-cron nodemailer mongodb fast-csv --save
node src/backup.service.js --now
```
Attendu dans les logs : `Sauvegarde OK : <n> fiches, <size> chars CSV, envoi <messageId>`.

### b) Test de planification toutes les minutes
Dans Render Environment (ou `.env` local) :
```
BACKUP_CRON=*/1 * * * *
```
Puis redéployez et vérifiez qu'une sauvegarde reçue **chaque minute**. Une fois validé, remettez :
```
BACKUP_CRON=0 15 * * *
```
et redéployez (15h00 = heure du fuseau indiqué par `BACKUP_CRON_TZ` ; sans lui, heure serveur Render, UTC par défaut).

### c) Test CSV sans e-mail
```
node src/backup.service.js --dry
```
Affiche les 4 premières lignes du CSV en console (aucun e-mail envoyé).

## 5. Comportement & robustesse
- **Aucun fichier sur disque** : le CSV est construit en flux `fast-csv` et joint en `Buffer` (`attachments: [{ filename, content }]`), jamais écrit.
- **Échec d'envoi** : `try/catch` global → `console.error` trace la pile, le serveur Express continue.
- **Variables manquantes** : la sauvegarde est ignorée avec un avertissement explicite (jamais de crash au démarrage).
- **Volume** : cursors MongoDB avec `batchSize=500`, garde-fou `BACKUP_MAX_DOCS` (par défaut 250 000 fiches).
- **Accents / Excel** : BOM UTF-8 ajouté — les accents français sont corrects dans Excel.
- **Nested docs** : `ObjectId`→hex, `Date`→ISO-8601, `Buffer`→base64, objets/tableaux→JSON string, `null/undefined`→vide.
- **Fuseaux** : node-cron utilise l'heure du serveur ; utilisez `BACKUP_CRON_TZ` pour une heure locale (ex. `America/Montreal`).

> **Note json2csv** : si vous préférez `json2csv` plutôt que `fast-csv`, remplacez `buildCsvText` par
> `new Parser({ fields: undefined, flatten: true, defaultValue: '' }).parse(rows)` (toujours en mémoire,
> sans BOM — attention aux accents dans Excel). `fast-csv` est retenu ici pour la conversion en flux et le BOM.

---
*(FR : texte principal. EN : the module is fully environment-configurable, read-only on MongoDB (no locks on the live DB), CSV generated strictly in-memory, mailed to daisouta@gmail.com daily at 15:00.)*