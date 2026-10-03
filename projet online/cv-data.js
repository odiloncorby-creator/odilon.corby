/* ─────────────────────────────────────────────────────────────
   odilon.uncoded — contenu structuré du CV
   Source consommée par terminal.html.
   ⚠ Le mode lecture (odilon-corby-cv.html) est en HTML statique :
   toute modification ici doit y être répercutée (et inversement).
   ───────────────────────────────────────────────────────────── */
window.CV = {
  brand: 'odilon.uncoded',
  name: 'Odilon Corby',
  role: 'Product Builder No-Code, IA & Communication expert',
  eyebrow: 'Product builder · Workflows IA · Stratégie éditoriale · Communication',
  tagline: "Construire l'outil, structurer le contenu, porter le message.",
  intro: "Je conçois des outils no-code & IA, de l'idée à la mise en production, avec dix ans de stratégie éditoriale derrière : des produits qui tiennent aussi par leurs contenus et leur diffusion.",
  meta: { location: 'Paris, FR', availability: 'Sur demande', experience: '+10 ans' },
  portrait: 'portrait LLR 0251387 - Grande.jpeg',
  pdf: 'cv-odilon-corby.pdf',

  parcours: [
    {
      dates: '2023 — En poste',
      org: 'La Lune Rousse · Ground Control · Paris',
      role: 'Responsable Communication & Innovation Digitale',
      keyword: 'Rayonnement',
      desc: "Stratégie 360° et production éditoriale multi-format. J'y conçois aussi les outils du service : Notion OS, pipelines vers le site et la newsletter, agenda automatisé."
    },
    {
      dates: '2018 — 2023',
      org: 'Musée national de la Marine · Paris',
      role: 'Chargé de Communication Senior',
      keyword: 'Récit',
      desc: 'Communication interne et externe en contexte institutionnel : stratégie éditoriale, budget, production graphique, communautés à +100K abonnés.'
    },
    {
      dates: '2017 — 2018',
      org: 'Grands Formats · Paris',
      role: 'Chargé de Communication · Pôle Ressources',
      keyword: 'Valorisation',
      desc: "Ressources et support communication : process, coordination, qualité d'exécution."
    },
    {
      dates: '2014 — 2016',
      org: 'Carreau du Temple · Paris',
      role: 'Chargé de Communication',
      keyword: 'Amorce',
      desc: 'Premier terrain dans un lieu culturel hybride : contenus, production, publics.'
    }
  ],

  produits: [
    {
      id: 'naiko',
      title: 'naïko',
      meta: 'PWA · Accompagnement naissance',
      teaser: "Les cours et les livres s'adressent à la personne qui accouche. naïko donne à celle qui l'accompagne des repères utilisables dans l'instant.",
      impact: ['Testée sur 2 naissances réelles', '1 700 visites · 33 configurations terminées'],
      shots: [
        { src: 'img/naiko-01-accueil.webp', alt: "Accueil de naïko en préparation : compte à rebours J-28, bascule préparation / post-partum, progression des sections", caption: "Accueil préparation : J-28, progression" },
        { src: 'img/naiko-01-accueil-postpartum.webp', alt: "Accueil de naïko en post-partum : bébé de 4 jours, dernier repas, repères du moment", caption: "Post-partum : l'accueil suit l'âge du bébé" },
        { src: 'img/naiko-03-contractions.webp', alt: "Compteur de contractions en cours sur fond nuit : durée, dernière contraction, moyenne et intervalle", caption: "Jour J : compteur de contractions" },
        { src: 'img/naiko-04-biberons.webp', alt: "Suivi des repas : nombre et volume du jour, dernier biberon, historique corrigeable", caption: "Suivi des repas, partageable à deux" },
        { src: 'img/naiko-05-carte-jour-j.webp', alt: "Carte réflexe du jour J « Massage sacrum », avec son illustration au trait", caption: "Carte réflexe du jour J, illustrée" }
      ],
      probleme: [
        "L'accompagnant arrive à l'accouchement et au post-partum avec peu de repères pensés pour lui : cours et livres s'adressent d'abord à la personne qui accouche. Mes propres notes Notion étaient trop denses : un collègue qui allait devenir père ne les a jamais lues."
      ],
      construit: [
        "Une PWA mobile, hors ligne et sans compte, en trois temps : Préparer, Jour J, Post-partum. 43 fiches, 17 cartes pour le jour J, compteur de contractions, suivi des biberons partagé à deux, rappels aux dates clés. Hébergement UE, AIPD, données sensibles gardées sur l'appareil.",
        "Une refonte complète est en ligne depuis septembre 2026. Je conçois et j'arbitre, le code est écrit par Claude Code sous ma direction."
      ],
      resultat: [
        "Utilisée pour la naissance de mon deuxième enfant, et par le collègue qui n'avait pas lu mes notes. Depuis fin avril : environ 1 700 visites, 87 % sur mobile, 33 parcours d'accueil terminés (Umami). Prochaine étape : la relecture par une sage-femme."
      ],
      stack: ['Claude Code', 'React 18', 'Vite 7', 'Tailwind CSS', 'PWA', 'Firebase', 'Cloudflare Pages', 'Cloudflare Workers', 'Cloudflare D1', 'Notion'],
      link: { href: 'https://naiko.app', label: 'naiko.app' }
    },
    {
      id: 'notion-os',
      title: 'Notion OS : service communication',
      meta: 'Operating system · La Lune Rousse · Ground Control',
      teaser: "Des infos d'événements éparpillées entre mails, pièces jointes et SharePoint : une source de vérité commune, de l'info brute à la publication.",
      impact: ["6 statuts, de l'info brute à la publication", "Newsletter générée depuis Notion jusqu'au BAT"],
      flow: {
        alt: "Workflow d'un événement dans le Notion OS : info brute reçue, traitement éditorial, validé com, puis production vers le site (Notion, Make, WordPress), la newsletter (Notion, JSON, Brevo) et les réseaux (calendrier éditorial), puis publié et archive",
        lines: [
          'info brute reçue',
          '   ▼',
          'traitement éditorial',
          '   ▼',
          'validé com ── barrière avant production',
          '   ▼',
          'production',
          '   ├─ site        notion → make → wordpress',
          '   ├─ newsletter  notion → json → brevo',
          '   └─ réseaux     calendrier éditorial',
          '   ▼',
          'publié → archive'
        ]
      },
      probleme: [
        "Les infos d'événements arrivent par mails, pièces jointes et SharePoint. Le suivi tenait dans un Excel jamais à jour : impossible de savoir ce qui manque, ce qui est validé, ce qu'il reste à produire."
      ],
      construit: [
        'Une architecture relationnelle dans Notion (événements, publications, projets, tâches) pour une équipe de six. Chaque événement suit six statuts, et rien ne part en production avant « validé com ».',
        "Deux sorties : le site (fiche Automations) et la newsletter. Pour la newsletter, les événements d'une édition sont normalisés en JSON et injectés dans le template Brevo, jusqu'au brouillon et au BAT ; la validation reste humaine."
      ],
      resultat: [
        "Calendrier éditorial et dashboard utilisés par l'équipe et consultés par la direction ; une deuxième structure du groupe demande à y entrer. Pipeline newsletter testé sur une édition réelle de dix événements. Prochaine étape : un Worker Notion à la place de la couche de test."
      ],
      stack: ['Notion', 'Make', 'Brevo', 'SharePoint']
    },
    {
      id: 'fmi',
      title: 'Festival des Médias Indépendants',
      meta: 'PWA · Ground Control',
      teaser: "Un programme qui bouge jusqu'à la dernière minute : une PWA temps réel, que l'équipe met à jour depuis Notion sans redéployer.",
      impact: ['Programme corrigé en direct depuis Notion', 'Livrée en 7 jours, seul, sans budget'],
      shots: [
        { src: 'img/fmi-01-en-ce-moment.webp', alt: "Écran Maintenant de l'app FMI, samedi 15:20 : rendez-vous en cours avec horaires, lieu, médias et intervenant·es", caption: "Maintenant : ce qui se passe, en direct" },
        { src: 'img/fmi-02-programme.webp', alt: "Écran Programme de l'app FMI : rendez-vous à heure fixe avec médias, horaire, lieu et intervenant·es", caption: "Programme : alimenté par Notion" },
        { src: 'img/fmi-03-plan.webp', alt: "Écran Plan de l'app FMI : plan simplifié du festival, 8 espaces numérotés", caption: "Plan : 8 espaces, chacun relié à sa page" },
        { src: 'img/fmi-04-cathedrale-exposition.webp', alt: "Écran de l'espace Cathédrale : présentation de l'exposition (in)dépendances, boutons vers le plan, la programmation et l'expo", caption: "Page espace : l'exposition de l'édition" },
        { src: 'img/fmi-05-manifeste.webp', alt: "Écran Manifeste de l'app FMI : le texte éditorial du festival", caption: "Manifeste : le ton éditorial dans l'app" }
      ],
      probleme: [
        "Pendant deux jours, le public doit savoir ce qui se passe maintenant et où. Le programme bouge jusqu'à la dernière minute, sans budget ni campagne dédiée."
      ],
      construit: [
        "Une PWA sans téléchargement : « en ce moment » en temps réel, programme, plan, pages espaces. Le programme est lu en direct dans Notion : l'équipe le corrige sans toucher au code. Conçue et livrée en une semaine, pour l'ouverture du festival."
      ],
      resultat: [
        'Utilisée pendant le festival, diffusée uniquement par QR codes : 30 visiteurs. Le produit a tenu, la distribution a manqué ; la prochaine édition aura une vraie campagne.'
      ],
      stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'Cloudflare Pages', 'Notion API'],
      link: { href: 'https://fmiapp.pages.dev', label: 'fmiapp.pages.dev' }
    },
    {
      id: 'automations',
      title: 'Automations',
      meta: 'Notion × Make × WordPress · Ground Control',
      teaser: "La page Programmation du site se construit seule ; la programmation d'un festival publiée d'un coup depuis Notion.",
      impact: ['≈ 1 h gagnée par semaine', 'Toute la prog du FMI publiée en un batch'],
      flow: {
        alt: 'Schéma : en MVP, Make crée en batch les pages projet WordPress depuis la base Notion ; en production, la page Programmation se construit seule à partir des pages projet',
        lines: [
          'notion · base événements',
          '   │ batch (mvp, festival)',
          '   ▼',
          'make · pages projet créées',
          '   │ 9 champs ACF + image à la une',
          '   ▼',
          'wordpress · pages projet',
          '   │ [gc_agenda] (en production)',
          '   ▼',
          'page programmation',
          '   tri par date · passés masqués'
        ]
      },
      probleme: [
        'Mettre à jour le site WordPress à la main prenait du temps chaque semaine : pages de programmation, agenda hebdomadaire.'
      ],
      construit: [
        'En production : un script injecté dans le site construit seul la page Programmation (tri par date, récurrents, événements passés retirés).',
        "En MVP : un pipeline Notion → Make → WordPress qui crée les pages projet avec leurs champs et leur image. Testé sur le festival : toute la programmation publiée d'un coup."
      ],
      resultat: [
        "L'agenda a tourné pendant mon congé paternité sans supervision : environ 1 h gagnée par semaine. Prochaine étape : étendre le pipeline aux événements courants, déclenché au statut « validé com »."
      ],
      stack: ['Notion', 'Make', 'WordPress', 'ACF', 'Script IA']
    }
  ],

  approche: [
    { index: '01 · Narratif', title: 'Traduire la complexité', text: "Clarifier un projet avant de produire. Un bon outil n'a de valeur que s'il sert un cap éditorial lisible." },
    { index: '02 · Système', title: 'Penser en flux', text: "Organiser contenus, validation, diffusion et itération comme une chaîne de production, pas comme une suite d'urgences." },
    { index: '03 · Outils', title: 'Automatiser utile', text: "Le no-code et l'IA servent à gagner du temps, fiabiliser des opérations et libérer de l'attention pour l'éditorial." },
    { index: '04 · Exécution', title: 'Rester livrable', text: 'Du cadrage à la mise en ligne : moins de friction, plus de cohérence, plus de rythme.' }
  ],

  skills: [
    { group: 'No-code · IA · Automation', items: ['Claude Code', 'Codex', 'Notion', 'Airtable', 'Make', 'API & MCP', 'GitHub', 'Cloudflare', 'WordPress'] },
    { group: 'Stratégie éditoriale', items: ['Récit de marque', 'Ligne éditoriale', 'Relations presse', "Management d'équipe"] },
    { group: 'Production & diffusion', items: ['Social media', 'Newsletters', 'CMS', 'Adobe Suite', 'Vidéo', 'Pilotage budgétaire', 'Reporting'] }
  ],

  stack: {
    'build': ['Claude Code', 'Codex', 'GitHub', 'VS Code'],
    'no-code': ['Notion', 'Airtable', 'Make', 'Buffer', 'Brevo'],
    'deploy': ['Cloudflare Pages', 'Cloudflare Workers', 'Firebase', 'WordPress'],
    'connect': ['API', 'MCP', 'Notion API'],
    'create': ['Adobe Suite', 'Midjourney', 'NanoBanana', 'Ableton Live']
  },

  music: {
    title: 'Musiques électroniques',
    genres: 'Techno · Ambient · Drum & Bass',
    text: "Une pratique personnelle qui nourrit mon sens du rythme, de la structure et de la texture, dans les projets éditoriaux comme dans les workflows. J'y trouve un lien très fort entre les outils no-code / IA et la production musicale.",
    gear: 'Roland TR-8S · TD-3-MO · Ableton Live',
    link: { href: 'https://odilonwav.bandcamp.com/', label: 'odilonwav.bandcamp.com' }
  },

  formation: ['Masters Communication · Cesacom / Cergy · 2015', 'BTS Communication · CFA SACEF · 2012'],
  langues: ['Français · natif', 'Anglais · courant'],

  contact: [
    { label: 'email', value: 'odilon.corby@proton.me', href: 'mailto:odilon.corby@proton.me' },
    { label: 'tel', value: '+33 6 50 88 16 22', href: 'tel:+33650881622' },
    { label: 'linkedin', value: 'linkedin.com/in/odiloncorby', href: 'https://www.linkedin.com/in/odiloncorby' },
    { label: 'bandcamp', value: 'odilonwav.bandcamp.com', href: 'https://odilonwav.bandcamp.com/' }
  ]
};
