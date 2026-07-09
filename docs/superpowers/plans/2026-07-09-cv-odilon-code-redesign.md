# Refonte visuelle du CV (odilon.code design system) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reskin `projet online/odilon-corby-cv.html` onto the odilon.code design system (VG5000/Geist/Geist Mono, ink/paper/signal/phosphor tokens), swap the Projets section from culture-venue splashes to three product/builder case studies, add an Approche section (kept as its own FeatureCell-style grid), enrich scroll motion, and update the contact email.

**Architecture:** Single static HTML file, no build step. This is an **in-place reskin**, not a rewrite: the existing DOM already has the right skeleton (fixed sidebar + mobile top bar, `<section id="hero|parcours|approche|projets|contact">`, an IntersectionObserver-based scroll-reveal system, an active-nav-on-scroll listener). Every task edits `<style>` and body markup for one section at a time via exact find/replace, keeping existing class names wherever the visual role is unchanged, so CSS and behavior stay traceable to the current file instead of diverging into a parallel implementation.

**Tech Stack:** HTML/CSS/JS vanilla. Self-hosted fonts (Geist, Geist Mono, VG5000 — already present as `.woff2` files in `projet online/`). No dependencies, no bundler.

## Global Constraints

- File touched: `projet online/odilon-corby-cv.html` only. `projet pdf/cv_preview.html` is out of scope — do not touch it.
- No framework, no build process — plain HTML/CSS/JS in the one file (per project `CLAUDE.md`).
- Design tokens are fixed by the design spec — do not invent new colors/fonts. Reference: `docs/superpowers/specs/2026-07-09-cv-odilon-code-redesign-design.md`.
- Keyword progression (Amorce → Valorisation → Récit → Rayonnement) and the signature phrase "Faire tenir ensemble le fond, la forme et le ton." must not be reworded — only restyled/relocated per this plan.
- Email everywhere in this file becomes `odilon.corby@proton.me` (was `odilon.corby@gmail.com`) — both the `mailto:` href and the visible text.
- `prefers-reduced-motion: reduce` must cut all transitions/animations, not just shorten them.
- Every task ends with a local visual check. Local server per project `CLAUDE.md`: `python3 -m http.server 54550 --bind 127.0.0.1` run from the repo root (`CV ODILON CORBY/`). URL: `http://127.0.0.1:54550/projet%20online/odilon-corby-cv.html`. Use the `pixelbrowse:screenshot` skill (or a manual browser open) to look at the page after each task — don't just eyeball the code.

---

## Task 1: Foundation — design tokens, self-hosted fonts, CSP, base reset

**Files:**
- Modify: `projet online/odilon-corby-cv.html` (head: CSP meta, font links, `<style>` — `:root`, base reset, `body`, grain overlay)

**Interfaces:**
- Produces: the full set of CSS custom properties every later task's CSS relies on (`--color-ink`, `--color-paper`, `--color-signal`, `--color-phosphor`, `--color-line`, `--color-muted`, `--color-ink-raised`, `--color-ink-overlay`, `--color-signal-dim`, `--color-signal-glow`, `--color-phosphor-dim`, `--color-phosphor-glow`, `--color-line-soft`, `--color-paper-ghost`, `--color-paper-dim`, `--surface-page`, `--surface-raised`, `--surface-overlay`, `--text-primary`, `--text-secondary`, `--text-faint`, `--text-on-signal`, `--accent-primary`, `--accent-primary-dim`, `--accent-secondary`, `--border-color`, `--border-color-soft`, `--border-color-accent`, `--border-hairline`, `--border-hairline-soft`, `--border-accent`, `--glow-signal`, `--font-display`, `--font-body`, `--font-mono`, `--text-display-xl`, `--text-display-lg`, `--leading-tight`, `--leading-body`, `--tracking-mono`, `--tracking-mono-label`, `--tracking-display`, `--radius-sm`, `--radius-md`, `--radius-pill`, `--ease-standard`, `--duration-fast`, `--duration-base`, `--duration-slow`). Every later task's CSS uses only these names — no new tokens are introduced after this task.

- [ ] **Step 1: Confirm the three font files are present**

Run: `/bin/ls -la "projet online/Geist-Variable.woff2" "projet online/GeistMono-Variable.woff2" "projet online/VG5000-Regular_web.woff2"`
Expected: three files listed, no "No such file" errors.

- [ ] **Step 2: Update the CSP meta tag to drop the Google Fonts allowance (fonts are now self-hosted)**

Old (in `<head>`):
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data:;
  script-src 'self' 'unsafe-inline';
  object-src 'none';
  base-uri 'self';
  form-action 'none';
  frame-ancestors 'none';
  upgrade-insecure-requests;
">
```

New:
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  img-src 'self' data:;
  script-src 'self' 'unsafe-inline';
  object-src 'none';
  base-uri 'self';
  form-action 'none';
  frame-ancestors 'none';
  upgrade-insecure-requests;
">
```

- [ ] **Step 3: Remove the Google Fonts preconnect/link tags**

Old:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=IBM+Plex+Mono:wght@300;400;500&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
<style>
```

New:
```html
<style>
```

- [ ] **Step 4: Replace `:root` with the new design tokens and add self-hosted `@font-face` rules**

Old:
```css
  :root {
    --black: #080808;
    --deep: #0f0f0f;
    --surface: #141414;
    --oxide: #c0392b;
    --oxide-dim: #8a2820;
    --oxide-glow: rgba(192,57,43,0.15);
    --white: #f0ede6;
    --white-dim: rgba(240,237,230,0.5);
    --white-ghost: rgba(240,237,230,0.08);
    --mono: 'IBM Plex Mono', monospace;
    --serif: 'Playfair Display', Georgia, serif;
    --body: 'EB Garamond', Georgia, serif;
  }
```

New:
```css
  @font-face {
    font-family: 'Geist';
    src: url('Geist-Variable.woff2') format('woff2');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Geist Mono';
    src: url('GeistMono-Variable.woff2') format('woff2');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'VG5000';
    src: url('VG5000-Regular_web.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  :root {
    /* --- Base palette --- */
    --color-ink: #0A0A0A;
    --color-paper: #EDEAE0;
    --color-signal: #D9A441;
    --color-phosphor: #6B9080;
    --color-line: #3A3A38;
    --color-muted: #8C887E;

    /* --- Derived tints --- */
    --color-ink-raised: color-mix(in srgb, var(--color-ink) 92%, var(--color-paper) 8%);
    --color-ink-overlay: color-mix(in srgb, var(--color-ink) 80%, var(--color-paper) 20%);
    --color-signal-dim: color-mix(in srgb, var(--color-signal) 55%, var(--color-ink) 45%);
    --color-signal-glow: color-mix(in srgb, var(--color-signal) 20%, transparent);
    --color-phosphor-dim: color-mix(in srgb, var(--color-phosphor) 55%, var(--color-ink) 45%);
    --color-phosphor-glow: color-mix(in srgb, var(--color-phosphor) 22%, transparent);
    --color-line-soft: color-mix(in srgb, var(--color-line) 55%, transparent);
    --color-paper-ghost: color-mix(in srgb, var(--color-paper) 8%, transparent);
    --color-paper-dim: color-mix(in srgb, var(--color-paper) 55%, transparent);

    /* --- Semantic surfaces --- */
    --surface-page: var(--color-ink);
    --surface-raised: var(--color-ink-raised);
    --surface-overlay: var(--color-ink-overlay);

    /* --- Semantic text --- */
    --text-primary: var(--color-paper);
    --text-secondary: var(--color-muted);
    --text-faint: var(--color-paper-dim);
    --text-on-signal: var(--color-ink);

    /* --- Semantic accents --- */
    --accent-primary: var(--color-signal);
    --accent-primary-dim: var(--color-signal-dim);
    --accent-secondary: var(--color-phosphor);

    /* --- Borders --- */
    --border-color: var(--color-line);
    --border-color-soft: var(--color-line-soft);
    --border-color-accent: var(--color-signal-dim);
    --border-hairline: 1px solid var(--border-color);
    --border-hairline-soft: 1px solid var(--border-color-soft);
    --border-accent: 1px solid var(--border-color-accent);
    --glow-signal: 0 0 12px var(--color-signal-glow);

    /* --- Type --- */
    --font-display: 'VG5000', Georgia, serif;
    --font-body: 'Geist', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'Geist Mono', ui-monospace, 'SFMono-Regular', monospace;
    --text-display-xl: clamp(2.75rem, 3rem + 3vw, 5.5rem);
    --text-display-lg: clamp(2rem, 1.6rem + 2vw, 3.25rem);
    --leading-tight: 1.05;
    --leading-body: 1.6;
    --tracking-mono: 0.02em;
    --tracking-mono-label: 0.14em;
    --tracking-display: -0.01em;

    /* --- Radius --- */
    --radius-sm: 2px;
    --radius-md: 4px;
    --radius-pill: 999px;

    /* --- Motion --- */
    --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
    --duration-fast: 0.2s;
    --duration-base: 0.3s;
    --duration-slow: 0.6s;
  }
```

- [ ] **Step 5: Update the base reset/body rule and drop the grain-texture overlay (design system has no textures)**

Old:
```css
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--black);
    color: var(--white);
    font-family: var(--body);
    font-size: 18px;
    line-height: 1.6;
  }

  /* ─── GRAIN OVERLAY ─── */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    z-index: 1000;
  }
```

New:
```css
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--surface-page);
    color: var(--text-primary);
    font-family: var(--font-body);
    font-size: 1rem;
    line-height: var(--leading-body);
  }
```

- [ ] **Step 6: Verify the page still loads (it will look broken — later tasks retoken the rest of the CSS, which still references the now-removed old variable names)**

Run: `cd "projet online" && python3 -m http.server 54550 --bind 127.0.0.1 &`
Screenshot `http://127.0.0.1:54550/odilon-corby-cv.html` with the `pixelbrowse:screenshot` skill.
Expected: page loads (no blank/500), background is near-black. It's fine if most text still renders in stale colors/fonts — that's fixed section-by-section in Tasks 2–7. What must NOT appear: a browser "can't connect" error, or CSP console errors about blocked fonts (the three `@font-face` files are same-origin, so they should load once later tasks reference `var(--font-*)`).

- [ ] **Step 7: Commit**

```bash
git add "projet online/odilon-corby-cv.html"
git commit -m "Foundation: odilon.code design tokens, self-hosted fonts, CSP update"
```

---

## Task 2: Sidebar & mobile nav

**Files:**
- Modify: `projet online/odilon-corby-cv.html` (`<style>` — `.sidebar*`, `nav a*`; body — `<aside class="sidebar">`, `<header class="mobile-header">`)

