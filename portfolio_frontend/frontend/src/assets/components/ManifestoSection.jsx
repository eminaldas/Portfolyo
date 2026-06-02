import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

// Satırlar sırayla soldan/sağdan geliyor
const lineVariant = {
  hidden: i => ({ opacity: 0, x: i % 2 === 0 ? -80 : 80 }),
  visible: i => ({
    opacity: 1,
    x: 0,
    transition: { duration: 1.1, delay: i * 0.16, ease: [0.16, 1, 0.3, 1] },
  }),
};

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
            <motion.div
              key={i}
              custom={i}
              variants={lineVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <span
                className={[
                  'block leading-[1.05]',
                  line.serif
                    ? 'font-serif font-normal italic text-on-surface/50 normal-case'
                    : 'font-headline font-black uppercase tracking-[-2px] text-on-surface',
                  line.muted ? 'opacity-25' : '',
                ].join(' ')}
                style={{
                  fontSize: line.serif
                    ? 'clamp(24px, 3.5vw, 52px)'
                    : 'clamp(32px, 5.5vw, 72px)',
                }}
              >
                {line.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
