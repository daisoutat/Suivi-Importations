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
    nav_backup: "Sauvegarde",
    nav_reconcile: "Réconciliation",
    mod_reconcile_title: "Réconciliation facture / commande",
    module_sub_reconcile: "Comparez une facture fournisseur à son bon de commande (Excel) et détectez automatiquement les écarts de code, quantité et prix.",
    rec_invoice_label: "Facture fournisseur",
    rec_po_label: "Bon de commande",
    rec_upload_hint: "Fichiers Excel (.xlsx) ou CSV — colonnes : Code article, Description, Quantité, Prix unitaire",
    rec_btn: "Comparer les fichiers",
    rec_running: "Analyse en cours…",
    rec_need_both: "Sélectionnez la facture ET le bon de commande.",
    rec_done_toast: "Rapprochement terminé : {n} ligne(s) en écart.",
    rec_error: "Échec du rapprochement.",
    rec_err_xls: "Le format .xls n'est pas pris en charge — réexportez en .xlsx ou .csv.",
    rec_err_columns: "En-têtes introuvables. Colonnes requises : Item Code, Description, Quantity, Unit Price.",
    rec_err_files: "Fichiers requis : facture + bon de commande.",
    rec_err_rows: "Fichier trop volumineux (max 5000 lignes par fichier).",
    rec_err_internal: "Erreur interne pendant l'analyse.",
    rec_total: "Total des lignes comparées",
    rec_stats_inv: "Lignes facture",
    rec_stats_po: "Lignes commande",
    rec_stats_ok: "Lignes correctes (oui)",
    rec_stats_bad: "Lignes erronées (neuf)",
    rec_rate: "Taux de conformité",
    rec_section_ok: "Lignes correctes",
    rec_section_bad: "Lignes erronées",
    rec_section_pivot: "Synthèse par code article (tableau croisé)",
    rec_history: "Historique",
    rec_history_none: "Aucun rapprochement enregistré.",
    rec_col_code: "Code article",
    rec_col_desc: "Description",
    rec_col_qty: "Quantité",
    rec_col_price: "Prix unitaire",
    rec_col_status: "Statut",
    rec_col_reason: "Motif",
    rec_col_diff: "Écart",
    rec_col_amount: "Montant",
    rec_vs: "Facture → Commande",
    rec_file_title: "Fichiers à comparer",
    rec_reason_code: "Code absent du bon de commande",
    rec_reason_match: "Plus de ligne commande restante",
    rec_reason_extra: "Ligne commande sans facture",
    rec_reason_qty: "Quantité différente",
    rec_reason_price: "Prix différent",
    rec_reason_description: "Description différente",
    rec_reason_missing: "Valeur manquante",
    rec_save: "Enregistrer",
    rec_clear: "Effacer",
    rec_saved: "Enregistrée",
    rec_saved_toast: "Réconciliation enregistrée dans la base de données.",
    rec_clear_toast: "Session de réconciliation réinitialisée. L'historique est conservé.",
    nav_settings: "Paramètres",
    nav_archives: "Archives",
    archives_title: "Archives",
    archives_empty: "Aucune fiche verrouillée.",
    archives_read_only: "Lecture seule",
    archives_locked_on: "Fiche verrouillée",
    unlock_card: "Déverrouiller",
    unlocked_ok: "Fiche déverrouillée. Elle est de nouveau active sur le tableau de bord.",
    lock_confirm: "Verrouiller cette fiche ? Elle sera déplacée dans les Archives et s'affichera en lecture seule.",
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
    extra_custom: "Champ personnalisé",
    custom_field_name: "Nom du champ personnalisé…",
    custom_add_btn: "＋ Ajouter",
    extra_need_name: "Veuillez saisir un nom de champ.",
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
    cl_link_remove: "Supprimer le lien",
    cl_link_add: "Ajouter un autre lien",
    cl_link_add_txt: "+ lien",
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
    view_closing: "Fermeture en cours…",
    view_close_ok: "Enregistré et vue fermée.",
    resize_col: "Glisser pour redimensionner la colonne",
    // --- Colonne « Date de création » + menu d'actions par ligne (FR) ---
    col_created: "Date de création",
    col_actions: "Actions",
    act_menu: "Actions",
    act_new: "Créer une nouvelle fiche",
    act_edit: "Modifier la fiche",
    act_lock: "Verrouiller la fiche",
    act_unlock: "Déverrouiller la fiche",
    act_history: "Historique des modifications",
    act_documents: "Gérer les documents associés",
    act_detail: "Vue détaillée",
    act_contact: "Contacter les intervenants",
    locked_badge: "Verrouillée",
    lock_on: "Fiche verrouillée.",
    lock_off: "Fiche déverrouillée.",
    history_title: "Historique des modifications",
    history_created_by: "Créé par",
    history_unknown: "Utilisateur inconnu",
    history_empty: "Aucune action enregistrée.",
    hist_create: "Création de la fiche",
    hist_update: "Modification de la fiche",
    hist_checklist: "Mise à jour de la liste de vérification",
    hist_lock: "Fiche verrouillée",
    hist_unlock: "Fiche déverrouillée",
    hist_trash: "Fiche mise à la corbeille",
    hist_restore: "Fiche restaurée",
    hist_document_add: "Document ajouté",
    hist_document_remove: "Document supprimé",
    hist_other: "Action",
    docs_title: "Documents associés",
    docs_hint: "Sélectionnez un ou plusieurs fichiers à téléverser.",
    docs_empty: "Aucun document pour cette fiche.",
    docs_added: "Document(s) ajouté(s).",
  docs_removed: "Document supprimé.",
  docs_close: "Fermer",
  docs_upload: "Téléverser",
    detail_title: "Vue détaillée",
    detail_close: "Fermer",
    detail_checklist: "Liste de vérification",
    detail_no_checklist: "Aucune tâche.",
    contact_title: "Contacter les intervenants",
    contact_close: "Fermer",
    contact_supplier: "Fournisseur",
    contact_person: "Personne-ressource",
    contact_email: "Courriel",
    contact_none: "Aucune coordonnée disponible pour ce fournisseur.",
    nav_kanban: "Kanban",
    nav_prediction: "Prédiction des retards",
    nav_analytics: "Performance fournisseurs",
    mod_kanban_title: "Vue Kanban",
    mod_prediction_title: "Prédiction des retards",
    mod_analytics_title: "Analyse des performances fournisseurs",
    mod_soon: "Module en préparation — bientôt disponible.",
    // --- Modules dynamiques (Kanban, prediction, performance) ---
    module_sub_kanban: "Suivi visuel des fiches par étape du cycle d'importation.",
    module_sub_prediction: "Estimation heuristique du risque de retard, calculée à partir des données réelles.",
    module_sub_performance: "Ponctualité, avancement et qualité documentaire par fournisseur.",
    module_refresh: "Rafraîchir",
    module_updated: "Mis à jour : {at}",
    module_empty: "Aucune donnée à afficher pour le moment.",
    stage_scheduled: "Planifié",
    stage_in_transit: "En transit",
    stage_arriving: "Arrivée imminente",
    stage_arrived: "Arrivé (en cours)",
    stage_completed: "Complété",
    kb_card_tasks: "Tâches",
    pred_risk: "Risque",
    pred_level_high: "Élevé",
    pred_level_medium: "Modéré",
    pred_level_low: "Faible",
    pred_score: "Score",
    pred_delay: "Retard estimé",
    pred_days: "{n} j",
    pred_days_none: "Aucun",
    pred_no_risk: "Aucune alerte de retard détectée.",
    pred_model_note: "Modèle heuristique basé sur l'avancement de la liste, l'échéancier ETD/ETA, les documents et l'historique fournisseur.",
    reason_missing_eta: "ETA manquante",
    reason_missing_etd: "ETD manquante",
    reason_missing_doc: "N° de document manquant",
    reason_behind_schedule: "Retard sur l'échéancier",
    reason_slightly_behind: "Légèrement en retard",
    reason_eta_passed: "ETA dépassée, fiche incomplète",
    reason_close_eta_incomplete: "Arrivée proche, liste incomplète",
    reason_critical_tasks_open: "Tâches critiques ouvertes",
    reason_supplier_history: "Historique fournisseur défavorable",
    perf_score: "Score",
    perf_grade: "Note",
    perf_imports: "Fiches",
    perf_completed: "Complétées",
    perf_on_time: "Ponctualité",
    perf_avg_progress: "Avancement moyen",
    perf_avg_delay: "Retard moyen",
    perf_docs: "Documents",
    perf_pallets: "Palettes",
    perf_past_due: "ETA dépassées",
    perf_na: "N/D",
    perf_legend: "Note : A ≥ 85, B ≥ 70, C ≥ 50, D < 50.",
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
    chat_q_statistiques: "Statistiques",
    chat_q_retards: "Retards",
    chat_q_alertes: "Alertes",
    chat_q_help: "Aide",
    chat_src_internal: "Interne • Base de données",
    chat_src_external: "Internet • Sources live",
    chat_src_knowledge: "Base de connaissances",
    chat_src_system: "Système",
    chat_mic: "Dicter à l'aide du micro",
    chat_mic_off: "Micro indisponible",
    chat_typing: "En réflexion…",
    chat_export: "Exporter la conversation",
    chat_upload_doc: "Importer un document",
    chat_doc_ok: "Document « {name} » importé et indexé ({n} caractères).",
    chat_doc_fail: "Impossible d'importer ce document.",
    chat_unavailable: "Le service d'assistance est momentanément indisponible. Réponse locale :\n",
    chat_chart_total: "Total",
    collapse_open: "Développer la section",
    collapse_close: "Réduire la section",
    rates_title: "Taux de change",
    rates_unavailable: "Indisponible",
    meco_form_title: "Fiche d'importation",
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
    meco_reset_confirm: "Effacer la fiche en cours ?",
    meco_new_ok: "Fiche réinitialisée.",
    ingenious_view_title: "Fiche d'importation INGENIOUS",
    ingenious_new: "Nouveau",
    ingenious_link_tip: "Lier une ressource externe",
    ingenious_reset_confirm: "Effacer la fiche en cours ?",
    ingenious_new_ok: "Fiche réinitialisée.",

    navita_view_title: "Fiche d'importation NAVITA",
    navita_new: "Nouveau",
    navita_reset_confirm: "Effacer la fiche en cours ?",
    navita_new_ok: "Fiche réinitialisée.",
    cl_fac_label: "Fac #",

    micota_view_title: "Fiche d'importation MICOTA",
    micota_new: "Nouveau",
    micota_reset_confirm: "Effacer la fiche en cours ?",
    micota_new_ok: "Fiche réinitialisée.",

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
    settings_load_err: "Impossible de charger les paramètres.",
    sec_fx: "Taux de change",
    fx_title: "Taux de change (API)",
    fx_base: "Devise de base",
    fx_sync_min: "Fréquence de synchronisation (minutes)",
    fx_api_key: "Clé API (facultative)",
    fx_key_hint: "Si fournie, la clé est utilisée comme paramètre « apikey » ; elle est conservée de façon sécurisée et jamais réaffichée.",
    fx_save: "Enregistrer la configuration",
    fx_live: "Aperçu en direct",
    fx_updated: "Dernière mise à jour : {time}",
    fx_unavailable: "API de taux indisponible — les valeurs afficheront des tirets.",
    fx_saved: "Configuration des taux enregistrée.",
    rates_manage: "Gérer",
    rates_change: "Taux de change",
    sec_notif: "Notifications",
    notif_title: "Préférences de notification",
    notif_email: "Courriel",
    notif_app: "In-app",
    notif_delays: "Retards de livraison",
    notif_locked: "Fiches verrouillées",
    notif_arrival: "Prochaines arrivées",
    notif_hint: "Les préférences sont synchronisées en temps réel à votre profil.",
    notif_saved: "Préférences de notification enregistrées.",
    sec_data: "Gestion des données",
    data_title: "Sauvegarde & restauration",
    data_backup: "Télécharger la sauvegarde",
    data_backup_hint: "Exporte une archive sécurisée incluant la base de données et les documents.",
    data_import: "Restaurer une sauvegarde",
    data_import_hint: "Choisissez un fichier .zip ou .db généré par la fonction de sauvegarde.",
    data_import_btn: "Restaurer",
    data_import_confirm: "Restaurer cette sauvegarde ? La base actuelle sera conservée dans data/backups avant remplacement.",
    data_import_success: "Sauvegarde restaurée ({n} fiches).",
    data_import_error: "Échec de la restauration : {msg}",
    data_restore_self: "Seuls les administrateurs peuvent sauvegarder ou restaurer les données.",
    data_file_required: "Veuillez sélectionner un fichier .zip ou .db.",
    backup_file_name: "sauvegarde_radisson.zip",
    backup_title: "Sauvegarde automatique",
    backup_hint: "Exporte la base de données selon un planificateur quotidien et l'envoie par courriel si un compte SMTP est configuré.",
    backup_download_now: "Télécharger l'archive ZIP",
    backup_run_now: "Générer et envoyer maintenant",
    backup_running: "Génération en cours…",
    backup_done: "Sauvegarde générée et envoyée.",
    backup_done_local: "Sauvegarde générée (courriel non configuré).",
    backup_done_noemail: "Sauvegarde générée mais envoi par courriel échoué : {note}",
    backup_err: "Sauvegarde impossible : {msg}",
    backup_err_smtp: "Configuration SMTP manquante ou invalide (voir Paramètres / .env)",
    backup_err_network: "Serveur injoignable ({msg})",
    backup_schedule: "Planificateur",
    backup_next: "Prochaine exécution",
    backup_last: "Dernière exécution",
    backup_never: "jamais",
    backup_last_file: "Fichier",
    backup_email_cfg: "Courriel",
    backup_email_on: "Configuré",
    backup_email_off: "Non configuré — stockage local uniquement",
    backup_recipient: "Destinataire",
    sec_import_cfg: "Paramètres des importations",
    imp_title: "Gestion des importations",
    imp_incoterm: "Incoterm par défaut",
    imp_delay_tolerance: "Seuil de tolérance de retard (jours)",
    imp_delay_tolerance_hint: "Au-delà de ce seuil, une fiche est considérée « en retard ».",
    imp_email_fr: "Modèle d'e-mail (français)",
    imp_email_en: "Modèle d'e-mail (anglais)",
    imp_email_hint: "Variables disponibles : {supplier}, {serial}, {destination}, {eta}.",
    imp_save: "Enregistrer les paramètres",
    imp_saved: "Paramètres d'importation enregistrés.",
    // --- Éditeur de texte enrichi (WYSIWYG) global ---
    rte_title: "Éditeur de texte enrichi",
    rte_undo: "Annuler",
    rte_redo: "Rétablir",
    rte_bold: "Gras",
    rte_italic: "Italique",
    rte_strike: "Barré",
    rte_ul: "Liste à puces",
    rte_ol: "Liste numérotée",
    rte_hr: "Séparateur horizontal",
    rte_style: "Style de paragraphe",
    rte_style_p: "Paragraphe",
    rte_style_h1: "Titre 1",
    rte_style_h2: "Titre 2",
    rte_style_h3: "Titre 3",
    rte_link: "Insérer / modifier un lien",
    rte_link_prompt: "Adresse du lien (URL) :",
    rte_image: "Insérer une image",
    rte_image_prompt: "Adresse de l'image (URL) :",
    rte_table: "Insérer un tableau",
    rte_upload: "Téléverser un fichier",
    rte_file_too_big: "Fichier trop volumineux (10 Mo max) — pièce non jointe.",
    rte_more: "Afficher / masquer la barre avancée",
    rte_align: "Aligner à gauche",
    rte_center: "Centrer",
    rte_right: "Aligner à droite",
    rte_fullscreen: "Plein écran",
    rte_source: "Code source (HTML)",
    rte_placeholder: "Rédigez votre contenu…",
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
    nav_backup: "Backup",
    nav_reconcile: "Reconciliation",
    mod_reconcile_title: "Invoice / PO reconciliation",
    module_sub_reconcile: "Compare a supplier invoice to its purchase order (Excel) and automatically detect item code, quantity and price discrepancies.",
    rec_invoice_label: "Supplier invoice",
    rec_po_label: "Purchase order",
    rec_upload_hint: "Excel (.xlsx) or CSV files — columns: Item Code, Description, Quantity, Unit Price",
    rec_btn: "Compare files",
    rec_running: "Analysing…",
    rec_need_both: "Please select both the invoice AND the purchase order.",
    rec_done_toast: "Reconciliation complete: {n} line(s) in discrepancy.",
    rec_error: "Reconciliation failed.",
    rec_err_xls: "Legacy .xls is not supported — please re-export as .xlsx or .csv.",
    rec_err_columns: "Headers not found. Required columns: Item Code, Description, Quantity, Unit Price.",
    rec_err_files: "Required files: invoice + purchase order.",
    rec_err_rows: "File too large (max 5000 lines per file).",
    rec_err_internal: "Internal error while analysing.",
    rec_total: "Total lines compared",
    rec_stats_inv: "Invoice lines",
    rec_stats_po: "PO lines",
    rec_stats_ok: "Correct lines (oui)",
    rec_stats_bad: "Faulty lines (neuf)",
    rec_rate: "Compliance rate",
    rec_section_ok: "Correct lines",
    rec_section_bad: "Faulty lines",
    rec_section_pivot: "Per-item synthesis (pivot)",
    rec_history: "History",
    rec_history_none: "No reconciliation recorded yet.",
    rec_col_code: "Item Code",
    rec_col_desc: "Description",
    rec_col_qty: "Quantity",
    rec_col_price: "Unit Price",
    rec_col_status: "Status",
    rec_col_reason: "Reason",
    rec_col_diff: "Variance",
    rec_col_amount: "Amount",
    rec_vs: "Invoice → PO",
    rec_file_title: "Files to compare",
    rec_reason_code: "Code missing in purchase order",
    rec_reason_match: "No remaining PO line",
    rec_reason_extra: "PO line without invoice",
    rec_reason_qty: "Different quantity",
    rec_reason_price: "Different price",
    rec_reason_description: "Different description",
    rec_reason_missing: "Missing value",
    rec_save: "Save",
    rec_clear: "Clear",
    rec_saved: "Saved",
    rec_saved_toast: "Reconciliation saved to the database.",
    rec_clear_toast: "Reconciliation session cleared. History is kept.",
    nav_settings: "Settings",
    nav_archives: "Archives",
    archives_title: "Archives",
    archives_empty: "No locked records.",
    archives_read_only: "Read-only",
    archives_locked_on: "Record locked",
    unlock_card: "Unlock",
    unlocked_ok: "Record unlocked. It is active again on the dashboard.",
    lock_confirm: "Lock this record? It will move to Archives and become read-only.",
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
    extra_custom: "Custom field",
    custom_field_name: "Custom field name…",
    custom_add_btn: "＋ Add",
    extra_need_name: "Please enter a field name.",
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
    cl_link_remove: "Remove link",
    cl_link_add: "Add another link",
    cl_link_add_txt: "+ link",
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
    view_closing: "Closing…",
    view_close_ok: "Saved and view closed.",
    resize_col: "Drag to resize column",
    // --- "Date of creation" column + per-row action menu (EN) ---
    col_created: "Date of creation",
    col_actions: "Actions",
    act_menu: "Actions",
    act_new: "Create new record",
    act_edit: "Edit record",
    act_lock: "Lock record",
    act_unlock: "Unlock record",
    act_history: "Change history",
    act_documents: "Manage attached documents",
    act_detail: "Detailed view",
    act_contact: "Contact stakeholders",
    locked_badge: "Locked",
    lock_on: "Record locked.",
    lock_off: "Record unlocked.",
    history_title: "Change history",
    history_created_by: "Created by",
    history_unknown: "Unknown user",
    history_empty: "No actions recorded.",
    hist_create: "Record created",
    hist_update: "Record updated",
    hist_checklist: "Checklist updated",
    hist_lock: "Record locked",
    hist_unlock: "Record unlocked",
    hist_trash: "Record moved to trash",
    hist_restore: "Record restored",
    hist_document_add: "Document added",
    hist_document_remove: "Document removed",
    hist_other: "Action",
    docs_title: "Attached documents",
    docs_hint: "Select one or more files to upload.",
    docs_empty: "No documents for this record.",
    docs_added: "Document(s) added.",
  docs_removed: "Document removed.",
  docs_close: "Close",
  docs_upload: "Upload",
    detail_title: "Detailed view",
    detail_close: "Close",
    detail_checklist: "Checklist",
    detail_no_checklist: "No tasks.",
    contact_title: "Contact stakeholders",
    contact_close: "Close",
    contact_supplier: "Supplier",
    contact_person: "Contact person",
    contact_email: "Email",
    contact_none: "No contact information available for this supplier.",
    nav_kanban: "Kanban",
    nav_prediction: "Delay prediction",
    nav_analytics: "Supplier performance",
    mod_kanban_title: "Kanban view",
    mod_prediction_title: "Delay prediction",
    mod_analytics_title: "Supplier performance analysis",
    mod_soon: "Module in preparation — coming soon.",
    // --- Dynamic modules (Kanban, prediction, performance) ---
    module_sub_kanban: "Visual tracking of records by import cycle stage.",
    module_sub_prediction: "Heuristic delay-risk estimate computed from live data.",
    module_sub_performance: "On-time rate, progress and document quality per supplier.",
    module_refresh: "Refresh",
    module_updated: "Updated: {at}",
    module_empty: "No data to display at the moment.",
    stage_scheduled: "Scheduled",
    stage_in_transit: "In transit",
    stage_arriving: "Arriving soon",
    stage_arrived: "Arrived (in progress)",
    stage_completed: "Completed",
    kb_card_tasks: "Tasks",
    pred_risk: "Risk",
    pred_level_high: "High",
    pred_level_medium: "Medium",
    pred_level_low: "Low",
    pred_score: "Score",
    pred_delay: "Estimated delay",
    pred_days: "{n} d",
    pred_days_none: "None",
    pred_no_risk: "No delay alert detected.",
    pred_model_note: "Heuristic model based on checklist progress, the ETD/ETA schedule, documents and supplier history.",
    reason_missing_eta: "Missing ETA",
    reason_missing_etd: "Missing ETD",
    reason_missing_doc: "Missing document number",
    reason_behind_schedule: "Behind schedule",
    reason_slightly_behind: "Slightly behind",
    reason_eta_passed: "ETA passed, record incomplete",
    reason_close_eta_incomplete: "Arrival near, checklist incomplete",
    reason_critical_tasks_open: "Critical tasks open",
    reason_supplier_history: "Unfavourable supplier history",
    perf_score: "Score",
    perf_grade: "Grade",
    perf_imports: "Records",
    perf_completed: "Completed",
    perf_on_time: "On-time",
    perf_avg_progress: "Avg. progress",
    perf_avg_delay: "Avg. delay",
    perf_docs: "Documents",
    perf_pallets: "Pallets",
    perf_past_due: "Past-due ETAs",
    perf_na: "N/A",
    perf_legend: "Grade: A ≥ 85, B ≥ 70, C ≥ 50, D < 50.",
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
    chat_q_statistiques: "Statistics",
    chat_q_retards: "Overdue",
    chat_q_alertes: "Alerts",
    chat_q_help: "Help",
    chat_src_internal: "Internal • Database",
    chat_src_external: "Internet • Live sources",
    chat_src_knowledge: "Knowledge base",
    chat_src_system: "System",
    chat_mic: "Dictate with the microphone",
    chat_mic_off: "Microphone unavailable",
    chat_typing: "Thinking…",
    chat_export: "Export conversation",
    chat_upload_doc: "Import a document",
    chat_doc_ok: "Document “{name}” imported and indexed ({n} characters).",
    chat_doc_fail: "Could not import this document.",
    chat_unavailable: "The assistant service is temporarily unavailable. Local answer:\n",
    chat_chart_total: "Total",
    collapse_open: "Expand section",
    collapse_close: "Collapse section",
    rates_title: "Exchange rates",
    rates_unavailable: "Unavailable",
    meco_form_title: "Import tracking form",
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
    meco_reset_confirm: "Clear the current card?",
    meco_new_ok: "Card reset.",
    ingenious_view_title: "INGENIOUS import card",
    ingenious_new: "New",
    ingenious_link_tip: "Link an external resource",
    ingenious_reset_confirm: "Clear the current card?",
    ingenious_new_ok: "Card reset.",

    navita_view_title: "NAVITA import card",
    navita_new: "New",
    navita_reset_confirm: "Clear the current card?",
    navita_new_ok: "Card reset.",
    cl_fac_label: "Fac #",

    micota_view_title: "MICOTA import card",
    micota_new: "New",
    micota_reset_confirm: "Clear the current card?",
    micota_new_ok: "Card reset.",

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
    settings_load_err: "Unable to load settings.",
    sec_fx: "Exchange rates",
    fx_title: "Exchange rates (API)",
    fx_base: "Base currency",
    fx_sync_min: "Sync frequency (minutes)",
    fx_api_key: "API key (optional)",
    fx_key_hint: "If provided, the key is used as the «apikey» parameter; it is stored securely and never shown again.",
    fx_save: "Save configuration",
    fx_live: "Live preview",
    fx_updated: "Last updated: {time}",
    fx_unavailable: "Rates API unavailable — values will show dashes.",
    fx_saved: "Exchange rate configuration saved.",
    rates_manage: "Manage",
    rates_change: "Exchange rates",
    sec_notif: "Notifications",
    notif_title: "Notification preferences",
    notif_email: "Email",
    notif_app: "In-app",
    notif_delays: "Delivery delays",
    notif_locked: "Locked records",
    notif_arrival: "Upcoming arrivals",
    notif_hint: "Preferences are synced to your profile in real time.",
    notif_saved: "Notification preferences saved.",
    sec_data: "Data management",
    data_title: "Backup & restore",
    data_backup: "Download backup",
    data_backup_hint: "Exports a secure archive including the database and documents.",
    data_import: "Restore a backup",
    data_import_hint: "Choose a .zip or .db file generated by the backup feature.",
    data_import_btn: "Restore",
    data_import_confirm: "Restore this backup? The current database will be kept in data/backups before being replaced.",
    data_import_success: "Backup restored ({n} records).",
    data_import_error: "Restore failed: {msg}",
    data_restore_self: "Only administrators can back up or restore data.",
    data_file_required: "Please select a .zip or .db file.",
    backup_file_name: "radisson_backup.zip",
    backup_title: "Automatic backup",
    backup_hint: "Exports the database on a daily schedule and emails it whenever a SMTP account is configured.",
    backup_download_now: "Download ZIP archive",
    backup_run_now: "Generate and email now",
    backup_running: "Generating…",
    backup_done: "Backup generated and emailed.",
    backup_done_local: "Backup generated (email not configured).",
    backup_done_noemail: "Backup generated but email failed: {note}",
    backup_err: "Backup failed: {msg}",
    backup_err_smtp: "SMTP configuration missing or invalid (see Settings / .env)",
    backup_err_network: "Server unreachable ({msg})",
    backup_schedule: "Schedule",
    backup_next: "Next run",
    backup_last: "Last run",
    backup_never: "never",
    backup_last_file: "File",
    backup_email_cfg: "Email",
    backup_email_on: "Configured",
    backup_email_off: "Not configured — local storage only",
    backup_recipient: "Recipient",
    sec_import_cfg: "Import settings",
    imp_title: "Import management",
    imp_incoterm: "Default incoterm",
    imp_delay_tolerance: "Delay tolerance threshold (days)",
    imp_delay_tolerance_hint: "Past this threshold, a record is considered «delayed».",
    imp_email_fr: "Email template (French)",
    imp_email_en: "Email template (English)",
    imp_email_hint: "Available variables: {supplier}, {serial}, {destination}, {eta}.",
    imp_save: "Save parameters",
    imp_saved: "Import parameters saved.",
    // --- Global rich text editor (WYSIWYG) ---
    rte_title: "Rich text editor",
    rte_undo: "Undo",
    rte_redo: "Redo",
    rte_bold: "Bold",
    rte_italic: "Italic",
    rte_strike: "Strikethrough",
    rte_ul: "Bulleted list",
    rte_ol: "Numbered list",
    rte_hr: "Horizontal rule",
    rte_style: "Paragraph style",
    rte_style_p: "Paragraph",
    rte_style_h1: "Heading 1",
    rte_style_h2: "Heading 2",
    rte_style_h3: "Heading 3",
    rte_link: "Insert / edit link",
    rte_link_prompt: "Link address (URL):",
    rte_image: "Insert image",
    rte_image_prompt: "Image address (URL):",
    rte_table: "Insert table",
    rte_upload: "Upload file",
    rte_file_too_big: "File too large (10 MB max) — not attached.",
    rte_more: "Show / hide advanced toolbar",
    rte_align: "Align left",
    rte_center: "Align center",
    rte_right: "Align right",
    rte_fullscreen: "Fullscreen",
    rte_source: "Source code (HTML)",
    rte_placeholder: "Write your content…",
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
  settings: null,
  suppliers: [],
  imports: [],
  attachments: [],
  loading: false,
  search: "",
  supFilter: "",
  sortKey: "fi",
  sortDir: -1,
  collapsed: JSON.parse(localStorage.getItem("si_collapsed") || "{}"),
};

