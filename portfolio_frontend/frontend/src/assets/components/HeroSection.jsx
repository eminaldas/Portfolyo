import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import FloatingWordsCanvas from './FloatingWordsCanvas';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <FloatingWordsCanvas />
      <div className="absolute inset-0 grain-texture pointer-events-none z-[1]" />

      <div className="relative z-[2] max-w-7xl mx-auto px-8 w-full py-32">
        <motion.span
          className="font-mono text-[11px] tracking-[.3em] uppercase text-on-surface-variant/45 mb-6 block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t.hero.location}
        </motion.span>

        <div className="overflow-hidden mb-1">
          <motion.h1
            className="font-headline font-black leading-[0.88] tracking-[-4px] uppercase text-on-surface"
            style={{ fontSize: 'clamp(56px, 9vw, 104px)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          >
            {t.hero.titleTop}
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-10">
          <motion.h1
            className="font-headline font-black leading-[0.88] tracking-[-4px] uppercase"
            style={{
              fontSize: 'clamp(56px, 9vw, 104px)',
              WebkitTextStroke: '1.5px rgba(220,216,192,0.5)',
              color: 'transparent',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            {t.hero.titleBottom}
          </motion.h1>
        </div>

        <motion.p
          className="font-body text-lg text-on-surface-variant max-w-md mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          <a
            href="https://github.com/eminaldas"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3.5 bg-primary text-on-primary font-mono text-[11px] font-bold tracking-[.12em] uppercase hover:opacity-80 active:scale-95 transition-all"
          >
            {t.hero.github} ↗
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 border border-outline/30 text-on-surface font-mono text-[11px] tracking-[.12em] uppercase hover:bg-on-surface/[0.04] transition-colors"
          >
            {t.hero.connect}
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-8 z-[2] flex items-center gap-3">
        <div className="w-10 h-[1px] relative overflow-hidden" style={{ background: 'rgba(220,216,192,0.12)' }}>
          <div className="scan-line-inner" />
        </div>
        <span className="font-mono text-[10px] tracking-[.2em] uppercase text-on-surface-variant/30">scroll</span>
      </div>
    </section>
  );
};

export default HeroSection;
