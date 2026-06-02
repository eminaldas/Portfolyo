import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useBuild } from '../../context/BuildContext';
import FloatingWordsCanvas from './FloatingWordsCanvas';

// ready=true olana kadar tüm elementler gizli
// Sıra: ①isim ②açıklama ③(navbar 0.9s) ④rol ⑤butonlar ⑥stats ⑦canvas

const mk = (initial, animate, delay, duration = 1.0) => ({
  initial,
  animate,
  transition: { duration, ease: [0.16, 1, 0.3, 1], delay },
});

const HeroSection = () => {
  const { t } = useLanguage();
  const { ready } = useBuild();

  const mRef    = useRef(null);
  const iRef    = useRef(null);
  const sRef    = useRef(null);
  const heroRef = useRef(null);
  const anchorsRef = useRef([]);

  useEffect(() => {
    const measure = () => {
      if (!heroRef.current) return;
      const hr = heroRef.current.getBoundingClientRect();
      const pts = [];
      [{ ref: mRef, ox: -14, oy: -16 }, { ref: iRef, ox: 14, oy: -18 }, { ref: sRef, ox: 16, oy: 6 }]
        .forEach(({ ref, ox, oy }) => {
          if (!ref.current) return;
          const r = ref.current.getBoundingClientRect();
          pts.push({ x: r.left - hr.left + r.width / 2 + ox, y: r.top - hr.top + r.height / 2 + oy });
        });
      anchorsRef.current = pts;
    };
    const t1 = setTimeout(measure, 2200);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(t1); window.removeEventListener('resize', measure); };
  }, []);

  const vis  = ready;
  const show = (x, y) => ({ x, y, opacity: 1 });
  const hide = (x, y) => ({ x, y, opacity: 0 });

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Arka plan glow — en son */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[0]"
        initial={{ opacity: 0 }} animate={vis ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 3, delay: 1.8 }}
        style={{ background: 'radial-gradient(ellipse 65% 50% at 40% 55%, rgba(220,216,192,0.05) 0%, transparent 70%)' }}
      />

      {/* Canvas — en son (delay 1.6s) */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={vis ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 1.6 }}
      >
        <FloatingWordsCanvas anchorsRef={anchorsRef} />
      </motion.div>

      <div className="absolute inset-0 grain-texture pointer-events-none z-[1]" />

      <div className="relative z-[2] max-w-7xl mx-auto px-8 w-full py-32">

        {/* ① Konum — blur, delay 0.05 */}
        <motion.span
          className="font-mono text-[11px] tracking-[.32em] uppercase text-on-surface-variant/45 mb-7 block"
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={vis ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.05 }}
        >
          {t.hero.location}
        </motion.span>

        {/* ② İsim 1 — soldan, delay 0.1 */}
        <motion.h1
          className="font-headline font-black leading-none tracking-[-4px] uppercase text-on-surface"
          style={{ fontSize: 'clamp(60px, 9.5vw, 110px)' }}
          {...mk(hide(-180, 0), vis ? show(0, 0) : hide(-180, 0), 0.1)}
        >
          <span ref={mRef}>M</span>UHAMMED
        </motion.h1>

        {/* ② İsim 2 — sağdan, delay 0.22 */}
        <motion.h1
          className="leading-none mb-10 flex flex-wrap items-baseline gap-x-4"
          style={{ fontSize: 'clamp(60px, 9.5vw, 110px)' }}
          {...mk(hide(180, 0), vis ? show(0, 0) : hide(180, 0), 0.22)}
        >
          {/* EMİN — MUHAMMED ile aynı stil, solid */}
          <span
            className="font-headline font-black tracking-[-4px] uppercase text-on-surface"
          >
            EM<span ref={iRef}>İ</span>N
          </span>
          {/* ALDAŞ — Cormorant italic, solid cream */}
          <span
            style={{
              fontFamily: "'Cormorant', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#dcd8c0',
              letterSpacing: '-1px',
            }}
          >
            Aldaş<span ref={sRef} style={{ position: 'relative' }} />
          </span>
        </motion.h1>

        {/* ③ Açıklama — sağdan, delay 0.5 */}
        <motion.p
          className="font-body text-lg text-on-surface-variant max-w-md mb-8 leading-relaxed"
          {...mk(hide(80, 0), vis ? show(0, 0) : hide(80, 0), 0.5, 0.85)}
        >
          {t.hero.description}
        </motion.p>

        {/* ④ Rol — yukarıdan, delay 1.15 (navbar 0.9s'de geliyor, bu sonra) */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          {...mk(hide(0, -30), vis ? show(0, 0) : hide(0, -30), 1.15, 0.75)}
        >
          <div className="w-5 h-[1px] bg-on-surface/25" />
          <span style={{ fontFamily: "'Cormorant', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px, 2vw, 22px)', color: 'rgba(220,216,192,0.55)', letterSpacing: '0.02em' }}>
            Full-Stack Engineer · İstanbul
          </span>
        </motion.div>

        {/* ⑤ Butonlar — soldan, delay 1.35 */}
        <motion.div
          className="flex flex-wrap gap-3"
          {...mk(hide(-60, 0), vis ? show(0, 0) : hide(-60, 0), 1.35, 0.75)}
        >
          <a href="https://github.com/eminaldas" target="_blank" rel="noreferrer"
            className="px-8 py-3.5 bg-primary text-on-primary font-mono text-[11px] font-bold tracking-[.12em] uppercase hover:opacity-75 active:scale-95 transition-all">
            {t.hero.github} ↗
          </a>
          <a href="#contact"
            className="px-8 py-3.5 border border-on-surface/25 text-on-surface font-mono text-[11px] tracking-[.12em] uppercase hover:bg-on-surface/[0.05] transition-colors">
            {t.hero.connect}
          </a>
        </motion.div>

        {/* ⑥ Stats — aşağıdan, delay 1.55 */}
        <motion.div
          className="flex items-center gap-10 mt-16 pt-8 border-t border-on-surface/[0.08]"
          {...mk(hide(0, 30), vis ? show(0, 0) : hide(0, 30), 1.55, 0.75)}
        >
          {[
            { value: '1+',          label: 'Yıl Deneyim',  serif: true  },
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

      {/* Scroll göstergesi */}
      <motion.div
        className="absolute bottom-8 left-8 z-[2] flex items-center gap-3"
        {...mk(hide(0, 20), vis ? show(0, 0) : hide(0, 20), 1.7, 0.6)}
      >
        <div className="w-10 h-[1px] relative overflow-hidden" style={{ background: 'rgba(220,216,192,0.12)' }}>
          <div className="scan-line-inner" />
        </div>
        <span className="font-mono text-[9px] tracking-[.22em] uppercase text-on-surface-variant/28">scroll</span>
      </motion.div>

      {/* Sağ dikey yıl */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 z-[2] hidden lg:flex flex-col items-center gap-4"
        {...mk(hide(40, 0), vis ? show(0, 0) : hide(40, 0), 1.75, 0.6)}
      >
        <div className="w-px h-14 bg-gradient-to-b from-transparent to-on-surface/18" />
        <span className="font-mono text-[9px] tracking-[.3em] uppercase text-on-surface-variant/28" style={{ writingMode: 'vertical-rl' }}>2026</span>
        <div className="w-px h-14 bg-gradient-to-t from-transparent to-on-surface/18" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
