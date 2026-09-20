"use strict";

const I18N = {
  fr: {
    app_title: "Suivi d'importation",
    app_sub: "Les Industries de Radisson",
    login_title: "Connexion sécurisée",
    login_hint: "Entrez vos identifiants pour accéder au système.",
    login_username: "Nom d'utilisateur",
    password: "Mot de passe",
    login_btn: "Se connecter",
    logout: "Déconnexion",
    err_invalid: "Mot de passe invalide.",
    err_locked: "Trop de tentatives. Réessayez dans une minute.",
    err_network: "Erreur réseau. Vérifiez que le serveur est en marche.",
    theme_label: "Thème",
    themes: { radisson: "Radisson", emerald: "Émeraude", sunset: "Soleil couchant", midnight: "Minuit", rose: "Rosée", graphite: "Graphite" },
    nav_dashboard: "Tableau de bord",
    nav_suppliers: "Fournisseurs",
    nav_imports: "Importations",
    nav_settings: "Paramètres",
    nav_trash: "Corbeille",
    trash_title: "Corbeille",
    trash_empty: "La corbeille est vide.",
    restore: "Restaurer",
    delete_permanent: "Supprimer définitivement",
    confirm_trash_card: "Déplacer cette fiche d'importation vers la corbeille?",
    confirm_delete_permanent: "Supprimer définitivement cette fiche? Cette action est irréversible.",
    deleted_ok: "Déplacé vers la corbeille.",
    restored_ok: "Fiche restaurée.",
    deleted_perm_ok: "Fiche supprimée définitivement.",
    dashboard_title: "Vue d'ensemble",
    stat_active: "Fiches d'importation actives",
    stat_arrivals: "Arrivées sous 7 jours",
    stat_checklist: "Listes de vérification complétées",
    stat_suppliers: "Fournisseurs",
    stat_today: "Aujourd'hui",
    panel_progress: "Progression des listes de vérification par fournisseur",
    panel_recent: "Prochaines arrivées (ETA)",
    no_data: "Aucune donnée",
    suppliers_title: "Profils de fournisseurs",
    new_supplier: "Nouveau fournisseur",
    edit_supplier: "Modifier le fournisseur",
    delete_supplier: "Supprimer",
    confirm_delete_supplier: "Supprimer ce fournisseur et toutes ses fiches d'importation?",
    open_profile: "Ouvrir le profil",
    no_suppliers: "Aucun fournisseur. Créez le premier profil.",
    imports: "importations",
    import: "importation",
    back: "Retour",
    supplier_name: "Nom du fournisseur",
    code: "Code",
    city: "Ville",
    country: "Pays",
    contact: "Contact",
    email: "Courriel",
    notes: "Notes",
    save: "Enregistrer",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    add: "Ajouter",
    close: "Fermer",
    search: "Rechercher (PO, conteneur, doc…)",
    all_suppliers: "Tous les fournisseurs",
    filter_supplier: "Filtrer par fournisseur",

    profile_title: "Profil du fournisseur",
    card_title: "Fiches d'importation",
    new_card: "Nouvelle fiche d'importation",
    edit_card: "Modifier la fiche",
    delete_card: "Supprimer la fiche",
    confirm_delete_card: "Supprimer cette fiche d'importation?",
    meco_fields: "Carte Meco — champs",
    section_import_details: "Import details",
    field_origin: "Origine",
    field_port_loading: "Port de chargement",
    field_fi: "N° FI",
    field_destination: "Destination",
    field_port_discharge: "Port de déchargement",
    dest_montreal: "Montréal",
    dest_toronto: "Toronto",
    dest_st_lambert: "Saint-Lambert-de-Lauzon",
    dest_calgary: "Calgary",
    port_prince_rupert: "Prince Rupert",
    port_vancouver: "Vancouver",
    field_po: "PO / INBSIP",
    field_po_number: "N° PO",
    field_inbsip: "INBSIP",
    field_doc: "N° document",
    field_pallets: "Nb de palettes",
    field_bol: "Transitaire / BOL",
    field_container: "Conteneur",
    field_etd: "ETD",
    field_eta: "ETA",
    field_notes: "Notes",
    extra_title: "Additional information",
    extra_placeholder: "—",
    extra_value_placeholder: "Valeur…",
    extra_dup: "Déjà ajouté.",
    extra_remove: "Retirer",
    ai_incoterms: "Incoterms",
    ai_mode_transport: "Mode de transport",
    ai_container_type: "Type de conteneur",
    ai_hs_code: "Code SH",
    ai_payment_terms: "Conditions de paiement",
    ai_currency: "Devise",
    ai_value_goods: "Valeur de la marchandise",
    ai_customs_fees: "Frais de douane",
    ai_freight_charges: "Frais de fret",
    supplier: "Fournisseur",
    actions: "Actions",
    checklist: "Liste de vérification",
    checklist_of: "Liste de vérification des tâches",
    save_checklist: "Enregistrer la liste",
    cl_placeholder: "Choisir une tâche…",
    cl_custom: "Tâche personnalisée",
    cl_custom_placeholder: "Nom de la tâche personnalisée…",
    cl_empty: "Aucune tâche encore — choisissez-en une ci-dessous.",
    cl_link_label: "Lien",
    cl_link_placeholder: "https://… (rendu comme lien cliquable)",
    cl_comments_label: "Commentaire",
    cl_comments_placeholder: "Commentaire / note…",
    checklist_saved: "Liste de vérification enregistrée.",
    checklist_saved_title: "Enregistrement réussi",
    status_pending: "Non commencé",
    status_progress: "En cours",
    status_done: "Terminé",
    status_na: "Non applicable",
    status_short: ["NS", "IP", "OK", "NA"],
    done_x_of_y: "{d}/{t} tâches complétées",
    print_card: "Imprimer la fiche",
    section_attachments: "Pièces jointes",
    att_upload: "Téléverser",
    att_hint: "Formats acceptés : PDF, Word, Excel, images (10 Mo max par fichier).",
    att_none: "Aucune pièce jointe.",
    att_save_first: "Enregistrez la fiche d'abord, puis ajoutez les pièces jointes.",
    att_added: "Pièce jointe ajoutée.",
    att_removed: "Pièce jointe supprimée.",
    att_bad_type: "Type de fichier non autorisé.",

    imports_title: "Importations",
    arrivals_soon: "Arrive bientôt",
    export_xlsx: "Exporter vers Excel",
    export_xlsx_name: "prochaines_arrivees.xlsx",
    dash_visual: "Aperçu visuel",
    dash_alerts: "Alertes",
    state_transit: "En transit",
    state_customs: "En douane",
    state_delivered: "Livrée",
    import_count: "Fiches",
    no_alerts: "Aucune alerte.",
    alert_overdue: "ETA dépassée de {d} j",
    alert_missing_docs: "N° document manquant",
    alert_soon: "Arrive sous {d} j",
    up_search_ph: "Rechercher une arrivée…",
    up_filter_supplier: "Tous les fournisseurs",
    results_n: "{n} résultat(s)",
    overdue: "En retard",
    todays_date: "Aujourd'hui : date",
    settings_title: "Paramètres",
    sec_language: "Langue d'affichage",
    sec_theme: "Palette de couleurs",
    sec_security: "Sécurité",
    sec_users: "Utilisateurs",
    current_password: "Mot de passe actuel",
    new_password: "Nouveau mot de passe (6 caractères min.)",
    confirm_password: "Confirmer le nouveau mot de passe",
    change_password: "Changer le mot de passe",
    password_weak: "Le mot de passe doit contenir au moins 6 caractères.",
    password_mismatch: "La confirmation ne correspond pas.",
    password_wrong_current: "Mot de passe actuel incorrect.",
    password_changed: "Mot de passe modifié.",
    save_ok: "Enregistré.",
    save_err: "Erreur : {msg}",
    required: "Champ obligatoire.",
    app_name: "Suivi des importations — Industries Radisson",
    chat_title: "Assistant virtuel",
    chat_placeholder: "Posez votre question…",
    chat_send: "Envoyer",
    chat_greeting: "Bonjour ! Je suis votre assistant. Posez-moi une question sur vos importations, vos fournisseurs ou vos prochaines arrivées.",
    chat_help: "Je peux vous renseigner sur :\n• le statut d'une fiche (N° FI, PO, INBSIP, n° document)\n• les prochaines arrivées\n• un fournisseur (coordonnées, fiches actives)\n• les alertes et retards\n• les statistiques globales.\nExemples : « quand arrive le PO1233 ? », « mes fournisseurs ? », « prochaines arrivées ».",
    chat_unknown: "Désolé, je n'ai pas compris. Essayez une question sur une fiche, une arrivée ou un fournisseur :",
    chat_no_data: "Aucune donnée pour le moment.",
    chat_rel_days: "dans {d} j",
    chat_rel_overdue: "{d} j de retard",
    chat_rel_today: "aujourd'hui",
    chat_import_status: "{ref} — {supplier} → {dest}. ETA : {eta} ({rel}). Checklist : {done}.",
    chat_sup_info: "{name} ({code}) — {city}, {country}. Contact : {contact} ({email}). {n} fiche(s) active(s).",
    chat_sup_none: "Je n'ai pas trouvé de fournisseur pour « {q} ».",
    chat_suppliers: "{n} fournisseur(s) :",
    chat_arr_none: "Aucune arrivée à venir.",
    chat_arr_soon: "Prochaines arrivées (≤ {d} j) — {n} :",
    chat_arr_header: "Arrivées à venir ({n}) :",
    chat_nooverdue: "Aucune fiche en retard.",
    chat_overdue_header: "Fiches en retard ({n}) :",
    chat_noalert: "Aucune fiche sans n° de document.",
    chat_alert_header: "Fiches sans n° de document ({n}) :",
    chat_stats: "Fiches actives : {active} · Arrivées ≤ 7 j : {soon} · Retards : {over} · Listes complétées : {pct}%.",
    chat_go_imports: "Importations",
    chat_q_arrivals: "Prochaines arrivées",
    chat_q_suppliers: "Fournisseurs",
    chat_q_help: "Aide",
    collapse_open: "Développer la section",
    collapse_close: "Réduire la section",
    rates_title: "Taux de change",
    rates_unavailable: "Indisponible",
    meco_form_title: "Fiche d'importation MECO",
    meco_tasks_title: "Suivi des tâches",
    meco_col_tache: "TÂCHES",
    meco_col_statut: "STATUT",
    meco_col_commentaires: "COMMENTAIRES",
    meco_destination: "DESTINATION",
    meco_po: "PO# / INBSHIP#",
    meco_doc: "DOC #",
    meco_nb_plts: "NB PLTS",
    meco_eta_van: "ETA VAN",
    meco_eta_dest: "ETA DEST",
    meco_qc_label: "QC-SAMPLING REQUIS",
    meco_qc_qc: "QC",
    meco_qc_reception: "Réception",
    meco_onrail: "ON RAIL",
    meco_eta_suffix: "ETA :",

    nav_meco: "MECO",
    meco_view_title: "Fiche d'importation MECO",
    meco_po_nr: "PO#",
    meco_inbship_nr: "INBSHIP#",
    meco_transitaire: "TRANSITAIRE BOL",
    meco_container: "CONTENEUR",
    meco_view_qc: "QC-SAMPLING",
    meco_view_calendar: "Ajout au calendrier",
    meco_view_packing: "Packing Slip / Entrepôt",
    meco_view_reconcile: "Conciliation facture commerciale",
    meco_link_tip: "Lier une ressource externe",
    meco_new: "Nouveau",
    nav_meco: "MECO",
    meco_view_title: "Fiche d'importation MECO",
    meco_po_nr: "PO#",
    meco_inbship_nr: "INBSHIP#",
    meco_bol: "TRANSITAIRE BOL",
    meco_helper: "La fiche est automatiquement créée auprès du fournisseur MECO. Cliquez sur chaque tâche pour associer une ressource externe (lien).",
    meco_reset: "Effacer",
    user_username: "Nom d'utilisateur",
    user_display: "Nom complet",
    user_role: "Rôle",
    user_password: "Mot de passe",
    user_add_btn: "Créer le compte",
    user_new_pw_hint: "Nouveau mot de passe (6 caractères min.)",
    user_reset_pw: "Réinitialiser mot de passe",
    user_delete: "Supprimer",
    user_confirm_delete: "Supprimer ce compte utilisateur ?",
    user_self_delete: "Vous ne pouvez pas supprimer votre propre compte.",
    user_last_admin: "Impossible de supprimer ou rétrograder le dernier administrateur.",
    user_exists: "Un compte avec ce nom d'utilisateur existe déjà.",
    user_not_found: "Utilisateur introuvable.",
    user_bad_username: "Nom invalide : 3 caractères min. (lettres, chiffres, _ ou -).",
    save_user_ok: "Utilisateur enregistré.",
    user_reset_ok: "Mot de passe réinitialisé.",
    user_deleted: "Utilisateur supprimé.",
    user_me: "vous",
    user_no_users: "Aucun utilisateur.",
    role_admin: "Administrateur",
    role_user: "Utilisateur",
    actions_col: "Actions",
    err_forbidden: "Accès refusé.",
  },

  en: {
    app_title: "Import Tracking",
    app_sub: "Les Industries de Radisson",
    login_title: "Secure sign-in",
    login_hint: "Enter your credentials to access the system.",
    login_username: "Username",
    password: "Password",
    login_btn: "Sign in",
    logout: "Log out",
    err_invalid: "Invalid password.",
    err_locked: "Too many attempts. Please retry in a minute.",
    err_network: "Network error. Make sure the server is running.",
    theme_label: "Theme",
    themes: { radisson: "Radisson", emerald: "Emerald", sunset: "Sunset", midnight: "Midnight", rose: "Rose", graphite: "Graphite" },
    nav_dashboard: "Dashboard",
    nav_suppliers: "Suppliers",
    nav_imports: "Imports",
    nav_settings: "Settings",
    nav_trash: "Trash",
    trash_title: "Trash",
    trash_empty: "The trash is empty.",
    restore: "Restore",
    delete_permanent: "Delete permanently",
    confirm_trash_card: "Move this import record to the trash?",
    confirm_delete_permanent: "Permanently delete this record? This action cannot be undone.",
    deleted_ok: "Moved to trash.",
    restored_ok: "Record restored.",
    deleted_perm_ok: "Record permanently deleted.",
    dashboard_title: "Overview",
    stat_active: "Active import cards",
    stat_arrivals: "Arrivals in 7 days",
    stat_checklist: "Checklists completed",
    stat_suppliers: "Suppliers",
    stat_today: "Today",
    panel_progress: "Checklist progress by supplier",
    panel_recent: "Upcoming arrivals (ETA)",
    no_data: "No data",
    suppliers_title: "Supplier profiles",
    new_supplier: "New supplier",
    edit_supplier: "Edit supplier",
    delete_supplier: "Delete",
    confirm_delete_supplier: "Delete this supplier and all of its import cards?",
    open_profile: "Open profile",
    no_suppliers: "No suppliers yet. Create the first profile.",
    imports: "imports",
    import: "import",
    back: "Back",
    supplier_name: "Supplier name",
    code: "Code",
    city: "City",
    country: "Country",
    contact: "Contact",
    email: "Email",
    notes: "Notes",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    close: "Close",
    search: "Search (PO, container, doc…)",
    all_suppliers: "All suppliers",
    filter_supplier: "Filter by supplier",

    profile_title: "Supplier profile",
    card_title: "Import cards",
    new_card: "New import card",
    edit_card: "Edit card",
    delete_card: "Delete card",
    confirm_delete_card: "Delete this import card?",
    meco_fields: "Meco card — fields",
    section_import_details: "Import details",
    field_origin: "Origin",
    field_port_loading: "Port of loading",
    field_fi: "FI #",
    field_destination: "Destination",
    field_port_discharge: "Port of discharge",
    dest_montreal: "Montréal",
    dest_toronto: "Toronto",
    dest_st_lambert: "Saint-Lambert-de-Lauzon",
    dest_calgary: "Calgary",
    port_prince_rupert: "Prince Rupert",
    port_vancouver: "Vancouver",
    field_po: "PO / INBSIP",
    field_po_number: "PO No.",
    field_inbsip: "INBSIP",
    field_doc: "Doc #",
    field_pallets: "# of pallets",
    field_bol: "Forwarder / BOL",
    field_container: "Container",
    field_etd: "ETD",
    field_eta: "ETA",
    field_notes: "Notes",
    extra_title: "Additional information",
    extra_placeholder: "—",
    extra_value_placeholder: "Value…",
    extra_dup: "Already added.",
    extra_remove: "Remove",
    ai_incoterms: "Incoterms",
    ai_mode_transport: "Mode of transport",
    ai_container_type: "Container type",
    ai_hs_code: "HS code",
    ai_payment_terms: "Payment terms",
    ai_currency: "Currency",
    ai_value_goods: "Value of goods",
    ai_customs_fees: "Customs fees",
    ai_freight_charges: "Freight charges",
    supplier: "Supplier",
    actions: "Actions",
    checklist: "Checklist",
    checklist_of: "Task checklist",
    save_checklist: "Save checklist",
    cl_placeholder: "Choose a task…",
    cl_custom: "Custom task",
    cl_custom_placeholder: "Custom task name…",
    cl_empty: "No tasks yet — pick one below.",
    cl_link_label: "Link",
    cl_link_placeholder: "https://… (rendered as clickable link)",
    cl_comments_label: "Comment",
    cl_comments_placeholder: "Comment / note…",
    checklist_saved: "Checklist saved.",
    checklist_saved_title: "Saved",
    status_pending: "Not started",
    status_progress: "In progress",
    status_done: "Completed",
    status_na: "N/A",
    status_short: ["NS", "IP", "OK", "NA"],
    done_x_of_y: "{d}/{t} tasks completed",
    print_card: "Print card",
    section_attachments: "Attachments",
    att_upload: "Upload",
    att_hint: "Accepted formats: PDF, Word, Excel, images (10 MB max per file).",
    att_none: "No attachments.",
    att_save_first: "Save the card first, then add attachments.",
    att_added: "Attachment added.",
    att_removed: "Attachment removed.",
    att_bad_type: "File type not allowed.",

    imports_title: "Imports",
    arrivals_soon: "Arriving soon",
    export_xlsx: "Export to Excel",
    export_xlsx_name: "upcoming_arrivals.xlsx",
    dash_visual: "Visual overview",
    dash_alerts: "Alerts",
    state_transit: "In transit",
    state_customs: "At customs",
    state_delivered: "Delivered",
    import_count: "Records",
    no_alerts: "No alerts.",
    alert_overdue: "ETA overdue by {d} d",
    alert_missing_docs: "Missing document number",
    alert_soon: "Arriving in {d} d",
    up_search_ph: "Search arrivals…",
    up_filter_supplier: "All suppliers",
    results_n: "{n} result(s)",
    overdue: "Overdue",
    todays_date: "Today : date",
    settings_title: "Settings",
    sec_language: "Display language",
    sec_theme: "Color palette",
    sec_security: "Security",
    sec_users: "Users",
    current_password: "Current password",
    new_password: "New password (6 characters min.)",
    confirm_password: "Confirm the new password",
    change_password: "Change password",
    password_weak: "Password must be at least 6 characters.",
    password_mismatch: "Confirmation does not match.",
    password_wrong_current: "Current password is incorrect.",
    password_changed: "Password changed.",
    save_ok: "Saved.",
    save_err: "Error: {msg}",
    required: "Required field.",
    app_name: "Import Tracking — Industries Radisson",
    chat_title: "Virtual assistant",
    chat_placeholder: "Ask a question…",
    chat_send: "Send",
    chat_greeting: "Hi! I'm your assistant. Ask me about your imports, your suppliers or the upcoming arrivals.",
    chat_help: "I can tell you about:\n• the status of a record (FI #, PO, INBSIP, document number)\n• the upcoming arrivals\n• a supplier (contacts, active records)\n• alerts and overdue records\n• global statistics.\nExamples: “when is PO1233 arriving?”, “my suppliers?”, “upcoming arrivals”.",
    chat_unknown: "Sorry, I didn't get that. Try asking about a record, an arrival or a supplier:",
    chat_no_data: "No data at the moment.",
    chat_rel_days: "in {d} d",
    chat_rel_overdue: "{d} d late",
    chat_rel_today: "today",
    chat_import_status: "{ref} — {supplier} → {dest}. ETA: {eta} ({rel}). Checklist: {done}.",
    chat_sup_info: "{name} ({code}) — {city}, {country}. Contact: {contact} ({email}). {n} active record(s).",
    chat_sup_none: "I couldn't find a supplier for “{q}”.",
    chat_suppliers: "{n} supplier(s):",
    chat_arr_none: "No upcoming arrivals.",
    chat_arr_soon: "Upcoming arrivals (≤ {d} d) — {n}:",
    chat_arr_header: "Upcoming arrivals ({n}):",
    chat_nooverdue: "No overdue records.",
    chat_overdue_header: "Overdue records ({n}):",
    chat_noalert: "No record missing a document number.",
    chat_alert_header: "Records missing a document number ({n}):",
    chat_stats: "Active records: {active} · Arrivals ≤ 7 d: {soon} · Overdue: {over} · Checklists complete: {pct}%.",
    chat_go_imports: "Imports",
    chat_q_arrivals: "Upcoming arrivals",
    chat_q_suppliers: "Suppliers",
    chat_q_help: "Help",
    collapse_open: "Expand section",
    collapse_close: "Collapse section",
    rates_title: "Exchange rates",
    rates_unavailable: "Unavailable",
    meco_form_title: "MECO import tracking form",
    meco_tasks_title: "Task tracking",
    meco_col_tache: "TASKS",
    meco_col_statut: "STATUS",
    meco_col_commentaires: "COMMENTS",
    meco_destination: "DESTINATION",
    meco_po: "PO# / INBSHIP#",
    meco_doc: "DOC #",
    meco_nb_plts: "NB PLTS",
    meco_eta_van: "ETA VAN",
    meco_eta_dest: "ETA DEST",
    meco_qc_label: "QC-SAMPLING REQUIRED",
    meco_qc_qc: "QC",
    meco_qc_reception: "Reception",
    meco_onrail: "ON RAIL",
    meco_eta_suffix: "ETA:",

    nav_meco: "MECO",
    meco_view_title: "MECO import card",
    meco_po_nr: "PO#",
    meco_inbship_nr: "INBSHIP#",
    meco_transitaire: "TRANSITAIRE BOL",
    meco_container: "CONTENEUR",
    meco_view_qc: "QC-SAMPLING",
    meco_view_calendar: "Add to calendar",
    meco_view_packing: "Packing Slip / Warehouse",
    meco_view_reconcile: "Commercial invoice reconciliation",
    meco_link_tip: "Link an external resource",
    meco_new: "New",
    user_username: "Username",
    user_display: "Display name",
    user_role: "Role",
    user_password: "Password",
    user_add_btn: "Create account",
    user_new_pw_hint: "New password (min 6 characters)",
    user_reset_pw: "Reset password",
    user_delete: "Delete",
    user_confirm_delete: "Delete this user account?",
    user_self_delete: "You cannot delete your own account.",
    user_last_admin: "Cannot delete or demote the last administrator.",
    user_exists: "An account with this username already exists.",
    user_not_found: "User not found.",
    user_bad_username: "Invalid username: min 3 characters (letters, digits, _ or -).",
    save_user_ok: "User saved.",
    user_reset_ok: "Password reset.",
    user_deleted: "User deleted.",
    user_me: "you",
    user_no_users: "No users.",
    role_admin: "Administrator",
    role_user: "User",
    actions_col: "Actions",
    err_forbidden: "Access denied.",
  },
};

