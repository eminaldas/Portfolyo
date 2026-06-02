import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const PROJECTS = [
  {
    num: '001', year: '2026',
    titleKey: 'p1Title', descKey: 'p1Desc',
    tags: ['Python', 'FastAPI', 'BERTurk', 'Docker', 'Celery', 'Redis', 'pgvector'],
    live: 'nehaber.dev', liveHref: 'https://nehaber.dev',
    github: 'https://github.com/eminaldas/Fake-News-Detection-System',
    badge: false, collapsible: true,
    extraDetails: [
      { label: 'Mimari',   value: 'FastAPI + Celery + Redis async pipeline'    },
      { label: 'NLP',      value: 'BERTurk + TF-IDF hibrit ensemble model'     },
      { label: 'Veritabanı', value: 'PostgreSQL + pgvector semantic search'    },
      { label: 'Deploy',   value: "Docker Compose, production'da canlı"        },
    ],
  },
  {
    num: '002', year: '2025',
    titleKey: 'p2Title', descKey: 'p2Desc',
    tags: ['Angular', 'TypeScript', 'REST API'],
    live: null, liveHref: null,
    github: 'https://github.com/ErdemKoray/Beavask',
    badge: true, collapsible: false, extraDetails: [],
  },
];

const FeaturedWork = () => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="works" className="py-24 bg-surface-container-low border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-[.3em] uppercase text-on-surface-variant/35 mb-3 block">
              {t.works.label}
            </span>
            <h2 className="font-headline font-black uppercase tracking-[-2px]"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
              {t.works.title}
            </h2>
          </div>
          <p className="sm:max-w-[180px] text-on-surface-variant text-sm sm:text-right leading-relaxed">
            {t.works.desc}
          </p>
        </div>

        <div className="flex flex-col gap-[2px]">
          {PROJECTS.map((proj, i) => (
            <motion.div
              key={proj.num}
              initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="border border-outline-variant/10 hover:border-outline/25 transition-colors duration-300 relative overflow-hidden"
              onClick={() => proj.collapsible && setExpanded(p => p === i ? null : i)}
              style={{ cursor: proj.collapsible ? 'pointer' : 'default' }}
            >
              <div className="absolute left-0 top-0 w-[3px] h-0 hover:h-full bg-primary transition-all duration-500 ease-out" />

              <div className="flex items-stretch">
                <div className="font-mono text-[11px] text-on-surface-variant/25 px-5 py-7 border-r border-outline-variant/10 flex items-start min-w-[56px]">
                  {proj.num}
                </div>

                <div className="flex-1 px-5 sm:px-8 py-7 min-w-0">
                  <div className="flex flex-wrap items-start justify-between mb-3 gap-3">
                    <h3 className="font-headline font-black text-lg sm:text-xl uppercase tracking-tight">
                      {t.works[proj.titleKey]}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {proj.live && (
                        <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[.15em] uppercase text-on-surface">
                          <span className="w-1.5 h-1.5 rounded-full bg-on-surface animate-pulse" />
                          {proj.live}
                        </span>
                      )}
                      {proj.badge && (
                        <span className="font-mono text-[9px] tracking-[.15em] uppercase border border-outline/30 px-2 py-0.5 text-on-surface-variant/60">
                          {t.works.award}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tags.map(tag => (
                      <span key={tag} className="font-mono text-[9px] tracking-[.12em] uppercase border border-outline-variant/15 px-2 py-1 text-on-surface-variant/45">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{t.works[proj.descKey]}</p>
                </div>

                <div className="px-4 sm:px-5 py-7 border-l border-outline-variant/10 flex flex-col items-end justify-between min-w-[56px]">
                  <span className="font-mono text-[11px] text-on-surface-variant/25">{proj.year}</span>
                  {proj.collapsible ? (
                    <span className="text-on-surface-variant/40 text-lg transition-transform duration-300"
                      style={{ transform: expanded === i ? 'rotate(45deg)' : 'none' }}>+</span>
                  ) : (
                    <a href={proj.github} target="_blank" rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-on-surface-variant/25 hover:text-on-surface hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 text-lg">
                      ↗
                    </a>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {proj.collapsible && expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-outline-variant/10 px-5 sm:px-8 py-6 bg-surface-container/50">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {proj.extraDetails.map(d => (
                          <div key={d.label} className="flex flex-col gap-1">
                            <span className="font-mono text-[9px] tracking-[.2em] uppercase text-on-surface-variant/40">{d.label}</span>
                            <span className="font-mono text-[11px] text-on-surface/70">{d.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <a href={proj.liveHref} target="_blank" rel="noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex items-center gap-2 px-5 py-2 bg-primary text-on-primary font-mono text-[10px] font-bold tracking-[.12em] uppercase hover:opacity-80 transition-opacity">
                          <span className="w-1.5 h-1.5 rounded-full bg-on-primary animate-pulse" />
                          Canlı Görüntüle ↗
                        </a>
                        <a href={proj.github} target="_blank" rel="noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="px-5 py-2 border border-on-surface/25 text-on-surface font-mono text-[10px] tracking-[.12em] uppercase hover:bg-on-surface/5 transition-colors">
                          GitHub ↗
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
