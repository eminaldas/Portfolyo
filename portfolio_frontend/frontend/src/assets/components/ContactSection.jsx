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
            <button className="group relative inline-flex items-center gap-4 bg-primary text-on-primary px-10 py-5 rounded-xl font-headline font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-95" type="submit">
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
                    <span className="material-symbols-outlined text-primary p-2 bg-surface-container-high rounded-lg group-hover:bg-primary group-hover:text-on-primary transition-all" data-icon="alternate_email">alternate_email</span>
                    <span className="font-body text-sm">eminaldas575@gmail.com</span>
                  </a>
                </li>
                <li>
                  <div className="group flex items-center gap-3 text-on-surface-variant hover:text-on-background transition-colors">
                    <span className="material-symbols-outlined text-primary p-2 bg-surface-container-high rounded-lg group-hover:bg-primary group-hover:text-on-primary transition-all" data-icon="distance">distance</span>
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
                    <span className="material-symbols-outlined text-secondary p-2 bg-surface-container-high rounded-lg group-hover:bg-secondary group-hover:text-on-secondary transition-all" data-icon="work">work</span>
                    <span className="font-body text-sm">LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a className="group flex items-center gap-3 text-on-surface-variant hover:text-on-background transition-colors" href="https://github.com/eminaldas" target="_blank" rel="noreferrer">
                    <span className="material-symbols-outlined text-secondary p-2 bg-surface-container-high rounded-lg group-hover:bg-secondary group-hover:text-on-secondary transition-all" data-icon="code">code</span>
                    <span className="font-body text-sm">GitHub</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative aspect-square md:aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent z-10"></div>
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Desk setup" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7ve5dbdE82S04quPiMsSGI1eTnJqwgu64XrPjKnjJcWeB1QIbm8XVzoJKpx7nYRaVjSKwJR-kmpPbbkVXPPD3kXOMJj92ZVsBwi43KPknEUGH3Cq8k7Ew0FNnStWv5IpTCUlWTNR_FzekGTeTgQII5QOvil0EZ4eqn65rs8qMBTehNBPXwtvHfea4f-GTSX_rrHv1MBLW5xdhr5s_cCx5oBBhFWVTHwGQSyYZen0a5imQIeu5c_d287omSm6XWl5atjFw9Yn7o6Bm"/>
            <div className="absolute bottom-8 left-8 z-20">
              <div className="flex items-center gap-3 px-4 py-2 bg-[#0c1326]/60 backdrop-blur-xl rounded-full border border-white/5">
                <span className="material-symbols-outlined text-primary text-sm" data-icon="fiber_manual_record">fiber_manual_record</span>
                <span className="text-xs font-label uppercase tracking-widest text-slate-200">{t.contact.availability}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default ContactSection;
