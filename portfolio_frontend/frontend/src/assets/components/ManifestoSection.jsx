import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const ManifestoSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-28 bg-surface-container-low border-y border-on-surface/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <motion.p
          className="font-mono text-[10px] tracking-[.3em] uppercase text-on-surface-variant/40 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t.manifesto.label}
        </motion.p>

        <div className="space-y-2">
          {t.manifesto.lines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                className={[
                  'block leading-[1.05]',
                  line.serif
                    ? 'normal-case font-normal italic text-on-surface/50'
                    : 'font-headline font-black uppercase tracking-[-2px] text-on-surface',
                  line.muted ? 'opacity-25' : '',
                ].join(' ')}
                style={{
                  fontFamily: line.serif ? "'Cormorant', Georgia, serif" : undefined,
                  fontSize: line.serif ? 'clamp(24px, 3.5vw, 52px)' : 'clamp(32px, 5.5vw, 72px)',
                }}
                initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
              >
                {line.text}
              </motion.span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