const RATES_LIST = ["CAD", "EUR", "GBP", "CNY", "MXN"];

const MECO_SUPPLIER = "MECO";
const MECO_TASKS = [
  { key: "meco_qc_sampling", fr: "QC-Sampling Requis", en: "QC-Sampling Required" },
  { key: "meco_verified", fr: "Vérifié et Enregistré (Dropbox/Outlook)", en: "Verified and Registered (Dropbox/Outlook)" },
  { key: "meco_update_eta_ns", fr: "Mettre à jour ETA dans NS", en: "Update ETA in NS" },
  { key: "meco_calendar", fr: "Calendrier", en: "Calendar" },
  { key: "meco_customs", fr: "Douanes", en: "Customs" },
  { key: "meco_warehouse", fr: "Entrepôt", en: "Warehouse" },
  { key: "meco_invoice", fr: "Facture commerciale", en: "Commercial invoice" },
  { key: "meco_bol_bourassa", fr: "BOL Bourassa", en: "BOL Bourassa" },
];

// Registre des fiches fournisseurs rendues dynamiquement dans le tableau de bord.
// Chaque vue fournisseur (draft persisté, ordre des tâches, libellés bilingues,
// commentaires par défaut) est conservée à l'identique : seule la surface de rendu
// change (modale centralisée au lieu d'une page dédiée).
// Renommage: NATIVA -> NAVITA et GIOLONG-B -> MICOTA (l'ancien MICOTA est supprimé).
// La fiche MICOTA ci-dessous pointe donc vers la structure historique de GIOLONG-B,
// dont les clés de tâches `giolong_*` ont été migrées vers `micota_*`.
const SHEET_SUPPLIERS = {
  MECO: "meco",
  INGENIOUS: "ingenious",
  NAVITA: "navita",
  "MICOTA": "micota",
};

function sheetTasksFromView(def) {
  if (!def) return [];
  return (def.order || []).map((k) => {
    const info = (def.info && def.info[k]) || {};
    return {
      key: k,
      fr: info.fr || k,
      en: info.en || k,
      defComment: info.defComment || "",
    };
  });
}

function sheetDefForName(name) {
  const n = String(name || "").trim().toUpperCase();
  if (n === "MECO") return { supName: "MECO", tasks: MECO_TASKS };
  const key = SHEET_SUPPLIERS[n];
  if (!key || !VIEW_DEFS[key]) return null;
  return { supName: n, tasks: sheetTasksFromView(VIEW_DEFS[key]) };
}

function sheetDefFromSelect(m) {
  const sel = m.querySelector("#card-supplier");
  const opt = sel && sel.selectedOptions && sel.selectedOptions[0];
  return sheetDefForName(opt ? opt.textContent.trim() : "");
}

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

/* Reference d'arrivee pour TOUS les calculs de delais/retards : ETA DEST par
   defaut, repli sur ETA historique (fiches anciennes sans ETA DEST) pour ne
   jamais perdre l'etat de retard existant. */
function arrivalRef(row) {
  const r = row || {};
  const dest = String(r.eta_dest || "").trim();
  const legacy = String(r.eta || "").trim();
  const van = String(r.eta_van || "").trim();
  return dest || legacy || van || null;
}

function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
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
    downloadBlob(blob, t("export_xlsx_name"));
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
  // Les 4 fournisseurs (MECO, INGENIOUS, NAVITA, MICOTA) ne sont plus des pages :
  // leur icône ouvre uniquement la fiche de création pré-remplie (modale), le
  // tableau de bord restant le hub. MICOTA correspond à l'ancien GIOLONG-B.
  const items = [
    ["dashboard", t("nav_dashboard"), "▦", "nav"],
    ["suppliers", t("nav_suppliers"), "🏭", "nav"],
    ["imports", t("nav_imports"), "📦", "new-import-global"],
    ["MECO", t("nav_meco"), "🚛", "supplier-new"],
    ["INGENIOUS", "INGENIOUS", "🧭", "supplier-new"],
    ["NAVITA", "NAVITA", "🚢", "supplier-new"],
    ["MICOTA", "MICOTA", "🚚", "supplier-new"],
    ["kanban", t("nav_kanban"), "🗂", "nav"],
    ["prediction", t("nav_prediction"), "⏱", "nav"],
    ["analytics", t("nav_analytics"), "📊", "nav"],
    ["backup", t("nav_backup"), "💾", "backup-open"],
    ["reconcile", t("nav_reconcile"), "⚖️", "nav"],
    ["archives", t("nav_archives"), "🗄", "nav"],
    ["trash", t("nav_trash"), "🗑", "nav"],
    ["settings", t("nav_settings"), "⚙", "nav"],
  ];
  const active = routeName();
  return items
    .map(([k, lbl, ico, act]) => {
      if (act === "nav") {
        return `<button class="nav-item ${active === k ? "active" : ""}" data-act="nav" data-nav="${k}">
      <span class="ico">${ico}</span><span>${esc(lbl)}</span></button>`;
      }
      if (act === "new-import-global") {
        return `<button class="nav-item" data-act="new-import-global" title="${esc(t("new_card"))}">
      <span class="ico">${ico}</span><span>${esc(lbl)}</span></button>`;
      }
      if (act === "backup-open") {
        return `<button class="nav-item" data-act="backup-open" data-nav="${k}" title="${esc(t("backup_title"))}">
      <span class="ico">${ico}</span><span>${esc(lbl)}</span></button>`;
      }
      return `<button class="nav-item" data-act="supplier-new" data-sup="${esc(k)}" title="${esc(t("new_card"))}">
      <span class="ico">${ico}</span><span>${esc(lbl)}</span></button>`;
    })
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
  const d = daysUntil(arrivalRef(row));
  if (d === null) return '<span class="badge na">—</span>';
  if (d < 0) return `<span class="badge progress">${esc(t("overdue"))} ${Math.abs(d)} j</span>`;
  if (d <= 7) return `<span class="badge progress">${esc(t("arrivals_soon"))} ${d} j</span>`;
  return `<span class="badge done">${d} ${state.lang === "fr" ? "j" : "d"}</span>`;
}

function importRows(rows, showSupplier, opts) {
  opts = opts || {};
  const colCount = importCols(showSupplier, opts).length;
  if (!rows.length) return `<tr><td colspan="${colCount}" class="empty">${esc(t("no_data"))}</td></tr>`;
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
    return `<tr data-act="open-import" data-id="${r.id}" class="clickable${r.locked ? " locked" : ""}">
      <td class="num-md">${r.serial ? esc(r.serial) : "—"}${r.locked ? ` <span class="lock-ico" title="${esc(t("locked_badge"))}">🔒</span>` : ""}</td>
      ${opts.created ? `<td class="num-md row-created">${fmtDate(String(r.created_at || "").slice(0, 10))}</td>` : ""}
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
      ${opts.actions ? rowActionsCell(r) : ""}
    </tr>`;
  }).join("");
}

/* Menu d'actions contextuel a l'extreme droite de chaque ligne. Les actions sont
   gerees par le delegue de clic global (data-act="row-*"). */
function rowActionsCell(r) {
  return `<td class="row-actions" data-col="actions">
    <button type="button" class="icon-btn row-actions-btn" data-act="row-menu" data-id="${r.id}" title="${esc(t("act_menu"))}" aria-haspopup="true">⋯</button>
    <div class="row-actions-menu" hidden>
      <button type="button" data-act="row-new" data-id="${r.id}"><span class="ra-ico">＋</span>${esc(t("act_new"))}</button>
      <button type="button" data-act="row-edit" data-id="${r.id}"><span class="ra-ico">✎</span>${esc(t("act_edit"))}</button>
      <button type="button" data-act="row-lock" data-id="${r.id}"><span class="ra-ico">${r.locked ? "🔓" : "🔒"}</span>${esc(r.locked ? t("act_unlock") : t("act_lock"))}</button>
      <button type="button" data-act="row-history" data-id="${r.id}"><span class="ra-ico">🕘</span>${esc(t("act_history"))}</button>
      <button type="button" data-act="row-documents" data-id="${r.id}"><span class="ra-ico">📎</span>${esc(t("act_documents"))}</button>
      <button type="button" data-act="row-detail" data-id="${r.id}"><span class="ra-ico">🔍</span>${esc(t("act_detail"))}</button>
      <button type="button" data-act="row-contact" data-id="${r.id}"><span class="ra-ico">✉</span>${esc(t("act_contact"))}</button>
    </div>
  </td>`;
}

/* --- Tableau de bord : colonnes (largeurs par defaut en %, somme = 100).
   L'ordre reproduit les colonnes existantes, avec la « Date de creation »
   immediatement apres « N° FI » et le menu d'actions a l'extreme droite :
   N° FI, Date de creation, Fournisseur, Destination, PO/INBSIP, N° Document,
   Nb de palettes, Transitaire/BOL, Conteneur, ETD, ETA, Liste de verification,
   Actions. */
const IMPORT_COLS = [
  { key: "fi", label: "field_fi", sort: true, w: 6 },
  { key: "created", label: "col_created", w: 9 },
  { key: "supplier", label: "supplier", w: 9 },
  { key: "destination", label: "field_destination", w: 9 },
  { key: "po", label: "field_po", w: 8 },
  { key: "doc", label: "field_doc", w: 7 },
  { key: "pallets", label: "field_pallets", w: 5 },
  { key: "bol", label: "field_bol", w: 9 },
  { key: "container", label: "field_container", w: 8 },
  { key: "etd", label: "field_etd", sort: true, w: 7 },
  { key: "eta", label: "field_eta", sort: true, w: 9 },
  { key: "checklist", label: "checklist", w: 7 },
  { key: "actions", label: "col_actions", w: 7 },
];

/* Largeurs personnalisees (en %), conservees d'une session a l'autre. */
function colWidths() {
  if (!state.colWidths) {
    try { state.colWidths = JSON.parse(localStorage.getItem("si_importColWidths") || "{}") || {}; }
    catch (e) { state.colWidths = {}; }
  }
  return state.colWidths;
}
function saveColWidths() {
  try { localStorage.setItem("si_importColWidths", JSON.stringify(state.colWidths || {})); } catch (e) { /* stockage indisponible */ }
}
/* opts: { created: bool, actions: bool } — la colonne Fournisseur suit showSupplier. */
function importCols(showSupplier, opts) {
  opts = opts || {};
  return IMPORT_COLS.filter((c) => {
    if (c.key === "supplier") return !!showSupplier;
    if (c.key === "created") return !!opts.created;
    if (c.key === "actions") return !!opts.actions;
    return true;
  });
}
function importColgroup(showSupplier, opts) {
  const w = colWidths();
  const list = importCols(showSupplier, opts);
  const raw = list.map((c) => (w[c.key] != null ? w[c.key] : c.w));
  const total = raw.reduce((a, b) => a + b, 0) || 1;
  return "<colgroup>" + list.map((c, i) => {
    const pct = (raw[i] / total) * 100;
    return `<col data-col="${c.key}" style="width:${pct.toFixed(4)}%">`;
  }).join("") + "</colgroup>";
}

function importTableHead(showSupplier, resizable, opts) {
  opts = opts || {};
  const ths = importCols(showSupplier, opts).map((c) => {
    const active = (state.sortKey || "fi") === c.key;
    const arrow = active ? (state.sortDir === -1 ? "▾" : "▴") : "↕";
    const cls = `th-col${c.sort ? " sortable" : ""}${active ? " active" : ""}${resizable ? " resizable" : ""}`;
    const inner = c.sort
      ? `<button type="button" class="sort-btn" data-act="sort-imports" data-key="${c.key}"><span>${esc(t(c.label))}</span><span class="sort-arrow">${arrow}</span></button>`
      : esc(t(c.label));
    const handle = resizable ? `<span class="col-resizer" data-col="${c.key}" title="${esc(t("resize_col"))}"></span>` : "";
    return `<th class="${cls}" data-col="${c.key}">${inner}${handle}</th>`;
  });
  return `<tr>${ths.join("")}</tr>`;
}

/* Redimensionnement des colonnes (glisser le bord droit d'un en-tete). Deux
   colonnes voisines se partagent la largeur : la somme reste 100 %, donc la
   table continue de remplir la largeur de l'ecran sans scroll horizontal. */
function startColResize(e) {
  const handle = e.target.closest(".col-resizer");
  if (!handle) return false;
  const table = handle.closest("table");
  const ths = table ? Array.from(table.querySelectorAll("thead th[data-col]")) : [];
  if (!table || ths.length < 2) return false;
  const keys = ths.map((h) => h.dataset.col);
  const key = handle.dataset.col;
  const idx = keys.indexOf(key);
  if (idx === -1) return false;
  const nbIdx = idx < keys.length - 1 ? idx + 1 : idx - 1;
  const nbKey = keys[nbIdx];
  const tableW = table.getBoundingClientRect().width || 1;
  const startPx = {};
  ths.forEach((h) => { startPx[h.dataset.col] = h.getBoundingClientRect().width; });
  const combined = startPx[key] + startPx[nbKey];
  const startX = e.clientX;
  const pct = {};
  keys.forEach((k) => { pct[k] = (startPx[k] / tableW) * 100; });
  const minPx = 40;
  const onMove = (ev) => {
    let a = startPx[key] + (ev.clientX - startX);
    a = Math.max(minPx, Math.min(combined - minPx, a));
    pct[key] = (a / tableW) * 100;
    pct[nbKey] = ((combined - a) / tableW) * 100;
    keys.forEach((k) => {
      const col = table.querySelector(`col[data-col="${k}"]`);
      if (col) col.style.width = pct[k] + "%";
    });
  };
  const onUp = () => {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
    document.body.classList.remove("col-resizing");
    state.colWidths = Object.assign({}, colWidths(), pct);
    saveColWidths();
  };
  document.body.classList.add("col-resizing");
  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onUp);
  e.preventDefault();
  e.stopPropagation();
  return true;
}

/* ------------------------------------------------- actions par ligne (menu) */
/* Menu contextuel du tableau de bord : creation, edition, verrouillage (persiste
   en base via /api/imports/:id/lock), historique, documents, vue detaillee,
   contact des intervenants. Chaque action est journalisee cote serveur. */

function importById(id) {
  return (state.imports || []).find((x) => String(x.id) === String(id));
}

function closeRowMenus(except) {
  document.querySelectorAll(".row-actions-menu:not([hidden])").forEach((menu) => {
    if (menu !== except) menu.hidden = true;
  });
}

function fmtDateTime(v) {
  if (!v) return "";
  const s = String(v);
  const d = s.slice(0, 10);
  const tm = s.length > 10 ? s.slice(11, 16) : "";
  return tm ? `${fmtDate(d)} ${tm}` : fmtDate(d);
}

function histLabel(action) {
  const map = {
    create: "hist_create", update: "hist_update", checklist: "hist_checklist",
    lock: "hist_lock", unlock: "hist_unlock", trash: "hist_trash",
    restore: "hist_restore", document_add: "hist_document_add",
    document_remove: "hist_document_remove",
  };
  return t(map[action] || "hist_other");
}

async function openImportById(id) {
  const row = importById(id);
  if (!row) return;
  try {
    const det = await api("/api/imports/" + id);
    state.clChecklist = (det.checklist || [])
      .map((c, i) => Object.assign({}, c, { position: i }))
      .sort((a, b) => a.position - b.position);
    state.attachments = det.attachments || [];
    await openImportModal(det.import);
  } catch (err) { /* ignore */ }
}

