import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const CareerSection = () => {
  const { t } = useLanguage();

  return (
    <section id="career" className="py-32 relative bg-surface-container">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-[10px] tracking-[.3em] uppercase text-on-surface-variant/40 mb-4 block">
            {t.career.label}
          </span>
          <h2 className="cursor-target font-headline font-black text-5xl md:text-6xl tracking-[-2px]">
            {t.career.title1}
          </h2>
        </motion.div>

        <div className="relative border-l border-outline-variant/30 ml-4 md:ml-8 space-y-16 py-8">
          {[
            { role: t.career.role1, desc: t.career.desc1, date: '17/03/2025 – 17/09/2025', delay: 0    },
            { role: t.career.role2, desc: t.career.desc2, date: '12/02/2024 – 01/08/2024', delay: 0.15 },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: item.delay }}
              className="relative pl-8 md:pl-16"
            >
              <div className="absolute -left-3 top-2 w-6 h-6 border-2 border-on-surface bg-surface-container-high flex items-center justify-center">
                <div className="w-2 h-2 bg-on-surface" />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[.15em] text-on-surface-variant/50">
                {item.date}
              </span>
              <h3 className="font-headline font-bold text-3xl mt-2 text-on-surface">{item.role}</h3>
              <h4 className="font-body text-xl text-on-surface-variant mt-1">Aras Kargo</h4>
              <p className="font-body mt-4 max-w-2xl leading-relaxed" style={{ color: 'rgba(220,216,192,0.65)' }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
