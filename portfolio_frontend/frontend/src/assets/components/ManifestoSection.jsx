import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

// ─── Dağınık kelimeler ───────────────────────────────────────────────────────
// Simetrik yerleşim: sol/sağ pairs, ortada büyük kelimeler
const SCATTER = [
  // Sol sütun
  { text: 'ARCHITECT',            left: '5%',   top: '14%', size: 13, op: 0.50, mono: true,  dx: -110, dy: -70,  t: 0.00 },
  { text: 'AI-Driven,',           left: '3%',   top: '37%', size: 12, op: 0.38, serif: true, dx: -130, dy: -20,  t: 0.03 },
  { text: 'Human-Coded',          left: '3%',   top: '47%', size: 12, op: 0.38, serif: true, dx: -120, dy:  10,  t: 0.05 },
  { text: 'Prompt to Production', left: '4%',   top: '70%', size: 11, op: 0.32, serif: true, dx: -100, dy:  90,  t: 0.07 },
  // Sağ sütun
  { text: 'PIPELINE',             right: '6%',  top: '11%', size: 13, op: 0.50, mono: true,  dx:  120, dy: -70,  t: 0.01 },
  { text: 'Live on Production',   right: '4%',  top: '40%', size: 12, op: 0.38, serif: true, dx:  130, dy:  15,  t: 0.04 },
  { text: 'ROBUST',               right: '7%',  top: '67%', size: 13, op: 0.45, mono: true,  dx:  110, dy:  90,  t: 0.06 },
  // Orta üst
  { text: 'Build. Ship. Repeat.', left: '28%',  top: '17%', size: 12, op: 0.38, serif: true, dx: -40,  dy: -100, t: 0.08 },
  // Orta alt
  { text: 'DEPLOY',               left: '59%',  top: '76%', size: 13, op: 0.42, mono: true,  dx:  50,  dy:  110, t: 0.02 },
  // Büyük arka plan kelimesi
  { text: 'FLOW',                 left: '43%',  top: '46%', size: 48, op: 0.05, dx: 0,       dy: 0,    t: 0.00 },
  // Kişisel
  { text: 'nehaber.dev',          left: '33%',  top: '82%', size: 10, op: 0.28, mono: true,  dx: 0,    dy:  120, t: 0.10 },
  { text: 'İstanbul, TR',         left: '60%',  top: '26%', size: 10, op: 0.28, serif: true, dx:  70,  dy: -80,  t: 0.09 },
];

// ─── Tek kelime bileşeni ─────────────────────────────────────────────────────
const Word = ({ item, scrollP }) => {
  const t0 = item.t;
  const t1 = item.t + 0.06;
  const t2 = 0.38;
  const t3 = 0.62;

  const opacity = useTransform(scrollP, [t0, t1, t2, t3], [0, item.op, item.op, 0]);
  const x       = useTransform(scrollP, [t2, t3], [0, item.dx]);
  const y       = useTransform(scrollP, [t2, t3], [0, item.dy]);

  const font = item.mono
    ? "'IBM Plex Mono', monospace"
    : item.serif
      ? "'Cormorant', Georgia, serif"
      : "'Space Grotesk', sans-serif";

  return (
    <motion.div
      className="absolute select-none pointer-events-none"
      style={{
        left: item.left, right: item.right, top: item.top,
        opacity, x, y,
        fontFamily: font,
        fontSize: item.size,
        fontStyle: item.serif ? 'italic' : 'normal',
        fontWeight: item.mono ? 400 : item.serif ? 300 : 700,
        letterSpacing: item.mono ? '0.12em' : '0.02em',
        textTransform: item.mono ? 'uppercase' : 'none',
        color: '#dcd8c0',
        whiteSpace: 'nowrap',
      }}
    >
      {item.text}
    </motion.div>
  );
};

// ─── Tek manifesto satırı ────────────────────────────────────────────────────
const MfLine = ({ line, scrollP, i }) => {
  const s0 = 0.65 + i * 0.05;
  const s1 = 0.82 + i * 0.04;
  const opacity = useTransform(scrollP, [s0, s1], [0, 1]);
  const y       = useTransform(scrollP, [s0, s1], [28, 0]);

  const font = line.serif
    ? "'Cormorant', Georgia, serif"
    : "'Space Grotesk', sans-serif";

  return (
    <motion.span
      className={['block leading-[1.05]', line.muted ? 'opacity-25' : ''].join(' ')}
      style={{
        opacity, y,
        fontFamily: font,
        fontStyle: line.serif ? 'italic' : 'normal',
        fontWeight: line.serif ? 300 : 900,
        textTransform: line.serif ? 'none' : 'uppercase',
        letterSpacing: line.serif ? 0 : '-2px',
        fontSize: line.serif ? 'clamp(24px, 3.5vw, 52px)' : 'clamp(32px, 5.5vw, 72px)',
        color: '#dcd8c0',
      }}
    >
      {line.text}
    </motion.span>
  );
};

// ─── Ana bileşen ─────────────────────────────────────────────────────────────
const ManifestoSection = () => {
  const { t }    = useLanguage();
  const ref      = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const labelOpacity = useTransform(scrollYProgress, [0.02, 0.10, 0.55, 0.63], [0, 1, 1, 0]);

  return (
    // 260vh yükseklik → kullanıcı içinde scroll edebilir
    <section ref={ref} style={{ height: '260vh' }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-surface-container-low border-y border-on-surface/[0.07]">

        {/* Dağınık kelimeler */}
        {SCATTER.map((item, i) => (
          <Word key={i} item={item} scrollP={scrollYProgress} />
        ))}

        {/* Merkez içerik */}
        <div className="absolute inset-0 flex flex-col items-start justify-center max-w-7xl mx-auto px-8">

          {/* Label */}
          <motion.p
            className="font-mono text-[10px] tracking-[.3em] uppercase text-on-surface-variant/40 mb-12"
            style={{ opacity: labelOpacity }}
          >
            {t.manifesto.label}
          </motion.p>

          {/* Manifesto satırları */}
          <div className="space-y-2">
            {t.manifesto.lines.map((line, i) => (
              <MfLine key={i} line={line} scrollP={scrollYProgress} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
