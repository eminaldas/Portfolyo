import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import GithubContributions from './GithubContributions';

const BentoStats = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
  };
  // Her kart sırasıyla farklı yönden gelir
  const dirs = [
    { x: -80, y: 0  },  // 1. kart: soldan
    { x:  60, y: 0  },  // 2. kart: sağdan
    { x:  0,  y: -50 }, // 3. kart: yukarıdan
    { x:  80, y: 0  },  // 4. kart: sağdan
  ];
  const itemVariants = {
    hidden: (i) => ({ opacity: 0, ...dirs[i % dirs.length] }),
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="tech" className="py-32 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-[2px]"
        >
          {/* Eğitim — sol, geniş */}
          <motion.div
            variants={itemVariants} custom={0}
            className="md:col-span-2 bg-surface-container p-10 flex flex-col justify-between border border-outline-variant/10 hover:border-outline/25 transition-colors"
          >
            <div>
              <span className="font-mono text-[10px] tracking-[.25em] uppercase text-on-surface-variant/40">{t.bento.eduLabel}</span>
              <h3 className="font-headline font-bold text-3xl md:text-4xl mt-4 leading-tight tracking-[-1px]">{t.bento.eduTitle}</h3>
              <p className="font-body text-on-surface-variant mt-4 text-lg max-w-sm">{t.bento.eduDesc}</p>
            </div>
            <div className="flex gap-2 mt-8">
              <span className="px-4 py-1.5 bg-surface-container-high font-mono text-[10px] tracking-[.1em] uppercase">2022 – 2026</span>
              <span className="px-4 py-1.5 bg-surface-container-high text-on-surface font-mono text-[10px] tracking-[.1em] uppercase">BEYKOZ ÜNİVERSİTESİ</span>
            </div>
          </motion.div>

          {/* İş deneyimi — sağ */}
          <motion.div
            variants={itemVariants} custom={1}
            className="bg-surface-container-high p-8 flex flex-col justify-between border border-outline-variant/10"
          >
            <div>
              <span className="font-mono text-[10px] tracking-[.25em] uppercase text-on-surface-variant/40">{t.bento.workLabel}</span>
              <div className="mt-4">
                <span className="font-headline font-bold text-3xl">Aras Kargo</span>
              </div>
              <p className="font-mono text-[10px] tracking-[.1em] uppercase text-on-surface-variant/60 mt-2">{t.bento.workRole}</p>
            </div>
            <div className="mt-6 pt-6 border-t border-outline-variant/10">
              <span className="font-mono text-[10px] tracking-[.25em] uppercase text-on-surface-variant/40 block mb-2">{t.bento.techLabel}</span>
              <div className="flex flex-wrap gap-1.5">
                {['Python', 'React', 'FastAPI', 'PostgreSQL'].map(tech => (
                  <span key={tech} className="font-mono text-[9px] tracking-[.1em] uppercase border border-outline-variant/20 px-2 py-1 text-on-surface-variant/60">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* GitHub — tam genişlik */}
          <motion.div
            variants={itemVariants} custom={2}
            className="md:col-span-3 bg-surface-container p-6 flex flex-col border border-outline-variant/10 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] tracking-[.25em] uppercase text-on-surface-variant/40">
                GitHub Katkıları
              </span>
              <a
                href="https://github.com/eminaldas"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[9px] tracking-[.15em] uppercase text-on-surface-variant/45 hover:text-on-surface transition-colors"
              >
                @eminaldas ↗
              </a>
            </div>
            <GithubContributions username="eminaldas" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoStats;