**Interfaces:**
- Consumes: tokens from Task 1 (`--surface-raised`, `--font-display`, `--font-mono`, `--accent-primary`, `--text-primary`, `--text-secondary` via `--color-paper-ghost` etc., `--border-hairline`, `--ease-standard`, `--duration-base`).
- Produces: nav labels now carry timecodes (`00:00`, `00:47`, `01:15`, `01:32`, `03:15`) that Tasks 3–7 don't touch again. New contact email `odilon.corby@proton.me` used consistently by Task 7 for the Contact section duplicate.

- [ ] **Step 1: Retoken the sidebar CSS**

Old:
```css
  /* ─── SIDEBAR ─── */
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 220px;
    height: 100vh;
    background: var(--deep);
    border-right: 1px solid rgba(240,237,230,0.06);
    display: flex;
    flex-direction: column;
    padding: 40px 24px;
    z-index: 100;
    opacity: 0;
    animation: fadeIn 1.2s ease 0.2s forwards;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .sidebar-logo {
    margin-bottom: 48px;
  }

  .sidebar-logo .name {
    font-family: var(--serif);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--white);
    display: block;
    line-height: 1.2;
  }

  .sidebar-logo .role {
    font-family: var(--mono);
    font-size: 9px;
    font-weight: 300;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--oxide);
    display: block;
    margin-top: 6px;
  }

  .sidebar-logo .signal-line {
    display: block;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, var(--oxide) 0%, transparent 100%);
    margin-top: 16px;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }

  nav a {
    font-family: var(--mono);
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--white-dim);
    text-decoration: none;
    padding: 10px 12px;
    border-left: 2px solid transparent;
    transition: all 0.3s ease;
    position: relative;
  }

  nav a:hover, nav a.active {
    color: var(--white);
    border-left-color: var(--oxide);
    background: var(--white-ghost);
  }

  nav a .nav-index {
    color: var(--oxide);
    margin-right: 8px;
    font-size: 9px;
  }

  .sidebar-footer {
    font-family: var(--mono);
    font-size: 8px;
    letter-spacing: 0.12em;
    color: rgba(240,237,230,0.2);
    text-transform: uppercase;
    line-height: 1.8;
  }

  .sidebar-footer a {
    color: rgba(240,237,230,0.3);
    text-decoration: none;
    display: block;
    transition: color 0.2s;
  }

  .sidebar-footer a:hover { color: var(--oxide); }
```

New:
```css
  /* ─── SIDEBAR ─── */
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 220px;
    height: 100vh;
    background: var(--surface-raised);
    border-right: var(--border-hairline);
    display: flex;
    flex-direction: column;
    padding: 40px 24px;
    z-index: 100;
    opacity: 0;
    animation: fadeIn var(--duration-slow) var(--ease-standard) 0.2s forwards;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .sidebar-logo {
    margin-bottom: 48px;
  }

  .sidebar-logo .name {
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 400;
    letter-spacing: var(--tracking-display);
    color: var(--text-primary);
    display: block;
    line-height: 1.2;
  }

  .sidebar-logo .role {
    font-family: var(--font-mono);
    font-size: 9px;
    font-weight: 500;
    letter-spacing: var(--tracking-mono-label);
    text-transform: uppercase;
    color: var(--accent-primary);
    display: block;
    margin-top: 6px;
  }

  .sidebar-logo .signal-line {
    display: block;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, var(--accent-primary) 0%, transparent 100%);
    margin-top: 16px;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }

  nav a {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 400;
    letter-spacing: var(--tracking-mono-label);
    text-transform: uppercase;
    color: var(--text-faint);
    text-decoration: none;
    padding: 10px 12px;
    border-left: 2px solid transparent;
    transition: all var(--duration-base) var(--ease-standard);
    position: relative;
  }

  nav a:hover, nav a.active {
    color: var(--text-primary);
    border-left-color: var(--accent-primary);
    background: var(--color-paper-ghost);
  }

  nav a .nav-index {
    color: var(--accent-primary);
    margin-right: 8px;
    font-size: 9px;
  }

  .sidebar-footer {
    font-family: var(--font-mono);
    font-size: 8px;
    letter-spacing: var(--tracking-mono);
    color: var(--text-faint);
    text-transform: uppercase;
    line-height: 1.8;
  }

  .sidebar-footer a {
    color: var(--text-secondary);
    text-decoration: none;
    display: block;
    transition: color var(--duration-fast) var(--ease-standard);
  }

  .sidebar-footer a:hover { color: var(--accent-primary); }
```

- [ ] **Step 2: Retoken the mobile header/nav CSS**

Old:
```css
    .mobile-header {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #080808;
      border-bottom: 2px solid var(--oxide);
      z-index: 200;
    }

    .mobile-header-top {
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0 20px;
    }

    .mobile-logo {
      font-family: var(--serif);
      font-size: 14px;
      font-weight: 700;
      color: var(--white);
      white-space: nowrap;
    }

    .mobile-logo em {
      font-style: italic;
      color: var(--oxide);
    }

    .mobile-nav {
      height: 32px;
      display: flex;
      flex-direction: row;
      align-items: stretch;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }

    .mobile-nav::-webkit-scrollbar { display: none; }

    .mobile-nav a {
      font-family: var(--mono);
      font-size: 9px;
      letter-spacing: 0.10em;
      text-transform: uppercase;
      color: rgba(240,237,230,0.35);
      text-decoration: none;
      padding: 0 13px;
      display: flex;
      align-items: center;
      white-space: nowrap;
      border-right: 1px solid rgba(240,237,230,0.05);
      gap: 5px;
      transition: color 0.2s, background 0.2s;
    }

    .mobile-nav a .nav-index {
      color: var(--oxide);
      font-size: 8px;
    }

    .mobile-nav a.active,
    .mobile-nav a:hover {
      color: var(--white);
      background: rgba(192,57,43,0.08);
    }
  }
```

New:
```css
    .mobile-header {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: var(--surface-page);
      border-bottom: 2px solid var(--accent-primary);
      z-index: 200;
    }

    .mobile-header-top {
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0 20px;
    }

    .mobile-logo {
      font-family: var(--font-display);
      font-size: 14px;
      font-weight: 400;
      color: var(--text-primary);
      white-space: nowrap;
    }

    .mobile-logo em {
      font-style: italic;
      color: var(--accent-primary);
    }

    .mobile-nav {
      height: 32px;
      display: flex;
      flex-direction: row;
      align-items: stretch;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }

    .mobile-nav::-webkit-scrollbar { display: none; }

    .mobile-nav a {
      font-family: var(--font-mono);
      font-size: 9px;
      letter-spacing: var(--tracking-mono);
      text-transform: uppercase;
      color: var(--text-faint);
      text-decoration: none;
      padding: 0 13px;
      display: flex;
      align-items: center;
      white-space: nowrap;
      border-right: var(--border-hairline-soft);
      gap: 5px;
      transition: color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard);
    }

    .mobile-nav a .nav-index {
      color: var(--accent-primary);
      font-size: 8px;
    }

    .mobile-nav a.active,
    .mobile-nav a:hover {
      color: var(--text-primary);
      background: var(--color-paper-ghost);
    }
  }
```

- [ ] **Step 3: Update the sidebar nav labels to timecodes and the email, in the body markup**

Old:
```html
    <nav>
      <a href="#hero" class="active"><span class="nav-index">00</span>Signal</a>
      <a href="#parcours"><span class="nav-index">01</span>Parcours</a>
      <a href="#approche"><span class="nav-index">02</span>Approche</a>
      <a href="#projets"><span class="nav-index">03</span>Projets</a>
      <a href="#contact"><span class="nav-index">04</span>Contact</a>
    </nav>
    <div class="sidebar-footer">
      <a href="mailto:odilon.corby@gmail.com">odilon.corby@gmail.com</a>
      <a href="#">+33 6 50 88 16 22</a>
      <br>
      Paris, 75020
    </div>
  </aside>

  <!-- MOBILE HEADER -->
  <header class="mobile-header">
    <div class="mobile-header-top">
      <span class="mobile-logo">Odilon <em>Corby</em></span>
    </div>
    <nav class="mobile-nav">
      <a href="#hero" class="active"><span class="nav-index">00</span>Signal</a>
      <a href="#parcours"><span class="nav-index">01</span>Parcours</a>
      <a href="#approche"><span class="nav-index">02</span>Approche</a>
      <a href="#projets"><span class="nav-index">03</span>Projets</a>
      <a href="#contact"><span class="nav-index">04</span>Contact</a>
    </nav>
  </header>
```

New:
```html
    <nav>
      <a href="#hero" class="active"><span class="nav-index">00:00</span>Signal</a>
      <a href="#parcours"><span class="nav-index">00:47</span>Parcours</a>
      <a href="#approche"><span class="nav-index">01:15</span>Approche</a>
      <a href="#projets"><span class="nav-index">01:32</span>Projets</a>
      <a href="#contact"><span class="nav-index">03:15</span>Contact</a>
    </nav>
    <div class="sidebar-footer">
      <a href="mailto:odilon.corby@proton.me">odilon.corby@proton.me</a>
      <a href="#">+33 6 50 88 16 22</a>
      <br>
      Paris, 75020
    </div>
  </aside>

  <!-- MOBILE HEADER -->
  <header class="mobile-header">
    <div class="mobile-header-top">
      <span class="mobile-logo">Odilon <em>Corby</em></span>
    </div>
    <nav class="mobile-nav">
      <a href="#hero" class="active"><span class="nav-index">00:00</span>Signal</a>
      <a href="#parcours"><span class="nav-index">00:47</span>Parcours</a>
      <a href="#approche"><span class="nav-index">01:15</span>Approche</a>
      <a href="#projets"><span class="nav-index">01:32</span>Projets</a>
      <a href="#contact"><span class="nav-index">03:15</span>Contact</a>
    </nav>
  </header>
```

- [ ] **Step 4: Verify**

Screenshot the page. Expected: sidebar is a raised-ink panel, name in VG5000, role/nav in mono amber, nav items show timecodes (`00:00 Signal`, `00:47 Parcours`, …), hovering/active nav item shows amber left border. Mobile width (~375px) shows the top bar version with the same timecodes.

- [ ] **Step 5: Commit**

```bash
git add "projet online/odilon-corby-cv.html"
git commit -m "Sidebar/mobile nav: retoken to odilon.code system, timecode labels, new email"
```

---

## Task 3: Hero (00:00 Signal)

**Files:**
- Modify: `projet online/odilon-corby-cv.html` (`<style>` — hero rules; body — `<section id="hero">`; `<script>` — parallax + counter)

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces: `data-counter` attribute pattern used only here (no other task reuses it). `.hero-portrait` remains the parallax target — no other task touches it.

- [ ] **Step 1: Retoken hero CSS**