async function toggleImportLock(id) {
  const row = importById(id);
  try {
    const res = await api("/api/imports/" + id + "/lock", "PUT", { locked: !(row && row.locked) });
    if (row) row.locked = res.locked ? 1 : 0;
    toast(res.locked ? t("lock_on") : t("lock_off"));
    if ((location.hash || "#/dashboard").replace(/^#\//, "") === "dashboard") renderDashboard();
  } catch (e) {
    toast(t("save_err", { msg: e.message }));
  }
}

async function openHistoryModal(id) {
  try {
    const h = await api("/api/imports/" + id + "/history");
  const row = importById(id);
  const who = (h.created_by && (h.created_by.display_name || h.created_by.username)) || t("history_unknown");
  const events = h.events || [];
  const list = events.length
    ? events.map((ev) => {
        const name = ev.display_name || ev.username || t("history_unknown");
        return `<li class="hist-row">
          <span class="hist-dot"></span>
          <div class="hist-body">
            <div class="hist-top"><span class="hist-action">${esc(histLabel(ev.action))}</span>${ev.detail ? ` <span class="hist-detail">${esc(ev.detail)}</span>` : ""}</div>
            <div class="hist-meta">${esc(name)} · ${esc(fmtDateTime(ev.created_at))}</div>
          </div>
        </li>`;
      }).join("")
    : `<li class="empty-row">${esc(t("history_empty"))}</li>`;
  openModal(`
    <div class="modal-h"><span class="modal-h-title">${esc(t("history_title"))}${row && row.serial ? `<span class="serial-tag">${esc(row.serial)}</span>` : ""}</span></div>
    <div class="modal-b">
      <div class="hist-head"><span class="hist-lbl">${esc(t("history_created_by"))}</span>
        <span class="hist-creator">${esc(who)}</span>
        ${h.created_at ? `<span class="hist-meta">· ${esc(fmtDateTime(h.created_at))}</span>` : ""}</div>
      <ul class="hist-list">${list}</ul>
    </div>
    <div class="modal-f"><button class="btn ghost" data-act="close-modal">${esc(t("docs_close"))}</button></div>`, true);
  } catch (e) {
    toast(t("save_err", { msg: e.message }));
  }
}

async function openDocumentsModal(id) {
  const row = importById(id);
  try {
    const det = await api("/api/imports/" + id);
    state.attachments = det.attachments || [];
  } catch (e) {
    state.attachments = (state.attachments || []);
  }
  const m = openModal(`
    <div class="modal-h"><span class="modal-h-title">${esc(t("docs_title"))}${row && row.serial ? `<span class="serial-tag">${esc(row.serial)}</span>` : ""}</span></div>
    <div class="modal-b">
      <p class="muted small">${esc(t("docs_hint"))}</p>
      <input type="file" id="docs-file" multiple hidden>
      <div class="docs-toolbar"><button type="button" class="btn small" data-act="docs-upload">⬆ ${esc(t("docs_upload"))}</button></div>
      <ul id="docs-list" class="att-list">${attListHTML(state.attachments)}</ul>
    </div>
    <div class="modal-f"><button class="btn ghost" data-act="close-modal">${esc(t("docs_close"))}</button></div>`, true);
  m.addEventListener("click", async (e) => {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    if (b.dataset.act === "docs-upload") {
      const input = m.querySelector("#docs-file");
      if (input) input.click();
    } else if (b.dataset.act === "att-delete") {
      try {
        const res = await api("/api/imports/" + id + "/attachments/" + b.dataset.attid, "DELETE");
        state.attachments = res.attachments || [];
        m.querySelector("#docs-list").innerHTML = attListHTML(state.attachments);
        toast(t("docs_removed"));
      } catch (err) { toast(t("save_err", { msg: err.message })); }
    }
  });
  m.addEventListener("change", async (e) => {
    if (!e.target || e.target.id !== "docs-file" || !e.target.files) return;
    const files = e.target.files; e.target.value = "";
    for (const file of files) {
      const ext = "." + String(file.name.split(".").pop() || "").toLowerCase();
      if (!ATT_EXTS.includes(ext)) { toast(t("att_bad_type")); continue; }
      const fd = new FormData();
      fd.append("file", file, file.name);
      try {
        const res = await api("/api/imports/" + id + "/attachments", "POST", fd);
        state.attachments = res.attachments || [];
        m.querySelector("#docs-list").innerHTML = attListHTML(state.attachments);
        toast(t("docs_added"));
      } catch (err) { toast(t("att_bad_type")); }
    }
  });
}

async function openDetailModal(id) {
  let det;
  try { det = await api("/api/imports/" + id); }
  catch (e) { return toast(t("save_err", { msg: e.message })); }
  const r = det.import || {};
  const cl = det.checklist || [];
  const F = [
    ["field_fi", r.serial], ["col_created", fmtDateTime(r.created_at)], ["supplier", r.supplier_name],
    ["field_destination", r.destination], ["field_po_number", r.po_number], ["field_inbsip", r.inbsip],
    ["field_doc", r.doc_number], ["field_pallets", r.pallets], ["field_bol", r.transitaire_bol],
    ["field_container", r.container], ["field_etd", r.etd ? fmtDate(r.etd) : ""], ["field_eta", r.eta ? fmtDate(r.eta) : ""],
    ["field_notes", r.notes],
  ];
  const rowsHTML = F.map(([k, v]) => {
    const rich = k === "field_notes" && v != null && String(v).trim() !== "";
    const val = v == null || String(v).trim() === "" ? "—" : (rich ? sanitizeRTEHTML(v) : esc(v));
    return `<div class="detail-row"><span class="detail-k">${esc(t(k))}</span><span class="detail-v${rich ? " detail-v-rich" : ""}">${val}</span></div>`;
  }).join("");
  const clHTML = cl.length
    ? cl.map((c) => `<li class="detail-cl">${badge(c.status)} <span class="detail-cl-label">${esc(activeLabel(c))}</span></li>`).join("")
    : `<li class="empty-row">${esc(t("detail_no_checklist"))}</li>`;
  openModal(`
    <div class="modal-h"><span class="modal-h-title">${esc(t("detail_title"))}${r.serial ? `<span class="serial-tag">${esc(r.serial)}</span>` : ""}</span></div>
    <div class="modal-b">
      <div class="detail-grid">${rowsHTML}</div>
      <div class="section-tag sec-gap">${esc(t("detail_checklist"))}</div>
      <ul class="detail-cl-list">${clHTML}</ul>
    </div>
    <div class="modal-f"><button class="btn ghost" data-act="close-modal">${esc(t("detail_close"))}</button></div>`, true);
}

function openContactModal(id) {
  const row = importById(id);
  const sup = row && (state.suppliers || []).find((s) => String(s.id) === String(row.supplier_id));
  if (!sup) { toast(t("contact_none")); return; }
  const items = [
    ["contact_supplier", sup.name],
    ["contact_person", sup.contact],
    ["contact_email", sup.email],
  ].filter(([, v]) => v);
  const body = items.length
    ? `<div class="detail-grid">${items.map(([k, v]) => {
        const val = k === "contact_email"
          ? `<a href="mailto:${esc(v)}">${esc(v)}</a>`
          : esc(v);
        return `<div class="detail-row"><span class="detail-k">${esc(t(k))}</span><span class="detail-v">${val}</span></div>`;
      }).join("")}</div>`
    : `<p class="empty">${esc(t("contact_none"))}</p>`;
  openModal(`
    <div class="modal-h"><span class="modal-h-title">${esc(t("contact_title"))}${row && row.serial ? `<span class="serial-tag">${esc(row.serial)}</span>` : ""}</span></div>
    <div class="modal-b">${body}</div>
    <div class="modal-f"><button class="btn ghost" data-act="close-modal">${esc(t("contact_close"))}</button></div>`, true);
}

/* ------------------------------- modules dynamiques (Kanban, prediction,
   performance fournisseurs). Chaque vue interroge son point d'API dedie et
   reste synchronisee en temps reel (rechargement automatique + bouton
   « Rafraichir »). Aucune vue statique n'est conservee. */

let moduleTimer = null;
let moduleRefreshFn = null;

function stopModuleAutoRefresh() {
  if (moduleTimer) { clearInterval(moduleTimer); moduleTimer = null; }
}

/* Programme un rafraichissement periodique tant que l'on reste sur la vue. */
function moduleAutoRefresh(run) {
  stopModuleAutoRefresh();
  moduleTimer = setInterval(() => {
    const page = routeName();
    if (!state.authed || ["kanban", "prediction", "analytics"].indexOf(page) === -1) {
      stopModuleAutoRefresh();
      return;
    }
    if (document.getElementById("modal-root").innerHTML) return;
    run();
  }, 45000);
}

function moduleHeader(titleKey, subKey, generatedAt) {
  return `<div class="module-head">
    <div>
      <h2 class="page-title">${esc(t(titleKey))}</h2>
      <p class="module-sub">${esc(t(subKey))}</p>
    </div>
    <div class="module-actions">
      ${generatedAt ? `<span class="module-updated">${esc(t("module_updated", { at: fmtDateTime(generatedAt) }))}</span>` : ""}
      <button class="btn small ghost" data-act="module-refresh">⟳ ${esc(t("module_refresh"))}</button>
    </div>
  </div>`;
}

function renderModuleError(titleKey, err) {
  const inner = `<h2 class="page-title">${esc(t(titleKey))}</h2>
    <div class="panel"><div class="empty">${esc((err && err.message) || "error")}</div></div>`;
  document.getElementById("app").innerHTML = shell(t(titleKey), inner);
}

/* --- Kanban --- */
function kanbanCardHTML(it) {
  const prog = it.total ? Math.round((it.done / it.total) * 100) : 0;
  return `<div class="kb-card clickable" data-act="open-import" data-id="${it.id}">
    <div class="kb-card-top">
      <span class="kb-serial">${esc(it.serial || "—")}</span>
      ${it.locked ? `<span class="lock-ico" title="${esc(t("locked_badge"))}">🔒</span>` : ""}
    </div>
    <div class="kb-card-dest">${esc(it.destination || "—")}</div>
    <div class="kb-card-sup">${esc(it.supplier_name || "")}</div>
    <div class="kb-card-meta">
      <span>${esc(t("field_eta"))} · ${fmtDate(it.eta)}</span>
      <span>${it.total ? `${it.done}/${it.total}` : "—"}</span>
    </div>
    <div class="kb-bar"><i style="width:${prog}%"></i></div>
  </div>`;
}

async function renderKanban() {
  let data;
  try { data = await api("/api/kanban"); }
  catch (e) { return renderModuleError("mod_kanban_title", e); }
  const cols = (data.stages || []).map((s) => {
    const cards = (s.imports || []).map(kanbanCardHTML).join("");
    return `<div class="kb-col" data-stage="${s.key}">
      <div class="kb-col-h">
        <span class="kb-col-title">${esc(t("stage_" + s.key))}</span>
        <span class="kb-col-count">${s.count}</span>
      </div>
      <div class="kb-col-body">${cards || `<div class="kb-empty">${esc(t("module_empty"))}</div>`}</div>
    </div>`;
  }).join("");
  const inner = moduleHeader("mod_kanban_title", "module_sub_kanban", data.generated_at) +
    `<div class="kb-board">${cols}</div>`;
  document.getElementById("app").innerHTML = shell(t("nav_kanban"), inner);
  moduleRefreshFn = renderKanban;
  moduleAutoRefresh(renderKanban);
}

/* --- Prediction des retards --- */
function riskBadge(level) {
  const key = { high: "pred_level_high", medium: "pred_level_medium", low: "pred_level_low" }[level] || "pred_level_low";
  return `<span class="badge risk-${esc(level)}">${esc(t(key))}</span>`;
}

function scoreBar(score, level) {
  const cls = level || (score >= 85 ? "A" : score >= 70 ? "B" : score >= 50 ? "C" : "D");
  return `<div class="risk-score"><div class="risk-score-bar"><i class="lvl-${esc(cls)}" style="width:${Math.max(0, Math.min(100, score))}%"></i></div><span>${score}</span></div>`;
}

async function renderPrediction() {
  let data;
  try { data = await api("/api/prediction"); }
  catch (e) { return renderModuleError("mod_prediction_title", e); }
  const sm = data.summary || {};
  const items = data.items || [];
  const cards = `<div class="stat-grid">
    <div class="stat-card risk-high"><div class="num">${sm.high || 0}</div><div class="lbl">${esc(t("pred_level_high"))}</div></div>
    <div class="stat-card risk-medium"><div class="num">${sm.medium || 0}</div><div class="lbl">${esc(t("pred_level_medium"))}</div></div>
    <div class="stat-card risk-low"><div class="num">${sm.low || 0}</div><div class="lbl">${esc(t("pred_level_low"))}</div></div>
    <div class="stat-card"><div class="num">${sm.avg_delay_days || 0}</div><div class="lbl">${esc(t("pred_delay"))}</div></div>
  </div>`;
  const rows = items.length ? items.map((it) => `<tr class="risk-row-${esc(it.risk_level)}">
      <td class="num-md">${esc(it.serial || "—")}${it.locked ? ` <span class="lock-ico">🔒</span>` : ""}</td>
      <td>${esc(it.supplier_name || "")}</td>
      <td>${esc(it.destination || "")}</td>
      <td>${fmtDate(it.eta)}</td>
      <td class="num-md">${it.total ? `${it.done}/${it.total}` : "—"}</td>
      <td>${riskBadge(it.risk_level)}</td>
      <td>${scoreBar(it.risk_score, it.risk_level)}</td>
      <td>${it.predicted_delay_days ? esc(t("pred_days", { n: it.predicted_delay_days })) : esc(t("pred_days_none"))}</td>
      <td>${(it.reasons || []).map((r) => `<span class="reason-chip">${esc(t("reason_" + r))}</span>`).join("") || `<span class="muted small">${esc(t("pred_no_risk"))}</span>`}</td>
    </tr>`).join("") : `<tr><td colspan="9" class="empty">${esc(t("module_empty"))}</td></tr>`;
  const inner = moduleHeader("mod_prediction_title", "module_sub_prediction", data.generated_at) + cards +
    `<div class="panel">
      <div class="table-wrap fluid"><table class="tbl module-table">
        <thead><tr>
          <th>${esc(t("field_fi"))}</th><th>${esc(t("supplier"))}</th><th>${esc(t("field_destination"))}</th>
          <th>${esc(t("field_eta"))}</th><th>${esc(t("checklist"))}</th><th>${esc(t("pred_risk"))}</th>
          <th>${esc(t("pred_score"))}</th><th>${esc(t("pred_delay"))}</th><th>${esc(t("pred_model_note"))}</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>
    <p class="module-note">${esc(t("pred_model_note"))}</p>`;
  document.getElementById("app").innerHTML = shell(t("nav_prediction"), inner);
  moduleRefreshFn = renderPrediction;
  moduleAutoRefresh(renderPrediction);
}

/* --- Performance fournisseurs --- */
async function renderAnalytics() {
  let data;
  try { data = await api("/api/performance"); }
  catch (e) { return renderModuleError("mod_analytics_title", e); }
  const list = data.suppliers || [];
  const rows = list.length ? list.map((s, i) => `<tr>
      <td class="num-md">${i + 1}</td>
      <td><a class="row-link" data-act="noop" href="#/supplier/${s.supplier_id}">${esc(s.name || "")}</a></td>
      <td><span class="grade grade-${esc(s.grade)}">${esc(s.grade)}</span></td>
      <td>${scoreBar(s.score)}</td>
      <td class="num-md">${s.imports}</td>
      <td class="num-md">${s.completed}</td>
      <td>${s.on_time_rate == null ? esc(t("perf_na")) : esc(s.on_time_rate) + "%"}</td>
      <td>${esc(s.avg_progress)}%</td>
      <td>${esc(s.avg_delay_days)}</td>
      <td>${esc(s.docs_rate)}%</td>
      <td class="num-md">${s.pallets}</td>
    </tr>`).join("") : `<tr><td colspan="11" class="empty">${esc(t("module_empty"))}</td></tr>`;
  const inner = moduleHeader("mod_analytics_title", "module_sub_performance", data.generated_at) +
    `<div class="panel">
      <div class="table-wrap fluid"><table class="tbl module-table">
        <thead><tr>
          <th>#</th><th>${esc(t("supplier"))}</th><th>${esc(t("perf_grade"))}</th><th>${esc(t("perf_score"))}</th>
          <th>${esc(t("perf_imports"))}</th><th>${esc(t("perf_completed"))}</th><th>${esc(t("perf_on_time"))}</th>
          <th>${esc(t("perf_avg_progress"))}</th><th>${esc(t("perf_avg_delay"))}</th><th>${esc(t("perf_docs"))}</th>
          <th>${esc(t("perf_pallets"))}</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>
    <p class="module-note">${esc(t("perf_legend"))}</p>`;
  document.getElementById("app").innerHTML = shell(t("nav_analytics"), inner);
  moduleRefreshFn = renderAnalytics;
  moduleAutoRefresh(renderAnalytics);
}

/* ---------------------------------------------------------------- router */

/* --- Reconciliation facture / bon de commande --- */
function recNum(v) {
  if (v == null) return "—";
  return v.toLocaleString(state.lang === "fr" ? "fr-CA" : "en-CA", {
    maximumFractionDigits: 4,
  });
}

function recMoney(v) {
  if (v == null) return "—";
  return v.toLocaleString(state.lang === "fr" ? "fr-CA" : "en-CA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}

function recSigned(v) {
  if (v == null) return "—";
  return (v > 0 ? "+" : "") + recMoney(v);
}

function recDiffHTML(r) {
  const parts = [];
  if (r.diff_qty != null) parts.push("Q " + (r.diff_qty > 0 ? "+" : "") + recNum(r.diff_qty));
  if (r.diff_price != null) parts.push("P " + (r.diff_price > 0 ? "+" : "") + recMoney(r.diff_price));
  return parts.join(" · ") || "—";
}

function recPaired(inv, po) {
  const a = inv == null ? "—" : recNum(inv);
  const b = po == null ? "—" : recNum(po);
  return `${a}<i class="rec-arrow">→</i>${b}`;
}

function recPairedMoney(inv, po) {
  const a = inv == null ? "—" : recMoney(inv);
  const b = po == null ? "—" : recMoney(po);
  return `${a}<i class="rec-arrow">→</i>${b}`;
}

function recRowHTML(r) {
  const badge = r.status === "oui"
    ? `<span class="rec-badge oui">oui</span>`
    : `<span class="rec-badge neuf">neuf</span>`;
  const reason = r.reason
    ? `<span class="reason-chip rec-reason">${esc(t("rec_reason_" + r.reason))}</span>`
    : "—";
  return `<tr class="rec-row-${r.status}">
    <td class="num-md">${esc(r.code || "—")}</td>
    <td>${esc(r.inv_desc || r.po_desc || "—")}</td>
    <td class="num-md">${recPaired(r.inv_qty, r.po_qty)}</td>
    <td class="num-md">${recPairedMoney(r.inv_price, r.po_price)}</td>
    <td>${badge}</td>
    <td>${reason}</td>
    <td class="num-md">${recDiffHTML(r)}</td>
  </tr>`;
}

function reconcileForm() {
  return `<div class="panel">
    <h3 class="panel-title">${esc(t("rec_file_title"))}</h3>
    <form id="rec-form" class="rec-form">
      <div class="rec-fields">
        <div class="rec-field">
          <label for="rec-invoice">${esc(t("rec_invoice_label"))}</label>
          <input type="file" id="rec-invoice" accept=".xlsx,.xls,.csv">
        </div>
        <div class="rec-field">
          <label for="rec-po">${esc(t("rec_po_label"))}</label>
          <input type="file" id="rec-po" accept=".xlsx,.xls,.csv">
        </div>
      </div>
      <p class="rec-hint">${esc(t("rec_upload_hint"))}</p>
      <button type="button" class="btn" id="rec-go" data-act="rec-go">⚖️ ${esc(t("rec_btn"))}</button>
    </form>
  </div>`;
}

function recStatusCard(n, lbl, cls) {
  return `<div class="stat-card ${cls}"><div class="num">${n}</div><div class="lbl">${esc(lbl)}</div></div>`;
}

function reconcileReport(res) {
  const stats = res.stats || {};
  const cards = `<div class="stat-grid">
    ${recStatusCard(stats.invoice_lines || 0, t("rec_stats_inv"), "")}
    ${recStatusCard(stats.po_lines || 0, t("rec_stats_po"), "")}
    ${recStatusCard(stats.oui || 0, t("rec_stats_ok"), "ouicard")}
    ${recStatusCard(stats.neuf || 0, t("rec_stats_bad"), "neufcard")}
    ${recStatusCard((stats.rate != null ? stats.rate : 0) + "%", t("rec_rate"), "")}
  </div>`;
  const okRows = (res.rows || []).filter((r) => r.status === "oui");
  const badRows = (res.rows || []).filter((r) => r.status !== "oui");
  const okBody = okRows.length
    ? okRows.map(recRowHTML).join("")
    : `<tr><td colspan="7" class="empty">${esc(t("module_empty"))}</td></tr>`;
  const badBody = badRows.length
    ? badRows.map(recRowHTML).join("")
    : `<tr><td colspan="7" class="empty">${esc(t("module_empty"))}</td></tr>`;
  const th = `<th>${esc(t("rec_col_code"))}</th><th>${esc(t("rec_col_desc"))}</th>
    <th>${esc(t("rec_col_qty"))}</th><th>${esc(t("rec_col_price"))}</th>
    <th>${esc(t("rec_col_status"))}</th><th>${esc(t("rec_col_reason"))}</th><th>${esc(t("rec_col_diff"))}</th>`;
  let pivot = "";
  if ((res.pivot || []).length) {
    const pv = res.pivot.map((p) => `<tr class="rec-row-${p.status}">
      <td class="num-md">${esc(p.code)}</td>
      <td class="num-md">${recPaired(p.inv_qty, p.po_qty)}</td>
      <td class="num-md">${recPairedMoney(p.inv_amount, p.po_amount)}</td>
      <td>${p.status === "oui" ? `<span class="rec-badge oui">oui</span>` : `<span class="rec-badge neuf">neuf</span>`}</td>
    </tr>`).join("");
    pivot = `<div class="panel rec-pivot">
      <h3 class="panel-title">${esc(t("rec_section_pivot"))}</h3>
      <div class="table-wrap fluid"><table class="tbl module-table">
        <thead><tr><th>${esc(t("rec_col_code"))}</th>
          <th>${esc(t("rec_col_qty"))} <span class="rec-vs">(${esc(t("rec_vs"))})</span></th>
          <th>${esc(t("rec_col_amount"))} <span class="rec-vs">(${esc(t("rec_vs"))})</span></th>
          <th>${esc(t("rec_col_status"))}</th></tr></thead>
        <tbody>${pv}</tbody>
      </table></div>
    </div>`;
  }
  return `<div class="rec-report">
    <div class="panel">${cards}</div>
    <div class="panel">
      <h3 class="panel-title">${esc(t("rec_section_ok"))} <span class="rec-count ok">${okRows.length}</span></h3>
      <div class="table-wrap fluid"><table class="tbl module-table">
        <thead><tr>${th}</tr></thead><tbody>${okBody}</tbody>
      </table></div>
    </div>
    <div class="panel">
      <h3 class="panel-title">${esc(t("rec_section_bad"))} <span class="rec-count bad">${badRows.length}</span></h3>
      <div class="table-wrap fluid"><table class="tbl module-table">
        <thead><tr>${th}</tr></thead><tbody>${badBody}</tbody>
      </table></div>
    </div>
    ${pivot}
  </div>`;
}

async function reconcileHistory() {
  let runs = [];
  try {
    const data = await api("/api/reconcile/runs");
    runs = data.runs || [];
  } catch (e) { /* historique non critique */ }
  if (!runs.length) {
    return `<div class="panel"><h3 class="panel-title">${esc(t("rec_history"))}</h3>
      <div class="empty">${esc(t("rec_history_none"))}</div></div>`;
  }
  const rows = runs.map((r) => {
    const s = r.stats || {};
    const savedBadge = r.saved
      ? `<span class="rec-saved yes">${esc(t("rec_saved"))}</span>`
      : `<span class="rec-saved no">—</span>`;
    return `<tr>
      <td>${esc(r.invoice_file || "")}</td>
      <td>${esc(r.po_file || "")}</td>
      <td class="num-md">${s.oui || 0} / ${s.neuf || 0}</td>
      <td>${esc((s.rate != null ? s.rate : 0) + "%")}</td>
      <td>${esc(fmtDateTime(r.created_at))}</td>
      <td>${savedBadge}</td>
      <td><button type="button" class="btn small ghost" data-act="rec-history" data-id="${r.id}">${esc(t("rec_rerun"))}</button></td>
    </tr>`;
  }).join("");
  return `<div class="panel"><h3 class="panel-title">${esc(t("rec_history"))}</h3>
    <div class="table-wrap fluid"><table class="tbl module-table">
      <thead><tr><th>${esc(t("rec_invoice_label"))}</th><th>${esc(t("rec_po_label"))}</th>
        <th>${esc(t("rec_stats_ok"))} / ${esc(t("rec_stats_bad"))}</th><th>${esc(t("rec_rate"))}</th>
        <th>${esc(t("col_created"))}</th><th>${esc(t("rec_saved"))}</th><th></th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
  </div>`;
}

async function runReconcile() {
  const inv = document.getElementById("rec-invoice");
  const po = document.getElementById("rec-po");
  if (!inv || !po || !inv.files || !inv.files[0] || !po.files || !po.files[0]) {
    toast(t("rec_need_both"));
    return;
  }
  const fd = new FormData();
  fd.append("invoice", inv.files[0]);
  fd.append("po", po.files[0]);
  const btn = document.getElementById("rec-go");
  if (btn) { btn.disabled = true; btn.textContent = t("rec_running"); }
  try {
    const res = await fetch("/api/reconcile", { method: "POST", body: fd });
    let data = null;
    try { data = await res.json(); } catch (e) { /* corps vide */ }
    if (res.status === 401) {
      state.authed = false;
      location.hash = "#/login";
      render();
      return;
    }
    if (!res.ok) {
      const map = {
        xls: "rec_err_xls", columns: "rec_err_columns", files: "rec_err_files",
        big: "rec_err_rows", internal: "rec_err_internal",
      };
      toast(data && map[data.code] ? t(map[data.code]) : t("rec_error"));
      return;
    }
    state.reconcileLast = data;
    state.reconcileRunId = data.run_id;
    await renderReconcile();
    toast(t("rec_done_toast", { n: data.stats.neuf }));
  } catch (e) {
    toast(e.message || t("rec_error"));
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = t("rec_btn"); }
  }
}

async function openReconcileRun(id) {
  try {
    const item = await api("/api/reconcile/runs/" + id);
    if (item && item.result) state.reconcileLast = item.result;
    state.reconcileRunId = id;
    await renderReconcile();
  } catch (e) {
    toast(e.message || t("rec_error"));
  }
}

async function saveReconcile() {
  // Bouton "Enregistrer" : valide le rapprochement affiche dans la base
  // (synchronisation temps reel, additive). L'archive resultat reste inchangee.
  if (!state.reconcileLast) { toast(t("rec_error")); return; }
  const id = state.reconcileRunId;
  if (!id) { toast(t("rec_error")); return; }
  const btn = document.querySelector('[data-act="rec-save"]');
  if (btn) { btn.disabled = true; }
  try {
    const res = await fetch("/api/reconcile/runs/" + id + "/save", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ saved: true }),
    });
    if (res.status === 401) {
      state.authed = false;
      location.hash = "#/login";
      render();
      return;
    }
    if (!res.ok) { toast(t("rec_error")); return; }
    toast(t("rec_saved_toast"));
    await refreshReconcileHistory();
  } catch (e) {
    toast(e.message || t("rec_error"));
  } finally {
    if (btn) { btn.disabled = false; }
  }
}

