import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { useLanguage } from '../../context/LanguageContext';

const CONTACTS = [
  { label: 'E-posta',  value: 'eminaldas575@gmail.com',       href: 'mailto:eminaldas575@gmail.com',                 faIcon: null,        symbol: '✉' },
  { label: 'GitHub',   value: '/eminaldas',                   href: 'https://github.com/eminaldas',                  faIcon: faGithub,    symbol: null },
  { label: 'LinkedIn', value: '/muhammedeminaldas',           href: 'https://linkedin.com/in/muhammedeminaldas',      faIcon: faLinkedinIn,symbol: null },
  { label: 'Konum',    value: 'İstanbul, Türkiye',            href: null,                                            faIcon: null,        symbol: '◎' },
];

const Card = ({ c, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
    className="cursor-target group border border-on-surface/15 p-8 flex flex-col items-center justify-between text-center gap-6
               hover:border-on-surface/40 hover:bg-on-surface/[0.03] transition-all duration-300"
    style={{ minHeight: 200 }}
  >
    {/* İkon — büyük, belirgin */}
    <div className="flex items-center justify-center w-12 h-12">
      {c.faIcon ? (
        <FontAwesomeIcon
          icon={c.faIcon}
          style={{ width: 28, height: 28, color: 'rgba(220,216,192,0.70)' }}
        />
      ) : (
        <span style={{ fontSize: 28, color: 'rgba(220,216,192,0.60)', lineHeight: 1 }}>{c.symbol}</span>
      )}
    </div>

    {/* Label + value */}
    <div className="flex flex-col items-center gap-2">
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'rgba(220,216,192,0.55)',
        }}
      >
        {c.label}
      </span>
      {/* Value — Cormorant italic */}
      <span
        style={{
          fontFamily: "'Cormorant', Georgia, serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(16px, 1.8vw, 22px)',
          color: '#dcd8c0',
          letterSpacing: '0.01em',
          lineHeight: 1.2,
        }}
      >
        {c.value}
      </span>
    </div>
  </motion.div>
);

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
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(220,216,192,0.40)',
              display: 'block',
              marginBottom: 24,
            }}
          >
            {t.contact.label}
          </span>

          {/* Başlık — title2 sağa yapışık */}
          <h2
            className="font-headline font-black tracking-[-3px] leading-[0.92] text-on-surface"
            style={{ fontSize: 'clamp(48px, 8vw, 108px)' }}
          >
            {t.contact.title1}
          </h2>
          <h2
            className="font-headline font-black tracking-[-3px] leading-[0.92] text-right"
            style={{ fontSize: 'clamp(48px, 8vw, 108px)' }}
          >
            <span
              style={{
                fontFamily: "'Cormorant', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 200,
                color: 'rgba(220,216,192,0.55)',
                letterSpacing: 0,
              }}
            >
              {t.contact.title2}
            </span>
          </h2>

          {/* Açıklama — Cormorant italic, ortalı */}
          <p
            className="mt-8 text-center mx-auto"
            style={{
              fontFamily: "'Cormorant', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(17px, 2vw, 24px)',
              color: 'rgba(220,216,192,0.60)',
              letterSpacing: '0.01em',
              lineHeight: 1.5,
              maxWidth: 500,
            }}
          >
            {t.contact.desc}
          </p>
        </motion.div>

        {/* 4 kart */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
          {CONTACTS.map((c, i) =>
            c.href ? (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                className="block"
              >
                <Card c={c} i={i} />
              </a>
            ) : (
              <Card key={c.label} c={c} i={i} />
            )
          )}
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
