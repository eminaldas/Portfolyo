import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { LINKS } from '../i18n/content';
import InteractiveCard from './ui/InteractiveCard';
import SectionHeading from './ui/SectionHeading';
import { prefersReducedMotion, useInView } from './ui/hooks';
import CaseStudy from './CaseStudy';

const STACKS = {
  nehaber: ['python', 'fastapi', 'sentence-bert', 'pgvector', 'celery', 'redis', 'gemini', 'docker'],
  sre: ['python', 'qdrant', 'neo4j', 'gemini', 'llm-as-judge'],
  tracky: ['python', 'flask', 'mongodb', 'rest'],
  beavask: ['angular', 'typescript', 'rest'],
};

const clickable = (fn) => ({
  onClick: fn,
  role: 'button',
  tabIndex: 0,
  onKeyDown: (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fn();
    }
  },
});

export default function Work() {
  const { t } = useLanguage();
  const w = t.work;
  const [open, setOpen] = useState(null);

  return (
    <section id="work" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-10 md:py-32">
      <SectionHeading kicker={w.kicker} title={w.title} aside={w.note} />

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr] lg:grid-rows-3">
        <NeHaberCard p={w.projects.nehaber} open={() => setOpen('nehaber')} label={w.open} />
        <SmallCard id="sre" idx="02" p={w.projects.sre} open={() => setOpen('sre')} label={w.open} warn visual={<GraphViz />} />
        <SmallCard id="tracky" idx="03" p={w.projects.tracky} open={() => setOpen('tracky')} label={w.open} visual={<FlowViz />} />
        <SmallCard
          id="beavask"
          idx="04"
          p={w.projects.beavask}
          open={() => setOpen('beavask')}
          label={w.open}
          visual={<img src="/images/beavask.png" alt="" loading="lazy" className="h-full w-full object-cover object-top opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />}
        />
      </div>

      {open && <CaseStudy id={open} project={w.projects[open]} stack={STACKS[open]} labels={w.labels} closeLabel={w.close} onClose={() => setOpen(null)} />}
    </section>
  );
}

function NeHaberCard({ p, open, label }) {
  const [ref, inView] = useInView(0.3);
  return (
    <InteractiveCard
      as="article"
      tilt={2}
      className="cursor-target relative flex flex-col overflow-hidden rounded-sm border border-line bg-panel/90 p-5 backdrop-blur-sm sm:p-7 lg:row-span-3"
      {...clickable(open)}
    >
      <div className="flex justify-between font-mono text-xs text-muted">
        <span>[01] {p.tag}</span>
        <span className="text-acc">
          <span className="mr-2 inline-block h-2 w-2 animate-pulse-dot rounded-full bg-acc align-middle" />
          {p.status}
        </span>
      </div>
      <h3 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-6xl">{p.name}</h3>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted">{p.summary}</p>

      <div className="relative mt-6 aspect-[16/8] overflow-hidden border border-line">
        <img src="/images/nehaber.png" alt="nehaber.dev" loading="lazy" className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-acc/15 to-transparent" />
        <div className="absolute bottom-3 right-3 bg-acc px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-bg">ICAIRA 2026</div>
      </div>

      <div ref={ref} className="mt-5 border border-line bg-bg p-4 font-mono text-[13px] leading-7">
        <TermLines lines={p.term} start={inView} />
      </div>

      <div className="mt-5 grid grid-cols-3 border border-line">
        {p.metrics.map(([v, k]) => (
          <div key={k} className="border-r border-line p-4 last:border-r-0">
            <div className="font-display text-xl font-bold sm:text-3xl">{v}</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">{k}</div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 font-mono text-[13px]">
        <span className="text-acc">{label} →</span>
        {p.links.map(([txt, key]) => (
          <a key={key} href={LINKS[key]} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="cursor-target text-fg hover:text-acc">
            {txt}
          </a>
        ))}
      </div>
    </InteractiveCard>
  );
}

function TermLines({ lines, start }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setShown(lines.length);
      return;
    }
    setShown(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= lines.length) clearInterval(id);
    }, 550);
    return () => clearInterval(id);
  }, [start, lines]);
  return (
    <>
      {lines.slice(0, shown).map((l, i) => (
        <div key={l} className={i === 0 ? 'text-fg' : i === lines.length - 1 ? 'text-warn' : 'text-muted'}>
          {i === 0 && <span className="text-acc">$ </span>}
          {l}
        </div>
      ))}
      {shown < lines.length && <span className="inline-block h-4 w-2 animate-blink bg-acc align-middle" />}
    </>
  );
}