const THEMES = {
  radisson: { c1: "#1f3864", c2: "#2f5597" },
  emerald: { c1: "#0e5e3f", c2: "#2e9e6b" },
  sunset: { c1: "#a84b12", c2: "#e07a2f" },
  midnight: { c1: "#5b7fd4", c2: "#7c97e2" },
  rose: { c1: "#8e2b4d", c2: "#c45b7a" },
  graphite: { c1: "#343a45", c2: "#565e6e" },
};

const STATUSES = ["pending", "progress", "done", "na"];

const AI_KEYS = ["incoterms", "mode_transport", "container_type", "hs_code",
  "payment_terms", "currency", "value_goods", "customs_fees", "freight_charges"];

const DEST_OPTIONS = [
  { key: "dest_montreal", value: "Montréal" },
  { key: "dest_toronto", value: "Toronto" },
  { key: "dest_st_lambert", value: "Saint-Lambert-de-Lauzon" },
  { key: "dest_calgary", value: "Calgary" },
];

const DISCHARGE_OPTIONS = [
  { key: "port_prince_rupert", value: "Prince Rupert" },
  { key: "port_vancouver", value: "Vancouver" },
];

function dropdownFieldOptions(currentValue, options) {
  const known = options.map((o) => o.value);
  const opts = [`<option value="">—</option>`];
  for (const o of options) {
    opts.push(`<option value="${esc(o.value)}" ${currentValue === o.value ? "selected" : ""}>${esc(t(o.key))}</option>`);
  }
  if (currentValue && !known.includes(currentValue)) {
    opts.unshift(`<option value="${esc(currentValue)}" selected>${esc(currentValue)}</option>`);
  }
  return opts.join("");
}

let templateTasks = null;

async function ensureTemplate() {
  if (!templateTasks) {
    try {
      const r = await api("/api/template");
      templateTasks = (r && r.tasks) || [];
    } catch (e) {
      templateTasks = [];
    }
  }
  return templateTasks;
}

const state = {
  lang: localStorage.getItem("si_lang") || "fr",
  theme: localStorage.getItem("si_theme") || "radisson",
  authed: false,
  user: null,
  users: [],
  rates: null,
  suppliers: [],
  imports: [],
  attachments: [],
  loading: false,
  upSearch: "",
  upSup: "",
  sortKey: "fi",
  sortDir: -1,
  collapsed: JSON.parse(localStorage.getItem("si_collapsed") || "{}"),
};

const RATES_LIST = ["CAD", "EUR", "GBP", "CNY", "MXN"];

const MECO_SUPPLIER = "MECO";
const MECO_TASKS = [
  { key: "meco_verified", fr: "Vérifié et Enregistré (Dropbox/Outlook)", en: "Verified and Registered (Dropbox/Outlook)" },
  { key: "meco_update_eta_ns", fr: "Mettre à jour ETA dans NS", en: "Update ETA in NS" },
  { key: "meco_calendar", fr: "Calendrier", en: "Calendar" },
  { key: "meco_customs", fr: "Douanes", en: "Customs" },
  { key: "meco_warehouse", fr: "Entrepôt", en: "Warehouse" },
  { key: "meco_invoice", fr: "Facture commerciale", en: "Commercial invoice" },
  { key: "meco_bol_bourassa", fr: "BOL Bourassa", en: "BOL Bourassa" },
];

function t(key, vars) {
  let v = I18N[state.lang] && I18N[state.lang][key];
  if (v === undefined) v = I18N.fr[key];
  if (v === undefined) v = key;
  if (vars) for (const k in vars) v = String(v).replace("{" + k + "}", vars[k]);
  return v;
}

const esc = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function fmtDate(v) {
  if (!v) return "—";
  const p = String(v).slice(0, 10).split("-");
  if (p.length < 3) return v;
  return state.lang === "fr" ? `${p[2]}/${p[1]}/${p[0]}` : `${p[1]}/${p[2]}/${p[0]}`;
}

let importsRenderTimer = null;
let upRenderTimer = null;
let dashRenderSeq = 0;

function refocus(id, caret) {
  const el = document.getElementById(id);
  if (el) {
    el.focus();
    if (caret != null && el.setSelectionRange) el.setSelectionRange(caret, caret);
  }
}

function importSearchText(i) {
  return [i.supplier_name, i.destination, i.po_number, i.inbsip, i.doc_number,
          i.container, i.transitaire_bol, i.origin, i.port_of_discharge]
    .map((v) => String(v == null ? "" : v)).join(" ").toLowerCase();
}

function matchesImport(row, q) {
  return !q || importSearchText(row).includes(String(q).toLowerCase());
}

function fiNum(row) {
  return parseInt(String(row.serial || "").slice(2), 10) || 0;
}

function sortImports(rows) {
  const key = state.sortKey || "fi";
  const dir = state.sortDir || -1;
  return rows.slice().sort((a, b) => {
    let va, vb;
    if (key === "etd") { va = a.etd || ""; vb = b.etd || ""; }
    else if (key === "eta") { va = a.eta || ""; vb = b.eta || ""; }
    else { va = fiNum(a); vb = fiNum(b); }
    const c = va < vb ? -1 : va > vb ? 1 : 0;
    return c * dir;
  });
}

function sortTh(key, label) {
  const active = (state.sortKey || "fi") === key;
  const arrow = active ? (state.sortDir === -1 ? "▾" : "▴") : "↕";
  return `<th class="sortable${active ? " active" : ""}"><button type="button" class="sort-btn" data-act="sort-imports" data-key="${key}"><span>${esc(label)}</span><span class="sort-arrow">${arrow}</span></button></th>`;
}

