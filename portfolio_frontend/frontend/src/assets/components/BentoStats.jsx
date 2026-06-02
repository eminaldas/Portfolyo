import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import GithubContributions from './GithubContributions';

const BentoStats = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="tech" className="py-32 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-[2px] h-auto md:h-[450px]"
        >
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 md:row-span-2 bg-surface-container p-10 flex flex-col justify-between border border-outline-variant/10 group hover:border-outline/25 transition-colors"
          >
            <div>
              <span className="font-mono text-[10px] tracking-[.25em] uppercase text-on-surface-variant/40">{t.bento.eduLabel}</span>
              <h3 className="font-headline font-bold text-3xl md:text-4xl mt-4 leading-tight tracking-[-1px]">{t.bento.eduTitle}</h3>
              <p className="font-body text-on-surface-variant mt-4 text-lg max-w-xs">{t.bento.eduDesc}</p>
            </div>
            <div className="flex gap-2 mt-8">
              <span className="px-4 py-1.5 bg-surface-container-high font-mono text-[10px] tracking-[.1em] uppercase">2022 – 2026</span>
              <span className="px-4 py-1.5 bg-surface-container-high text-on-surface font-mono text-[10px] tracking-[.1em] uppercase">BEYKOZ ÜNİVERSİTESİ</span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-surface-container-high p-8 flex flex-col justify-center border border-outline-variant/10"
          >
            <span className="font-mono text-[10px] tracking-[.25em] uppercase text-on-surface-variant/40">{t.bento.workLabel}</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-headline font-bold text-4xl">Aras Kargo</span>
            </div>
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-on-surface-variant mt-2">{t.bento.workRole}</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-primary p-8 flex flex-col justify-between"
          >
            <span className="font-mono text-[10px] tracking-[.25em] uppercase text-on-primary/60 font-bold">{t.bento.interestLabel}</span>
            <h4 className="font-headline font-bold text-2xl text-on-primary">AI &amp; NLP</h4>
            <div className="flex justify-end">
              <span className="material-symbols-outlined text-on-primary text-4xl">memory</span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="md:col-span-2 bg-surface-container p-6 flex flex-col border border-outline-variant/10 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] tracking-[.25em] uppercase text-on-surface-variant/40">
                GitHub Katkıları
              </span>
              <a
                href="https://github.com/eminaldas"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[9px] tracking-[.15em] uppercase text-on-surface-variant/35 hover:text-on-surface transition-colors"
              >
                @eminaldas ↗
              </a>
            </div>
            <GithubContributions username="eminaldas" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoStats;
