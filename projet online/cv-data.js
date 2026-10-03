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
  intro: "Je conçois des outils no-code & IA qui résolvent des problèmes concrets : apps, automations, interfaces, de l'idée à la mise en production. Mon atout : plus de dix ans de stratégie éditoriale et de communication, pour des produits qui tiennent aussi par leurs contenus, leurs process et leur diffusion.",
  meta: { location: 'Paris, FR', availability: 'Sur demande', experience: '+10 ans' },
  portrait: 'portrait LLR 0251387 - Grande.jpeg',
  pdf: 'cv-odilon-corby.pdf',

  parcours: [
    {
      dates: '2023 — En poste',
      org: 'La Lune Rousse · Ground Control · Paris',
      role: 'Responsable Communication & Innovation Digitale',
      keyword: 'Rayonnement',
      desc: "Pilotage de stratégies 360° et coordination d'une production éditoriale multi-format. Construction et utilisation de workflows et d'automatisations IA dans une équipe réduite pour optimiser les délais de livraison des contenus. Direction du récit, relations presse, management d'équipe, supervision des flux réseaux, newsletters, vidéo et podcast, avec une logique d'activation, de cadence et de performance."
    },
    {
      dates: '2018 — 2023',
      org: 'Musée national de la Marine · Paris',
      role: 'Chargé de Communication Senior',
      keyword: 'Récit',
      desc: "Déploiement d'une communication interne et externe dans un contexte institutionnel exigeant. Stratégie éditoriale, pilotage budgétaire, production graphique, community management de comptes à +100K abonnés et structuration de méthodes de production pour tenir la durée."
    },
    {
      dates: '2017 — 2018',
      org: 'Grands Formats · Paris',
      role: 'Chargé de Communication · Pôle Ressources',
      keyword: 'Valorisation',
      desc: "Gestion des ressources et support communication dans un environnement éditorial soutenu, avec une attention forte aux process, à la coordination et à la qualité d'exécution."
    },
    {
      dates: '2014 — 2016',
      org: 'Carreau du Temple · Paris',
      role: 'Chargé de Communication',
      keyword: 'Amorce',
      desc: "Premier terrain d'apprentissage dans un lieu culturel hybride : communication, contenus, production et compréhension des publics."
    }
  ],

  produits: [
    {
      id: 'naiko',
      title: 'naïko',
      meta: 'PWA · Accompagnement naissance',
      teaser: "Les cours et les livres s'adressent à la personne qui accouche. naïko donne à celle qui l'accompagne des repères utilisables dans l'instant.",
      impact: ['MVP en prod 7 h après le premier commit', '1 700 visites depuis avril · 87 % sur mobile', 'Testée en conditions réelles : 2 naissances'],
      shots: [
        { src: 'img/naiko-01-accueil.webp', alt: "Accueil de naïko en préparation : compte à rebours J-28, bascule préparation / post-partum, progression des sections", caption: "Accueil préparation : J-28, progression" },
        { src: 'img/naiko-01-accueil-postpartum.webp', alt: "Accueil de naïko en post-partum : bébé de 4 jours, dernier repas, repères du moment", caption: "Post-partum : l'accueil suit l'âge du bébé" },
        { src: 'img/naiko-03-contractions.webp', alt: "Compteur de contractions en cours sur fond nuit : durée, dernière contraction, moyenne et intervalle", caption: "Jour J : compteur de contractions" },
        { src: 'img/naiko-04-biberons.webp', alt: "Suivi des repas : nombre et volume du jour, dernier biberon, historique corrigeable", caption: "Suivi des repas, partageable à deux" },
        { src: 'img/naiko-05-carte-jour-j.webp', alt: "Carte réflexe du jour J « Massage sacrum », avec son illustration au trait", caption: "Carte réflexe du jour J, illustrée" }
      ],
      probleme: [
        "L'accompagnant (co-parent, partenaire, proche) arrive à l'accouchement et au post-partum avec peu de repères pensés pour lui : les cours, les sages-femmes et les livres s'adressent d'abord à la personne qui accouche. Après la naissance, rien n'organise les démarches, les rendez-vous ni les repas à compter.",
        "J'avais rassemblé ce savoir dans Notion. Les notes étaient trop denses pour servir : un collègue qui allait devenir père ne les a jamais lues."
      ],
      construit: [
        'naïko est une PWA mobile-first en français pour la personne qui accompagne une naissance : partenaire, co-parent ou proche. Elle couvre la période du troisième trimestre aux trois mois du bébé, en trois temps : Préparer, Jour J, Post-partum. Elle fonctionne hors ligne et sans compte.',
        'Elle contient 43 fiches (37 à lire, 6 outils), 17 cartes pour le jour J, des checklists, un compteur de contractions, un suivi des biberons partagé entre deux téléphones, une fiche bébé et des rappels aux dates clés.',
        'Premier commit le 12 avril, MVP en production le jour même, 6 h 43 plus tard : 4 onglets, 7 fiches, 3 checklists, 5 cartes du jour J, installable et hors ligne. Depuis, 145 déploiements en production et une refonte complète, en ligne depuis septembre 2026.',
        "Côté conformité : hébergement dans l'UE, AIPD, registre des traitements, et les données les plus sensibles ne quittent pas l'appareil.",
        "Je conçois, j'arbitre et je livre. Le code est écrit par Claude Code sous ma direction."
      ],
      resultat: "Je l'ai utilisée pour la naissance de mon deuxième enfant : le compteur de contractions pendant le travail, puis les rappels et le suivi des biberons les premières semaines. Le collègue qui n'avait pas lu mes notes s'est servi de l'app le jour J. Depuis la mise en place de la mesure d'audience fin avril (Umami, sans cookie, tests exclus) : environ 1 700 visites et 4 000 pages vues, dont 87 % sur mobile, et 33 parcours d'accueil menés jusqu'au bout. Quelques bêta-testeurs l'utilisent aujourd'hui. Des professionnelles de santé, dont une de PMI, m'ont fait des retours qui ont donné de nouvelles fiches. Le contenu n'a pas encore été relu par une sage-femme. C'est la prochaine étape.",
      stack: ['Claude Code', 'React 18', 'Vite 7', 'Tailwind CSS', 'PWA', 'Firebase', 'Cloudflare Pages', 'Cloudflare Workers', 'Cloudflare D1', 'Notion'],
      link: { href: 'https://naiko.app', label: 'naiko.app' }
    },
    {
      id: 'notion-os',
      title: 'Notion OS : service communication',
      meta: 'Operating system · La Lune Rousse · Ground Control',
      teaser: "Des infos d'événements éparpillées entre mails, pièces jointes et SharePoint : une source de vérité commune, de l'info brute à la publication.",
      impact: ["6 statuts, de l'info brute à la publication", "Newsletter générée depuis Notion jusqu'au BAT", 'Calendrier éditorial et dashboard en usage'],
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
        "Le service communication reçoit les informations des événements par plusieurs canaux, souvent encore immatures : mails de confirmation, pièces jointes, SharePoint, programmation, artistes, partenaires. Difficile, dans ces conditions, de savoir où en est un événement, ce qui manque, ce qui est validé et ce qu'il reste à produire.",
        "Le suivi des projets reposait sur un fichier Excel qui n'était pas tenu à jour ; les textes éditoriaux étaient éparpillés dans SharePoint. Préparer une page événement à la main demandait 10 à 60 minutes selon les visuels, les formats et la billetterie."
      ],
      construit: [
        "Une architecture relationnelle dans Notion, conçue en avril 2026 pour une équipe de six personnes : événements, publications, plans de com, projets et tâches. SharePoint reste l'espace de stockage, les outils de diffusion restent en place.",
        "Chaque événement suit six statuts : info brute reçue, en traitement éditorial, validé com, en production, publié, archive. Règle métier : la production ne démarre qu'une fois l'information validée par la communication.",
        'Autour de ce noyau : un calendrier de publication, un dashboard des événements Ground Control, et deux pipelines de sortie. Vers le site, détaillé dans la fiche Automations. Vers la newsletter, ci-dessous.',
        "Newsletter : chaque événement porte son texte, son visuel et sa présence dans la newsletter ; une base d'éditions (objet, préheader, état) les regroupe. Les données sont normalisées en JSON (vedette, semaine, à venir) et injectées dans le template Brevo existant, jusqu'au brouillon de campagne et au BAT. Le template reste modifiable dans Brevo, la validation et la programmation restent humaines."
      ],
      resultat: [
        "Le calendrier de publication et le dashboard des événements sont utilisés par l'équipe et consultés par la direction. Chaque projet a désormais un statut visible, là où l'Excel n'était jamais à jour. En septembre 2026, l'intégration d'une deuxième structure du groupe, Communale, est demandée.",
        "Le pipeline newsletter a été testé en août 2026 sur une édition réelle : dix événements (une vedette, trois de la semaine, six à venir), jusqu'au brouillon de campagne et au BAT.",
        "Prochaines étapes : remplacer la couche de test du pipeline newsletter par un Worker Notion et héberger les images de façon pérenne ; étendre aux événements courants l'automatisation du site testée sur le festival, déclenchée au statut « validé com »."
      ],
      stack: ['Notion', 'Make', 'Brevo', 'SharePoint']
    },
    {
      id: 'fmi',
      title: 'Festival des Médias Indépendants',
      meta: 'PWA · Ground Control',
      teaser: "Un programme qui bouge jusqu'à la dernière minute, des visiteurs qui doivent savoir ce qui se passe maintenant : une PWA en ligne 2 h après le premier commit.",
      impact: ['En prod 2 h après le premier commit', 'Livrée en 7 jours, seul, sans budget'],
      shots: [
        { src: 'img/fmi-01-en-ce-moment.webp', alt: "Écran Maintenant de l'app FMI, samedi 15:20 : rendez-vous en cours avec horaires, lieu, médias et intervenant·es", caption: "Maintenant : ce qui se passe, en direct" },
        { src: 'img/fmi-02-programme.webp', alt: "Écran Programme de l'app FMI : rendez-vous à heure fixe avec médias, horaire, lieu et intervenant·es", caption: "Programme : alimenté par Notion" },
        { src: 'img/fmi-03-plan.webp', alt: "Écran Plan de l'app FMI : plan simplifié du festival, 8 espaces numérotés", caption: "Plan : 8 espaces, chacun relié à sa page" },
        { src: 'img/fmi-04-cathedrale-exposition.webp', alt: "Écran de l'espace Cathédrale : présentation de l'exposition (in)dépendances, boutons vers le plan, la programmation et l'expo", caption: "Page espace : l'exposition de l'édition" },
        { src: 'img/fmi-05-manifeste.webp', alt: "Écran Manifeste de l'app FMI : le texte éditorial du festival", caption: "Manifeste : le ton éditorial dans l'app" }
      ],
      probleme: [
        "Pendant les deux jours du festival, les visiteurs doivent savoir sur place ce qui se passe maintenant, où ça se passe, et trouver les infos pratiques. Le programme bouge jusqu'à la dernière minute : l'équipe doit pouvoir le mettre à jour sans redéployer. Le délai est très court, sans budget ni campagne dédiée.",
        "En préparant la communication, j'avais centralisé toute la programmation dans une base de données. En voyant la structure, j'ai compris que j'avais tout ce qu'il fallait pour construire une app. Je l'ai fait de ma propre initiative."
      ],
      construit: [
        'Une PWA accessible sans téléchargement : onglet « en ce moment » en temps réel, programme complet, plan du site, manifeste du festival, redirections réseaux et pages dédiées food et thématique de la saison de programmation.',
        "Le programme est lu en direct dans Notion : l'équipe le corrige sans toucher au code, et la modification apparaît immédiatement dans l'app.",
        'Premier commit le 18 avril, première mise en prod 2 h 14 plus tard, ouverture du festival le 25 : 37 commits et 35 déploiements en une semaine.'
      ],
      resultat: "Déployée et utilisée pendant l'événement, distribuée uniquement via des QR codes sur la signalétique. Sans communication en amont : 30 visiteurs. Le produit a tenu, c'est la distribution qui a manqué : la prochaine itération aura une vraie campagne de déploiement.",
      stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'Cloudflare Pages', 'Notion API'],
      link: { href: 'https://fmiapp.pages.dev', label: 'fmiapp.pages.dev' }
    },
    {
      id: 'automations',
      title: 'Automations',
      meta: 'Notion × Make × WordPress · Ground Control',
      teaser: "Les mises à jour manuelles du site WordPress prenaient du temps chaque semaine : la page Programmation se construit seule, et toute la programmation d'un festival a été publiée d'un coup depuis Notion.",
      impact: ['≈ 1 h gagnée par semaine', 'Agenda en production, sans supervision', 'Toute la prog du FMI publiée en un batch'],
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
      probleme: "Le service com passait un temps considérable à mettre à jour le site WordPress à la main : création des pages de programmation, mise à jour de l'agenda hebdomadaire. L'automatisation devait aussi tenir sans supervision continue, y compris pendant une absence prolongée.",
      construit: [
        "En production : la page Programmation se construit seule à partir des pages projet. Un script injecté dans le site trie les événements par date, place les événements récurrents à leur prochaine occurrence, n'affiche que les 45 jours à venir et retire les événements passés. L'équipe remplit une fiche, le site fait le reste.",
        "En MVP : un scénario Make Notion → WordPress. Chaque fiche de la base Événements crée la page projet, y reporte neuf champs (dates, horaires, lieu, billetterie, description, typologie, programmation…) et télécharge l'image principale comme image à la une. Testé en conditions réelles sur le Festival des Médias Indépendants : une vingtaine d'événements, toute la programmation, publiés d'un coup. Les pages des événements courants sont encore créées à la main."
      ],
      resultat: [
        "Le script Agenda a tourné en production pendant mon congé paternité, sans supervision. Environ 1 h gagnée par semaine, zéro risque d'oubli. Le pipeline Make a fait ses preuves sur le festival.",
        'Prochaine itération : étendre le pipeline aux événements courants, déclenché au statut « validé com », puis brancher une plateforme de programmation via API. Gain estimé à 5–10 h par semaine.'
      ],
      stack: ['Notion', 'Make', 'WordPress', 'ACF', 'Script IA']
    },
    {
      id: 'sites',
      title: 'Sites & outils no-code',
      meta: 'Production digitale · Freelance',
      teaser: "Création de sites et d'outils métier sous statut indépendant."
    }
  ],

  approche: [
    { index: '01 · Narratif', title: 'Traduire la complexité', text: "Clarifier un projet avant de produire. Un bon outil n'a de valeur que s'il sert un cap éditorial lisible." },
    { index: '02 · Système', title: 'Penser en flux', text: "Organiser contenus, validation, diffusion et itération comme une chaîne de production, pas comme une suite d'urgences." },
    { index: '03 · Outils', title: 'Automatiser utile', text: "Le no-code et l'IA servent à gagner du temps, fiabiliser des opérations et libérer de l'attention pour l'éditorial." },
    { index: '04 · Exécution', title: 'Rester livrable', text: 'Du cadrage à la mise en ligne : moins de friction, plus de cohérence, plus de rythme.' }
  ],

  skills: [
    { group: 'No-code · IA · Automation', items: ['Claude Code', 'Codex', 'Notion', 'Airtable', 'Make', 'API & MCP', 'GitHub', 'Cloudflare', 'WordPress', 'Structuration de workflows éditoriaux'] },
    { group: 'Stratégie éditoriale', items: ['Récit de marque', 'Ligne éditoriale', 'Relations presse', "Management d'équipe"] },
    { group: 'Production & diffusion', items: ['Social media', 'Newsletters', 'CMS', 'Adobe Suite', 'Vidéo', 'Pilotage budgétaire', 'Reporting'] },
    { group: 'IA générative', items: ['Claude', 'ChatGPT', 'Midjourney', 'NanoBanana'] }
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
