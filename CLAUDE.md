# CV Odilon Corby — Contexte projet

## Statut & roadmap

Voir `docs/STATUS.md` (fait, en cours, prochain chantier : fusion du portfolio Framer).

## Marque

**odilon.uncoded** (anciennement odilon.code). Positionnement : *Product Builder No-Code & Communication expert*. Source de vérité du contenu : le CV PDF `projet online/cv-odilon-corby.pdf`.

## Fichiers (`projet online/`, dossier publié)

| Fichier | Usage |
|---|---|
| `index.html` | Écran de boot ASCII : choix `[1] mode lecture` / `[2] mode terminal` (`?skip` → lecture directe) |
| `odilon-corby-cv.html` | **Mode lecture** : page qui défile, HTML statique (sans dépendance JS pour le contenu) |
| `terminal.html` | **Mode terminal** : CV navigable par commandes (help, whoami, parcours, produits, open, skills, stack, approche, music, contact, cv, lecture…) |
| `cv-data.js` | Contenu structuré (`window.CV`) consommé par le terminal |
| `uncoded-fx.js` | Effets partagés : scramble, glitch, portrait/bannière ASCII, champ de caractères (respecte `prefers-reduced-motion`) |
| `cv-odilon-corby.pdf` | CV PDF téléchargeable |

**Règle de synchro** : le contenu existe en double (`odilon-corby-cv.html` statique + `cv-data.js`). Toute modification de contenu (expériences, produits, compétences, liens) doit être répercutée dans **les deux**.

## Stack

- HTML/CSS/JS vanilla — aucun framework, aucune dépendance npm, pas de build
- Fonts auto-hébergées : VG5000 (display), Geist (corps), Geist Mono (mono)
- CSP stricte en `<meta>` : tout en `'self'`, pas de CDN

## Variables CSS clés

```css
--color-ink: #0A0A0A       /* fond */
--color-paper: #EDEAE0     /* texte */
--color-signal: #D9A441    /* accent ambre */
--color-phosphor: #6B9080  /* accent vert désaturé */
--color-line: #3A3A38
--color-muted: #8C887E
```

## Fonctionnalités (mode lecture)

- Sidebar + nav shell (`> parcours`) avec indicateur de section active, barre de statut desktop
- Sections : 00 Signal · 01 Parcours · 02 Produits · 03 Approche · 04 Side project · 05 Contact
- Titres décodés au scroll (scramble), prompts `~/odilon.uncoded $ …`, scanlines CRT
- Portrait en ASCII qui se révèle en photo au survol / tap
- Produits en accordéon (5 études de cas), waveform animée sur la carte Musique
- Ne jamais supprimer `pointer-events: none` sur `.projet-card-bg`

## Keywords éditoriaux du parcours

Progression narrative — ne pas modifier sans validation :

| Poste | Keyword |
|---|---|
| Carreau du Temple (2014–2016) | **Amorce** |
| Grand Format (2017–2018) | **Valorisation** |
| Musée national de la Marine (2018–2023) | **Récit** |
| La Lune Rousse / Ground Control (2023–présent) | **Rayonnement** |

## Phrase signature (ne pas modifier)

> "Faire tenir ensemble le fond, la forme et le ton."

## Serveurs locaux

**Toujours utiliser deux serveurs séparés — ne jamais les chevaucher :**

| Port | Usage |
|---|---|
| `:54549` | Companion brainstorming (superpowers) — mockups uniquement |
| `:54550` | Serveur CV — preview + export PDF |

Démarrer le serveur CV : `python3 -m http.server 54550 --bind 127.0.0.1` depuis la racine du projet.

## Git & GitHub

- **Repo :** https://github.com/odiloncorby-creator/odilon.corby
- **Hébergement :** Cloudflare Pages, projet `odilon-corby` — branche de prod `main`, dossier publié `projet online`, pas de build. Chaque branche a une URL de preview.
- **Live :** https://odilon-corby.pages.dev/ (boot) · `/odilon-corby-cv` (lecture) · `/terminal`
- Ne jamais committer : `.superpowers/`, `.DS_Store`, tokens ou credentials
- Toujours retirer le token de la remote URL après un push
- Rappeler à l'utilisateur de révoquer chaque token après usage

## Liens externes

| Entité | URL |
|---|---|
| naïko | https://naiko.app |
| FMI app | https://fmiapp.pages.dev |
| Bandcamp | https://odilonwav.bandcamp.com/ |
| LinkedIn | https://www.linkedin.com/in/odiloncorby |

## Compétences (groupes du CV)

- No-code · IA · Automation : Claude Code · Codex · Notion · Airtable · Make · API & MCP · GitHub · Cloudflare · WordPress
- Stratégie éditoriale · Production & diffusion · IA générative (Claude, ChatGPT, Midjourney, NanoBanana)

## Règles importantes

- Ne jamais supprimer `pointer-events: none` sur `.projet-card-bg` (bloque les clics sinon)
- Toute modification de contenu = répercuter dans `odilon-corby-cv.html` **et** `cv-data.js`
- Pas de frameworks à introduire — rester en vanilla
- Toute animation doit avoir son fallback `prefers-reduced-motion`

## Autonomie & outils

- **Toujours utiliser `gh` CLI** pour toutes les opérations GitHub (push, PR, Pages, tokens) — ne jamais demander à l'utilisateur de faire des manipulations manuelles que Claude peut faire lui-même
- **Vérifier les outils disponibles avant de déléguer** — `gh`, `git`, `python3`, `curl` sont disponibles ; les utiliser directement
- L'utilisateur ne doit pas avoir à faire de manips Git/GitHub manuellement
