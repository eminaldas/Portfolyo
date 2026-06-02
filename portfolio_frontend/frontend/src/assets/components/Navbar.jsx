import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { num: '001', label: t.nav.works,   href: '#works'   },
    { num: '002', label: t.nav.skills,  href: '#skills'  },
    { num: '003', label: t.nav.about,   href: '#about'   },
    { num: '004', label: t.nav.contact, href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Desktop */}
      <nav
        className={`hidden sm:flex items-center justify-between px-10 py-4 transition-all duration-300 ${
          scrolled ? 'bg-background/90 backdrop-blur-xl border-b border-outline/10' : ''
        }`}
      >
        <a
          href="#home"
          className="font-headline font-black text-lg tracking-tight text-on-surface hover:opacity-70 transition-opacity"
        >
          Emin Aldaş
        </a>

        <div className="flex items-center gap-7 border border-outline/25 px-6 py-2 backdrop-blur-sm bg-background/10">
          {links.map(link => (
            <a
              key={link.num}
              href={link.href}
              className="font-mono text-[11px] tracking-[.14em] uppercase text-on-surface/60 hover:text-on-surface transition-colors"
            >
              <span className="text-on-surface/30 mr-[3px]">{link.num}/</span>
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 border border-outline/25 px-4 py-2 backdrop-blur-sm bg-background/10">
          <button
            onClick={toggleLanguage}
            className="font-mono text-[11px] tracking-[.14em] uppercase text-on-surface/55 hover:text-on-surface transition-colors"
          >
            {language === 'en' ? 'TR' : 'EN'}
          </button>
          <div className="w-[1px] h-4 bg-on-surface/20" />
          <a
            href="/images/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="bg-primary text-on-primary px-4 py-1.5 font-mono text-[10px] font-bold tracking-[.12em] uppercase hover:opacity-80 transition-opacity"
          >
            {t.nav.resume} ↗
          </a>
        </div>
      </nav>

      {/* Mobile */}
      <nav className="flex sm:hidden items-center justify-between px-6 py-4">
        <a href="#home" className="font-headline font-black text-base text-on-surface">
          Emin Aldaş
        </a>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="font-mono text-[11px] uppercase text-on-surface/60 border border-outline/25 px-3 py-2"
          >
            {language === 'en' ? 'TR' : 'EN'}
          </button>
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="flex flex-col justify-center items-center gap-1 w-10 h-10 border border-outline/25"
            aria-label="Toggle menu"
          >
            <span className={`block h-[1.5px] w-5 bg-on-surface transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`block h-[1.5px] w-5 bg-on-surface transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[1.5px] w-5 bg-on-surface transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="sm:hidden bg-background/95 backdrop-blur-xl border-b border-outline/15 px-6 py-4 flex flex-col gap-0">
          {links.map(link => (
            <a
              key={link.num}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-[12px] tracking-[.14em] uppercase text-on-surface/70 py-3 border-b border-outline/10 last:border-b-0"
            >
              <span className="text-on-surface/30 mr-1">{link.num}/</span>
              {link.label}
            </a>
          ))}
          <a
            href="/images/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] font-bold uppercase bg-primary text-on-primary px-4 py-3 text-center mt-3"
          >
            {t.nav.resume} ↗
          </a>
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;
