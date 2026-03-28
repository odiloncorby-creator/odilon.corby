# CV PDF — Design Spec
**Date :** 2026-03-28
**Projet :** CV PDF A4 imprimable pour Odilon Corby — Direction Communication
**Objectif :** Traduire la DA du CV online en CV PDF ultra-créatif, format A4 portrait, exportable via Cmd+P, hook vers le CV online via QR code.

---

## Contexte

Deux projets liés :
- **CV online** (`projet online/odilon-corby-cv.html`) — DA dark, triple typo, animations, déjà live sur GitHub Pages
- **CV PDF** (`projet pdf/cv_preview.html`) — hook pour les recruteurs, renvoie vers le CV online via QR code

Le PDF est la porte d'entrée. Le online est la destination.

---

## DA — Direction Artistique

### Palette
| Token | Valeur | Usage |
|---|---|---|
| `--black` | `#080808` | Texte dark sur fond clair |
| `--deep` | `#0f0f0f` | Fond sidebar |
| `--surface` | `#141414` | Portrait, cartes dark |
| `--oxide` | `#c0392b` | Accent principal — toutes les lignes, dots, keywords |
| `--white` | `#f0ede6` | Texte sur fond dark |
| `--main-bg` | `#f8f6f2` | Fond zone main |

### Typographie
| Variable | Font | Usage |
|---|---|---|
| `--serif` | Playfair Display | Titres, noms de postes, nom |
| `--mono` | IBM Plex Mono | Labels, dates, keywords, metadata |
| `--body` | EB Garamond | Descriptions, textes courants |

Chargées via Google Fonts (même source que le CV online).

---

## Layout — A4 Portrait (210×297mm)

### Structure générale
```
┌─────────────────────────────────────────────┐
│  SIDEBAR (≈30%)  │  MAIN (≈70%)             │
│  168px / #0f0f0f │  flex:1 / #f8f6f2        │
└─────────────────────────────────────────────┘
```

### Sidebar (colonne noire)
De haut en bas :
1. **Portrait** — photo N&B (`grayscale(100%) contrast(1.1)` + overlay oxide + fade-to-black en bas + cadre décalé oxide)
2. **Identité** — rôle (mono, oxide) + nom Playfair (Odilon / *Corby* en italique oxide) + signal line
3. **Contact** — Paris, tél, email, LinkedIn
4. **Compétences** — liste mono
5. **Outils IA** — liste mono, couleur oxide atténuée
6. **Formation** — Masters + BTS
7. **Langues** — FR natif, EN courant
8. **Hook CV online** — encart bordé oxide, QR code (modules noirs `#080808` sur fond `#f0ede6`), URL `odilon-corby.fr`, tagline

### Main (zone blanche)
1. **Intro** — eyebrow mono oxide + phrase-signature en italique Garamond avec border-left oxide
2. **Section 01 · Parcours** — timeline avec border-left oxide, dots oxide, rôle/dates/org/keyword pill/description
3. **Section 02 · Approche** — grid 2×2 avec gap oxide
4. **Section 03 · Projet parallèle** — carte dark inversée (fond #0f0f0f, top border oxide)

---

## Keywords éditoriaux du parcours

Progression narrative : du déclencheur au déploiement total.

| Poste | Période | Keyword | Logique |
|---|---|---|---|
| Carreau du Temple | 2014–2016 | **Amorce** | Le déclencheur, la mise en mouvement |
| Grand Format | 2017–2018 | **Valorisation** | Faire valoir, structurer pour mettre en lumière |
| Musée national de la Marine | 2018–2023 | **Récit** | Tenir une narration dans la durée |
| La Lune Rousse / Ground Control | 2023–présent | **Rayonnement** | Le plein déploiement, l'amplitude maximale |

---

## QR Code

- **Librairie :** qrcodejs (`cdn.jsdelivr.net/npm/qrcodejs`)
- **URL encodée :** `https://odilon-corby.fr` (à mettre à jour quand domaine custom disponible — pour l'instant `https://odiloncorby-creator.github.io/odilon.corby/projet%20online/odilon-corby-cv.html`)
- **Couleurs :** `colorDark: '#080808'`, `colorLight: '#f0ede6'`
- **Taille :** 40×40px dans un conteneur 44×44px fond `#f0ede6` padding 2px
- **Correction :** niveau M

---

## Export PDF

- Ouvrir `http://localhost:54550/projet pdf/cv_preview.html`
- **Cmd+P** → Destination : "Enregistrer en PDF"
- Format : A4, Marges : Aucune, Arrière-plan : activé
- Le CSS `@media print` masque le label de preview et force les dimensions A4

---

## Sécurité (CV online)

Headers de sécurité intégrés via meta tags :
- **CSP** — `default-src 'self'`, autorise Google Fonts, bloque tout le reste
- **X-Content-Type-Options** — nosniff
- **Referrer-Policy** — strict-origin-when-cross-origin
- **frame-ancestors: none** — anti-clickjacking
- **upgrade-insecure-requests** — force HTTPS sur toutes les ressources

**GitHub Pages :** Enforce HTTPS activé.

---

## Serveurs locaux

| Port | Usage |
|---|---|
| `:54549` | Companion brainstorming (superpowers) |
| `:54550` | Serveur CV — preview + export PDF |

Règle : ne jamais servir les fichiers CV depuis le companion brainstorming. Toujours utiliser `:54550` pour tout ce qui touche au contenu du CV.

---

## Fichiers

```
CV ODILON CORBY/
├── projet online/
│   ├── odilon-corby-cv.html        # CV online (live)
│   └── portrait LLR 0251387...jpeg # Photo source
├── projet pdf/
│   ├── cv_preview.html             # CV PDF preview (à finaliser)
│   └── cv_odilon_corby_source.html # Ancienne source (à remplacer)
├── docs/superpowers/specs/
│   └── 2026-03-28-cv-pdf-design.md # Ce fichier
├── .gitignore
└── CLAUDE.md
```

---

## Prochaines étapes (implémentation)

1. Finaliser le CSS du CV PDF pour un rendu A4 pixel-perfect
2. Intégrer les Google Fonts en local (éviter dépendance CDN à l'impression)
3. Mettre à jour l'URL du QR code quand domaine custom disponible
4. Tester l'export Cmd+P sur Chrome et Safari
5. Mettre à jour `cv_odilon_corby_source.html` avec le nouveau design ou le remplacer par `cv_preview.html`
