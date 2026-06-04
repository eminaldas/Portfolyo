import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

/* ---- Kod bloğu — segment bazlı (her segmentin kendi rengi) ---- */
const useCodeSegments = (t) => [
  { txt: 'const',  cls: 'text-on-surface-variant' },
  { txt: ' developer ', cls: 'text-on-surface' },
  { txt: '= {\n',   cls: 'text-on-surface-variant' },
  { txt: '  name: ',  cls: 'text-on-surface' },
  { txt: "'Muhammed Emin Aldaş'", cls: 'text-secondary' },
  { txt: ',\n',     cls: 'text-on-surface-variant' },
  { txt: '  mission: ', cls: 'text-on-surface' },
  { txt: `'${t.about.mission}'`, cls: 'text-secondary' },
  { txt: ',\n',     cls: 'text-on-surface-variant' },
  { txt: '  stack: [', cls: 'text-on-surface' },
  { txt: "'Python/FastAPI'", cls: 'text-secondary' },
  { txt: ', ',      cls: 'text-on-surface-variant' },
  { txt: "'React.js'", cls: 'text-secondary' },
  { txt: ', ',      cls: 'text-on-surface-variant' },
  { txt: "'PostgreSQL'", cls: 'text-secondary' },
  { txt: '],\n',    cls: 'text-on-surface-variant' },
  { txt: '  vibe: ',  cls: 'text-on-surface' },
  { txt: `'${t.about.vibe}'`, cls: 'text-secondary' },
  { txt: '\n};\n\n', cls: 'text-on-surface-variant' },
  { txt: `// ${t.about.learning}`, cls: 'text-on-surface-variant/70 italic' },
];

const CodeBlock = ({ t }) => {
  const segments = useCodeSegments(t);
  const total = segments.reduce((s, seg) => s + seg.txt.length, 0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    let count = 0;
    let last = performance.now();
    const speed = 28; // karakter / saniye değil — aşağıda hesaplanıyor
    const charsPerTick = 1.6;
    const tick = (now) => {
      const dt = now - last;
      if (dt > speed) {
        count = Math.min(total, count + charsPerTick * Math.round(dt / speed));
        setTyped(Math.floor(count));
        last = now;
      }
      if (count < total) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, total]);

  // typed karakter sayısına göre segmentleri dilimle
  let remaining = typed;
  const rendered = segments.map((seg, i) => {
    if (remaining <= 0) return null;
    const slice = seg.txt.slice(0, remaining);
    remaining -= seg.txt.length;
    return <span key={i} className={seg.cls} style={{ whiteSpace: 'pre-wrap' }}>{slice}</span>;
  });

  const done = typed >= total;

  return (
    <div ref={ref} className="bg-surface-container-highest p-5 sm:p-8 font-mono text-sm leading-relaxed shadow-2xl border border-outline-variant/20 min-h-[300px] sm:min-h-[340px]">
      <div className="flex gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-error-dim" />
        <div className="w-3 h-3 rounded-full bg-secondary" />
        <div className="w-3 h-3 rounded-full bg-primary" />
      </div>
      <pre className="font-mono whitespace-pre-wrap leading-relaxed">
        <code>
          {rendered}
          <motion.span
            className="inline-block w-[7px] h-[15px] bg-primary translate-y-[2px] ml-[1px]"
            animate={{ opacity: done ? [1, 0, 1] : 1 }}
            transition={done ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
          />
        </code>
      </pre>
    </div>
  );
};

/* ---- Başlık — kelime kelime giriş + Cormorant italic vurgu ---- */
const AnimatedTitle = ({ title1, title2 }) => {
  const words = title1.trim().split(' ');
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const word = {
    hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.h2
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="font-headline font-bold tracking-[-1.5px] leading-[1.05] mb-8"
      style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={word} className="inline-block mr-[0.28em] text-on-surface">
          {w}
        </motion.span>
      ))}
      <motion.span
        variants={word}
        className="inline-block"
        style={{
          fontFamily: "'Cormorant', Georgia, serif",
          fontStyle: 'italic',
          fontWeight: 300,
          color: 'rgba(220,216,192,0.62)',
          letterSpacing: '0',
        }}
      >
        {title2}
      </motion.span>
    </motion.h2>
  );
};

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 lg:py-40 relative bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Sol — kod bloğu (yavaş yüklenir, typewriter) */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="relative order-2 lg:order-1"
        >
          <CodeBlock t={t} />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
            className="hidden sm:block absolute -top-10 -right-6 bg-primary text-on-primary px-6 py-4 font-headline font-black text-xl shadow-xl"
          >
            {t.about.developerRole}
          </motion.div>
        </motion.div>

        {/* Sağ — başlık + açıklama */}
        <div className="order-1 lg:order-2">
          <AnimatedTitle title1={t.about.title1} title2={t.about.title2} />
          <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
            {[t.about.desc1, t.about.desc2].map((d, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 + i * 0.15 }}
              >
                {d}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
