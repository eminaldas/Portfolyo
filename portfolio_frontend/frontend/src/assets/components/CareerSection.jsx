import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const CareerItem = ({ item, scrollP, idx }) => {
  const s0 = idx === 0 ? 0.05 : 0.60;
  const s1 = idx === 0 ? 0.18 : 0.73;
  const s2 = idx === 0 ? 0.55 : 1.02;
  const s3 = idx === 0 ? 0.65 : 1.10;
  const dir = idx === 0 ? -100 : 100;

  const op = useTransform(scrollP, [s0, s1, s2, s3], [0, 1, 1, 0]);
  const x  = useTransform(scrollP, [s0, s1, s2, s3], [dir, 0, 0, -dir]);

  const yearOp = useTransform(scrollP, [s0 + 0.02, s1, s2, s3], [0, 0.06, 0.06, 0]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center max-w-7xl mx-auto px-8 w-full"
      style={{ opacity: op, x }}
    >
      {/* Büyük arka plan yıl */}
      <motion.span
        className="absolute select-none pointer-events-none font-headline font-black"
        style={{
          fontSize: 'clamp(120px, 22vw, 240px)',
          right: idx === 0 ? '3%' : 'auto', left: idx === 1 ? '3%' : 'auto',
          top: '50%', transform: 'translateY(-50%)',
          opacity: yearOp, color: '#dcd8c0', letterSpacing: '-6px',
        }}
      >
        {idx === 0 ? '2025' : '2024'}
      </motion.span>

      {/* İçerik */}
      <div className={`relative z-10 max-w-2xl ${idx === 1 ? 'ml-auto' : ''}`}>
        {/* Üst meta */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-[1px] bg-on-surface/30" />
          <span className="font-mono text-[10px] tracking-[.2em] uppercase text-on-surface-variant/45">
            {item.date}
          </span>
        </div>

        {/* Rol */}
        <h3
          className="font-headline font-black uppercase tracking-[-2px] text-on-surface mb-2"
          style={{ fontSize: 'clamp(26px, 4vw, 52px)' }}
        >
          {item.role}
        </h3>

        {/* Şirket */}
        <p
          className="mb-5"
          style={{
            fontFamily: "'Cormorant', Georgia, serif",
            fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(18px, 2.5vw, 26px)',
            color: 'rgba(220,216,192,0.50)',
          }}
        >
          Aras Kargo
        </p>

        {/* Açıklama */}
        <p className="text-on-surface-variant leading-relaxed max-w-xl" style={{ fontSize: 'clamp(14px, 1.5vw, 16px)' }}>
          {item.desc}
        </p>

        {/* Kullanılan teknolojiler etiketi */}
        {idx === 0 && (
          <div className="flex flex-wrap gap-1.5 mt-6">
            {['Python', 'FastAPI', 'React.js', 'PostgreSQL', 'Git'].map(tag => (
              <span key={tag} className="font-mono text-[9px] tracking-[.12em] uppercase border border-on-surface/18 px-2 py-1 text-on-surface-variant/40">
                {tag}
              </span>
            ))}
          </div>
        )}
        {idx === 1 && (
          <div className="flex flex-wrap gap-1.5 mt-6">
            {['Flask', 'MongoDB', 'REST API', 'Git'].map(tag => (
              <span key={tag} className="font-mono text-[9px] tracking-[.12em] uppercase border border-on-surface/18 px-2 py-1 text-on-surface-variant/40">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const CareerSection = () => {
  const { t } = useLanguage();
  const ref   = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const ITEMS = [
    { role: t.career.role1, desc: t.career.desc1, date: '03/2025 – 09/2025' },
    { role: t.career.role2, desc: t.career.desc2, date: '02/2024 – 08/2024' },
  ];

  const labelOp = useTransform(scrollYProgress, [0, 0.07, 0.50, 0.60], [0, 1, 1, 0]);

  return (
    <section ref={ref} id="career" style={{ height: '240vh' }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-surface-container border-y border-on-surface/[0.07]">

        <motion.div className="absolute top-10 left-8 z-10" style={{ opacity: labelOp }}>
          <span className="font-mono text-[10px] tracking-[.3em] uppercase text-on-surface-variant/40 mr-3">
            {t.career.label}
          </span>
          <span className="font-headline font-black uppercase tracking-[-2px] text-on-surface"
            style={{ fontSize: 'clamp(18px, 3vw, 32px)' }}>
            {t.career.title1}
          </span>
        </motion.div>

        {ITEMS.map((item, i) => (
          <CareerItem key={i} item={item} scrollP={scrollYProgress} idx={i} />
        ))}
      </div>
    </section>
  );
};

export default CareerSection;