Old:
```css
  /* ─── HERO ─── */
  #hero {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 48px;
    align-items: start;
    padding-top: 100px;
    /* Hero visible immédiatement, ses enfants ont leurs propres animations */
    opacity: 1;
    transform: none;
  }


  .hero-content {}

  .hero-eyebrow {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--oxide);
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 32px;
    opacity: 0;
    animation: slideRight 0.8s ease 0.6s forwards;
  }

  .hero-eyebrow::before {
    content: '';
    display: block;
    width: 32px;
    height: 1px;
    background: var(--oxide);
  }

  .hero-title {
    font-family: var(--serif);
    font-size: clamp(52px, 6vw, 88px);
    font-weight: 900;
    line-height: 0.92;
    letter-spacing: -0.02em;
    color: var(--white);
    margin-bottom: 40px;
    opacity: 0;
    animation: slideRight 0.9s ease 0.8s forwards;
  }

  .hero-title em {
    font-style: italic;
    color: var(--oxide);
  }

  .hero-concept {
    font-family: var(--body);
    font-size: 20px;
    font-style: italic;
    line-height: 1.55;
    color: var(--white-dim);
    max-width: 520px;
    border-left: 2px solid var(--oxide);
    padding-left: 20px;
    margin-bottom: 48px;
    opacity: 0;
    animation: slideRight 1s ease 1s forwards;
  }

  .hero-meta {
    display: flex;
    gap: 32px;
    opacity: 0;
    animation: slideRight 1s ease 1.2s forwards;
  }

  .hero-meta-item {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--white-dim);
  }

  .hero-meta-item span {
    display: block;
    font-size: 13px;
    color: var(--white);
    margin-top: 4px;
    letter-spacing: 0.04em;
  }

  .hero-portrait {
    position: relative;
    opacity: 0;
    animation: fadeIn 1.2s ease 1.4s forwards;
  }

  .hero-portrait img {
    width: 100%;
    display: block;
    filter: grayscale(100%) contrast(1.1);
    mix-blend-mode: luminosity;
  }

  .hero-portrait::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--oxide-glow) 0%, transparent 60%);
    z-index: 1;
    pointer-events: none;
  }

  .hero-portrait::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(to top, var(--black), transparent);
    z-index: 2;
  }

  .portrait-frame {
    position: absolute;
    top: -8px;
    right: -8px;
    bottom: 8px;
    left: 8px;
    border: 1px solid var(--oxide-dim);
    z-index: 0;
    pointer-events: none;
  }
```

New:
```css
  /* ─── HERO ─── */
  #hero {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 48px;
    align-items: start;
    padding-top: 100px;
    /* Hero visible immédiatement, ses enfants ont leurs propres animations */
    opacity: 1;
    transform: none;
  }


  .hero-content {}

  .hero-eyebrow {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: var(--tracking-mono-label);
    text-transform: uppercase;
    color: var(--accent-primary);
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 32px;
    opacity: 0;
    animation: slideRight var(--duration-slow) var(--ease-standard) 0.6s forwards;
  }

  .hero-eyebrow::before {
    content: '';
    display: block;
    width: 32px;
    height: 1px;
    background: var(--accent-primary);
  }

  .hero-title {
    font-family: var(--font-display);
    font-size: var(--text-display-xl);
    font-weight: 400;
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-display);
    color: var(--text-primary);
    margin-bottom: 40px;
    opacity: 0;
    animation: slideRight var(--duration-slow) var(--ease-standard) 0.8s forwards;
  }

  .hero-title em {
    font-style: italic;
    color: var(--accent-primary);
  }

  .hero-concept {
    font-family: var(--font-body);
    font-size: 1.125rem;
    font-style: italic;
    line-height: 1.55;
    color: var(--text-secondary);
    max-width: 520px;
    border-left: var(--border-accent);
    padding-left: 20px;
    margin-bottom: 48px;
    opacity: 0;
    animation: slideRight var(--duration-slow) var(--ease-standard) 1s forwards;
  }

  .hero-meta {
    display: flex;
    gap: 32px;
    opacity: 0;
    animation: slideRight var(--duration-slow) var(--ease-standard) 1.2s forwards;
  }

  .hero-meta-item {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: var(--tracking-mono-label);
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .hero-meta-item span {
    display: block;
    font-size: 13px;
    color: var(--text-primary);
    margin-top: 4px;
    letter-spacing: var(--tracking-mono);
  }

  .hero-portrait {
    position: relative;
    opacity: 0;
    animation: fadeIn var(--duration-slow) var(--ease-standard) 1.4s forwards;
    will-change: transform;
  }

  .hero-portrait img {
    width: 100%;
    display: block;
    filter: grayscale(100%) contrast(1.1);
    mix-blend-mode: luminosity;
  }

  .hero-portrait::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--color-signal-glow) 0%, transparent 60%);
    z-index: 1;
    pointer-events: none;
  }

  .hero-portrait::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(to top, var(--surface-page), transparent);
    z-index: 2;
  }

  .portrait-frame {
    position: absolute;
    top: -8px;
    right: -8px;
    bottom: 8px;
    left: 8px;
    border: var(--border-accent);
    z-index: 0;
    pointer-events: none;
  }
```

- [ ] **Step 2: Wire the "+10 ans" hero metric to the counter animation**

Old:
```html
          <div class="hero-meta-item">
            Expérience
            <span>+10 ans</span>
          </div>
```

New:
```html
          <div class="hero-meta-item">
            Expérience
            <span>+<span data-counter="10">0</span> ans</span>
          </div>
```

- [ ] **Step 3: Add the parallax + counter JS (append inside the existing `<script>` block, right after the opening `<script>` tag)**

Old (first lines of the script block):
```html
<script>
  // ─── INTERSECTION OBSERVER for section reveals ───
```