function clearReconcile() {
  // Bouton "Effacer" : remet l'etat de session local a zero. Aucune donnee
  // en base n'est touchee (l'historique reste integralement conserve).
  state.reconcileLast = null;
  state.reconcileRunId = null;
  renderReconcile();
  toast(t("rec_clear_toast"));
}

async function refreshReconcileHistory() {
  const box = document.getElementById("rec-history-box");
  if (box) {
    box.innerHTML = await reconcileHistory();
    bindReconcileHistory();
  }
}

function bindReconcileHistory() {
  document.querySelectorAll('[data-act="rec-history"]').forEach((b) => {
    b.addEventListener("click", () => { openReconcileRun(b.dataset.id); });
  });
}

async function renderReconcile() {
  const actions = state.reconcileLast
    ? `<div class="rec-actions">
        <button type="button" class="btn" data-act="rec-save">💾 ${esc(t("rec_save"))}</button>
        <button type="button" class="btn danger" data-act="rec-clear">🗑 ${esc(t("rec_clear"))}</button>
      </div>`
    : "";
  const inner = moduleHeader(
    "mod_reconcile_title", "module_sub_reconcile",
    state.reconcileLast ? state.reconcileLast.generated_at : null
  ) + reconcileForm()
    + (state.reconcileLast ? reconcileReport(state.reconcileLast) + actions : "")
    + `<div id="rec-history-box">` + await reconcileHistory() + `</div>`;
  document.getElementById("app").innerHTML = shell(t("nav_reconcile"), inner);
  moduleRefreshFn = renderReconcile;
  const goBtn = document.getElementById("rec-go");
  if (goBtn) goBtn.addEventListener("click", () => { runReconcile(); });
  const saveBtn = document.querySelector('[data-act="rec-save"]');
  if (saveBtn) saveBtn.addEventListener("click", () => { saveReconcile(); });
  const clearBtn = document.querySelector('[data-act="rec-clear"]');
  if (clearBtn) clearBtn.addEventListener("click", () => { clearReconcile(); });
  bindReconcileHistory();
}

/* ---------------------------------------------------------------- router */

let booted = false;

window.addEventListener("hashchange", () => { if (booted) render(); });

