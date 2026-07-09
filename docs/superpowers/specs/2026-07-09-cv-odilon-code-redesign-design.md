# Refonte visuelle du CV — système odilon.code

Date : 2026-07-09

## Contexte

Le CV web (`projet online/odilon-corby-cv.html`) tourne actuellement sur un système visuel daté (fond `#080808`, accent oxide-red `#c0392b`, Playfair Display / EB Garamond / IBM Plex Mono via Google Fonts). L'utilisateur a construit dans Claude Design un nouveau design system, **« odilon.code Design System »** (projectId `95fbe318-9998-4ac4-9df4-50ddd5a99ced`, dernière mise à jour 2026-07-08), destiné à unifier visuellement le CV et son portfolio `odilon.code`. Un prototype de mise en page (`Odilon Corby - CV.dc.html`, deux directions 1a/1b) a été généré à partir de ce système et acte au passage un repositionnement de contenu vers un profil hybride « Product Builder / Creative Technologist », en plus du rôle Communication actuel.

Cette refonte porte à la fois sur le **visuel** (tokens, typographie, layout, motion) et sur le **contenu de la section Projets** (bascule vers des case studies produit).

## Périmètre

- **Fichier concerné** : `projet online/odilon-corby-cv.html` uniquement.
- **Hors scope** : `projet pdf/cv_preview.html` reste inchangé (palette oxide/Garamond actuelle, pas d'animations — non pertinent en impression).
- Pas de framework introduit, pas de build process — HTML/CSS/JS vanilla, fonts self-hosted.

## Sources de vérité

- Tokens : projet Claude Design `95fbe318-9998-4ac4-9df4-50ddd5a99ced` (`tokens/*.css`, `styles.css`, `components/**`, `readme.md`).
- Structure/layout : `Odilon Corby - CV.dc.html`, direction **1a — sidebar fixe + timeline verticale**.
- Contenu réel (dates, descriptions, case studies) : contenu déjà validé dans le proto (rawCases naïko/FMI/Automations, timelineItems, contactLinks, skills) + contenu existant du CV actuel pour tout ce que le proto ne couvre pas (Approche, Musique).
- Assets typo : `Geist-Variable.woff2`, `GeistMono-Variable.woff2`, `VG5000-Regular_web.woff2` déjà présents dans `projet online/`. Portrait : image du design system (`assets/images/portrait-odilon-corby.jpeg`, déjà traité) ou `portrait LLR 0251387 - Grande.jpeg` local si équivalent.

## Fondations visuelles (verrouillées, du design system)

```css
--color-ink: #0A0A0A        /* fond principal */
--color-paper: #EDEAE0      /* texte clair */
--color-signal: #D9A441     /* accent primaire — ambre */
--color-phosphor: #6B9080   /* accent secondaire — vert désaturé */
--color-line: #3A3A38       /* hairlines */
--color-muted: #8C887E      /* texte secondaire */

--font-display: 'VG5000', Georgia, serif      /* titres, sobre, emphase italique ambre */
--font-body: 'Geist', sans-serif              /* corps */
--font-mono: 'Geist Mono', monospace          /* labels, index, dates — toujours uppercase tracké */

--radius-sm: 2px; --radius-md: 4px; --radius-pill: 999px
/* Pas d'ombre portée — profondeur via hairline border + un cran de surface (raised/overlay) */
```

Espacement base-8 (`4/8/12/16/24/32/48/64/96px`). Détail complet : `tokens/*.css` du projet Design System.

## Layout

**Desktop** : sidebar fixe 220px à gauche (`--surface-raised`, hairline droite) — nom/rôle, nav verticale avec index timecode (`00:00 Signal`, `00:47 Parcours`, `01:15 Approche`, `01:32 Projets`, `03:15 Contact`), email/localisation en pied de sidebar. Main scrollable à droite.

**Mobile** (< 768px) : sidebar devient bandeau top compact (logo + nav horizontale scrollable), même pattern que `mobileTopStyle1a` du proto mais avec vrai breakpoint CSS (le proto avait ce comportement figé pour les besoins de la comparaison — ici il doit réagir au viewport réel).

**Nav active state** : indicateur de section actif au scroll réutilise le mécanisme IntersectionObserver déjà en place dans le CV actuel, adapté au nouveau NavLink (bordure gauche ambre 2px + fond `--color-paper-ghost` sur l'item actif).

## Sections

### 00:00 — Signal (hero)
Headline VG5000 « Odilon *Corby* » (emphase italique ambre sur le nom), sous-titre italique avec bordure gauche accent, 3 métadonnées (Localisation / Disponibilité / Expérience) en mono. Portrait N&B + wash ambre en diagonale, cadre hairline offset. Meta « Expert communication · Récit · Paris · +10 ans » en eyebrow mono avec trait ambre.

### 00:47 — Parcours
Intro courte. Timeline verticale (`TimelineItem` : point ambre glow, dates mono ambre, org mono, poste en VG5000, keyword en `Badge` outlined) — 4 entrées, **keywords inchangés** : Amorce (Carreau du Temple) → Valorisation (Grand Format) → Récit (Musée national de la Marine) → Rayonnement (La Lune Rousse / Ground Control). Pull-quote « Faire tenir ensemble le fond, la forme et le ton. » en VG5000 italique, bordure gauche accent. Tags compétences éditoriales (`SkillTag`).

### 01:15 — Approche *(section ajoutée, absente du proto)*
`SectionHeader` + grille `FeatureCell` 4 colonnes (responsive → 2 → 1) : 01 Narratif / 02 Éditorial / 03 Culturel / 04 Opérationnel, contenu repris tel quel du CV actuel. Rail ambre gauche qui monte en hauteur au hover (déjà spec dans le composant `FeatureCell`).

### 01:32 — Projets
`SectionHeader`. 3 case studies en accordéon (fermé par défaut, `+ Détail` / `− Fermer`), contenu repris du proto tel quel :
1. **naïko** — PWA co-parent/naissance
2. **Festival des Médias Indépendants** — PWA programmation temps réel (lien `fmiapp.pages.dev`)
3. **Automations** — pipeline Notion × Make × WordPress

Chaque case study ouvre Contexte / Ce que j'ai construit / Défi / Stack (`SkillTag`) / Résultat.

Puis, en fin de section, **carte Musiques électroniques** *(ajoutée vs proto)* — reprise du CV actuel (waveform animée, Roland TR-8S/TD-3-MO, Ableton Live, lien Bandcamp), recolorée dans le nouveau système (fond `--surface-raised`, waveform en `--accent-primary`/`--accent-secondary`).

**Suppression** : les cartes Musée national de la Marine / Ground Control & La Lune Rousse et leurs splashs plein écran (SVG scène marine, SVG scène concert, `openSplash`/`closeSplash`) sont retirés. Ce contenu carrière reste visible via la timeline Parcours — pas de perte d'information, changement de forme seulement.

### 03:15 — Contact
`SectionHeader`. Pull-quote « Un projet, une direction éditoriale, une conversation. ». `ContactLink` rows (Email, Téléphone, LinkedIn, Bandcamp). Groupes de tags : Outils & automatisation, Intelligence artificielle, Formation, Langues (contenu actuel du CV, inchangé).

## Composants (du design system, traduits en HTML/CSS vanilla — pas de JSX/React)

`NavLink`, `SectionHeader`, `TimelineItem`, `FeatureCell`, `Badge`, `SkillTag`, `ContactLink`, `Button` (variantes primary/outline/ghost pour tout CTA). Le composant `ProjectCard` du design system inspire le style de la carte Musique (fond raised, glow radial au hover) mais les case studies Projets suivent le pattern accordéon du proto (pas `ProjectCard`).

## Motion

Direction retenue : **plus riche** que le minimum spec par le design system (qui préconisait un reveal sobre uniquement).

- Reveal au scroll : slide-in-left (`translateX(-16px) → 0`) + fade, `ease-standard` (`cubic-bezier(0.4,0,0.2,1)`), par section et par élément individuel dans les listes (stagger séquentiel sur TimelineItem, SkillTag, cartes Projets/FeatureCell) — réutilise et étend l'IntersectionObserver déjà présent dans le CV actuel.
- Parallax léger sur le portrait hero au scroll (translation verticale modérée, pas d'effet 3D).
- Compteurs animés sur les métadonnées numériques du hero (ex. incrément vers « +10 »).
- Hover : surfaces montent d'un cran (`raised` → `overlay`), bordures hairline → ambre, underline ambre qui grandit sur les liens, rail `FeatureCell` qui monte en hauteur — tout via `transition`, jamais de scale.
- Durées : `--duration-fast` 0.2s / `--duration-base` 0.3s / `--duration-slow` 0.6s selon le composant (repris des tokens `effects.css`).
- `prefers-reduced-motion: reduce` : coupe les animations (pas de version « réduite », `transition: none` / état final directement visible), pattern déjà géré par le composant `Component` du proto (`this._motionQuery`).

## Accessibilité

- Focus clavier visible sur tous les éléments interactifs (nav, accordéons, liens, boutons) — outline ambre.
- Accordéons Projets : `aria-expanded` sur le bouton toggle (pattern déjà dans le proto).
- Contraste : paper (`#EDEAE0`) sur ink (`#0A0A0A`) et ambre sur ink valident AA — à vérifier ponctuellement pour le texte `--text-faint` sur fond raised.
- `prefers-reduced-motion` respecté (cf. Motion).

## Assets à mettre en place

- `VG5000-Regular_web.woff2` (déjà en local) → déclarer `@font-face` local, remplace la référence Basteleur de l'actuel `design-tokens.css` (obsolète, superseded par le design system).
- `Geist-Variable.woff2`, `GeistMono-Variable.woff2` (déjà en local, déjà utilisés).
- Portrait : réutiliser l'asset déjà traité du design system, ou appliquer le traitement (`grayscale(100%) contrast(1.1)` + wash diagonal ambre) directement en CSS sur la photo locale existante.
- `design-tokens.css` local (Basteleur) : à remplacer par un nouveau fichier de tokens basé sur `tokens/*.css` du design system — pas de dépendance à Basteleur/Lineal (zips présents mais non retenus).

## Non-goals

- Pas de refonte de `projet pdf/cv_preview.html`.
- Pas de nouveau logo/mark (aucun n'existe dans les sources).
- Pas d'ajout d'icônes graphiques — le système reste typographique (`→`, `✕`, index numériques/timecode), Lucide seulement si un besoin réel apparaît en implémentation.
