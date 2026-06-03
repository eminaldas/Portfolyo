# Synapser Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio with a warm beige/cream Synapser editorial aesthetic — new color system, Preloader, FloatingWordsCanvas, ManifestoSection, SkillsSection, and a full content refresh from the updated resume.

**Architecture:** CSS token swap first (instant palette propagation), then new components added one-by-one, then existing components cleaned up. No new npm dependencies — GSAP and Framer Motion are already installed.

**Tech Stack:** React 19, Vite, Tailwind v4, Framer Motion (scroll animations), GSAP (preloader counter), HTML Canvas API (floating words).

---

## File Map

**Modified:**
- `src/index.css` — palette tokens, IBM Plex Mono import, `@keyframes scanline`, `font-mono` theme token
- `src/context/LanguageContext.jsx` — new keys: `nav.skills`, `manifesto.*`, `skills.*`, `works.p1Title/p2Title/award`; updated: `hero.description`, `works.p1Desc/p2Desc`
- `src/App.jsx` — mount Preloader
- `src/pages/LandingPage.jsx` — section order with new sections
- `src/assets/components/Navbar.jsx` — three-panel redesign, numbered links, fix resume path
- `src/assets/components/HeroSection.jsx` — canvas embed, stroke name, cream palette, remove code window
- `src/assets/components/FeaturedWork.jsx` — list layout, live badge, award badge, updated tags
- `src/assets/components/BentoStats.jsx` — remove rounded-3xl → rounded-none, remove gradient bg, sharp palette
- `src/assets/components/AboutSection.jsx` — remove `dark:` prefix, sharp corners
- `src/assets/components/CareerSection.jsx` — sharp corners, cream palette dots

**Created:**
- `src/assets/components/Preloader.jsx`
- `src/assets/components/FloatingWordsCanvas.jsx`
- `src/assets/components/ManifestoSection.jsx`
- `src/assets/components/SkillsSection.jsx`

---

