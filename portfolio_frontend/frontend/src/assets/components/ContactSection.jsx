import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-32 relative w-full border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-8 mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8"
          >
            <span className="font-label text-secondary tracking-[0.2em] text-xs font-semibold mb-6 block uppercase">{t.contact.label}</span>
            <h2 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-on-background leading-[0.95]">
              {t.contact.title1} <span className="text-primary italic">{t.contact.title2}</span>
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 pb-4"
          >
            <p className="text-on-surface-variant text-lg leading-relaxed font-light max-w-sm">
              {t.contact.desc}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <form action="#" className="space-y-8">
            <div className="group relative">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors" htmlFor="name">{t.contact.formName}</label>
              <input className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 text-xl font-body placeholder:text-outline-variant focus:ring-0 focus:border-primary transition-all outline-none" id="name" name="name" placeholder={t.contact.formPlaceholderName} type="text" />
            </div>
            <div className="group relative">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors" htmlFor="email">{t.contact.formEmail}</label>
              <input className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 text-xl font-body placeholder:text-outline-variant focus:ring-0 focus:border-primary transition-all outline-none" id="email" name="email" placeholder="john@example.com" type="email" />
            </div>
            <div className="group relative">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors" htmlFor="message">{t.contact.formMessage}</label>
              <textarea className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 text-xl font-body placeholder:text-outline-variant focus:ring-0 focus:border-primary transition-all outline-none resize-none" id="message" name="message" placeholder={t.contact.formPlaceholderMsg} rows="4"></textarea>
            </div>
            <button className="group relative inline-flex items-center gap-4 bg-primary text-on-primary px-10 py-5  font-headline font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-95" type="submit">
              <span className="relative z-10">{t.contact.sendBtn}</span>
              <span className="material-symbols-outlined relative z-10 transition-transform group-hover:translate-x-2" data-icon="arrow_forward">arrow_forward</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dim opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="font-headline text-xl font-bold">{t.contact.getInTouch}</h3>
              <ul className="space-y-4">
                <li>
                  <a className="group flex items-center gap-3 text-on-surface-variant hover:text-on-background transition-colors" href="mailto:eminaldas575@gmail.com">
                    <span className="material-symbols-outlined text-primary p-2 bg-surface-container-high  group-hover:bg-primary group-hover:text-on-primary transition-all" data-icon="alternate_email">alternate_email</span>
                    <span className="font-body text-sm">eminaldas575@gmail.com</span>
                  </a>
                </li>
                <li>
                  <div className="group flex items-center gap-3 text-on-surface-variant hover:text-on-background transition-colors">
                    <span className="material-symbols-outlined text-primary p-2 bg-surface-container-high  group-hover:bg-primary group-hover:text-on-primary transition-all" data-icon="distance">distance</span>
                    <span className="font-body text-sm">{t.hero.location}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-headline text-xl font-bold">{t.contact.aroundWeb}</h3>
              <ul className="space-y-4">
                <li>
                  <a className="group flex items-center gap-3 text-on-surface-variant hover:text-on-background transition-colors" href="https://linkedin.com/in/muhammedeminaldas" target="_blank" rel="noreferrer">
                    <span className="material-symbols-outlined text-secondary p-2 bg-surface-container-high  group-hover:bg-secondary group-hover:text-on-secondary transition-all" data-icon="work">work</span>
                    <span className="font-body text-sm">LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a className="group flex items-center gap-3 text-on-surface-variant hover:text-on-background transition-colors" href="https://github.com/eminaldas" target="_blank" rel="noreferrer">
                    <span className="material-symbols-outlined text-secondary p-2 bg-surface-container-high  group-hover:bg-secondary group-hover:text-on-secondary transition-all" data-icon="code">code</span>
                    <span className="font-body text-sm">GitHub</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Availability + info card */}
          <div className="border border-on-surface/15 p-8 flex flex-col gap-8 bg-surface-container">
            {/* Status */}
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-on-surface animate-pulse" />
              <span className="font-mono text-[11px] tracking-[.2em] uppercase text-on-surface/60">
                {t.contact.availability}
              </span>
            </div>

            {/* Big stat */}
            <div className="border-t border-on-surface/10 pt-8">
              <p className="font-mono text-[10px] tracking-[.25em] uppercase text-on-surface-variant/40 mb-4">
                Aras Kargo
              </p>
              <p className="font-headline font-black text-4xl tracking-[-1px] leading-tight text-on-surface">
                2+ yıl<br />kurumsal<br />deneyim
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {['Python', 'React', 'FastAPI', 'PostgreSQL', 'Docker'].map(tag => (
                <span
                  key={tag}
                  className="font-mono text-[9px] tracking-[.12em] uppercase border border-on-surface/15 px-2.5 py-1 text-on-surface/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default ContactSection;
