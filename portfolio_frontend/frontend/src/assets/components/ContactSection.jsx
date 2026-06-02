import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useLanguage } from '../../context/LanguageContext';

const CONTACTS = [
  {
    num: '01',
    label: 'E-posta',
    value: 'eminaldas575@gmail.com',
    href: 'mailto:eminaldas575@gmail.com',
    icon: null,
    mono: true,
  },
  {
    num: '02',
    label: 'GitHub',
    value: 'github.com/eminaldas',
    href: 'https://github.com/eminaldas',
    faIcon: faGithub,
  },
  {
    num: '03',
    label: 'LinkedIn',
    value: '/muhammedeminaldas',
    href: 'https://linkedin.com/in/muhammedeminaldas',
    faIcon: faLinkedinIn,
  },
  {
    num: '04',
    label: 'Konum',
    value: 'İstanbul, Türkiye',
    href: null,
  },
];

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-32 relative w-full border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-8">

        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="font-mono text-[10px] tracking-[.3em] uppercase text-on-surface-variant/40 mb-6 block">
            {t.contact.label}
          </span>
          <h2 className="font-headline font-black tracking-[-3px] leading-[0.92] text-on-surface"
            style={{ fontSize: 'clamp(48px, 8vw, 108px)' }}>
            {t.contact.title1}
            <span
              style={{ fontFamily: "'Cormorant', Georgia, serif", fontStyle: 'italic', fontWeight: 200, color: 'rgba(220,216,192,0.55)' }}
            >
              {' '}{t.contact.title2}
            </span>
          </h2>
          <p className="font-body text-on-surface-variant mt-6 max-w-lg leading-relaxed text-lg">
            {t.contact.desc}
          </p>
        </motion.div>

        {/* İletişim grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
          {CONTACTS.map((c, i) => {
            const Inner = (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                className="cursor-target group border border-on-surface/10 p-8 flex flex-col justify-between gap-6 hover:border-on-surface/30 hover:bg-on-surface/[0.03] transition-all duration-300 min-h-[180px]"
              >
                {/* Numara + ikon */}
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] tracking-[.25em] uppercase text-on-surface-variant/30">
                    {c.num}
                  </span>
                  {c.faIcon && (
                    <FontAwesomeIcon
                      icon={c.faIcon}
                      className="w-4 h-4 text-on-surface/25 group-hover:text-on-surface/60 transition-colors"
                    />
                  )}
                </div>

                {/* İçerik */}
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] tracking-[.2em] uppercase text-on-surface-variant/40">
                    {c.label}
                  </span>
                  <span
                    className="font-headline font-bold text-on-surface group-hover:text-on-surface transition-colors leading-tight"
                    style={{ fontSize: 'clamp(14px, 1.8vw, 20px)' }}
                  >
                    {c.value}
                  </span>
                </div>

                {/* Link oku */}
                {c.href && (
                  <span className="font-mono text-[9px] tracking-[.15em] uppercase text-on-surface-variant/25 group-hover:text-on-surface/50 transition-colors self-end">
                    ↗
                  </span>
                )}
              </motion.div>
            );

            return c.href ? (
              <a
                key={c.num}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                {Inner}
              </a>
            ) : (
              <div key={c.num}>{Inner}</div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
