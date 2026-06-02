import React from 'react';
import { motion } from 'framer-motion';
import MarqueeStrip from './MarqueeStrip';

// Boyutlar kasıtlı karıştırıldı — büyük/küçük/orta rastgele dağılmış
// clamp(min, vw, max) — min değerler artırıldı okunabilirlik için
const ITEMS = [
  { text: 'Python',               f: 'h', sz: 'clamp(58px,9vw,104px)',  op: 0.93, w: 900, mt: '0',    dir: 'L' },
  { text: 'Crafted, Not Built',   f: 's', sz: 'clamp(22px,3.2vw,40px)', op: 0.40, w: 300, mt: '28px', dir: 'T' },
  { text: 'REDIS',                f: 'm', sz: 'clamp(38px,6vw,72px)',   op: 0.58, w: 700, mt: '-20px', dir: 'R' },

  { text: 'No Magic, Just Logic', f: 's', sz: 'clamp(18px,2.8vw,34px)', op: 0.36, w: 300, mt: '16px', dir: 'L' },
  { text: 'react',                f: 's', sz: 'clamp(48px,7.5vw,90px)', op: 0.70, w: 300, mt: '-30px', dir: 'R' },
  { text: 'pgvector',             f: 'm', sz: 'clamp(20px,3vw,38px)',   op: 0.44, w: 700, mt: '18px', dir: 'L' },

  { text: 'FASTAPI',              f: 'm', sz: 'clamp(32px,5vw,64px)',   op: 0.68, w: 700, mt: '-12px', dir: 'L' },
  { text: 'Build. Ship. Repeat.', f: 's', sz: 'clamp(24px,3.8vw,48px)', op: 0.35, w: 300, mt: '20px', dir: 'T' },
  { text: 'SQL',                  f: 'm', sz: 'clamp(26px,4vw,50px)',   op: 0.46, w: 700, mt: '-8px',  dir: 'R' },

  { text: 'Angular',              f: 'h', sz: 'clamp(20px,3.2vw,42px)', op: 0.62, w: 800, mt: '10px', dir: 'R' },
  { text: 'AI-Driven, Human-Coded', f: 's', sz: 'clamp(20px,3vw,36px)', op: 0.34, w: 300, mt: '14px', dir: 'L' },
  { text: 'PostgreSQL',           f: 'm', sz: 'clamp(42px,6.5vw,78px)', op: 0.52, w: 400, mt: '-22px', dir: 'R' },

  { text: 'docker',               f: 's', sz: 'clamp(30px,4.8vw,58px)', op: 0.55, w: 300, mt: '8px',  dir: 'T' },
  { text: 'Prompt to Production', f: 's', sz: 'clamp(16px,2.4vw,28px)', op: 0.33, w: 300, mt: '26px', dir: 'L' },
  { text: 'TypeScript',           f: 'h', sz: 'clamp(36px,5.6vw,68px)', op: 0.50, w: 600, mt: '-16px', dir: 'R' },

  { text: 'MongoDB',              f: 's', sz: 'clamp(22px,3.5vw,44px)', op: 0.48, w: 300, mt: '12px', dir: 'L' },
  { text: 'Live on Production',   f: 's', sz: 'clamp(20px,3.2vw,38px)', op: 0.32, w: 300, mt: '18px', dir: 'R' },
  { text: 'Celery',               f: 'h', sz: 'clamp(28px,4.4vw,54px)', op: 0.44, w: 700, mt: '-10px', dir: 'T' },

  { text: 'NLP / BERT',           f: 's', sz: 'clamp(32px,5vw,60px)',   op: 0.46, w: 300, mt: '6px',  dir: 'L' },
  { text: 'Zero Downtime',        f: 's', sz: 'clamp(18px,2.6vw,30px)', op: 0.30, w: 300, mt: '22px', dir: 'R' },
  { text: 'JavaScript',           f: 'h', sz: 'clamp(22px,3.4vw,42px)', op: 0.46, w: 600, mt: '-14px', dir: 'R' },

  { text: 'Flask',                f: 'm', sz: 'clamp(40px,6.2vw,74px)', op: 0.42, w: 700, mt: '-6px',  dir: 'L' },
  { text: 'Systems That Scale',   f: 's', sz: 'clamp(16px,2.4vw,28px)', op: 0.28, w: 300, mt: '20px', dir: 'T' },
  { text: 'Git / GitHub',         f: 'm', sz: 'clamp(24px,3.8vw,46px)', op: 0.38, w: 400, mt: '-8px',  dir: 'R' },

  { text: 'Semantic Search',      f: 's', sz: 'clamp(20px,3vw,36px)',   op: 0.34, w: 300, mt: '10px', dir: 'L' },
  { text: 'REST API',             f: 'm', sz: 'clamp(18px,2.8vw,34px)', op: 0.36, w: 400, mt: '8px',  dir: 'R' },
  { text: 'IT Audit',             f: 'm', sz: 'clamp(30px,4.6vw,56px)', op: 0.40, w: 700, mt: '-12px', dir: 'B' },
  { text: 'Dockerized Life',      f: 's', sz: 'clamp(16px,2.4vw,28px)', op: 0.28, w: 300, mt: '16px', dir: 'L' },
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
    <div className="w-full px-10 pb-14">
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-0">
        {ITEMS.map((s, i) => (
          <motion.span
            key={i}
            className="cursor-target"
            initial={INIT[s.dir]}
            whileInView={{ x: 0, y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: i * 0.03 }}
            style={{
              fontFamily: FONTS[s.f],
              fontSize: s.sz,
              fontWeight: s.w,
              fontStyle: 'italic',
              letterSpacing: s.f === 'm' ? '0.06em' : s.f === 'h' ? '-0.02em' : '0.01em',
              textTransform: s.f === 'm' ? 'uppercase' : 'none',
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
