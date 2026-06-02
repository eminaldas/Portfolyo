import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { useLanguage } from '../../context/LanguageContext';

const CONTACTS = [
  {
    num: '01',
    label: 'E-posta',
    value: 'eminaldas575@gmail.com',
    href: 'mailto:eminaldas575@gmail.com',
    faIcon: null,
    symbol: '✉',
  },
  {
    num: '02',
    label: 'GitHub',
    value: '/eminaldas',
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
    symbol: '◎',
  },
];

const Card = ({ c, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
    className="cursor-target group border border-on-surface/15 p-8 flex flex-col justify-between gap-8
               hover:border-on-surface/40 hover:bg-on-surface/[0.03] transition-all duration-300"
    style={{ minHeight: 200 }}
  >
    {/* Numara + ikon — üst satır */}
    <div className="flex items-start justify-between">
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(220,216,192,0.45)',
        }}
      >
        {c.num}
      </span>
      {c.faIcon ? (
        <FontAwesomeIcon icon={c.faIcon} className="w-4 h-4" style={{ color: 'rgba(220,216,192,0.45)' }} />
      ) : c.symbol ? (
        <span style={{ color: 'rgba(220,216,192,0.35)', fontSize: 15 }}>{c.symbol}</span>
      ) : null}
    </div>

    {/* Alt — label + value */}
    <div className="flex flex-col gap-2">
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(220,216,192,0.50)',
        }}
      >
        {c.label}
      </span>
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(14px, 1.6vw, 19px)',
          color: '#dcd8c0',
          letterSpacing: '-0.01em',
          lineHeight: 1.25,
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
          <h2
            className="font-headline font-black tracking-[-3px] leading-[0.92] text-on-surface"
            style={{ fontSize: 'clamp(48px, 8vw, 108px)' }}
          >
            {t.contact.title1}
            <span
              style={{
                fontFamily: "'Cormorant', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 200,
                color: 'rgba(220,216,192,0.55)',
                letterSpacing: 0,
              }}
            >
              {' '}{t.contact.title2}
            </span>
          </h2>
          <p
            className="mt-6 max-w-lg leading-relaxed"
            style={{ color: 'rgba(220,216,192,0.55)', fontSize: 'clamp(15px, 1.6vw, 18px)' }}
          >
            {t.contact.desc}
          </p>
        </motion.div>

        {/* 4 kart — tam eşit grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
          {CONTACTS.map((c, i) =>
            c.href ? (
              <a
                key={c.num}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                className="block"
              >
                <Card c={c} i={i} />
              </a>
            ) : (
              <Card key={c.num} c={c} i={i} />
            )
          )}
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