function daysUntil(v) {
  if (!v) return null;
  const p = String(v).slice(0, 10).split("-").map(Number);
  if (p.length < 3) return null;
  const target = Date.UTC(p[0], p[1] - 1, p[2]);
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target - today) / 86400000);
}

async function exportUpcomingXlsx() {
  try {
    const res = await fetch("/api/imports/export?lang=" + encodeURIComponent(state.lang));
    if (res.status === 401) {
      state.authed = false;
      location.hash = "#/login";
      render();
      return;
    }
    if (!res.ok) throw new Error(res.statusText || "export failed");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = t("export_xlsx_name");
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  } catch (e) {
    toast(t("save_err", { msg: e.message }));
  }
}

async function api(path, method, body) {
  const opts = { method: method || "GET", headers: {} };
  if (body !== undefined) {
    if (typeof FormData !== "undefined" && body instanceof FormData) {
      opts.body = body;
    } else {
      opts.headers["Content-Type"] = "application/json";
      opts.body = JSON.stringify(body);
    }
  }
  let res;
  try {
    res = await fetch(path, opts);
  } catch (e) {
    throw new Error(e.message || "network");
  }
  let data = null;
  try {
    data = await res.json();
  } catch (e) { /* ignore */ }
  if (res.status === 401) {
    state.authed = false;
    if (location.hash !== "#/login") location.hash = "#/login";
    throw new Error(data && data.error ? data.error : "unauthorized");
  }
  if (!res.ok) throw new Error((data && data.error) || String(res.status));
  return data;
}

function toast(msg) {
  let wrap = document.getElementById("toasts");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.id = "toasts";
    document.body.appendChild(wrap);
  }
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

function applyTheme() {
  document.body.dataset.theme = state.theme;
  localStorage.setItem("si_theme", state.theme);
  document.documentElement.lang = state.lang;
}

function renderTopbar(crumb) {
  const segButtons = [["fr", "FR"], ["en", "EN"]]
    .map(([k, l]) => `<button data-act="lang" data-lang="${k}" class="${state.lang === k ? "active" : ""}">${l}</button>`)
    .join("");
  const dots = Object.keys(THEMES)
    .map((k) => `<button data-act="theme" data-theme="${k}"
        title="${t("theme_label")} : ${t("themes")[k]}"
        class="theme-dot ${state.theme === k ? "active" : ""}"
        style="background:linear-gradient(135deg, ${THEMES[k].c1}, ${THEMES[k].c2})"></button>`)
    .join("");
  return `<div class="topbar no-print">
    <div class="crumb">${esc(crumb)}</div>
    <span class="user-chip" title="${esc(t("sec_users"))}">👤 ${esc((state.user && (state.user.display_name || state.user.username)) || "")}</span>
    <div class="themes">${dots}</div>
    <div class="seg">${segButtons}</div>
    <button class="icon-btn" data-act="logout" title="${t("logout")}">⏻</button>
  </div>`;
}

function sidebarItems() {
  const items = [
    ["dashboard", t("nav_dashboard"), "▦"],
    ["suppliers", t("nav_suppliers"), "🏭"],
    ["imports", t("nav_imports"), "📦"],
    ["meco", t("nav_meco"), "🚛"],
    ["ingenious", "INGENIOUS", "🧭"],
    ["trash", t("nav_trash"), "🗑"],
    ["settings", t("nav_settings"), "⚙"],
  ];
  const active = routeName();
  return items
    .map(([k, lbl, ico]) => `<button class="nav-item ${active === k ? "active" : ""}" data-act="nav" data-nav="${k}">
      <span class="ico">${ico}</span><span>${esc(lbl)}</span></button>`)
    .join("");
}

function shell(crumb, inner) {
  return `<div class="shell">
    <aside class="sidebar no-print">
      <div class="brand">
        <div class="logo">R</div>
        <div class="titles"><div class="t1">${esc(t("app_title"))}</div><div class="t2">${esc(t("app_sub"))}</div></div>
      </div>
      ${sidebarItems()}
      ${ratesBox()}
      <div class="nav-spacer"></div>
      <button class="nav-item" data-act="logout"><span class="ico">⏻</span><span>${esc(t("logout"))}</span></button>
    </aside>
    <div class="main">
      ${renderTopbar(crumb)}
      <div class="content">${inner}</div>
    </div>
  </div>`;
}

function routeName() {
  const h = location.hash.replace(/^#\//, "");
  if (h.startsWith("supplier/")) return "suppliers";
  const seg = h.split("/")[0];
  return seg || "dashboard";
}

function go(hash) {
  location.hash = hash;
}

function badge(status) {
  const icons = { pending: state.lang === "fr" ? "□" : "□", progress: "◐", done: "✓", na: "—" };
  return `<span class="badge ${status}">${icons[status] || "•"} ${esc(t("status_" + status))}</span>`;
}

function etaBadge(row) {
  const d = daysUntil(row.eta);
  if (d === null) return '<span class="badge na">—</span>';
  if (d < 0) return `<span class="badge progress">${esc(t("overdue"))} ${Math.abs(d)} j</span>`;
  if (d <= 7) return `<span class="badge progress">${esc(t("arrivals_soon"))} ${d} j</span>`;
  return `<span class="badge done">${d} ${state.lang === "fr" ? "j" : "d"}</span>`;
}

function importRows(rows, showSupplier) {
  if (!rows.length) return `<tr><td colspan="${showSupplier ? 11 : 10}" class="empty">${esc(t("no_data"))}</td></tr>`;
  return rows.map((r) => {
    const done = (r._done || 0);
    const total = (r._total || 0);
    let clBadge = `<span class="badge pending">—</span>`;
    if (total > 0) {
      const pct = done / total;
      clBadge = pct === 1
        ? `<span class="badge done">${done}/${total}</span>`
        : `<span class="badge pending">${done}/${total}</span>`;
    }
    return `<tr data-act="open-import" data-id="${r.id}" class="clickable">
      <td class="num-md">${r.serial ? esc(r.serial) : "—"}</td>
      ${showSupplier ? `<td><a class="row-link" data-act="noop" href="#/supplier/${r.supplier_id}">${esc(r.supplier_name)}</a></td>` : ""}
      <td>${esc(r.destination)}</td>
      <td>${[r.po_number, r.inbsip].filter(Boolean).join(" / ") || ""}</td>
      <td>${esc(r.doc_number)}</td>
      <td class="num-md">${r.pallets == null ? "—" : esc(r.pallets)}</td>
      <td>${esc(r.transitaire_bol)}</td>
      <td>${esc(r.container)}</td>
      <td>${fmtDate(r.etd)}</td>
      <td>${fmtDate(r.eta)} ${etaBadge(r)}</td>
      <td>${clBadge}</td>
    </tr>`;
  }).join("");
}

function importTableHead(showSupplier) {
  return `<tr>
    ${sortTh("fi", t("field_fi"))}
    ${showSupplier ? `<th>${esc(t("supplier"))}</th>` : ""}
    <th>${esc(t("field_destination"))}</th>
    <th>${esc(t("field_po"))}</th>
    <th>${esc(t("field_doc"))}</th>
    <th>${esc(t("field_pallets"))}</th>
    <th>${esc(t("field_bol"))}</th>
    <th>${esc(t("field_container"))}</th>
    ${sortTh("etd", t("field_etd"))}
    ${sortTh("eta", t("field_eta"))}
    <th>${esc(t("checklist"))}</th>
  </tr>`;
}

/* ---------------------------------------------------------------- router */

let booted = false;

window.addEventListener("hashchange", () => { if (booted) render(); });

async function render() {
  if (!state.authed) return renderLogin();
  applyTheme();
  let page = location.hash.replace(/^#\//, "") || "dashboard";
  if (page.startsWith("supplier/")) return renderSupplier(page.split("/")[1]);
  if (page === "dashboard") return renderDashboard();
  if (page === "suppliers") return renderSuppliers();
  if (page === "imports") return renderImports();
  if (page === "meco") { renderMecoView(); return; }
  if (page === "ingenious") { renderIngeniousView(); return; }
  if (page === "trash") return renderTrash();
  if (page === "settings") return renderSettings();
  go("#/dashboard");
}

/* ---------------------------------------------------------------- login */

function renderLogin() {
  applyTheme();
  const dots = Object.keys(THEMES)
    .map((k) => `<button data-act="theme" data-theme="${k}"
        class="theme-dot ${state.theme === k ? "active" : ""}"
        style="background:linear-gradient(135deg, ${THEMES[k].c1}, ${THEMES[k].c2})"></button>`)
    .join("");
  const segButtons = [["fr", "FR"], ["en", "EN"]]
    .map(([k, l]) => `<button data-act="lang" data-lang="${k}" class="${state.lang === k ? "active" : ""}">${l}</button>`)
    .join("");
  document.getElementById("app").innerHTML = `
    <div class="login-wrap">
      <div class="login-card">
        <div class="login-logo">R</div>
        <h1>${esc(t("app_title"))}</h1>
        <div class="sub">${esc(t("app_sub"))}</div>
        <div class="toolbar" style="margin-bottom:12px">
          <div class="themes">${dots}</div>
          <div class="spacer"></div>
          <div class="seg">${segButtons}</div>
        </div>
        <div id="login-alert"></div>
        <form id="login-form">
          <div class="field">
            <label for="login-user">${esc(t("login_username"))}</label>
            <input class="input" id="login-user" type="text" autocomplete="username" autofocus>
          </div>
          <div class="field">
            <label for="login-pw">${esc(t("password"))}</label>
            <input class="input" id="login-pw" type="password" autocomplete="current-password">
          </div>
          <button class="btn block" id="login-btn" type="submit">${esc(t("login_btn"))}</button>
        </form>
        <div style="margin-top:18px;text-align:center;color:var(--muted);font-size:12px">${esc(t("app_sub"))} · ${new Date().getFullYear()}</div>
      </div>
    </div>`;
  document.getElementById("login-form").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const username = document.getElementById("login-user").value.trim();
    const pw = document.getElementById("login-pw").value;
    const btn = document.getElementById("login-btn");
    const alertBox = document.getElementById("login-alert");
    btn.disabled = true;
    alertBox.innerHTML = "";
    try {
      const r = await api("/api/login", "POST", { username, password: pw });
      state.user = (r && r.user) || null;
      state.authed = true;
      await loadBase();
      loadRates();
      go("#/dashboard");
    } catch (e) {
      const locked = /lock/i.test(e.message);
      alertBox.innerHTML = `<div class="alert err">${esc(locked ? t("err_locked") : t("err_invalid"))}</div>`;
    } finally {
      btn.disabled = false;
    }
  });
}

/* ---------------------------------------------------------------- data */

async function loadBase() {
  const [s, i] = await Promise.all([
    api("/api/suppliers"),
    api("/api/imports"),
  ]);
  state.suppliers = s.suppliers || [];
  state.imports = i.imports || [];
}

async function loadUsers() {
  const r = await api("/api/users");
  state.users = (r && r.users) || [];
}

let ratesRetry = 0;
async function loadRates() {
  try {
    const r = await api("/api/rates");
    state.rates = r && r.rates ? { rates: r.rates, updated_at: r.updated_at } : null;
  } catch (e) {
    state.rates = null;
  }
  paintRates();
  if (state.rates) {
    ratesRetry = 0;
  } else if (ratesRetry < 8) {
    ratesRetry += 1;
    setTimeout(loadRates, 45 * 1000);
  }
}

