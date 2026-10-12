# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This is a two-part monorepo for a personal portfolio site:

- `portfolio_frontend/frontend/` — the React 19 + Vite single-page app. **This is where nearly all work happens.** All commands below run from this directory.
- `portfolio_backend/` — a Flask backend that is currently **scaffolding only** (`requirements.txt` lists `flask` and `flask-cors`; there is no application code or entry point yet). The frontend does not call it — there are no fetch/API calls in the codebase. If asked to build backend features, you are starting from scratch.

## Commands

Run from `portfolio_frontend/frontend/`:

```bash
npm run dev      # Vite dev server with HMR
npm run build    # production build to dist/
npm run preview  # serve the production build
npm run lint     # ESLint (flat config, eslint.config.js)
```

There is no test setup. `no-unused-vars` is an error, but identifiers matching `^[A-Z_]` are ignored (so unused imported components/constants don't fail lint).

## Architecture

The site was rebuilt from scratch in a dark-only "terminal / neon" direction. There is no router and no theme toggle.

### Composition
`main.jsx` wraps `App.jsx` in `LanguageProvider`. `App.jsx` renders, in order: `Preloader` (000→100 counter; calls `onDone`, which sets `ready`), `NeuralBackground` (fixed canvas network behind everything), `TargetCursor` (aims at any element with class `cursor-target`), `Navbar`, then the sections `Hero` (`ready` starts its animations), `SkillMarquee`, `Work` (opens `CaseStudy` as a slide-in dialog), `Experience`, `Stack`, `Now`, `Contact`, and finally `Footer`. All of these live in `src/components/`.

Shared primitives are in `src/components/ui/`:
- `ScrambleText`: decodes text from glyphs.
- `InteractiveCard`: spotlight, tilt, beam border and corner brackets.
- `SectionHeading`
- `BrandIcon`: renders `simple-icons` entries.
- `hooks.js`: `prefersReducedMotion`, `isFinePointer`, `useInView`, `useClock`.
- `boot.js`: progress shared by `Preloader` and `NeuralBackground`; the network grows from the centre as the counter fills (the canvas sits between the preloader panels and its text while booting).
- `Socials.jsx`: GitHub, LinkedIn and Instagram icon links (navbar, contact, footer).
- `magnet.js`: `useMagnets()` (called once in `App`) makes every `data-magnetic` element lean toward the cursor and exposes the pull point that `NeuralBackground` draws links to.

### Content (TR/EN)
All user-facing copy lives in `src/i18n/content.js`, in `tr` and `en` objects with the same shape. External URLs are in the `LINKS` export. Components read text via `const { t, lang, toggle } = useLanguage()` (`src/i18n/LanguageContext.jsx`). The default is English; only an explicit TR/EN click is remembered, in `localStorage('site-lang')`. When adding or changing visible text, edit both branches.

Skill and stack icons, with brand colors, are in `src/data/stack.js`.

Turkish casing: CSS `uppercase` under `lang="tr"` turns `i` into `İ`. For English labels that are uppercased, put `lang="en"` on the element or write the text in caps.

### Styling
Tailwind v4 via `@tailwindcss/vite`. There is no `tailwind.config.js`; tokens are in the `@theme` block of `src/index.css`:
- Colors (used as `bg-bg`, `text-fg`, `text-muted`, `border-line`, `text-acc` and so on): `bg`, `bg-2`, `panel`, `line`, `line-2`, `fg`, `muted`, `dim`, `acc` (neon lime), `warn`, `info`.
- Fonts, via Fontsource: `font-display` (Unbounded) is only for the three giant headlines (hero, section headings, contact). Everything else, cards included, is Geist Mono; `font-sans` and `font-mono` both point to it.

Change colors there, not as hex values in components.

`index.css` also holds the effect classes (`.beam-border`, `.spotlight`, `.grain`, `.skill-logo`, marquee keyframes) and a `prefers-reduced-motion` block. Every animation should respect reduced motion.

Animation is done with GSAP (+ ScrollTrigger), CSS and canvas. There is no framer-motion.

### Assets
`public/cv.pdf`, `public/images/` (project screenshots, the ICAIRA certificate, and `nehaber_dev_v3.pdf`, the ICAIRA paper that the 87.27% accuracy figure comes from).
