import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const FeaturedWork = () => {
  const { t } = useLanguage();

  return (
    <section id="works" className="py-40 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-label text-primary tracking-[0.3em] uppercase mb-4 block text-sm">{t.works.label}</span>
            <h2 className="font-headline font-black text-6xl tracking-tighter">{t.works.title}</h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-xs text-on-surface-variant font-body"
          >
            {t.works.desc}
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Project Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="group relative"
          >
            <div className="aspect-video rounded-3xl overflow-hidden bg-surface-container mb-8 relative border border-outline-variant/10 shadow-2xl">
               <img src="/images/proje-nlp.png" alt="NeHaber NLP System" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <a href="https://github.com/eminaldas/Fake-News-Detection-System" target="_blank" rel="noreferrer" className="bg-on-primary text-primary w-16 h-16 rounded-full flex items-center justify-center font-bold shadow-xl">{t.works.view}</a>
              </div>
               <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-[10px] font-label uppercase tracking-widest text-on-surface">Python</span>
                <span className="px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-[10px] font-label uppercase tracking-widest text-on-surface">FastAPI</span>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-headline font-bold text-2xl group-hover:text-primary transition-colors">NeHaber - NLP System</h3>
                <p className="text-on-surface-variant mt-2">{t.works.p1Desc}</p>
              </div>
              <span className="font-label text-xs border border-outline-variant px-3 py-1 rounded-full">2026</span>
            </div>
          </motion.div>
          
          {/* Project Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative md:mt-24"
          >
            <div className="aspect-video rounded-3xl overflow-hidden bg-surface-container mb-8 relative border border-outline-variant/10 shadow-2xl">
               <img src="/images/Beavaskweb - Google Chrome 9.06.2025 12_07_38.png" alt="Beavask Task Manager" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <a href="https://github.com/ErdemKoray/Beavask" target="_blank" rel="noreferrer" className="bg-on-secondary text-secondary w-16 h-16 rounded-full flex items-center justify-center font-bold shadow-xl">{t.works.view}</a>
              </div>
               <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-[10px] font-label uppercase tracking-widest text-on-surface">Angular</span>
                <span className="px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-[10px] font-label uppercase tracking-widest text-on-surface">REST API</span>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-headline font-bold text-2xl group-hover:text-secondary transition-colors">Beavask - Task Manager</h3>
                <p className="text-on-surface-variant mt-2">{t.works.p2Desc}</p>
              </div>
              <span className="font-label text-xs border border-outline-variant px-3 py-1 rounded-full">2025</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