## Task 1 — CSS Token Palette + Font + Keyframes

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Replace Google Fonts import** (line 1)

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&family=Space+Grotesk:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Manrope:wght@500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap');
```

- [ ] **Step 2: Replace `:root {}` block entirely**

Find the current `:root {` block (begins around line 8) and replace the whole block with:

```css
:root {
  --background: #111109;
  --surface: #1a1a14;
  --surface-dim: #0a0a08;
  --surface-bright: #252520;
  --surface-container-lowest: #0a0a08;
  --surface-container-low: #0e0e09;
  --surface-container: #1a1a14;
  --surface-container-high: #222219;
  --surface-container-highest: #2a2a21;
  --surface-variant: #1e1e16;
  --surface-tint: #dcd8c0;
  --surface-bright: #252520;

  --on-background: #dcd8c0;
  --on-surface: #dcd8c0;
  --on-surface-variant: #9a9880;

  --primary: #dcd8c0;
  --on-primary: #111109;
  --primary-container: #252520;
  --on-primary-container: #dcd8c0;
  --primary-dim: #b8b4a0;
  --primary-fixed: #dcd8c0;
  --primary-fixed-dim: #b8b4a0;
  --on-primary-fixed: #111109;
  --on-primary-fixed-variant: #535350;
  --inverse-primary: #535350;

  --secondary: #9a9880;
  --on-secondary: #111109;
  --secondary-container: #252520;
  --on-secondary-container: #dcd8c0;
  --secondary-dim: #7a7868;
  --secondary-fixed: #9a9880;
  --secondary-fixed-dim: #7a7868;
  --on-secondary-fixed: #111109;
  --on-secondary-fixed-variant: #535350;

  --tertiary: #dcd8c0;
  --on-tertiary: #111109;
  --tertiary-container: #252520;
  --on-tertiary-container: #dcd8c0;
  --tertiary-dim: #b8b4a0;
  --tertiary-fixed: #dcd8c0;
  --tertiary-fixed-dim: #b8b4a0;
  --on-tertiary-fixed: #111109;
  --on-tertiary-fixed-variant: #535350;

  --error: #ef4444;
  --on-error: #ffffff;
  --error-container: #4a1010;
  --on-error-container: #ffb4ab;
  --error-dim: #dc2626;

  --outline: #dcd8c0;
  --outline-variant: #dcd8c0;

  --inverse-surface: #dcd8c0;
  --inverse-on-surface: #111109;
}
```

- [ ] **Step 3: Delete the `.dark { … }` block entirely** (find it below `:root`, remove it top-to-bottom)

- [ ] **Step 4: Add `font-mono` to the `@theme` block**

Find the `@theme {` block and add one line at the end before the closing `}`:

```css
  --font-mono: 'IBM Plex Mono', monospace;
```

- [ ] **Step 5: Add `@keyframes` and scan-line helper after the `@theme` block**

```css
@keyframes scanline {
  from { transform: translateX(-100%); }
  to   { transform: translateX(300%); }
}

.scan-line-inner {
  position: absolute;
  inset: 0;
  background: var(--color-on-surface);
  opacity: 0.35;
  animation: scanline 2s linear infinite;
}
```

- [ ] **Step 6: Verify — run lint, start dev server, check background is dark olive not purple**

```bash
cd portfolio_frontend/frontend && npm run lint && npm run dev
```

Open http://localhost:5173. Background should be `#111109` (dark olive). All text should be cream.

- [ ] **Step 7: Commit**

```bash
git add portfolio_frontend/frontend/src/index.css
git commit -m "feat: swap to warm beige palette, add IBM Plex Mono and scanline keyframe"
```

---

## Task 2 — LanguageContext: New Keys + Content Updates

**Files:**
- Modify: `src/context/LanguageContext.jsx`

- [ ] **Step 1: Add `nav.skills` to both EN and TR**

In the `en.nav` object add:
```js
skills: "Skills",
```
In the `tr.nav` object add:
```js
skills: "Yetenekler",
```

- [ ] **Step 2: Update `hero.description`**

EN:
```js
description: "A Full-Stack Engineer building AI-powered systems in production and scalable web applications.",
```
TR:
```js
description: "Üretimde çalışan yapay zeka sistemleri ve ölçeklenebilir web uygulamaları geliştiren Full-Stack Mühendis.",
```

- [ ] **Step 3: Add `manifesto` key to both EN and TR**

EN:
```js
manifesto: {
  label: '— Vision',
  lines: [
    { text: 'IT Audit to AI —',          muted: false, serif: false },
    { text: 'clean code,',               muted: true,  serif: false },
    { text: 'production systems,',       muted: false, serif: true  },
    { text: 'purposeful engineering.',   muted: false, serif: false },
  ],
},
```

TR:
```js
manifesto: {
  label: '— Vizyon',
  lines: [
    { text: 'IT Denetiminden Yapay Zekaya —', muted: false, serif: false },
    { text: 'temiz kod,',                     muted: true,  serif: false },
    { text: 'üretimde çalışan sistemler,',    muted: false, serif: true  },
    { text: 'amaçlı mühendislik.',            muted: false, serif: false },
  ],
},
```

- [ ] **Step 4: Add `skills` key to both EN and TR**

EN:
```js
skills: {
  title: 'Skills',
  label: 'Technologies I work with',
},
```
TR:
```js
skills: {
  title: 'Yetenekler',
  label: 'Kullandığım teknolojiler',
},
```

- [ ] **Step 5: Update `works` keys**

In EN `works`:
```js
p1Title: "NeHaber — Fake News Detection",
p1Desc:  "Fake news detection with BERTurk + TF-IDF hybrid model, Celery/Redis async NLP pipeline, pgvector semantic search. Live at nehaber.dev.",
p2Title: "Beavask — Task Manager",
p2Desc:  "Angular frontend architecture for a task & workflow management system. Nominated for award at the university engineering exhibition.",
award:   "Award Nominee",
```

In TR `works`:
```js
p1Title: "NeHaber — Sahte Haber Tespiti",
p1Desc:  "BERTurk + TF-IDF hibrit modeli, Celery/Redis async NLP pipeline ve pgvector semantik arama. nehaber.dev'de canlı.",
p2Title: "Beavask — Görev Yöneticisi",
p2Desc:  "Angular ile task yönetim sistemi frontend mimarisi. Üniversite mühendislik sergisinde ödüle aday gösterildi.",
award:   "Ödül Adayı",
```

- [ ] **Step 6: Run lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add portfolio_frontend/frontend/src/context/LanguageContext.jsx
git commit -m "feat: add manifesto, skills, works translation keys; update hero and works copy"
```

---

## Task 3 — Preloader Component

**Files:**
- Create: `src/assets/components/Preloader.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create `Preloader.jsx`**

```jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const obj = { val: 0 };
    const tl = gsap.timeline();

    tl.to(obj, {
      val: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.floor(obj.val)).padStart(2, '0');
        }
      },
    }).to(containerRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 0.8,
      ease: 'power3.inOut',
      delay: 0.15,
      onComplete,
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: '#111109',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      }}
    >
      <div className="flex items-end gap-1">
        <span
          ref={counterRef}
          className="font-mono text-7xl font-bold tabular-nums"
          style={{ color: '#dcd8c0' }}
        >
          00
        </span>
        <span className="font-mono text-3xl mb-3" style={{ color: 'rgba(220,216,192,0.35)' }}>%</span>
      </div>
      <div className="mt-5 w-20 h-[1px] relative overflow-hidden" style={{ background: 'rgba(220,216,192,0.15)' }}>
        <div className="scan-line-inner" />
      </div>
    </div>
  );
};

export default Preloader;
```

- [ ] **Step 2: Update `App.jsx` to mount Preloader once per session**

Replace the full content of `App.jsx` with:

```jsx
import React, { useState, useCallback } from 'react';
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';
import LandingPage from './pages/LandingPage';
import SocialSidebar from './assets/components/SocialSidebar';
import Preloader from './assets/components/Preloader';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  const [showPreloader] = useState(() => !sessionStorage.getItem('preloader-seen'));
  const [preloaderDone, setPreloaderDone] = useState(!showPreloader);

  const handleComplete = useCallback(() => {
    sessionStorage.setItem('preloader-seen', '1');
    setPreloaderDone(true);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        {showPreloader && !preloaderDone && (
          <Preloader onComplete={handleComplete} />
        )}
        <div className="bg-background text-on-background font-body selection:bg-primary/20 selection:text-on-primary">
          <Navbar />
          <SocialSidebar />
          <main className="relative">
            <LandingPage />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
```

- [ ] **Step 3: Verify preloader in browser**

Open http://localhost:5173 in an incognito window (or clear sessionStorage). Preloader should count 00→100%, then wipe upward revealing the page. On hard refresh (same tab) it should NOT show again.

To reset: open DevTools → Application → Session Storage → clear key `preloader-seen`.

- [ ] **Step 4: Commit**

```bash
git add portfolio_frontend/frontend/src/assets/components/Preloader.jsx portfolio_frontend/frontend/src/App.jsx
git commit -m "feat: add Preloader with GSAP counter and clip-path reveal"
```

---

## Task 4 — Navbar Redesign

**Files:**
- Modify: `src/assets/components/Navbar.jsx`

- [ ] **Step 1: Replace full file content**

```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { num: '001', label: t.nav.works,   href: '#works'   },
    { num: '002', label: t.nav.skills,  href: '#skills'  },
    { num: '003', label: t.nav.about,   href: '#about'   },
    { num: '004', label: t.nav.contact, href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Desktop */}
      <nav
        className={`hidden sm:flex items-center justify-between px-10 py-4 transition-all duration-300 ${
          scrolled ? 'bg-background/90 backdrop-blur-xl border-b border-outline/10' : ''
        }`}
      >
        <a
          href="#home"
          className="font-headline font-black text-lg tracking-tight text-on-surface hover:opacity-70 transition-opacity"
        >
          Emin Aldaş
        </a>

        <div className="flex items-center gap-7 border border-outline/25 px-6 py-2 backdrop-blur-sm bg-background/10">
          {links.map(link => (
            <a
              key={link.num}
              href={link.href}
              className="font-mono text-[11px] tracking-[.14em] uppercase text-on-surface/60 hover:text-on-surface transition-colors"
            >
              <span className="text-on-surface/28 mr-[3px]">{link.num}/</span>
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 border border-outline/25 px-4 py-2 backdrop-blur-sm bg-background/10">
          <button
            onClick={toggleLanguage}
            className="font-mono text-[11px] tracking-[.14em] uppercase text-on-surface/55 hover:text-on-surface transition-colors"
          >
            {language === 'en' ? 'TR' : 'EN'}
          </button>
          <div className="w-[1px] h-4 bg-on-surface/20" />
          <a
            href="/images/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="bg-primary text-on-primary px-4 py-1.5 font-mono text-[10px] font-bold tracking-[.12em] uppercase hover:opacity-80 transition-opacity"
          >
            {t.nav.resume} ↗
          </a>
        </div>
      </nav>

      {/* Mobile */}
      <nav className="flex sm:hidden items-center justify-between px-6 py-4">
        <a href="#home" className="font-headline font-black text-base text-on-surface">
          Emin Aldaş
        </a>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="font-mono text-[11px] uppercase text-on-surface/60 border border-outline/25 px-3 py-2"
          >
            {language === 'en' ? 'TR' : 'EN'}
          </button>
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="flex flex-col justify-center items-center gap-1 w-10 h-10 border border-outline/25"
            aria-label="Toggle menu"
          >
            <span className={`block h-[1.5px] w-5 bg-on-surface transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`block h-[1.5px] w-5 bg-on-surface transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[1.5px] w-5 bg-on-surface transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="sm:hidden bg-background/95 backdrop-blur-xl border-b border-outline/15 px-6 py-4 flex flex-col gap-0">
          {links.map(link => (
            <a
              key={link.num}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-[12px] tracking-[.14em] uppercase text-on-surface/70 py-3 border-b border-outline/10 last:border-b-0"
            >
              <span className="text-on-surface/30 mr-1">{link.num}/</span>
              {link.label}
            </a>
          ))}
          <a
            href="/images/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] font-bold uppercase bg-primary text-on-primary px-4 py-3 text-center mt-3"
          >
            {t.nav.resume} ↗
          </a>
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;
```

- [ ] **Step 2: Verify in browser**

Nav should show `001/Works  002/Skills  003/About  004/Contact` in a bordered center box. Resume button is cream. Scrolling down adds a blur background. Mobile hamburger works.

- [ ] **Step 3: Commit**

```bash
git add portfolio_frontend/frontend/src/assets/components/Navbar.jsx
git commit -m "feat: redesign navbar with numbered links, bordered panels, fix resume path"
```

---

## Task 5 — FloatingWordsCanvas Component

**Files:**
- Create: `src/assets/components/FloatingWordsCanvas.jsx`

- [ ] **Step 1: Create the file**

```jsx
import React, { useEffect, useRef } from 'react';

const WORDS = [
  'python', 'react', 'fastapi', 'nlp', 'docker', 'redis', 'celery',
  'postgresql', 'angular', 'problem-solver', 'full-stack', 'clean-code',
  'pgvector', 'flask', 'javascript', 'bert', 'git',
];

const FloatingWordsCanvas = () => {
  const canvasRef = useRef(null);
  const stateRef = useRef({ anim: null, particles: [], mouse: { x: -9999, y: -9999 } });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    state.particles = WORDS.map(word => ({
      word,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: 11 + Math.random() * 3,
      opacity: 0.1 + Math.random() * 0.1,
    }));

    const draw = () => {
      const { width: W, height: H } = canvas;
      const { mouse, particles } = state;
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(220,216,192,${0.04 * (1 - d / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120 && d > 0) {
          const f = ((120 - d) / 120) * 0.3;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -60)  p.x = W + 60;
        if (p.x > W+60) p.x = -60;
        if (p.y < -20)  p.y = H + 20;
        if (p.y > H+20) p.y = -20;

        const hd = Math.sqrt((p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2);
        const glow = hd < 80 ? (1 - hd / 80) * 0.35 : 0;

        ctx.font = `italic ${p.size}px Georgia, serif`;
        ctx.fillStyle = `rgba(220,216,192,${p.opacity + glow})`;
        ctx.fillText(p.word, p.x, p.y);
      });

      state.anim = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(state.anim);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const onMouseMove = e => {
    const r = canvasRef.current.getBoundingClientRect();
    stateRef.current.mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const onMouseLeave = () => { stateRef.current.mouse = { x: -9999, y: -9999 }; };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    />
  );
};

export default FloatingWordsCanvas;
```

- [ ] **Step 2: Commit**

```bash
git add portfolio_frontend/frontend/src/assets/components/FloatingWordsCanvas.jsx
git commit -m "feat: add FloatingWordsCanvas with mouse-repel and connecting lines"
```

---

## Task 6 — HeroSection Redesign

**Files:**
- Modify: `src/assets/components/HeroSection.jsx`

- [ ] **Step 1: Replace full file content**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import FloatingWordsCanvas from './FloatingWordsCanvas';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <FloatingWordsCanvas />
      <div className="absolute inset-0 grain-texture pointer-events-none z-[1]" />

      <div className="relative z-[2] max-w-7xl mx-auto px-8 w-full py-32">
        <motion.span
          className="font-mono text-[11px] tracking-[.3em] uppercase text-on-surface-variant/45 mb-6 block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t.hero.location}
        </motion.span>

        <div className="overflow-hidden mb-1">
          <motion.h1
            className="font-headline font-black leading-[0.88] tracking-[-4px] uppercase text-on-surface"
            style={{ fontSize: 'clamp(56px, 9vw, 104px)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          >
            {t.hero.titleTop}
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-10">
          <motion.h1
            className="font-headline font-black leading-[0.88] tracking-[-4px] uppercase"
            style={{
              fontSize: 'clamp(56px, 9vw, 104px)',
              WebkitTextStroke: '1.5px rgba(220,216,192,0.5)',
              color: 'transparent',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            {t.hero.titleBottom}
          </motion.h1>
        </div>

        <motion.p
          className="font-body text-lg text-on-surface-variant max-w-md mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          <a
            href="https://github.com/eminaldas"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3.5 bg-primary text-on-primary font-mono text-[11px] font-bold tracking-[.12em] uppercase hover:opacity-80 active:scale-95 transition-all"
          >
            {t.hero.github} ↗
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 border border-outline/30 text-on-surface font-mono text-[11px] tracking-[.12em] uppercase hover:bg-on-surface/[0.04] transition-colors"
          >
            {t.hero.connect}
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-8 z-[2] flex items-center gap-3">
        <div className="w-10 h-[1px] relative overflow-hidden" style={{ background: 'rgba(220,216,192,0.12)' }}>
          <div className="scan-line-inner" />
        </div>
        <span className="font-mono text-[10px] tracking-[.2em] uppercase text-on-surface-variant/30">scroll</span>
      </div>
    </section>
  );
};

export default HeroSection;
```

- [ ] **Step 2: Verify in browser**

Hero section should show: italic serif keywords floating (mouse repels them, lines connect nearby ones), name slides up from below, second line is stroke/outline style, buttons are sharp-cornered.

- [ ] **Step 3: Commit**

```bash
git add portfolio_frontend/frontend/src/assets/components/HeroSection.jsx
git commit -m "feat: redesign hero with floating canvas, stroke name, cream palette"
```

---

## Task 7 — ManifestoSection

**Files:**
- Create: `src/assets/components/ManifestoSection.jsx`

- [ ] **Step 1: Create the file**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const ManifestoSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-surface-container-low border-y border-outline-variant/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <p className="font-mono text-[10px] tracking-[.3em] uppercase text-on-surface-variant/35 mb-10">
          {t.manifesto.label}
        </p>
        {t.manifesto.lines.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.span
              className={[
                'block leading-[1.0] mb-1',
                line.serif
                  ? 'font-serif normal-case font-normal italic text-on-surface/45'
                  : 'font-headline font-black uppercase tracking-[-2px] text-on-surface',
                line.muted ? 'opacity-20' : '',
              ].join(' ')}
              style={{
                fontSize: line.serif
                  ? 'clamp(22px, 3.5vw, 52px)'
                  : 'clamp(28px, 5vw, 68px)',
              }}
              initial={{ y: '110%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.85,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line.text}
            </motion.span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManifestoSection;
```

- [ ] **Step 2: Commit**

```bash
git add portfolio_frontend/frontend/src/assets/components/ManifestoSection.jsx
git commit -m "feat: add ManifestoSection with scroll-reveal staggered lines"
```

---

## Task 8 — SkillsSection

**Files:**
- Create: `src/assets/components/SkillsSection.jsx`

- [ ] **Step 1: Create the file**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const SKILLS = [
  {
    category: { en: 'Languages',     tr: 'Diller'          },
    items: ['Python', 'JavaScript', 'SQL', 'TypeScript'],
    level: 'Core',
  },
  {
    category: { en: 'Frameworks',    tr: 'Frameworks'      },
    items: ['React.js', 'FastAPI', 'Angular', 'Flask'],
    level: 'Core',
  },
  {
    category: { en: 'Database',      tr: 'Veritabanı'      },
    items: ['PostgreSQL', 'MongoDB', 'pgvector', 'Redis'],
    level: 'Proficient',
  },
  {
    category: { en: 'DevOps & Tools', tr: 'DevOps & Araçlar' },
    items: ['Docker', 'Celery', 'Git/GitHub'],
    level: 'Proficient',
  },
  {
    category: { en: 'Domain',        tr: 'Uzmanlık'        },
    items: ['NLP / BERT', 'REST API', 'IT Audit', 'Semantic Search'],
    level: 'Domain',
  },
];

const SkillsSection = () => {
  const { language, t } = useLanguage();

  return (
    <section id="skills" className="py-24 border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-end justify-between mb-12">
          <h2
            className="font-headline font-black uppercase tracking-[-2px]"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            {t.skills.title}
          </h2>
          <span className="font-mono text-[10px] tracking-[.2em] uppercase text-on-surface-variant/40 hidden sm:block">
            {t.skills.label}
          </span>
        </div>

        <div className="flex flex-col gap-[2px]">
          {SKILLS.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 border border-outline-variant/10 px-7 py-5 overflow-hidden transition-colors duration-300 hover:border-outline/25"
            >
              <div className="absolute inset-0 w-0 group-hover:w-full bg-on-surface/[0.025] transition-all duration-500 ease-out pointer-events-none" />
              <span className="font-mono text-[10px] tracking-[.2em] uppercase text-on-surface-variant/35 sm:w-40 flex-shrink-0 relative z-10">
                {row.category[language] ?? row.category.en}
              </span>
              <div className="flex flex-wrap gap-2 flex-1 relative z-10">
                {row.items.map(item => (
                  <span
                    key={item}
                    className="font-mono text-[11px] tracking-[.1em] uppercase border border-outline-variant/20 px-3 py-1.5 text-on-surface-variant transition-all duration-200 hover:border-outline/50 hover:text-on-surface cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <span className="font-mono text-[10px] text-on-surface-variant/20 sm:ml-auto sm:pl-5 flex-shrink-0 relative z-10">
                {row.level}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
```

- [ ] **Step 2: Commit**

```bash
git add portfolio_frontend/frontend/src/assets/components/SkillsSection.jsx
git commit -m "feat: add SkillsSection with hover-sweep rows and interactive tags"
```

---

## Task 9 — FeaturedWork Redesign

**Files:**
- Modify: `src/assets/components/FeaturedWork.jsx`

- [ ] **Step 1: Replace full file content**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const PROJECTS = [
  {
    num: '001',
    titleKey: 'p1Title',
    descKey: 'p1Desc',
    tags: ['Python', 'FastAPI', 'BERTurk', 'Docker', 'Celery', 'Redis', 'pgvector'],
    year: '2026',
    live: 'nehaber.dev',
    liveHref: 'https://nehaber.dev',
    github: 'https://github.com/eminaldas/Fake-News-Detection-System',
    badge: false,
  },
  {
    num: '002',
    titleKey: 'p2Title',
    descKey: 'p2Desc',
    tags: ['Angular', 'TypeScript', 'REST API'],
    year: '2025',
    live: null,
    liveHref: null,
    github: 'https://github.com/ErdemKoray/Beavask',
    badge: true,
  },
];

const FeaturedWork = () => {
  const { t } = useLanguage();

  return (
    <section id="works" className="py-24 bg-surface-container-low border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-[.3em] uppercase text-on-surface-variant/35 mb-3 block">
              {t.works.label}
            </span>
            <h2
              className="font-headline font-black uppercase tracking-[-2px]"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            >
              {t.works.title}
            </h2>
          </div>
          <p className="sm:max-w-[180px] text-on-surface-variant text-sm sm:text-right leading-relaxed">
            {t.works.desc}
          </p>
        </div>

        <div className="flex flex-col gap-[2px]">
          {PROJECTS.map((proj, i) => (
            <motion.a
              key={proj.num}
              href={proj.github}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex items-stretch border border-outline-variant/10 hover:border-outline/25 transition-colors duration-300 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 w-[3px] h-0 group-hover:h-full bg-primary transition-all duration-500 ease-out" />

              <div className="font-mono text-[11px] text-on-surface-variant/25 px-5 py-7 border-r border-outline-variant/10 flex items-start min-w-[60px]">
                {proj.num}
              </div>

              <div className="flex-1 px-8 py-7">
                <div className="flex flex-wrap items-start justify-between mb-3 gap-3">
                  <h3 className="font-headline font-black text-xl uppercase tracking-tight group-hover:text-on-surface transition-colors">
                    {t.works[proj.titleKey]}
                  </h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {proj.live && (
                      <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[.15em] uppercase text-on-surface">
                        <span className="w-1.5 h-1.5 rounded-full bg-on-surface animate-pulse" />
                        {proj.live}
                      </span>
                    )}
                    {proj.badge && (
                      <span className="font-mono text-[9px] tracking-[.15em] uppercase border border-outline/30 px-2 py-0.5 text-on-surface-variant/60">
                        {t.works.award}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tags.map(tag => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] tracking-[.12em] uppercase border border-outline-variant/15 px-2 py-1 text-on-surface-variant/45"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{t.works[proj.descKey]}</p>
              </div>

              <div className="px-5 py-7 border-l border-outline-variant/10 flex flex-col items-end justify-between min-w-[70px]">
                <span className="font-mono text-[11px] text-on-surface-variant/25">{proj.year}</span>
                <span className="text-on-surface-variant/25 group-hover:text-on-surface group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-lg">
                  ↗
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
```

- [ ] **Step 2: Commit**

```bash
git add portfolio_frontend/frontend/src/assets/components/FeaturedWork.jsx
git commit -m "feat: redesign FeaturedWork to list layout with live badge, award badge, updated tech tags"
```

---

## Task 10 — LandingPage Section Order

**Files:**
- Modify: `src/pages/LandingPage.jsx`

- [ ] **Step 1: Replace full file content**

```jsx
import React from 'react';
import HeroSection from '../assets/components/HeroSection';
import ManifestoSection from '../assets/components/ManifestoSection';
import SkillsSection from '../assets/components/SkillsSection';
import BentoStats from '../assets/components/BentoStats';
import AboutSection from '../assets/components/AboutSection';
import CareerSection from '../assets/components/CareerSection';
import FeaturedWork from '../assets/components/FeaturedWork';
import ContactSection from '../assets/components/ContactSection';

const LandingPage = () => (
  <>
    <HeroSection />
    <ManifestoSection />
    <SkillsSection />
    <BentoStats />
    <AboutSection />
    <CareerSection />
    <FeaturedWork />
    <ContactSection />
  </>
);

export default LandingPage;
```

- [ ] **Step 2: Verify full page flow in browser**

Scroll through the page: Hero → Manifesto → Skills → Bento → About → Career → Works. All sections should appear in order with no console errors.

- [ ] **Step 3: Commit**

```bash
git add portfolio_frontend/frontend/src/pages/LandingPage.jsx
git commit -m "feat: add ManifestoSection and SkillsSection to landing page"
```

---

## Task 11 — Existing Section Cleanup (BentoStats, AboutSection, CareerSection)

**Files:**
- Modify: `src/assets/components/BentoStats.jsx`
- Modify: `src/assets/components/AboutSection.jsx`
- Modify: `src/assets/components/CareerSection.jsx`

- [ ] **Step 1: BentoStats — remove rounded corners, update accent card**

In `BentoStats.jsx`, make these targeted replacements:

| Find | Replace |
|---|---|
| `rounded-3xl` | `rounded-none` |
| `rounded-2xl` | `rounded-none` |
| `rounded-full` (pill tags) | `rounded-none` |
| `bg-primary rounded-3xl` on the AI/NLP accent card | `bg-primary` |
| `group hover:rotate-1 transition-transform` | *(remove `hover:rotate-1`)* |
| `hover:border-primary/20` | `hover:border-outline/25` |

Full updated BentoStats.jsx:

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const BentoStats = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="tech" className="py-32 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-[2px] h-auto md:h-[450px]"
        >
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 md:row-span-2 bg-surface-container p-10 flex flex-col justify-between border border-outline-variant/10 group hover:border-outline/25 transition-colors"
          >
            <div>
              <span className="font-mono text-[10px] tracking-[.25em] uppercase text-on-surface-variant/40">{t.bento.eduLabel}</span>
              <h3 className="font-headline font-bold text-5xl mt-4">{t.bento.eduTitle}</h3>
              <p className="font-body text-on-surface-variant mt-4 text-lg max-w-xs">{t.bento.eduDesc}</p>
            </div>
            <div className="flex gap-2 mt-8">
              <span className="px-4 py-1.5 bg-surface-container-high font-mono text-[10px] tracking-[.1em] uppercase">2022 – 2026</span>
              <span className="px-4 py-1.5 bg-surface-container-high text-on-surface font-mono text-[10px] tracking-[.1em] uppercase">BEYKOZ ÜNİVERSİTESİ</span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-surface-container-high p-8 flex flex-col justify-center border border-outline-variant/10"
          >
            <span className="font-mono text-[10px] tracking-[.25em] uppercase text-on-surface-variant/40">{t.bento.workLabel}</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-headline font-bold text-4xl">Aras Kargo</span>
            </div>
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-on-surface-variant mt-2">{t.bento.workRole}</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-primary p-8 flex flex-col justify-between"
          >
            <span className="font-mono text-[10px] tracking-[.25em] uppercase text-on-primary/60 font-bold">{t.bento.interestLabel}</span>
            <h4 className="font-headline font-bold text-2xl text-on-primary">AI &amp; NLP</h4>
            <div className="flex justify-end">
              <span className="material-symbols-outlined text-on-primary text-4xl">memory</span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="md:col-span-2 bg-surface-container p-8 flex items-center justify-between border border-outline-variant/10"
          >
            <div className="flex flex-col">
              <span className="font-mono text-[10px] tracking-[.25em] uppercase text-on-surface-variant/40">{t.bento.techLabel}</span>
              <h3 className="font-headline font-bold text-3xl md:text-4xl mt-2">{t.bento.techTitle}</h3>
            </div>
            <div className="flex -space-x-3">
              {['data_object', 'javascript', 'dns'].map((icon, i) => (
                <div key={i} className="w-11 h-11 border-2 border-surface-container bg-surface-container-high flex items-center justify-center" style={{ zIndex: 40 - i * 10 }}>
                  <span className="material-symbols-outlined text-sm text-on-surface-variant">{icon}</span>
                </div>
              ))}
              <div className="w-11 h-11 border-2 border-surface-container bg-surface-container flex items-center justify-center z-10 text-on-surface font-mono font-bold text-xs">
                +8
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoStats;
```

- [ ] **Step 2: AboutSection — remove `dark:` prefix, sharp corners, remove gradient tag**

Replace the full file:

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-40 relative">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative order-2 lg:order-1"
        >
          <div className="bg-surface-container-highest p-8 font-mono text-sm leading-relaxed text-on-surface shadow-2xl overflow-hidden border border-outline-variant/20">
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 bg-error-dim" />
              <div className="w-3 h-3 bg-secondary" />
              <div className="w-3 h-3 bg-primary" />
            </div>
            <p className="mb-2"><span className="text-on-surface-variant">const</span> <span className="text-on-surface">developer</span> = {'{'}</p>
            <p className="ml-4">name: <span className="text-secondary">'Muhammed Emin Aldaş'</span>,</p>
            <p className="ml-4">mission: <span className="text-secondary">'{t.about.mission}'</span>,</p>
            <p className="ml-4">stack: [<span className="text-secondary">'Python/FastAPI'</span>, <span className="text-secondary">'React.js'</span>, <span className="text-secondary">'PostgreSQL'</span>],</p>
            <p className="ml-4">vibe: <span className="text-secondary">'{t.about.vibe}'</span></p>
            <p>{'};'}</p>
            <div className="mt-8 pt-8 border-t border-outline-variant/20">
              <p className="text-on-surface-variant italic">// {t.about.learning}</p>
            </div>
          </div>
          <div className="absolute -top-10 -right-6 bg-primary text-on-primary px-6 py-4 font-headline font-black text-xl shadow-xl rotate-3">
            {t.about.developerRole}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 lg:order-2"
        >
          <h2 className="font-headline font-bold text-5xl mb-8 tracking-tight">
            {t.about.title1}<span className="italic text-on-surface-variant">{t.about.title2}</span>
          </h2>
          <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
            <p>{t.about.desc1}</p>
            <p>{t.about.desc2}</p>
          </div>
          <div className="mt-12">
            <span className="font-mono text-[10px] uppercase tracking-[.25em] text-on-surface-variant/40 mb-6 block">{t.about.technicalArsenal}</span>
            <div className="flex flex-wrap gap-2">
              {['Python', 'FastAPI', 'Flask', 'React', 'Angular', 'PostgreSQL', 'MongoDB', 'Docker', 'Git', 'C/C++'].map(skill => (
                <div
                  key={skill}
                  className="px-4 py-2 border border-outline-variant/20 bg-surface-container-low/50 text-on-surface font-mono text-sm hover:border-outline/40 hover:text-on-surface transition-colors cursor-default"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
```

- [ ] **Step 3: CareerSection — replace timeline dots colors for cream palette**

Replace the two `border-primary` / `border-secondary` / `bg-primary` / `bg-secondary` dot divs with unified cream styling:

```jsx
<div className="absolute -left-3 top-2 w-6 h-6 border-2 border-on-surface bg-surface-container-high flex items-center justify-center">
  <div className="w-2 h-2 bg-on-surface" />
</div>
```

Apply this to **both** timeline items. Also change `text-primary` and `text-secondary` on the company name lines to `text-on-surface-variant`.

Full replacement for `CareerSection.jsx`:

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const CareerSection = () => {
  const { t } = useLanguage();

  return (
    <section id="career" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-[10px] tracking-[.3em] uppercase text-on-surface-variant/40 mb-4 block">{t.career.label}</span>
          <h2 className="font-headline font-black text-5xl md:text-6xl tracking-[-2px]">{t.career.title1}</h2>
        </motion.div>

        <div className="relative border-l border-outline-variant/30 ml-4 md:ml-8 space-y-16 py-8">
          {[
            { role: t.career.role1, desc: t.career.desc1, date: '17/03/2025 – 17/09/2025', delay: 0 },
            { role: t.career.role2, desc: t.career.desc2, date: '12/02/2024 – 01/08/2024', delay: 0.15 },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: item.delay }}
              className="relative pl-8 md:pl-16"
            >
              <div className="absolute -left-3 top-2 w-6 h-6 border-2 border-on-surface bg-surface-container-high flex items-center justify-center">
                <div className="w-2 h-2 bg-on-surface" />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[.15em] text-on-surface-variant/50">{item.date}</span>
              <h3 className="font-headline font-bold text-3xl mt-2 text-on-surface">{item.role}</h3>
              <h4 className="font-body text-xl text-on-surface-variant mt-1">Aras Kargo</h4>
              <p className="font-body text-on-surface-variant mt-4 max-w-2xl leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
```

- [ ] **Step 4: Run lint and verify full page**

```bash
npm run lint
```

Scroll through every section in the browser. No purple/blue anywhere. All corners sharp.

- [ ] **Step 5: Commit**

```bash
git add portfolio_frontend/frontend/src/assets/components/BentoStats.jsx portfolio_frontend/frontend/src/assets/components/AboutSection.jsx portfolio_frontend/frontend/src/assets/components/CareerSection.jsx
git commit -m "feat: update BentoStats, AboutSection, CareerSection to warm cream palette"
```

---

## Task 12 — Final Lint + Smoke Check

- [ ] **Step 1: Run lint**

```bash
cd portfolio_frontend/frontend && npm run lint
```

Expected: 0 errors, 0 warnings.

- [ ] **Step 2: Build check**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 3: Visual smoke check in dev server**

Open http://localhost:5173 in incognito. Verify:
- Preloader runs 00→100%, wipes up
- Hero: name slides in, floating words active, mouse repels words, connecting lines visible
- Manifesto: lines reveal on scroll
- Skills: hover sweep and tag highlight work
- Works: left accent line grows on hover, arrow moves on hover
- BentoStats, About, Career: no purple/blue, all cream palette
- Resume button links open a PDF (check Network tab: `/images/resume.pdf` 200)
- Language toggle switches EN/TR on all sections

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete Synapser editorial redesign — warm palette, preloader, manifesto, skills, interactive hero"
```