async function render() {
  if (!state.authed) return renderLogin();
  moduleRefreshFn = null;
  stopModuleAutoRefresh();
  applyTheme();
  let page = location.hash.replace(/^#\//, "") || "dashboard";
  if (page.startsWith("supplier/")) return renderSupplier(page.split("/")[1]);
  if (page === "dashboard") return renderDashboard();
  if (page === "imports") { go("#/dashboard"); return; }
  if (page === "suppliers") return renderSuppliers();
  // Les fiches fournisseurs sont désormais centralisées dans le tableau de bord
  // et ouvertes par l'icône latérale (modale de création pré-remplie).
  if (page === "meco" || page === "ingenious" || page === "navita" || page === "micota") {
    go("#/dashboard");
    return;
  }
  if (page === "trash") return renderTrash();
  if (page === "archives") return renderArchives();
  if (page === "settings") return renderSettings();
  if (page === "kanban") return renderKanban();
  if (page === "prediction") return renderPrediction();
  if (page === "analytics") return renderAnalytics();
  if (page === "reconcile") return renderReconcile();
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

async function loadSettings() {
  try {
    const r = await api("/api/settings");
    state.settings = r || null;
    return state.settings;
  } catch (e) {
    return state.settings || null;
  }
}

let ratesRetry = 0;
async function loadRates() {
  try {
    const r = await api("/api/rates");
    state.rates = r && r.rates ? { rates: r.rates, updated_at: r.updated_at, base: r.base, sync_min: r.sync_min } : null;
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

function ratesBox(idSuffix) {
  const suffix = idSuffix || "";
  const r = state.rates;
  const base = (r && r.base) || "USD";
  const rows = RATES_LIST.map((c) => {
    const v = r && r.rates !== null && r.rates[c] != null ? r.rates[c] : null;
    return `<div class="rate-row"><span>${esc(base)} → ${esc(c)}</span><b>${v != null ? esc(fmtRate(v)) : "—"}</b></div>`;
  }).join("");
  const foot = r && r.updated_at
    ? `<div class="rate-foot">🕐 ${new Date(r.updated_at * 1000).toLocaleTimeString(state.lang === "fr" ? "fr-CA" : "en-CA", { hour: "2-digit", minute: "2-digit" })}</div>`
    : `<div class="rate-foot off">${esc(t("rates_unavailable"))}</div>`;
  return `<div class="rates-box" id="rates-widget${suffix}">
    <div class="rates-h">${esc(t("rates_change"))}</div>
    ${rows}
    <div class="rate-foot">${foot}
      <button type="button" class="rate-manage" data-act="nav" data-nav="settings">${esc(t("rates_manage"))} ⚙</button>
    </div>
  </div>`;
}

function paintRates() {
  ["", "_live"].forEach((suffix) => {
    const box = document.getElementById("rates-widget" + suffix);
    if (!box) return;
    const fresh = document.createElement("div");
    fresh.innerHTML = ratesBox(suffix);
    box.replaceWith(fresh.firstChild);
  });
}

function supplierName(id) {
  const s = state.suppliers.find((x) => x.id === id);
  return s ? s.name : "—";
}

/* ---------------------------------------------------------------- dashboard */

function importState(row) {
  const d = arrivalRef(row) ? daysUntil(arrivalRef(row)) : null;
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
    const d = daysUntil(arrivalRef(r));
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

  const counts = stateCounts(state.imports.filter((i) => !i.locked));
  const alerts = buildAlerts();

  // Table entière (ex-vue "Importations") centralisée dans le Tableau de bord.
  const supFilter = state.supFilter || "";
  const search = state.search || "";
  let rows = (state.imports || []).filter((i) => !i.locked);
  if (supFilter) rows = rows.filter((i) => i.supplier_id === Number(supFilter));
  if (search) rows = rows.filter((i) => matchesImport(i, search));
  rows = sortImports(rows);
  const filterActive = !!(search || supFilter);

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
    <div class="toolbar no-print">
      <div class="search-box grow"><input class="input" id="search-imports" autocomplete="off" spellcheck="false" value="${esc(search)}" placeholder="${esc(t("search"))}"></div>
      <span class="search-count" id="search-count">${filterActive ? esc(t("results_n", { n: rows.length })) : ""}</span>
      <select class="select" id="filter-supplier" style="width:auto">
        <option value="">${esc(t("all_suppliers"))}</option>
        ${state.suppliers.map((s) => `<option value="${s.id}" ${supFilter === String(s.id) ? "selected" : ""}>${esc(s.name)}</option>`).join("")}
      </select>
      <button class="btn small ghost" data-act="export-xlsx">⬇ ${esc(t("export_xlsx"))}</button>
      <button class="btn" data-act="new-import-global">＋ ${esc(t("new_card"))}</button>
    </div>
    <div class="panel">
      <div class="table-wrap fluid"><table class="tbl imports-table">${importColgroup(true, { created: true, actions: true })}<thead>${importTableHead(true, true, { created: true, actions: true })}</thead>
      <tbody>${importRows(rows, true, { created: true, actions: true })}</tbody></table></div>
    </div>`;
  document.getElementById("app").innerHTML = shell(t("nav_dashboard"), inner);
  document.getElementById("search-imports").addEventListener("input", (e) => {
    state.search = e.target.value;
    const caret = e.target.selectionStart ?? (e.target.value || "").length;
    const pageHash = location.hash || "#/dashboard";
    clearTimeout(importsRenderTimer);
    importsRenderTimer = setTimeout(async () => {
      if ((location.hash || "#/dashboard") !== pageHash) return;
      const stay = document.activeElement && document.activeElement.id === "search-imports";
      await renderDashboard();
      refocus("search-imports", stay ? caret : null);
    }, 120);
  });
  document.getElementById("filter-supplier").addEventListener("change", (e) => {
    state.supFilter = e.target.value;
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
        <div class="full"><div class="field"><label>${esc(t("notes"))}</label><textarea class="textarea" rows="2" name="notes" data-rte-field>${esc(s.notes)}</textarea></div></div>
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
    ${sup.notes ? `<div class="sup-notes" style="color:var(--muted);margin-bottom:18px">${sanitizeRTEHTML(sup.notes)}</div>` : ""}
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

/* ---------------------------------------------------------------- archives */

function archivesTableHead() {
  return `<tr>
    <th>${esc(t("supplier"))}</th>
    <th>${esc(t("field_destination"))}</th>
    <th>${esc(t("field_po"))}</th>
    <th>${esc(t("field_container"))}</th>
    <th>${esc(t("actions"))}</th>
  </tr>`;
}

function archivesRows(rows) {
  if (!rows.length) return `<tr><td colspan="5" class="empty">${esc(t("archives_empty"))}</td></tr>`;
  return rows.map((r) => `<tr>
    <td>${esc(r.supplier_name)}</td>
    <td>${esc(r.destination)}</td>
    <td>${[r.po_number, r.inbsip].filter(Boolean).join(" / ") || ""}</td>
    <td>${esc(r.container)}</td>
    <td>
      <button class="btn small" data-act="unlock-card" data-id="${r.id}">${esc(t("unlock_card"))}</button>
      <button class="btn small" data-act="row-view-locked" data-id="${r.id}">${esc(t("view"))}</button>
    </td>
  </tr>`).join("");
}

async function renderArchives() {
  const res = await api("/api/imports?deleted=0&locked=1");
  const rows = res.imports || [];
  const inner = `
    <div class="toolbar">
      <h2 class="page-title" style="margin:0">${esc(t("archives_title"))} <span style="color:var(--muted);font-size:13px;font-weight:500">(${rows.length})</span></h2>
    </div>
    <div class="panel">
      <div class="table-wrap"><table class="tbl"><thead>${archivesTableHead()}</thead>
      <tbody>${archivesRows(rows)}</tbody></table></div>
    </div>`;
  document.getElementById("app").innerHTML = shell(t("nav_archives"), inner);
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
          <span class="meco-link-label" data-link-label="${i}"></span>
          <button type="button" class="meco-link-del" data-link-del="${i}" title="${esc(t("cl_link_remove"))}" aria-label="${esc(t("cl_link_remove"))}" hidden>🗑</button>
        </div>
        <input class="input meco-link-input" data-tidx="${i}" data-k="link" placeholder="${esc(t("cl_link_placeholder"))}" autocomplete="off" spellcheck="false" hidden>
        <div class="meco-xl" data-xl="${i}">
          <button type="button" class="meco-link-add" data-tidx="${i}" data-k="links-add" title="${esc(t("cl_link_add"))}" aria-label="${esc(t("cl_link_add"))}">${esc(t("cl_link_add_txt"))}</button>
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
      <button class="btn small ghost" data-act="meco-close" title="${esc(t("close"))}">✕ ${esc(t("close"))}</button>
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
    closeBtn: '[data-act="meco-close"]',
    onSave: saveMecoView,
    onNew: () => {
      if (!confirm(t("meco_reset_confirm"))) return;
      document.querySelectorAll(".meco-view-table input").forEach((i) => {
        if (i.type === "checkbox") i.checked = false; else i.value = "";
      });
      document.querySelectorAll(".meco-view-table [data-link-del]").forEach((el) => {
        el.hidden = true;
      });
      state.mecoDraft = null;
      persistMecoViewDraft();
      toast(t("meco_new_ok"));
    },
    onPersist: persistMecoViewDraft,
    onLoad: loadMecoViewDraft,
  });
  wireViewLinkEditor("#meco-view-app", persistMecoViewDraft);
}

/* ---------------------------------------------------------------- ingenious view */

const INGENIOUS_VIEW_ORDER = [
  "ingenious_qc",
  "ingenious_verified",
  "ingenious_update_eta_ns",
  "ingenious_calendar",
  "ingenious_douanes_code_exemption",
  "ingenious_customs",
  "ingenious_packing",
  "ingenious_invoice",
  "ingenious_bol_bourassa",
];

const INGENIOUS_VIEW_TASK_INFO = {
  ingenious_qc: { fr: "QC-SAMPLING", en: "QC-SAMPLING", tip: "ingenious_view_qc" },
  ingenious_verified: { fr: "Vérifié et Enregistré (Dropbox/Outlook)", en: "Verified and Registered (Dropbox/Outlook)", tip: "ingenious_verified_tip" },
  ingenious_update_eta_ns: { fr: "Mettre à jour ETA dans NS", en: "Update ETA in NS", tip: "ingenious_update_eta_ns_tip" },
  ingenious_calendar: { fr: "Ajout au calendrier", en: "Add to calendar", tip: "ingenious_view_calendar" },
  ingenious_douanes_code_exemption: { fr: "Douanes CODE EXEMPTION", en: "Customs CODE EXEMPTION", tip: "ingenious_customs_tip" },
  ingenious_customs: { fr: "Douanes", en: "Customs", tip: "ingenious_customs_tip" },
  ingenious_packing: { fr: "Packing Slip / Entrepôt", en: "Packing Slip / Warehouse", tip: "ingenious_view_packing" },
  ingenious_invoice: { fr: "Conciliation facture commerciale", en: "Commercial invoice reconciliation", tip: "ingenious_view_reconcile" },
  ingenious_bol_bourassa: { fr: "BOL Bourassa", en: "BOL Bourassa", tip: "ingenious_bol_bourassa_tip" },
};

function renderIngeniousView() {
  const rows = INGENIOUS_VIEW_ORDER.map((k, i) => {
    const info = INGENIOUS_VIEW_TASK_INFO[k];
    const label = state.lang === "fr" ? info.fr : info.en;
    return `<tr>
      <td class="meco-task-name">${esc(label)}</td>
      <td class="meco-status"><input type="checkbox" data-tidx="${i}" data-k="status"></td>
      <td class="meco-comments">
        <div class="meco-link-row" role="group" aria-label="${esc(t("ingenious_link_tip"))}">
          <a href="#" class="ingenious-view-link" data-tidx="${i}" data-k="${k}" title="${esc(t("ingenious_link_tip"))}">🔗 <span class="ingenious-link-flag" data-link-flag="${i}"></span></a>
          <span class="meco-link-label" data-link-label="${i}"></span>
          <button type="button" class="meco-link-del" data-link-del="${i}" title="${esc(t("cl_link_remove"))}" aria-label="${esc(t("cl_link_remove"))}" hidden>🗑</button>
        </div>
        <input class="input meco-link-input" data-tidx="${i}" data-k="link" placeholder="${esc(t("cl_link_placeholder"))}" autocomplete="off" spellcheck="false" hidden>
        <div class="meco-xl" data-xl="${i}">
          <button type="button" class="meco-link-add" data-tidx="${i}" data-k="links-add" title="${esc(t("cl_link_add"))}" aria-label="${esc(t("cl_link_add"))}">${esc(t("cl_link_add_txt"))}</button>
        </div>
        <input class="input" data-tidx="${i}" data-k="comments" placeholder="${esc(t("meco_col_commentaires"))}">
      </td>
    </tr>`;
  }).join("");

  const inner = `
    <div class="toolbar">
      <h2 class="page-title" style="margin:0">${esc(t("ingenious_view_title"))}</h2>
      <div class="spacer"></div>
      <button class="btn small" data-act="ingenious-new">${esc(t("ingenious_new"))}</button>
      <button class="btn small primary" data-act="ingenious-save">💾 ${esc(t("save"))}</button>
      <button class="btn small ghost" data-act="ingenious-close" title="${esc(t("close"))}">✕ ${esc(t("close"))}</button>
    </div>
    <div class="card meco-view" id="ingenious-view-app">
      <form id="ingenious-view-form">
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
      <div class="table-wrap"><table class="tbl meco-view-table ingenious-view-table">
        <thead><tr>
          <th>${esc(t("meco_col_tache"))}</th>
          <th>${esc(t("meco_col_statut"))}</th>
          <th>${esc(t("meco_col_commentaires"))}</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>`;

  document.getElementById("app").innerHTML = shell(t("ingenious_view_title"), inner);

  wireViewDraft("#ingenious-view-form", {
    draftKey: "ingeniousDraft",
    saveBtn: '[data-act="ingenious-save"]',
    newBtn: '[data-act="ingenious-new"]',
    closeBtn: '[data-act="ingenious-close"]',
    onSave: saveIngeniousView,
    onNew: () => {
      if (!confirm(t("ingenious_reset_confirm"))) return;
      resetViewForm(VIEW_DEFS.ingenious);
      toast(t("ingenious_new_ok"));
    },
    onPersist: persistIngeniousViewDraft,
    onLoad: loadIngeniousViewDraft,
  });
  wireViewLinkEditor("#ingenious-view-app", persistIngeniousViewDraft);
}

/* ---------------------------------------------------------------- navita view */

// Correction de nom: l'ancienne fiche NATIVA devient NAVITA (libellés, clés de
// tâches `navita_*` et routes). La structure et les données restent identiques.
const NAVITA_VIEW_ORDER = [
  "navita_verified",
  "navita_pay_deposit",
  "navita_pay_final_1",
  "navita_pay_final_2",
  "navita_update_eta_ns",
  "navita_calendar",
  "navita_customs",
  "navita_packing",
  "navita_invoice",
  "navita_globco",
  "navita_facture",
];

const NAVITA_VIEW_TASK_INFO = {
  navita_verified: { fr: "Vérifié et Enregistré (Dropbox/Outlook)", en: "Verified and Registered (Dropbox/Outlook)", tip: "ingenious_verified_tip" },
  navita_pay_deposit: { fr: "Paiement du dépôt (50%) - À la commande - PHUC HAI", en: "Deposit payment (50%) - At order - PHUC HAI", tip: "cl_fac_label" },
  navita_pay_final_1: { fr: "Paiement final (50%) - Au départ de Chine - PHUC HAI", en: "Final payment (50%) - On departure from China - PHUC HAI", tip: "cl_fac_label" },
  navita_pay_final_2: { fr: "Paiement final (100%) - 75 day after BOL - VPI", en: "Final payment (100%) - 75 days after BOL - VPI", tip: "cl_fac_label" },
  navita_update_eta_ns: { fr: "Mettre à jour ETA dans NS", en: "Update ETA in NS", tip: "ingenious_update_eta_ns_tip" },
  navita_calendar: { fr: "Ajout au calendrier", en: "Add to calendar", tip: "ingenious_view_calendar" },
  navita_customs: { fr: "Douanes", en: "Customs", tip: "ingenious_customs_tip" },
  navita_packing: { fr: "Packing Slip / Entrepôt", en: "Packing Slip / Warehouse", tip: "ingenious_view_packing" },
  navita_invoice: { fr: "Conciliation facture commerciale", en: "Commercial invoice reconciliation", tip: "ingenious_view_reconcile" },
  navita_globco: { fr: "Transport maritime Globco", en: "Sea freight Globco", tip: "cl_fac_label" },
  navita_facture: { fr: "Facture", en: "Invoice", tip: "meco_link_tip" },
};

function renderNavitaView() {
  const rows = NAVITA_VIEW_ORDER.map((k, i) => {
    const info = NAVITA_VIEW_TASK_INFO[k];
    const label = info.fr;
    return `<tr>
      <td class="meco-task-name">${esc(label)}</td>
      <td class="meco-status"><input type="checkbox" data-tidx="${i}" data-k="status"></td>
      <td class="meco-comments">
        <div class="meco-link-row" role="group" aria-label="${esc(t("meco_link_tip"))}">
          <a href="#" class="navita-view-link" data-tidx="${i}" data-k="${k}" title="${esc(t("meco_link_tip"))}">🔗 <span class="navita-link-flag" data-link-flag="${i}"></span></a>
          <span class="meco-link-label" data-link-label="${i}"></span>
          <button type="button" class="meco-link-del" data-link-del="${i}" title="${esc(t("cl_link_remove"))}" aria-label="${esc(t("cl_link_remove"))}" hidden>🗑</button>
        </div>
        <input class="input meco-link-input" data-tidx="${i}" data-k="link" placeholder="${esc(t("cl_link_placeholder"))}" autocomplete="off" spellcheck="false" hidden>
        <div class="meco-xl" data-xl="${i}">
          <button type="button" class="meco-link-add" data-tidx="${i}" data-k="links-add" title="${esc(t("cl_link_add"))}" aria-label="${esc(t("cl_link_add"))}">${esc(t("cl_link_add_txt"))}</button>
        </div>
        <input class="input" data-tidx="${i}" data-k="comments" placeholder="${esc(t("meco_col_commentaires"))}">
      </td>
    </tr>`;
  }).join("");

  const inner = `
    <div class="toolbar">
      <h2 class="page-title" style="margin:0">${esc(t("navita_view_title"))}</h2>
      <div class="spacer"></div>
      <button class="btn small" data-act="navita-new">${esc(t("navita_new"))}</button>
      <button class="btn small primary" data-act="navita-save">💾 ${esc(t("save"))}</button>
      <button class="btn small ghost" data-act="navita-close" title="${esc(t("close"))}">✕ ${esc(t("close"))}</button>
    </div>
    <div class="card meco-view" id="navita-view-app">
      <form id="navita-view-form">
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
      <div class="table-wrap"><table class="tbl meco-view-table navita-view-table">
        <thead><tr>
          <th>${esc(t("meco_col_tache"))}</th>
          <th>${esc(t("meco_col_statut"))}</th>
          <th>${esc(t("meco_col_commentaires"))}</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>`;

  document.getElementById("app").innerHTML = shell(t("navita_view_title"), inner);

  wireViewDraft("#navita-view-form", {
    draftKey: "navitaDraft",
    saveBtn: '[data-act="navita-save"]',
    newBtn: '[data-act="navita-new"]',
    closeBtn: '[data-act="navita-close"]',
    onSave: saveNavitaView,
    onNew: () => {
      if (!confirm(t("navita_reset_confirm"))) return;
      resetViewForm(VIEW_DEFS.navita);
      toast(t("navita_new_ok"));
    },
    onPersist: persistNavitaViewDraft,
    onLoad: loadNavitaViewDraft,
  });
  wireViewLinkEditor("#navita-view-app", persistNavitaViewDraft);
}

/* ---------------------------------------------------------------- micota view */

// Transfert d'identité: cette fiche reprend la structure historique de GIOLONG-B
// (désormais nommée MICOTA). L'ancien MICOTA a été retiré ; les clés de tâches
// `giolong_*` ont été migrées en `micota_*` sans perte de données.
const MICOTA_VIEW_ORDER = [
  "micota_verified",
  "micota_payment_final",
  "micota_update_eta_ns",
  "micota_calendar",
  "micota_customs",
  "micota_packing",
  "micota_invoice",
  "micota_commission",
  "micota_globco",
  "micota_bol_bourassa",
];

const MICOTA_VIEW_TASK_INFO = {
  micota_verified: { fr: "Vérifié et Enregistré (Dropbox/Outlook)", en: "Verified and Registered (Dropbox/Outlook)" },
  micota_payment_final: { fr: "Paiement final (100%) Au départ de Chine", en: "Final payment (100%) upon China departure" },
  micota_update_eta_ns: { fr: "Mettre à jour ETA dans NS", en: "Update ETA in NS" },
  micota_calendar: { fr: "Ajout au calendrier", en: "Add to calendar" },
  micota_customs: { fr: "Douanes", en: "Customs" },
  micota_packing: { fr: "Packing Slip / Entrepôt", en: "Packing Slip / Warehouse" },
  micota_invoice: { fr: "Conciliation facture commerciale", en: "Commercial invoice reconciliation", defComment: "*Inclure la comm 8% dans cost" },
  micota_commission: { fr: "Commission 8%", en: "8% commission", defComment: "Fact. # :" },
  micota_globco: { fr: "Transport maritime Globco", en: "Globco sea freight", defComment: "Fact. # :" },
  micota_bol_bourassa: { fr: "BOL Bourassa", en: "BOL Bourassa" },
};

function renderMicotaView() {
  const rows = MICOTA_VIEW_ORDER.map((k, i) => {
    const info = MICOTA_VIEW_TASK_INFO[k];
    const label = info.fr;
    const defComment = info.defComment || "";
    return `<tr>
      <td class="meco-task-name">${esc(label)}</td>
      <td class="meco-status"><input type="checkbox" data-tidx="${i}" data-k="status"></td>
      <td class="meco-comments">
        <div class="meco-link-row" role="group" aria-label="${esc(t("meco_link_tip"))}">
          <a href="#" class="micota-view-link" data-tidx="${i}" data-k="${k}" title="${esc(t("meco_link_tip"))}">🔗 <span class="micota-link-flag" data-link-flag="${i}"></span></a>
          <span class="meco-link-label" data-link-label="${i}"></span>
          <button type="button" class="meco-link-del" data-link-del="${i}" title="${esc(t("cl_link_remove"))}" aria-label="${esc(t("cl_link_remove"))}" hidden>🗑</button>
        </div>
        <input class="input meco-link-input" data-tidx="${i}" data-k="link" placeholder="${esc(t("cl_link_placeholder"))}" autocomplete="off" spellcheck="false" hidden>
        <div class="meco-xl" data-xl="${i}">
          <button type="button" class="meco-link-add" data-tidx="${i}" data-k="links-add" title="${esc(t("cl_link_add"))}" aria-label="${esc(t("cl_link_add"))}">${esc(t("cl_link_add_txt"))}</button>
        </div>
        <input class="input" data-tidx="${i}" data-k="comments" value="${esc(defComment)}" placeholder="${esc(t("meco_col_commentaires"))}">
      </td>
    </tr>`;
  }).join("");

  const inner = `
    <div class="toolbar">
      <h2 class="page-title" style="margin:0">${esc(t("micota_view_title"))}</h2>
      <div class="spacer"></div>
      <button class="btn small" data-act="micota-new">${esc(t("micota_new"))}</button>
      <button class="btn small primary" data-act="micota-save">💾 ${esc(t("save"))}</button>
      <button class="btn small ghost" data-act="micota-close" title="${esc(t("close"))}">✕ ${esc(t("close"))}</button>
    </div>
    <div class="card meco-view" id="micota-view-app">
      <form id="micota-view-form">
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
      <div class="table-wrap"><table class="tbl meco-view-table micota-view-table">
        <thead><tr>
          <th>${esc(t("meco_col_tache"))}</th>
          <th>${esc(t("meco_col_statut"))}</th>
          <th>${esc(t("meco_col_commentaires"))}</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>`;

  document.getElementById("app").innerHTML = shell(t("micota_view_title"), inner);

  wireViewDraft("#micota-view-form", {
    draftKey: "micotaDraft",
    saveBtn: '[data-act="micota-save"]',
    newBtn: '[data-act="micota-new"]',
    closeBtn: '[data-act="micota-close"]',
    onSave: saveMicotaView,
    onNew: () => {
      if (!confirm(t("micota_reset_confirm"))) return;
      resetViewForm(VIEW_DEFS.micota);
      applyMicotaDefaults();
      toast(t("micota_new_ok"));
    },
    onPersist: persistMicotaViewDraft,
    onLoad: loadMicotaViewDraft,
  });
  wireViewLinkEditor("#micota-view-app", persistMicotaViewDraft);
}

function applyMicotaDefaults() {
  const table = document.querySelector(VIEW_DEFS.micota.tableSel);
  if (!table) return;
  table.querySelectorAll("tbody tr").forEach((tr, i) => {
    const info = MICOTA_VIEW_TASK_INFO[MICOTA_VIEW_ORDER[i]];
    const cm = tr.querySelector('[data-k="comments"]');
    if (info && info.defComment && cm) cm.value = info.defComment;
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
  const close = sampleEl(cfg.closeBtn);
  if (close && cfg.onSave) close.addEventListener("click", () => closeViewAfterSave(cfg));
  if (cfg.onLoad) cfg.onLoad(form);
}

async function closeViewAfterSave(cfg) {
  if (!cfg || !cfg.onSave) return;
  toast(t("view_closing"));
  try {
    const ok = await cfg.onSave();
    if (ok !== false) {
      go("#/dashboard");
      toast(t("view_close_ok"));
    }
  } catch (e) {
    toast(t("save_err", { msg: e.message }));
  }
}

function sampleEl(sel) {
  return typeof sel === "string" ? document.querySelector(sel) : sel;
}

function wireViewLinkEditor(appSel, persist) {
  const app = sampleEl(appSel);
  if (!app) return;
  const refreshRowLink = (el) => {
    const row = el && el.closest("tr");
    if (!row) return;
    const a = row.querySelector("a.meco-view-link, a.ingenious-view-link, a.navita-view-link, a.micota-view-link");
    const flag = row.querySelector("[data-link-flag]");
    const lbl = row.querySelector("[data-link-label]");
    const del = row.querySelector("[data-link-del]");
    const v = String(el.value || "").trim();
    if (a) a.dataset.link = v;
    if (flag) flag.textContent = v ? "✓" : "";
    if (lbl) lbl.textContent = v;
    if (del) del.hidden = !v;
  };
  ["input", "change"].forEach((ev) => app.addEventListener(ev, (e) => {
    const el = e.target;
    if (el && el.matches && el.matches('[data-k="link"]')) refreshRowLink(el);
    persist();
  }));
  app.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== "Escape") return;
    const el = e.target;
    if (!el || !el.matches || !el.matches('[data-k="link"]')) return;
    e.preventDefault();
    if (e.key === "Escape") el.value = "";
    refreshRowLink(el);
    el.hidden = true;
    persist();
    el.blur();
  });
  app.addEventListener("blur", (e) => {
    const el = e.target;
    if (!el || !el.matches || !el.matches('[data-k="link"]')) return;
    refreshRowLink(el);
    el.hidden = true;
    persist();
  }, true);
  app.addEventListener("click", (e) => {
    const addBtn = e.target && e.target.closest ? e.target.closest("[data-k='links-add']") : null;
    if (addBtn) {
      e.preventDefault();
      e.stopPropagation();
      const i = Number(addBtn.dataset.tidx);
      const box = app.querySelector('[data-xl="' + i + '"]');
      if (box) {
        const wrap = document.createElement("div");
        wrap.innerHTML = mecoExtraRowHTML(i, box.querySelectorAll(".meco-xl-row").length, "");
        box.insertBefore(wrap.firstElementChild, box.lastElementChild);
        const inp = box.querySelector('[data-k="links"][data-lki="' + (box.querySelectorAll(".meco-xl-row").length - 1) + '"]');
        if (inp) { inp.focus(); inp.select(); }
      }
      persist();
      return;
    }
    const delBtn = e.target && e.target.closest ? e.target.closest("[data-k='links-del']") : null;
    if (delBtn) {
      e.preventDefault();
      e.stopPropagation();
      const rowEl = delBtn.closest(".meco-xl-row");
      if (rowEl) rowEl.remove();
      persist();
      return;
    }
    const btn = e.target && e.target.closest ? e.target.closest("[data-link-del]") : null;
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const row = btn.closest("tr");
    const li = row && row.querySelector('[data-k="link"]');
    if (!li) return;
    li.value = "";
    refreshRowLink(li);
    li.hidden = true;
    persist();
  });
}

const VIEW_DEFS = {
  meco: {
    formSel: "#meco-view-form",
    draftKey: "mecoDraft",
    supName: "MECO",
    tableSel: ".meco-view-table",
    linkSel: "a.meco-view-link",
    order: MECO_VIEW_ORDER,
    info: MECO_VIEW_TASK_INFO,
  },
  ingenious: {
    formSel: "#ingenious-view-form",
    draftKey: "ingeniousDraft",
    supName: "INGENIOUS",
    tableSel: ".ingenious-view-table",
    linkSel: "a.ingenious-view-link",
    order: INGENIOUS_VIEW_ORDER,
    info: INGENIOUS_VIEW_TASK_INFO,
  },
  navita: {
    formSel: "#navita-view-form",
    draftKey: "navitaDraft",
    supName: "NAVITA",
    tableSel: ".navita-view-table",
    linkSel: "a.navita-view-link",
    order: NAVITA_VIEW_ORDER,
    info: NAVITA_VIEW_TASK_INFO,
  },
  micota: {
    formSel: "#micota-view-form",
    draftKey: "micotaDraft",
    supName: "MICOTA",
    tableSel: ".micota-view-table",
    linkSel: "a.micota-view-link",
    order: MICOTA_VIEW_ORDER,
    info: MICOTA_VIEW_TASK_INFO,
  },
};

function viewForm(def) {
  return sampleEl(def.formSel);
}

function readViewBody(def) {
  const form = viewForm(def);
  const fields = {};
  const tasks = [];
  if (form) {
    form.querySelectorAll("[name]").forEach((el) => {
      fields[el.name] = el.type === "checkbox" ? el.checked : el.value;
    });
  }
  const table = document.querySelector(def.tableSel);
  if (table) {
    table.querySelectorAll("tbody tr").forEach((tr, i) => {
      const st = tr.querySelector('[data-k="status"]');
      const cm = tr.querySelector('[data-k="comments"]');
      const ln = tr.querySelector(def.linkSel);
      const li = tr.querySelector('[data-k="link"]');
      const extra = [];
      tr.querySelectorAll('[data-k="links"]').forEach((el) => extra.push(el.value || ""));
      tasks.push({
        key: def.order[i] || "",
        status: st ? !!st.checked : false,
        comments: cm ? cm.value : "",
        link: li ? String(li.value || "") : (ln ? (ln.dataset.link || "") : ""),
        extraLinks: extra,
      });
    });
  }
  return { import_id: null, fields, tasks };
}

function persistViewDraft(def) {
  if (!viewForm(def)) return;
  const data = readViewBody(def);
  const prev = state[def.draftKey] || {};
  data.import_id = prev.import_id || null;
  state[def.draftKey] = data;
  localStorage.setItem("si_" + def.draftKey, JSON.stringify(data));
}

function loadViewDraft(def, form) {
  let data;
  try {
    data = state[def.draftKey] || JSON.parse(localStorage.getItem("si_" + def.draftKey) || "null");
  } catch (e) {
    data = null;
  }
  if (!data || !form) return;
  state[def.draftKey] = data;
  form.querySelectorAll("[name]").forEach((el) => {
    const v = data.fields && data.fields[el.name];
    if (el.type === "checkbox") el.checked = !!v;
    else el.value = v == null ? "" : String(v);
  });
  const table = document.querySelector(def.tableSel);
  if (!table) return;
  table.querySelectorAll("tbody tr").forEach((tr, i) => {
    const t = (data.tasks || [])[i];
    if (!t) return;
    const st = tr.querySelector('[data-k="status"]');
    const cm = tr.querySelector('[data-k="comments"]');
    if (st) st.checked = !!t.status;
    if (cm) cm.value = t.comments || "";
    const ln = tr.querySelector(def.linkSel);
    const li = tr.querySelector('[data-k="link"]');
    if (ln) ln.dataset.link = t.link || "";
    if (li) {
      li.value = t.link || "";
      li.hidden = true;
    }
    const flag = ln && ln.querySelector("[data-link-flag]");
    if (flag) flag.textContent = t.link ? "✓" : "";
    const lbl = tr.querySelector("[data-link-label]");
    if (lbl) lbl.textContent = t.link || "";
    const del = tr.querySelector("[data-link-del]");
    if (del) del.hidden = !t.link;
    const box = tr.querySelector('[data-xl="' + i + '"]');
    if (box) {
      box.querySelectorAll(".meco-xl-row").forEach((r) => r.remove());
      (Array.isArray(t.extraLinks) ? t.extraLinks : []).forEach((x, li) => {
        if (String(x || "").trim() === "") return;
        const wrap = document.createElement("div");
        wrap.innerHTML = mecoExtraRowHTML(i, li, x);
        box.insertBefore(wrap.firstElementChild, box.lastElementChild);
      });
    }
  });
}

document.addEventListener("click", (e) => {
  const a = e.target && e.target.closest ? e.target.closest("a.meco-view-link, a.ingenious-view-link, a.navita-view-link, a.micota-view-link") : null;
  if (!a) return;
  e.preventDefault();
  e.stopPropagation();
  if (!state.authed) return;
  const tr = a.closest("tr");
  const li = tr && tr.querySelector('[data-k="link"]');
  const url = (li ? String(li.value || "") : (a.dataset.link || "")).trim();
  if (url) {
    window.open(url, "_blank", "noopener");
    return;
  }
  if (li) {
    if (li.hidden) {
      li.hidden = false;
      li.focus();
      li.select();
    } else {
      li.hidden = true;
      li.blur();
    }
  }
});

function resetViewForm(def) {
  const form = viewForm(def);
  if (form) {
    form.querySelectorAll("input, select, textarea").forEach((el) => {
      if (el.type === "checkbox") el.checked = false; else el.value = "";
    });
    document.querySelectorAll(def.linkSel).forEach((a) => {
      a.dataset.link = "";
      const flag = a.querySelector("[data-link-flag]");
      if (flag) flag.textContent = "";
    });
    document.querySelectorAll(def.tableSel + ' [data-k="link"]').forEach((el) => {
      el.value = "";
      el.hidden = true;
    });
    document.querySelectorAll(def.tableSel + " [data-link-label]").forEach((lbl) => {
      lbl.textContent = "";
    });
    document.querySelectorAll(def.tableSel + " [data-link-del]").forEach((el) => {
      el.hidden = true;
    });
    document.querySelectorAll(def.tableSel + " [data-xl]").forEach((box) => {
      box.querySelectorAll(".meco-xl-row").forEach((r) => r.remove());
    });
  }
  state[def.draftKey] = null;
  localStorage.removeItem("si_" + def.draftKey);
}

async function saveViewToServer(def) {
  const data = readViewBody(def);
  let sup = (state.suppliers || []).find((s) => String(s.name || "").trim().toUpperCase() === def.supName);
  if (!sup) {
    try {
      const created = await api("/api/suppliers", "POST", { name: def.supName });
      sup = { id: created.id, name: def.supName };
      state.suppliers = (state.suppliers || []).concat([sup]);
    } catch (e) {
      return toast(t("required"));
    }
  }
  const f = data.fields;
  const pn = Number(f.pallets);
  const payload = {
    supplier_id: sup.id,
    destination: String(f.destination || ""),
    po_number: String(f.po_number || ""),
    inbsip: String(f.inbsip || ""),
    doc_number: String(f.doc_number || ""),
    pallets: isFinite(pn) ? pn : null,
    transitaire_bol: String(f.transitaire_bol || ""),
    container: String(f.container || ""),
    etd: String(f.etd || ""),
    eta_van: String(f.eta_van || ""),
    eta_dest: String(f.eta_dest || ""),
    eta: String(f.eta_van || f.eta_dest || ""),
    qc_sampling_qc: f.qc_sampling_qc ? 1 : 0,
    qc_sampling_reception: f.qc_sampling_reception ? 1 : 0,
  };
  const items = data.tasks.map((tk, i) => {
    const info = def.info[tk.key] || {};
    const list = [tk.link || "", ...(tk.extraLinks || [])]
      .map((x) => String(x || "").trim()).filter(Boolean);
    return {
      task_key: tk.key,
      task_label_fr: info.fr || tk.key,
      task_label_en: info.en || tk.key,
      status: tk.status ? "done" : "pending",
      notes: tk.comments || "",
      link: list[0] || "",
      links: list,
      meta: JSON.stringify({ on_rail: !!f.on_rail, eta_note: String(f.eta_note || "") }),
      position: i,
    };
  });
  try {
    let id = (state[def.draftKey] || {}).import_id || null;
    if (id) {
      await api("/api/imports/" + id, "PUT", payload);
    } else {
      const res = await api("/api/imports", "POST", payload);
      id = res.id;
    }
    await api("/api/imports/" + id + "/checklist", "PUT", { items });
    const merged = Object.assign({}, state[def.draftKey] || {}, { import_id: id });
    state[def.draftKey] = merged;
    localStorage.setItem("si_" + def.draftKey, JSON.stringify(merged));
    toast(t("save_ok"));
    await loadBase();
    render();
    return true;
  } catch (e) {
    toast(t("save_err", { msg: e.message }));
    return false;
  }
}

function persistMecoViewDraft() {
  persistViewDraft(VIEW_DEFS.meco);
}

function loadMecoViewDraft(form) {
  loadViewDraft(VIEW_DEFS.meco, form);
}

function saveMecoView() {
  return saveViewToServer(VIEW_DEFS.meco);
}

function persistIngeniousViewDraft() {
  persistViewDraft(VIEW_DEFS.ingenious);
}

function loadIngeniousViewDraft(form) {
  loadViewDraft(VIEW_DEFS.ingenious, form);
}

function saveIngeniousView() {
  return saveViewToServer(VIEW_DEFS.ingenious);
}

function persistNavitaViewDraft() {
  persistViewDraft(VIEW_DEFS.navita);
}

function loadNavitaViewDraft(form) {
  loadViewDraft(VIEW_DEFS.navita, form);
}

function saveNavitaView() {
  return saveViewToServer(VIEW_DEFS.navita);
}

function persistMicotaViewDraft() {
  persistViewDraft(VIEW_DEFS.micota);
}

function loadMicotaViewDraft(form) {
  loadViewDraft(VIEW_DEFS.micota, form);
  if (!state[VIEW_DEFS.micota.draftKey]) applyMicotaDefaults();
}

function saveMicotaView() {
  return saveViewToServer(VIEW_DEFS.micota);
}

/* ---------------------------------------------------------------- settings */

async function renderSettings() {
  const dots = Object.keys(THEMES)
    .map((k) => `<button data-act="theme" data-theme="${k}"
        class="theme-dot ${state.theme === k ? "active" : ""}"
        title="${t("themes")[k]}"
        style="background:linear-gradient(135deg, ${THEMES[k].c1}, ${THEMES[k].c2})"></button>`)
    .join("");
  let s = null;
  try {
    s = await loadSettings();
  } catch (e) {
    s = null;
  }
  const fx = (s && s.fx) || { base: "USD", sync_min: 30, has_api_key: false };
  const imp = (s && s.imp) || { incoterm_default: "FOB", delay_tolerance_days: 3, email_template_fr: "", email_template_en: "" };
  const notifs = (s && s.notifications) || {};
  const FX_BASES = ["USD", "CAD", "EUR", "GBP", "CNY", "MXN"];
  const INCOTERMS = ["FOB", "CIF", "EXW", "FCA", "DDP", "DAP", "CFR", "CPT", "CIP"];
  const notifEvents = [
    ["delays", "notif_delays"],
    ["locked", "notif_locked"],
    ["arrival", "notif_arrival"],
  ];
  const fxPanel = `
    <div class="panel">
      <div class="panel-h">${esc(t("fx_title"))}</div>
      <div style="padding:18px;max-width:860px">
        <form id="fx-form" class="settings-grid" autocomplete="off">
          <div class="field"><label>${esc(t("fx_base"))}</label>
            <select class="select" name="base">${FX_BASES.map((c) => `<option value="${c}" ${fx.base === c ? "selected" : ""}>${c}</option>`).join("")}</select></div>
          <div class="field"><label>${esc(t("fx_sync_min"))}</label>
            <input class="input" type="number" min="5" max="1440" name="sync_min" value="${esc(fx.sync_min || 30)}"></div>
          <div class="field"><label>${esc(t("fx_api_key"))}</label>
            <input class="input" type="password" name="api_key" value="" placeholder="${fx.has_api_key ? "••••••••" : ""}" autocomplete="new-password"></div>
          <div class="field align-end"><button class="btn" type="submit">${esc(t("fx_save"))}</button></div>
        </form>
        <div class="muted" style="margin:10px 0 6px">${esc(t("fx_key_hint"))}</div>
        <div class="fx-live">
          <div class="module-h">${esc(t("fx_live"))}</div>
          ${ratesBox("_live")}
          <div class="muted" style="margin-top:6px">${
            state.rates && state.rates.updated_at
              ? esc(t("fx_updated", { time: new Date(state.rates.updated_at * 1000).toLocaleTimeString(state.lang === "fr" ? "fr-CA" : "en-CA", { hour: "2-digit", minute: "2-digit" }) }))
              : esc(t("fx_unavailable"))
          }</div>
        </div>
      </div>
    </div>`;
  const notifPanel = `
    <div class="panel">
      <div class="panel-h">${esc(t("notif_title"))}</div>
      <div style="padding:18px">
        <form id="notif-form">
          <div class="table-wrap" style="max-width:680px">
            <table class="tbl notif-tbl">
              <thead><tr>
                <th></th>
                <th>${esc(t("notif_email"))}</th>
                <th>${esc(t("notif_app"))}</th>
              </tr></thead>
              <tbody>${notifEvents.map((evt) => `<tr>
                <td>${esc(t(evt[1]))}</td>
                <td><input type="checkbox" name="${evt[0]}_email" ${notifs[evt[0] + "_email"] ? "checked" : ""}></td>
                <td><input type="checkbox" name="${evt[0]}_app" ${notifs[evt[0] + "_app"] ? "checked" : ""}></td>
              </tr>`).join("")}</tbody>
            </table>
          </div>
          <p class="muted" style="margin:12px 0 10px">${esc(t("notif_hint"))}</p>
          <button class="btn" type="submit">${esc(t("save"))}</button>
          <div id="notif-alert" style="margin-top:8px"></div>
        </form>
      </div>
    </div>`;
  const impPanel = `
    <div class="panel">
      <div class="panel-h">${esc(t("imp_title"))}</div>
      <div style="padding:18px;max-width:860px">
        <form id="imp-form" autocomplete="off">
          <div class="settings-grid">
            <div class="field"><label>${esc(t("imp_incoterm"))}</label>
              <input class="input" list="incoterm-options" name="incoterm_default" value="${esc(imp.incoterm_default || "FOB")}">
              <datalist id="incoterm-options">${INCOTERMS.map((c) => `<option value="${c}">`).join("")}</datalist></div>
            <div class="field"><label>${esc(t("imp_delay_tolerance"))}</label>
              <input class="input" type="number" min="0" max="365" name="delay_tolerance_days" value="${esc(imp.delay_tolerance_days == null ? 3 : imp.delay_tolerance_days)}"></div>
          </div>
          <div class="muted" style="margin:8px 0 14px">${esc(t("imp_delay_tolerance_hint"))}</div>
          <div class="field"><label>${esc(t("imp_email_fr"))}</label>
            <textarea class="textarea" rows="4" name="email_template_fr" data-rte-field>${esc(imp.email_template_fr || "")}</textarea></div>
          <div class="field"><label>${esc(t("imp_email_en"))}</label>
            <textarea class="textarea" rows="4" name="email_template_en" data-rte-field>${esc(imp.email_template_en || "")}</textarea></div>
          <div class="muted" style="margin:8px 0 12px">${esc(t("imp_email_hint"))}</div>
          <button class="btn" type="submit">${esc(t("imp_save"))}</button>
          <div id="imp-alert" style="margin-top:8px"></div>
        </form>
      </div>
    </div>`;
  let dataPanel = "";
  if (state.user && state.user.role === "admin") {
    dataPanel = `
    <div class="panel">
      <div class="panel-h">${esc(t("sec_data"))}</div>
      <div style="padding:18px">
        <div class="muted">${esc(t("data_backup_hint"))}</div>
        <button class="btn" data-act="data-backup" style="margin-top:10px">⬇ ${esc(t("data_backup"))}</button>
        <div class="muted" style="margin:18px 0 6px">${esc(t("data_import_hint"))}</div>
        <form id="data-import-form" class="row gap">
          <input class="input" type="file" name="file" accept=".zip,.db">
          <button class="btn" type="submit">${esc(t("data_import_btn"))}</button>
        </form>
        <div id="data-alert" style="margin-top:8px"></div>
      </div>
    </div>`;
  }
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
    </div>
    ${fxPanel}
    ${notifPanel}
    ${impPanel}
    ${dataPanel}${usersPanel}`;
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
  document.getElementById("fx-form").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    const body = { fx: { base: (fd.get("base") || "USD").trim().toUpperCase(), sync_min: Number(fd.get("sync_min")) || 30 } };
    if (fd.get("api_key")) body.fx.api_key = fd.get("api_key");
    try {
      await api("/api/settings", "PUT", body);
      await loadSettings();
      await loadRates();
      toast(t("fx_saved"));
      render();
    } catch (e) {
      toast(t("save_err", { msg: e.message }));
    }
  });
  document.getElementById("notif-form").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    const notifications = {};
    notifEvents.forEach((evt) => {
      notifications[evt[0] + "_email"] = fd.get(evt[0] + "_email") === "on";
      notifications[evt[0] + "_app"] = fd.get(evt[0] + "_app") === "on";
    });
    try {
      await api("/api/settings", "PUT", { notifications });
      await loadSettings();
      toast(t("notif_saved"));
    } catch (e) {
      document.getElementById("notif-alert").innerHTML = `<div class="alert err">${esc(t("save_err", { msg: e.message }))}</div>`;
    }
  });
  document.getElementById("imp-form").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    const alertBox = document.getElementById("imp-alert");
    alertBox.innerHTML = "";
    try {
      await api("/api/settings", "PUT", {
        imp: {
          incoterm_default: (fd.get("incoterm_default") || "").trim() || "FOB",
          delay_tolerance_days: Number(fd.get("delay_tolerance_days")),
          email_template_fr: fd.get("email_template_fr"),
          email_template_en: fd.get("email_template_en"),
        },
      });
      await loadSettings();
      toast(t("imp_saved"));
    } catch (e) {
      alertBox.innerHTML = `<div class="alert err">${esc(t("save_err", { msg: e.message }))}</div>`;
    }
  });
  const di = document.getElementById("data-import-form");
  if (di) di.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const alertBox = document.getElementById("data-alert");
    alertBox.innerHTML = "";
    const fileInput = ev.target.querySelector('input[type="file"]');
    const file = fileInput && fileInput.files[0];
    if (!file) {
      alertBox.innerHTML = `<div class="alert err">${esc(t("data_file_required"))}</div>`;
      return;
    }
    if (!confirm(t("data_import_confirm"))) return;
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await api("/api/import", "POST", fd);
      alertBox.innerHTML = `<div class="alert ok">${esc(t("data_import_success", { n: (r && r.imports) != null ? r.imports : "?" }))}</div>`;
      await loadSettings();
      await loadBase();
    } catch (e) {
      alertBox.innerHTML = `<div class="alert err">${esc(t("data_import_error", { msg: e.message }))}</div>`;
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

async function openBackupModal() {
  const m = openModal(`
    <div class="modal-h"><span class="modal-h-title">${esc(t("backup_title"))}</span>
      <button type="button" class="icon-btn" data-act="close-modal">✕</button></div>
    <div class="modal-b">
      <div class="muted" style="margin:0 0 14px">${esc(t("backup_hint"))}</div>
      <div id="bk-status">${esc(t("backup_running"))}</div>
    </div>
    <div class="modal-f">
      <span class="bk-autohint" style="margin-right:auto;align-self:center"></span>
      <button type="button" class="btn ghost" data-act="close-modal">${esc(t("cancel"))}</button>
      <button type="button" class="btn" id="bk-download">⬇ ${esc(t("backup_download_now"))}</button>
      <button type="button" class="btn" id="bk-run">📤 ${esc(t("backup_run_now"))}</button>
    </div>`);
  const statusEl = m.querySelector("#bk-status");
  const hintEl = m.querySelector(".bk-autohint");
  const dlBtn = m.querySelector("#bk-download");
  const runBtn = m.querySelector("#bk-run");
  const busy = (busyBtn, busyOn) => {
    busyBtn.disabled = busyOn;
    dlBtn.disabled = busyOn;
    runBtn.disabled = busyOn;
    if (busyOn) hintEl.innerHTML = `<span class="bk-spin"></span> ${esc(t("backup_running"))}`;
    else hintEl.textContent = "";
  };
  const loadStatus = async () => {
    try {
      const st = await api("/api/backup/status");
      renderBackupStatus(statusEl, st);
    } catch (e) {
      statusEl.innerHTML = `<div class="alert err">${esc(t("backup_err", { msg: e.message }))}</div>`;
    }
  };
  dlBtn.addEventListener("click", async () => {
    if (!state.user || state.user.role !== "admin") { toast(t("data_restore_self")); return; }
    busy(dlBtn, true);
    try {
      const res = await fetch("/api/backup");
      if (res.status === 401) { state.authed = false; location.hash = "#/login"; render(); return; }
      if (!res.ok) { const d = await res.json().catch(() => null); throw new Error((d && d.error) || res.statusText || "backup failed"); }
      const blob = await res.blob();
      const cd = res.headers.get("Content-Disposition") || "";
      const mm = cd.match(/filename="?([^;]+)"?/i);
      downloadBlob(blob, mm ? mm[1].trim() : t("backup_file_name"));
      toast(t("save_ok"));
    } catch (e) {
      toast(t("save_err", { msg: e.message }));
    }
    busy(dlBtn, false);
    await loadStatus();
  });
  runBtn.addEventListener("click", async () => {
    if (!state.user || state.user.role !== "admin") { toast(t("data_restore_self")); return; }
    busy(runBtn, true);
    statusEl.innerHTML = `<span class="bk-spin"></span> ${esc(t("backup_running"))}`;
    try {
      const res = await api("/api/backup/now", "POST", {});
      if (res.ok) {
        if (res.emailed) toast(t("backup_done"));
        else if (res.email_note) toast(t("backup_done_noemail", { note: res.email_note }));
        else toast(t("backup_done_local"));
      } else {
        toast(t("backup_err", { msg: (res && res.error) || "backup failed" }));
      }
      await loadStatus();
    } catch (e) {
      const msg = String((e && e.message) || e || "");
      const friendly = /501|not ?implemented|unsupported/i.test(msg)
        ? t("backup_err_smtp")
        : /fetch|network|load/i.test(msg)
        ? t("backup_err_network", { msg })
        : msg;
      statusEl.innerHTML = `<div class="alert err">${esc(t("backup_err", { msg: friendly }))}</div>`;
    }
    busy(runBtn, false);
  });
  await loadStatus();
}

function renderBackupStatus(el, s) {
  const emailTxt = s.email_configured
    ? `${esc(t("backup_email_on"))} · ${esc(s.recipient || "")}`
    : esc(t("backup_email_off"));
  const lastTxt = s.last_run
    ? `${esc(String(s.last_run).replace("T", " "))}${s.last_file ? " · " + esc(s.last_file) : ""}` +
      (s.last_emailed === false && s.last_email_note ? " · " + esc(s.last_email_note) : "")
    : esc(t("backup_never"));
  const nextRows = s.last_rows != null
    ? ` · ${esc(String(s.last_rows))} ${s.last_tables != null ? s.last_tables : ""}` : "";
  el.innerHTML = `<div class="bk-status-grid">
      <div><span class="bk-k">${esc(t("backup_schedule"))}</span><span class="bk-v">${esc(String(s.schedule || ""))}</span></div>
      <div><span class="bk-k">${esc(t("backup_next"))}</span><span class="bk-v">${s.next_run ? esc(String(s.next_run).replace("T", " ")) + nextRows : esc(t("backup_never"))}</span></div>
      <div><span class="bk-k">${esc(t("backup_last"))}</span><span class="bk-v">${lastTxt}</span></div>
      <div><span class="bk-k">${esc(t("backup_email_cfg"))}</span><span class="bk-v">${emailTxt}</span></div>
    </div>`;
}

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
  const presup = state.suppliers.find((s) => s.id === r.supplier_id) || state.suppliers.find((s) => s.id === (state.tmpSupplierId || -1));
  const activeDef = sheetDefForName(presup ? presup.name : "");
  state.mecoTasks = buildMecoTasks(activeDef ? activeDef.tasks : [], isNew ? [] : state.clChecklist || []);
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
        <div id="supplier-sheet-block" hidden>${activeDef ? sheetFieldsHTML(activeDef, r, state.mecoTasks) : ""}</div>
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
           <div class="full"><div class="ai-custom" role="group" aria-label="${esc(t("extra_custom"))}">
             <input class="input" id="add-info-custom" placeholder="${esc(t("custom_field_name"))}" autocomplete="off">
             <button type="button" class="btn" data-act="ai-custom-add">${esc(t("custom_add_btn"))}</button>
           </div></div>
           <div class="full" id="add-info-fields"></div>
          <div class="full"><div class="field"><label>${esc(t("field_notes"))}</label><textarea class="textarea" rows="2" name="notes" data-rte-field>${esc(r.notes)}</textarea></div></div>
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
  setupSheetEditor(m);
  applySupplierSheet(m);
  const supSel = m.querySelector("#card-supplier");
  if (supSel) supSel.addEventListener("change", () => {
    clearSheetTemps(m);
    renderSheetBlock(m, sheetDefFromSelect(m));
    applySupplierSheet(m);
  });

  const printBtn = m.querySelector("#print-card-btn");
  if (printBtn) printBtn.addEventListener("click", () => window.print());

  m.querySelector('[data-act="save-card"]').addEventListener("click", async () => {
    const { payload, items: pendingItems } = buildCardPayload(m);
    if (!payload.supplier_id) return toast(t("required"));
    try {
      let created = null;
      if (isNew) {
        const res = await api("/api/imports", "POST", payload);
        created = res;
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
      delete state.activeSheetDef;
      delete state.tmpSupplierId;
      if (created && created.serial) {
        const sup = (state.suppliers || []).find((s) => String(s.id) === String(payload.supplier_id));
        const rec = {
          id: created.id,
          serial: created.serial,
          supplier_id: Number(payload.supplier_id) || null,
          supplier_name: sup ? sup.name : "",
          destination: String(payload.destination || ""),
          po_number: String(payload.po_number || ""),
          inbsip: String(payload.inbsip || ""),
          doc_number: String(payload.doc_number || ""),
          pallets: payload.pallets == null ? null : Number(payload.pallets),
          transitaire_bol: String(payload.transitaire_bol || ""),
          container: String(payload.container || ""),
          etd: String(payload.etd || ""),
          eta: String(payload.eta || ""),
          eta_van: String(payload.eta_van || ""),
          eta_dest: String(payload.eta_dest || ""),
          qc_sampling_qc: Number(payload.qc_sampling_qc) || 0,
          qc_sampling_reception: Number(payload.qc_sampling_reception) || 0,
          _done: 0,
          _total: 0,
        };
        state.imports = [rec].concat(state.imports || []);
        state.search = "";
        state.supFilter = "";
        if ((location.hash || "#/dashboard").replace(/^#\//, "") === "dashboard") {
          renderDashboard();
        } else {
          go("#/dashboard");
        }
        return;
      }
      await loadBase();
      render();
    } catch (e) {
      toast(t("save_err", { msg: e.message }));
    }
  });

  setupAutosaveImport(m, r);

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

function buildMecoTasks(spec, cl) {
  return (spec || []).map((mt) => {
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
      comments: item ? (item.notes || "") : (mt.defComment || ""),
      link: item ? (item.link || "") : "",
      extraLinks: item && Array.isArray(item.links) ? item.links.slice(1) : [],
      onRail: !!(meta.on_rail),
      etaNote: meta.eta_note || "",
    };
  });
}

function mecoExtraRowHTML(tidx, lki, value) {
  return `<div class="meco-xl-row">
      <span class="cl-link-ico" title="${esc(t("cl_link_label"))}">🔗</span>
      <input class="input meco-link-input" data-tidx="${tidx}" data-k="links" data-lki="${lki}" value="${esc(value || "")}" placeholder="${esc(t("cl_link_placeholder"))}" autocomplete="off" spellcheck="false">
      <button type="button" class="meco-link-del2" data-tidx="${tidx}" data-k="links-del" data-lki="${lki}" title="${esc(t("cl_link_remove"))}" aria-label="${esc(t("cl_link_remove"))}">🗑</button>
    </div>`;
}

function mecoTasksHTML(tasks) {
  const rows = tasks.map((tk, i) => {
    const lbl = state.lang === "fr" ? tk.fr : tk.en;
    const sub = tk.key === "meco_verified" || tk.key === "ingenious_verified" || tk.key === "navita_verified" || tk.key === "micota_verified" ? `
      <div class="meco-subrow">
        <label class="meco-onrail"><input type="checkbox" data-k="onrail" data-tidx="${i}" ${tk.onRail ? "checked" : ""}> ${esc(t("meco_onrail"))}</label>
        <span class="meco-fixed-label">${esc(t("meco_eta_suffix"))}</span>
        <input class="input" data-k="etanote" data-tidx="${i}" value="${esc(tk.etaNote || "")}" placeholder="YYYY-MM-DD">
      </div>` : "";
    return `<tr>
      <td class="meco-task-name">${esc(lbl)}</td>
      <td class="meco-status"><input type="checkbox" data-k="status" data-tidx="${i}" ${tk.done ? "checked" : ""}></td>
      <td class="meco-comments">
        <div class="meco-link-row" role="group" aria-label="${esc(t("meco_link_tip"))}">
          <a href="#" class="meco-view-link" data-tidx="${i}" data-k="${esc(tk.key)}" title="${esc(t("meco_link_tip"))}">🔗 <span class="meco-link-flag" data-link-flag="${i}">${tk.link ? "✓" : ""}</span></a>
          <span class="meco-link-label" data-link-label="${i}">${esc(tk.link || "")}</span>
          <button type="button" class="meco-link-del" data-link-del="${i}" title="${esc(t("cl_link_remove"))}" aria-label="${esc(t("cl_link_remove"))}" ${tk.link ? "" : "hidden"}>🗑</button>
        </div>
        <input class="input meco-link-input" data-tidx="${i}" data-k="link" value="${esc(tk.link || "")}" placeholder="${esc(t("cl_link_placeholder"))}" autocomplete="off" spellcheck="false" hidden>
        <div class="meco-xl" data-xl="${i}">${(tk.extraLinks || []).map((x, li) => mecoExtraRowHTML(i, li, x)).join("")}
          <button type="button" class="meco-link-add" data-tidx="${i}" data-k="links-add" title="${esc(t("cl_link_add"))}" aria-label="${esc(t("cl_link_add"))}">${esc(t("cl_link_add_txt"))}</button>
        </div>
        <input class="input" data-k="comments" data-tidx="${i}" value="${esc(tk.comments || "")}" placeholder="${esc(t("cl_comments_placeholder"))}">${sub}</td>
    </tr>`;
  }).join("");
  return `<table class="meco-table">
    <thead><tr><th>${esc(t("meco_col_tache"))}</th><th>${esc(t("meco_col_statut"))}</th><th>${esc(t("meco_col_commentaires"))}</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function sheetTasks() {
  return (state.activeSheetDef && state.activeSheetDef.tasks) || MECO_TASKS;
}

function mecoChecklistItems() {
  const meco = (state.mecoTasks || []).map((tk, i) => {
    const list = [String(tk.link || "").trim(), ...(tk.extraLinks || [])]
      .map((x) => String(x || "").trim()).filter(Boolean);
    return {
      task_key: tk.key,
      task_label_fr: tk.fr,
      task_label_en: tk.en,
      status: tk.done ? "done" : "pending",
      notes: tk.comments || "",
      link: list[0] || "",
      links: list,
      meta: JSON.stringify({ on_rail: !!tk.onRail, eta_note: tk.etaNote || "" }),
      position: i,
    };
  });
  const legacy = (state.clChecklist || [])
    .filter((it) => !sheetTasks().some((mt) => mt.key === it.task_key))
    .map((it, i) => {
      const lk = linkListPayload(it);
      return {
        task_key: it.task_key || "",
        task_label_fr: it.task_label_fr || "",
        task_label_en: it.task_label_en || "",
        status: it.status,
        notes: it.notes || "",
        link: lk.link,
        links: lk.links,
        position: meco.length + i,
      };
    });
  return [...meco, ...legacy];
}

function setupSheetEditor(m) {
  const block = m.querySelector("#supplier-sheet-block");
  if (!block) return;
  const refreshLink = (el) => {
    const row = el && el.closest("tr");
    if (!row) return;
    const flag = row.querySelector("[data-link-flag]");
    const lbl = row.querySelector("[data-link-label]");
    const del = row.querySelector("[data-link-del]");
    const v = String(el.value || "").trim();
    if (flag) flag.textContent = v ? "✓" : "";
    if (lbl) lbl.textContent = v;
    if (del) del.hidden = !v;
  };
  block.addEventListener("change", (e) => {
    const el = e.target;
    const idx = Number(el.dataset.tidx);
    if (isNaN(idx) || !state.mecoTasks[idx]) return;
    if (el.dataset.k === "status") state.mecoTasks[idx].done = el.checked;
    else if (el.dataset.k === "onrail") state.mecoTasks[idx].onRail = el.checked;
    else if (el.dataset.k === "link") refreshLink(el);
  });
  block.addEventListener("input", (e) => {
    const el = e.target;
    const idx = Number(el.dataset.tidx);
    if (isNaN(idx) || !state.mecoTasks[idx]) return;
    if (el.dataset.k === "comments") state.mecoTasks[idx].comments = el.value;
    else if (el.dataset.k === "etanote") state.mecoTasks[idx].etaNote = el.value;
    else if (el.dataset.k === "link") {
      state.mecoTasks[idx].link = el.value;
      refreshLink(el);
    } else if (el.dataset.k === "links") {
      state.mecoTasks[idx].extraLinks = state.mecoTasks[idx].extraLinks || [];
      state.mecoTasks[idx].extraLinks[Number(el.dataset.lki)] = el.value;
    }
  });
  block.addEventListener("keydown", (e) => {
    const el = e.target;
    if (!el || !el.matches || !el.matches('[data-k="link"]')) return;
    if (e.key !== "Enter" && e.key !== "Escape") return;
    e.preventDefault();
    if (e.key === "Escape") {
      const idx = Number(el.dataset.tidx);
      el.value = "";
      if (!isNaN(idx) && state.mecoTasks[idx]) state.mecoTasks[idx].link = "";
    }
    refreshLink(el);
    el.hidden = true;
    el.blur();
  });
  block.addEventListener("blur", (e) => {
    const el = e.target;
    if (!el || !el.matches || !el.matches('[data-k="link"]')) return;
    refreshLink(el);
    el.hidden = true;
  }, true);
  block.addEventListener("click", (e) => {
    const form = block.querySelector("form") || block.closest("form");
    const addBtn = e.target && e.target.closest ? e.target.closest("[data-k='links-add']") : null;
    if (addBtn) {
      e.preventDefault();
      e.stopPropagation();
      const idx = Number(addBtn.dataset.tidx);
      if (state.mecoTasks[idx]) {
        state.mecoTasks[idx].extraLinks = state.mecoTasks[idx].extraLinks || [];
        state.mecoTasks[idx].extraLinks.push("");
        const box = block.querySelector(`[data-xl="${idx}"]`);
        if (box) {
          const wrap = document.createElement("div");
          wrap.innerHTML = mecoExtraRowHTML(idx, state.mecoTasks[idx].extraLinks.length - 1, "");
          box.insertBefore(wrap.firstElementChild, box.lastElementChild);
          const inp = box.querySelector('[data-k="links"][data-lki="' + (state.mecoTasks[idx].extraLinks.length - 1) + '"]');
          if (inp) { inp.focus(); inp.select(); }
        }
      }
      if (form) form.dispatchEvent(new Event("input", { bubbles: true }));
      return;
    }
    const delBtn = e.target && e.target.closest ? e.target.closest("[data-k='links-del']") : null;
    if (delBtn) {
      e.preventDefault();
      e.stopPropagation();
      const idx = Number(delBtn.dataset.tidx);
      const lki = Number(delBtn.dataset.lki);
      if (state.mecoTasks[idx]) {
        state.mecoTasks[idx].extraLinks = state.mecoTasks[idx].extraLinks || [];
        state.mecoTasks[idx].extraLinks.splice(lki, 1);
        const rowEl = delBtn.closest(".meco-xl-row");
        if (rowEl) rowEl.remove();
      }
      if (form) form.dispatchEvent(new Event("input", { bubbles: true }));
      return;
    }
    const btn = e.target && e.target.closest ? e.target.closest("[data-link-del]") : null;
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const row = btn.closest("tr");
    const li = row && row.querySelector('[data-k="link"]');
    const idx = Number(btn.dataset.linkDel);
    if (!li) return;
    li.value = "";
    if (!isNaN(idx) && state.mecoTasks[idx]) state.mecoTasks[idx].link = "";
    refreshLink(li);
    li.hidden = true;
  });
}

function clearSheetTemps(m) {
  const block = m.querySelector("#supplier-sheet-block");
  if (block) {
    block.querySelectorAll("input,select,textarea").forEach((el) => {
      if (el.type === "checkbox") el.checked = false; else el.value = "";
    });
  }
  delete state.mecoTasks;
  delete state.activeSheetDef;
}

function sheetFieldsHTML(def, r, tasks) {
  const f = (v) => esc(r && r[v] != null ? r[v] : "");
  const num = (v) => r && r[v] != null ? esc(r[v]) : "";
  return `
    <div class="section-tag sec-gap">${esc(t("meco_form_title"))}${def && String(def.supName || "").trim() ? " — " + esc(String(def.supName).trim()) : ""}</div>
    <div class="form-grid">
      <div class="field"><label>${esc(t("meco_destination"))}</label><input class="input" name="destination" value="${f("destination")}"></div>
      <div class="field"><label>${esc(t("meco_po_nr"))}</label><input class="input" name="po_number" value="${f("po_number")}"></div>
      <div class="field"><label>${esc(t("meco_inbship_nr"))}</label><input class="input" name="inbsip" value="${f("inbsip")}"></div>
      <div class="field"><label>${esc(t("meco_doc"))}</label><input class="input" name="doc_number" value="${f("doc_number")}"></div>
      <div class="field"><label>${esc(t("meco_nb_plts"))}</label><input class="input" name="pallets" type="number" min="0" value="${num("pallets")}"></div>
      <div class="field"><label>${esc(t("field_bol"))}</label><input class="input" name="transitaire_bol" value="${f("transitaire_bol")}"></div>
      <div class="field"><label>${esc(t("field_container"))}</label><input class="input" name="container" value="${f("container")}"></div>
      <div class="field"><label>${esc(t("field_etd"))}</label><input class="input" name="etd" type="date" value="${f("etd")}"></div>
      <div class="field"><label>${esc(t("meco_eta_van"))}</label><input class="input" name="eta_van" type="date" value="${f("eta_van")}"></div>
      <div class="field"><label>${esc(t("meco_eta_dest"))}</label><input class="input" name="eta_dest" type="date" value="${f("eta_dest")}"></div>
      ${["MECO", "INGENIOUS", "NAVITA", "MICOTA"].indexOf(String(def.supName || "").toUpperCase()) === -1 ? `
      <div class="field"><label>${esc(t("meco_qc_label"))}</label>
        <label class="meco-qc"><input type="checkbox" name="qc_sampling_qc" ${r && r.qc_sampling_qc ? "checked" : ""}> ${esc(t("meco_qc_qc"))}</label>
        <label class="meco-qc"><input type="checkbox" name="qc_sampling_reception" ${r && r.qc_sampling_reception ? "checked" : ""}> ${esc(t("meco_qc_reception"))}</label>
      </div>` : ""}
    </div>
    <div class="section-tag sec-gap">${esc(t("meco_tasks_title"))}</div>
    ${mecoTasksHTML(tasks || [])}`;
}

function renderSheetBlock(m, def) {
  const block = m.querySelector("#supplier-sheet-block");
  if (!block) return;
  if (def) {
    state.mecoTasks = buildMecoTasks(def.tasks || [], []);
    block.innerHTML = sheetFieldsHTML(def, {}, state.mecoTasks);
    block.hidden = false;
  } else {
    block.innerHTML = "";
    block.hidden = true;
  }
}

function applySupplierSheet(m) {
  const def = sheetDefFromSelect(m);
  const block = m.querySelector("#supplier-sheet-block");
  const gen = m.querySelectorAll("#generic-fields [data-core]");
  const cl = m.querySelector("#generic-checklist");
  const head = m.querySelector("#generic-cl-head");
  if (block) {
    block.hidden = !def;
    block.querySelectorAll("input,select,textarea").forEach((el) => { el.disabled = !def; });
  }
  gen.forEach((cell) => {
    cell.hidden = !!def;
    const inp = cell.querySelector("input,select,textarea");
    if (inp) inp.disabled = !!def;
  });
  if (head) head.hidden = !!def;
  if (cl) {
    cl.hidden = !!def;
    cl.querySelectorAll("input,select,textarea,button").forEach((el) => { el.disabled = !!def; });
  }
  state.mecoMode = !!def;
  state.activeSheetDef = def;
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

function linksOf(it) {
  // Normalise vers une liste de URLs : prefere `links` (array), sinon adapte
  // l'ancien champ mono-valeur `link` (plus aucune perte ni casse). La liste
  // brute est conservee telle quelle (y compris les champs vides en cours de
  // saisie) pour que la UI reflete exactement les lignes stockees.
  if (it && Array.isArray(it.links)) {
    return it.links.map((x) => (typeof x === "string" ? x.trim() : ""));
  }
  const v = it && it.link != null ? String(it.link).trim() : "";
  return v ? [v] : [];
}

function linkListPayload(tk) {
  // Construit le payload a envoyer au serveur : chaines non-vides uniquement.
  const arr = linksOf(tk).filter((s) => s.length > 0);
  return { link: arr[0] || "", links: arr };
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
      ${linkRowsHTML(it, idx)}
      <label class="cl-field-label">${esc(t("cl_comments_label"))}</label>
      <input class="input" data-field="comments" data-idx="${idx}" value="${esc(it.notes || "")}" placeholder="${esc(t("cl_comments_placeholder"))}">
    </div>
    <button type="button" class="btn xsmall danger" data-act="del-task" data-idx="${idx}">✕</button>
  </li>`;
}

function linkRowsHTML(it, idx) {
  const lks = linksOf(it);
  const list = lks.length ? lks : [""];
  return list.map((v, li) => `<div>
      <div class="cl-link-row">
        <span class="cl-link-ico" title="${esc(t("cl_link_label"))}">🔗</span>
        <input class="input" data-field="link" data-idx="${idx}" data-lki="${li}" value="${esc(v || "")}" placeholder="${esc(t("cl_link_placeholder"))}" autocomplete="off" spellcheck="false">
        <button type="button" class="btn xsmall danger cl-link-del" data-act="del-link" data-idx="${idx}" data-lki="${li}" title="${esc(t("cl_link_remove"))}" aria-label="${esc(t("cl_link_remove"))}" ${(v || li > 0) ? "" : "hidden"}>🗑</button>
      </div>
      <div class="link-preview" data-link-preview="${idx}-${li}">${linkPreviewHTML(v)}</div>
    </div>`).join("") +
    `<button type="button" class="btn ghost xsmall cl-link-add" data-act="add-link" data-idx="${idx}" title="${esc(t("cl_link_add"))}" aria-label="${esc(t("cl_link_add"))}">${esc(t("cl_link_add_txt"))}</button>`;
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
      form.dispatchEvent(new Event("input", { bubbles: true }));
    } else if (act === "del-link") {
      const idx = Number(b.dataset.idx);
      const lki = Number(b.dataset.lki);
      const item = state.clChecklist[idx];
      if (!item) return;
      const arr = linksOf(item);
      arr.splice(lki, 1);
      item.links = arr;
      renderChecklistBody(m);
      form.dispatchEvent(new Event("input", { bubbles: true }));
    } else if (act === "add-link") {
      const idx = Number(b.dataset.idx);
      const item = state.clChecklist[idx];
      if (!item) return;
      const base = (Array.isArray(item.links) && item.links.length
        ? item.links.slice()
        : (linksOf(item).length ? linksOf(item) : [""]));
      base.push("");
      item.links = base;
      renderChecklistBody(m);
      const inputs = m.querySelectorAll(`#cl-area [data-idx="${idx}"][data-field="link"]`);
      const last = inputs[inputs.length - 1];
      if (last) { last.focus(); last.select(); }
      form.dispatchEvent(new Event("input", { bubbles: true }));
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
      const lki = Number(e.target.dataset.lki);
      state.clChecklist[idx].links = linksOf(state.clChecklist[idx]);
      if (!isNaN(lki)) {
        state.clChecklist[idx].links[lki] = e.target.value;
        updateLinkPreview(m, idx, lki, e.target.value);
        const row = e.target.closest(".cl-link-row");
        const trashBtn = row && row.querySelector('[data-act="del-link"]');
        if (trashBtn && String(e.target.value || "").trim()) trashBtn.hidden = false;
      }
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

function updateLinkPreview(m, idx, lki, value) {
  const area = m.querySelector("#cl-area");
  if (!area) return;
  const wrap = area.querySelector(`[data-link-preview="${idx}-${lki}"]`);
  if (!wrap) return;
  wrap.innerHTML = linkPreviewHTML(value);
}

function renderChecklistBody(m) {
  const area = m.querySelector("#cl-area");
  if (area) area.innerHTML = checklistEditorHTML(state.clChecklist || []);
}

/* ---------------------------------------------------------------- attachments */

function buildCardPayload(m) {
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
  if (payload.pallets === "") payload.pallets = null;
  else payload.pallets = Number(payload.pallets);
  const items = state.mecoMode
    ? mecoChecklistItems()
    : (state.clChecklist || []).map((it) => {
        const lk = linkListPayload(it);
        return {
          task_key: it.task_key || "",
          task_label_fr: it.task_label_fr || "",
          task_label_en: it.task_label_en || "",
          status: it.status,
          notes: it.notes || "",
          link: lk.link,
          links: lk.links,
          position: it.position,
        };
      });
  return { payload, items };
}

function setupAutosaveImport(m, r) {
  // Sauvegarde instantanee (debounce 1,2 s) uniquement en mode edition :
  // la creation ("Nouveau") reste soumise au bouton Enregistrer explicite.
  const id = r && r.id;
  const form = m.querySelector("#card-form");
  if (!id || !form) return;
  let timer = null;
  let inFlight = false;
  let pending = false;
  const footer = m.querySelector(".modal-f");
  let hint = footer ? footer.querySelector(".bk-autohint") : null;
  if (!hint && footer) {
    hint = document.createElement("span");
    hint.className = "bk-autohint";
    hint.style.marginRight = "auto";
    hint.style.alignSelf = "center";
    footer.insertBefore(hint, footer.firstChild);
  }
  const flash = () => {
    if (!hint) return;
    hint.innerHTML = "💾";
    hint.style.opacity = "1";
    setTimeout(() => { if (hint && hint.style.opacity) hint.style.opacity = "0"; }, 700);
  };
  const fire = async () => {
    if (inFlight) { pending = true; return; }
    if (!document.contains(form)) { if (timer) clearTimeout(timer); return; }
    let fp;
    try { const b = buildCardPayload(m); fp = JSON.stringify([b.payload, b.items]); } catch (e) { return; }
    // Aucune modification depuis la derniere sauvegarde -> aucun appel inutile.
    if (fp === baseline || fp === lastSent) { if (timer) clearTimeout(timer); return; }
    inFlight = true;
    try {
      const built = buildCardPayload(m);
      await api("/api/imports/" + id, "PUT", built.payload);
      if (built.items.length) await api("/api/imports/" + id + "/checklist", "PUT", { items: built.items });
      lastSent = fp;
      baseline = fp;
      flash();
    } catch (e) {
      // Silencieux : le bouton Enregistrer reste disponible en cas d'echec.
      if (hint) {
        hint.innerHTML = "⚠ ";
        hint.style.opacity = "1";
        setTimeout(() => { if (hint && hint.style.opacity) hint.style.opacity = "0"; }, 2500);
      }
    }
    inFlight = false;
    if (pending) { pending = false; fire(); }
  };
  let baseline = "";
  try { baseline = JSON.stringify([buildCardPayload(m).payload, buildCardPayload(m).items]); } catch (e) { baseline = ""; }
  let lastSent = "";
  form.addEventListener("input", () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fire, 1200);
  });
  // Le formulaire est re-injecte a la fermeture : on neutralise le debounce.
  const observer = new MutationObserver(() => {
    if (!document.contains(form)) {
      if (timer) clearTimeout(timer);
    }
  });
  observer.observe(form.parentElement || form, { childList: true, subtree: true });
}

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
  const label = AI_KEYS.includes(it.type) ? t("ai_" + it.type) : it.type;
  return `<div class="ai-row">
    <span class="ai-key">${esc(label)}</span>
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
  const custInput = m.querySelector("#add-info-custom");
  const custBtn = m.querySelector('[data-act="ai-custom-add"]');
  const addCustom = () => {
    const name = (custInput ? custInput.value : "").trim();
    if (!name) {
      toast(t("extra_need_name"));
      return;
    }
    if ((state.addInfo || []).some((x) => x.type.trim().toLowerCase() === name.toLowerCase())) {
      toast(t("extra_dup"));
      return;
    }
    state.addInfo.push({ type: name, value: "" });
    if (custInput) custInput.value = "";
    renderAddInfoFields(m);
    refreshAddInfoOptions(m);
  };
  if (custBtn) custBtn.addEventListener("click", addCustom);
  if (custInput) custInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustom();
    }
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
  const d = daysUntil(arrivalRef(r));
  const rel = d === null ? "—" : d < 0 ? t("chat_rel_overdue", { d: Math.abs(d) }) : d === 0 ? t("chat_rel_today") : t("chat_rel_days", { d });
  return { msg: `${esc(refLabel(r))} — ${esc(fmtDate(r.eta))} (${rel})`, row: r };
}

function chatImportLines(rows) {
  return rows.slice(0, 3).map((r) => {
    const d = daysUntil(arrivalRef(r));
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
      const chips = [{ label: `${n} ${t("chat_go_imports")}`, act: "nav", hash: "#/dashboard" }];
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
    const up = imports.filter((i) => { const a = arrivalRef(i); return a && daysUntil(a) >= 0; });
    if (!up.length) return chatWidget([t("chat_arr_none")], chatDefaultChips());
    const days = chatDaysOf(q);
    const windowed = up.filter((i) => daysUntil(arrivalRef(i)) <= days);
    const list = windowed.length ? windowed : up;
    const lines = list.slice(0, 5).map((r) => chatUpcomingRow(r).msg);
    const header = windowed.length
      ? t("chat_arr_soon", { d: days, n: windowed.length })
      : t("chat_arr_header", { n: up.length });
    return chatWidget([header].concat(lines), chatDefaultChips());
  }

  if (chatHas(q, "retard", "overdue", "dépassé", "depasse", "late")) {
    const over = imports.filter((i) => { const a = arrivalRef(i); return a && daysUntil(a) < 0; });
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
    const soon = imports.filter((i) => { const a = arrivalRef(i); const d = a ? daysUntil(a) : null; return d !== null && d >= 0 && d <= 7; }).length;
    const over = imports.filter((i) => { const a = arrivalRef(i); const d = a ? daysUntil(a) : null; return d !== null && d < 0; }).length;
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
    { label: t("chat_q_statistiques"), act: "send", q: "statistiques" },
    { label: t("chat_q_retards"), act: "send", q: t("chat_q_retards") },
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

function chatSourceTag(src) {
  const map = { internal: "chat_src_internal", external: "chat_src_external", knowledge: "chat_src_knowledge", system: "chat_src_system" };
  const label = t(map[src] || "chat_src_system");
  return `<span class="chat-src chat-src-${esc(src || "system")}">${esc(label)}</span>`;
}

function chatCitationHtml(citations) {
  return (citations && citations.length)
    ? `<div class="chat-cites">${citations.map((c) => `<span class="chat-cite"><b>${esc(c.kicker || "SRC")}</b> ${esc(c.label || "")}</span>`).join("")}</div>`
    : "";
}

function renderChatChart(payload) {
  if (!payload) return "";
  const kind = payload.kind || "";
  const title = esc(payload.title || t("chat_chart_total"));
  if (kind === "table") {
    const cols = payload.columns || [];
    const rows = payload.rows || [];
    return `<div class="chat-chart chat-chart-table"><div class="chat-chart-title">${title}</div>
      <table><thead><tr>${cols.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead>
      <tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${esc(String(c))}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }
  if (kind === "donut" || kind === "bar") {
    const labels = payload.labels || [];
    const values = payload.values || [];
    const total = values.reduce((a, b) => a + (Number(b) || 0), 0) || 1;
    const pal = ["#4e79a7", "#f28e2b", "#59a14f", "#e15759", "#76b7b2", "#edc948", "#b07aa1"];
    const arcs = [];
    let acc = 0;
    values.forEach((v, i) => {
      const frac = (Number(v) || 0) / total;
      arcs.push([acc * 360, (acc + frac) * 360, i]);
      acc += frac;
    });
    const R = 40, Cx = 55, Cy = 55;
    const pt = (deg, rad) => {
      const a = ((deg - 90) * Math.PI) / 180;
      return `${(Cx + rad * Math.cos(a)).toFixed(2)},${(Cy + rad * Math.sin(a)).toFixed(2)}`;
    };
    const donut = arcs.map(([a0, a1, i]) => {
      if (a1 - a0 >= 360) return `<circle cx="${Cx}" cy="${Cy}" r="${R - 7}" fill="${pal[i % pal.length]}"/>`;
      const large = (a1 - a0) > 180 ? 1 : 0;
      const d = `M ${pt(a0, R)} A ${R} ${R} 0 ${large} 1 ${pt(a1, R)} L ${pt(a1, R - 14)} A ${R - 14} ${R - 14} 0 ${large} 0 ${pt(a0, R - 14)} Z`;
      return `<path d="${d}" fill="${pal[i % pal.length]}"/>`;
    }).join("");
    const legend = labels.map((l, i) => `<span class="chat-legend"><i style="background:${pal[i % pal.length]}"></i>${esc(l)} : ${values[i] || 0}</span>`).join("");
    return `<div class="chat-chart chat-chart-donut"><div class="chat-chart-title">${title}</div>
      <div class="chat-chart-flex"><svg viewBox="0 0 110 110" width="110" height="110" role="img" aria-label="${title}">${donut}</svg>
      <div class="chat-legendbox">${legend}</div></div></div>`;
  }
  return "";
}