function SmallCard({ idx, p, open, label, visual, warn }) {
  return (
    <InteractiveCard
      as="article"
      tilt={5}
      className="cursor-target relative flex min-h-[260px] flex-col overflow-hidden rounded-sm border border-line bg-panel/90 backdrop-blur-sm"
      {...clickable(open)}
    >
      <div className="relative h-28 overflow-hidden border-b border-line bg-bg">{visual}</div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex justify-between font-mono text-xs text-muted">
          <span>[{idx}] {p.tag}</span>
          <span className={warn ? 'text-warn' : ''}>{p.status}</span>
        </div>
        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">{p.name}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.summary}</p>
        <span className="mt-auto pt-4 font-mono text-[13px] text-acc transition-transform group-hover:translate-x-1">{label} →</span>
      </div>
    </InteractiveCard>
  );
}

// Vector points on the left, graph on the right, links pulsing between them.
function GraphViz() {
  const pts = [[30, 30], [60, 70], [45, 95], [90, 40], [110, 85]];
  const graph = [[210, 30], [260, 60], [230, 95], [300, 35], [320, 90], [360, 60]];
  const edges = [[0, 1], [1, 2], [0, 3], [3, 5], [1, 4], [4, 5], [2, 4]];
  return (
    <svg viewBox="0 0 400 120" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      {pts.map(([x, y], i) =>
        graph.slice(0, 3).map(([gx, gy], j) => (
          <line key={`${i}${j}`} x1={x} y1={y} x2={gx} y2={gy} stroke="var(--color-line-2)" strokeWidth="0.6" />
        )),
      )}
      {edges.map(([a, b], i) => (
        <line key={i} x1={graph[a][0]} y1={graph[a][1]} x2={graph[b][0]} y2={graph[b][1]} stroke="var(--color-acc)" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="4 6" className="flow-dash" />
      ))}
      {pts.map(([x, y], i) => (
        <rect key={i} x={x - 3} y={y - 3} width="6" height="6" fill="var(--color-info)" opacity="0.8" />
      ))}
      {graph.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="var(--color-bg)" stroke="var(--color-acc)" strokeWidth="1.5" className="node-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
      <text x="20" y="114" fill="var(--color-muted)" fontSize="9" fontFamily="var(--font-mono)">qdrant · vectors</text>
      <text x="290" y="114" fill="var(--color-muted)" fontSize="9" fontFamily="var(--font-mono)">neo4j · graph</text>
    </svg>
  );
}

// Client → Flask API → MongoDB with moving dashes.
function FlowViz() {
  const boxes = [['client', 20], ['flask api', 150], ['mongodb', 280]];
  return (
    <svg viewBox="0 0 400 120" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      {boxes.map(([label, x]) => (
        <g key={label}>
          <rect x={x} y="42" width="100" height="36" fill="var(--color-panel)" stroke="var(--color-line-2)" />
          <text x={x + 50} y="64" textAnchor="middle" fill="var(--color-fg)" fontSize="11" fontFamily="var(--font-mono)">{label}</text>
        </g>
      ))}
      {[120, 250].map((x) => (
        <g key={x}>
          <line x1={x} y1="55" x2={x + 30} y2="55" stroke="var(--color-acc)" strokeWidth="1.5" strokeDasharray="4 4" className="flow-dash" />
          <line x1={x + 30} y1="66" x2={x} y2="66" stroke="var(--color-muted)" strokeWidth="1" strokeDasharray="4 4" className="flow-dash" />
        </g>
      ))}
      <text x="200" y="104" textAnchor="middle" fill="var(--color-muted)" fontSize="9" fontFamily="var(--font-mono)">REST · JSON · validation</text>
    </svg>
  );
}
