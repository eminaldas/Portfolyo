import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const CareerSection = () => {
  const { t } = useLanguage();

  return (
    <section id="career" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-label text-primary tracking-[0.3em] uppercase mb-4 block text-sm">{t.career.label}</span>
          <h2 className="font-headline font-black text-5xl md:text-6xl tracking-tighter">{t.career.title1}</h2>
        </motion.div>

        <div className="relative border-l border-outline-variant/30 ml-4 md:ml-8 space-y-16 py-8">
          
          {/* Aras Kargo 2 */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative pl-8 md:pl-16"
          >
            <div className="absolute -left-3 top-2 w-6 h-6 rounded-full bg-surface-container-high border-2 border-primary flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
            
            <span className="font-label text-sm text-on-surface-variant font-bold uppercase tracking-widest">17/03/2025 - 17/09/2025</span>
            <h3 className="font-headline font-bold text-3xl mt-2 text-on-surface">{t.career.role1}</h3>
            <h4 className="font-body text-xl text-primary mt-1">Aras Kargo</h4>
            <p className="font-body text-on-surface-variant mt-4 max-w-2xl leading-relaxed">
              {t.career.desc1}
            </p>
          </motion.div>

          {/* Aras Kargo 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative pl-8 md:pl-16"
          >
            <div className="absolute -left-3 top-2 w-6 h-6 rounded-full bg-surface-container-high border-2 border-secondary flex items-center justify-center">
               <div className="w-2 h-2 rounded-full bg-secondary"></div>
            </div>
            
            <span className="font-label text-sm text-on-surface-variant font-bold uppercase tracking-widest">12/02/2024 - 01/08/2024</span>
            <h3 className="font-headline font-bold text-3xl mt-2 text-on-surface">{t.career.role2}</h3>
            <h4 className="font-body text-xl text-secondary mt-1">Aras Kargo</h4>
            <p className="font-body text-on-surface-variant mt-4 max-w-2xl leading-relaxed">
              {t.career.desc2}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CareerSection;
