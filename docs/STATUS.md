# Statut du projet — odilon.uncoded

Dernière mise à jour : 2026-09-26

## ✅ Fait (en production)

**Prod :** https://odilon-corby.pages.dev/ — Cloudflare Pages, projet `odilon-corby`, branche `main`, dossier publié `projet online/`, pas de build.

| Livrable | Détail |
|---|---|
| Repositionnement | Contenu aligné sur le CV PDF « Product Builder No-Code & Communication expert » (`projet online/cv-odilon-corby.pdf`) |
| Écran de démarrage | `index.html` — boot ASCII, choix `[1] mode lecture` / `[2] mode terminal`, `?skip` → lecture |
| Mode lecture | `odilon-corby-cv.html` — page qui défile, couche terminal (prompts, scramble, portrait ASCII, scanlines, barre de statut) |
| Mode terminal | `terminal.html` — CV par commandes : help, whoami, parcours [n], produits, open <produit>, skills, stack, approche, music, contact, cv, lecture, clear (+ `sudo hire-me`, `glitch`) |
| Contenu partagé | `cv-data.js` (données du terminal) — **à synchroniser à la main avec `odilon-corby-cv.html`** |
| Effets | `uncoded-fx.js` — scramble, glitch, ASCII image/texte, champ de caractères ; fallback `prefers-reduced-motion` |
| Marque | odilon.uncoded (remplace odilon.code) |

Commits : `ea25e6b` (mode lecture) · `2ae6fb3` (terminal) · `f3902a7` (boot + CLAUDE.md).

### Points ouverts sur le contenu
- **Notion OS** et **Sites & outils no-code** : fiches courtes, faute de matière dans le PDF → à enrichir (contexte, défi, résultat, visuels).
- `skills` en terminal : listé par groupes, sans niveaux (volontaire : pas de chiffres inventés).

## 🎯 Prochain chantier : un seul site, sortie de Framer

**Décision :** fusionner le portfolio Framer (https://odilon-uncoded.framer.website/) dans ce repo et abandonner Framer. Un seul support, une seule marque, hébergé sur Cloudflare avec un domaine personnalisé.

**Pourquoi :** le CV contient déjà les études de cas (doublon à maintenir) ; le mode terminal n'est pas reproductible proprement dans Framer ; Framer impose un abonnement pour un domaine perso ; un site construit à la main sert de preuve du profil Product Builder.

### Étapes
1. **Inventaire Framer** — extraire pages, projets, textes, images, liens (via le plugin Framer).
2. **Mapping** — pour chaque contenu Framer : fusion dans une fiche produit existante / nouvelle fiche / abandon. Pas de refonte design à cette étape.
3. **Intégration** — pages projet dédiées si nécessaire (vanilla, même système visuel), entrées correspondantes dans `cv-data.js` (commande `open`), assets optimisés dans `projet online/`.
4. **Domaine** — achat via Cloudflare Registrar (piste : `odiloncorby.com` ou `.fr` en principal, `odilonuncoded.com` en redirection — disponibilité non vérifiée), rattachement au projet Pages `odilon-corby`.
5. **Bascule** — redirection / dépublication du site Framer, mise à jour des liens (LinkedIn, signatures, PDF).

### Garde-fous
- Déplacer le contenu d'abord ; les améliorations visuelles viennent après.
- Vanilla uniquement, pas de framework ni de build.
- Toute modification de contenu : `odilon-corby-cv.html` **et** `cv-data.js`.
- Travailler sur une branche, valider sur l'URL de preview Cloudflare avant de merger dans `main`.
