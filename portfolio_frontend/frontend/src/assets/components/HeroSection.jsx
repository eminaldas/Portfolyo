import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 editorial-gradient overflow-hidden">
      <div className="absolute inset-0 grain-texture pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-8 z-10"
        >
          <span className="font-label text-primary tracking-[0.3em] uppercase mb-6 block text-sm">{t.hero.location}</span>
          <h1 className="font-headline font-black text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tighter mb-8 text-on-surface flex flex-col">
            <span>{t.hero.titleTop}</span> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-fixed to-secondary">{t.hero.titleBottom}</span>
          </h1>
          <p className="font-body text-xl md:text-2xl text-on-surface-variant max-w-xl mb-12 leading-relaxed">
            {t.hero.description}
          </p>
          <div className="flex flex-wrap gap-6">
            <a href="https://github.com/eminaldas" target="_blank" rel="noreferrer" className="px-8 py-4 bg-gradient-to-br from-primary to-primary-dim text-on-primary rounded-xl font-headline font-bold text-lg hover:scale-[1.02] transition-transform active:scale-95 text-center">
              {t.hero.github}
            </a>
            <a href="#contact" className="px-8 py-4 border border-outline-variant hover:bg-surface-container-high text-on-surface rounded-xl font-headline font-bold text-lg transition-colors text-center">
              {t.hero.connect}
            </a>
          </div>
        </motion.div>
        
        {/* Sleek Code Window replacing the empty space */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-4 relative hidden lg:block"
        >
          <div className="rounded-2xl overflow-hidden bg-[#0c1326]/80 backdrop-blur-xl border border-outline-variant/30 shadow-[0_20px_40px_rgba(204,151,255,0.1)] relative p-6 font-mono text-sm leading-relaxed text-secondary-fixed-dim">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-error-dim"></div>
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <div className="w-3 h-3 rounded-full bg-primary-fixed"></div>
            </div>
            <p><span className="text-tertiary">import</span> {'{'} Developer {'}'} <span className="text-tertiary">from</span> <span className="text-primary">'@eminaldas/core'</span>;</p>
            <br />
            <p><span className="text-tertiary">const</span> <span className="text-primary">profile</span> = {'{'}</p>
            <p className="ml-4">name: <span className="text-secondary">'Muhammed Emin Aldaş'</span>,</p>
            <p className="ml-4">role: <span className="text-secondary">'{t.hero.codeProfile.role}'</span>,</p>
            <p className="ml-4">location: <span className="text-secondary">'Istanbul, TR'</span>,</p>
            <p className="ml-4">status: <span className="text-secondary">'{t.hero.codeProfile.status}'</span></p>
            <p>{'};'}</p>
            <br />
            <p><span className="text-on-surface-variant italic">// {t.hero.codeProfile.comment}</span></p>
            <p>Developer.<span className="text-primary">initialize</span>(profile);</p>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default HeroSection;
