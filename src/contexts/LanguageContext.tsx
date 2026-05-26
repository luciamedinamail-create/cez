import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'it' | 'de' | 'en';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // Navigation
  nav_studio: { it: 'Studio', de: 'Studio', en: 'Studio' },
  nav_projects: { it: 'Progetti', de: 'Projekte', en: 'Projects' },
  nav_news: { it: 'News', de: 'News', en: 'News' },
  nav_contact: { it: 'Contatto', de: 'Kontakt', en: 'Contact' },
  nav_login: { it: 'Login', de: 'Anmelden', en: 'Login' },
  nav_dashboard: { it: 'Dashboard', de: 'Dashboard', en: 'Dashboard' },

  // Home Page
  home_hero_title: { it: 'Sotto un nuovo tetto', de: 'Unter einem neuen Dach', en: 'Under a new roof' },
  home_hero_cat: { it: 'Architettura pubblica', de: 'Öffentliche Architektur', en: 'Public Architecture' },
  home_experience_title: { it: 'L\'Esperienza Ingebound', de: 'Die Ingebound Erfahrung', en: 'The Ingebound Experience' },
  home_ambassador_title: { it: 'Ambasciatore dell\'architettura tridentina', de: 'Botschafter der Trentiner Architektur', en: 'Ambassador of Tridentine Architecture' },
  home_territory_title: { it: 'Architettura del territorio', de: 'Landschaftsarchitektur', en: 'Architecture of the territory' },
  home_territory_sub: { it: 'Progetti e interventi', de: 'Projekte und Interventionen', en: 'Projects and interventions' },

  // Footer
  footer_studio_desc: { 
    it: 'Un approccio metodico e rigoroso alla progettazione. Ogni intervento nasce dall\'ascolto del contesto.', 
    de: 'Ein methodischer und strenger Entwurfsansatz. Jede Intervention entsteht aus dem Zuhören auf den Kontext.',
    en: 'A methodical and rigorous approach to design. Every intervention arises from listening to the context.' 
  },
  footer_services: { it: 'Servizi', de: 'Dienste', en: 'Services' },
  footer_service_res: { it: 'Architettura Residenziale', de: 'Wohnarchitektur', en: 'Residential Architecture' },
  footer_service_pub: { it: 'Architettura Pubblica', de: 'Öffentliche Architektur', en: 'Public Architecture' },
  footer_service_land: { it: 'Paesaggio e Spazi Urbani', de: 'Landschaft und Stadtraum', en: 'Landscape and Urban Spaces' },
  footer_service_edu: { it: 'Strutture Educative', de: 'Bildungseinrichtungen', en: 'Educational Facilities' },
  footer_contact: { it: 'Contatto', de: 'Kontakt', en: 'Contact' },

  // Categories
  cat_all: { it: 'Tutti i Progetti', de: 'Alle Projekte', en: 'All Projects' },
  cat_res: { it: 'Residenziale', de: 'Wohnbau', en: 'Residential' },
  cat_land: { it: 'Paesaggio', de: 'Landschaft', en: 'Landscape' },
  cat_schools: { it: 'Scuole', de: 'Schulen', en: 'Schools' },
  cat_public: { it: 'Pubblico / Civico', de: 'Öffentlich / Zivil', en: 'Public / Civic' },
  cat_comp: { it: 'Concorsi', de: 'Wettbewerbe', en: 'Competitions' },
  cat_news: { it: 'News', de: 'Nachrichten', en: 'News' },
  cat_awards: { it: 'Premi', de: 'Auszeichnungen', en: 'Awards' },
  cat_exhibitions: { it: 'Mostre', de: 'Ausstellungen', en: 'Exhibitions' },
  cat_publication: { it: 'Pubblicazioni', de: 'Publikationen', en: 'Publications' },
  cat_studio: { it: 'Studio', de: 'Studio', en: 'Studio' },

  // Projects Page
  projects_title: { it: 'Progetti', de: 'Projekte', en: 'Projects' },
  projects_filter_all: { it: 'Tutti', de: 'Alle', en: 'All' },
  projects_year: { it: 'Anno', de: 'Jahr', en: 'Year' },
  projects_location: { it: 'Luogo', de: 'Ort', en: 'Location' },
  projects_category: { it: 'Categoria', de: 'Kategorie', en: 'Category' },
  projects_back: { it: 'Torna ai progetti', de: 'Zurück zu Projekten', en: 'Back to projects' },
  projects_back_to: { it: 'Torna ai progetti', de: 'Zurück zu Projekten', en: 'Back to projects' },
  projects_all: { it: 'Tutti i progetti', de: 'Alle Projekte', en: 'All projects' },

  // Project Detail
  project_concept: { it: 'Concetto', de: 'Konzept', en: 'Concept' },
  project_facts: { it: 'Dati', de: 'Fakten', en: 'Facts' },
  project_credits: { it: 'Crediti', de: 'Credits', en: 'Credits' },
  project_back: { it: 'Torna ai progetti', de: 'Zurück zu Projekten', en: 'Back to projects' },
  project_overview: { it: 'Panoramica', de: 'Übersicht', en: 'Overview' },
  project_introduction: { it: 'Introduzione', de: 'Einleitung', en: 'Introduction' },
  project_technical_details: { it: 'Dati Tecnici', de: 'Technische Daten', en: 'Technical Details' },
  project_year: { it: 'Anno', de: 'Jahr', en: 'Year' },
  project_discipline: { it: 'Disciplina', de: 'Disziplin', en: 'Discipline' },
  project_location: { it: 'Luogo', de: 'Ort', en: 'Location' },
  project_status: { it: 'Stato', de: 'Status', en: 'Status' },
  project_facts_title: { it: 'Dati del Progetto', de: 'Projektdaten', en: 'Project Facts' },
  project_concept_title: { it: 'Concetto Architettonico', de: 'Architektonisches Konzept', en: 'Architectural Concept' },
  project_photography: { it: 'Fotografia', de: 'Fotografie', en: 'Photography' },
  project_plans: { it: 'Piante', de: 'Pläne', en: 'Plans' },
  project_sections: { it: 'Sezioni', de: 'Schnitte', en: 'Sections' },
  project_plans_sections: { it: 'Piante e Sezioni', de: 'Pläne & Schnitte', en: 'Plans & Sections' },
  project_next: { it: 'Prossimo Progetto', de: 'Nächstes Projekt', en: 'Next Project' },
  project_previous: { it: 'Progetto Precedente', de: 'Vorheriges Projekt', en: 'Previous Project' },
  project_not_found: { it: 'Progetto non trovato', de: 'Projekt nicht gefunden', en: 'Project not found' },
  project_loading: { it: 'Caricamento...', de: 'Laden...', en: 'Loading...' },

  // News Page
  news_title: { it: 'News', de: 'Neuigkeiten', en: 'News' },
  news_updates: { it: 'Aggiornamenti', de: 'Aktualisierungen', en: 'Updates' },

  // Studio Page
  studio_title: { it: 'Studio', de: 'Studio', en: 'Studio' },
  studio_philosophy: { it: 'Filosofia', de: 'Philosophie', en: 'Philosophy' },
  studio_team: { it: 'Il Team', de: 'Das Team', en: 'The Team' },
  studio_awards: { it: 'Premi', de: 'Auszeichnungen', en: 'Awards' },
  studio_who: { it: 'Chi<br />Siamo', de: 'Wer<br />Wir Sind', en: 'Who<br />We Are' },
  studio_intro: { 
    it: 'CEZ Studio è una pratica architettonica multidisciplinare con sede a Milano e Bressanone, dedicata alla creazione di spazi che colmano il divario tra il peso storico e la precisione contemporanea.',
    de: 'CEZ Studio ist ein Architekturbüro mit Sitz in Mailand und Brixen, das Räume schafft, die historisches Gewicht und zeitgenössische Präzision verbinden.',
    en: 'CEZ Studio is a multidisciplinary architectural practice based in Milan and Bressanone, dedicated to creating spaces that bridge the gap between historical weight and contemporary precision.'
  },
  studio_history_title: { it: 'La Nostra Storia', de: 'Unsere Geschichte', en: 'Our History' },
  studio_history_p1: {
    it: 'Fondato nel 2012 da un collettivo di architetti e designer, CEZ Studio è nato come un padiglione guidato dalla ricerca nelle Dolomiti, esplorando come le strutture nomadi interagiscono con i paesaggi permanenti.',
    de: '2012 als Kollektiv gegründet, begann CEZ Studio als forschungsorientierter Pavillon in den Dolomiten.',
    en: 'Founded in 2012 by a collective of architects and designers, CEZ Studio began as a research-led pavilion in the Dolomites, exploring how nomadic structures interact with permanent landscapes.'
  },
  studio_history_p2: {
    it: 'Nell\'ultimo decennio siamo cresciuti fino a diventare uno studio a servizio completo, vincendo numerosi concorsi internazionali e realizzando progetti che spaziano dalle ville alpine private ai masterplan urbani su larga scala.',
    de: 'Mittlerweile sind wir ein Full-Service-Architekturbüro mit zahlreichen Projekten.',
    en: 'Over the last decade we have grown into a full-service firm, winning numerous international competitions and realizing projects ranging from private alpine villas to large-scale urban masterplans.'
  },
  studio_approach_title: { it: 'Il Nostro Approccio', de: 'Our Approach', en: 'Our Approach' },
  studio_approach_p1: {
    it: 'Crediamo nell\'architettura come mediatore silenzioso. Il nostro approccio è caratterizzato da un "rigore riduttivo", spogliando il superfluo per rivelare il carattere essenziale di un luogo.',
    de: 'Unser Ansatz zeichnet sich durch reduktive Strenge aus.',
    en: 'We believe in architecture as a silent mediator. Our approach is characterized by "reductive rigor," stripping away the superfluous to reveal the essential character of a place.'
  },
  studio_approach_p2: {
    it: 'La materialità è al centro della nostra pratica. Sperimentiamo tecniche tradizionali alpine e processi industriali moderni per creare superfici che invecchiano con grazia e raccontano una storia del loro ambiente.',
    de: 'Die Materialität steht im Mittelpunkt unserer Praxis.',
    en: 'Materiality is at the heart of our practice. We experiment with traditional alpine techniques and modern industrial processes to create surfaces that age gracefully and tell a story of their environment.'
  },
  studio_team_title: { it: 'Il Team', de: 'Das Team', en: 'The Team' },
  studio_team_role: { it: 'Architetto / Designer', de: 'Architekt / Designer', en: 'Architect / Designer' },

  // Login Page
  login_portal_title: { it: 'Portale Clienti', de: 'Kundenportal', en: 'Client Portal' },
  login_portal_desc: { 
    it: 'Accedi per visualizzare la dashboard del tuo progetto, revisionare i progetti e tracciare lo stato di avanzamento della costruzione in tempo reale.',
    de: 'Melden Sie sich an, um auf Ihr Projektdashboard zuzugreifen, Entwürfe zu überprüfen und den Baufortschritt in Echtzeit zu verfolgen.',
    en: 'Sign in to view your project dashboard, review designs, and track construction progress in real-time.'
  },
  login_signin_google: { it: 'Accedi con Google', de: 'Mit Google anmelden', en: 'Sign in with Google' },
  login_signout: { it: 'Esci', de: 'Abmelden', en: 'Sign out' },
  login_authenticating: { it: 'Autenticazione in corso...', de: 'Authentifizierung...', en: 'Authenticating...' },
  login_error_operation_not_allowed: {
    it: 'L\'accesso con email/password non è abilitato. Abilitalo nella console Firebase o usa Google.',
    de: 'E-Mail/Passwort-Anmeldung ist nicht aktiviert. Aktivieren Sie sie in der Firebase-Konsole oder nutzen Sie Google.',
    en: 'Email/password sign-in is not enabled. Enable it in the Firebase console or use Google.'
  },
  login_provisioning: { 
    it: 'LA TUA DASHBOARD CLIENTE È IN FASE DI CONFIGURAZIONE. SARAI NOTIFICATO VIA EMAIL APPENA I TUOI FILE SARANNO ATTIVI.',
    de: 'IHR KUNDENDASHBOARD WIRD GERADE EINGERICHTET. SIE WERDEN PER E-MAIL BENACHRICHTIGT, SOBALD IHRE PROJEKTDATEIEN AKTIV SIND.',
    en: 'YOUR CLIENT DASHBOARD IS BEING SET UP. YOU WILL BE NOTIFIED VIA EMAIL AS SOON AS YOUR PROJECT FILES ARE ACTIVE.'
  },
  login_email: { it: 'Email', de: 'E-Mail', en: 'Email' },
  login_password: { it: 'Password', de: 'Passwort', en: 'Password' },
  login_submit: { it: 'Accedi', de: 'Anmelden', en: 'Sign In' },
  login_error_auth: { it: 'Credenziali non valide. Riprova.', de: 'Ungültige Anmeldedaten. Bitte versuchen Sie es erneut.', en: 'Invalid credentials. Please try again.' },
  login_no_account: { it: 'Non hai un account? Registrati', de: 'Noch kein Konto? Registrieren', en: 'Don\'t have an account? Register' },
  login_have_account: { it: 'Hai già un account? Accedi', de: 'Bereits ein Konto? Anmelden', en: 'Already have an account? Sign In' },
  login_register: { it: 'Registrati', de: 'Registrieren', en: 'Register' },
  login_hint: { it: 'Primo accesso? Inserisci i dati e verrai registrato automaticamente.', de: 'Erster Login? Geben Sie Ihre Daten ein und Sie werden automatisch registriert.', en: 'First login? Enter your details and you will be automatically registered.' },
  dashboard_add_project: { it: 'Aggiungi Progetto', de: 'Projekt Hinzufügen', en: 'Add Project' },
  dashboard_add_news: { it: 'Pubblica News', de: 'News Veröffentlichen', en: 'Publish News' },
  dashboard_project_title: { it: 'Titolo Progetto', de: 'Projekttitel', en: 'Project Title' },
  dashboard_project_cat: { it: 'Categoria', de: 'Kategorie', en: 'Category' },
  dashboard_project_hero: { it: 'Immagine Hero (URL)', de: 'Hauptbild (URL)', en: 'Hero Image (URL)' },
  dashboard_project_desc: { it: 'Descrizione', de: 'Beschreibung', en: 'Description' },
  dashboard_project_concept: { it: 'Concetto', de: 'Konzept', en: 'Concept' },
  dashboard_project_gallery: { it: 'Galleria Fotografica', de: 'Fotogalerie', en: 'Photo Gallery' },
  dashboard_project_plans: { it: 'Piante', de: 'Pläne', en: 'Plans' },
  dashboard_project_sections: { it: 'Sezioni', de: 'Schnitte', en: 'Sections' },
  dashboard_project_facts: { it: 'Dati del Progetto (Nome:Valore)', de: 'Projektdaten (Name:Wert)', en: 'Project Facts (Name:Value)' },
  dashboard_project_credits: { it: 'Crediti (Ruolo:Nome)', de: 'Credits (Rolle:Name)', en: 'Credits (Role:Name)' },
  dashboard_news_title: { it: 'Titolo Articolo', de: 'Artikeltitel', en: 'Article Title' },
  dashboard_news_content: { it: 'Contenuto', de: 'Inhalt', en: 'Content' },
  dashboard_publish: { it: 'Pubblica', de: 'Veröffentlichen', en: 'Publish' },
  dashboard_success_project: { it: 'Progetto aggiunto con successo!', de: 'Projekt erfolgreich hinzugefügt!', en: 'Project added successfully!' },
  dashboard_success_news: { it: 'News pubblicata!', de: 'News veröffentlicht!', en: 'News published!' },
  dashboard_internal: { it: 'Dashboard Interna', de: 'Internes Dashboard', en: 'Internal Dashboard' },
  dashboard_content_mgmt: { it: 'Gestione Contenuti', de: 'Content-Management', en: 'Content Management' },
  dashboard_logged_in_as: { it: 'Accesso come', de: 'Angemeldet als', en: 'Logged in as' },
  dashboard_loading: { it: 'Caricamento dashboard...', de: 'Dashboard laden...', en: 'Loading dashboard...' },
  dashboard_demo_account: { it: 'Usa Account Demo', de: 'Demo-Konto verwenden', en: 'Use Demo Account' },
  dashboard_admin_loaded: { it: 'Credenziali Admin caricate. Clicca "Accedi" per entrare.', de: 'Admin-Anmeldedaten geladen. Klicken Sie auf "Anmelden", um sich einzuloggen.', en: 'Admin credentials loaded. Click "Sign In" to enter.' },
  dashboard_tab_add: { it: 'Aggiungi', de: 'Hinzufügen', en: 'Add New' },
  dashboard_tab_manage_projects: { it: 'Progetti', de: 'Projekte', en: 'Projects' },
  dashboard_tab_manage_news: { it: 'News', de: 'News', en: 'News' },
  dashboard_tab_contact: { it: 'Contatto', de: 'Kontakt', en: 'Contact Info' },
  dashboard_delete_confirm: { it: 'Sei sicuro di voler eliminare questo elemento?', de: 'Sind Sie sicher, dass Sie diesen Artikel löschen möchten?', en: 'Are you sure you want to delete this item?' },
  dashboard_projects_db: { it: 'Database Progetti', de: 'Projektdatenbank', en: 'Project Database' },
  dashboard_news_db: { it: 'Database News', de: 'News-Datenbank', en: 'News Database' },
  dashboard_contact_info: { it: 'Informazioni di Contatto', de: 'Kontaktinformationen', en: 'Contact Information' },
  dashboard_save_changes: { it: 'Salva Modifiche', de: 'Änderungen Speichern', en: 'Save Changes' },
  dashboard_success_settings: { it: 'Impostazioni salvate con successo!', de: 'Einstellungen erfolgreich gespeichert!', en: 'Settings saved successfully!' },
  login_weak_password: { it: 'Password troppo debole (min 6 caratteri)', de: 'Passwort zu schwach (min. 6 Zeichen)', en: 'Password too weak (min 6 chars)' },
  contact_title: { it: 'Contatto', de: 'Kontakt', en: 'Contact' },
  contact_subtitle: { it: 'Parliamo del tuo prossimo progetto.', de: 'Lassen wir uns über Ihr nächstes Projekt sprechen.', en: 'Let\'s talk about your next project.' },
  contact_name: { it: 'Nome', de: 'Name', en: 'Name' },
  contact_email: { it: 'Email', de: 'E-Mail', en: 'Email' },
  contact_message: { it: 'Messaggio', de: 'Nachricht', en: 'Message' },
  contact_send: { it: 'Invia', de: 'Senden', en: 'Send' },
  contact_sending: { it: 'Invio in corso...', de: 'Wird gesendet...', en: 'Sending...' },
  contact_success: { it: 'Messaggio inviato con successo!', de: 'Nachricht erfolgreich gesendet!', en: 'Message sent successfully!' },
  contact_talk: { it: 'Parla<br />Con Noi', de: 'Sprechen Sie<br />Mit Uns', en: 'Talk<br />With Us' },
  contact_offices: { it: 'Uffici', de: 'Büros', en: 'Offices' },
  contact_digital: { it: 'Digitale', de: 'Digital', en: 'Digital' },
  contact_socials: { it: 'Social', de: 'Social Media', en: 'Social' },
  contact_map_pending: { it: 'Integrazione mappa in corso', de: 'Kartenintegration ausstehend', en: 'Map integration pending' },
};

const categoryMap: Record<string, string> = {
  'Residential': 'cat_res',
  'Landscape': 'cat_land',
  'Schools': 'cat_schools',
  'Public / Civic': 'cat_public',
  'Competitions': 'cat_comp',
  'Exhibitions': 'cat_exhibitions',
  'Awards': 'cat_awards',
  'Books': 'cat_publication',
  'Publications': 'cat_publication',
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tCategory: (cat: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('cez_language');
    return (saved as Language) || 'it';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('cez_language', lang);
  };

  const t = (key: string) => {
    if (!translations[key]) return key;
    return translations[key][language];
  };

  const tCategory = (cat: string) => {
    const key = categoryMap[cat];
    return key ? t(key) : cat;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tCategory }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
