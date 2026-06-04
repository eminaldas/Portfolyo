import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

// Beyaz (muted:false) elemanların kaçıncı sırada olduğunu bul
const getWhiteIndex = (lines, i) =>
  lines.slice(0, i + 1).filter(l => !l.muted).length - 1;
const getGreyIndex = (lines, i) =>
  lines.slice(0, i + 1).filter(l => l.muted).length - 1;

const ManifestoSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-surface-container-low border-y border-on-surface/[0.08]">
      <div className="w-full px-5 sm:px-10">

        {/* Label — cursor-target */}
        <motion.p
          className="cursor-target font-mono text-[10px] tracking-[.3em] uppercase text-on-surface-variant/40 mb-10 inline-block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t.manifesto.label}
        </motion.p>

        {/* Tüm satırlar iç içe akan, yaslanmış paragraf */}
        <div style={{ textAlign: 'justify', textJustify: 'inter-word', lineHeight: 1.15 }}>
          {t.manifesto.lines.map((line, i) => {
            // Beyazlar önce (düşük delay), griler sonra (yüksek delay)
            const wi = getWhiteIndex(t.manifesto.lines, i);
            const gi = getGreyIndex(t.manifesto.lines, i);
            const delay = line.muted
              ? 0.65 + gi * 0.12   // griler sonradan gelir
              : 0.05 + wi * 0.1;   // beyazlar önce

            return (
              <React.Fragment key={i}>
                <motion.span
                  className="cursor-target"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
                  style={{
                    display: 'inline',
                    fontFamily: line.serif
                      ? "'Cormorant', Georgia, serif"
                      : "'Space Grotesk', sans-serif",
                    fontSize: line.serif
                      ? 'clamp(20px, 3.8vw, 56px)'
                      : 'clamp(26px, 5.8vw, 76px)',
                    fontWeight: line.serif ? 300 : 900,
                    fontStyle: line.serif ? 'italic' : 'normal',
                    textTransform: line.serif ? 'none' : 'uppercase',
                    letterSpacing: line.serif ? '0.01em' : '-0.03em',
                    color: line.muted
                      ? 'rgba(220,216,192,0.32)'
                      : '#dcd8c0',
                    lineHeight: 1.1,
                  }}
                >
                  {line.text}
                </motion.span>
                {' '}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