New:
```html
<script>
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── HERO PORTRAIT PARALLAX ───
  const heroPortrait = document.querySelector('.hero-portrait');
  if (heroPortrait && !prefersReducedMotion) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const offset = Math.min(window.scrollY * 0.08, 40);
          heroPortrait.style.transform = `translateY(${offset}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ─── ANIMATED COUNTERS ───
  function animateCount(el, target, duration = 1200) {
    if (prefersReducedMotion) { el.textContent = target; return; }
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(progress * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseInt(el.dataset.counter, 10);
    const counterObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCount(e.target, target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counterObs.observe(el);
  });

  // ─── INTERSECTION OBSERVER for section reveals ───
```

- [ ] **Step 4: Verify**

Screenshot desktop view. Expected: headline in VG5000 with amber italic "Corby", portrait grayscale with amber diagonal wash, "Expérience" counts up from 0 to 10 shortly after scrolling the hero into view (or immediately on load since it's above the fold — watch it animate on first paint), scrolling the page shifts the portrait slightly (parallax). Toggle OS-level reduced-motion (or check code path) — counter should just show `10` immediately, no scroll-driven transform.

- [ ] **Step 5: Commit**

```bash
git add "projet online/odilon-corby-cv.html"
git commit -m "Hero: retoken to odilon.code system, add portrait parallax and animated counter"
```

---

## Task 4: Parcours (00:47) — retoken, relocate pull-quote, add editorial skill tags

**Files:**
- Modify: `projet online/odilon-corby-cv.html` (`<style>` — `.section-header*`, `.timeline*`; body — `<section id="parcours">`, `<section id="approche">` pull-quote removal)

**Interfaces:**
- Consumes: tokens from Task 1; `.skill-tag` class is defined in Task 7 (Contact) today and stays defined there — this task adds new `.skill-tag` *usages* in Parcours, relying on the CSS rule already existing lower in the file (order doesn't matter for CSS class rules).
- Produces: `.pull-quote` class (renamed from `.approche-statement`, moved into Parcours) — Task 5 must not expect `.approche-statement` to exist anymore.

- [ ] **Step 1: Retoken section header and timeline CSS**

Old:
```css
  /* ─── SECTION HEADERS ─── */
  .section-header {
    display: flex;
    align-items: baseline;
    gap: 16px;
    margin-bottom: 64px;
  }

  .section-index {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--oxide);
    letter-spacing: 0.15em;
  }

  .section-title {
    font-family: var(--serif);
    font-size: 48px;
    font-weight: 900;
    line-height: 1;
    color: var(--white);
  }

  .section-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(240,237,230,0.15) 0%, transparent 100%);
    margin-left: 16px;
  }

  /* ─── PARCOURS ─── */
  .timeline {
    position: relative;
    padding-left: 32px;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    bottom: 0;
    width: 1px;
    background: linear-gradient(180deg, var(--oxide) 0%, transparent 100%);
  }

  .timeline-item {
    position: relative;
    margin-bottom: 56px;
    opacity: 0;
    transform: translateX(-12px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .timeline-item.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .timeline-item::before {
    content: '';
    position: absolute;
    left: -36px;
    top: 8px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--oxide);
    box-shadow: 0 0 12px var(--oxide-glow);
  }

  .timeline-dates {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.15em;
    color: var(--oxide);
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .timeline-org {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    color: var(--white-dim);
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .timeline-role {
    font-family: var(--serif);
    font-size: 28px;
    font-weight: 700;
    line-height: 1.1;
    color: var(--white);
    margin-bottom: 16px;
  }

  .timeline-keyword {
    display: inline-block;
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--oxide);
    border: 1px solid var(--oxide-dim);
    padding: 3px 8px;
    margin-bottom: 16px;
  }

  .timeline-desc {
    font-family: var(--body);
    font-size: 16px;
    line-height: 1.7;
    color: var(--white-dim);
    max-width: 600px;
  }
```

New:
```css
  /* ─── SECTION HEADERS ─── */
  .section-header {
    display: flex;
    align-items: baseline;
    gap: 16px;
    margin-bottom: 64px;
  }

  .section-index {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--accent-primary);
    letter-spacing: var(--tracking-mono-label);
  }

  .section-title {
    font-family: var(--font-display);
    font-size: var(--text-display-lg);
    font-weight: 400;
    line-height: 1;
    color: var(--text-primary);
  }

  .section-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, var(--border-color-soft) 0%, transparent 100%);
    margin-left: 16px;
  }

  /* ─── PARCOURS ─── */
  .timeline {
    position: relative;
    padding-left: 32px;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    bottom: 0;
    width: 1px;
    background: linear-gradient(180deg, var(--accent-primary) 0%, transparent 100%);
  }

  .timeline-item {
    position: relative;
    margin-bottom: 56px;
    opacity: 0;
    transform: translateX(-16px);
    transition: opacity var(--duration-slow) var(--ease-standard), transform var(--duration-slow) var(--ease-standard);
  }

  .timeline-item.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .timeline-item::before {
    content: '';
    position: absolute;
    left: -36px;
    top: 8px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent-primary);
    box-shadow: var(--glow-signal);
  }

  .timeline-dates {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: var(--tracking-mono-label);
    color: var(--accent-primary);
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .timeline-org {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: var(--tracking-mono);
    color: var(--text-secondary);
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .timeline-role {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 400;
    line-height: 1.1;
    color: var(--text-primary);
    margin-bottom: 16px;
  }

  .timeline-keyword {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: var(--tracking-mono-label);
    text-transform: uppercase;
    color: var(--accent-primary);
    border: var(--border-accent);
    border-radius: var(--radius-sm);
    padding: 3px 8px;
    margin-bottom: 16px;
  }

  .timeline-desc {
    font-family: var(--font-body);
    font-size: 15px;
    line-height: var(--leading-body);
    color: var(--text-secondary);
    max-width: 600px;
  }

  .pull-quote {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 400;
    font-size: 22px;
    line-height: 1.4;
    color: var(--text-primary);
    max-width: 560px;
    border-left: var(--border-accent);
    padding-left: 24px;
    margin: 48px 0 40px;
  }

  .parcours-skills-title {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: var(--tracking-mono-label);
    text-transform: uppercase;
    color: var(--accent-primary);
    margin-bottom: 16px;
  }
```

- [ ] **Step 2: Move the pull-quote out of Approche and into Parcours, and add the editorial skill tags, in the body markup**

Old:
```html
      </div>
    </section>

    <!-- APPROCHE -->
    <section id="approche">
```

New:
```html
      </div>

      <p class="pull-quote">
        « Faire tenir ensemble le fond, la forme et le ton. »
      </p>

      <div class="parcours-skills-title">Compétences éditoriales</div>
      <div class="skills-list">
        <span class="skill-tag">Stratégie éditoriale</span>
        <span class="skill-tag">Storytelling</span>
        <span class="skill-tag">Direction communication</span>
        <span class="skill-tag">Relations presse</span>
        <span class="skill-tag">Social media</span>
        <span class="skill-tag">Management</span>
        <span class="skill-tag">Gestion de projets</span>
        <span class="skill-tag">Email marketing</span>
        <span class="skill-tag">Production vidéo</span>
        <span class="skill-tag">Brevo</span>
      </div>
    </section>

    <!-- APPROCHE -->
    <section id="approche">
```

- [ ] **Step 3: Remove the old pull-quote markup from the end of Approche (it moved above) — this leaves Approche's own CSS/grid work to Task 5**

Old:
```html
      </div>

      <p class="approche-statement">
        "Faire tenir ensemble le fond, la forme et le ton."
      </p>
    </section>
```

New:
```html
      </div>
    </section>
```

- [ ] **Step 4: Verify**

Screenshot. Expected: Parcours section ends with the amber-bordered italic pull-quote, then a "Compétences éditoriales" mono label and a row of skill tags, before the Approche section starts. Approche section no longer has a pull-quote at its end (temporarily — its grid still uses old oxide colors until Task 5).

- [ ] **Step 5: Commit**

```bash
git add "projet online/odilon-corby-cv.html"
git commit -m "Parcours: retoken timeline, relocate pull-quote here, add editorial skill tags"
```

---

## Task 5: Approche (01:15) — retoken, 4-column grid

**Files:**
- Modify: `projet online/odilon-corby-cv.html` (`<style>` — `#approche`, `.approche-grid`, `.approche-cell*`; body — nav-index copy already done in Task 2, no body changes needed here beyond what Task 4 left)

**Interfaces:**
- Consumes: tokens from Task 1. Depends on Task 4 having already removed `.approche-statement` from the body (this task removes the now-orphaned `.approche-statement` CSS rule).

- [ ] **Step 1: Retoken Approche CSS and switch the grid to 4 columns (responsive 4 → 2 → 1)**

Old:
```css
  /* ─── APPROCHE ─── */
  #approche {
    background: var(--deep);
  }

  .approche-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    margin-bottom: 64px;
  }

  .approche-cell {
    background: var(--surface);
    padding: 36px 32px;
    position: relative;
    overflow: hidden;
    transition: background 0.3s ease;
  }

  .approche-cell:hover {
    background: #1a1a1a;
  }

  .approche-cell::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 0;
    background: var(--oxide);
    transition: height 0.4s ease;
  }

  .approche-cell:hover::before {
    height: 100%;
  }

  .approche-cell-index {
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: 0.18em;
    color: var(--oxide);
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .approche-cell-title {
    font-family: var(--serif);
    font-size: 22px;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 12px;
    line-height: 1.2;
  }

  .approche-cell-text {
    font-family: var(--body);
    font-size: 15px;
    line-height: 1.65;
    color: var(--white-dim);
  }

  .approche-statement {
    font-family: var(--serif);
    font-size: 28px;
    font-style: italic;
    font-weight: 400;
    line-height: 1.4;
    color: var(--white);
    max-width: 680px;
    border-left: 3px solid var(--oxide);
    padding-left: 28px;
  }
```

New:
```css
  /* ─── APPROCHE ─── */
  #approche {
    background: var(--surface-raised);
  }

  .approche-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--border-color-soft);
  }

  .approche-cell {
    background: var(--surface-raised);
    padding: 28px 24px;
    position: relative;
    overflow: hidden;
    transition: background var(--duration-base) var(--ease-standard);
  }

  .approche-cell:hover {
    background: var(--surface-overlay);
  }

  .approche-cell::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 0;
    background: var(--accent-primary);
    transition: height var(--duration-slow) var(--ease-standard);
  }

  .approche-cell:hover::before {
    height: 100%;
  }

  .approche-cell-index {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: var(--tracking-mono-label);
    color: var(--accent-primary);
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .approche-cell-title {
    font-family: var(--font-display);
    font-size: 19px;
    font-weight: 400;
    color: var(--text-primary);
    margin-bottom: 10px;
    line-height: 1.2;
  }

  .approche-cell-text {
    font-family: var(--font-body);
    font-size: 14px;
    line-height: var(--leading-body);
    color: var(--text-secondary);
  }

  @media (max-width: 900px) {
    .approche-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 560px) {
    .approche-grid { grid-template-columns: 1fr; }
  }
```

- [ ] **Step 2: Verify**

Screenshot desktop (should show 4 cells in a row) and a ~700px-wide viewport (should show 2×2). Expected: cells raised-ink with hairline seams (from the `gap:1px` + `background:border-color-soft` trick), amber rail grows from top on hover, no leftover pull-quote inside this section.

- [ ] **Step 3: Commit**

```bash
git add "projet online/odilon-corby-cv.html"
git commit -m "Approche: retoken, 4-column FeatureCell grid, remove relocated pull-quote CSS"
```

---

## Task 6: Projets (01:32) — remove splashes, add 3 case studies, restyle Musique card

This is the biggest task: it removes the two splash-triggered venue cards and the fullscreen splash overlays entirely, and replaces them with three accordion case studies, keeping the Musique card (recolored) as the last item.

**Files:**
- Modify: `projet online/odilon-corby-cv.html` (`<style>` — `.projets-grid` → `.projets-stack`, `.projet-card*`, `.music-waveform*`, remove `.splash-*`/`.marine-*`/`.ground-*` and their keyframes; body — `<section id="projets">`, remove the two `<div class="splash-overlay">` blocks entirely; `<script>` — remove splash JS, add accordion toggle JS)

**Interfaces:**
- Consumes: tokens from Task 1; `.skill-tag` CSS (defined in Task 7's region today, order-independent).
- Produces: `.case-study-toggle` click handler pattern — no other task adds accordions, this is self-contained.

- [ ] **Step 1: Retoken `.projets-grid`→`.projets-stack` and the project/music card CSS, drop the `clickable`/splash-trigger styling**

Old:
```css
  /* ─── PROJETS ─── */
  .projets-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
  }

  .projet-card {
    background: var(--surface);
    padding: 48px 40px;
    position: relative;
    overflow: hidden;
    cursor: default;
    transition: background 0.4s ease;
  }

  .projet-card:hover {
    background: #1a1a1a;
  }

  .projet-card-bg {
    position: absolute;
    inset: 0;
    opacity: 0;
    pointer-events: none;
    background: radial-gradient(circle at 80% 20%, var(--oxide-glow) 0%, transparent 60%);
    transition: opacity 0.5s ease;
  }

  .projet-card:hover .projet-card-bg {
    opacity: 1;
  }

  .projet-tag {
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--oxide);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .projet-tag::before {
    content: '';
    display: block;
    width: 16px;
    height: 1px;
    background: var(--oxide);
  }

  .projet-title {
    font-family: var(--serif);
    font-size: 32px;
    font-weight: 900;
    line-height: 1.05;
    color: var(--white);
    margin-bottom: 20px;
  }

  .projet-desc {
    font-family: var(--body);
    font-size: 16px;
    line-height: 1.65;
    color: var(--white-dim);
    margin-bottom: 28px;
  }

  .projet-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .projet-detail {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    color: rgba(240,237,230,0.35);
  }

  .projet-detail strong {
    color: var(--white-dim);
    font-weight: 500;
  }

  .projet-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--oxide);
    text-decoration: none;
    margin-top: 24px;
    border-bottom: 1px solid transparent;
    padding-bottom: 2px;
    transition: border-color 0.2s;
  }

  .projet-link:hover {
    border-color: var(--oxide);
  }

  .projet-link::after {
    content: '→';
    transition: transform 0.2s;
  }

  .projet-link:hover::after {
    transform: translateX(4px);
  }

  /* Music card - full width */
  .projet-card.wide {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }

  .music-waveform {
    display: flex;
    gap: 3px;
    height: 80px;
    margin-top: 24px;
  }

  .music-waveform .bar {
    flex: 1;
    background: var(--oxide);
    opacity: 0.3;
    border-radius: 1px;
    transition: opacity 0.2s;
    animation: waveAnim var(--dur, 1.2s) ease-in-out infinite alternate;
  }

  .projet-card:hover .music-waveform .bar {
    opacity: 0.7;
  }

  @keyframes waveAnim {
    from { transform: scaleY(0.3); }
    to { transform: scaleY(1); }
  }

  /* ─── SPLASH OVERLAYS ─── */
  .splash-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.5s ease;
  }

  .splash-overlay.active {
    opacity: 1;
    pointer-events: all;
  }

  .splash-close {
    position: absolute;
    top: 32px;
    right: 40px;
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    cursor: pointer;
    z-index: 10;
    transition: color 0.2s;
    background: none;
    border: none;
  }

  .splash-close:hover { color: rgba(255,255,255,0.7); }

  .splash-content {
    position: relative;
    z-index: 10;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .splash-tag {
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  .splash-title {
    font-family: var(--serif);
    font-size: clamp(28px, 5vw, 56px);
    font-weight: 900;
    line-height: 1.15;
    color: var(--white);
  }

  .splash-ctas {
    display: flex;
    gap: 12px;
    margin-top: 8px;
  }

  .splash-cta {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 12px 28px;
    text-decoration: none;
    transition: background 0.2s, color 0.2s;
  }

  /* ── Marine splash ── */
  #splash-marine {
    background: linear-gradient(180deg, #050d1a 0%, #0a1f3d 45%, #0d2d52 100%);
  }

  #splash-marine .splash-tag { color: rgba(100,180,255,0.55); }

  #splash-marine .splash-cta {
    color: rgba(100,180,255,0.9);
    border: 1px solid rgba(100,180,255,0.35);
  }

  #splash-marine .splash-cta:hover {
    background: rgba(100,180,255,0.08);
  }

  .marine-stars {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .marine-waves {
    position: absolute;
    bottom: 0;
    left: -50%;
    width: 200%;
    pointer-events: none;
  }

  .marine-waves svg { display: block; }

  .marine-wave-1 { animation: waveScroll 10s linear infinite; opacity: 0.45; }
  .marine-wave-2 { animation: waveScroll 15s linear infinite reverse; opacity: 0.3; position: absolute; bottom: -8px; left: -50%; width: 200%; }
  .marine-wave-3 { animation: waveScroll 7s linear infinite; opacity: 0.2; position: absolute; bottom: 6px; left: -50%; width: 200%; }

  @keyframes waveScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(50%); }
  }

  .marine-boat {
    position: absolute;
    bottom: 22%;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
    animation: boatRock 6s ease-in-out infinite;
  }

  @keyframes boatRock {
    0%, 100% { transform: translateX(-50%) rotate(-1deg) translateY(0); }
    50%       { transform: translateX(-50%) rotate(1deg) translateY(-4px); }
  }

  /* ── Ground Control splash ── */
  #splash-ground {
    background: #0d0806;
  }

  #splash-ground .splash-tag { color: rgba(255,120,60,0.55); }

  #splash-ground .splash-cta {
    color: rgba(255,120,60,0.9);
    border: 1px solid rgba(255,120,60,0.35);
  }

  #splash-ground .splash-cta:hover {
    background: rgba(255,120,60,0.08);
  }

  #splash-ground .splash-cta.alt {
    color: rgba(255,255,255,0.45);
    border-color: rgba(255,255,255,0.12);
  }

  #splash-ground .splash-cta.alt:hover {
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.7);
  }

  .ground-beams {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .g-beam {
    position: absolute;
    bottom: 0;
    width: 2px;
    transform-origin: bottom center;
    opacity: 0;
    animation: beamFlash 3.5s ease-in-out infinite;
  }

  @keyframes beamFlash {
    0%, 100% { opacity: 0; transform: scaleX(1); }
    25%       { opacity: 1; transform: scaleX(4); }
    55%       { opacity: 0.5; transform: scaleX(2); }
  }

  .ground-glow {
    position: absolute;
    bottom: 0; left: 0; right: 0; height: 45%;
    background: radial-gradient(ellipse at 50% 100%, rgba(255,80,30,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .ground-crowd {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    pointer-events: none;
  }

  .projet-card.clickable {
    cursor: pointer;
  }

  .projet-card.clickable::after {
    content: '→ Voir le site';
    position: absolute;
    bottom: 24px;
    right: 32px;
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(192,57,43,0.4);
    transition: color 0.3s;
  }

  .projet-card.clickable:hover::after {
    color: rgba(192,57,43,0.8);
  }
```

New:
```css
  /* ─── PROJETS ─── */
  .projets-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .case-study {
    background: var(--surface-overlay);
    border: var(--border-hairline-soft);
    padding: clamp(24px, 4vw, 36px);
  }

  .case-study-toggle {
    all: unset;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
  }

  .case-study-head {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .case-study-meta {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: var(--tracking-mono-label);
    text-transform: uppercase;
    color: var(--accent-primary);
  }

  .case-study-title {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 400;
    color: var(--text-primary);
  }

  .case-study-teaser {
    font-family: var(--font-body);
    font-size: 15px;
    color: var(--text-secondary);
  }

  .case-study-label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: var(--tracking-mono-label);
    text-transform: uppercase;
    color: var(--text-secondary);
    flex-shrink: 0;
  }

  .case-study-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--duration-slow) var(--ease-standard);
  }

  .case-study-body.open {
    max-height: 1400px;
  }

  .case-study-body-inner {
    padding-top: 28px;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .case-study-detail-label {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: var(--tracking-mono-label);
    text-transform: uppercase;
    color: var(--accent-primary);
    margin-bottom: 8px;
  }

  .case-study-detail p {
    font-family: var(--font-body);
    font-size: 15px;
    line-height: var(--leading-body);
    color: var(--text-secondary);
    max-width: 640px;
  }

  /* ─── MUSIQUE (carte pleine largeur) ─── */
  .projet-card {
    background: var(--surface-raised);
    padding: 40px 36px;
    position: relative;
    overflow: hidden;
    transition: background var(--duration-slow) var(--ease-standard);
  }

  .projet-card:hover {
    background: var(--surface-overlay);
  }

  .projet-card-bg {
    position: absolute;
    inset: 0;
    opacity: 0;
    pointer-events: none;
    background: radial-gradient(circle at 80% 20%, var(--color-signal-glow) 0%, transparent 60%);
    transition: opacity var(--duration-base) var(--ease-standard);
  }

  .projet-card:hover .projet-card-bg {
    opacity: 1;
  }

  .projet-tag {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: var(--tracking-mono-label);
    text-transform: uppercase;
    color: var(--accent-primary);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .projet-tag::before {
    content: '';
    display: block;
    width: 16px;
    height: 1px;
    background: var(--accent-primary);
  }

  .projet-title {
    font-family: var(--font-display);
    font-size: 26px;
    font-weight: 400;
    line-height: 1.05;
    color: var(--text-primary);
    margin-bottom: 16px;
  }

  .projet-desc {
    font-family: var(--font-body);
    font-size: 15px;
    line-height: var(--leading-body);
    color: var(--text-secondary);
    margin-bottom: 22px;
  }

  .projet-details {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .projet-detail {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: var(--tracking-mono);
    color: var(--text-faint);
  }

  .projet-detail strong {
    color: var(--text-secondary);
    font-weight: 500;
  }

  .projet-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: var(--tracking-mono-label);
    text-transform: uppercase;
    color: var(--accent-primary);
    text-decoration: none;
    margin-top: 24px;
    border-bottom: 1px solid transparent;
    padding-bottom: 2px;
    transition: border-color var(--duration-fast) var(--ease-standard);
  }

  .projet-link:hover {
    border-color: var(--accent-primary);
  }

  .projet-link::after {
    content: '→';
    transition: transform var(--duration-fast) var(--ease-standard);
  }

  .projet-link:hover::after {
    transform: translateX(4px);
  }

  .projet-card.wide {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }

  .music-waveform {
    display: flex;
    gap: 3px;
    height: 80px;
    margin-top: 24px;
  }

  .music-waveform .bar {
    flex: 1;
    background: var(--accent-primary);
    opacity: 0.3;
    border-radius: 1px;
    transition: opacity var(--duration-fast) var(--ease-standard);
    animation: waveAnim var(--dur, 1.2s) ease-in-out infinite alternate;
  }

  .projet-card:hover .music-waveform .bar {
    opacity: 0.8;
  }

  @keyframes waveAnim {
    from { transform: scaleY(0.3); }
    to { transform: scaleY(1); }
  }
```

- [ ] **Step 2: Replace the Projets section body markup — remove the two splash-triggered cards, add the three case studies, keep the Musique card**

Old:
```html
      <div class="projets-grid">

        <div class="projet-card clickable" onclick="openSplash('splash-ground')">
          <div class="projet-card-bg"></div>
          <div class="projet-tag">Responsable Communication · 2023–présent</div>
          <h3 class="projet-title">Ground Control &amp; La Lune Rousse</h3>
          <p class="projet-desc">Stratégie de communication 360° pour l'un des espaces culturels et gastronomiques les plus singuliers de Paris. Direction éditoriale, relations presse, gestion d'équipe et activation d'audience sur l'ensemble des canaux. Enjeux de trafic et d'attractivité : faire venir, fidéliser, générer de l'engagement sur le lieu.</p>
          <div class="projet-details">
            <div class="projet-detail"><strong>Enjeu ·</strong> Faire venir, générer du trafic et activer les audiences sur le lieu</div>
            <div class="projet-detail"><strong>Leviers ·</strong> Storytelling, social media, presse, partenariats</div>
          </div>
        </div>

        <div class="projet-card clickable" onclick="openSplash('splash-marine')">
          <div class="projet-card-bg"></div>
          <div class="projet-tag">Communication institutionnelle · 2018–2023</div>
          <h3 class="projet-title">Musée national de la Marine</h3>
          <p class="projet-desc">Cinq ans de construction d'une présence éditoriale pour un musée national en rénovation. Community management de communautés à +100K abonnés, partenariats institutionnels de haut niveau, production de contenus audiovisuels et communication des expositions.</p>
          <div class="projet-details">
            <div class="projet-detail"><strong>Enjeu ·</strong> Maintenir et renforcer l'audience durant une période de fermeture</div>
            <div class="projet-detail"><strong>Partenaire ·</strong> Marine Nationale</div>
          </div>
        </div>

        <!-- Music card - wide -->
        <div class="projet-card wide">
          <div class="projet-card-bg"></div>
          <div>
            <div class="projet-tag">Production musicale · en cours</div>
            <h3 class="projet-title">Musiques électroniques</h3>
            <p class="projet-desc">Production de musiques électroniques — techno, ambient, drum &amp; bass. Travail sur hardware (Roland TR-8S, TD-3-MO) et Ableton Live. Une pratique parallèle qui informe l'œil éditorial : rythme, texture, structure narrative.</p>
            <a href="https://odilonwav.bandcamp.com/" target="_blank" class="projet-link">Écouter sur Bandcamp</a>
          </div>
          <div>
            <div class="music-waveform" id="waveform"></div>
            <div class="projet-details" style="margin-top: 24px;">
              <div class="projet-detail"><strong>Outils ·</strong> Roland TR-8S · TD-3-MO · Ableton Live</div>
              <div class="projet-detail"><strong>Registres ·</strong> Techno · Ambient · Drum &amp; Bass · Post-punk</div>
              <div class="projet-detail"><strong>Format ·</strong> Production indépendante</div>
            </div>
          </div>
        </div>

      </div>
    </section>
```

New:
```html
      <div class="projets-stack">

        <div class="case-study">
          <button class="case-study-toggle" aria-expanded="false" aria-controls="case-naiko">
            <span class="case-study-head">
              <span class="case-study-meta">01:32 — App PWA · Co-parent &amp; naissance</span>
              <span class="case-study-title">naïko</span>
              <span class="case-study-teaser">Une PWA d'accompagnement pour le co-parent, de la grossesse au 4e trimestre.</span>
            </span>
            <span class="case-study-label">+ Détail</span>
          </button>
          <div class="case-study-body" id="case-naiko">
            <div class="case-study-body-inner">
              <div class="case-study-detail">
                <div class="case-study-detail-label">Contexte</div>
                <p>Ma femme se préparait pour un accouchement physiologique pour notre deuxième enfant. J'ai centralisé des notes sur Notion et les ai partagées à un collègue s'apprêtant à devenir papa pour la première fois et manquant d'informations sur la préparation, l'accouchement et la suite. Il ne les a jamais lues car trop denses. Le problème n'était pas le manque d'information, c'était l'absence d'un outil d'accompagnement. De là est venue l'idée de l'app.</p>
              </div>
              <div class="case-study-detail">
                <div class="case-study-detail-label">Ce que j'ai construit</div>
                <p>Une PWA pensée pour accompagner le co-parent en temps réel, de la grossesse au 4e trimestre : infos sur la préparation à l'accouchement, un compteur de contractions pour le jour J, une liste de tips à consulter, des checks de départ et un suivi post-naissance (rendez-vous médicaux, biberons, allaitement…). Un outil synthétique, simple et pratique.</p>
              </div>
              <div class="case-study-detail">
                <div class="case-study-detail-label">Défi</div>
                <p>Remplacer un document dense que personne ne lit par un outil qu'on utilise vraiment, au bon moment.</p>
              </div>
              <div class="case-study-detail">
                <div class="case-study-detail-label">Stack</div>
                <div class="skills-list">
                  <span class="skill-tag">React 18</span>
                  <span class="skill-tag">Vite 5</span>
                  <span class="skill-tag">Tailwind CSS</span>
                  <span class="skill-tag">Firebase</span>
                  <span class="skill-tag">PWA</span>
                  <span class="skill-tag">Cloudflare Workers</span>
                </div>
              </div>
              <div class="case-study-detail">
                <div class="case-study-detail-label">Résultat</div>
                <p>Utilisée en conditions réelles pour la naissance de mon deuxième enfant — le compteur de contractions a permis de partir à la maternité au bon moment. Les rappels de rendez-vous médicaux, administratifs et le compteur de biberons se sont ensuite révélés très utiles. Le retour d'usage est assez solide pour que j'en lance la commercialisation, avec de premiers échanges en cours auprès de sages-femmes et professionnels de santé pour en valider le contenu et la distribuer directement aux futurs parents et accompagnants.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="case-study">
          <button class="case-study-toggle" aria-expanded="false" aria-controls="case-fmi">
            <span class="case-study-head">
              <span class="case-study-meta">02:05 — App PWA · Ground Control</span>
              <span class="case-study-title">Festival des Médias Indépendants</span>
              <span class="case-study-teaser">Une PWA de programmation en temps réel, construite en une itération solo.</span>
            </span>
            <span class="case-study-label">+ Détail</span>
          </button>
          <div class="case-study-body" id="case-fmi">
            <div class="case-study-body-inner">
              <div class="case-study-detail">
                <div class="case-study-detail-label">Contexte</div>
                <p>En préparant la communication du festival, j'avais centralisé toute la programmation dans une base de données. En voyant la structure, j'ai réalisé que j'avais tout ce qu'il fallait pour construire une app. Je l'ai fait de ma propre initiative.</p>
              </div>
              <div class="case-study-detail">
                <div class="case-study-detail-label">Ce que j'ai construit</div>
                <p>Une PWA accessible sans téléchargement : onglet « en ce moment » en temps réel, programme complet, plan du site, manifeste du festival, redirections réseaux et pages dédiées food et thématique.</p>
              </div>
              <div class="case-study-detail">
                <div class="case-study-detail-label">Défi</div>
                <p>Déployer sans budget ni campagne dédiée — uniquement via la signalétique du site, sans communication en amont.</p>
              </div>
              <div class="case-study-detail">
                <div class="case-study-detail-label">Stack</div>
                <div class="skills-list">
                  <span class="skill-tag">React</span>
                  <span class="skill-tag">TypeScript</span>
                  <span class="skill-tag">Vite</span>
                  <span class="skill-tag">Tailwind CSS</span>
                  <span class="skill-tag">React Router</span>
                  <span class="skill-tag">Cloudflare Pages</span>
                  <span class="skill-tag">Notion API</span>
                </div>
              </div>
              <div class="case-study-detail">
                <div class="case-study-detail-label">Résultat</div>
                <p>Déployée et utilisée pendant l'événement, distribuée via QR codes sur les panneaux de signalétique. Sans communication en amont — 30 visiteurs. La prochaine itération méritera une vraie campagne de déploiement.</p>
              </div>
              <a href="https://fmiapp.pages.dev" target="_blank" rel="noreferrer" class="projet-link">fmiapp.pages.dev</a>
            </div>
          </div>
        </div>

        <div class="case-study">
          <button class="case-study-toggle" aria-expanded="false" aria-controls="case-make">
            <span class="case-study-head">
              <span class="case-study-meta">02:40 — Notion × Make × WordPress · Ground Control</span>
              <span class="case-study-title">Automations</span>
              <span class="case-study-teaser">Un pipeline Notion → Make → WordPress qui tourne sans supervision.</span>
            </span>
            <span class="case-study-label">+ Détail</span>
          </button>
          <div class="case-study-body" id="case-make">
            <div class="case-study-body-inner">
              <div class="case-study-detail">
                <div class="case-study-detail-label">Contexte</div>
                <p>Le service com passait un temps considérable à mettre à jour le site WordPress manuellement — création de pages, mise à jour de l'agenda hebdomadaire. Un site old school, jamais repensé depuis sa création. J'ai identifié deux automatisations prioritaires.</p>
              </div>
              <div class="case-study-detail">
                <div class="case-study-detail-label">Ce que j'ai construit</div>
                <p>Un pipeline Notion → Make → WordPress pour la création et mise en ligne des pages de programmation en batch, déclenché par un seul trigger. Et un script de génération automatique de la page Agenda, qui va chercher les infos dans les pages projets et construit les modules dynamiquement, sans intervention manuelle.</p>
              </div>
              <div class="case-study-detail">
                <div class="case-study-detail-label">Défi</div>
                <p>Faire tourner l'automatisation sans supervision continue — y compris pendant une absence prolongée.</p>
              </div>
              <div class="case-study-detail">
                <div class="case-study-detail-label">Stack</div>
                <div class="skills-list">
                  <span class="skill-tag">Notion</span>
                  <span class="skill-tag">Make</span>
                  <span class="skill-tag">WordPress</span>
                  <span class="skill-tag">ACF</span>
                  <span class="skill-tag">Script IA</span>
                </div>
              </div>
              <div class="case-study-detail">
                <div class="case-study-detail-label">Résultat</div>
                <p>Le script Agenda tourne en production pendant mon congé paternité — sans supervision. Environ 1h gagnée par semaine, zéro risque d'oubli. La prochaine itération du pipeline pages intégrera une nouvelle plateforme de programmation via API — gain estimé à 5-10h par semaine.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Music card - wide -->
        <div class="projet-card wide">
          <div class="projet-card-bg"></div>
          <div>
            <div class="projet-tag">Production musicale · en cours</div>
            <h3 class="projet-title">Musiques électroniques</h3>
            <p class="projet-desc">Production de musiques électroniques — techno, ambient, drum &amp; bass. Travail sur hardware (Roland TR-8S, TD-3-MO) et Ableton Live. Une pratique parallèle qui informe l'œil éditorial : rythme, texture, structure narrative.</p>
            <a href="https://odilonwav.bandcamp.com/" target="_blank" class="projet-link">Écouter sur Bandcamp</a>
          </div>
          <div>
            <div class="music-waveform" id="waveform"></div>
            <div class="projet-details" style="margin-top: 24px;">
              <div class="projet-detail"><strong>Outils ·</strong> Roland TR-8S · TD-3-MO · Ableton Live</div>
              <div class="projet-detail"><strong>Registres ·</strong> Techno · Ambient · Drum &amp; Bass · Post-punk</div>
              <div class="projet-detail"><strong>Format ·</strong> Production indépendante</div>
            </div>
          </div>
        </div>

      </div>
    </section>
```

- [ ] **Step 3: Delete the two splash overlay `<div>` blocks entirely (they sit between `</div>` closing `.site-wrapper` and the `<script>` tag)**

Old:
```html
  </main>
</div>

<!-- ─── SPLASH MARINE ─── -->
<div class="splash-overlay" id="splash-marine" role="dialog" aria-modal="true">
```

New:
```html
  </main>
</div>

<!-- SPLASH-REMOVED-MARKER -->
<div class="splash-overlay" id="splash-marine" role="dialog" aria-modal="true">
```

Then, since the full splash markup runs ~70 lines with content unique to this task (marine stars container, boat SVG, ground beams container, both splash-content blocks), delete everything from `<!-- SPLASH-REMOVED-MARKER -->` through the closing `</div>` of `#splash-ground` (the line immediately before `<script>`). Read the current file (`odilon-corby-cv.html`, the block starts at the `<!-- ─── SPLASH MARINE ─── -->` comment and ends right before `<script>`) and delete that whole range in one edit, leaving:

```html
  </main>
</div>

<script>
```

- [ ] **Step 4: Remove splash JS and marine-stars/ground-beams generator JS, add the case-study accordion toggle JS**

Old:
```html
  // ─── SPLASH ───
  function openSplash(id) {
    document.getElementById(id).classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSplash() {
    document.querySelectorAll('.splash-overlay').forEach(el => el.classList.remove('active'));
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.splash-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeSplash();
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSplash();
  });

  // Generate marine stars
  const marineStars = document.getElementById('marine-stars');
  for (let i = 0; i < 80; i++) {
    const s = document.createElement('div');
    s.style.cssText = `position:absolute;border-radius:50%;background:white;
      left:${Math.random()*100}%;top:${Math.random()*55}%;
      width:${Math.random()*1.8+0.4}px;height:${Math.random()*1.8+0.4}px;
      opacity:${Math.random()*0.5+0.1}`;
    marineStars.appendChild(s);
  }

  // Generate ground control beams
  const beamColors = [
    'rgba(255,80,30,0.7)', 'rgba(255,160,0,0.6)', 'rgba(255,50,120,0.7)',
    'rgba(80,150,255,0.6)', 'rgba(255,80,30,0.5)', 'rgba(180,80,255,0.6)', 'rgba(255,200,0,0.5)'
  ];
  const beamsContainer = document.getElementById('ground-beams');
  beamColors.forEach((color, i) => {
    const b = document.createElement('div');
    b.className = 'g-beam';
    b.style.cssText = `left:${10 + i*13}%;height:${45+Math.random()*35}%;
      background:linear-gradient(to top,${color},transparent);
      animation-delay:${i*0.45}s;animation-duration:${3+Math.random()*2}s`;
    beamsContainer.appendChild(b);
  });

  // ─── WAVEFORM BARS ───
```

New:
```html
  // ─── CASE STUDY ACCORDIONS ───
  document.querySelectorAll('.case-study-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const body = btn.nextElementSibling;
      body.classList.toggle('open', !expanded);
      btn.querySelector('.case-study-label').textContent = expanded ? '+ Détail' : '− Fermer';
    });
  });

  // ─── WAVEFORM BARS ───
```

- [ ] **Step 5: Verify**

Run: `grep -c "splash\|openSplash\|closeSplash\|marine-stars\|ground-beams" "projet online/odilon-corby-cv.html"`
Expected: `0` (nothing left referencing splashes).

Screenshot the Projets section. Expected: three accordion rows (naïko, Festival des Médias Indépendants, Automations) each showing meta/title/teaser and a "+ Détail" label; clicking one expands it smoothly, flips the label to "− Fermer", and `aria-expanded` becomes `"true"` (check via browser dev tools or by reading the DOM). The Musique card still shows the animated waveform, now in amber, and clicking it does nothing (no more splash trigger).

- [ ] **Step 6: Commit**

```bash
git add "projet online/odilon-corby-cv.html"
git commit -m "Projets: remove splash overlays, add naïko/FMI/Automations case studies, recolor Musique card"
```

---

## Task 7: Contact (03:15) — retoken, regroup skills, confirm email

**Files:**
- Modify: `projet online/odilon-corby-cv.html` (`<style>` — `#contact`, `.contact-*`, `.skills-title`, `.skills-list`, `.skill-tag`; body — `<section id="contact">`)

**Interfaces:**
- Consumes: tokens from Task 1. `.skill-tag`/`.skills-list` CSS defined here is the same class used by Task 4 (Parcours editorial tags) and Task 6 (case study Stack tags) — this is the single source of truth for that rule, so it must ship in this task for the whole file to look right (Tasks 4 and 6 already reference the class name; this task supplies its final styling).

- [ ] **Step 1: Retoken contact CSS**

Old:
```css
  /* ─── CONTACT ─── */
  #contact {
    min-height: auto;
    padding-bottom: 120px;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: start;
  }

  .contact-main {}

  .contact-address {
    font-family: var(--serif);
    font-size: 32px;
    font-style: italic;
    color: var(--white);
    line-height: 1.3;
    margin-bottom: 40px;
  }

  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 16px;
    text-decoration: none;
    padding: 16px 20px;
    background: var(--surface);
    border: 1px solid rgba(240,237,230,0.06);
    transition: border-color 0.3s, background 0.3s;
  }

  .contact-link:hover {
    border-color: var(--oxide);
    background: var(--white-ghost);
  }

  .contact-link-label {
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--oxide);
    width: 64px;
    flex-shrink: 0;
  }

  .contact-link-value {
    font-family: var(--body);
    font-size: 16px;
    color: var(--white-dim);
    transition: color 0.2s;
  }

  .contact-link:hover .contact-link-value {
    color: var(--white);
  }

  .contact-skills {}

  .skills-title {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--oxide);
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .skills-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(240,237,230,0.08);
  }

  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 40px;
  }

  .skill-tag {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.12em;
    color: var(--white-dim);
    border: 1px solid rgba(240,237,230,0.12);
    padding: 6px 12px;
    transition: all 0.2s;
  }

  .skill-tag:hover {
    border-color: var(--oxide);
    color: var(--white);
  }
```

New:
```css
  /* ─── CONTACT ─── */
  #contact {
    min-height: auto;
    padding-bottom: 120px;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: start;
  }

  .contact-main {}

  .contact-address {
    font-family: var(--font-display);
    font-size: 28px;
    font-style: italic;
    color: var(--text-primary);
    line-height: 1.3;
    margin-bottom: 40px;
  }

  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 16px;
    text-decoration: none;
    padding: 14px 18px;
    background: var(--surface-raised);
    border: 1px solid var(--border-color-soft);
    transition: all var(--duration-base) var(--ease-standard);
  }

  .contact-link:hover {
    border-color: var(--border-color-accent);
  }

  .contact-link-label {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: var(--tracking-mono-label);
    text-transform: uppercase;
    color: var(--accent-primary);
    width: 64px;
    flex-shrink: 0;
  }

  .contact-link-value {
    font-family: var(--font-body);
    font-size: 15px;
    color: var(--text-secondary);
    transition: color var(--duration-fast) var(--ease-standard);
  }

  .contact-link:hover .contact-link-value {
    color: var(--text-primary);
  }

  .contact-skills {}

  .skills-title {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: var(--tracking-mono-label);
    text-transform: uppercase;
    color: var(--accent-primary);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .skills-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border-color-soft);
  }

  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 32px;
  }

  .skill-tag {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: var(--tracking-mono);
    color: var(--text-secondary);
    border: 1px solid var(--border-color-soft);
    border-radius: var(--radius-sm);
    padding: 6px 12px;
    display: inline-block;
    transition: all var(--duration-fast) var(--ease-standard);
  }

  .skill-tag:hover {
    border-color: var(--border-color-accent);
    color: var(--text-primary);
  }
```

- [ ] **Step 2: Regroup the Contact skill lists (editorial tags moved to Parcours in Task 4 — this section keeps only Outils & automatisation / IA / Formation / Langues) and confirm the email**

Old:
```html
      <div class="contact-grid">
        <div class="contact-main">
          <p class="contact-address">Un projet,<br>une direction éditoriale,<br>une conversation.</p>
          <div class="contact-links">
            <a href="mailto:odilon.corby@gmail.com" class="contact-link">
              <span class="contact-link-label">Email</span>
              <span class="contact-link-value">odilon.corby@gmail.com</span>
            </a>
            <a href="tel:+33650881622" class="contact-link">
              <span class="contact-link-label">Téléphone</span>
              <span class="contact-link-value">+33 6 50 88 16 22</span>
            </a>
            <a href="https://www.linkedin.com/in/odiloncorby" target="_blank" class="contact-link">
              <span class="contact-link-label">LinkedIn</span>
              <span class="contact-link-value">linkedin.com/in/odiloncorby</span>
            </a>
            <a href="https://odilonwav.bandcamp.com/" target="_blank" class="contact-link">
              <span class="contact-link-label">Bandcamp</span>
              <span class="contact-link-value">odilonwav.bandcamp.com</span>
            </a>
          </div>
        </div>

        <div class="contact-skills">
          <div class="skills-title">Compétences</div>
          <div class="skills-list">
            <span class="skill-tag">Stratégie éditoriale</span>
            <span class="skill-tag">Storytelling</span>
            <span class="skill-tag">Direction communication</span>
            <span class="skill-tag">Relations presse</span>
            <span class="skill-tag">Social media</span>
            <span class="skill-tag">Management</span>
            <span class="skill-tag">Gestion de projets</span>
            <span class="skill-tag">Adobe Suite</span>
            <span class="skill-tag">GitHub</span>
            <span class="skill-tag">WordPress</span>
            <span class="skill-tag">Cloudflare</span>
            <span class="skill-tag">Make (automatisation)</span>
            <span class="skill-tag">Email marketing</span>
            <span class="skill-tag">Production vidéo</span>
            <span class="skill-tag">Brevo</span>
            <span class="skill-tag">Make</span>
            <span class="skill-tag">Notion</span>
            <span class="skill-tag">Automatisation No-Code</span>
          </div>

          <div class="skills-title">Intelligence artificielle</div>
          <div class="skills-list">
            <span class="skill-tag">ChatGPT</span>
            <span class="skill-tag">Claude</span>
            <span class="skill-tag">Claude Code</span>
            <span class="skill-tag">Midjourney</span>
            <span class="skill-tag">NanoBanana</span>
            <span class="skill-tag">VS Code</span>
          </div>

          <div class="skills-title">Formation</div>
          <div class="skills-list">
            <span class="skill-tag">Masters Communication — Cesacom / Cergy · 2015</span>
            <span class="skill-tag">BTS Communication — CFA SACEF · 2012</span>
          </div>

          <div class="skills-title">Langues</div>
          <div class="skills-list">
            <span class="skill-tag">Français — natif</span>
            <span class="skill-tag">Anglais — courant</span>
          </div>
        </div>
      </div>
    </section>
```

New:
```html
      <div class="contact-grid">
        <div class="contact-main">
          <p class="contact-address">Un projet,<br>une direction éditoriale,<br>une conversation.</p>
          <div class="contact-links">
            <a href="mailto:odilon.corby@proton.me" class="contact-link">
              <span class="contact-link-label">Email</span>
              <span class="contact-link-value">odilon.corby@proton.me</span>
            </a>
            <a href="tel:+33650881622" class="contact-link">
              <span class="contact-link-label">Téléphone</span>
              <span class="contact-link-value">+33 6 50 88 16 22</span>
            </a>
            <a href="https://www.linkedin.com/in/odiloncorby" target="_blank" class="contact-link">
              <span class="contact-link-label">LinkedIn</span>
              <span class="contact-link-value">linkedin.com/in/odiloncorby</span>
            </a>
            <a href="https://odilonwav.bandcamp.com/" target="_blank" class="contact-link">
              <span class="contact-link-label">Bandcamp</span>
              <span class="contact-link-value">odilonwav.bandcamp.com</span>
            </a>
          </div>
        </div>

        <div class="contact-skills">
          <div class="skills-title">Outils &amp; automatisation</div>
          <div class="skills-list">
            <span class="skill-tag">Adobe Suite</span>
            <span class="skill-tag">GitHub</span>
            <span class="skill-tag">WordPress</span>
            <span class="skill-tag">Cloudflare</span>
            <span class="skill-tag">Make (automatisation)</span>
            <span class="skill-tag">Notion</span>
            <span class="skill-tag">Automatisation No-Code</span>
          </div>

          <div class="skills-title">Intelligence artificielle</div>
          <div class="skills-list">
            <span class="skill-tag">ChatGPT</span>
            <span class="skill-tag">Claude</span>
            <span class="skill-tag">Claude Code</span>
            <span class="skill-tag">Midjourney</span>
            <span class="skill-tag">NanoBanana</span>
            <span class="skill-tag">VS Code</span>
          </div>

          <div class="skills-title">Formation</div>
          <div class="skills-list">
            <span class="skill-tag">Masters Communication — Cesacom / Cergy · 2015</span>
            <span class="skill-tag">BTS Communication — CFA SACEF · 2012</span>
          </div>

          <div class="skills-title">Langues</div>
          <div class="skills-list">
            <span class="skill-tag">Français — natif</span>
            <span class="skill-tag">Anglais — courant</span>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 3: Confirm no more `gmail.com` occurrences anywhere in the file**

Run: `grep -n "gmail.com" "projet online/odilon-corby-cv.html"`
Expected: no output (exit code 1 / no matches).

- [ ] **Step 4: Verify**

Screenshot the Contact section. Expected: pull-quote in VG5000 italic, four `ContactLink` rows (Email now shows `odilon.corby@proton.me`), then four skill groups: "Outils & automatisation" (7 tags, no duplicated "Make"), "Intelligence artificielle", "Formation", "Langues". Also re-screenshot Parcours to confirm its "Compétences éditoriales" group (added in Task 4) still renders correctly now that `.skill-tag` has its final styling.

- [ ] **Step 5: Commit**

```bash
git add "projet online/odilon-corby-cv.html"
git commit -m "Contact: retoken, regroup skills (Outils & automatisation), confirm proton.me email"
```

---

## Task 8: Motion system — generalize reveal/stagger, reduced motion

**Files:**
- Modify: `projet online/odilon-corby-cv.html` (`<style>` — `.timeline-item` visibility rule generalized to `.reveal-stagger`, add `prefers-reduced-motion` block; body — add `reveal-stagger` class to Approche cells and case studies; `<script>` — generalize the stagger observer)

**Interfaces:**
- Consumes: `.timeline-item` styling from Task 4, `.approche-cell` from Task 5, `.case-study` from Task 6 — this task only adds a shared class to elements already built by earlier tasks, it does not redefine their layout.
- Produces: final motion behavior — no later task touches animation.

- [ ] **Step 1: Replace the `.timeline-item` visibility transition with a shared `.reveal-stagger` rule**

Old:
```css
  .timeline-item {
    position: relative;
    margin-bottom: 56px;
    opacity: 0;
    transform: translateX(-16px);
    transition: opacity var(--duration-slow) var(--ease-standard), transform var(--duration-slow) var(--ease-standard);
  }

  .timeline-item.visible {
    opacity: 1;
    transform: translateX(0);
  }
```

New:
```css
  .timeline-item {
    position: relative;
    margin-bottom: 56px;
  }

  .reveal-stagger {
    opacity: 0;
    transform: translateX(-16px);
    transition: opacity var(--duration-slow) var(--ease-standard), transform var(--duration-slow) var(--ease-standard);
  }

  .reveal-stagger.visible {
    opacity: 1;
    transform: translateX(0);
  }
```

- [ ] **Step 2: Add `prefers-reduced-motion` override at the end of the `<style>` block, right before `</style>`**

Old:
```css
  @media (max-width: 480px) {
    section { padding: 48px 16px; scroll-margin-top: 72px; }
    .section-title { font-size: 32px; }
    .section-line { display: none; }
    .hero-title { font-size: 36px; }
    .hero-concept { font-size: 16px; }
    .hero-meta { flex-direction: column; gap: 16px; }
    .hero-portrait { max-width: 180px; }
    .projet-card { padding: 28px 16px; }
    .approche-cell { padding: 20px 16px; }
    .contact-address { font-size: 22px; }
    .timeline-role { font-size: 20px; }
    .approche-statement { font-size: 18px; padding-left: 16px; }
    .splash-ctas { flex-direction: column; align-items: center; gap: 8px; }
    .splash-close { top: 20px; right: 20px; }
  }
</style>
```

New:
```css
  @media (max-width: 480px) {
    section { padding: 48px 16px; scroll-margin-top: 72px; }
    .section-title { font-size: 32px; }
    .section-line { display: none; }
    .hero-title { font-size: 36px; }
    .hero-concept { font-size: 16px; }
    .hero-meta { flex-direction: column; gap: 16px; }
    .hero-portrait { max-width: 180px; }
    .projet-card { padding: 28px 16px; }
    .approche-cell { padding: 20px 16px; }
    .contact-address { font-size: 22px; }
    .timeline-role { font-size: 20px; }
    .pull-quote { font-size: 18px; padding-left: 16px; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
    section, .reveal-stagger, .hero-eyebrow, .hero-title, .hero-concept, .hero-meta, .hero-portrait, .sidebar {
      opacity: 1 !important;
      transform: none !important;
    }
  }
</style>
```

- [ ] **Step 3: Add `reveal-stagger` to each Approche cell and each case study in the body markup**

Old:
```html
      <div class="approche-grid">
        <div class="approche-cell">
          <div class="approche-cell-index">01 · Narratif</div>
```

New:
```html
      <div class="approche-grid">
        <div class="approche-cell reveal-stagger">
          <div class="approche-cell-index">01 · Narratif</div>
```

Repeat the same `class="approche-cell"` → `class="approche-cell reveal-stagger"` change for the three other `.approche-cell` blocks (`02 · Éditorial`, `03 · Culturel`, `04 · Opérationnel`) — four occurrences total in that grid.

Old:
```html
        <div class="case-study">
          <button class="case-study-toggle" aria-expanded="false" aria-controls="case-naiko">
```

New:
```html
        <div class="case-study reveal-stagger">
          <button class="case-study-toggle" aria-expanded="false" aria-controls="case-naiko">
```

Repeat for the `case-fmi` and `case-make` case studies (`class="case-study"` → `class="case-study reveal-stagger"`) — three occurrences total.

Also add it to the timeline items:

Old:
```html
        <div class="timeline-item">
          <div class="timeline-dates">2023 — En poste</div>
```

New:
```html
        <div class="timeline-item reveal-stagger">
          <div class="timeline-dates">2023 — En poste</div>
```

Repeat for the three other `.timeline-item` blocks (2018–2023, 2017–2018, 2014–2016) — four occurrences total.

- [ ] **Step 4: Generalize the stagger `IntersectionObserver` in the script from `.timeline-item` to `.reveal-stagger`**

Old:
```html
  // ─── INTERSECTION OBSERVER for section reveals ───
  const sections = document.querySelectorAll('section');
  const timelineItems = document.querySelectorAll('.timeline-item');

  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.08 });

  sections.forEach(s => sectionObs.observe(s));

  const itemObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 120);
      }
    });
  }, { threshold: 0.1 });

  timelineItems.forEach(item => itemObs.observe(item));
