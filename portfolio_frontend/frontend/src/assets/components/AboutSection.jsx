import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-40 relative bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-2 lg:order-1"
        >
          <div className="bg-surface-container-highest p-8 font-mono text-sm leading-relaxed text-on-surface shadow-2xl overflow-hidden border border-outline-variant/20">
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 bg-error-dim" />
              <div className="w-3 h-3 bg-secondary" />
              <div className="w-3 h-3 bg-primary" />
            </div>
            <p className="mb-2"><span className="text-on-surface-variant">const</span> <span className="text-on-surface">developer</span> = {'{'}</p>
            <p className="ml-4">name: <span className="text-secondary">'Muhammed Emin Aldaş'</span>,</p>
            <p className="ml-4">mission: <span className="text-secondary">'{t.about.mission}'</span>,</p>
            <p className="ml-4">stack: [<span className="text-secondary">'Python/FastAPI'</span>, <span className="text-secondary">'React.js'</span>, <span className="text-secondary">'PostgreSQL'</span>],</p>
            <p className="ml-4">vibe: <span className="text-secondary">'{t.about.vibe}'</span></p>
            <p>{'};'}</p>
            <div className="mt-8 pt-8 border-t border-outline-variant/20">
              <p className="text-on-surface-variant italic">// {t.about.learning}</p>
            </div>
          </div>
          <div className="absolute -top-10 -right-6 bg-primary text-on-primary px-6 py-4 font-headline font-black text-xl shadow-xl rotate-3">
            {t.about.developerRole}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="order-1 lg:order-2"
        >
          <h2 className="font-headline font-bold text-5xl mb-8 tracking-tight">
            {t.about.title1}<span className="italic text-on-surface-variant">{t.about.title2}</span>
          </h2>
          <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
            <p>{t.about.desc1}</p>
            <p>{t.about.desc2}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