function fmtRate(v) {
  const n = Number(v);
  if (!isFinite(n)) return "—";
  return n.toLocaleString(state.lang === "fr" ? "fr-CA" : "en-CA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}

function ratesBox() {
  const r = state.rates;
  const rows = RATES_LIST.map((c) => {
    const v = r && r.rates[r] != null ? r.rates[c] : null;
    return `<div class="rate-row"><span>${esc(c)}</span><b>${v != null ? esc(fmtRate(v)) : "—"}</b></div>`;
  }).join("");
  const foot = r && r.updated_at
    ? `<div class="rate-foot">🕐 ${new Date(r.updated_at * 1000).toLocaleTimeString(state.lang === "fr" ? "fr-CA" : "en-CA", { hour: "2-digit", minute: "2-digit" })}</div>`
    : `<div class="rate-foot off">${esc(t("rates_unavailable"))}</div>`;
  return `<div class="rates-box" id="rates-widget">
    <div class="rates-h">${esc(t("rates_title"))}</div>
    ${rows}
    ${foot}
  </div>`;
}

function paintRates() {
  const box = document.getElementById("rates-widget");
  if (!box) return;
  const fresh = document.createElement("div");
  fresh.innerHTML = ratesBox();
  box.replaceWith(fresh.firstChild);
}

function supplierName(id) {
  const s = state.suppliers.find((x) => x.id === id);
  return s ? s.name : "—";
}

/* ---------------------------------------------------------------- dashboard */

function importState(row) {
  const d = row.eta ? daysUntil(row.eta) : null;
  const total = row._total || 0;
  const done = total > 0 ? (row._done || 0) >= total : false;
  if (d !== null && d <= 0) return done ? "delivered" : "customs";
  return "transit";
}

function stateCounts(rows) {
  const c = { transit: 0, customs: 0, delivered: 0 };
  for (const r of rows) c[importState(r)] += 1;
  return c;
}

function donutHTML(counts) {
  const total = counts.transit + counts.customs + counts.delivered;
  const colors = { transit: "var(--primary2)", customs: "var(--warn)", delivered: "var(--success)" };
  const order = ["transit", "customs", "delivered"];
  let bg = "var(--bg2)";
  if (total > 0) {
    const stops = [];
    let acc = 0;
    for (const k of order) {
      const share = (counts[k] / total) * 100;
      if (share > 0) {
        stops.push(`${colors[k]} ${acc.toFixed(2)}% ${(acc + share).toFixed(2)}%`);
        acc += share;
      }
    }
    bg = stops.length ? "conic-gradient(" + stops.join(", ") + ")" : "var(--bg2)";
  }
  return `<div class="donut" style="background:${bg}">
      <div class="donut-center">
        <div class="num">${total}</div>
        <div class="lbl">${esc(t("import_count"))}</div>
      </div>
    </div>
    <div class="legend">
      ${order.map((k) => `<div class="legend-item">
        <i style="background:${colors[k]}"></i>
        <span>${esc(t("state_" + k))}</span>
        <span class="n">${counts[k]}</span>
      </div>`).join("")}
    </div>`;
}

function refLabel(r) {
  return [r.po_number, r.inbsip].filter(Boolean).join(" / ") || r.destination || r.container || ("#" + r.id);
}

function buildAlerts() {
  const alerts = [];
  for (const r of state.imports) {
    const d = daysUntil(r.eta);
    if (d !== null && d < 0) {
      alerts.push({ level: "danger", id: r.id, msg: t("alert_overdue", { d: Math.abs(d) }) });
    } else if (!(r.doc_number || "").trim()) {
      alerts.push({ level: "warn", id: r.id, msg: t("alert_missing_docs") });
    } else if (d !== null && d >= 0 && d <= 7) {
      alerts.push({ level: "info", id: r.id, msg: t("alert_soon", { d }) });
    }
  }
  alerts.sort((a, b) => (a.level === "danger" ? 0 : 1) - (b.level === "danger" ? 0 : 1));
  return alerts;
}

function alertRowsHTML(alerts) {
  if (!alerts.length) return `<div class="empty">${esc(t("no_alerts"))}</div>`;
  return alerts.map((a) => `<div class="alert-row ${a.level}" data-act="open-import" data-id="${a.id}">
      <span class="ico"></span>
      <span class="txt">${esc(a.msg)}</span>
      <span class="ref">${esc(refLabel(state.imports.find((x) => x.id === a.id) || {}))}</span>
    </div>`).join("");
}

function upcomingFiltered() {
const q = (state.upSearch || "").trim().toLowerCase();
  const sup = state.upSup || "";
  const rows = state.imports
    .filter((i) => i.eta && daysUntil(i.eta) >= 0)
    .filter((i) => !sup || String(i.supplier_id) === sup)
    .filter((i) => matchesImport(i, q));
  const sorted = sortImports(rows);
  if (!state.upSearch && !state.upSup) return sorted.slice(0, 8);
  return sorted;
  if (!state.upSearch && !state.upSup) return rows.slice(0, 8);
  return rows;
}

async function renderDashboard() {
  const seq = ++dashRenderSeq;
  const st = await api("/api/stats");
  if (seq !== dashRenderSeq) return;
  const pct = st.checklist_total ? Math.round((st.checklist_done / st.checklist_total) * 100) : 0;
  const bySupplier = (st.by_supplier || []).slice().sort((a, b) => (b.tasks ? b.done / b.tasks : 0) - (a.tasks ? a.done / a.tasks : 0));

  const colBtn = (k) => {
    const on = !!state.collapsed[k];
    return `<button class="collapse-toggle" data-act="collapse" data-key="${k}" aria-expanded="${!on}" aria-label="${on ? esc(t("collapse_open")) : esc(t("collapse_close"))}" title="${on ? esc(t("collapse_open")) : esc(t("collapse_close"))}">${on ? "▾" : "▴"}</button>`;
  };
  const colPanel = (k) => `panel collapsible${state.collapsed[k] ? " collapsed" : ""}`;

  const upcoming = upcomingFiltered();
  const counts = stateCounts(state.imports);
  const alerts = buildAlerts();
  const supFilterVal = state.upSup || "";
  const supplierOptsUp = `<option value="">${esc(t("up_filter_supplier"))}</option>` +
    state.suppliers.map((s) =>
      `<option value="${s.id}" ${supFilterVal === String(s.id) ? "selected" : ""}>${esc(s.name)}</option>`).join("");

  const inner = `
    <h2 class="page-title">${esc(t("dashboard_title"))}</h2>
    <div class="stat-grid">
      <div class="stat-card"><div class="num">${st.active_imports}</div><div class="lbl">${esc(t("stat_active"))}</div></div>
      <div class="stat-card"><div class="num">${st.arrivals_7d}</div><div class="lbl">${esc(t("stat_arrivals"))}</div></div>
      <div class="stat-card"><div class="num">${pct}% <span style="font-size:14px">(${st.checklist_done}/${st.checklist_total})</span></div><div class="lbl">${esc(t("stat_checklist"))}</div></div>
      <div class="stat-card"><div class="num">${st.suppliers}</div><div class="lbl">${esc(t("stat_suppliers"))}</div></div>
    </div>
    <div class="${colPanel("visual")}">
      <div class="panel-h" data-act="collapse" data-key="visual">${esc(t("dash_visual"))} ${colBtn("visual")}</div>
      <div class="visual-grid">${donutHTML(counts)}</div>
    </div>
    <div class="${colPanel("alerts")}">
      <div class="panel-h" data-act="collapse" data-key="alerts">${esc(t("dash_alerts"))} <span class="badge ${alerts.length ? "progress" : "pending"}">${alerts.length}</span> ${colBtn("alerts")}</div>
      <div class="alerts-list">${alertRowsHTML(alerts)}</div>
    </div>
    <div class="${colPanel("progress")}">
      <div class="panel-h" data-act="collapse" data-key="progress">${esc(t("panel_progress"))} ${colBtn("progress")}</div>
      <div class="progress-track">
        ${bySupplier.map((b) => `<div class="progress-row">
          <div class="nm">${esc(b.name)}</div>
          <div class="bar"><i style="width:${b.tasks ? Math.round((b.done / b.tasks) * 100) : 0}%"></i></div>
          <span style="color:var(--muted);font-size:12.5px">${b.done}/${b.tasks} · ${b.imports} ${esc(t("imports"))}</span>
        </div>`).join("") || `<div class="empty">${esc(t("no_data"))}</div>`}
      </div>
    </div>
    <div class="panel">
      <div class="panel-h">${esc(t("panel_recent"))}
        <span class="spacer"></span>
        <div class="up-filters no-print">
          <div class="search-box"><input id="up-search" class="input" autocomplete="off" spellcheck="false" placeholder="${esc(t("up_search_ph"))}" value="${esc(state.upSearch)}"></div>
          <span class="search-count" id="up-search-count">${(state.upSearch || state.upSup) ? esc(t("results_n", { n: upcoming.length })) : ""}</span>
          <select id="up-filter-supplier" class="select" style="width:auto">${supplierOptsUp}</select>
          <button class="btn small ghost" data-act="export-xlsx">⬇ ${esc(t("export_xlsx"))}</button>
        </div>
      </div>
      <div class="table-wrap"><table class="tbl"><thead>${importTableHead(true)}</thead>
      <tbody>${importRows(upcoming, true)}</tbody></table></div>
    </div>`;
  document.getElementById("app").innerHTML = shell(t("nav_dashboard"), inner);
  document.getElementById("up-search").addEventListener("input", (e) => {
    state.upSearch = e.target.value;
    const caret = e.target.selectionStart ?? (e.target.value || "").length;
    const pageHash = location.hash || "#/dashboard";
    clearTimeout(upRenderTimer);
    upRenderTimer = setTimeout(async () => {
      if ((location.hash || "#/dashboard") !== pageHash) return;
      const stay = document.activeElement && document.activeElement.id === "up-search";
      await renderDashboard();
      refocus("up-search", stay ? caret : null);
    }, 150);
  });
  document.getElementById("up-filter-supplier").addEventListener("change", (e) => {
    state.upSup = e.target.value;
    renderDashboard();
  });
}

/* ---------------------------------------------------------------- suppliers */

async function renderSuppliers() {
  await loadBase();
  const cards = state.suppliers.map((s) => {
    const n = state.imports.filter((i) => i.supplier_id === s.id).length;
    return `<div class="supplier-card" data-act="open-supplier" data-id="${s.id}">
      <h3>${esc(s.name)}${s.code ? ` <span style="color:var(--muted);font-weight:600">· ${esc(s.code)}</span>` : ""}</h3>
      <div class="meta">${[s.city, s.country].filter(Boolean).join(", ") || "—"}</div>
      <div class="meta">${[s.contact, s.email].filter(Boolean).join(" · ") || "—"}</div>
      <div class="foot">
        <span class="badge done">${n} ${esc(t("imports"))}</span>
        <div class="action-row no-print">
          <button class="btn ghost small" data-act="edit-supplier" data-id="${s.id}">${esc(t("edit"))}</button>
          <button class="btn danger small" data-act="del-supplier" data-id="${s.id}">${esc(t("delete"))}</button>
        </div>
      </div>
    </div>`;
  }).join("");

  const inner = `
    <div class="toolbar">
      <h2 class="page-title" style="margin:0">${esc(t("suppliers_title"))}</h2>
      <div class="spacer"></div>
      <button class="btn" data-act="new-supplier">＋ ${esc(t("new_supplier"))}</button>
    </div>
    ${cards ? `<div class="supplier-grid">${cards}</div>` : `<div class="panel"><div class="empty">${esc(t("no_suppliers"))}</div></div>`}`;
  document.getElementById("app").innerHTML = shell(t("nav_suppliers"), inner);
}

function openSupplierModal(sup) {
  const isNew = !sup;
  const s = sup || { name: "", code: "", city: "", country: "", contact: "", email: "", notes: "" };
  const m = openModal(`
    <div class="modal-h">${esc(isNew ? t("new_supplier") : t("edit_supplier"))}</div>
    <form class="modal-b" id="sup-form">
      <div class="form-grid">
        <div class="full"><div class="field"><label>${esc(t("supplier_name"))} *</label>
          <input class="input" name="name" value="${esc(s.name)}" required></div></div>
        <div class="field"><label>${esc(t("code"))}</label><input class="input" name="code" value="${esc(s.code)}"></div>
        <div class="field"><label>${esc(t("city"))}</label><input class="input" name="city" value="${esc(s.city)}"></div>
        <div class="field"><label>${esc(t("country"))}</label><input class="input" name="country" value="${esc(s.country)}"></div>
        <div class="field"><label>${esc(t("contact"))}</label><input class="input" name="contact" value="${esc(s.contact)}"></div>
        <div class="full"><div class="field"><label>${esc(t("email"))}</label><input class="input" name="email" type="email" value="${esc(s.email)}"></div></div>
        <div class="full"><div class="field"><label>${esc(t("notes"))}</label><textarea class="textarea" rows="2" name="notes">${esc(s.notes)}</textarea></div></div>
      </div>
    </form>
    <div class="modal-f">
      <button class="btn ghost" data-act="close-modal">${esc(t("cancel"))}</button>
      <button class="btn" data-act="save-supplier" data-id="${s.id || ""}">${esc(t("save"))}</button>
    </div>`);
  m.querySelector('[data-act="save-supplier"]').addEventListener("click", async () => {
    const form = m.querySelector("#sup-form");
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    if (!payload.name.trim()) return toast(t("required"));
    try {
      if (isNew) await api("/api/suppliers", "POST", payload);
      else await api("/api/suppliers/" + s.id, "PUT", payload);
      toast(t("save_ok"));
      closeModal();
      await loadBase();
      render();
    } catch (e) {
      toast(t("save_err", { msg: e.message }));
    }
  });
}

/* ---------------------------------------------------------------- supplier detail */

async function renderSupplier(id) {
  const sup = state.suppliers.find((x) => x.id === Number(id));
  if (!sup) return go("#/suppliers");
  const rows = state.imports.filter((i) => i.supplier_id === Number(id));
  const inner = `
    <div class="toolbar">
      <button class="btn ghost" data-act="nav" data-nav="suppliers">← ${esc(t("back"))}</button>
      <h2 class="page-title" style="margin:0">${esc(sup.name)} ${sup.code ? `<span style="color:var(--muted);font-size:14px">· ${esc(sup.code)}</span>` : ""}</h2>
      <div class="spacer"></div>
      <button class="btn ghost small" data-act="edit-supplier" data-id="${sup.id}">${esc(t("edit_supplier"))}</button>
      <button class="btn danger small" data-act="del-supplier" data-id="${sup.id}">${esc(t("delete_supplier"))}</button>
    </div>
    ${sup.city || sup.country || sup.contact || sup.email ? `<div style="color:var(--muted);margin-bottom:18px">
      ${[sup.city, sup.country].filter(Boolean).join(", ")}${sup.contact ? " · " + esc(sup.contact) : ""}${sup.email ? " · " + esc(sup.email) : ""}
    </div>` : ""}
    ${sup.notes ? `<div style="color:var(--muted);margin-bottom:18px">${esc(sup.notes)}</div>` : ""}
    <div class="toolbar">
      <h3 style="color:var(--primary)">${esc(t("card_title"))} <span style="color:var(--muted);font-weight:600">(${rows.length})</span></h3>
      <div class="spacer"></div>
      <button class="btn" data-act="new-import" data-sid="${sup.id}">＋ ${esc(t("new_card"))}</button>
    </div>
    <div class="panel">
      <div class="table-wrap"><table class="tbl"><thead>${importTableHead(false)}</thead>
      <tbody>${importRows(rows, false)}</tbody></table></div>
    </div>`;
  document.getElementById("app").innerHTML = shell(t("profile_title") + " · " + sup.name, inner);
}

/* ---------------------------------------------------------------- imports view */

async function renderImports() {
  const supFilter = state.supFilter || "";
  const search = state.search || "";
  let rows = state.imports;
  if (supFilter) rows = rows.filter((i) => i.supplier_id === Number(supFilter));
  if (search) rows = rows.filter((i) => matchesImport(i, search));
  rows = sortImports(rows);
  const filterActive = !!(search || supFilter);
  const inner = `
    <div class="toolbar">
      <h2 class="page-title" style="margin:0">${esc(t("imports_title"))}</h2>
      <div class="spacer"></div>
      <div class="search-box grow"><input class="input" id="search-imports" autocomplete="off" spellcheck="false" value="${esc(search)}" placeholder="${esc(t("search"))}"></div>
      <span class="search-count" id="search-count">${filterActive ? esc(t("results_n", { n: rows.length })) : ""}</span>
      <select class="select" id="filter-supplier" style="width:auto">
        <option value="">${esc(t("all_suppliers"))}</option>
        ${state.suppliers.map((s) => `<option value="${s.id}" ${supFilter === String(s.id) ? "selected" : ""}>${esc(s.name)}</option>`).join("")}
      </select>
      <button class="btn" data-act="new-import-global">＋ ${esc(t("new_card"))}</button>
    </div>
    <div class="panel">
      <div class="table-wrap"><table class="tbl"><thead>${importTableHead(true)}</thead>
      <tbody>${importRows(rows, true)}</tbody></table></div>
    </div>`;
  document.getElementById("app").innerHTML = shell(t("nav_imports"), inner);
  document.getElementById("search-imports").addEventListener("input", (e) => {
    state.search = e.target.value;
    const caret = e.target.selectionStart ?? (e.target.value || "").length;
    const pageHash = location.hash || "#/imports";
    clearTimeout(importsRenderTimer);
    importsRenderTimer = setTimeout(async () => {
      if ((location.hash || "#/imports") !== pageHash) return;
      const stay = document.activeElement && document.activeElement.id === "search-imports";
      await renderImports();
      refocus("search-imports", stay ? caret : null);
    }, 120);
  });
  document.getElementById("filter-supplier").addEventListener("change", (e) => {
    state.supFilter = e.target.value;
    renderImports();
  });
}

/* ---------------------------------------------------------------- trash */

function trashTableHead() {
  return `<tr>
    <th>${esc(t("supplier"))}</th>
    <th>${esc(t("field_destination"))}</th>
    <th>${esc(t("field_po"))}</th>
    <th>${esc(t("field_container"))}</th>
    <th>${esc(t("actions"))}</th>
  </tr>`;
}

function trashRows(rows) {
  if (!rows.length) return `<tr><td colspan="5" class="empty">${esc(t("trash_empty"))}</td></tr>`;
  return rows.map((r) => `<tr>
    <td>${esc(r.supplier_name)}</td>
    <td>${esc(r.destination)}</td>
    <td>${[r.po_number, r.inbsip].filter(Boolean).join(" / ") || ""}</td>
    <td>${esc(r.container)}</td>
    <td>
      <button class="btn small" data-act="restore-card" data-id="${r.id}">${esc(t("restore"))}</button>
      <button class="btn danger small" data-act="del-permanent" data-id="${r.id}">${esc(t("delete_permanent"))}</button>
    </td>
  </tr>`).join("");
}

async function renderTrash() {
  const res = await api("/api/imports?deleted=1");
  const rows = res.imports || [];
  const inner = `
    <div class="toolbar">
      <h2 class="page-title" style="margin:0">${esc(t("trash_title"))}</h2>
    </div>
    <div class="panel">
      <div class="table-wrap"><table class="tbl"><thead>${trashTableHead()}</thead>
      <tbody>${trashRows(rows)}</tbody></table></div>
    </div>`;
  document.getElementById("app").innerHTML = shell(t("nav_trash"), inner);
}

/* ---------------------------------------------------------------- meco view */

const MECO_VIEW_ORDER = [
  "meco_qc",
  "meco_verified",
  "meco_update_eta_ns",
  "meco_calendar",
  "meco_customs",
  "meco_packing",
  "meco_invoice",
  "meco_bol_bourassa",
];

const MECO_VIEW_TASK_INFO = {
  meco_qc: { fr: "QC-SAMPLING", en: "QC-SAMPLING", tip: "meco_view_qc" },
  meco_verified: { fr: "Vérifié et Enregistré (Dropbox/Outlook)", en: "Verified and Registered (Dropbox/Outlook)", tip: "meco_verified_tip" },
  meco_update_eta_ns: { fr: "Mettre à jour ETA dans NS", en: "Update ETA in NS", tip: "meco_update_eta_ns_tip" },
  meco_calendar: { fr: "Ajout au calendrier", en: "Add to calendar", tip: "meco_view_calendar" },
  meco_customs: { fr: "Douanes", en: "Customs", tip: "meco_customs_tip" },
  meco_packing: { fr: "Packing Slip / Entrepôt", en: "Packing Slip / Warehouse", tip: "meco_view_packing" },
  meco_invoice: { fr: "Conciliation facture commerciale", en: "Commercial invoice reconciliation", tip: "meco_view_reconcile" },
  meco_bol_bourassa: { fr: "BOL Bourassa", en: "BOL Bourassa", tip: "meco_bol_bourassa_tip" },
};

function renderMecoView() {
  const meco = (state.suppliers || []).find((s) => String(s.name || "").trim().toUpperCase() === "MECO");
  const rows = MECO_VIEW_ORDER.map((k, i) => {
    const info = MECO_VIEW_TASK_INFO[k];
    const label = info.fr;
    return `<tr>
      <td class="meco-task-name">${esc(label)}</td>
      <td class="meco-status"><input type="checkbox" data-tidx="${i}" data-k="status"></td>
      <td class="meco-comments">
        <div class="meco-link-row" role="group" aria-label="${esc(t("meco_link_tip"))}">
          <a href="#" class="meco-view-link" data-tidx="${i}" data-k="${k}" title="${esc(t("meco_link_tip"))}">🔗 <span class="meco-link-flag" data-link-flag="${i}"></span></a>
        </div>
        <input class="input" data-tidx="${i}" data-k="comments" placeholder="${esc(t("meco_col_commentaires"))}">
      </td>
    </tr>`;
  }).join("");

  const inner = `
    <div class="toolbar">
      <h2 class="page-title" style="margin:0">${esc(t("meco_view_title"))}</h2>
      <div class="spacer"></div>
      <button class="btn small" data-act="meco-new">${esc(t("meco_new"))}</button>
      <button class="btn small primary" data-act="meco-save">💾 ${esc(t("save"))}</button>
    </div>
    <div class="card meco-view" id="meco-view-app">
      <form id="meco-view-form">
        <div class="form-grid">
          <div class="field"><label>${esc(t("meco_destination"))}</label><input class="input" name="destination"></div>
          <div class="field"><label>${esc(t("meco_po_nr"))}</label><input class="input" name="po_number"></div>
          <div class="field"><label>${esc(t("meco_inbship_nr"))}</label><input class="input" name="inbsip"></div>
          <div class="field"><label>${esc(t("meco_doc"))}</label><input class="input" name="doc_number"></div>
          <div class="field"><label>${esc(t("meco_nb_plts"))}</label><input class="input" name="pallets" type="number" min="0"></div>
          <div class="field"><label>${esc(t("meco_transitaire"))}</label><input class="input" name="transitaire_bol"></div>
          <div class="field"><label>${esc(t("meco_container"))}</label><input class="input" name="container"></div>
          <div class="field"><label>${esc(t("field_etd"))}</label><input class="input" type="date" name="etd"></div>
          <div class="field"><label>${esc(t("meco_eta_van"))}</label><input class="input" type="date" name="eta_van"></div>
          <div class="field"><label>${esc(t("meco_eta_dest"))}</label><input class="input" type="date" name="eta_dest"></div>
          <div class="field"><label>${esc(t("meco_qc_label"))}</label>
            <div class="meco-qc-row">
              <label class="meco-onrail"><input type="checkbox" name="qc_sampling_qc"> ${esc(t("meco_qc_qc"))}</label>
              <label class="meco-onrail"><input type="checkbox" name="qc_sampling_reception"> ${esc(t("meco_qc_reception"))}</label>
            </div>
          </div>
          <div class="field"><label>${esc(t("meco_onrail"))}</label>
            <div class="meco-qc-row">
              <span class="meco-rail"><input type="checkbox" name="on_rail"> ON RAIL</span>
              <label class="meco-rail-eta">${esc(t("meco_eta_suffix"))}<input class="input" name="eta_note" placeholder="YYYY-MM-DD"></label>
            </div>
          </div>
        </div>
      </form>
      <div class="section-tag sec-gap">${esc(t("meco_col_tache"))}</div>
      <div class="table-wrap"><table class="tbl meco-view-table">
        <thead><tr>
          <th>${esc(t("meco_col_tache"))}</th>
          <th>${esc(t("meco_col_statut"))}</th>
          <th>${esc(t("meco_col_commentaires"))}</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>`;

  document.getElementById("app").innerHTML = shell(t("nav_meco"), inner);

  wireViewDraft("#meco-view-form", {
    draftKey: "mecoDraft",
    saveBtn: '[data-act="meco-save"]',
    newBtn: '[data-act="meco-new"]',
    onSave: saveMecoView,
    onNew: () => {
      if (!confirm(t("meco_reset_confirm"))) return;
      document.querySelectorAll(".meco-view-table input").forEach((i) => {
        if (i.type === "checkbox") i.checked = false; else i.value = "";
      });
      state.mecoDraft = null;
      persistMecoViewDraft();
      toast(t("meco_new_ok"));
    },
    onPersist: persistMecoViewDraft,
    onLoad: loadMecoViewDraft,
  });
}

/* ---------------------------------------------------------------- view draft */

function wireViewDraft(sel, cfg = {}) {
  const form = sampleEl(sel);
  if (!form) return;
  form.addEventListener("submit", (e) => e.preventDefault());
  form.addEventListener("input", () => cfg.onPersist && cfg.onPersist());
  form.addEventListener("change", (e) => {
    if (e.target.matches("[name], .meco-view-table input")) cfg.onPersist && cfg.onPersist();
  });
  const save = sampleEl(cfg.saveBtn);
  if (save && cfg.onSave) save.addEventListener("click", cfg.onSave);
  const nw = sampleEl(cfg.newBtn);
  if (nw && cfg.onNew) nw.addEventListener("click", cfg.onNew);
  if (cfg.onLoad) cfg.onLoad(form);
}

/* ---------------------------------------------------------------- settings */

async function renderSettings() {
  const dots = Object.keys(THEMES)
    .map((k) => `<button data-act="theme" data-theme="${k}"
        class="theme-dot ${state.theme === k ? "active" : ""}"
        title="${t("themes")[k]}"
        style="background:linear-gradient(135deg, ${THEMES[k].c1}, ${THEMES[k].c2})"></button>`)
    .join("");
  let usersPanel = "";
  if (state.user && state.user.role === "admin") {
    await loadUsers();
    const us = state.users || [];
    usersPanel = `
    <div class="panel">
      <div class="panel-h">${esc(t("sec_users"))}</div>
      <div style="padding:18px">
        <div class="table-wrap">
          <table class="tbl">
            <thead><tr>
              <th>${esc(t("user_username"))}</th>
              <th>${esc(t("user_display"))}</th>
              <th>${esc(t("user_role"))}</th>
              <th>${esc(t("actions_col"))}</th>
            </tr></thead>
            <tbody>
              ${us.length ? us.map((u) => {
                const isSelf = u.id === state.user.id;
                return `<tr>
                  <td>${esc(u.username)}${isSelf ? ` <span class="badge done">${esc(t("user_me"))}</span>` : ""}</td>
                  <td>${esc(u.display_name || "—")}</td>
                  <td><select class="select user-role" data-uid="${u.id}" ${isSelf ? "disabled" : ""}>${["admin", "user"].map((rl) => `<option value="${rl}" ${u.role === rl ? "selected" : ""}>${esc(t("role_" + rl))}</option>`).join("")}</select></td>
                  <td><div class="row-actions">
                    <button class="btn small ghost" data-act="user-reset" data-uid="${u.id}">${esc(t("user_reset_pw"))}</button>
                    <button class="btn small danger" data-act="user-del" data-uid="${u.id}" ${isSelf ? "disabled" : ""}>${esc(t("user_delete"))}</button>
                  </div></td>
                </tr>`;
              }).join("") : `<tr><td colspan="4" class="empty">${esc(t("user_no_users"))}</td></tr>`}
            </tbody>
          </table>
        </div>
        <form id="user-add" class="user-add" style="margin-top:16px;max-width:820px">
          <div class="field"><label>${esc(t("user_username"))} *</label><input class="input" name="username" autocomplete="off" spellcheck="false"></div>
          <div class="field"><label>${esc(t("user_display"))}</label><input class="input" name="display_name" autocomplete="off"></div>
          <div class="field"><label>${esc(t("user_password"))} *</label><input class="input" type="password" name="password" autocomplete="new-password"></div>
          <div class="field"><label>${esc(t("user_role"))}</label><select class="select" name="role">
            <option value="user">${esc(t("role_user"))}</option>
            <option value="admin">${esc(t("role_admin"))}</option>
          </select></div>
          <div id="user-add-alert"></div>
          <button class="btn" type="submit">${esc(t("user_add_btn"))}</button>
        </form>
      </div>
    </div>`;
  }
  const inner = `
    <h2 class="page-title">${esc(t("settings_title"))}</h2>
    <div class="panel">
      <div class="panel-h">${esc(t("sec_theme"))}</div>
      <div style="padding:18px"><div class="themes" style="gap:12px">${dots}</div></div>
    </div>
    <div class="panel">
      <div class="panel-h">${esc(t("sec_language"))}</div>
      <div style="padding:18px"><div class="seg">
        <button data-act="lang" data-lang="fr" class="${state.lang === "fr" ? "active" : ""}">Français</button>
        <button data-act="lang" data-lang="en" class="${state.lang === "en" ? "active" : ""}">English</button>
      </div></div>
    </div>
    <div class="panel">
      <div class="panel-h">${esc(t("sec_security"))}</div>
      <form id="pw-form" style="padding:18px;max-width:460px">
        <div class="field"><label>${esc(t("current_password"))}</label><input class="input" type="password" name="current" autocomplete="current-password"></div>
        <div class="field"><label>${esc(t("new_password"))}</label><input class="input" type="password" name="newpw" autocomplete="new-password"></div>
        <div class="field"><label>${esc(t("confirm_password"))}</label><input class="input" type="password" name="confirm" autocomplete="new-password"></div>
        <div id="pw-alert"></div>
        <button class="btn" type="submit">${esc(t("change_password"))}</button>
      </form>
    </div>${usersPanel}`;
  document.getElementById("app").innerHTML = shell(t("nav_settings"), inner);
  document.getElementById("pw-form").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    const alertBox = document.getElementById("pw-alert");
    alertBox.innerHTML = "";
    const newpw = fd.get("newpw"), confirm = fd.get("confirm");
    if (newpw.length < 6) return (alertBox.innerHTML = `<div class="alert err">${esc(t("password_weak"))}</div>`);
    if (newpw !== confirm) return (alertBox.innerHTML = `<div class="alert err">${esc(t("password_mismatch"))}</div>`);
    try {
      await api("/api/password", "POST", { current: fd.get("current"), new: newpw });
      ev.target.reset();
      toast(t("password_changed"));
    } catch (e) {
      alertBox.innerHTML = `<div class="alert err">${esc(t("password_wrong_current"))}</div>`;
    }
  });
  const ua = document.getElementById("user-add");
  if (ua) ua.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    const alertBox = document.getElementById("user-add-alert");
    alertBox.innerHTML = "";
    const username = (fd.get("username") || "").trim();
    const pw = fd.get("password") || "";
    if (!/^[A-Za-z0-9_-]{3,}$/.test(username)) {
      alertBox.innerHTML = `<div class="alert err">${esc(t("user_bad_username"))}</div>`;
      return;
    }
    if (pw.length < 6) {
      alertBox.innerHTML = `<div class="alert err">${esc(t("password_weak"))}</div>`;
      return;
    }
    try {
      await api("/api/users", "POST", {
        username, password: pw,
        display_name: (fd.get("display_name") || "").trim(),
        role: fd.get("role") || "user",
      });
      ev.target.reset();
      toast(t("save_user_ok"));
      await renderSettings();
    } catch (e) {
      alertBox.innerHTML = `<div class="alert err">${esc(e.message === "username exists" ? t("user_exists") : t("err_forbidden"))}</div>`;
    }
  });
  document.querySelectorAll(".user-role").forEach((sel) => {
    sel.addEventListener("change", async () => {
      try {
        await api("/api/users/" + sel.dataset.uid, "PUT", { role: sel.value });
        toast(t("save_ok"));
        await renderSettings();
      } catch (e) {
        toast(e.message === "last admin" ? t("user_last_admin") : t("err_forbidden"));
        await renderSettings();
      }
    });
  });
}

