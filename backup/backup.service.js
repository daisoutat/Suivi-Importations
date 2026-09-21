/**
 * Sauvegarde quotidienne automatique (module portable, sans écriture disque).
 *
 * - Node.js / Express (Render free tier comptatible)
 * - Exporte les fiches d'import de MongoDB Atlas
 * - Conversion CSV 100% en mémoire (fast-csv, flux de cr�ation enrichi du BOM) 
 *   -> aucun fichier temporaire sur le disque éphémère de Render
 * - Envoi sécurisé par e-mail via nodemailer (SMTP Gmail / clé applicative)
 * - Crédentials lus UNIQUEMENT depuis les variables d'environnement
 *
 * Utilisation :
 *   node backup.service.js            -> démarre le planificateur (cron 15:00)
 *   node backup.service.js --now      -> exécution manuelle immédiate (test)
 *   node backup.service.js --dry      -> export CSV console sans envoyer d'e-mail
 */
'use strict';

const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { MongoClient, ObjectId } = require('mongodb');
const fastcsv = require('fast-csv');

const PACKAGE_NAME = 'backup.service';
const DEFAULT_CRON = '0 15 * * *';                       // 03:00 PM (fuseau serveur TZ)
const DEFAULT_RECIPIENT = 'daisouta@gmail.com';
const DEFAULT_COLLECTION = 'imports';
const DEFAULT_MAX_DOCS = Number(process.env.BACKUP_MAX_DOCS || 250000);
const BATCH_SIZE = 500;

let _client = null;
let _schedulerStarted = false;

/* ------------------------------------------------------------------ */
/* Pure helpers (testables)                                           */
/* ------------------------------------------------------------------ */

/** Normalise une valeur pour un export CSV sûr (nested inclus). */
function safeValue(v) {
  if (v == null) return '';
  if (v instanceof ObjectId) return v.toString();
  if (Buffer.isBuffer(v)) return v.toString('base64');
  if (v instanceof Date) return v.toISOString();
  if (typeof v === 'object') {
    try { return JSON.stringify(v); } catch (_) { return String(v); }
  }
  return v;
}

/** Convertit un document Mongo en ligne CSV plate (clés top-level). */
function docToRow(doc) {
  const row = {};
  Object.keys(doc || {}).forEach(function (k) { row[k] = safeValue(doc[k]); });
  return row;
}

function docsToRows(docs) {
  return (docs || []).map(docToRow);
}

/**
 * Génère le texte CSV en mémoire à partir de lignes pré-normalisées.
 * fast-csv travaille en flux (pas de tableau monolithique) : le buffer
 * final est concaténé en mémoire, jamais écrit sur le disque.
 * `writeBOM: true` ajoute le BOM UTF-8 pour un ouvrage Excel correct.
 */
function buildCsvText(rows) {
  return new Promise(function (resolve, reject) {
    const chunks = [];
    const stream = fastcsv.format({ headers: true, writeBOM: true, quote: '"', escape: '"', delimiter: ',' });
    stream.on('data', function (c) { chunks.push(c); });
    stream.on('end', function () { resolve(Buffer.concat(chunks).toString('utf8')); });
    stream.on('error', reject);
    (rows || []).forEach(function (r) { stream.write(r); });
    stream.end();
  });
}

/** Nom de fichier horodaté (stable, sans caractères hostiles). */
function backupFilename(now) {
  const d = now || new Date();
  const p = function (n) { return String(n).padStart(2, '0'); };
  return 'suivi_importations_' +
    d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '_' +
    p(d.getHours()) + p(d.getMinutes()) + p(d.getSeconds()) + '.csv';
}

/** Retourne la liste des erreurs d'environnement bloquantes (scanner). */
function validateEnv(env) {
  const e = env || process.env;
  const errors = [];
  if (!e.MONGO_URI) errors.push('MONGO_URI manquante');
  if (!e.EMAIL_USER) errors.push('EMAIL_USER manquant');
  if (!e.EMAIL_APP_PASSWORD) errors.push('EMAIL_APP_PASSWORD manquant (Gmail App Password)');
  return errors;
}

/* ------------------------------------------------------------------ */
/* Mongo : lecture seule, sans verrou ni charge sur la base au travail */
/* ------------------------------------------------------------------ */

function collectionName() { return process.env.MONGO_IMPORTS_COLLECTION || DEFAULT_COLLECTION; }

async function connectClient() {
  if (_client) return _client;
  const uri = process.env.MONGO_URI;
  const options = {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    // Lecture sur un secondary réplica si disponible (Atlas) : la sauvegarde
    // ne dégrade pas le primary qui sert les requêtes temps réel.
    readPreference: 'secondaryPreferred',
  };
  _client = new MongoClient(uri, options);
  await _client.connect();
  return _client;
}

async function fetchImports(client) {
  const db = client.db(process.env.MONGO_DB || undefined);
  const col = db.collection(collectionName());
  const cursor = col.find({}).batchSize(BATCH_SIZE);
  const docs = [];
  for await (const doc of cursor) {
    if (docs.length >= DEFAULT_MAX_DOCS) break;
    docs.push(doc);
  }
  return docs;
}

/* ------------------------------------------------------------------ */
/* Email : nodemailer, buffer en pièce jointe                         */
/* ------------------------------------------------------------------ */

function transporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_SMTP_PORT || 465),
    secure: process.env.EMAIL_SECURE === 'false' ? false : true,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_APP_PASSWORD },
  });
}

function sendBackupMail(csvText, stats) {
  const to = process.env.BACKUP_RECIPIENT || DEFAULT_RECIPIENT;
  return transporter().sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: to,
    subject: process.env.EMAIL_SUBJECT || '[Sauvegarde] Fiches d\u2019import - ' + backupFilename().replace('.csv', ''),
    text: 'Backup automatique des fiches d\u2019import (MongoDB -> CSV).\n\n'
      + 'Documents exportés : ' + (stats.rows || 0)
      + '\nTaille CSV : ' + (csvText.length / 1024).toFixed(1) + ' Ko\n',
    attachments: [{ filename: backupFilename(), content: Buffer.from(csvText, 'utf8'), contentType: 'text/csv' }],
  });
}

/* ------------------------------------------------------------------ */
/* Pipeline principal                                                 */
/* ------------------------------------------------------------------ */

/** Exécute UNE sauvegarde complète. Ne lève jamais côté planificateur. */
async function runBackup() {
  const started = Date.now();
  try {
    const errors = validateEnv(process.env);
    if (errors.length) {
      console.warn('[' + PACKAGE_NAME + '] Sauvegarde ignorée - variables d\u2019environnement manquantes : ' + errors.join(', '));
      return { ok: false, reason: 'env', errors: errors };
    }
    const client = await connectClient();
    const docs = await fetchImports(client);
    const rows = docsToRows(docs);
    const csvText = await buildCsvText(rows);
    const info = await sendBackupMail(csvText, { rows: rows.length, bytes: Buffer.byteLength(csvText, 'utf8') });
    const ms = Date.now() - started;
    console.log('[' + PACKAGE_NAME + '] Sauvegarde OK : ' + rows.length + ' fiches, '
      + csvText.length + ' chars CSV, envoi ' + info.messageId + ' (' + ms + ' ms)');
    return { ok: true, rows: rows.length, bytes: Buffer.byteLength(csvText, 'utf8'), ms: ms };
  } catch (err) {
    // Ne jamais faire planter l'Express server : on journalise et on continue.
    console.error('[' + PACKAGE_NAME + '] Erreur sauvegarde : ' + (err && err.stack ? err.stack : err));
    return { ok: false, reason: 'error', error: (err && err.message) || String(err) };
  }
}

/** Variante dry : génère le CSV en mémoire et l'affiche en console (aucun e-mail). */
async function runBackupDry() {
  try {
    const errors = validateEnv(process.env);
    if (!process.env.MONGO_URI) {
      console.error('[' + PACKAGE_NAME + '] MONGO_URI requise pour le mode --dry.');
      return { ok: false };
    }
    const client = await connectClient();
    const docs = await fetchImports(client);
    const rows = docsToRows(docs);
    const csvText = await buildCsvText(rows);
    console.log('[' + PACKAGE_NAME + '] --dry : ' + rows.length + ' fiches, ' + csvText.length + ' chars CSV.');
    console.log(csvText.split('\n').slice(0, 4).join('\n'));
    return { ok: true, rows: rows.length };
  } catch (err) {
    console.error('[' + PACKAGE_NAME + '] Erreur dry : ' + (err && err.stack ? err.stack : err));
    return { ok: false };
  }
}

/** Démarre le planificateur node-cron (une seule fois). */
function startBackupScheduler() {
  if (_schedulerStarted) return;
  if (String(process.env.BACKUP_ENABLED || 'true') === 'false') {
    console.log('[' + PACKAGE_NAME + '] Planificateur désactivé (BACKUP_ENABLED=false).');
    return;
  }
  const expr = process.env.BACKUP_CRON || DEFAULT_CRON;
  const opts = {};
  if (process.env.BACKUP_CRON_TZ) opts.timezone = process.env.BACKUP_CRON_TZ;
  cron.schedule(expr, function () {
    runBackup().catch(function (e) { console.error('[' + PACKAGE_NAME + '] Cron exception : ' + e); });
  }, opts);
  _schedulerStarted = true;
  console.log('[' + PACKAGE_NAME + '] Planificateur actif : cron=' + expr + (opts.timezone ? ' TZ=' + opts.timezone : '') + (DEFAULT_MAX_DOCS ? ' (max=' + DEFAULT_MAX_DOCS + ' fiches)' : ''));
}

module.exports = {
  DEFAULT_CRON: DEFAULT_CRON,
  DEFAULT_RECIPIENT: DEFAULT_RECIPIENT,
  DEFAULT_COLLECTION: DEFAULT_COLLECTION,
  safeValue: safeValue,
  docToRow: docToRow,
  docsToRows: docsToRows,
  buildCsvText: buildCsvText,
  backupFilename: backupFilename,
  validateEnv: validateEnv,
  runBackup: runBackup,
  runBackupDry: runBackupDry,
  startBackupScheduler: startBackupScheduler,
};

/* CLI : node backup.service.js [--now|--dry] */
if (require.main === module) {
  const isNow = process.argv.indexOf('--now') !== -1;
  const isDry = process.argv.indexOf('--dry') !== -1;
  if (isNow || isDry) {
    (isDry ? runBackupDry() : runBackup()).then(function (summary) {
      process.exit(summary && summary.ok ? 0 : 1);
    });
  } else {
    startBackupScheduler();
  }
}