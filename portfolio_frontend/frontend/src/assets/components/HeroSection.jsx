import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import FloatingWordsCanvas from './FloatingWordsCanvas';

// ── Her element farklı yönden gelir ──────────────────────────────────────────
const fromLeft  = (d, dist = 120) => ({ initial: { x: -dist, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: d } });
const fromRight = (d, dist = 120) => ({ initial: { x:  dist, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: d } });
const fromTop   = (d)             => ({ initial: { y: -40,   opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: d } });
const fromBelow = (d)             => ({ initial: { y:  40,   opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: d } });
const blurIn    = (d)             => ({ initial: { opacity: 0, filter: 'blur(10px)' }, animate: { opacity: 1, filter: 'blur(0px)' }, transition: { duration: 0.9, ease: 'easeOut', delay: d } });

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
      const hr  = heroRef.current.getBoundingClientRect();
      const pts = [];
      [{ ref: mRef, ox: -14, oy: -16 }, { ref: iRef, ox: 14, oy: -18 }, { ref: sRef, ox: 16, oy: 6 }]
        .forEach(({ ref, ox, oy }) => {
          if (!ref.current) return;
          const r = ref.current.getBoundingClientRect();
          pts.push({ x: r.left - hr.left + r.width / 2 + ox, y: r.top - hr.top + r.height / 2 + oy });
        });
      anchorsRef.current = pts;
    };
    const t1 = setTimeout(measure, 1800);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(t1); window.removeEventListener('resize', measure); };
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none z-[0]"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 1.5 }}
        style={{ background: 'radial-gradient(ellipse 65% 50% at 40% 55%, rgba(220,216,192,0.05) 0%, transparent 70%)' }}
      />
      <FloatingWordsCanvas anchorsRef={anchorsRef} />
      <div className="absolute inset-0 grain-texture pointer-events-none z-[1]" />

      <div className="relative z-[2] max-w-7xl mx-auto px-8 w-full py-32">

        {/* ① Konum — blur fade, ortalanır */}
        <motion.span className="font-mono text-[11px] tracking-[.32em] uppercase text-on-surface-variant/45 mb-7 block" {...blurIn(0.2)}>
          {t.hero.location}
        </motion.span>

        {/* ② İsim 1 — soldan gelir, çok uzaktan */}
        <motion.h1
          className="font-headline font-black leading-none tracking-[-4px] uppercase text-on-surface"
          style={{ fontSize: 'clamp(60px, 9.5vw, 110px)' }}
          {...fromLeft(0.4, 180)}
        >
          <span ref={mRef}>M</span>UHAMMED
        </motion.h1>

        {/* ③ İsim 2 — sağdan gelir, stroke */}
        <motion.h1
          className="font-headline font-black leading-none tracking-[-4px] uppercase mb-10"
          style={{ fontSize: 'clamp(60px, 9.5vw, 110px)', WebkitTextStroke: '1.5px rgba(220,216,192,0.55)', color: 'transparent' }}
          {...fromRight(0.55, 180)}
        >
          EM<span ref={iRef}>İ</span>N ALDAŞ<span ref={sRef} style={{ position: 'relative' }} />
        </motion.h1>

        {/* ④ Rol — yukarıdan iner, Cormorant italic */}
        <motion.div className="flex items-center gap-3 mb-7" {...fromTop(0.8)}>
          <div className="w-5 h-[1px] bg-on-surface/25" />
          <span style={{ fontFamily: "'Cormorant', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px, 2vw, 22px)', color: 'rgba(220,216,192,0.55)', letterSpacing: '0.02em' }}>
            Full-Stack Engineer · İstanbul
          </span>
        </motion.div>

        {/* ⑤ Açıklama — sağdan gelir */}
        <motion.p className="font-body text-lg text-on-surface-variant max-w-md mb-12 leading-relaxed" {...fromRight(0.95, 80)}>
          {t.hero.description}
        </motion.p>

        {/* ⑥ Butonlar — soldan gelir */}
        <motion.div className="flex flex-wrap gap-3" {...fromLeft(1.15, 60)}>
          <a href="https://github.com/eminaldas" target="_blank" rel="noreferrer"
            className="px-8 py-3.5 bg-primary text-on-primary font-mono text-[11px] font-bold tracking-[.12em] uppercase hover:opacity-75 active:scale-95 transition-all">
            {t.hero.github} ↗
          </a>
          <a href="#contact" className="px-8 py-3.5 border border-on-surface/25 text-on-surface font-mono text-[11px] tracking-[.12em] uppercase hover:bg-on-surface/[0.05] transition-colors">
            {t.hero.connect}
          </a>
        </motion.div>

        {/* ⑦ Stats — aşağıdan gelir */}
        <motion.div className="flex items-center gap-10 mt-16 pt-8 border-t border-on-surface/[0.08]" {...fromBelow(1.35)}>
          {[
            { value: '1+',          label: 'Yıl Deneyim',  serif: true  },
            { value: '2026',        label: 'Mezuniyet',    serif: false },
            { value: 'nehaber.dev', label: 'Production',   serif: false },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span style={stat.serif
                ? { fontFamily: "'Cormorant', Georgia, serif", fontStyle: 'italic', fontWeight: 200, fontSize: 'clamp(28px, 3vw, 40px)', color: '#dcd8c0', lineHeight: 1, letterSpacing: '-0.02em' }
                : { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#dcd8c0', lineHeight: 1, letterSpacing: '-1px' }}>
                {stat.value}
              </span>
              <span className="font-mono text-[9px] tracking-[.22em] uppercase text-on-surface-variant/38">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div className="absolute bottom-8 left-8 z-[2] flex items-center gap-3" {...fromBelow(1.55)}>
        <div className="w-10 h-[1px] relative overflow-hidden" style={{ background: 'rgba(220,216,192,0.12)' }}>
          <div className="scan-line-inner" />
        </div>
        <span className="font-mono text-[9px] tracking-[.22em] uppercase text-on-surface-variant/28">scroll</span>
      </motion.div>

      <motion.div className="absolute right-8 top-1/2 -translate-y-1/2 z-[2] hidden lg:flex flex-col items-center gap-4" {...fromRight(1.6, 40)}>
        <div className="w-px h-14 bg-gradient-to-b from-transparent to-on-surface/18" />
        <span className="font-mono text-[9px] tracking-[.3em] uppercase text-on-surface-variant/28" style={{ writingMode: 'vertical-rl' }}>2026</span>
        <div className="w-px h-14 bg-gradient-to-t from-transparent to-on-surface/18" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
