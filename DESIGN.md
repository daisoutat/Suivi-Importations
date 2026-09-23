# Suivi d'importation — Design Document

**Application** : Suivi d'importation ("importation")
**Entreprise** : Les Industries de Radisson
**Type** : Application web interne, hébergée sur le réseau local, protégée par mot de passe
**Empilement** : Python 3 stdlib uniquement (aucune dépendance à installer), SQLite, HTML/CSS/JS vanilla

---

## 1. Objectif

Remplacer la carte papier « carte Meco » par un cockpit numérique de suivi des
importations. Chaque fournisseur possède un profil; chaque profil contient des
fiches d'importation dont les champs reproduisent la spécification de la carte
Meco. Chaque fiche porte une liste de vérification détaillée (vérification
Dropbox, support d'intégration API, etc.) avec des statuts traçables.

## 2. Exigences → solution

| Exigence | Mise en œuvre |
|---|---|
| Titre « Suivi d'importation » | En-tête de marque et titre du portail |
| Hébergé sur le réseau local | Serveur HTTP Python lié à `0.0.0.0` (accessible par IP LAN), port 8000 par défaut |
| Sécurisé par mot de passe | Comptes utilisateurs multiples (`users`), connexion par nom d'utilisateur + mot de passe (PBKDF2-SHA256 salé, compat SHA-256 héritée), sessions avec jeton `HttpOnly` + `SameSite=Strict`, verrouillage anti-bruteforce par IP |
| Rôles et gestion des comptes | Rôles `admin` (gestion des utilisateurs) et `user`; interface de gestion des comptes dans Paramètres (création, rôle, réinitialisation, suppression) accessible aux administrateurs |
| Interface bilingue FR / EN | Dictionnaire i18n dans `static/app.js`, bascule instantanée FR / EN |
| Palette de couleurs dynamique | 6 thèmes (Radisson, Émeraude, Soleil couchant, Minuit, Rosée, Graphite) appliqués via variables CSS; choix persistant |
| Profils individuels des fournisseurs | Mico, Micota, Ingenious, Navita pré-chargés (création/édition/suppression libres) |
| Champs selon la carte Meco | Destination, n° PO/INBSIP, n° document, nombre de palettes, transitaire/BOL, conteneur, ETD, ETA (plus notes) |
| Liste de vérification avec statuts | Tâches avec statuts **Non commencé / En cours / Terminé / N/A**, notes, ajout de tâches; tâches prêtes : vérification Dropbox, support d'intégration API, documents, courtier, drayage, suivi conteneur, livraison |

## 3. Architecture

```
Suivi_Importation/
├── server.py            # Serveur HTTP stdlib + API REST + authentification
├── START.bat            # Lanceur (double-clic)
├── DESIGN.md            # Ce document
├── data/
│   └── radisson.db      # Base SQLite (créée au premier démarrage)
└── static/
    ├── index.html       # Coquille SPA
    ├── style.css        # Thèmes + présentation
    └── app.js           # Interface (SPA), i18n, thèmes, CRUD
```

### 3.1 Processus serveur (`server.py`)

- `ThreadingHTTPServer` multi-clients; chaque requête ouvre une connexion SQLite dédiée (sûr en multi-utilisateur).
- Routes statiques (`/`, `/style.css`, `/app.js`) et API (`/api/...`).
- Aucune dépendance externe : `http.server`, `sqlite3`, `secrets`, `hashlib`, `re`, `json` — tout est dans la bibliothèque standard.

### 3.2 Modèle de données (SQLite)

```sql
suppliers(id, name, code, city, country, contact, email, notes, created_at, updated_at)

imports(id, supplier_id → suppliers ON DELETE CASCADE,
        serial,          -- n° séquentiel unique "FI%06d" (FI000001, FI000002, …)
        origin, port_of_loading, destination, port_of_discharge,
        po_number, inbsip, doc_number, pallets,
        transitaire_bol, container, etd, eta,
        eta_van, eta_dest,   -- ETA VAN / DEST (fiche MECO)
        qc_sampling_qc INTEGER DEFAULT 0, qc_sampling_reception INTEGER DEFAULT 0,
        notes, add_info, created_at, updated_at,
        deleted INTEGER NOT NULL DEFAULT 0)   -- add_info : JSON [{"type","value"}, ...]
                                            -- deleted : 1 = corbeille (suppression douce)

checklist_items(id, import_id → imports ON DELETE CASCADE,
        task_key, task_label_fr, task_label_en, status, notes, link, links, position,
        meta)               -- meta : JSON (fiche MECO : {"on_rail":bool,"eta_note":"…"})
                            -- links : JSON array d'URLs (multi-liens) ; `link` garde le 1er
                            -- lien pour compatibilité descendante

settings(key, value)          -- stocke le hash du mot de passe
```

- La suppression d'un fournisseur supprime ses fiches et leurs listes (cascade).
- **Suppression douce (corbeille)** : le bouton `🗑 Supprimer la fiche` (bas-gauche de la carte) passe `deleted=1`; la fiche disparaît du tableau de bord et des listes. La vue **Corbeille** (`/api/imports?deleted=1`) permet de **Restaurer** (`PUT /api/imports/<id>/restore`, `deleted=0`) ou **Supprimer définitivement** (`DELETE`, action irréversible). Les statistiques du tableau de bord excluent les fiches corbeille.
- **Numéro de série `serial`** : généré automatiquement à la création (`FI` + compteur séquentiel à 6 chiffres, `FI000001`, `FI000002`, …). Le compteur vit dans `settings['import_serial_next']` et n'est **jamais réutilisé**, même après une suppression définitive. À l'initialisation (une seule fois, drapeau `serial_renumber_v1`), toutes les fiches existantes sont **renumérotées FI000001… dans l'ordre des `id`** et le compteur est remis à `n+1`.
- `status` ∈ `pending | progress | done | na`.
- Chaque nouvelle fiche démarre avec une liste de vérification **vide**; les tâches y sont ajoutées depuis le sélecteur (catalogue de 8 tâches proposées, voir §5).

### 3.3 API REST

| Méthode | Route | Rôle |
|---|---|---|
| POST | `/api/login` | Vérifie `username` + mot de passe, crée la session, pose le cookie |
| GET | `/api/logout` | Détruit la session |
| GET | `/api/me` | Confirme la session et renvoie l'utilisateur courant (`id`, `username`, `display_name`, `role`) |
| GET / POST | `/api/users` | Liste / création d'utilisateurs (**admin uniquement**) |
| PUT / DELETE | `/api/users/<id>` | Modification (rôle, nom affiché, mot de passe) / suppression d'un utilisateur (**admin uniquement**) |
| GET | `/api/suppliers` | Liste des fournisseurs |
| POST / PUT / DELETE | `/api/suppliers[/id]` | CRUD fournisseurs |
| GET | `/api/imports` | Fiches (filtres `supplier_id`, `search`, `deleted=1` → corbeille) + résumé checklist (`_done`/`_total`) |
| GET / POST / PUT / DELETE | `/api/imports[/id]` | CRUD fiches |
| PUT | `/api/imports/<id>/checklist` | Remplacement complet de la liste de vérification (chaque tâche accepte `links` : array d'URLs **ou** héritage mono-valeur `link`; le serveur stocke les deux : `links`=JSON, `link`=1er) |
| PUT | `/api/imports/<id>/trash` | Suppression douce (`deleted=1`) |
| PUT | `/api/imports/<id>/restore` | Restauration depuis la corbeille (`deleted=0`) |
| GET | `/api/imports/export?lang=fr` | Export `.xlsx` des **Prochaines arrivées** (ETA ≥ aujourd'hui, tri ETA croissant; feuille bilingue `Prochaines arrivées`/`Upcoming arrivals`) |
| GET | `/api/template` | Catalogue de tâches proposées pour l'ajout |
| GET | `/api/stats` | Tableau de bord (fiches actives, arrivées 7 j, progression checklist, fournisseurs) |
| GET | `/api/rates` | Taux de change en direct (base USD, cache 30 min) pour le widget de la barre latérale |
| POST | `/api/password` | Changement de son propre mot de passe (vérifie l'ancien) |
| POST | `/api/reconcile` | Rapprochement facture fournisseur / commande (multipart `invoice` + `po`, `.xlsx` ou `.csv`; renvoie `{ok, invoice_file, po_file, invoice_sheet, po_sheet, columns, generated_at, stats, rows, pivot, run_id}`) |
| GET | `/api/reconcile/runs` | Historique des 20 derniers rapprochements (`id`, fichiers, `created_at`, `stats`, statut `saved`) |
| GET | `/api/reconcile/runs/<id>` | Détail complet d'un rapprochement (stats + lignes + pivot) |
| PUT | `/api/reconcile/runs/<id>/save` | Bouton « Enregistrer » : marque un rapprochement archivé comme validé (`saved=1`, `saved_at`) — additif, le résultat archivé reste inchangé |
| POST | `/api/rte/upload` | Éditeur enrichi : upload multipart d'une pièce jointe (champ `file`, extensions `ALLOWED_ATT_EXT`, ≤ 10 Mo) → `{url: "/api/rte/files/<stored>", name, content_type}` |
| GET | `/api/rte/files/<stored>` | Éditeur enrichi : sert l'octet téléversé (auth requise, MIME détecté, `Cache-Control: no-store`, anti-traversale) |

- L'export `.xlsx` est généré côté serveur **sans dépendance externe** : `zipfile` (package OOXML) + XML `inlineStr`, sérialisation conforme à Excel/LibreOffice (validée par openpyxl).
- **Rapprochement** (`reconcile.py`) : lecture serveur des fichieers via **openpyxl** 3.1.5 (déjà dans `requirements.txt`, aucune dépendance supplémentaire) pour `.xlsx`; `.csv` lu avec `csv.Sniffer` (séparateurs `, ; \t |`); `.xls` refusé (code d'erreur `xls`). Les 4 colonnes canoniques `Item Code / Code`, `Description`, `Quantity / Qté`, `Unit Price / Prix unitaire` sont détectées dans les 40 premières lignes, sans ordre imposé (alias FR/EN, accents ignorés); en-têtes et lignes de totaux sautés; max 5 000 lignes. **Algorithme déterministe** : normalisation décimale souple, puis équivalent RECHERCHEV sur le code — passe 1 = paire exacte (qte + prix + description) → statut `oui`; passe 2 = consommation positionnelle des lignes résiduelles → `neuf`. Lignes supplémentaires de la commande (non facturées) → `neuf` (`extra`). Le pivot par code agrège quantités et montants (`oui`/`neuf`) et la synthèse du rapport isole les lignes fautives.

### 3.4 Sécurité

- **Mot de passe par défaut** : `radisson` pour le compte `admin` — **à changer dans Paramètres → Sécurité** dès la première utilisation. Hashs héréditaires SHA-256; tout nouveau/changement de mot de passe utilise PBKDF2-SHA256 salé (120 000 itérations).
- **Comptes utilisateurs** : table `users` (`username` unique insensible à la casse, `password_hash`, `display_name`, `role`). À la première initialisation, un compte `admin` est créé avec le mot de passe défini précédemment. Les rôles sont `admin` (accès complet, gestion des utilisateurs) et `user` (accès aux données, sans gestion des comptes). Impossible de supprimer son propre compte ni le dernier administrateur.
- **Sessions** : jeton aléatoire (`secrets.token_urlsafe`), cookie `HttpOnly; SameSite=Strict`, TTL 12 h.
- **Anti-bruteforce** : 5 échecs de connexion par IP → verrouillage 60 s (HTTP 429).
- **Éditeur enrichi (RTE)** : assainissement **côté serveur** (`sanitize_rich_html`, `HTMLParser` stdlib) appliqué à l'enregistrement des zones riches (`suppliers.notes`, `imports.notes`, notes de checklist, `imp_email_fr`/`imp_email_en`; `imports.add_info` est un JSON non assaini). Liste blanche de balises/attributs : `on*`, `javascript:`/`vbscript:`, `script`/`iframe`/SVG `data:` supprimés; `data:` image/PDF et URL relatives `/api/rte/files/...` conservées pour ne pas casser les pièces jointes. L'upload (`/api/rte/upload`) réutilise `ALLOWED_ATT_EXT` + `stored_file_name` (nom aléatoire `secrets.token_hex`) et la servation est auth + anti-traversale.
- **Non atteint (limite connue)** : le HTTP local n'est pas chiffré; pour du hors-réseau de confiance uniquement. HTTPS nécessiterait un certificat (voir §6 – Évolution).

## 4. Interface

### 4.1 Écrans

1. **Connexion** — carte centrée, titre « Suivi d'importation », champ **nom d'utilisateur** + **mot de passe**; sélecteur de thème et de langue disponibles avant connexion également.
2. **Tableau de bord** — 4 indicateurs (fiches actives, arrivées ≤ 7 j, % listes complétées, fournisseurs) ; **Aperçu visuel** (doughnut CSS `conic-gradient` des fiches par état : *En transit* ETA future — *En douane* ETA atteinte/dépassée et checklist non terminée — *Livrée* ETA passée et checklist terminée, + légende bilingue) ; **Alertes** dérivées des données (retard critique ETA dépassée ⚠, n° document manquant, arrivée ≤ 7 j; clic → ouverture de la fiche) ; progression par fournisseur ; prochaines arrivées (triées par **N° FI décroissant** — la fiche la plus récente en tête). Le tableau affiche en **première colonne** le **Numéro de FI** (`FI #` en EN) des fiches, à gauche de la colonne Fournisseur. Les en-têtes **N° FI**, **ETD** et **ETA** sont **cliquables** pour trier la table par ordre croissant/décroissant (clic répété = inversion ; défaut : N° FI décroissant). Dans l'en-tête « Prochaines arrivées » : **recherche libre multi-champs** (fournisseur, destination, PO, INBSIP, doc, conteneur, transitaire, origine, port de déchargement) + **filtre fournisseur** + **compteur de résultats** visible dès qu'un critère est actif + bouton **⬇ Exporter vers Excel** (FR) / **Export to Excel** (EN) qui génère un fichier `.xlsx` (toutes les arrivées ETA ≥ aujourd'hui, colonnes identiques au tableau) et déclenche le téléchargement `prochaines_arrivees.xlsx` / `upcoming_arrivals.xlsx`. Une recherche ou un filtre lève la limite d'affichage de 8 lignes.
3. **Fournisseurs** — cartes des profils (Mico, Micota, Ingenious, Navita) + création/édition/suppression.
4. **Profil fournisseur** — coordonnées + tableau des fiches Meco + bouton « Nouvelle fiche d'importation ».
5. **Importations** — tableau global (première colonne **Numéro de FI** / `FI #`, puis fournisseur, destination, PO/INBSIP, doc, palettes, transitaire, conteneur, ETD, ETA, checklist), recherche multi-champs (fournisseur, destination, PO, INBSIP, doc, conteneur, transitaire, origine, port de déchargement), filtre par fournisseur, compteur de résultats.
6. **Corbeille** — fiches `deleted=1` uniquement; boutons **Restaurer** et **Supprimer définitivement** (avec confirmation) par ligne.
7. **Paramètres** — thème, langue, changement de mot de passe, gestion des comptes utilisateurs (admin). La **barre latérale** affiche sous « Paramètres » un widget compact **Taux de change** (base USD) pour CAD, EUR, GBP, CNY, MXN, mis à jour toutes les 20 min côté interface (cache serveur 30 min); s'il est hors ligne, le widget indique « Indisponible » et récupère les valeurs automatiquement dès le retour en ligne (réessai serveur toutes les 2 min pendant l'indisponibilité, relance interface toutes les 45 s, jusqu'à 8 tentatives).

### 4.2 Carte Meco (champs d'une fiche)

La modale « Nouvelle fiche / Modifier la fiche » est structurée ainsi :

- **En-tête** : titre de la modale + badge `serial` (n° de fiche, ex. `FI000001`) sur les fiches existantes, et bouton d'impression 🖨 (ne s'imprime pas lui-même).
- **Impression** : le bouton 🖨 ouvre la boîte de dialogue d'impression native (`window.print()`); à l'impression, seule la carte est rendue (`body > :not(#modal-root)` masqué, pied de modale et contrôles cachés) → « Enregistrer en PDF » ou imprimante physique.

1. **Fournisseur** (champ obligatoire) ;
2. **Import details** (section) :
   | Champ | Variable | Type |
   |---|---|---|
   | Origine | `origin` | texte |
   | Port de chargement | `port_of_loading` | texte |
   | Destination | `destination` | menu déroulant (Montréal, Toronto, Saint-Lambert-de-Lauzon, Calgary) — la valeur existante hors liste est conservée et re-proposée à l'édition |
   | Port de déchargement | `port_of_discharge` | menu déroulant (Prince Rupert, Vancouver) — même règle de conservation |
   | N° PO | `po_number` | texte |
   | INBSIP | `inbsip` | texte |
   | N° document | `doc_number` | texte |
   | Nombre de palettes | `pallets` | entier |
   | Transitaire / BOL | `transitaire_bol` | texte |
   | Conteneur | `container` | texte |
   | ETD | `etd` | date |
   | ETA | `eta` | date |
   | **Additional information** | `add_info` | JSON `[{"type","value"},…]` |
   | Notes | `notes` | texte multi-lignes (sous le sélecteur) |

   Le sélecteur « Additional information » propose exactement : Incoterms, Mode de transport, Type de conteneur, Code SH, Conditions de paiement, Devise, Valeur de la marchandise, Frais de douane, Frais de fret. Chaque sélection instancie un nouveau champ (libellé = option choisie, dans la langue active) sans écraser les précédents; le sélecteur revient à « — »; un doublon d'une option déjà ajoutée est refusé.

Accents et dates rendus selon la langue (jj/mm/aaaa FR, mm/dd/aaaa EN). Badges dynamiques : « arrive bientôt ≤ 7 j », « en retard », compteur de tâches terminées.

**Formulaire dynamique MECO** : dès que le fournisseur **MECO** est sélectionné (création ou édition), un bloc « Fiche d'importation MECO » apparaît juste sous la sélection et remplace les champs génériques redondants (destination, PO, DOC, palettes, BOL, conteneur, ETD, ETA). Le bloc contient :

| libellé | stockage | type |
|---|---|---|
| DESTINATION | `destination` | texte |
| PO# / INBSHIP# | `po_number` | texte |
| DOC # | `doc_number` | texte |
| NB PLTS | `pallets` | nombre |
| TRANSITAIRE BOL | `transitaire_bol` | texte |
| CONTENEUR | `container` | texte |
| ETD | `etd` | date |
| ETA VAN / ETA DEST | `eta_van` / `eta_dest` | deux dates (l'`eta` de la fiche est dérivée : VAN sinon DEST) |
| QC-SAMPLING REQUIS | `qc_sampling_qc` / `qc_sampling_reception` | deux cases à cocher |

Sous les champs, un **tableau de suivi des tâches** (TÂCHES · STATUT · COMMENTAIRES) avec 7 lignes fixes : *Vérifié et Enregistré (Dropbox/Outlook)*, *Mettre à jour ETA dans NS*, *Calendrier*, *Douanes*, *Entrepôt*, *Facture commerciale*, *BOL Bourassa*. La première ligne comporte en plus, dans la colonne COMMENTAIRES, une sous-case **ON RAIL** et un champ **ETA :** ; le tout est stocké en `checklist_items` (`meta` : `{"on_rail":bool,"eta_note":"…"}`, statut case cochée = `done`). Les tâches MECO existantes de modèles précédents (clés ≠ `meco_*`) sont conservées à l'enregistrement (transparentes). Les champs hors gabarit (origine, ports, notes, additional info) restent éditables.

### 4.3 Liste de vérification (statuts)

- Statuts : **Non commencé · En cours · Terminé · Non applicable** (couleurs : gris, ambre, vert, bleu).
- Tâches proposées dans le sélecteur d'ajout (catalogue, non pré-ajoutées) :
  1. Vérification Dropbox (`dropbox`)
  2. Support d'intégration API (`api`)
  3. Collecte des documents : facture, packing list
  4. Envoi des documents au courtier
  5. Avis au courtier de douane
  6. Transportation booking (`drayage`)
  7. Suivi du conteneur
  8. Confirmation de livraison
- Chaque tâche ajoutée (catalogue ou personnalisée) propose 4 boutons de statut (**NS · IP · OK · NA**), un champ **lien hypertexte** (rendu cliquable) et un champ **commentaires**.
- L'affichage des noms de tâches suit la langue active de l'interface (FR ou EN, jamais les deux à la fois).
- Possibilité d'ajouter/supprimer des tâches et d'ajouter un commentaire par tâche; bouton « Imprimer la fiche » pour une trace papier (carte Meco physique).

## 5. Bilinguisme & thèmes

- **Bilinguisme** : table `I18N` de paires `fr`/`en` dans `app.js`; fonction `t(clé)`; bascule FR/EN en un clic (persistée).
- **Thèmes** : 6 palettes définies par variables CSS (`--primary`, `--surface`, `--header`, etc.); sélecteur de pastilles de couleur dans l'en-tête, la connexion et les Paramètres; choix persisté.

## 6. Déploiement réseau local

1. S'assurer que **Python 3.9+** est installé (aucune dépendance supplémentaire).
2. Double-cliquer sur `START.bat` (ou `python server.py`).
3. La console affiche l'adresse locale, ex. :
   `Lecture: http://localhost:8000   (réseau local: http://192.168.1.50:8000)`
4. Depuis un autre poste du réseau, ouvrir l'adresse IP + port.
5. Une alerte pare-feu Windows peut demander d'autoriser Python sur le réseau privé (à accepter).
6. Changer le mot de passe par défaut via **Paramètres → Sécurité**.

**Personnalisation** : variables d'environnement `RADISSON_HOST` (ex. `127.0.0.1` pour local seulement) et `RADISSON_PORT`.

## 7. Exploitation

- **Sauvegarde** : copier le dossier `data/` (`radisson.db`). Fichier unique, portable.
- **Réinitialisation** : supprimer `data/radisson.db`; le serveur recrée la base et re-ensemence (mot de passe `radisson`, fournisseurs Mico/Micota/Ingenious/Navita + fiches d'exemple).
- **Fichiers modifiables à chaud** : le front-end (`static/`) est relu à chaque requête; seul `server.py` requiert un redémarrage.

## 8. Limites et évolutions possibles

- Comptes utilisateurs nominatifs, rôles (lecture / édition) et verrou de modification.
- HTTPS via certificat local pour chiffrer les sessions hors réseau de confiance.
- Écrivain du « support d'intégration API » : préparation d'un endpoint JSON réutilisable par un futur système tiers (l'API REST existante est déjà réutilisable).
- Synchronisation Dropbox réelle (webhook/vérification automatique) au lieu de la tâche manuelle.
- Export Excel/CSV des fiches et listes de vérification pour archivage et rapports de gestion.