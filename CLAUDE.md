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

### Single-page composition
`main.jsx` → `App.jsx` → `pages/LandingPage.jsx`, which renders six section components from `src/assets/components/` in order: `HeroSection`, `BentoStats`, `AboutSection`, `CareerSection`, `FeaturedWork`, `ContactSection`. `Navbar`, `SocialSidebar`, and `Footer` wrap the page in `App.jsx`.

Note: `src/pages/` also contains `About.jsx`, `Contact.jsx`, `Experiences.jsx`, `Projects.jsx`, `Skills.jsx`, but **only `LandingPage` is wired in** — there is no router. Treat the others as unused/legacy unless you intentionally add routing.

### Two global contexts (both wrap the app in `App.jsx`)
- **`context/LanguageContext.jsx`** — bilingual EN/TR. *All* user-facing copy lives in the single `translations` object here, keyed by section (`nav`, `hero`, `about`, `career`, `works`, `contact`, …). Components read text via `const { t } = useLanguage()` then `t.section.key`. Default language is `'tr'`. When adding or changing visible text, edit both `en` and `tr` branches here rather than hardcoding strings in components.
- **`context/ThemeContext.jsx`** — dark/light. Defaults to dark; reads/writes `localStorage('theme')` and falls back to `prefers-color-scheme`. Toggling adds/removes the `.dark` class on `document.documentElement`. Use `useTheme()` for `{ isDark, toggleTheme }`.

### Theming via Material Design 3 tokens (Tailwind v4)
`src/index.css` defines a full Material 3 color token set as CSS variables in `:root` (light) and `.dark` (dark) — e.g. `--primary`, `--on-surface`, `--surface-container`, `--background`. A Tailwind v4 `@theme` block then maps each to a `--color-*` token, which makes them available as utility classes: `bg-background`, `text-on-surface`, `border-outline-variant`, etc. Dark mode is driven by `@custom-variant dark (&:where(.dark, .dark *))`, matching the `.dark` class toggled by ThemeContext.

Practical implication: **change colors by editing the CSS variables in `index.css`, not by hardcoding hex values in components.** Use the semantic token utility classes (`bg-surface`, `text-on-background`, …) so light/dark both work automatically.

### Styling stack
Tailwind v4 via the `@tailwindcss/vite` plugin (no `tailwind.config.js` — config lives in `index.css`). Animation libraries in use: `framer-motion`, `gsap`, `@react-spring/parallax`. Icons via FontAwesome (`@fortawesome/*`). Reusable animated text primitives live under `src/assets/components/ReactBits/`.
