import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../i18n/LanguageContext';
import { LINKS } from '../i18n/content';
import ScrambleText from './ui/ScrambleText';
import { prefersReducedMotion, useClock } from './ui/hooks';

export default function Hero({ ready }) {
  const { t, lang } = useLanguage();
  const h = t.hero;
  const hlRef = useRef(null);
  const restRef = useRef(null);

  useEffect(() => {
    if (!ready) return;
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      gsap.fromTo(hlRef.current, { scaleX: 0 }, { scaleX: 1, duration: reduced ? 0 : 0.7, delay: 0.55, ease: 'expo.out' });
      gsap.fromTo(
        restRef.current.children,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: reduced ? 0 : 0.6, delay: 0.9, stagger: 0.1, ease: 'power3.out' },
      );
    });
    return () => ctx.revert();
  }, [ready, lang]);

  return (
    <section id="hero" className="relative border-b border-line pt-14">
      <div className="mx-auto grid max-w-[1440px] lg:min-h-[calc(100svh-3.5rem)] lg:grid-cols-[1fr_400px]">
        <div className="flex flex-col justify-center border-line px-5 py-16 sm:px-10 lg:border-r">
          <TypedPrompt text={h.prompt} start={ready} />

          <h1 className="mt-8 font-display text-[clamp(2.3rem,7.2vw,6.6rem)] font-bold uppercase leading-[1.02] tracking-[-0.03em]">
            <ScrambleText text={h.line1} start={ready} duration={800} className="block" />
            <span className="relative my-1 inline-block px-3 sm:px-4">
              <span ref={hlRef} className="absolute inset-0 origin-left bg-acc" style={{ transform: 'scaleX(0)' }} />
              <ScrambleText text={h.highlight} start={ready} delay={500} duration={700} className="relative text-bg" />
            </span>
            <ScrambleText text={h.line3} start={ready} delay={800} duration={800} className="text-outline block" />
          </h1>

          <div ref={restRef}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {h.lead.map((p, i) => (p.b ? <b key={i} className="font-medium text-fg">{p.t}</b> : <span key={i}>{p.t}</span>))}
            </p>
            <div className="mt-9 flex flex-wrap gap-3 font-mono text-sm">
              <a href="#work" className="cursor-target bg-acc px-5 py-4 font-bold text-bg transition-transform hover:-translate-y-0.5">
                {h.ctaWork} ↓
              </a>
              <a href={`mailto:${LINKS.email}`} className="cursor-target border border-fg/80 px-5 py-4 transition-colors hover:border-acc hover:text-acc">
                {h.ctaMail}
              </a>
              <a href={LINKS.github} target="_blank" rel="noreferrer" className="cursor-target border border-fg/80 px-5 py-4 transition-colors hover:border-acc hover:text-acc">
                github ↗
              </a>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="cursor-target border border-fg/80 px-5 py-4 transition-colors hover:border-acc hover:text-acc">
                linkedin ↗
              </a>
            </div>
          </div>
        </div>

        <StatusPanel ready={ready} />
      </div>
    </section>
  );
}

function TypedPrompt({ text, start }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setN(text.length);
      return;
    }
    setN(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) clearInterval(id);
    }, 70);
    return () => clearInterval(id);
  }, [start, text]);
  return (
    <p className="font-mono text-[15px] text-muted">
      <span className="text-acc">$</span> {text.slice(0, n)}
      <span className="ml-1 inline-block h-[18px] w-2.5 translate-y-[3px] animate-blink bg-acc" />
    </p>
  );
}

function StatusPanel({ ready }) {
  const { t } = useLanguage();
  const s = t.hero.status;
  const clock = useClock();
  const numRef = useRef(null);
  const [bars, setBars] = useState(0);
  const [logs, setLogs] = useState(0);

  useEffect(() => {
    if (!ready) return;
    const reduced = prefersReducedMotion();
    const o = { v: 0 };
    const tw = gsap.to(o, {
      v: 87.27,
      duration: reduced ? 0 : 1.8,
      delay: 0.6,
      ease: 'power3.out',
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = o.v.toFixed(2).replace('.', t.meta.lang === 'tr' ? ',' : '.');
        setBars(Math.round((o.v / 100) * 10));
      },
      onComplete: () => {
        if (numRef.current) numRef.current.textContent = t.meta.lang === 'tr' ? '87,27' : '87.27';
      },
    });
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setLogs(i);
      if (i >= s.log.length) clearInterval(id);
    }, reduced ? 0 : 350);
    return () => {
      tw.kill();
      clearInterval(id);
    };
  }, [ready, s.log.length, t.meta.lang]);

  return (
    <aside className="border-t border-line bg-bg-2/80 font-mono text-[13px] backdrop-blur-sm lg:border-t-0">
      <div lang="en" className="flex justify-between border-b border-line px-5 py-3 text-[11px] uppercase tracking-widest text-muted">
        <span>{s.title}</span>
        <span>× −</span>
      </div>
      <dl className="grid gap-3 border-b border-line px-5 py-5">
        {s.rows.map(([k, v], i) => (
          <div key={k} className="flex justify-between gap-4">
            <dt className="text-muted">{k}</dt>
            <dd className={`font-bold ${i === 0 ? 'text-acc' : 'text-fg'}`}>
              {i === 0 && <span className="mr-2 inline-block h-2 w-2 animate-pulse-dot rounded-full bg-acc align-middle" />}
              {v === '__clock__' ? clock : v}
            </dd>
          </div>
        ))}
      </dl>

      <div className="border-b border-line px-5 py-6">
        <div className="font-display text-6xl font-bold leading-none tracking-tight">
          {t.meta.lang === 'tr' && <span className="text-3xl text-muted">%</span>}
          <span ref={numRef}>0</span>
          {t.meta.lang === 'en' && <span className="text-3xl text-muted">%</span>}
        </div>
        <p className="mt-3 text-[11px] uppercase tracking-widest text-muted">{s.metricLabel}</p>
        <div className="mt-4 flex gap-1">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className={`h-6 flex-1 transition-colors duration-300 ${i < bars ? 'bg-acc' : 'bg-line'}`} />
          ))}
        </div>
      </div>

      <AttentionMap />

      <ul className="space-y-2 px-5 py-5 text-xs">
        {s.log.slice(0, logs).map(([d, txt]) => (
          <li key={d + txt} className="text-muted">
            <span className="text-acc">[{d}]</span> {txt}
          </li>
        ))}
      </ul>
    </aside>
  );
}

// A small flickering grid that reads like an attention heatmap.
function AttentionMap() {
  const COLS = 16;
  const ROWS = 5;
  const [cells, setCells] = useState(() => Array.from({ length: COLS * ROWS }, () => Math.random()));
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => {
      setCells((prev) => prev.map((v) => (Math.random() < 0.18 ? Math.random() : v)));
    }, 220);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="border-b border-line px-5 py-5">
      <div lang="en" className="mb-2 flex justify-between text-[11px] uppercase tracking-widest text-muted">
        <span>attention</span>
        <span>head 3 / 12</span>
      </div>
      <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
        {cells.map((v, i) => (
          <span key={i} className="aspect-square bg-acc transition-opacity duration-200" style={{ opacity: 0.05 + v * v * 0.85 }} />
        ))}
      </div>
    </div>
  );
}