/* ---------------------------------------------------------------- import modal + checklist */

async function openImportModal(row) {
  const isNew = !row || !row.id;
  await ensureTemplate();
  if (isNew) {
    state.clChecklist = [];
  }
  const r = row || { supplier_id: state.tmpSupplierId || null, origin: "", port_of_loading: "", destination: "", port_of_discharge: "", po_number: "", inbsip: "", doc_number: "", pallets: "", transitaire_bol: "", container: "", etd: "", eta: "", eta_van: "", eta_dest: "", qc_sampling_qc: 0, qc_sampling_reception: 0, notes: "", supplier_name: "" };
  let addInfoList = [];
  if (r.add_info) {
    try { addInfoList = JSON.parse(r.add_info); } catch (e) { addInfoList = []; }
    if (!Array.isArray(addInfoList)) addInfoList = [];
  }
  state.addInfo = addInfoList;
  const mecoTasks = buildMecoTasks(isNew ? [] : state.clChecklist || []);
  state.mecoTasks = mecoTasks;
  const supplierOptions = state.suppliers.map((s) => `<option value="${s.id}" ${s.id === r.supplier_id ? "selected" : ""}>${esc(s.name)}</option>`).join("");
  const addInfoOptions = AI_KEYS.map((k) =>
    `<option value="${k}">${esc(t("ai_" + k))}</option>`).join("");
  const m = openModal(`
    <div class="modal-h">
      <span class="modal-h-title">${esc(isNew ? t("new_card") : t("edit_card"))}${r.serial ? `<span class="serial-tag">${esc(r.serial)}</span>` : ""}</span>
      <button type="button" class="icon-btn no-print" id="print-card-btn" title="${esc(t("print_card"))}">🖨</button>
    </div>
    <div class="modal-b">
      <form id="card-form">
        <div class="section-tag">${esc(t("meco_fields"))}</div>
        <div class="form-grid">
          <div class="full"><div class="field"><label>${esc(t("supplier"))} *</label>
            <select class="select" name="supplier_id" id="card-supplier">
              <option value="">—</option>${supplierOptions}
            </select></div></div>
        </div>
        <div id="meco-block" hidden>
          <div class="section-tag sec-gap">${esc(t("meco_form_title"))}</div>
          <div class="form-grid">
            <div class="field"><label>${esc(t("meco_destination"))}</label><input class="input" name="destination" value="${esc(r.destination || "")}"></div>
            <div class="field"><label>${esc(t("meco_po"))}</label><input class="input" name="po_number" value="${esc(r.po_number || "")}"></div>
            <div class="field"><label>${esc(t("meco_doc"))}</label><input class="input" name="doc_number" value="${esc(r.doc_number || "")}"></div>
            <div class="field"><label>${esc(t("meco_nb_plts"))}</label><input class="input" name="pallets" type="number" min="0" value="${r.pallets == null ? "" : esc(r.pallets)}"></div>
            <div class="field"><label>${esc(t("field_bol"))}</label><input class="input" name="transitaire_bol" value="${esc(r.transitaire_bol || "")}"></div>
            <div class="field"><label>${esc(t("field_container"))}</label><input class="input" name="container" value="${esc(r.container || "")}"></div>
            <div class="field"><label>${esc(t("field_etd"))}</label><input class="input" name="etd" type="date" value="${esc(r.etd || "")}"></div>
            <div class="field"><label>${esc(t("meco_eta_van"))}</label><input class="input" name="eta_van" type="date" value="${esc(r.eta_van || "")}"></div>
            <div class="field"><label>${esc(t("meco_eta_dest"))}</label><input class="input" name="eta_dest" type="date" value="${esc(r.eta_dest || "")}"></div>
            <div class="field"><label>${esc(t("meco_qc_label"))}</label>
              <label class="meco-qc"><input type="checkbox" name="qc_sampling_qc" ${r.qc_sampling_qc ? "checked" : ""}> ${esc(t("meco_qc_qc"))}</label>
              <label class="meco-qc"><input type="checkbox" name="qc_sampling_reception" ${r.qc_sampling_reception ? "checked" : ""}> ${esc(t("meco_qc_reception"))}</label>
            </div>
          </div>
          <div class="section-tag sec-gap">${esc(t("meco_tasks_title"))}</div>
          ${mecoTasksHTML(mecoTasks)}
        </div>
        <div class="section-tag sec-gap">${esc(t("section_import_details"))}</div>
        <div class="form-grid" id="generic-fields">
          <div class="field"><label>${esc(t("field_origin"))}</label><input class="input" name="origin" value="${esc(r.origin)}"></div>
          <div class="field"><label>${esc(t("field_port_loading"))}</label><input class="input" name="port_of_loading" value="${esc(r.port_of_loading)}"></div>
          <div class="field" data-core="1"><label>${esc(t("field_destination"))}</label><select class="select" name="destination">${dropdownFieldOptions(r.destination || "", DEST_OPTIONS)}</select></div>
          <div class="field"><label>${esc(t("field_port_discharge"))}</label><select class="select" name="port_of_discharge">${dropdownFieldOptions(r.port_of_discharge || "", DISCHARGE_OPTIONS)}</select></div>
          <div class="field" data-core="1"><label>${esc(t("field_po_number"))}</label><input class="input" name="po_number" value="${esc(r.po_number)}"></div>
          <div class="field" data-core="1"><label>${esc(t("field_inbsip"))}</label><input class="input" name="inbsip" value="${esc(r.inbsip)}"></div>
          <div class="field" data-core="1"><label>${esc(t("field_doc"))}</label><input class="input" name="doc_number" value="${esc(r.doc_number)}"></div>
          <div class="field" data-core="1"><label>${esc(t("field_pallets"))}</label><input class="input" name="pallets" type="number" min="0" value="${r.pallets == null ? "" : esc(r.pallets)}"></div>
          <div class="field" data-core="1"><label>${esc(t("field_bol"))}</label><input class="input" name="transitaire_bol" value="${esc(r.transitaire_bol)}"></div>
          <div class="field" data-core="1"><label>${esc(t("field_container"))}</label><input class="input" name="container" value="${esc(r.container)}"></div>
          <div class="field" data-core="1"><label>${esc(t("field_etd"))}</label><input class="input" name="etd" type="date" value="${esc(r.etd || "")}"></div>
          <div class="field" data-core="1"><label>${esc(t("field_eta"))}</label><input class="input" name="eta" type="date" value="${esc(r.eta || "")}"></div>
          <div class="full"><div class="field"><label>${esc(t("extra_title"))}</label>
            <select class="select" id="add-info-type">
              <option value="">${esc(t("extra_placeholder"))}</option>${addInfoOptions}
            </select></div></div>
          <div class="full" id="add-info-fields"></div>
          <div class="full"><div class="field"><label>${esc(t("field_notes"))}</label><textarea class="textarea" rows="2" name="notes">${esc(r.notes)}</textarea></div></div>
        </div>
        <div class="section-tag sec-gap" id="generic-cl-head">${esc(t("checklist_of"))}</div>
        <div id="generic-checklist"><div id="cl-area">${checklistEditorHTML(state.clChecklist || [])}</div></div>
      </form>
    </div>
    <div class="modal-f">
      ${r.id ? `<button class="btn danger" data-act="delete-card" data-id="${r.id}">🗑 ${esc(t("delete_card"))}</button><div class="spacer"></div>` : ""}
      <button class="btn ghost" data-act="close-modal">${esc(t("cancel"))}</button>
      <button class="btn" data-act="save-card" data-id="${r.id || ""}" data-new="${isNew ? "1" : ""}">${esc(t("save"))}</button>
    </div>`);

  setupChecklistEditor(m);
  setupExtraInfo(m);
  setupMecoEditor(m);
  applyMecoMode(m);
  const supSel = m.querySelector("#card-supplier");
  if (supSel) supSel.addEventListener("change", () => applyMecoMode(m));

  const printBtn = m.querySelector("#print-card-btn");
  if (printBtn) printBtn.addEventListener("click", () => window.print());

  m.querySelector('[data-act="save-card"]').addEventListener("click", async () => {
    const form = m.querySelector("#card-form");
    const fd = new FormData(form);
    const payload = {};
    for (const [k, v] of fd.entries()) payload[k] = v;
    payload.add_info = JSON.stringify(state.addInfo || []);
    if (state.mecoMode) {
      payload.eta = payload.eta_van || payload.eta_dest || "";
      payload.qc_sampling_qc = payload.qc_sampling_qc ? 1 : 0;
      payload.qc_sampling_reception = payload.qc_sampling_reception ? 1 : 0;
    }
    if (!payload.supplier_id) return toast(t("required"));
    if (payload.pallets === "") payload.pallets = null;
    else payload.pallets = Number(payload.pallets);
    const pendingItems = state.mecoMode
      ? mecoChecklistItems()
      : (state.clChecklist || []).map((it) => ({
          task_key: it.task_key || "",
          task_label_fr: it.task_label_fr || "",
          task_label_en: it.task_label_en || "",
          status: it.status,
          notes: it.notes || "",
          link: it.link || "",
          position: it.position,
        }));
    try {
      if (isNew) {
        const res = await api("/api/imports", "POST", payload);
        if (pendingItems.length) await api("/api/imports/" + res.id + "/checklist", "PUT", { items: pendingItems });
      } else {
        await api("/api/imports/" + r.id, "PUT", payload);
        if (pendingItems.length) await api("/api/imports/" + r.id + "/checklist", "PUT", { items: pendingItems });
      }
      toast(t("save_ok"));
      closeModal();
      delete state.clChecklist;
      delete state.mecoTasks;
      delete state.mecoMode;
      delete state.tmpSupplierId;
      await loadBase();
      render();
    } catch (e) {
      toast(t("save_err", { msg: e.message }));
    }
  });

  const delBtn = m.querySelector('[data-act="delete-card"]');
  if (delBtn) delBtn.addEventListener("click", async () => {
    if (!confirm(t("confirm_trash_card"))) return;
    try {
      await api("/api/imports/" + r.id + "/trash", "PUT", {});
      toast(t("deleted_ok"));
      closeModal();
      await loadBase();
      render();
    } catch (e) {
      toast(t("save_err", { msg: e.message }));
    }
  });

  const saver = m.querySelector("#card-form");
  if (saver) saver.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.tagName === "INPUT" && !e.target.type.includes("date") && !e.target.matches("[data-act]")) {
      e.preventDefault();
    }
  });
}