function pushChatBot(text, chips, opts) {
  opts = opts || {};
  const chipHtml = (chips && chips.length)
    ? `<div class="chats">${chips.map((c) => {
        if (c.act === "open") return `<button class="chip" data-act="chat-open-card" data-id="${c.id}">${esc(c.label)}</button>`;
        if (c.act === "nav") return `<button class="chip" data-act="nav" data-nav="${c.hash.replace(/^#\//, "")}">${esc(c.label)}</button>`;
        return `<button class="chip" data-act="chat-chip" data-q="${esc(c.q || c.label)}">${esc(c.label)}</button>`;
      }).join("")}</div>` : "";
  const src = opts.src ? chatSourceTag(opts.src) + " " : "";
  const cites = opts.citations ? chatCitationHtml(opts.citations) : "";
  const chart = opts.payload ? renderChatChart(opts.payload) : "";
  pushChatMsg("bot", src + text.split("\n").map((l) => `<div class="para">${l}</div>`).join("") + chart + cites + chipHtml);
}

function replaceTypingDot() {
  const body = document.getElementById("chat-body");
  if (!body) return;
  const msgs = body.querySelectorAll(".chat-msg.bot");
  if (msgs.length) msgs[msgs.length - 1].remove();
}

async function sendChat(q) {
  const text = String(q || "").trim();
  if (!text) return;
  pushChatMsg("user", esc(text));
  let src = "system";
  let answer = null, chips = null, citations = null, payload = null;
  pushChatBot(t("chat_typing"), [], { src: "system" });
  try {
    const page = String(location.hash || "#/dashboard").replace(/^#\//, "");
    const res = await api("/api/assistant/chat", "POST", { message: text, lang: state.lang || "fr", page });
    if (res && res.answer) {
      src = res.source || "system";
      answer = res.answer;
      chips = res.quick_actions || [];
      citations = res.citations || [];
      payload = res.payload || null;
    }
  } catch (err) { /* service indisponible -> repli local */ }
  replaceTypingDot();
  if (answer === null) {
    const local = chatbotAnswer(text);
    answer = t("chat_unavailable") + local.text;
    chips = local.chips;
    src = "system";
  }
  pushChatBot(answer, chips, { src, citations, payload });
}

const chatSparkle = () =>
  '<svg class="chat-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2l1.9 5.7L19.6 9.6l-5.7 1.9L12 17.2l-1.9-5.7L4.4 9.6l5.7-1.9z M19 14l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z"/></svg>';

const chatMicIcon = () =>
  '<svg class="chat-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11z"/></svg>';

const chatExportIcon = () =>
  '<svg class="chat-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm2 12h-3v5h-2v-5H8l4-5z"/></svg>';

const chatUploadIcon = () =>
  '<svg class="chat-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/></svg>';

async function uploadChatDocs(files) {
  for (const f of files) {
    const fd = new FormData();
    fd.append("file", f);
    pushChatMsg("user", esc(t("chat_upload_doc") + " · " + f.name));
    try {
      const res = await api("/api/assistant/documents", "POST", fd);
      if (res && res.ok && res.documents && res.documents.length) {
        const d = res.documents[0];
        const note = d.parsed ? "" : " (" + esc(d.note || "") + ")";
        pushChatBot(t("chat_doc_ok", { name: d.original_name, n: d.chars }) + note, [], { src: "internal" });
      } else {
        pushChatBot(t("chat_doc_fail"), [], { src: "system" });
      }
    } catch (err) {
      pushChatBot(t("chat_doc_fail"), [], { src: "system" });
    }
  }
}

/* ------------------------------------------------------------------ */
/* Rich Text Editor (WYSIWYG) — composant global reutilisable.          */
/* API : window.RTE = { create(container, opts), upgradeAll(), current } */
/* Auto-upgrade : toute zone marquee [data-rte-field] est convertie,     */
/* meme si elle est injectee plus tard (MutationObserver).               */
/* Props : { value, placeholder, name, locale, onInput }                 */
/* ------------------------------------------------------------------ */

window.RTE = {
  create: null,
  upgradeAll: null,
  current: [],
  _obs: null,
  _wired: false,
  version: "1.0.0"
};

const rteIconUndo = () => '<svg class="rte-ic" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M12.5 8c-2.5 0-4.8 1-6.5 2.6L3.5 8v6h6.2L7.2 11.6C8.7 10.3 10.6 9.5 12.5 9.5c2.5 0 4.7 1.2 6.3 3.1l2.4-1.3A10 10 0 0 0 12.5 8z"/></svg>';
const rteIconRedo = () => '<svg class="rte-ic" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M11.5 8c2.5 0 4.8 1 6.5 2.6L20.5 8v6h-6.2l2.5-2.4C15.3 10.3 13.4 9.5 11.5 9.5 9 9.5 6.8 10.7 5.2 12.6l-2.4-1.3A10 10 0 0 1 11.5 8z"/></svg>';
const rteIconBullets = () => '<svg class="rte-ic" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><circle cx="6" cy="7" r="1.6" fill="currentColor"/><path d="M10 7h10M10 12h10M10 17h10M6 12h.01M6 17h.01" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const rteIconNumbers = () => '<svg class="rte-ic" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><text x="5" y="5.5" font-size="4.5" fill="currentColor">1.</text><text x="5" y="11" font-size="4.5" fill="currentColor">2.</text><text x="5" y="16.5" font-size="4.5" fill="currentColor">3.</text><path d="M12 8h8M12 13h8M12 18h8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const rteIconLink = () => '<svg class="rte-ic" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1 0l2.8-2.8a5 5 0 0 0-7.1-7.1L11 5.1M14 11a5 5 0 0 0-7.1 0l-2.8 2.8a5 5 0 0 0 7.1 7.1L13 18.9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const rteIconImage = () => '<svg class="rte-ic" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="8.5" cy="10" r="1.6" fill="currentColor"/><path d="M21 14.5L16 9.5 5 21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const rteIconTable = () => '<svg class="rte-ic" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><rect x="3" y="5" width="18" height="14" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 10h18M3 15h18M10 10v9" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
const rteIconUpload = () => '<svg class="rte-ic" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M12 15V4M7 8l5-5 5 5M5 13v6h14v-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const rteIconLeft = () => '<svg class="rte-ic" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M4 6h16M4 10h10M4 14h16M4 18h10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const rteIconCenter = () => '<svg class="rte-ic" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M5 6h14M8 10h8M5 14h14M8 18h8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const rteIconRight = () => '<svg class="rte-ic" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M4 6h16M10 10h10M4 14h16M10 18h10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const rteIconFullscreen = () => '<svg class="rte-ic" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const rteIconSource = () => '<svg class="rte-ic" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M10 6L4 12l6 6M14 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function sanitizeRTEHTML(html) {
  let h = String(html == null ? "" : html);
  h = h.replace(/<script[\s\S]*?<\/script>/gi, "");
  h = h.replace(/<iframe[\s\S]*?<\/iframe>/gi, "");
  const tmp = document.createElement("div");
  tmp.innerHTML = h;
  const bad = [];
  Array.prototype.forEach.call(tmp.querySelectorAll("*"), (el) => {
    if (el.tagName === "SCRIPT" || el.tagName === "IFRAME") { bad.push(el); return; }
    const names = [];
    Array.prototype.forEach.call(el.attributes || [], (a) => { names.push(a.name); });
    names.forEach((n) => {
      const ln = n.toLowerCase();
      const sv = String(el.getAttribute(n) || "");
      if (ln.indexOf("on") === 0 || ((ln === "href" || ln === "src" || ln === "xlink:href") && /^\s*javascript:/i.test(sv))) {
        el.removeAttribute(n);
      }
    });
  });
  bad.forEach((el) => { if (el.parentNode) el.parentNode.removeChild(el); });
  return tmp.innerHTML;
}

function createRichTextEditor(container, opts) {
  opts = opts || {};
  const lang = (opts.locale || state.lang || "fr") === "en" ? "en" : "fr";
  const T = (k) => (I18N[lang] && I18N[lang][k] != null ? I18N[lang][k] : k);

  const root = document.createElement("div");
  root.className = "rte";
  root.innerHTML = `
    <div class="rte-bar rte-bar-1">
      <button type="button" class="rte-btn" data-rte="undo" title="${T("rte_undo")}" aria-label="${T("rte_undo")}">${rteIconUndo()}</button>
      <button type="button" class="rte-btn" data-rte="redo" title="${T("rte_redo")}" aria-label="${T("rte_redo")}">${rteIconRedo()}</button>
      <span class="rte-sep"></span>
      <button type="button" class="rte-btn rte-btn-b" data-rte="bold" title="${T("rte_bold")}" aria-label="${T("rte_bold")}">B</button>
      <button type="button" class="rte-btn rte-btn-i" data-rte="italic" title="${T("rte_italic")}" aria-label="${T("rte_italic")}">I</button>
      <button type="button" class="rte-btn rte-btn-s" data-rte="strike" title="${T("rte_strike")}" aria-label="${T("rte_strike")}">S</button>
      <span class="rte-sep"></span>
      <button type="button" class="rte-btn" data-rte="ul" title="${T("rte_ul")}" aria-label="${T("rte_ul")}">${rteIconBullets()}</button>
      <button type="button" class="rte-btn" data-rte="ol" title="${T("rte_ol")}" aria-label="${T("rte_ol")}">${rteIconNumbers()}</button>
      <span class="rte-sep"></span>
      <button type="button" class="rte-btn" data-rte="hr" title="${T("rte_hr")}" aria-label="${T("rte_hr")}">—</button>
      <span class="rte-sep"></span>
      <select class="rte-select" data-rte="style" title="${T("rte_style")}" aria-label="${T("rte_style")}">
        <option value="p">${T("rte_style_p")}</option>
        <option value="h1">${T("rte_style_h1")}</option>
        <option value="h2">${T("rte_style_h2")}</option>
        <option value="h3">${T("rte_style_h3")}</option>
      </select>
      <span class="rte-sep"></span>
      <button type="button" class="rte-btn" data-rte="link" title="${T("rte_link")}" aria-label="${T("rte_link")}">${rteIconLink()}</button>
      <button type="button" class="rte-btn" data-rte="image" title="${T("rte_image")}" aria-label="${T("rte_image")}">${rteIconImage()}</button>
      <button type="button" class="rte-btn" data-rte="table" title="${T("rte_table")}" aria-label="${T("rte_table")}">${rteIconTable()}</button>
      <button type="button" class="rte-btn" data-rte="upload" title="${T("rte_upload")}" aria-label="${T("rte_upload")}">${rteIconUpload()}</button>
      <span class="rte-grow"></span>
      <button type="button" class="rte-btn" data-rte="more" title="${T("rte_more")}" aria-label="${T("rte_more")}" aria-expanded="false">…</button>
    </div>
    <div class="rte-bar rte-bar-2" data-rte="bar2">
      <button type="button" class="rte-btn" data-rte="left" title="${T("rte_align")}" aria-label="${T("rte_align")}">${rteIconLeft()}</button>
      <button type="button" class="rte-btn" data-rte="center" title="${T("rte_center")}" aria-label="${T("rte_center")}">${rteIconCenter()}</button>
      <button type="button" class="rte-btn" data-rte="right" title="${T("rte_right")}" aria-label="${T("rte_right")}">${rteIconRight()}</button>
      <span class="rte-sep"></span>
      <button type="button" class="rte-btn" data-rte="fullscreen" title="${T("rte_fullscreen")}" aria-label="${T("rte_fullscreen")}">${rteIconFullscreen()}</button>
      <button type="button" class="rte-btn" data-rte="source" title="${T("rte_source")}" aria-label="${T("rte_source")}">${rteIconSource()}</button>
    </div>
    <div class="rte-editor rte-empty" data-rte="editor" contenteditable="true" spellcheck="true" autocorrect="on" data-placeholder="${esc(opts.placeholder || T("rte_placeholder"))}"></div>
    <textarea class="rte-source-edit" data-rte="srcarea" spellcheck="false" hidden></textarea>
    <input type="file" class="rte-file" data-rte="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,.md,.markdown,.json,.eml,.log,.html,.png,.jpg,.jpeg,.gif,.webp,.bmp,.svg,.tif,.tiff" hidden>
    ${opts.name ? '<input type="hidden" data-rte="hidden" name="' + esc(opts.name) + '">' : ""}
  `;
  if (container) {
    if (container.appendChild) container.appendChild(root);
  } else {
    (document.body || document.documentElement).appendChild(root);
  }

  const editor = root.querySelector('[data-rte="editor"]');
  const srcArea = root.querySelector('[data-rte="srcarea"]');
  const hiddenIn = root.querySelector('[data-rte="hidden"]');
  const fileInput = root.querySelector('[data-rte="file"]');
  const styleSel = root.querySelector('[data-rte="style"]');
  const moreBtn = root.querySelector('[data-rte="more"]');
  const fullBtn = root.querySelector('[data-rte="fullscreen"]');
  const srcBtn = root.querySelector('[data-rte="source"]');

  let srcMode = false;
  let full = false;
  const sanitizers = [];

  try { document.execCommand("styleWithCSS", false, false); } catch (_) {}

  editor.innerHTML = sanitizeRTEHTML(opts.value || "");
  if (opts.value && hiddenIn) hiddenIn.value = opts.value;

  function syncHidden() {
    if (hiddenIn) hiddenIn.value = editor.innerHTML;
  }

  function fireInput() {
    syncHidden();
    editor.classList.toggle("rte-empty", !(editor.textContent || "").trim());
    const ev = new CustomEvent("rte-input", { detail: { html: editor.innerHTML, editor: editor, root: root } });
    root.dispatchEvent(ev);
    if (typeof opts.onInput === "function") opts.onInput(editor.innerHTML, root);
  }

  function run(cmd, val) {
    if (srcMode && cmd !== "insertHTML") return;
    editor.focus();
    try { document.execCommand(cmd, false, val == null ? null : val); } catch (_) {}
    fireInput();
    if (opts._debug) opts._debug(cmd, val);
  }

  function promptURL(msg, current) {
    const v = window.prompt(msg, String(current || ""), "rte");
    if (v === null || v === "") return "";
    let u = String(v).trim();
    if (/^(https?|mailto|tel|ftp):/i.test(u) || u.charAt(0) === "/" || u.charAt(0) === "#" || /^[a-z0-9]+\./i.test(u)) return u;
    return "https://" + u;
  }

  function doLink() {
    const sel = window.getSelection();
    const anc = sel && sel.anchorNode && sel.anchorNode.nodeType === 1
      ? sel.anchorNode
      : (sel && sel.anchorNode ? sel.anchorNode.parentElement : null);
    const anchor = anc ? (anc.closest ? anc.closest("a") : null) : null;
    if (anchor) {
      const u = promptURL(T("rte_link_prompt"), anchor.getAttribute("href") || "");
      if (u === "") run("unlink");
      else run("createLink", u);
      return;
    }
    const u = promptURL(T("rte_link_prompt"), "");
    if (u === "") return;
    run("createLink", u);
  }

  function doImage() {
    const u = promptURL(T("rte_image_prompt"), "");
    if (u === "") return;
    run("insertImage", u);
  }

  function doTable() {
    const markup = '<div class="rte-sep-para"><br></div><table class="rte-tbl"><tbody><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><div class="rte-sep-para"><br></div>';
    run("insertHTML", markup);
  }

  function toggleBar2() {
    const open = !root.classList.contains("rte-row2-open");
    root.classList.toggle("rte-row2-open", open);
    moreBtn.classList.toggle("active", open);
    moreBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function toggleFullscreen() {
    full = !full;
    root.classList.toggle("rte-fullscreen", full);
    fullBtn.classList.toggle("active", full);
    if (full) { editor.focus(); }
  }

  function toggleSource() {
    srcMode = !srcMode;
    srcBtn.classList.toggle("active", srcMode);
    if (srcMode) {
      srcArea.value = editor.innerHTML;
      editor.hidden = true;
      srcArea.hidden = false;
      srcArea.focus();
    } else {
      editor.innerHTML = sanitizeRTEHTML(srcArea.value);
      srcArea.hidden = true;
      editor.hidden = false;
      fireInput();
      editor.focus();
    }
  }

  root.addEventListener("pointerdown", (e) => {
    const b = e.target.closest("[data-rte]");
    if (b && b.dataset.rte !== "file" && e.cancelable) e.preventDefault();
  });

  root.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-rte]");
    if (!b) return;
    switch (b.dataset.rte) {
      case "undo": run("undo"); break;
      case "redo": run("redo"); break;
      case "bold": run("bold"); break;
      case "italic": run("italic"); break;
      case "strike": run("strikeThrough"); break;
      case "ul": run("insertUnorderedList"); break;
      case "ol": run("insertOrderedList"); break;
      case "hr": run("insertHorizontalRule"); break;
      case "link": doLink(); break;
      case "image": doImage(); break;
      case "table": doTable(); break;
      case "upload": if (fileInput) fileInput.click(); break;
      case "more": toggleBar2(); break;
      case "left": run("justifyLeft"); break;
      case "center": run("justifyCenter"); break;
      case "right": run("justifyRight"); break;
      case "fullscreen": toggleFullscreen(); break;
      case "source": toggleSource(); break;
    }
  });

  styleSel.addEventListener("change", () => {
    const v = styleSel.value || "p";
    run("formatBlock", "<" + v + ">");
  });

  editor.addEventListener("input", () => { fireInput(); inst._update(); });
  editor.addEventListener("keyup", instKeepUp);
  editor.addEventListener("mouseup", instKeepUp);
  root.addEventListener("focusout", () => syncHidden());
  root.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (srcMode) toggleSource();
      else if (full) toggleFullscreen();
    }
  });

  fileInput.addEventListener("change", () => {
    const files = Array.prototype.slice.call(fileInput.files || []);
    if (!files.length) return;
    fileInput.value = "";
    files.forEach(function (f) {
      if (f.size > 10 * 1024 * 1024) {
        toast(T("rte_file_too_big"));
        return;
      }
      const isImg = !!(f.type && f.type.indexOf("image/") === 0);
      const rd = new FileReader();
      rd.onerror = () => { toast(T("rte_file_too_big")); };
      rd.onload = () => {
        const dataUrl = String(rd.result || "");
        if (isImg) {
          run("insertImage", dataUrl);
        } else {
          run("insertHTML", '<a href="' + dataUrl + '" target="_blank" rel="noopener">' + esc(f.name) + "</a>");
        }
        if (!(f instanceof Blob)) return;
        try {
          const qsrc = isImg ? "src" : "href";
          const targetSel = isImg ? "img" : "a";
          const inserted = Array.prototype.slice.call(editor.querySelectorAll(targetSel))
            .filter((el) => el.getAttribute(qsrc) === dataUrl);
          if (!inserted.length) return;
          const fd = new FormData();
          fd.append("file", f, f.name);
          fetch("/api/rte/upload", { method: "POST", body: fd })
            .then((r) => (r.ok ? r.json() : Promise.reject(r)))
            .then((j) => {
              if (j && j.url) {
                inserted.forEach((el) => el.setAttribute(qsrc, j.url));
                fireInput();
              }
            })
            .catch(() => {});
        } catch (_) {}
      };
      rd.readAsDataURL(f);
    });
  });

  function instKeepUp() { inst._update(); }

  const inst = {
    root: root,
    name: opts.name || "",
    lang: lang,
    getHTML: () => editor.innerHTML,
    setHTML: (h) => { editor.innerHTML = sanitizeRTEHTML(h); fireInput(); },
    getValue: () => editor.innerHTML,
    getText: () => editor.innerText || editor.textContent || "",
    focus: () => editor.focus(),
    fullscreen: toggleFullscreen,
    sourceMode: toggleSource,
    _update: function () {
      if (srcMode) return;
      const qs = (c) => { try { return document.queryCommandState(c); } catch (_) { return false; } };
      const sb = (name, val) => { const el = root.querySelector('[data-rte="' + name + '"]'); if (el) el.classList.toggle("active", !!val); };
      sb("bold", qs("bold"));
      sb("italic", qs("italic"));
      sb("strike", qs("strikeThrough"));
      sb("ul", qs("insertUnorderedList"));
      sb("ol", qs("insertOrderedList"));
      sb("left", qs("justifyLeft"));
      sb("center", qs("justifyCenter"));
      sb("right", qs("justifyRight"));
      let fb = "";
      try { fb = String(document.queryCommandValue("formatBlock") || "").toLowerCase(); } catch (_) {}
      const cur = fb.replace(/[<>]/g, "");
      if (styleSel && ["p", "h1", "h2", "h3"].indexOf(cur) >= 0) styleSel.value = cur;
    },
    destroy: function () {
      root.remove();
      const i = RTE.current.indexOf(inst);
      if (i >= 0) RTE.current.splice(i, 1);
    }
  };

  RTE.current.push(inst);
  if (opts._debug) opts._debug("created", { lang: lang, name: opts.name });

  return inst;
}

