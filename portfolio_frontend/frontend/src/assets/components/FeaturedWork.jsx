import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const PROJECTS = [
  {
    num: '001', year: '2026',
    titleKey: 'p1Title', descKey: 'p1Desc',
    tags: ['Python', 'FastAPI', 'BERTurk', 'Docker', 'Celery', 'Redis', 'pgvector'],
    live: 'nehaber.dev', liveHref: 'https://nehaber.dev',
    github: 'https://github.com/eminaldas/Fake-News-Detection-System',
    badge: false,
  },
  {
    num: '002', year: '2025',
    titleKey: 'p2Title', descKey: 'p2Desc',
    tags: ['Angular', 'TypeScript', 'REST API'],
    live: null, liveHref: null,
    github: 'https://github.com/ErdemKoray/Beavask',
    badge: true,
  },
];

// Arka plan scatter kelimeleri
const BG_WORDS = [
  { text: 'Full-Stack',   x: '5%',  y: '12%', size: 11, mono: true  },
  { text: 'Production',   x: '72%', y: '9%',  size: 11, serif: true },
  { text: 'NLP',          x: '4%',  y: '60%', size: 12, mono: true  },
  { text: 'React',        x: '78%', y: '58%', size: 11, serif: true },
  { text: 'Docker',       x: '28%', y: '80%', size: 11, mono: true  },
  { text: 'BERT',         x: '60%', y: '82%', size: 11, serif: true },
  { text: 'FastAPI',      x: '44%', y: '20%', size: 11, mono: true  },
  { text: 'Angular',      x: '16%', y: '35%', size: 11, serif: true },
];

const BgWord = ({ w, scrollP }) => {
  const op = useTransform(scrollP, [0, 0.08, 0.30, 0.42], [0, 0.28, 0.28, 0]);
  return (
    <motion.div
      className="absolute select-none pointer-events-none whitespace-nowrap"
      style={{
        left: w.x, top: w.y, opacity: op,
        fontFamily: w.mono ? "'IBM Plex Mono', monospace" : "'Cormorant', Georgia, serif",
        fontSize: w.size, fontStyle: w.serif ? 'italic' : 'normal',
        fontWeight: w.mono ? 400 : 300,
        letterSpacing: w.mono ? '0.12em' : '0.02em',
        textTransform: w.mono ? 'uppercase' : 'none',
        color: '#dcd8c0',
      }}
    >
      {w.text}
    </motion.div>
  );
};

const ProjectCard = ({ proj, scrollP, idx, t }) => {
  const s0 = idx === 0 ? 0.38 : 0.72;
  const s1 = idx === 0 ? 0.52 : 0.82;
  const s2 = idx === 0 ? 0.68 : 1.02;
  const s3 = idx === 0 ? 0.78 : 1.10;
  const dir = idx === 0 ? -120 : 120;

  const op = useTransform(scrollP, [s0, s1, s2, s3], [0, 1, 1, 0]);
  const x  = useTransform(scrollP, [s0, s1, s2, s3], [dir, 0, 0, -dir]);

  const bgNumOp = useTransform(scrollP, [s0, s1, s2, s3], [0, 0.07, 0.07, 0]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center max-w-7xl mx-auto px-8 w-full"
      style={{ opacity: op, x }}
    >
      {/* Büyük arka plan numarası */}
      <motion.span
        className="absolute select-none pointer-events-none font-headline font-black"
        style={{
          fontSize: 'clamp(140px, 25vw, 260px)',
          right: idx === 0 ? '5%' : 'auto', left: idx === 1 ? '5%' : 'auto',
          top: '50%', transform: 'translateY(-50%)',
          opacity: bgNumOp, color: '#dcd8c0', letterSpacing: '-8px',
        }}
      >
        {proj.num}
      </motion.span>

      {/* İçerik */}
      <div className={`relative z-10 max-w-2xl ${idx === 1 ? 'ml-auto' : ''}`}>
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[10px] tracking-[.25em] uppercase text-on-surface-variant/35">{proj.num}</span>
          <div className="w-8 h-[1px] bg-on-surface/20" />
          <span className="font-mono text-[10px] tracking-[.1em] text-on-surface-variant/35">{proj.year}</span>
        </div>

        <h3
          className="font-headline font-black uppercase tracking-[-2px] text-on-surface mb-5"
          style={{ fontSize: 'clamp(28px, 4.5vw, 58px)' }}
        >
          {t.works[proj.titleKey]}
        </h3>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {proj.tags.map(tag => (
            <span key={tag} className="font-mono text-[9px] tracking-[.12em] uppercase border border-on-surface/18 px-2 py-1 text-on-surface-variant/45">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-on-surface-variant leading-relaxed mb-6" style={{ fontSize: 'clamp(14px, 1.6vw, 17px)' }}>
          {t.works[proj.descKey]}
        </p>

        <div className="flex flex-wrap gap-3">
          {proj.live && (
            <a href={proj.liveHref} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-mono text-[10px] font-bold tracking-[.12em] uppercase hover:opacity-75 transition-opacity">
              <span className="w-1.5 h-1.5 rounded-full bg-on-primary animate-pulse" />
              {proj.live} ↗
            </a>
          )}
          {proj.badge && (
            <span className="flex items-center px-4 py-2.5 border border-on-surface/20 font-mono text-[10px] tracking-[.12em] uppercase text-on-surface-variant/60">
              {t.works.award}
            </span>
          )}
          <a href={proj.github} target="_blank" rel="noreferrer"
            className="px-5 py-2.5 border border-on-surface/25 text-on-surface font-mono text-[10px] tracking-[.12em] uppercase hover:bg-on-surface/5 transition-colors">
            GitHub ↗
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedWork = () => {
  const { t } = useLanguage();
  const ref  = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const labelOp = useTransform(scrollYProgress, [0, 0.06, 0.32, 0.42], [0, 1, 1, 0]);

  return (
    <section ref={ref} id="works" style={{ height: '280vh' }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-surface-container-low border-y border-on-surface/[0.07]">

        {/* Scatter arka plan kelimeleri */}
        {BG_WORDS.map((w, i) => <BgWord key={i} w={w} scrollP={scrollYProgress} />)}

        {/* Başlık etiketi */}
        <motion.div
          className="absolute top-10 left-8 z-10"
          style={{ opacity: labelOp }}
        >
          <span className="font-mono text-[10px] tracking-[.3em] uppercase text-on-surface-variant/40 mr-3">{t.works.label}</span>
          <span
            className="font-headline font-black uppercase tracking-[-2px] text-on-surface"
            style={{ fontSize: 'clamp(18px, 3vw, 32px)' }}
          >
            {t.works.title}
          </span>
        </motion.div>

        {/* Proje kartları */}
        {PROJECTS.map((proj, i) => (
          <ProjectCard key={proj.num} proj={proj} scrollP={scrollYProgress} idx={i} t={t} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedWork;
