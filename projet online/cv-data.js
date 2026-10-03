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
      teaser: "Un savoir de naissance trop dense pour être lu, devenu une app qu'on ouvre au moment où on en a besoin.",
      impact: ['2 naissances accompagnées en conditions réelles', '43 fiches · hors ligne · sans compte'],
      probleme: [
        "Ce qu'un accompagnant doit savoir autour d'une naissance existe, mais pas sous une forme utilisable au bon moment : pendant le travail, la nuit, les premières semaines.",
        "J'avais rassemblé ce savoir dans Notion. Les notes étaient trop denses pour servir : un collègue qui allait devenir père ne les a jamais lues."
      ],
      construit: [
        "naïko est une PWA mobile-first en français pour la personne qui accompagne une naissance : partenaire, co-parent ou proche. Elle couvre la période du troisième trimestre aux trois mois du bébé, en trois temps : Préparer, Jour J, Post-partum. Elle fonctionne hors ligne et sans compte.",
        "Elle contient 43 fiches, des checklists, des cartes pour le jour J, un compteur de contractions, un suivi des biberons partagé entre deux téléphones, une fiche bébé et des rappels aux dates clés.",
        "Côté conformité : hébergement dans l'UE, AIPD, registre des traitements, et les données les plus sensibles ne quittent pas l'appareil.",
        "Je conçois, j'arbitre et je livre. Le code est écrit par Claude Code sous ma direction."
      ],
      resultat: "Je l'ai utilisée pour la naissance de mon deuxième enfant : le compteur de contractions pendant le travail, puis les rappels et le suivi des biberons les premières semaines. Le collègue qui n'avait pas lu mes notes s'est servi de l'app le jour J. Quelques bêta-testeurs l'utilisent aujourd'hui. Des professionnelles de santé, dont une de PMI, m'ont fait des retours qui ont donné de nouvelles fiches. Le contenu n'a pas encore été relu par une sage-femme. C'est la prochaine étape.",
      stack: ['Claude Code', 'React 18', 'Vite 7', 'Tailwind CSS', 'PWA', 'Firebase', 'Cloudflare Pages', 'Cloudflare Workers', 'Cloudflare D1', 'Notion'],
      link: { href: 'https://naiko.app', label: 'naiko.app' }
    },
    {
      id: 'notion-os',
      title: 'Notion OS : service communication',
      meta: 'Operating system · La Lune Rousse · Ground Control',
      teaser: 'Une équipe com réduite qui suivait ses projets dans un Excel jamais à jour : un seul espace de pilotage, de la préparation à la diffusion.',
      impact: ['Excel + SharePoint → un seul espace de travail', "Statut d'avancement visible pour chaque projet"],
      probleme: [
        "Une équipe communication réduite, avec un turnover régulier. L'information était dispersée entre événements, tâches, calendrier éditorial, newsletters et mises à jour du site. Le suivi des projets reposait sur un fichier Excel qui n'était pas tenu à jour ; les textes éditoriaux étaient éparpillés dans SharePoint.",
        "Préparer une page événement à la main demandait 10 à 60 minutes selon les visuels disponibles, les formats et l'intégration d'outils de billetterie."
      ],
      construit: "J'ai conçu un système d'exploitation interne dans Notion qui relie les événements, les tâches, le calendrier de publication et les newsletters. Les automatisations exécutent les opérations répétitives, avec validation humaine avant diffusion. La brique dédiée au site (Notion → Make → WordPress) est détaillée dans la fiche Automations.",
      resultat: "Chaque projet de communication a désormais un statut d'avancement visible. L'équipe retrouve au même endroit l'état des projets, les tâches, les textes et le calendrier de publication. Elle peut suivre le travail de la préparation à la validation, puis à la diffusion.",
      stack: ['Notion', 'Notion Worker', 'Make', 'Brevo', 'Buffer']
    },
    {
      id: 'fmi',
      title: 'Festival des Médias Indépendants',
      meta: 'PWA · Ground Control',
      teaser: 'Donner au public la programmation en temps réel, sans app à télécharger ni budget : une PWA construite seul, en une itération.',
      impact: ['Construite seul, sans budget', "Utilisée pendant l'événement, via QR codes"],
      probleme: [
        "Donner au public du festival la programmation en temps réel, sans app à télécharger, sans budget ni campagne dédiée : la seule diffusion possible passait par la signalétique du site.",
        "En préparant la communication, j'avais centralisé toute la programmation dans une base de données. En voyant la structure, j'ai compris que j'avais tout ce qu'il fallait pour construire une app. Je l'ai fait de ma propre initiative."
      ],
      construit: 'Une PWA accessible sans téléchargement : onglet « en ce moment » en temps réel, programme complet, plan du site, manifeste du festival, redirections réseaux et pages dédiées food et thématique de la saison de programmation.',
      resultat: "Déployée et utilisée pendant l'événement, distribuée uniquement via des QR codes sur la signalétique. Sans communication en amont : 30 visiteurs. Le produit a tenu, c'est la distribution qui a manqué : la prochaine itération aura une vraie campagne de déploiement.",
      stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'Cloudflare Pages', 'Notion API'],
      link: { href: 'https://fmiapp.pages.dev', label: 'fmiapp.pages.dev' }
    },
    {
      id: 'automations',
      title: 'Automations',
      meta: 'Notion × Make × WordPress · Ground Control',
      teaser: 'Les mises à jour manuelles du site WordPress prenaient du temps chaque semaine : un pipeline qui publie en batch et tourne sans supervision.',
      impact: ['≈ 1 h gagnée par semaine', 'En production sans supervision pendant un congé paternité'],
      probleme: "Le service com passait un temps considérable à mettre à jour le site WordPress à la main : création des pages de programmation, mise à jour de l'agenda hebdomadaire. L'automatisation devait aussi tenir sans supervision continue, y compris pendant une absence prolongée.",
      construit: 'Un pipeline Notion → Make → WordPress pour la création et la mise en ligne des pages de programmation en batch, déclenché par un seul trigger. Et un script de génération automatique de la page Agenda, qui construit les modules dynamiquement à partir des pages projets.',
      resultat: "Le script Agenda a tourné en production pendant mon congé paternité, sans supervision. Environ 1 h gagnée par semaine, zéro risque d'oubli. Prochaine itération : intégration d'une plateforme de programmation via API, gain estimé à 5–10 h par semaine.",
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