RTE.create = createRichTextEditor;

function upgradeRTEFields() {
  const targets = document.querySelectorAll("[data-rte-field]:not([data-rte-upgraded])");
  Array.prototype.forEach.call(targets, (el) => {
    el.setAttribute("data-rte-upgraded", "1");
    const isTextarea = el.tagName === "TEXTAREA";
    const initial = isTextarea ? (el.value || "") : (el.innerHTML || "");
    const opts = {
      value: initial,
      placeholder: el.getAttribute("data-rte-placeholder") || "",
      name: el.getAttribute("name") || (isTextarea ? el.id : "") || ""
    };
    const rootWrap = document.createElement("div");
    rootWrap.className = "rte-wrap";
    rootWrap.setAttribute("data-rte-installed", "1");
    if (el.parentNode) el.parentNode.insertBefore(rootWrap, el);
    const inst = createRichTextEditor(rootWrap, opts);
    if (isTextarea && el.id) inst.root.setAttribute("data-rte-for", el.id);
    if (el.parentNode) el.parentNode.removeChild(el);
  });
}

RTE.upgradeAll = upgradeRTEFields;

function pruneRTEInstances() {
  for (let i = RTE.current.length - 1; i >= 0; i--) {
    if (!RTE.current[i].root || !RTE.current[i].root.isConnected) RTE.current.splice(i, 1);
  }
}

