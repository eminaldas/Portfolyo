# Portfolio Synapser Redesign — Design Spec

**Date:** 2026-06-02  
**Status:** Approved  

---

## Overview

Full redesign of the portfolio (portfolio_frontend/frontend) inspired by synapserstudio.com's editorial aesthetic. The current purple/blue MD3 color system is replaced with a warm beige/cream palette. Four new interactive elements are added on top of the existing component structure. Content is refreshed from the updated resume (public/images/resume.pdf).

---

## Color System

Replace all CSS token values in `src/index.css`. The `.dark` variant is removed — the site is dark-only.

| Token | New value |
|---|---|
| `--background` | `#111109` |
| `--surface` | `#1a1a14` |
| `--surface-container` | `#1a1a14` |
| `--surface-container-low` | `#0e0e09` |
| `--on-background` | `#dcd8c0` |
| `--on-surface` | `#dcd8c0` |
| `--on-surface-variant` | `rgba(220,216,192,0.5)` |
| `--primary` | `#dcd8c0` |
| `--on-primary` | `#111109` |
| `--outline` | `rgba(220,216,192,0.25)` |
| `--outline-variant` | `rgba(220,216,192,0.1)` |

Typography stays the same (Space Grotesk, Inter, Manrope). IBM Plex Mono is added for monospace labels/nav numbers — add `family=IBM+Plex+Mono:wght@400;700` to the Google Fonts import in `src/index.css` and register it as `font-mono` in `@theme`.

---

## New Elements

### 1. Preloader (`src/assets/components/Preloader.jsx`)

- Mounted once in `App.jsx`, unmounted after animation completes
- Dark background (`#111109`) covers full viewport, `z-index: 50`
- Center: counter `00` → `100` animating over ~2s (GSAP `to`)
- After 100%: clip-path `polygon(0 0, 100% 0, 100% 100%, 0 100%)` → `polygon(0 0, 100% 0, 100% 0%, 0 0%)` wipe upward (GSAP)
- Component removes itself from DOM after animation via React state
- `sessionStorage('preloader-seen')` flag: shows once per browser tab session, not on refresh

### 2. Navbar redesign (`src/assets/components/Navbar.jsx`)

Current floating pill nav → three-panel Synapser layout:

- **Left**: `Emin Aldaş` wordmark
- **Center**: bordered box (`border: 1px solid rgba(220,216,192,0.25)`, `backdrop-filter: blur(12px)`) containing links with monospace numbers: `001/Works  002/Skills  003/About  004/Contact`
- **Right**: bordered box containing `TR/EN` toggle | divider | theme toggle (removed — dark-only) | `Resume ↗` button (cream background, dark text)

Nav link active state: full opacity vs 0.6 opacity for inactive.

Resume button links to `/images/resume.pdf` (fixes current broken `/resume.pdf` link).

Mobile nav: hamburger menu, same bordered aesthetic.

### 3. Floating Words Hero Canvas (`src/assets/components/FloatingWordsCanvas.jsx`)

Standalone canvas component rendered inside `HeroSection`:

- Words array (EN): `['python','react','fastapi','nlp','docker','redis','celery','postgresql','angular','problem-solver','full-stack','clean-code','pgvector','flask','javascript','bert','git']`
- Words array (TR): same (tech terms stay in English)
- Each word: random position, slow drift velocity (`±0.4px/frame`)
- SVG-style lines drawn between particles within 140px distance, opacity proportional to inverse distance
- Mouse repel: within 120px radius, words accelerate away from cursor
- Mouse hover on word: opacity increases, slight scale
- Canvas fills full hero section, `pointer-events: all` on canvas, absolute positioned behind hero text

### 4. Manifesto Section (`src/assets/components/ManifestoSection.jsx`)

New section inserted between `HeroSection` and `BentoStats` in `LandingPage.jsx`.

Layout:
- Background: `--surface-container-low` (`#0e0e09`)
- Section label (monospace, faint): `— Vizyon`
- Lines (EN):
  1. `IT Audit to AI —` (bold uppercase)
  2. `clean code,` (muted, 20% opacity)
  3. `*production systems,*` (serif italic, 45% opacity)
  4. `purposeful engineering.` (bold uppercase)
