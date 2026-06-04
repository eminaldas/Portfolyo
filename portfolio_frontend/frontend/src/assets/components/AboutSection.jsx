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
  { txt: '  stack: [', cls: 'text-on-surface' },
  { txt: "'Python/FastAPI'", cls: 'text-secondary' },
  { txt: ', ',      cls: 'text-on-surface-variant' },
  { txt: "'React.js'", cls: 'text-secondary' },
  { txt: ', ',      cls: 'text-on-surface-variant' },
  { txt: "'PostgreSQL'", cls: 'text-secondary' },
  { txt: '],\n',    cls: 'text-on-surface-variant' },
  { txt: '  vibe: ',  cls: 'text-on-surface' },
  { txt: `'${t.about.vibe}'`, cls: 'text-secondary' },
  { txt: '\n};',    cls: 'text-on-surface-variant' },
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


const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 lg:py-32 relative bg-surface-container-low">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <CodeBlock t={t} />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
