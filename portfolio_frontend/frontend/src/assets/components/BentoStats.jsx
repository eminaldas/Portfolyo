import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const BentoStats = () => {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="tech" className="py-32 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[450px]"
        >
          <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2 bg-surface-container rounded-3xl p-10 flex flex-col justify-between border border-outline-variant/10 group hover:border-primary/20 transition-colors">
            <div>
              <span className="font-label text-secondary tracking-widest text-xs uppercase">{t.bento.eduLabel}</span>
              <h3 className="font-headline font-bold text-5xl mt-4">{t.bento.eduTitle}</h3>
              <p className="font-body text-on-surface-variant mt-4 text-lg max-w-xs">{t.bento.eduDesc}</p>
            </div>
            <div className="flex gap-2 mt-8">
              <span className="px-4 py-1.5 bg-surface-container-high rounded-full font-label text-xs">2022 - 2026</span>
              <span className="px-4 py-1.5 bg-surface-container-high text-primary rounded-full font-label text-xs">BEYKOZ ÜNİVERSİTESİ</span>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-surface-container-high rounded-3xl p-8 flex flex-col justify-center border border-outline-variant/10">
            <span className="font-label text-primary tracking-widest text-xs uppercase">{t.bento.workLabel}</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-headline font-bold text-4xl">Aras Kargo</span>
            </div>
            <p className="text-xs text-on-surface-variant mt-2 font-label">{t.bento.workRole}</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-primary rounded-3xl p-8 flex flex-col justify-between group hover:rotate-1 transition-transform">
            <span className="font-label text-on-primary-fixed tracking-widest text-xs uppercase font-bold">{t.bento.interestLabel}</span>
            <h4 className="font-headline font-bold text-2xl text-on-primary">AI & NLP</h4>
            <div className="flex justify-end">
              <span className="material-symbols-outlined text-on-primary text-4xl" data-icon="memory">memory</span>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="md:col-span-2 bg-surface-container rounded-3xl p-8 flex items-center justify-between border border-outline-variant/10">
            <div className="flex flex-col">
              <span className="font-label text-tertiary tracking-widest text-xs uppercase">{t.bento.techLabel}</span>
              <h3 className="font-headline font-bold text-3xl md:text-4xl mt-2">{t.bento.techTitle}</h3>
            </div>
            <div className="flex -space-x-4">
              <div className="w-12 h-12 rounded-full border-4 border-surface-container bg-surface-container-high flex items-center justify-center z-40">
                <span className="material-symbols-outlined text-sm text-blue-400" data-icon="data_object">data_object</span>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-surface-container bg-surface-container-high flex items-center justify-center z-30">
                <span className="material-symbols-outlined text-sm text-yellow-500" data-icon="javascript">javascript</span>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-surface-container bg-surface-container-high flex items-center justify-center z-20">
                <span className="material-symbols-outlined text-sm text-green-500" data-icon="dns">dns</span>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-surface-container flex items-center justify-center z-10 bg-primary/20 text-primary font-bold text-xs ring-1 ring-primary/40">
                +8
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoStats;