function buildMecoTasks(cl) {
  return MECO_TASKS.map((mt) => {
    const item = (cl || []).find((c) => c.task_key === mt.key);
    let meta = {};
    if (item && item.meta) {
      try { meta = JSON.parse(item.meta); } catch (e) { meta = {}; }
    }
    return {
      key: mt.key,
      fr: mt.fr,
      en: mt.en,
      done: item ? item.status === "done" : false,
      comments: item ? (item.notes || "") : "",
      onRail: !!(meta.on_rail),
      etaNote: meta.eta_note || "",
    };
  });
}

function mecoTasksHTML(tasks) {
  const rows = tasks.map((tk, i) => {
    const lbl = state.lang === "fr" ? tk.fr : tk.en;
    const sub = i === 0 ? `
      <div class="meco-subrow">
        <label class="meco-onrail"><input type="checkbox" data-k="onrail" data-tidx="0" ${tk.onRail ? "checked" : ""}> ${esc(t("meco_onrail"))}</label>
        <span class="meco-fixed-label">${esc(t("meco_eta_suffix"))}</span>
        <input class="input" data-k="etanote" data-tidx="0" value="${esc(tk.etaNote || "")}" placeholder="YYYY-MM-DD">
      </div>` : "";
    return `<tr>
      <td class="meco-task-name">${esc(lbl)}</td>
      <td class="meco-status"><input type="checkbox" data-k="status" data-tidx="${i}" ${tk.done ? "checked" : ""}></td>
      <td class="meco-comments"><input class="input" data-k="comments" data-tidx="${i}" value="${esc(tk.comments || "")}" placeholder="${esc(t("cl_comments_placeholder"))}">${sub}</td>
    </tr>`;
  }).join("");
  return `<table class="meco-table">
    <thead><tr><th>${esc(t("meco_col_tache"))}</th><th>${esc(t("meco_col_statut"))}</th><th>${esc(t("meco_col_commentaires"))}</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function mecoChecklistItems() {
  const meco = (state.mecoTasks || []).map((tk, i) => ({
    task_key: tk.key,
    task_label_fr: tk.fr,
    task_label_en: tk.en,
    status: tk.done ? "done" : "pending",
    notes: tk.comments || "",
    link: "",
    meta: JSON.stringify({ on_rail: !!tk.onRail, eta_note: tk.etaNote || "" }),
    position: i,
  }));
  const legacy = (state.clChecklist || [])
    .filter((it) => !MECO_TASKS.some((mt) => mt.key === it.task_key))
    .map((it, i) => ({
      task_key: it.task_key || "",
      task_label_fr: it.task_label_fr || "",
      task_label_en: it.task_label_en || "",
      status: it.status,
      notes: it.notes || "",
      link: it.link || "",
      position: meco.length + i,
    }));
  return [...meco, ...legacy];
}

function setupMecoEditor(m) {
  const block = m.querySelector("#meco-block");
  if (!block) return;
  block.addEventListener("change", (e) => {
    const el = e.target;
    const idx = Number(el.dataset.tidx);
    if (isNaN(idx) || !state.mecoTasks[idx]) return;
    if (el.dataset.k === "status") state.mecoTasks[idx].done = el.checked;
    else if (el.dataset.k === "onrail") state.mecoTasks[idx].onRail = el.checked;
  });
  block.addEventListener("input", (e) => {
    const el = e.target;
    const idx = Number(el.dataset.tidx);
    if (isNaN(idx) || !state.mecoTasks[idx]) return;
    if (el.dataset.k === "comments") state.mecoTasks[idx].comments = el.value;
    else if (el.dataset.k === "etanote") state.mecoTasks[idx].etaNote = el.value;
  });
}

function applyMecoMode(m) {
  const sel = m.querySelector("#card-supplier");
  const opt = sel && sel.selectedOptions && sel.selectedOptions[0];
  const isM = !!(opt && opt.textContent.trim().toUpperCase() === MECO_SUPPLIER);
  const block = m.querySelector("#meco-block");
  const gen = m.querySelectorAll("#generic-fields [data-core]");
  const cl = m.querySelector("#generic-checklist");
  const head = m.querySelector("#generic-cl-head");
  if (block) {
    block.hidden = !isM;
    block.querySelectorAll("input,select,textarea").forEach((el) => { el.disabled = !isM; });
  }
  gen.forEach((cell) => {
    cell.hidden = isM;
    const inp = cell.querySelector("input,select,textarea");
    if (inp) inp.disabled = isM;
  });
  if (head) head.hidden = isM;
  if (cl) {
    cl.hidden = isM;
    cl.querySelectorAll("input,select,textarea,button").forEach((el) => { el.disabled = isM; });
  }
  state.mecoMode = isM;
}

function checklistEditorHTML(items) {
  const taken = (k) => items.some((it) => it.task_key === k);
  const taskBtns = (templateTasks || []).map((tt) => {
    const isTaken = taken(tt.key);
    return `<button type="button" class="task-opt ${isTaken ? "added" : ""}" data-act="pick-task" data-key="${esc(tt.key)}" ${isTaken ? "disabled" : ""}>
      ${isTaken ? "✓ " : ""}${esc(activeLabel(tt))}
    </button>`;
  }).join("");
  return `<div class="checklist">${items.length ? items.map((it, idx) => checklistRowHTML(it, idx)).join("") : `<div class="cl-empty">${esc(t("cl_empty"))}</div>`}</div>
  <div class="task-pick">
    <div class="task-drop">
      <button type="button" class="select task-drop-toggle" data-act="toggle-task-drop" title="${esc(t("cl_placeholder"))}">
        <span>${esc(t("cl_placeholder"))}</span><span class="caret">▾</span>
      </button>
      <div class="task-menu" id="cl-task-menu" hidden>
        ${taskBtns || `<div class="task-opt added" disabled>—</div>`}
        <button type="button" class="task-opt" data-act="pick-custom">＋ ${esc(t("cl_custom"))}</button>
      </div>
    </div>
    <div class="cl-custom" id="cl-custom-row" hidden>
      <input class="input" id="cl-custom-task" placeholder="${esc(t("cl_custom_placeholder"))}">
      <button class="btn ghost small" type="button" data-act="add-custom-task">＋ ${esc(t("add"))}</button>
    </div>
  </div>`;
}

function activeLabel(lb) {
  const fr = String((lb && (lb.fr != null ? lb.fr : lb.task_label_fr)) || "");
  const en = String((lb && (lb.en != null ? lb.en : lb.task_label_en)) || "");
  if (!fr && !en) return "?";
  return state.lang === "fr" ? fr || en : en || fr;
}

function linkHref(v) {
  const s = String(v || "").trim();
  if (!s) return "";
  return /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(s) ? s : "https://" + s;
}

function linkPreviewHTML(v) {
  const s = String(v || "").trim();
  return s ? `🔗 <a href="${esc(linkHref(s))}" target="_blank" rel="noopener">${esc(s)}</a>` : "";
}

function checklistRowHTML(it, idx) {
  const short = t("status_short");
  return `<li data-idx="${idx}">
    <div class="status-pick">
      ${STATUSES.map((s, si) => `<button type="button" data-act="set-task-status" data-idx="${idx}" data-status="${s}"
        class="s-${s} ${it.status === s ? "active" : ""}" title="${esc(t("status_" + s))}">${short[si]}</button>`).join("")}
    </div>
    <div class="check-item">
      <div class="tt">${esc(activeLabel(it))}</div>
      ${it.task_key === "dropbox" || it.task_key === "api" ? `<div style="font-size:11px;color:var(--muted);font-weight:700">${it.task_key === "dropbox" ? "☁ DROPBOX" : "🔌 API"}</div>` : ""}
      <label class="cl-field-label">${esc(t("cl_link_label"))}</label>
      <input class="input" data-field="link" data-idx="${idx}" value="${esc(it.link || "")}" placeholder="${esc(t("cl_link_placeholder"))}">
      <div class="link-preview" data-link-preview="${idx}">${linkPreviewHTML(it.link)}</div>
      <label class="cl-field-label">${esc(t("cl_comments_label"))}</label>
      <input class="input" data-field="comments" data-idx="${idx}" value="${esc(it.notes || "")}" placeholder="${esc(t("cl_comments_placeholder"))}">
    </div>
    <button type="button" class="btn xsmall danger" data-act="del-task" data-idx="${idx}">✕</button>
  </li>`;
}

function setupChecklistEditor(m) {
  const form = m.querySelector("#card-form");
  form.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    const act = b.dataset.act;
    if (act === "toggle-task-drop") {
      toggleTaskDrop(m);
    } else if (act === "pick-task") {
      pickTask(m, b.dataset.key);
    } else if (act === "pick-custom") {
      closeTaskDrop(m);
      const row = m.querySelector("#cl-custom-row");
      const inp = m.querySelector("#cl-custom-task");
      if (row) row.hidden = false;
      if (inp) inp.focus();
    } else if (act === "add-custom-task") {
      addCustomTask(m);
    } else if (act === "del-task") {
      state.clChecklist.splice(Number(b.dataset.idx), 1);
      renderChecklistBody(m);
    } else if (act === "set-task-status") {
      const idx = Number(b.dataset.idx);
      state.clChecklist[idx].status = b.dataset.status;
      renderChecklistBody(m);
    } else {
      closeTaskDrop(m);
    }
  });
  form.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target && e.target.id === "cl-custom-task") {
      e.preventDefault();
      addCustomTask(m);
    }
  });
  form.addEventListener("input", (e) => {
    if (!e.target.dataset) return;
    const idx = Number(e.target.dataset.idx);
    if (isNaN(idx) || !state.clChecklist[idx]) return;
    if (e.target.dataset.field === "link") {
      state.clChecklist[idx].link = e.target.value;
      updateLinkPreview(m, idx, e.target.value);
    } else if (e.target.dataset.field === "comments") {
      state.clChecklist[idx].notes = e.target.value;
    }
  });
}

function toggleTaskDrop(m) {
  const menu = m.querySelector("#cl-task-menu");
  if (menu) menu.hidden = !menu.hidden;
}

function closeTaskDrop(m) {
  const menu = m.querySelector("#cl-task-menu");
  if (menu) menu.hidden = true;
}

function pickTask(m, key) {
  const tt = (templateTasks || []).find((x) => x.key === key);
  if (!tt) return closeTaskDrop(m);
  state.clChecklist.push({
    task_key: tt.key,
    task_label_fr: tt.fr,
    task_label_en: tt.en,
    status: "pending",
    notes: "",
    link: "",
    position: state.clChecklist.length,
  });
  renderChecklistBody(m);
}

function addCustomTask(m) {
  const inp = m.querySelector("#cl-custom-task");
  const name = inp ? inp.value.trim() : "";
  if (!name) return;
  state.clChecklist.push({
    task_key: "custom_" + Date.now(),
    task_label_fr: name,
    task_label_en: name,
    status: "pending",
    notes: "",
    link: "",
    position: state.clChecklist.length,
  });
  renderChecklistBody(m);
}

function updateLinkPreview(m, idx, value) {
  const area = m.querySelector("#cl-area");
  if (!area) return;
  const wrap = area.querySelector(`[data-link-preview="${idx}"]`);
  if (!wrap) return;
  wrap.innerHTML = linkPreviewHTML(value);
}

function renderChecklistBody(m) {
  const area = m.querySelector("#cl-area");
  if (area) area.innerHTML = checklistEditorHTML(state.clChecklist || []);
}

/* ---------------------------------------------------------------- attachments */

const ATT_EXTS = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp", ".tif", ".tiff", ".svg"];

function attIcon(name) {
  const n = String(name || "").toLowerCase();
  if (n.endsWith(".pdf")) return "📕";
  if (/\.(docx?)$/.test(n)) return "📘";
  if (/\.(xlsx?)$/.test(n)) return "📗";
  if (/\.(png|jpe?g|gif|bmp|webp|tiff?|svg)$/.test(n)) return "🖼";
  return "📎";
}

function fmtSize(n) {
  if (!n) return "";
  if (n < 1024) return n + " B";
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + " KB";
  return (n / (1024 * 1024)).toFixed(1) + " MB";
}

function attListHTML(list) {
  if (!list || !list.length) return `<li class="empty-row">${esc(t("att_none"))}</li>`;
  return list.map((a) => `<li class="att-row">
    <span class="att-ico">${attIcon(a.original_name)}</span>
    <span class="att-name" title="${esc(a.original_name)}">${esc(a.original_name)}</span>
    <span class="att-size">${fmtSize(a.size)}</span>
    <button type="button" class="btn xsmall danger" data-act="att-delete" data-attid="${a.id}">✕</button>
  </li>`).join("");
}

function setupAttachments(m) {
  m.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    if (b.dataset.act === "att-upload") {
      const input = m.querySelector("#att-file");
      if (input) input.click();
    } else if (b.dataset.act === "att-delete") {
      deleteAttachment(m, b.dataset.attid);
    }
  });
  m.addEventListener("change", (e) => {
    if (e.target && e.target.id === "att-file") {
      uploadAttachments(m, e.target.files);
      e.target.value = "";
    }
  });
}

async function uploadAttachments(m, files) {
  const impId = m.querySelector('[data-act="save-card"]').dataset.id;
  if (!impId || !files) return;
  for (const file of files) {
    const ext = "." + String(file.name.split(".").pop() || "").toLowerCase();
    if (!ATT_EXTS.includes(ext)) return toast(t("att_bad_type"));
    const fd = new FormData();
    fd.append("file", file, file.name);
    try {
      const res = await api("/api/imports/" + impId + "/attachments", "POST", fd);
      state.attachments = res.attachments || [];
      renderAttList(m);
      toast(t("att_added"));
    } catch (err) {
      toast(t("att_bad_type"));
    }
  }
}

async function deleteAttachment(m, attId) {
  if (!attId) return;
  const impId = m.querySelector('[data-act="save-card"]').dataset.id;
  try {
    const res = await api("/api/imports/" + impId + "/attachments/" + attId, "DELETE");
    state.attachments = res.attachments || [];
    renderAttList(m);
    toast(t("att_removed"));
  } catch (err) {
    toast(t("save_err", { msg: err.message }));
  }
}

function renderAttList(m) {
  const list = m.querySelector("#att-list");
  if (list) list.innerHTML = attListHTML(state.attachments);
}

/* ---------------------------------------------------------------- modal helpers */

function openModal(html, wide) {
  const root = document.getElementById("modal-root");
  root.innerHTML = `<div class="modal-backdrop"><div class="modal ${wide ? "wide" : ""}">${html}</div></div>`;
  const backdrop = root.firstElementChild;
  backdrop.addEventListener("mousedown", (e) => {
    if (e.target === backdrop) closeModal();
  });
  const closeBtn = backdrop.querySelector('[data-act="close-modal"]');
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  return backdrop.querySelector(".modal");
}

function closeModal() {
  const root = document.getElementById("modal-root");
  root.innerHTML = "";
  delete state.clChecklist;
  delete state.addInfo;
  state.attachments = [];
}

function addInfoRowHTML(it) {
  return `<div class="ai-row">
    <span class="ai-key">${esc(t("ai_" + it.type))}</span>
    <input class="input" data-ai-type="${esc(it.type)}" value="${esc(it.value)}" placeholder="${esc(t("extra_value_placeholder"))}">
    <button type="button" class="btn xsmall danger" data-act="ai-remove" data-key="${esc(it.type)}" title="${esc(t("extra_remove"))}">✕</button>
  </div>`;
}

function renderAddInfoFields(m) {
  const box = m.querySelector("#add-info-fields");
  if (box) box.innerHTML = (state.addInfo || []).map(addInfoRowHTML).join("");
}

function refreshAddInfoOptions(m) {
  const sel = m.querySelector("#add-info-type");
  if (!sel) return;
  const taken = (state.addInfo || []).map((x) => x.type);
  Array.from(sel.options).forEach((opt) => {
    opt.disabled = opt.value !== "" && taken.includes(opt.value);
  });
}

function setupExtraInfo(m) {
  const sel = m.querySelector("#add-info-type");
  if (!sel) return;
  const box = m.querySelector("#add-info-fields");
  sel.addEventListener("change", () => {
    const k = sel.value;
    if (!k) return;
    if ((state.addInfo || []).some((x) => x.type === k)) {
      toast(t("extra_dup"));
      sel.value = "";
      return;
    }
    state.addInfo.push({ type: k, value: "" });
    sel.value = "";
    renderAddInfoFields(m);
    refreshAddInfoOptions(m);
  });
  if (box) {
    box.addEventListener("input", (e) => {
      const inp = e.target.closest("[data-ai-type]");
      if (!inp) return;
      const item = (state.addInfo || []).find((x) => x.type === inp.dataset.aiType);
      if (item) item.value = inp.value;
    });
    box.addEventListener("click", (e) => {
      const b = e.target.closest("[data-act='ai-remove']");
      if (!b) return;
      state.addInfo = (state.addInfo || []).filter((x) => x.type !== b.dataset.key);
      renderAddInfoFields(m);
      refreshAddInfoOptions(m);
    });
  }
  renderAddInfoFields(m);
  refreshAddInfoOptions(m);
}

/* ---------------------------------------------------------------- chatbot */

function chatNorm(s) {
  return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
const chatCompact = (s) => chatNorm(s).replace(/[^a-z0-9]/g, "");
const chatHas = (q, ...words) => words.some((w) => chatNorm(q).includes(w));
const chatIs = (q, ...words) => words.some((w) => chatNorm(q).includes(chatNorm(w)) || chatNorm(w).includes(chatNorm(q)));

function chatFindSuppliers(q) {
  const nq = chatNorm(q);
  return state.suppliers.filter((s) => {
    const names = [s.name, s.code, s.city, s.country].filter(Boolean).map(chatCompact);
    return names.some((n) => n && nq.split(/[^a-z0-9]+/).some((tok) => n.includes(tok) && tok.length >= 2));
  });
}

function chatFindImports(q) {
  const cq = chatCompact(q);
  const m = cq.match(/fi0*(\d{1,6})/);
  if (m) {
    const hit = state.imports.find((i) => fiNum(i) === parseInt(m[1], 10));
    if (hit) return [hit];
  }
  const fieldHits = state.imports.filter((i) =>
    [i.po_number, i.inbsip, i.doc_number, i.container, i.transitaire_bol]
      .some((f) => f && cq.includes(chatCompact(String(f)))));
  if (fieldHits.length) return fieldHits;
  const destHits = state.imports.filter((i) => i.destination && chatCompact(i.destination) && cq.includes(chatCompact(i.destination)));
  return destHits;
}

function chatDaysOf(q) {
  const m = chatNorm(q).match(/(\d+)\s*(?:j(?:our)?s?|d(?:ay)?s?)/);
  return m ? parseInt(m[1], 10) : 7;
}

function chatRel(d, abs) {
  if (d === null) return "—";
  if (d <= 0 && abs) d = Math.abs(d);
  if (d === 0) return t("chat_rel_today");
  return d < 0 ? t("chat_rel_overdue", { d: Math.abs(d) }) : t("chat_rel_days", { d });
}

function chatUpcomingRow(r) {
  const d = daysUntil(r.eta);
  const rel = d === null ? "—" : d < 0 ? t("chat_rel_overdue", { d: Math.abs(d) }) : d === 0 ? t("chat_rel_today") : t("chat_rel_days", { d });
  return { msg: `${esc(refLabel(r))} — ${esc(fmtDate(r.eta))} (${rel})`, row: r };
}

function chatImportLines(rows) {
  return rows.slice(0, 3).map((r) => {
    const d = daysUntil(r.eta);
    const rel = d === null ? "—" : d < 0 ? t("chat_rel_overdue", { d: Math.abs(d) }) : d === 0 ? t("chat_rel_today") : t("chat_rel_days", { d });
    const ck = (r._total || 0) > 0 ? `${r._done || 0}/${r._total}` : "—";
    return t("chat_import_status", {
      ref: refLabel(r), supplier: r.supplier_name || "—", dest: r.destination || "—",
      eta: fmtDate(r.eta), rel, done: ck,
    });
  });
}

function chatWidget(lines, chips) {
  return { text: lines.join("\n"), chips: chips || [] };
}

function chatbotAnswer(rawQ) {
  const q = String(rawQ || "").trim();
  if (!q) return chatWidget([t("chat_help")], chatDefaultChips());
  const nq = chatNorm(q);

  const sayHello = () => chatWidget([t("chat_greeting")], chatDefaultChips());
  const sayHelp = () => chatWidget([t("chat_help")], chatDefaultChips());

  if (chatHas(q, "bonjour", "salut", "hello", "hi", "hey", "bonsoir", "coucou")) return sayHello();
  if (chatHas(q, "aide", "help", "quoi faire", "que faites", "fonctionne", "peux-tu", "peux tu", "can you")) return sayHelp();

  const suppliers = state.suppliers || [];
  const imports = state.imports || [];

  if (chatHas(q, "fournisseur", "supplier", "contact")) {
    const found = chatFindSuppliers(q);
    if (found.length) {
      const s = found[0];
      const n = imports.filter((i) => i.supplier_id === s.id).length;
      const line = t("chat_sup_info", {
        name: esc(s.name), city: esc(s.city || "—"), country: esc(s.country || "—"),
        contact: esc(s.contact || "") || "—", email: esc(s.email || "") || "—", n,
      });
      const chips = [{ label: `${n} ${t("chat_go_imports")}`, act: "nav", hash: "#/imports" }];
      return chatWidget([line], chips);
    }
    if (chatHas(q, "combien", "how many", "qui sont", "liste", "list", "who are") || suppliers.length) {
      const lines = suppliers.map((s) => `• ${esc(s.name)} — ${esc(s.city || s.country || "—")}`).slice(0, 8);
      return chatWidget(lines.length ? [`${t("chat_suppliers", { n: suppliers.length })}`].concat(lines) : [t("chat_no_data")], []);
    }
    return chatWidget([t("chat_sup_none", { q: esc(q) })], chatDefaultChips());
  }

  const hits = chatFindImports(q);
  if (hits.length && (chatHas(q, "où", "ou ", "statut", "status", "suivi", "track", "quand", "when", "arriv", "arrivée", "prognostic") || !chatHas(q, "prochaine", "next", "a venir", "upcoming"))) {
    const lines = chatImportLines(hits);
    const chips = hits.slice(0, 3).map((r) => ({ label: `${esc(r.serial || refLabel(r))}`, act: "open", id: r.id }));
    return chatWidget(lines, chips);
  }

  if (chatHas(q, "arriv", "prochain", "next", "a venir", "upcoming", "bientot", "bientôt", "dans")) {
    const up = imports.filter((i) => i.eta && daysUntil(i.eta) >= 0);
    if (!up.length) return chatWidget([t("chat_arr_none")], chatDefaultChips());
    const days = chatDaysOf(q);
    const windowed = up.filter((i) => daysUntil(i.eta) <= days);
    const list = windowed.length ? windowed : up;
    const lines = list.slice(0, 5).map((r) => chatUpcomingRow(r).msg);
    const header = windowed.length
      ? t("chat_arr_soon", { d: days, n: windowed.length })
      : t("chat_arr_header", { n: up.length });
    return chatWidget([header].concat(lines), chatDefaultChips());
  }

  if (chatHas(q, "retard", "overdue", "dépassé", "depasse", "late")) {
    const over = imports.filter((i) => i.eta && daysUntil(i.eta) < 0);
    if (!over.length) return chatWidget([t("chat_nooverdue")], chatDefaultChips());
    const lines = over.slice(0, 5).map((r) => chatUpcomingRow(r).msg);
    return chatWidget([t("chat_overdue_header", { n: over.length })].concat(lines), chatDefaultChips());
  }

  if (chatHas(q, "alerte", "alert", "manquant", "missing", "document")) {
    const items = imports.filter((i) => !(i.doc_number || "").trim());
    if (!items.length) return chatWidget([t("chat_noalert")], chatDefaultChips());
    const lines = items.slice(0, 5).map((r) => `• ${esc(refLabel(r))}`);
    return chatWidget([t("chat_alert_header", { n: items.length })].concat(lines), chatDefaultChips());
  }

  if (chatHas(q, "combien", "how many", "stat", "nombre", "total", "progress", "avance")) {
    const active = imports.length;
    const soon = imports.filter((i) => i.eta && daysUntil(i.eta) >= 0 && daysUntil(i.eta) <= 7).length;
    const over = imports.filter((i) => i.eta && daysUntil(i.eta) < 0).length;
    const total = imports.reduce((s, i) => s + (i._total || 0), 0);
    const done = imports.reduce((s, i) => s + (i._done || 0), 0);
    const pct = total ? Math.round((done / total) * 100) : 0;
    return chatWidget([t("chat_stats", { active, soon, over, pct })], chatDefaultChips());
  }

  return chatWidget([t("chat_unknown")], chatDefaultChips());
}

function chatDefaultChips() {
  return [
    { label: t("chat_q_arrivals"), act: "send", q: t("chat_q_arrivals") },
    { label: t("chat_q_suppliers"), act: "send", q: t("chat_q_suppliers") },
    { label: t("chat_q_help"), act: "send", q: t("chat_q_help") },
  ];
}

/* ---- chatbot UI ---- */

function chatPanel() { return document.getElementById("chat-panel"); }

let chatOpened = false;

function openChatPanel() {
  const p = chatPanel();
  if (!p) return;
  p.classList.remove("hidden");
  if (!chatOpened) {
    chatOpened = true;
    pushChatBot(t("chat_greeting"), chatDefaultChips());
  }
  const i = document.getElementById("chat-input");
  if (i) i.focus();
}

function closeChatPanel() {
  const p = chatPanel();
  if (p) p.classList.add("hidden");
}

function toggleChatPanel() {
  const p = chatPanel();
  if (!p) return;
  if (p.classList.contains("hidden")) openChatPanel();
  else closeChatPanel();
}

function pushChatMsg(who, html) {
  const body = document.getElementById("chat-body");
  if (!body) return;
  const d = document.createElement("div");
  d.className = "chat-msg " + who;
  d.innerHTML = html;
  body.appendChild(d);
  body.scrollTop = body.scrollHeight;
}

function pushChatBot(text, chips) {
  const chipHtml = (chips && chips.length)
    ? `<div class="chats">${chips.map((c) => {
        if (c.act === "open") return `<button class="chip" data-act="chat-open-card" data-id="${c.id}">${esc(c.label)}</button>`;
        if (c.act === "nav") return `<button class="chip" data-act="nav" data-nav="${c.hash.replace(/^#\//, "")}">${esc(c.label)}</button>`;
        return `<button class="chip" data-act="chat-chip" data-q="${esc(c.q)}">${esc(c.label)}</button>`;
      }).join("")}</div>` : "";
  pushChatMsg("bot", text.split("\n").map((l) => `<div class="para">${l}</div>`).join("") + chipHtml);
}

function sendChat(q) {
  const text = String(q || "").trim();
  if (!text) return;
  pushChatMsg("user", esc(text));
  const a = chatbotAnswer(text);
  pushChatBot(a.text, a.chips);
}

function initChatbot() {
  const host = document.createElement("div");
  host.id = "chatbot";
  host.className = "no-print";
  host.innerHTML = `
    <div id="chat-panel" class="chat-panel hidden">
      <div class="chat-h"><span class="chat-title">${esc(t("chat_title"))}</span>
        <button class="chat-close" data-act="chat-close" aria-label="✕">✕</button></div>
      <div id="chat-body" class="chat-body"></div>
      <form id="chat-form" class="chat-form">
        <input id="chat-input" class="input" autocomplete="off" spellcheck="false" placeholder="${esc(t("chat_placeholder"))}">
        <button type="submit" class="chat-send" aria-label="${esc(t("chat_send"))}">➤</button>
      </form>
    </div>
    <button id="chat-fab" class="chat-fab" data-act="chat-toggle" aria-label="${esc(t("chat_title"))}">💬</button>`;
  document.body.appendChild(host);
  document.getElementById("chat-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const inp = document.getElementById("chat-input");
    const v = (inp ? inp.value : "").trim();
    if (!v) return;
    if (inp) inp.value = "";
    sendChat(v);
  });
}

document.addEventListener("click", async (e) => {
  const el = e.target.closest("[data-act]");
  if (!el) return;
  const act = el.dataset.act;
  const id = el.dataset.id;
  if (act === "nav") { go("#/" + el.dataset.nav); return; }
  if (act === "lang") {
    state.lang = el.dataset.lang;
    localStorage.setItem("si_lang", state.lang);
    render();
    return;
  }
  if (act === "sort-imports") {
    const key = el.dataset.key;
    if (state.sortKey === key) {
      state.sortDir = state.sortDir === -1 ? 1 : -1;
    } else {
      state.sortKey = key;
      state.sortDir = key === "fi" ? -1 : 1;
    }
    render();
    return;
  }
  if (act === "theme") {
    state.theme = el.dataset.theme;
    applyTheme();
    render();
    return;
  }
  if (act === "logout") {
    await api("/api/logout", "GET").catch(() => {});
    state.authed = false;
    state.user = null;
    go("#/login");
    render();
    return;
  }
  if (act === "chat-toggle") { toggleChatPanel(); return; }
  if (act === "chat-close") { closeChatPanel(); return; }
  if (act === "chat-chip") {
    sendChat(String(el.dataset.q || "").trim());
    return;
  }
  if (act === "chat-open-card") {
    const row = state.imports.find((x) => x.id === Number(id));
    if (!row) return;
    try {
      const det = await api("/api/imports/" + id);
      state.clChecklist = det.checklist
        .map((c, i) => Object.assign({}, c, { position: i }))
        .sort((a, b) => a.position - b.position);
      state.attachments = det.attachments || [];
      await openImportModal(det.import);
    } catch (err) { /* ignore */ }
    return;
  }
  if (act === "collapse") {
    const key = el.dataset.key;
    state.collapsed[key] = !state.collapsed[key];
    localStorage.setItem("si_collapsed", JSON.stringify(state.collapsed));
    render();
    return;
  }
  if (!state.authed) return;

  if (act === "user-reset") {
    const uid = el.dataset.uid;
    const np = prompt(t("user_new_pw_hint"));
    if (np === null) return;
    try {
      if (np.length < 6) throw new Error("weak password");
      await api("/api/users/" + uid, "PUT", { password: np });
      toast(t("user_reset_ok"));
    } catch (e) {
      toast(e.message === "weak password" ? t("password_weak") : t("err_forbidden"));
    }
    return;
  }
  if (act === "user-del") {
    const uid = el.dataset.uid;
    if (!confirm(t("user_confirm_delete"))) return;
    try {
      await api("/api/users/" + uid, "DELETE");
      toast(t("user_deleted"));
      await renderSettings();
    } catch (e) {
      toast(e.message === "cannot delete self" ? t("user_self_delete") : e.message === "last admin" ? t("user_last_admin") : t("err_forbidden"));
    }
    return;
  }

  if (act === "new-supplier") { openSupplierModal(null); return; }
  if (act === "edit-supplier") {
    const sup = state.suppliers.find((x) => x.id === Number(id));
    if (sup) openSupplierModal(sup);
    return;
  }
  if (act === "del-supplier") {
    if (!confirm(t("confirm_delete_supplier"))) return;
    await api("/api/suppliers/" + id, "DELETE");
    toast(t("save_ok"));
    await loadBase();
    render();
    return;
  }
  if (act === "open-supplier") { go("#/supplier/" + id); return; }
  if (act === "new-import") {
    state.tmpSupplierId = Number(el.dataset.sid);
    await openImportModal();
    return;
  }
  if (act === "new-import-global") {
    state.tmpSupplierId = null;
    await openImportModal();
    return;
  }
  if (act === "open-import") {
    const row = state.imports.find((x) => x.id === Number(id));
    if (!row) return;
    try {
      const det = await api("/api/imports/" + id);
      state.clChecklist = det.checklist
        .map((c, i) => Object.assign({}, c, { position: i }))
        .sort((a, b) => a.position - b.position);
      state.attachments = det.attachments || [];
      await openImportModal(det.import);
    } catch (err) { /* ignore */ }
    return;
  }
  if (act === "print-card") {
    window.print();
    return;
  }
  if (act === "export-xlsx") {
    await exportUpcomingXlsx();
    return;
  }
  if (act === "restore-card") {
    await api("/api/imports/" + id + "/restore", "PUT", {});
    toast(t("restored_ok"));
    await loadBase();
    render();
    return;
  }
  if (act === "del-permanent") {
    if (!confirm(t("confirm_delete_permanent"))) return;
    await api("/api/imports/" + id, "DELETE");
    toast(t("deleted_perm_ok"));
    await loadBase();
    render();
    return;
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (document.getElementById("modal-root").innerHTML) { closeModal(); return; }
  const p = document.getElementById("chat-panel");
  if (p && !p.classList.contains("hidden")) closeChatPanel();
});

document.addEventListener("mousedown", (e) => {
  if (e.target.closest(".task-drop") || e.target.closest("#cl-custom-row")) return;
  document.querySelectorAll("#cl-task-menu:not([hidden])").forEach((menu) => {
    menu.hidden = true;
  });
});

/* ---------------------------------------------------------------- boot */

(async function boot() {
  applyTheme();
  try {
    const me = await api("/api/me");
    state.user = me;
    state.authed = true;
    await loadBase().catch(() => { state.authed = false; });
  } catch (e) {
    state.authed = false;
  }
  if (state.authed) loadRates();
  booted = true;
  render();
  initChatbot();
  setInterval(() => { if (state.authed) loadRates(); }, 20 * 60 * 1000);
})();