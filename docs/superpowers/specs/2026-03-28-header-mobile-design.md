# Header mobile — Spec design
Date : 2026-03-28

## Décision retenue
**Option B — Double barre, logo seul**

## Structure

### Rangée haute (40px)
- Fond : `#080808`
- Gauche : logo `Odilon` + `Corby` en italic
  - Font : Playfair Display 700, 14px
  - `Odilon` : `var(--white)` — `Corby` en italic : `var(--oxide)` #c0392b
- Droite : rien (logo seul, pas de rôle)

### Rangée basse (32px)
- Fond : `#080808`
- 5 liens de navigation scrollables horizontalement : `00 Signal`, `01 Parcours`, `02 Approche`, `03 Projets`, `04 Contact`
- Font : IBM Plex Mono 400, 9px, letter-spacing 0.10em, uppercase
- Index (`00`, `01`…) : `var(--oxide)`
- Texte inactif : `rgba(240,237,230,0.35)`
- Item actif : texte `var(--white)` + fond `rgba(192,57,43,0.08)`
- Séparateurs verticaux entre items : `1px solid rgba(240,237,230,0.05)`
- `overflow-x: auto`, `scrollbar-width: none`

### Séparateur bas
- `border-bottom: 2px solid var(--oxide)` — ancre visuelle forte

## Comportement
- `position: fixed; top: 0; z-index: 200`
- Hauteur totale : 72px
- Sections : `scroll-margin-top: 72px`
- `#hero` : `padding-top: 96px` (72px header + 24px air)
- Item actif synchronisé avec le scroll (IntersectionObserver JS existant)
- Visible uniquement à `max-width: 1100px`
- Sidebar desktop inchangée

## Fichier cible
`projet online/odilon-corby-cv.html` uniquement.
La version PDF n'est pas concernée.