function enhanceTextInputs(root) {
  const host = root || document;
  const els = host.querySelectorAll('textarea, input:not([type]), input[type="text"], input[type="search"], [contenteditable="true"]');
  Array.prototype.forEach.call(els, (el) => {
    if (el.hasAttribute("spellcheck")) return;
    el.setAttribute("spellcheck", "true");
    el.setAttribute("autocorrect", "on");
  });
}

function initRTEAutoUpgrade() {
  if (RTE._obs) return;
  if (document.body) { upgradeRTEFields(); enhanceTextInputs(document.body); }
  const obs = new MutationObserver(() => { pruneRTEInstances(); upgradeRTEFields(); enhanceTextInputs(document.body); });
  obs.observe(document.body || document.documentElement, { childList: true, subtree: true });
  RTE._obs = obs;
  console.log("[rte] composant global pret : window.RTE (2 barres d'outils, i18n FR/EN, mode source)");
}

function initChatbot() {
  const host = document.createElement("div");
  host.id = "chatbot";
  host.className = "no-print";
  host.innerHTML = `
    <div id="chat-panel" class="chat-panel hidden">
      <div class="chat-h"><span class="chat-title">${chatSparkle()} ${esc(t("chat_title"))}</span>
        <span class="chat-tools">
          <button class="chat-tool" id="chat-mic" data-act="chat-mic" title="${esc(t("chat_mic"))}" aria-label="${esc(t("chat_mic"))}">${chatMicIcon()}</button>
          <button class="chat-tool" id="chat-export" data-act="chat-export" title="${esc(t("chat_export"))}" aria-label="${esc(t("chat_export"))}">${chatExportIcon()}</button>
          <button class="chat-tool" id="chat-upload" data-act="chat-upload" title="${esc(t("chat_upload_doc"))}" aria-label="${esc(t("chat_upload_doc"))}">${chatUploadIcon()}</button>
          <input type="file" id="chat-file" class="chat-file" multiple accept=".txt,.md,.markdown,.csv,.json,.eml,.log,.html,.pdf,.docx,.doc,.xlsx,.xls">
          <button class="chat-close" data-act="chat-close" aria-label="✕">✕</button>
        </span>
      </div>
      <div id="chat-body" class="chat-body"></div>
      <form id="chat-form" class="chat-form">
        <input id="chat-input" class="input" autocomplete="off" spellcheck="true" autocorrect="on" placeholder="${esc(t("chat_placeholder"))}">
        <button type="submit" class="chat-send" aria-label="${esc(t("chat_send"))}">➤</button>
      </form>
    </div>
    <button id="chat-fab" class="chat-fab" data-act="chat-toggle" aria-label="${esc(t("chat_title"))}">${chatSparkle()}</button>`;
  document.body.appendChild(host);
  document.getElementById("chat-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const inp = document.getElementById("chat-input");
    const v = (inp ? inp.value : "").trim();
    if (!v) return;
    if (inp) inp.value = "";
    sendChat(v);
  });
  document.getElementById("chat-file").addEventListener("change", (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (!files.length) return;
    uploadChatDocs(files);
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
  if (act === "chat-mic") {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { toast(t("chat_mic_off")); return; }
    const rec = new SR();
    rec.lang = (state.lang === "en") ? "en-US" : "fr-FR";
    rec.interimResults = false;
    const mic = document.getElementById("chat-mic");
    rec.onstart = () => { if (mic) mic.classList.add("active"); };
    rec.onend = () => { if (mic) mic.classList.remove("active"); };
    rec.onerror = () => { if (mic) mic.classList.remove("active"); };
    rec.onresult = (ev) => {
      const txt = (ev.results && ev.results[0] && ev.results[0][0] && ev.results[0][0].transcript) || "";
      const inp = document.getElementById("chat-input");
      if (inp) { inp.value = txt; inp.focus(); }
      try { rec.stop(); } catch (e) { /* ignore */ }
    };
    try { rec.start(); } catch (e) { toast(t("chat_mic_off")); }
    return;
  }
  if (act === "chat-export") {
    const body = document.getElementById("chat-body");
    const rows = body ? Array.from(body.querySelectorAll(".chat-msg")) : [];
    const lines = [];
    rows.forEach((m) => {
      const who = m.classList.contains("user") ? "USER" : "ASSISTANT";
      lines.push("[" + who + "]\n" + (m.innerText || m.textContent || "").trim() + "\n");
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    downloadBlob(blob, "assistant_conversation.txt");
    return;
  }
  if (act === "chat-upload") {
    const fileInp = document.getElementById("chat-file");
    if (fileInp) fileInp.click();
    return;
  }
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
  if (act === "backup-open") {
    openBackupModal();
    return;
  }
  if (act === "data-backup") {
    if (!state.user || state.user.role !== "admin") {
      toast(t("data_restore_self"));
      return;
    }
    try {
      const res = await fetch("/api/backup");
      if (res.status === 401) {
        state.authed = false;
        location.hash = "#/login";
        render();
        return;
      }
      if (!res.ok) {
        const d = await res.json().catch(() => null);
        throw new Error((d && d.error) || res.statusText || "backup failed");
      }
      const blob = await res.blob();
      const cd = res.headers.get("Content-Disposition") || "";
      const mm = cd.match(/filename="?([^;]+)"?/i);
      downloadBlob(blob, mm ? mm[1].trim() : t("backup_file_name"));
    } catch (e) {
      toast(t("save_err", { msg: e.message }));
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
  if (act === "supplier-new") {
    const name = String(el.dataset.sup || "").trim();
    if (!name) return;
    let sup = (state.suppliers || []).find(
      (s) => String(s.name || "").trim().toUpperCase() === name.toUpperCase()
    );
    if (!sup) {
      try {
        const created = await api("/api/suppliers", "POST", { name });
        sup = { id: created.id, name };
        state.suppliers = (state.suppliers || []).concat([sup]);
      } catch (e) {
        return toast(t("save_err", { msg: e.message }));
      }
    }
    state.tmpSupplierId = sup.id;
    await openImportModal();
    return;
  }
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
// --- Bouton « Rafraichir » des modules d'analyse ---
  if (act === "module-refresh") {
    if (moduleRefreshFn) await moduleRefreshFn();
    return;
  }
  if (act === "row-menu") {
    const menu = el.parentElement && el.parentElement.querySelector(".row-actions-menu");
    if (menu) {
      const willShow = menu.hidden;
      closeRowMenus(menu);
      menu.hidden = !willShow;
    }
    return;
  }
  if (act === "row-new") {
    closeRowMenus();
    const row = importById(id);
    state.tmpSupplierId = row ? row.supplier_id : null;
    await openImportModal();
    return;
  }
  if (act === "row-edit") { closeRowMenus(); await openImportById(id); return; }
  if (act === "row-lock") { closeRowMenus(); await toggleImportLock(id); return; }
  if (act === "unlock-card") {
    const row = importById(id);
    await api("/api/imports/" + id + "/lock", "PUT", { locked: false });
    if (row) row.locked = 0;
    toast(t("unlocked_ok"));
    render();
    return;
  }
  if (act === "row-history") { closeRowMenus(); await openHistoryModal(id); return; }
  if (act === "row-documents") { closeRowMenus(); await openDocumentsModal(id); return; }
  if (act === "row-detail") { closeRowMenus(); await openDetailModal(id); return; }
  if (act === "row-contact") { closeRowMenus(); openContactModal(id); return; }
  if (act === "open-import") {
    await openImportById(id);
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
  if (startColResize(e)) return;
  // Fermer le menu d'actions des lignes si le clic est en dehors.
  if (!e.target.closest("[data-act='row-menu']") && !e.target.closest(".row-actions-menu")) closeRowMenus();
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
  initRTEAutoUpgrade();
  setInterval(() => { if (state.authed) loadRates(); }, 20 * 60 * 1000);
})();