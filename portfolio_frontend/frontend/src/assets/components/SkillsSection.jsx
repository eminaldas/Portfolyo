import React from 'react';
import { motion } from 'framer-motion';
import MarqueeStrip from './MarqueeStrip';

// f: 'h'=Space Grotesk, 'm'=IBM Plex Mono, 's'=Cormorant italic
// dir: 'L'=sol, 'R'=sağ, 'T'=yukarı, 'B'=aşağı
// phrase: true → italik söz, araya karışır
const ITEMS = [
  // — Satır 1 —
  { text: 'Python',               f: 'h', sz: 'clamp(56px,9vw,102px)', op: 0.93, w: 900, mt: '0',    dir: 'L' },
  { text: 'Crafted, Not Built',   f: 's', sz: 'clamp(18px,2.8vw,36px)',op: 0.35, w: 300, mt: '32px', dir: 'T', phrase: true },
  { text: 'react',                f: 's', sz: 'clamp(46px,7.5vw,88px)', op: 0.70, w: 300, mt: '-24px',dir: 'R' },

  // — Satır 2 —
  { text: 'No Magic,',            f: 's', sz: 'clamp(14px,2.2vw,26px)', op: 0.32, w: 300, mt: '14px', dir: 'L', phrase: true },
  { text: 'FASTAPI',              f: 'm', sz: 'clamp(32px,5vw,62px)',  op: 0.68, w: 700, mt: '-8px',  dir: 'L' },
  { text: 'Just Logic',           f: 's', sz: 'clamp(14px,2.2vw,26px)', op: 0.32, w: 300, mt: '20px', dir: 'R', phrase: true },
  { text: 'Angular',              f: 'h', sz: 'clamp(34px,5.5vw,68px)', op: 0.62, w: 800, mt: '-18px',dir: 'R' },

  // — Satır 3 —
  { text: 'docker',               f: 's', sz: 'clamp(28px,4.5vw,54px)', op: 0.55, w: 300, mt: '10px', dir: 'T' },
  { text: 'Prompt to Production', f: 's', sz: 'clamp(13px,2vw,24px)',   op: 0.30, w: 300, mt: '28px', dir: 'L', phrase: true },
  { text: 'PostgreSQL',           f: 'm', sz: 'clamp(22px,3.5vw,44px)', op: 0.52, w: 400, mt: '-10px',dir: 'R' },

  // — Satır 4 —
  { text: 'MongoDB',              f: 's', sz: 'clamp(20px,3.2vw,40px)', op: 0.48, w: 300, mt: '8px',  dir: 'L' },
  { text: 'Build. Ship. Repeat.', f: 's', sz: 'clamp(15px,2.4vw,30px)', op: 0.33, w: 300, mt: '22px', dir: 'T', phrase: true },
  { text: 'REDIS',                f: 'm', sz: 'clamp(24px,3.8vw,48px)', op: 0.52, w: 700, mt: '-6px',  dir: 'R' },

  // — Satır 5 —
  { text: 'TypeScript',           f: 'h', sz: 'clamp(18px,3vw,38px)',   op: 0.46, w: 600, mt: '12px', dir: 'L' },
  { text: 'AI-Driven,',           f: 's', sz: 'clamp(13px,2vw,22px)',   op: 0.29, w: 300, mt: '18px', dir: 'R', phrase: true },
  { text: 'JavaScript',           f: 'h', sz: 'clamp(18px,2.8vw,36px)', op: 0.42, w: 600, mt: '-8px',  dir: 'R' },
  { text: 'Human-Coded',          f: 's', sz: 'clamp(13px,2vw,22px)',   op: 0.29, w: 300, mt: '16px', dir: 'L', phrase: true },

  // — Satır 6 —
  { text: 'pgvector',             f: 'm', sz: 'clamp(13px,2.2vw,26px)', op: 0.36, w: 400, mt: '10px', dir: 'T' },
  { text: 'Celery',               f: 's', sz: 'clamp(16px,2.5vw,30px)', op: 0.38, w: 300, mt: '-4px',  dir: 'L' },
  { text: 'Live on Production',   f: 's', sz: 'clamp(12px,1.9vw,22px)', op: 0.27, w: 300, mt: '20px', dir: 'R', phrase: true },
  { text: 'Flask',                f: 'h', sz: 'clamp(15px,2.4vw,28px)', op: 0.36, w: 600, mt: '8px',  dir: 'R' },

  // — Satır 7 —
  { text: 'SQL',                  f: 'm', sz: 'clamp(15px,2.4vw,28px)', op: 0.34, w: 700, mt: '-6px',  dir: 'L' },
  { text: 'Git / GitHub',         f: 'm', sz: 'clamp(13px,2vw,22px)',   op: 0.32, w: 400, mt: '6px',   dir: 'R' },
  { text: 'Systems That Scale',   f: 's', sz: 'clamp(12px,1.8vw,20px)', op: 0.26, w: 300, mt: '18px', dir: 'T', phrase: true },
  { text: 'NLP / BERT',           f: 's', sz: 'clamp(13px,2vw,22px)',   op: 0.30, w: 300, mt: '10px', dir: 'L' },

  // — Satır 8 —
  { text: 'REST API',             f: 'm', sz: 'clamp(12px,1.8vw,20px)', op: 0.28, w: 400, mt: '8px',  dir: 'R' },
  { text: 'Dockerized Life',      f: 's', sz: 'clamp(12px,1.8vw,18px)', op: 0.24, w: 300, mt: '14px', dir: 'L', phrase: true },
  { text: 'Semantic Search',      f: 's', sz: 'clamp(12px,1.8vw,18px)', op: 0.26, w: 300, mt: '6px',  dir: 'R' },
  { text: 'IT Audit',             f: 'm', sz: 'clamp(12px,1.8vw,18px)', op: 0.25, w: 400, mt: '4px',  dir: 'B' },
  { text: 'Zero Downtime',        f: 's', sz: 'clamp(12px,1.8vw,18px)', op: 0.23, w: 300, mt: '12px', dir: 'T', phrase: true },
];

const FONTS = {
  h: "'Space Grotesk', sans-serif",
  m: "'IBM Plex Mono', monospace",
  s: "'Cormorant', Georgia, serif",
};

const INIT = {
  L: { x: -70, opacity: 0 },
  R: { x:  70, opacity: 0 },
  T: { y: -40, opacity: 0 },
  B: { y:  40, opacity: 0 },
};

const SkillsSection = () => (
  <section id="skills" className="pt-20 pb-0 border-b border-outline-variant/10 overflow-hidden">
    <div className="max-w-7xl mx-auto px-8 pb-14">
      <div className="flex flex-wrap items-baseline gap-x-7 gap-y-0">
        {ITEMS.map((s, i) => (
          <motion.span
            key={i}
            className={s.phrase ? undefined : 'cursor-target'}
            initial={INIT[s.dir]}
            whileInView={{ x: 0, y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: i * 0.035 }}
            style={{
              fontFamily: FONTS[s.f],
              fontSize: s.sz,
              fontWeight: s.w,
              fontStyle: 'italic',
              letterSpacing: s.f === 'm' ? '0.08em' : s.f === 'h' ? '-0.02em' : '0.01em',
              textTransform: s.f === 'm' && !s.phrase ? 'uppercase' : 'none',
              color: `rgba(220,216,192,${s.op})`,
              marginTop: s.mt,
              lineHeight: 1.1,
              display: 'inline-block',
            }}
          >
            {s.text}
          </motion.span>
        ))}
      </div>
    </div>
    <MarqueeStrip />
  </section>
);

export default SkillsSection;
