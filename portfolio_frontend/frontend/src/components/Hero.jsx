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
            <p className="mt-10 max-w-2xl text-[15px] leading-[1.9] text-muted sm:text-base">
              {h.lead.map((p, i) => (p.b ? <Mark key={i} href={p.href}>{p.t}</Mark> : <span key={i}>{p.t}</span>))}
            </p>
            <div className="mt-9 flex flex-wrap gap-3 font-mono text-sm">
              <a href="#work" data-magnetic className="cursor-target bg-acc px-5 py-4 font-bold text-bg">
                {h.ctaWork} ↓
              </a>
              <a href={`mailto:${LINKS.email}`} data-magnetic className="cursor-target border border-fg/80 px-5 py-4 transition-colors hover:border-acc hover:text-acc">
                {h.ctaMail}
              </a>
              <a href={LINKS.github} target="_blank" rel="noreferrer" data-magnetic className="cursor-target border border-fg/80 px-5 py-4 transition-colors hover:border-acc hover:text-acc">
                github ↗
              </a>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer" data-magnetic className="cursor-target border border-fg/80 px-5 py-4 transition-colors hover:border-acc hover:text-acc">
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

// Highlighted phrase in the lead: a terminal-style chip, optionally a link.
function Mark({ href, children }) {
  const cls = 'border-b border-acc/60 bg-acc/10 px-1.5 py-0.5 text-acc';
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={`cursor-target ${cls} transition-colors hover:bg-acc hover:text-bg`}>
      {children}
    </a>
  ) : (
    <span className={cls}>{children}</span>
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
    return () => tw.kill();
  }, [ready, t.meta.lang]);

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
        <div className="flex items-start justify-between gap-3">
          <div className="font-mono text-6xl font-bold leading-none tracking-[-0.05em]">
            {t.meta.lang === 'tr' && <span className="text-3xl text-muted">%</span>}
            <span ref={numRef}>0</span>
            {t.meta.lang === 'en' && <span className="text-3xl text-muted">%</span>}
          </div>
          <a
            href={LINKS.nehaber}
            target="_blank"
            rel="noreferrer"
            data-magnetic
            className="cursor-target mt-1 shrink-0 border border-acc/50 px-2.5 py-1.5 text-[11px] text-acc transition-colors hover:bg-acc hover:text-bg"
          >
            {s.metricLink}
          </a>
        </div>
        <p className="mt-3 text-[11px] uppercase tracking-widest text-muted">{s.metricLabel}</p>
        <div className="mt-4 flex gap-1">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className={`h-6 flex-1 transition-colors duration-300 ${i < bars ? 'bg-acc' : 'bg-line'}`} />
          ))}
        </div>
      </div>

      <AttentionMap />

      <LiveLog ready={ready} />
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

const LOG_ROWS = 6;
const LEVEL = { ok: ['OK  ', 'text-acc'], info: ['INFO', 'text-info'], warn: ['WARN', 'text-warn'] };
const stamp = () =>
  new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/Istanbul', hour12: false });

// A log that keeps writing itself: lines are typed one by one, and when the panel
// is full a scan line sweeps down and wipes them before the next round.
function LiveLog({ ready }) {
  const { t } = useLanguage();
  const pool = t.hero.status.log;
  const [lines, setLines] = useState([]);
  const [typed, setTyped] = useState(0);
  const [wiping, setWiping] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (prefersReducedMotion()) {
      setLines(pool.slice(0, LOG_ROWS).map(([level, text], i) => ({ id: i, time: stamp(), level, text })));
      setTyped(Infinity);
      return;
    }
    let alive = true;
    const timers = [];
    const wait = (ms) => new Promise((r) => timers.push(setTimeout(r, ms)));
    let round = 0;
    let uid = 0;
    (async () => {
      while (alive) {
        setWiping(false);
        setLines([]);
        for (let k = 0; k < LOG_ROWS && alive; k++) {
          const [level, text] = pool[(round * LOG_ROWS + k) % pool.length];
          setTyped(0);
          setLines((l) => [...l, { id: uid++, time: stamp(), level, text }]);
          for (let c = 1; c <= text.length && alive; c++) {
            await wait(16 + Math.random() * 34);
            setTyped(c);
          }
          await wait(280 + Math.random() * 520);
        }
        await wait(2400);
        if (!alive) return;
        setWiping(true);
        await wait(LOG_ROWS * 110 + 650);
        round += 1;
      }
    })();
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [ready, pool]);

  return (
    <div className="relative px-5 py-5">
      <div lang="en" className="mb-3 flex justify-between text-[11px] uppercase tracking-widest text-muted">
        <span>stdout</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-acc" /> live
        </span>
      </div>
      <ul className="relative space-y-1.5 overflow-hidden text-xs" style={{ height: `${LOG_ROWS * 1.5 + (LOG_ROWS - 1) * 0.375}rem` }}>
        {lines.map((ln, i) => {
          const last = i === lines.length - 1;
          const [label, color] = LEVEL[ln.level] || LEVEL.info;
          return (
            <li
              key={ln.id}
              className="flex h-6 items-center gap-2 truncate whitespace-pre transition-all duration-300 ease-out"
              style={
                wiping
                  ? { opacity: 0, transform: 'translateY(-6px)', filter: 'blur(3px)', transitionDelay: `${i * 110 + 80}ms` }
                  : undefined
              }
            >
              <span className="text-dim">{ln.time}</span>
              <span className={color}>{label}</span>
              <span className="truncate text-fg/85">
                {last ? ln.text.slice(0, typed) : ln.text}
                {last && !wiping && <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 animate-blink bg-acc" />}
              </span>
            </li>
          );
        })}
        {wiping && <span className="log-wipe pointer-events-none absolute inset-x-0 top-0" style={{ '--wipe-ms': `${LOG_ROWS * 110 + 300}ms` }} />}
      </ul>
    </div>
  );
}
