import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import FloatingWordsCanvas from './FloatingWordsCanvas';

// ── Animasyon yardımcıları ──────────────────────────────────────────────────

// 1. Blur + fade (location için)
const blurFade = delay => ({
  initial: { opacity: 0, filter: 'blur(8px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  transition: { duration: 0.9, ease: 'easeOut', delay },
});

// 2. Clip-path soldan açılır (isim satır 1)
const clipLeft = delay => ({
  initial: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  animate: { clipPath: 'inset(0 0% 0 0)', opacity: 1 },
  transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay },
});

// 3. Clip-path sağdan açılır (isim satır 2)
const clipRight = delay => ({
  initial: { clipPath: 'inset(0 0 0 100%)', opacity: 0 },
  animate: { clipPath: 'inset(0 0 0 0%)', opacity: 1 },
  transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay },
});

// 4. Scale + fade (rol etiketi)
const scaleFade = delay => ({
  initial: { opacity: 0, scale: 0.88 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay },
});

// 5. Y + blur + fade (açıklama)
const slideBlur = delay => ({
  initial: { opacity: 0, y: 28, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
});

// 6. Sıradan Y fade (butonlar, stats)
const fadeUp = delay => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut', delay },
});

// ───────────────────────────────────────────────────────────────────────────

const HeroSection = () => {
  const { t } = useLanguage();

  const mRef    = useRef(null);
  const sRef    = useRef(null);
  const iRef    = useRef(null);
  const heroRef = useRef(null);
  const anchorsRef = useRef([]);

  useEffect(() => {
    const measure = () => {
      if (!heroRef.current) return;
      const hr = heroRef.current.getBoundingClientRect();
      const pts = [];
      [
        { ref: mRef, ox: -14, oy: -16 },
        { ref: iRef, ox:  14, oy: -18 },
        { ref: sRef, ox:  16, oy:   6 },
      ].forEach(({ ref, ox, oy }) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        pts.push({ x: r.left - hr.left + r.width / 2 + ox, y: r.top - hr.top + r.height / 2 + oy });
      });
      anchorsRef.current = pts;
    };
    const t1 = setTimeout(measure, 1600);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(t1); window.removeEventListener('resize', measure); };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[0]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 1 }}
        style={{ background: 'radial-gradient(ellipse 65% 50% at 40% 55%, rgba(220,216,192,0.05) 0%, transparent 70%)' }}
      />

      <FloatingWordsCanvas anchorsRef={anchorsRef} />
      <div className="absolute inset-0 grain-texture pointer-events-none z-[1]" />

      <div className="relative z-[2] max-w-7xl mx-auto px-8 w-full py-32">

        {/* ① Konum — blur fade, font-mono */}
        <motion.span
          className="font-mono text-[11px] tracking-[.32em] uppercase text-on-surface-variant/45 mb-7 block"
          {...blurFade(0.2)}
        >
          {t.hero.location}
        </motion.span>

        {/* ② İsim satır 1 — soldan açılır, Space Grotesk black */}
        <motion.h1
          className="font-headline font-black leading-none tracking-[-4px] uppercase text-on-surface"
          style={{ fontSize: 'clamp(60px, 9.5vw, 110px)' }}
          {...clipLeft(0.45)}
        >
          <span ref={mRef}>M</span>UHAMMED
        </motion.h1>

        {/* ③ İsim satır 2 — sağdan açılır, stroke outline */}
        <motion.h1
          className="font-headline font-black leading-none tracking-[-4px] uppercase mb-10"
          style={{
            fontSize: 'clamp(60px, 9.5vw, 110px)',
            WebkitTextStroke: '1.5px rgba(220,216,192,0.55)',
            color: 'transparent',
          }}
          {...clipRight(0.6)}
        >
          EM<span ref={iRef}>İ</span>N ALDAŞ<span ref={sRef} style={{ position: 'relative' }} />
        </motion.h1>

        {/* ④ Rol — scale + bounce, Cormorant italic */}
        <motion.div
          className="flex items-center gap-3 mb-7"
          {...scaleFade(0.85)}
        >
          <div className="w-5 h-[1px] bg-on-surface/25" />
          <span
            style={{
              fontFamily: "'Cormorant', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(16px, 2vw, 22px)',
              color: 'rgba(220,216,192,0.55)',
              letterSpacing: '0.02em',
            }}
          >
            Full-Stack Engineer · İstanbul
          </span>
        </motion.div>

        {/* ⑤ Açıklama — slide + blur, Inter body */}
        <motion.p
          className="font-body text-lg text-on-surface-variant max-w-md mb-12 leading-relaxed"
          {...slideBlur(1.0)}
        >
          {t.hero.description}
        </motion.p>

        {/* ⑥ Butonlar — stagger fade up */}
        <motion.div className="flex flex-wrap gap-3" {...fadeUp(1.2)}>
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

        {/* ⑦ Stats — fade up, font karışımı */}
        <motion.div
          className="flex items-center gap-10 mt-16 pt-8 border-t border-on-surface/[0.08]"
          {...fadeUp(1.4)}
        >
          {[
            { value: '1+',          label: 'Yıl Deneyim',  serif: true  },
            { value: '2026',        label: 'Mezuniyet',    serif: false },
            { value: 'nehaber.dev', label: 'Production',   serif: false },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span
                style={stat.serif ? {
                  fontFamily: "'Cormorant', Georgia, serif",
                  fontStyle: 'italic',
                  fontWeight: 200,
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  color: '#dcd8c0',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                } : {
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(22px, 2.5vw, 30px)',
                  color: '#dcd8c0',
                  lineHeight: 1,
                  letterSpacing: '-1px',
                }}
              >
                {stat.value}
              </span>
              <span className="font-mono text-[9px] tracking-[.22em] uppercase text-on-surface-variant/38">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-8 z-[2] flex items-center gap-3"
        {...fadeUp(1.6)}
      >
        <div className="w-10 h-[1px] relative overflow-hidden" style={{ background: 'rgba(220,216,192,0.12)' }}>
          <div className="scan-line-inner" />
        </div>
        <span className="font-mono text-[9px] tracking-[.22em] uppercase text-on-surface-variant/28">scroll</span>
      </motion.div>

      {/* Sağ dikey yıl etiketi */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 z-[2] hidden lg:flex flex-col items-center gap-4"
        {...fadeUp(1.7)}
      >
        <div className="w-px h-14 bg-gradient-to-b from-transparent to-on-surface/18" />
        <span
          className="font-mono text-[9px] tracking-[.3em] uppercase text-on-surface-variant/28"
          style={{ writingMode: 'vertical-rl' }}
        >
          2026
        </span>
        <div className="w-px h-14 bg-gradient-to-t from-transparent to-on-surface/18" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
