import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import ProjectModal from './ProjectModal';

const PROJECTS = [
  {
    num: '001', year: '2026',
    titleKey: 'p1Title', descKey: 'p1Desc',
    tags: ['Python', 'FastAPI', 'BERTurk', 'Docker', 'Celery', 'Redis', 'pgvector'],
    live: 'nehaber.dev', liveHref: 'https://nehaber.dev',
    github: 'https://github.com/eminaldas/Fake-News-Detection-System',
    image: '/images/nehaber.png',
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
    image: '/images/beavask.png',
    badge: true, collapsible: false, extraDetails: [],
  },
];

const FeaturedWork = () => {
  const { t } = useLanguage();
  const [modalProject, setModalProject] = useState(null);

  return (
    <>
    {modalProject && <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />}
    <section id="works" className="py-24 bg-surface-container-low border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-[.3em] uppercase text-on-surface-variant/55 mb-3 block">
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
              className="group border border-outline-variant/10 hover:border-outline/25 transition-colors duration-300 relative overflow-hidden cursor-pointer"
              onClick={() => setModalProject(proj)}
            >
              <div className="absolute left-0 top-0 w-[3px] h-0 hover:h-full bg-primary transition-all duration-500 ease-out" />

              <div className="flex items-stretch">
                <div className="font-mono text-[11px] text-on-surface-variant/50 px-5 py-7 border-r border-outline-variant/10 flex items-start min-w-[56px]">
                  {proj.num}
                </div>

                <div className="flex-1 px-5 sm:px-8 py-7 min-w-0">
                  <div className="flex flex-wrap items-start justify-between mb-3 gap-3">
                    <h3 className="font-headline font-black text-lg sm:text-xl uppercase tracking-tight">
                      {t.works[proj.titleKey]}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {proj.live && (
                        <a
                          href={proj.liveHref}
                          target="_blank"
                          rel="noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="cursor-target flex items-center gap-1.5 font-mono text-[10px] tracking-[.15em] uppercase hover:opacity-75 transition-opacity"
                          style={{ color: '#dcd8c0' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#dcd8c0' }} />
                          {proj.live} ↗
                        </a>
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
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(220,216,192,0.65)' }}>{t.works[proj.descKey]}</p>
                </div>

                {/* Proje görseli — sadece md+ ekranlarda */}
                {proj.image && (
                  <div className="hidden md:block w-48 lg:w-64 border-l border-outline-variant/10 overflow-hidden flex-shrink-0 relative">
                    <img
                      src={proj.image}
                      alt={t.works[proj.titleKey]}
                      className="w-full h-full object-cover object-top opacity-60 group-hover:opacity-85 transition-opacity duration-500"
                      style={{ filter: 'grayscale(20%)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low/80 to-transparent" />
                  </div>
                )}

                <div className="px-4 sm:px-5 py-7 border-l border-outline-variant/10 flex flex-col items-end justify-between min-w-[56px]">
                  <span className="font-mono text-[11px] text-on-surface-variant/50">{proj.year}</span>
                  <span className="text-on-surface-variant/55 group-hover:text-on-surface/80 transition-colors text-lg">↗</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default FeaturedWork;
