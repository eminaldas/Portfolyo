import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import FloatingWordsCanvas from './FloatingWordsCanvas';

const STAGGER = 0.18;

// clip-path reveal — no overflow-hidden needed so letters aren't cropped
const revealClip = delay => ({
  initial: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  animate: { clipPath: 'inset(0 0 0% 0)', opacity: 1 },
  transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1], delay },
});

const fadeUp = delay => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
});

const HeroSection = () => {
  const { t } = useLanguage();

  // Refs for specific letter anchors (M, Ş, i)
  const mRef   = useRef(null);
  const sRef   = useRef(null);
  const iRef   = useRef(null);
  const heroRef = useRef(null);
  const anchorsRef = useRef([]);

  useEffect(() => {
    const measure = () => {
      if (!heroRef.current) return;
      const heroRect = heroRef.current.getBoundingClientRect();
      const pts = [];
      [
        { ref: mRef,   offsetX: -12, offsetY: -14 },  // above-left of M
        { ref: iRef,   offsetX:  12, offsetY: -16 },  // above-right of İ dot area
        { ref: sRef,   offsetX:  18, offsetY:   8 },  // right of Ş cedilla area
      ].forEach(({ ref, offsetX, offsetY }) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        pts.push({
          x: r.left - heroRect.left + r.width / 2 + offsetX,
          y: r.top  - heroRect.top  + r.height / 2 + offsetY,
        });
      });
      anchorsRef.current = pts;
    };

    // measure after animations complete (~1.5s)
    const t1 = setTimeout(measure, 1500);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(t1); window.removeEventListener('resize', measure); };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* subtle radial glow over grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[0]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.5 }}
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 40% 50%, rgba(220,216,192,0.05) 0%, transparent 70%)',
        }}
      />

      <FloatingWordsCanvas anchorsRef={anchorsRef} />
      <div className="absolute inset-0 grain-texture pointer-events-none z-[1]" />

      <div className="relative z-[2] max-w-7xl mx-auto px-8 w-full py-32">

        {/* Location */}
        <motion.span
          className="font-mono text-[11px] tracking-[.32em] uppercase text-on-surface-variant/45 mb-7 block"
          {...fadeUp(0.15)}
        >
          {t.hero.location}
        </motion.span>

        {/* Name line 1 — clipPath reveal, no overflow-hidden so letters aren't cropped */}
        <motion.h1
          className="font-headline font-black leading-none tracking-[-4px] uppercase text-on-surface mb-0"
          style={{ fontSize: 'clamp(60px, 9.5vw, 110px)' }}
          {...revealClip(0.3)}
        >
          <span ref={mRef}>M</span>UHAMMED
        </motion.h1>

        {/* Name line 2 — stroke outline, Ş and İ refs for arrows */}
        <motion.h1
          className="font-headline font-black leading-none tracking-[-4px] uppercase mb-12"
          style={{
            fontSize: 'clamp(60px, 9.5vw, 110px)',
            WebkitTextStroke: '1.5px rgba(220,216,192,0.55)',
            color: 'transparent',
          }}
          {...revealClip(0.3 + STAGGER)}
        >
          EM<span ref={iRef}>İ</span>N ALDAŞ<span ref={sRef} style={{ position: 'relative' }} />
        </motion.h1>

        {/* Role tag */}
        <motion.div className="flex items-center gap-3 mb-6" {...fadeUp(0.3 + STAGGER * 2)}>
          <div className="w-6 h-[1px] bg-on-surface/30" />
          <span className="font-mono text-[10px] tracking-[.25em] uppercase text-on-surface-variant/50">
            Full-Stack Engineer · İstanbul
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
        <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.3 + STAGGER * 4)}>
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

        {/* Stats — only truthful ones */}
        <motion.div
          className="flex items-center gap-10 mt-16 pt-8 border-t border-on-surface/[0.08]"
          {...fadeUp(0.3 + STAGGER * 5)}
        >
          {[
            { value: '1+', label: 'Yıl Deneyim' },
            { value: '2026', label: 'Mezuniyet' },
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

      {/* Vertical label right */}
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
