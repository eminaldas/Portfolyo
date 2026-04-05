import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto bg-background py-14 px-8 font-body text-sm tracking-wide">
      <div className="text-lg font-black text-on-background mb-6 md:mb-0 font-headline leading-loose pb-2">Emin Aldaş</div>
      <div className="text-on-surface-variant mb-6 md:mb-0">© 2026 Emin Aldaş. {t.footer.madeWith}</div>
      <div className="flex gap-8">
        <a className="text-on-surface-variant hover:text-primary transition-colors" href="https://github.com/eminaldas" target="_blank" rel="noreferrer">GitHub</a>
        <a className="text-on-surface-variant hover:text-secondary transition-colors" href="https://linkedin.com/in/muhammedeminaldas" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
