import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import FloatingWordsCanvas from './FloatingWordsCanvas';

const STAGGER = 0.18;

const slideUp = delay => ({
  initial: { y: '105%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay },
});

const fadeUp = delay => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
});

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* animated grid background overlay — slightly brightens the CSS grid in hero */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[0]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(220,216,192,0.04) 0%, transparent 70%)',
        }}
      />

      <FloatingWordsCanvas />
      <div className="absolute inset-0 grain-texture pointer-events-none z-[1]" />

      <div className="relative z-[2] max-w-7xl mx-auto px-8 w-full py-32">

        {/* Location */}
        <motion.span
          className="font-mono text-[11px] tracking-[.32em] uppercase text-on-surface-variant/45 mb-7 block"
          {...fadeUp(0.15)}
        >
          {t.hero.location}
        </motion.span>

        {/* Name line 1 */}
        <div className="overflow-hidden mb-1">
          <motion.h1
            className="font-headline font-black leading-[0.88] tracking-[-4px] uppercase text-on-surface"
            style={{ fontSize: 'clamp(60px, 9.5vw, 108px)' }}
            {...slideUp(0.3)}
          >
            {t.hero.titleTop}
          </motion.h1>
        </div>

        {/* Name line 2 — stroke outline */}
        <div className="overflow-hidden mb-12">
          <motion.h1
            className="font-headline font-black leading-[0.88] tracking-[-4px] uppercase"
            style={{
              fontSize: 'clamp(60px, 9.5vw, 108px)',
              WebkitTextStroke: '1.5px rgba(220,216,192,0.55)',
              color: 'transparent',
            }}
            {...slideUp(0.3 + STAGGER)}
          >
            {t.hero.titleBottom}
          </motion.h1>
        </div>

        {/* Role tag line */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          {...fadeUp(0.3 + STAGGER * 2)}
        >
          <div className="w-6 h-[1px] bg-on-surface/30" />
          <span className="font-mono text-[10px] tracking-[.25em] uppercase text-on-surface-variant/50">
            Full-Stack Engineer
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          className="font-body text-lg text-on-surface-variant max-w-md mb-12 leading-relaxed"
          {...fadeUp(0.3 + STAGGER * 3)}
        >
          {t.hero.description}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap gap-3"
          {...fadeUp(0.3 + STAGGER * 4)}
        >
          <a
            href="https://github.com/eminaldas"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3.5 bg-primary text-on-primary font-mono text-[11px] font-bold tracking-[.12em] uppercase hover:opacity-75 active:scale-95 transition-all"
          >
            {t.hero.github} ↗
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 border border-on-surface/25 text-on-surface font-mono text-[11px] tracking-[.12em] uppercase hover:bg-on-surface/[0.05] transition-colors"
          >
            {t.hero.connect}
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex items-center gap-10 mt-16 pt-8 border-t border-on-surface/8"
          {...fadeUp(0.3 + STAGGER * 5)}
        >
          {[
            { value: '2+', label: 'Yıl Deneyim' },
            { value: '4+', label: 'Canlı Proje' },
            { value: 'nehaber.dev', label: 'Production' },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="font-headline font-black text-2xl tracking-tight">{stat.value}</span>
              <span className="font-mono text-[10px] tracking-[.2em] uppercase text-on-surface-variant/40">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-8 z-[2] flex items-center gap-3">
        <div className="w-10 h-[1px] relative overflow-hidden" style={{ background: 'rgba(220,216,192,0.12)' }}>
          <div className="scan-line-inner" />
        </div>
        <span className="font-mono text-[10px] tracking-[.2em] uppercase text-on-surface-variant/30">scroll</span>
      </div>

      {/* Right side — vertical label */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 z-[2] hidden lg:flex flex-col items-center gap-4"
        {...fadeUp(0.3 + STAGGER * 6)}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-on-surface/20" />
        <span
          className="font-mono text-[9px] tracking-[.3em] uppercase text-on-surface-variant/30"
          style={{ writingMode: 'vertical-rl' }}
        >
          2026
        </span>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-on-surface/20" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
