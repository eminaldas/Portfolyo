import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import MarqueeStrip from './MarqueeStrip';

// font: 'h'=headline, 'm'=mono, 's'=serif italic
// dir: animasyon yönü 'L'=sol, 'R'=sağ, 'T'=yukarı, 'B'=aşağı
const SKILLS = [
  // Tier 1 — devasa
  { text: 'Python',     f: 'h', sz: 'clamp(52px,8vw,90px)',  op: 0.92, w: 900, mt: '0px',   dir: 'L' },
  { text: 'react',      f: 's', sz: 'clamp(42px,6.5vw,76px)', op: 0.72, w: 300, mt: '-18px', dir: 'R' },
  // Tier 2 — büyük
  { text: 'FASTAPI',    f: 'm', sz: 'clamp(30px,4.5vw,56px)', op: 0.68, w: 700, mt: '8px',   dir: 'L' },
  { text: 'Angular',    f: 'h', sz: 'clamp(32px,5vw,62px)',  op: 0.62, w: 800, mt: '-14px', dir: 'R' },
  { text: 'docker',     f: 's', sz: 'clamp(26px,4vw,48px)',  op: 0.55, w: 300, mt: '6px',   dir: 'T' },
  // Tier 3 — orta
  { text: 'PostgreSQL', f: 'm', sz: 'clamp(20px,3vw,38px)',  op: 0.52, w: 400, mt: '-8px',  dir: 'R' },
  { text: 'MongoDB',    f: 's', sz: 'clamp(18px,2.8vw,34px)', op: 0.48, w: 300, mt: '10px',  dir: 'L' },
  { text: 'REDIS',      f: 'm', sz: 'clamp(22px,3.2vw,40px)', op: 0.52, w: 700, mt: '-6px',  dir: 'R' },
  { text: 'TypeScript', f: 'h', sz: 'clamp(18px,2.8vw,34px)', op: 0.45, w: 600, mt: '12px',  dir: 'L' },
  { text: 'JavaScript', f: 'h', sz: 'clamp(16px,2.5vw,30px)', op: 0.42, w: 600, mt: '-10px', dir: 'R' },
  // Tier 4 — küçük
  { text: 'pgvector',   f: 'm', sz: 'clamp(13px,2vw,22px)',  op: 0.36, w: 400, mt: '6px',   dir: 'T' },
  { text: 'Celery',     f: 's', sz: 'clamp(14px,2.2vw,24px)', op: 0.38, w: 300, mt: '-4px',  dir: 'L' },
  { text: 'Flask',      f: 'h', sz: 'clamp(14px,2.2vw,24px)', op: 0.36, w: 600, mt: '8px',   dir: 'R' },
  { text: 'SQL',        f: 'm', sz: 'clamp(14px,2.2vw,24px)', op: 0.34, w: 700, mt: '-6px',  dir: 'L' },
  { text: 'Git / GitHub', f: 'm', sz: 'clamp(13px,2vw,20px)', op: 0.32, w: 400, mt: '4px',  dir: 'R' },
  // Tier 5 — çok küçük (domain)
  { text: 'NLP / BERT', f: 's', sz: 'clamp(12px,1.8vw,18px)', op: 0.30, w: 300, mt: '10px', dir: 'L' },
  { text: 'REST API',   f: 'm', sz: 'clamp(11px,1.7vw,17px)', op: 0.28, w: 400, mt: '6px',  dir: 'R' },
  { text: 'Semantic Search', f: 's', sz: 'clamp(11px,1.6vw,16px)', op: 0.26, w: 300, mt: '8px', dir: 'T' },
  { text: 'IT Audit',   f: 'm', sz: 'clamp(11px,1.7vw,17px)', op: 0.25, w: 400, mt: '4px',  dir: 'B' },
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

const SkillsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="pt-24 pb-0 border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-8">

        {/* Başlık */}
        <motion.div
          className="flex items-end justify-between mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-headline font-black uppercase tracking-[-2px]"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            {t.skills.title}
          </h2>
          <span className="font-mono text-[10px] tracking-[.2em] uppercase text-on-surface-variant/40 hidden sm:block">
            {t.skills.label}
          </span>
        </motion.div>

        {/* Word cloud */}
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-0 pb-10 overflow-hidden">
          {SKILLS.map((s, i) => (
            <motion.span
              key={i}
              className="cursor-target"
              initial={INIT[s.dir]}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
              style={{
                fontFamily: FONTS[s.f],
                fontSize: s.sz,
                fontWeight: s.w,
                fontStyle: s.f === 's' ? 'italic' : 'normal',
                letterSpacing: s.f === 'm' ? '0.1em' : s.f === 'h' ? '-0.02em' : '0.02em',
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

      {/* Marquee şeridi — Skills bölümünün alt sınırı */}
      <MarqueeStrip />
    </section>
  );
};

export default SkillsSection;