```

New:
```html
  // ─── INTERSECTION OBSERVER for section reveals ───
  const sections = document.querySelectorAll('section');
  const staggerItems = document.querySelectorAll('.reveal-stagger');

  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.08 });

  sections.forEach(s => sectionObs.observe(s));

  const itemObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });

  staggerItems.forEach(item => itemObs.observe(item));
```

- [ ] **Step 5: Verify**

Run: `grep -c "reveal-stagger" "projet online/odilon-corby-cv.html"`
Expected: at least `13` (1 CSS rule + 1 CSS `.visible` rule + 1 JS querySelectorAll + 4 timeline-item + 4 approche-cell + 3 case-study = 13).

Screenshot + scroll test: reload the page, scroll slowly through Parcours, Approche, Projets. Expected: timeline items, approche cells, and case studies each fade+slide in with a slight stagger as they cross into view, none of them pop in instantly as a block. With reduced-motion simulated (browser dev tools → rendering → emulate `prefers-reduced-motion: reduce`), everything should be visible immediately with no animation.

- [ ] **Step 6: Commit**

```bash
git add "projet online/odilon-corby-cv.html"
git commit -m "Motion: unify reveal-stagger across timeline/approche/case-studies, add reduced-motion override"
```

---

## Task 9: Final QA pass

**Files:**
- Modify: `projet online/odilon-corby-cv.html` (cleanup only, if anything is found)

**Interfaces:**
- Consumes: everything from Tasks 1–8. This task makes no new interfaces.

- [ ] **Step 1: Confirm no old token names remain**

Run: `grep -n "var(--oxide\|var(--black\|var(--deep\|var(--surface)\|var(--white\|var(--mono)\|var(--serif)\|var(--body)" "projet online/odilon-corby-cv.html"`
Expected: no output. If anything matches, fix it inline (retoken to the equivalent `--color-*`/`--font-*`/`--text-*`/`--accent-*` variable per Task 1's mapping) and re-run.

- [ ] **Step 2: Confirm no splash/marine/ground remnants and no gmail address remain**

Run: `grep -n "splash\|marine\|ground-beam\|gmail" "projet online/odilon-corby-cv.html"`
Expected: no output (the "Ground Control" *text* in the timeline/org fields is fine and expected — re-run excluding that if it shows up: `grep -n "splash\|marine\|ground-beam\|gmail" "projet online/odilon-corby-cv.html" | grep -v "Ground Control"`).

- [ ] **Step 3: Full-page visual walkthrough, desktop**

Screenshot the full page at a desktop width (~1440px) top to bottom (Signal → Parcours → Approche → Projets → Contact) using `pixelbrowse:screenshot`. Confirm against `docs/superpowers/specs/2026-07-09-cv-odilon-code-redesign-design.md`:
- ink/paper/amber/phosphor palette throughout, no red/oxide or Playfair/Garamond remnants
- sidebar nav shows `00:00`, `00:47`, `01:15`, `01:32`, `03:15`
- Parcours ends with the pull-quote + "Compétences éditoriales" tags
- Approche is a 4-column grid
- Projets shows 3 accordions + the Musique card, no splash cards
- Contact shows the proton.me email and the regrouped skill lists

- [ ] **Step 4: Mobile walkthrough**

Screenshot at a mobile width (~390px). Confirm: sidebar is hidden, mobile top bar with horizontal-scroll nav (still showing timecodes) is visible and sticky, Approche grid collapses to 1 column, case studies and Musique card stack full-width and remain legible.

- [ ] **Step 5: Interaction spot-check**

Using the running local server, manually (or via screenshot before/after a click) confirm:
- clicking a case-study header expands it and the label flips to "− Fermer"; clicking again collapses it
- clicking a sidebar nav link jumps to the right section and that link gets `.active` after scrolling there
- the "Écouter sur Bandcamp" and `fmiapp.pages.dev` links have the correct `href` and `target="_blank"`

- [ ] **Step 6: Final commit (only if Step 1–2 required fixes; otherwise this task is verification-only and needs no commit)**

```bash
git add "projet online/odilon-corby-cv.html"
git commit -m "QA: clean up remaining old-token/splash references"
```

---

## Self-Review Notes

- **Spec coverage:** tokens/fonts/CSP (Task 1), layout+nav timecodes+email (Task 2), hero+parallax+counter (Task 3), Parcours+pull-quote+editorial tags (Task 4), Approche 4-col grid (Task 5), Projets case studies+Musique card+splash removal (Task 6), Contact regroup+email (Task 7), motion system+reduced-motion (Task 8), full QA (Task 9) — every section of the design spec has a task.
- **Type/name consistency checked:** `.reveal-stagger` is introduced once (Task 8) and only *used* earlier (Tasks 4–6 don't reference it before Task 8 defines it — the class is inert on those elements until Task 8, which is fine, it's just an unstyled class name sitting on markup written by earlier tasks... actually corrected: Task 8 Step 3 is the one adding the class to markup, so no earlier task references it prematurely). `.skill-tag`/`.skills-list` defined in Task 7 but used in Tasks 4 and 6 — noted explicitly in Task 7's Interfaces block so the implementer knows why. `.pull-quote` introduced in Task 4, replacing `.approche-statement` which Task 5 is told to expect gone.
- **No placeholders:** every step has literal before/after code, exact grep commands with expected output, exact commit messages.
