import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const ManifestoSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-surface-container-low border-y border-outline-variant/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <p className="font-mono text-[10px] tracking-[.3em] uppercase text-on-surface-variant/35 mb-10">
          {t.manifesto.label}
        </p>
        {t.manifesto.lines.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.span
              className={[
                'block leading-[1.0] mb-1',
                line.serif
                  ? 'font-serif normal-case font-normal italic text-on-surface/45'
                  : 'font-headline font-black uppercase tracking-[-2px] text-on-surface',
                line.muted ? 'opacity-20' : '',
              ].join(' ')}
              style={{
                fontSize: line.serif
                  ? 'clamp(22px, 3.5vw, 52px)'
                  : 'clamp(28px, 5vw, 68px)',
              }}
              initial={{ y: '110%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.85,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line.text}
            </motion.span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManifestoSection;
