import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const NowSection = () => {
  const { t } = useLanguage();
  const items = [
    { labelKey: 'buildingLabel', valueKey: 'buildingValue', index: 0 },
    { labelKey: 'learningLabel', valueKey: 'learningValue', index: 1 },
    { labelKey: 'seekingLabel',  valueKey: 'seekingValue',  index: 2 },
  ];

  return (
    <section className="relative border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-outline-variant/10">
        {items.map(({ labelKey, valueKey, index }) => (
          <motion.div
            key={labelKey}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
            className="flex flex-col gap-2 px-0 md:px-8 first:pl-0 last:pr-0 py-6 md:py-0"
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(220,216,192,0.55)',
              }}
            >
              {t.now[labelKey]}
            </span>
            <span
              style={{
                fontFamily: "'Cormorant', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(17px, 1.8vw, 22px)',
                color: 'rgba(220,216,192,0.80)',
                letterSpacing: '0.01em',
                lineHeight: 1.3,
              }}
            >
              {t.now[valueKey]}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Sol üst köşe etiketi */}
      <div
        className="absolute top-0 left-8 -translate-y-1/2 px-3 py-1 bg-background"
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 9,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(220,216,192,0.50)',
        }}
      >
        {t.now.label}
      </div>
    </section>
  );
};

export default NowSection;
