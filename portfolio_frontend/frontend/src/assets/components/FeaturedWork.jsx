import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const PROJECTS = [
  {
    num: '001',
    titleKey: 'p1Title',
    descKey: 'p1Desc',
    tags: ['Python', 'FastAPI', 'BERTurk', 'Docker', 'Celery', 'Redis', 'pgvector'],
    year: '2026',
    live: 'nehaber.dev',
    liveHref: 'https://nehaber.dev',
    github: 'https://github.com/eminaldas/Fake-News-Detection-System',
    badge: false,
  },
  {
    num: '002',
    titleKey: 'p2Title',
    descKey: 'p2Desc',
    tags: ['Angular', 'TypeScript', 'REST API'],
    year: '2025',
    live: null,
    liveHref: null,
    github: 'https://github.com/ErdemKoray/Beavask',
    badge: true,
  },
];

const FeaturedWork = () => {
  const { t } = useLanguage();

  return (
    <section id="works" className="py-24 bg-surface-container-low border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-[.3em] uppercase text-on-surface-variant/35 mb-3 block">
              {t.works.label}
            </span>
            <h2
              className="font-headline font-black uppercase tracking-[-2px]"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            >
              {t.works.title}
            </h2>
          </div>
          <p className="sm:max-w-[180px] text-on-surface-variant text-sm sm:text-right leading-relaxed">
            {t.works.desc}
          </p>
        </div>

        <div className="flex flex-col gap-[2px]">
          {PROJECTS.map((proj, i) => (
            <motion.a
              key={proj.num}
              href={proj.github}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex items-stretch border border-outline-variant/10 hover:border-outline/25 transition-colors duration-300 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 w-[3px] h-0 group-hover:h-full bg-primary transition-all duration-500 ease-out" />

              <div className="font-mono text-[11px] text-on-surface-variant/25 px-5 py-7 border-r border-outline-variant/10 flex items-start min-w-[60px]">
                {proj.num}
              </div>

              <div className="flex-1 px-8 py-7">
                <div className="flex flex-wrap items-start justify-between mb-3 gap-3">
                  <h3 className="font-headline font-black text-xl uppercase tracking-tight group-hover:text-on-surface transition-colors">
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
                    <span
                      key={tag}
                      className="font-mono text-[9px] tracking-[.12em] uppercase border border-outline-variant/15 px-2 py-1 text-on-surface-variant/45"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{t.works[proj.descKey]}</p>
              </div>

              <div className="px-5 py-7 border-l border-outline-variant/10 flex flex-col items-end justify-between min-w-[70px]">
                <span className="font-mono text-[11px] text-on-surface-variant/25">{proj.year}</span>
                <span className="text-on-surface-variant/25 group-hover:text-on-surface group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-lg">
                  ↗
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