- Lines (TR): translations added to `LanguageContext`
- Scroll animation: each line `overflow: hidden`, inner `<span>` starts `translateY(100%)`, reveals on IntersectionObserver trigger with 120ms stagger (Framer Motion `useInView` + `motion.span`)

---

## New Section: Skills (`src/assets/components/SkillsSection.jsx`)

Inserted after `ManifestoSection` (before `BentoStats`), with `id="skills"` for nav anchor.

Layout: full-width list rows, one per category:

| Category label | Skills |
|---|---|
| Diller / Languages | Python, JavaScript, SQL, TypeScript |
| Frameworks | React.js, FastAPI, Angular, Flask |
| Veritabanı / Database | PostgreSQL, MongoDB, pgvector, Redis |
| DevOps & Tools | Docker, Celery, Git/GitHub |
| Domain | NLP/BERT, REST API, IT Audit, Semantic Search |

Each row:
- `border: 1px solid rgba(220,216,192,0.08)`, hover → `border-color: rgba(220,216,192,0.2)`
- Hover sweep: `::after` pseudo-element grows `width: 0 → 100%` on hover (subtle bg fill)
- Each skill tag: `border: 1px solid rgba(220,216,192,0.15)`, hover → `border-color: --cream`, text brightens
- Category label: IBM Plex Mono, faint, 160px wide column
- Scroll fade-in on each row via Framer Motion `whileInView`

---

## Content Updates (from resume)

### `LanguageContext.jsx`

**hero.description**:
- EN: `"A Full-Stack Engineer building AI-powered systems in production and scalable web applications."`
- TR: `"Üretimde çalışan yapay zeka sistemleri ve ölçeklenebilir web uygulamaları geliştiren Full-Stack Mühendis."`

**works.p1Desc** (NeHaber):
- EN: `"Fake news detection using BERTurk + TF-IDF hybrid model, Celery/Redis async pipeline, pgvector semantic search. Live at nehaber.dev."`
- TR: `"BERTurk + TF-IDF hibrit modeli, Celery/Redis async pipeline ve pgvector semantik arama. nehaber.dev'de canlı."`

**works.p2Desc** (Beavask):
- EN: `"Angular frontend architecture for a task & workflow management system. Nominated for award at university engineering exhibition."`
- TR: `"Angular ile task yönetim sistemi frontend mimarisi. Üniversite mühendislik sergisinde ödüle aday gösterildi."`

Add new keys to both `en` and `tr`:
- `manifesto.label`, `manifesto.line1–4`
- `skills.title`, `skills.label`
- `nav.skills` (`"Skills"` / `"Yetenekler"`)

### `FeaturedWork.jsx`

- NeHaber card: add tech tags (BERTurk, Celery, Redis, pgvector, Docker), add live link badge `nehaber.dev`
- Beavask card: add award badge
- Both cards: hover border-sweep animation consistent with Skills rows

### `Navbar.jsx`

- Fix resume link: `/resume.pdf` → `/images/resume.pdf`
- Add `#skills` anchor link

---

## What Stays the Same

- `BentoStats`, `AboutSection`, `CareerSection`, `ContactSection`, `Footer`, `SocialSidebar` — restyled to new palette but structure unchanged
- `ThemeContext` — kept (no removal), but toggle button removed from Navbar UI. `isDark` defaults to `true` permanently. The `.dark` CSS block in `index.css` is removed; dark palette values move into `:root` directly.
- `LanguageContext` — kept, toggle moves to Navbar right panel
- `RevealOnScroll`, `BlurText` — kept, used in existing sections
- Page structure: single-page, no router

---

## Section Order (after redesign)

```
Preloader (once, unmounts)
Navbar (fixed)
SocialSidebar (fixed)
  HeroSection
  ManifestoSection      ← new
  SkillsSection         ← new
  BentoStats
  AboutSection
  CareerSection
  FeaturedWork
  ContactSection
Footer
```

---

## Out of Scope

- Backend (Flask) — not touched
- Router / multi-page — not added
- Mobile hamburger menu implementation detail — kept as-is, restyled
- 3D / WebGL canvas (Three.js) — not added; floating words canvas is 2D
