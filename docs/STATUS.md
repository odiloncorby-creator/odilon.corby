# Statut du projet — odilon.uncoded

Dernière mise à jour : 2026-10-03

## ✅ Fait (en production)

**Prod :** https://odiloncorby.com/ (`odilon-corby.pages.dev` y redirige) — Cloudflare Pages, projet `odilon-corby`, branche `main`, dossier publié `projet online/`, pas de build.

| Livrable | Détail |
|---|---|
| Repositionnement | Contenu aligné sur le CV PDF « Product Builder No-Code & Communication expert » (`projet online/cv-odilon-corby.pdf`) |
| Écran de démarrage | `index.html` — boot ASCII, choix `[1] mode lecture` / `[2] mode terminal`, `?skip` → lecture |
| Mode lecture | `odilon-corby-cv.html` — page qui défile, couche terminal (prompts, scramble, portrait ASCII, scanlines, barre de statut) |
| Mode terminal | `terminal.html` — CV par commandes : help, whoami, parcours [n], produits, open <produit>, skills, stack, approche, music, contact, cv, lecture, clear (+ `sudo hire-me`, `glitch`) |
| Contenu partagé | `cv-data.js` (données du terminal) — **à synchroniser à la main avec `odilon-corby-cv.html`** |
| Effets | `uncoded-fx.js` — scramble, glitch, ASCII image/texte, champ de caractères ; fallback `prefers-reduced-motion` |
| Marque | odilon.uncoded (remplace odilon.code) |
| Fusion Framer | Contenu du portfolio Framer intégré (naïko, Notion OS, FMI), métier visé « Product builder no-code & IA » (hero, sidebar, `whoami`), `og-image.png` sur les 3 pages |
| Domaine | `odiloncorby.com` (apex + `www` → apex), `odilon-corby.pages.dev` redirigé en 301 via `functions/_middleware.js` |
| Stats | Cloudflare Web Analytics sans cookie sur les 3 pages (exception CSP dédiée) |
| Signature mail | `docs/signature-mail.html`, style terminal (Proton) |
| Études de cas (oct. 2026) | Fiches Produits recentrées sur le problème métier : structure Problème → Ce que j'ai construit → Impact, stack réduite à une ligne, accroche problème → résultat et ligne d'impact visibles accordéon fermé. Captures réelles (naïko, FMI) et schémas de flux ASCII (Notion OS, Automations) au-dessus du bouton « lire l'étude de cas ». Visionneuse d'images dans la page (`UFX.lightbox`, lecture + terminal), scanlines effacées au survol d'une capture |

Commits : `ea25e6b` (mode lecture) · `2ae6fb3` (terminal) · `f3902a7` (boot + CLAUDE.md) · `c2ababf` + `73c4cc6` (fusion Framer) · `f4f9805` → `e5d53d8` (études de cas, branche `claude/sweet-lovelace-14cnnz`).

### Points ouverts sur le contenu
- **Règle des chiffres** : chaque chiffre publié a une source (git, API Cloudflare Pages, export Umami nettoyé, brief Notion OS). Les briefs sourcés sont dans les repos des apps : `Partner-Birth` et `AppFMI`, branche `portfolio-captures`, dossier `docs/portfolio/` (captures, briefs, scripts de capture). Pas de chiffre approximatif ou non vérifiable.
- **FMI** : « 30 visiteurs » non vérifié (à relever dans Umami, 25–26 avril). « 24 rendez-vous / 49 médias » non publiés tant que l'historique Notion ne confirme pas l'état du week-end. App : libellé « MAINTENANT » coupé dans la barre de nav, « Trois jours » au lieu de deux.
- **naïko** : nombre de bêta-testeurs inconnu (compteur `/api/beta-register`). Audience publiée = export Umami nettoyé (≈ 1 700 visites, ≈ 4 000 pages vues, 87 % mobile, 33 onboardings).
- **Notion OS** : aucune métrique comptée (workspace La Lune Rousse non interrogeable) ; aucun visuel (captures du dashboard, du calendrier, d'une fiche événement ou de l'édition newsletter WEEK 35 à faire, anonymisées). Pipeline newsletter Notion → JSON → Brevo = POC validé sur une édition, Worker non déployé.
- **Automations** : « ≈ 1 h / semaine » et « congé paternité sans supervision » reposent sur le témoignage d'Odilon. Pipeline Make = MVP (batch de la programmation FMI) ; les événements courants sont encore saisis à la main.
- **CV PDF** : pas encore aligné sur les nouvelles fiches.
- **Sites & outils no-code** : fiche courte, sans source (ni PDF ni Framer) → à enrichir (contexte, défi, résultat, visuels). Notion OS a été enrichi depuis Framer.
- `skills` en terminal : listé par groupes, sans niveaux (volontaire : pas de chiffres inventés).

## 🎯 Chantier en cours : un seul site, sortie de Framer (étapes 1–4 faites, reste 5)

**Décision :** fusionner le portfolio Framer (https://odilon-uncoded.framer.website/) dans ce repo et abandonner Framer. Un seul support, une seule marque, hébergé sur Cloudflare avec un domaine personnalisé.

**Pourquoi :** le CV contient déjà les études de cas (doublon à maintenir) ; le mode terminal n'est pas reproductible proprement dans Framer ; Framer impose un abonnement pour un domaine perso ; un site construit à la main sert de preuve du profil Product Builder.

### Étapes
1. ✅ **Inventaire Framer** (2026-09-26) : une seule page. Hero, à propos, 3 projets (naïko, FMI, Notion OS), contact, image sociale. Aucune photo ni vidéo, pas de CMS.
2. ✅ **Mapping validé** (2026-09-26) : naïko et Notion OS enrichis avec le texte Framer, FMI retouché à la marge. Métier visé « Product builder no-code & IA » et sa phrase ajoutés au hero et à `whoami`. Logotype Framer réutilisé en `og-image.png`. Abandonnés : à propos, contact, fond animé et palette Framer (déjà couverts dans le repo). Arbitrages : pour naïko, résultat et période repris de Framer (bêta-testeurs, pas encore relu par une sage-femme ; du 3e trimestre aux 3 mois du bébé). Notion OS signé « La Lune Rousse · Ground Control » ; sa brique WordPress reste dans la fiche Automations, avec un renvoi.
3. ✅ **Intégration** (2026-09-26) : branche `framer-merge` mergée dans `main` et en prod.
4. ✅ **Domaine** (2026-09-27) : `odiloncorby.com` acheté via Cloudflare Registrar, apex + `www` rattachés au projet Pages `odilon-corby`, `www` redirigé vers l'apex, `og:image` des 3 pages passée sur le domaine.
5. **Bascule** — redirection / dépublication du site Framer, mise à jour des liens (LinkedIn, PDF). Signature mail prête (`docs/signature-mail.html`).

### Garde-fous
- Déplacer le contenu d'abord ; les améliorations visuelles viennent après.
- Vanilla uniquement, pas de framework ni de build.
- Toute modification de contenu : `odilon-corby-cv.html` **et** `cv-data.js`.
- Travailler sur une branche, valider sur l'URL de preview Cloudflare avant de merger dans `main`.
