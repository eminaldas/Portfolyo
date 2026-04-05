import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed left-1/2 z-50 w-[92%] max-w-5xl transition-all duration-300 ${
        isScrolled 
          ? "top-6 rounded-2xl bg-surface-container/90 backdrop-blur-xl border border-primary/20 shadow-[0_8px_32px_rgba(204,151,255,0.15)] py-4" 
          : "top-8 bg-transparent border-transparent py-2"
      }`}
    >
      <div className="flex justify-between items-center px-8">
        <a href="#home" className="text-2xl font-black tracking-tighter text-on-background font-headline whitespace-nowrap hover:text-primary transition-colors">Emin Aldaş</a>
        <div className="hidden md:flex items-center gap-10 font-headline font-bold tracking-tight">
          <a className="text-on-background/90 hover:text-primary transition-colors duration-300" href="#works">{t.nav.works}</a>
          <a className="text-on-background/90 hover:text-primary transition-colors duration-300" href="#tech">{t.nav.tech}</a>
          <a className="text-on-background/90 hover:text-primary transition-colors duration-300" href="#about">{t.nav.about}</a>
          <a className="text-on-background/90 hover:text-primary transition-colors duration-300" href="#contact">{t.nav.contact}</a>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <button onClick={toggleTheme} className="text-on-background hover:text-primary transition-colors flex items-center justify-center p-1 md:p-2 rounded-full outline-none" title="Toggle theme">
            <span className="material-symbols-outlined text-xl">{isDark ? 'light_mode' : 'dark_mode'}</span>
          </button>
          <button onClick={toggleLanguage} className="font-bold font-label tracking-widest text-on-background hover:text-primary transition-colors text-xs uppercase px-2 py-1 outline-none">
            {language === 'en' ? 'TR' : 'EN'}
          </button>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="bg-gradient-to-r from-primary to-primary-dim text-on-primary px-6 py-2 rounded-xl font-headline font-bold hover:opacity-80 transition-all active:scale-95 duration-200 shadow-[0_0_15px_rgba(204,151,255,0.4)]">
            {t.nav.resume}
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
