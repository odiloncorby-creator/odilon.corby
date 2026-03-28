# CV Odilon Corby — Contexte projet

## Deux fichiers source

| Fichier | Usage |
|---|---|
| `projet online/odilon-corby-cv.html` | Version web publiable — design sombre, animations, splashs interactifs |
| `projet pdf/cv_preview.html` | Version impression A4 portrait — layout hybride dark/light, QR code |

Ces deux fichiers sont **indépendants** : toute modification de contenu (expériences, compétences, liens) doit être répercutée dans les deux.

## Stack

- HTML/CSS/JS vanilla — aucun framework, aucune dépendance npm
- Fonts : Playfair Display, IBM Plex Mono, EB Garamond (Google Fonts)
- QR code : qrcodejs via CDN (PDF uniquement)
- Pas de build process — ouvrir directement dans le navigateur

## Variables CSS clés

```css
--black: #080808
--deep: #0f0f0f        /* fond sidebar PDF */
--surface: #141414
--oxide: #c0392b       /* rouge accent */
--white: #f0ede6
--main-bg: #f8f6f2     /* fond main PDF */
--mono: 'IBM Plex Mono'
--serif: 'Playfair Display'
--body: 'EB Garamond'
```

## Fonctionnalités implémentées (CV online)

- Navigation sticky avec indicateur de section active
- Reveal des sections au scroll (IntersectionObserver)
- Cartes projets avec overlay au hover (pointer-events: none sur .projet-card-bg — ne pas retirer)
- **Splashs plein écran** sur les 2 cartes majeures (clic → overlay thématisé → lien externe) :
  - Musée national de la Marine → `#splash-marine` (bleu nuit, vagues, voilier)
  - Ground Control & La Lune Rousse → `#splash-ground` (concert, faisceaux, foule)
- Waveform animée sur la carte Musiques électroniques
- Section Compétences avec bloc "Intelligence artificielle"

## Layout PDF — A4 Portrait

- Sidebar noire `#0f0f0f` ≈30% + Main blanc `#f8f6f2` ≈70%
- Sidebar : Portrait N&B → Identité → Compétences → Outils IA → Formation → Langues → Hook QR
- Main : Intro · 01 Parcours · 02 Approche (grid 2×2) · 03 Projet parallèle
- Export : Cmd+P → Enregistrer en PDF, format A4, marges 0, arrière-plan activé

## Keywords éditoriaux du parcours

Progression narrative — ne pas modifier sans validation :

| Poste | Keyword |
|---|---|
| Carreau du Temple (2014–2016) | **Amorce** |
| Grand Format (2017–2018) | **Valorisation** |
| Musée national de la Marine (2018–2023) | **Récit** |
| La Lune Rousse / Ground Control (2023–présent) | **Rayonnement** |

## Phrase signature (ne pas modifier)

> "Ce qui m'intéresse, c'est l'endroit où la culture devient communication — et où la communication redevient culture."

## Serveurs locaux

**Toujours utiliser deux serveurs séparés — ne jamais les chevaucher :**

| Port | Usage |
|---|---|
| `:54549` | Companion brainstorming (superpowers) — mockups uniquement |
| `:54550` | Serveur CV — preview + export PDF |

Démarrer le serveur CV : `python3 -m http.server 54550 --bind 127.0.0.1` depuis la racine du projet.

## Git & GitHub

- **Repo :** https://github.com/odiloncorby-creator/odilon.corby
- **Live :** https://odiloncorby-creator.github.io/odilon.corby/projet%20online/odilon-corby-cv.html
- **Enforce HTTPS :** activé sur GitHub Pages
- Ne jamais committer : `.superpowers/`, `.DS_Store`, tokens ou credentials
- Toujours retirer le token de la remote URL après un push
- Rappeler à l'utilisateur de révoquer chaque token après usage

## Liens externes

| Entité | URL |
|---|---|
| Musée national de la Marine | https://www.musee-marine.fr/ |
| Ground Control | https://www.groundcontrolparis.com/ |
| La Lune Rousse | https://lalunerousse.com/ |
| Bandcamp | https://odilonwav.bandcamp.com/ |
| LinkedIn | https://www.linkedin.com/in/odiloncorby |

## Compétences IA

ChatGPT · Claude · Claude Code · Midjourney · NanoBanana · VS Code

## Règles importantes

- Ne jamais supprimer `pointer-events: none` sur `.projet-card-bg` (bloque les clics sinon)
- Les splashs se ferment via : bouton ✕, clic outside, touche Échap
- Toute modification de contenu = répercuter sur les **deux** fichiers HTML
- Pas de frameworks à introduire — rester en vanilla
- Spec de design complète : `docs/superpowers/specs/2026-03-28-cv-pdf-design.md`
