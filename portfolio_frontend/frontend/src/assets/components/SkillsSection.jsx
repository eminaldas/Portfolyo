import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const SKILLS = [
  {
    category: { en: 'Languages',      tr: 'Diller'           },
    items: ['Python', 'JavaScript', 'SQL', 'TypeScript'],
    level: 'Core',
  },
  {
    category: { en: 'Frameworks',     tr: 'Frameworks'       },
    items: ['React.js', 'FastAPI', 'Angular', 'Flask'],
    level: 'Core',
  },
  {
    category: { en: 'Database',       tr: 'Veritabanı'       },
    items: ['PostgreSQL', 'MongoDB', 'pgvector', 'Redis'],
    level: 'Proficient',
  },
  {
    category: { en: 'DevOps & Tools', tr: 'DevOps & Araçlar' },
    items: ['Docker', 'Celery', 'Git/GitHub'],
    level: 'Proficient',
  },
  {
    category: { en: 'Domain',         tr: 'Uzmanlık'         },
    items: ['NLP / BERT', 'REST API', 'IT Audit', 'Semantic Search'],
    level: 'Domain',
  },
];

const SkillsSection = () => {
  const { language, t } = useLanguage();

  return (
    <section id="skills" className="py-24 border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-end justify-between mb-12">
          <h2
            className="font-headline font-black uppercase tracking-[-2px]"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            {t.skills.title}
          </h2>
          <span className="font-mono text-[10px] tracking-[.2em] uppercase text-on-surface-variant/40 hidden sm:block">
            {t.skills.label}
          </span>
        </div>

        <div className="flex flex-col gap-[2px]">
          {SKILLS.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="group relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 border border-outline-variant/10 px-7 py-5 overflow-hidden transition-colors duration-300 hover:border-outline/25"
            >
              <div className="absolute inset-0 w-0 group-hover:w-full bg-on-surface/[0.025] transition-all duration-500 ease-out pointer-events-none" />
              <span className="font-mono text-[11px] tracking-[.15em] uppercase text-on-surface/60 sm:w-40 flex-shrink-0 relative z-10 font-bold">
                {row.category[language] ?? row.category.en}
              </span>
              <div className="flex flex-wrap gap-2 flex-1 relative z-10">
                {row.items.map(item => (
                  <span
                    key={item}
                    className="font-mono text-[11px] tracking-[.1em] uppercase border border-on-surface/20 px-3 py-1.5 text-on-surface/70 transition-all duration-200 hover:border-on-surface/50 hover:text-on-surface hover:bg-on-surface/5 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <span className="font-mono text-[10px] tracking-[.15em] uppercase text-on-surface/35 sm:ml-auto sm:pl-5 flex-shrink-0 relative z-10">
                {row.level}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
