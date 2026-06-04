import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const ProjectModal = ({ project, onClose }) => {
  const { t } = useLanguage();

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9950] flex items-end sm:items-center justify-center p-0 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0"
          style={{ background: 'rgba(17,17,9,0.88)', backdropFilter: 'blur(12px)' }}
          onClick={onClose}
        />

        {/* Panel */}
        <motion.div
          className="relative w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto border border-outline-variant/20 bg-surface-container"
          initial={{ y: 60, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Görsel */}
          {project.image && (
            <div className="relative w-full overflow-hidden" style={{ height: 260 }}>
              <img
                src={project.image}
                alt={t.works[project.titleKey]}
                className="w-full h-full object-cover object-top"
                style={{ filter: 'grayscale(15%)', opacity: 0.85 }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(26,26,20,1) 100%)' }}
              />
              {/* Proje numarası overlay */}
              <span
                className="absolute top-5 left-6"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  color: 'rgba(220,216,192,0.35)',
                }}
              >
                {project.num}
              </span>
            </div>
          )}

          {/* İçerik */}
          <div className="px-8 py-8">
            {/* Başlık + badge'ler */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <h2
                className="font-headline font-black uppercase tracking-[-1px]"
                style={{ fontSize: 'clamp(22px, 3.5vw, 36px)' }}
              >
                {t.works[project.titleKey]}
              </h2>
              <div className="flex items-center gap-2 flex-shrink-0">
                {project.live && (
                  <a
                    href={project.liveHref}
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-target flex items-center gap-1.5 font-mono text-[10px] tracking-[.15em] uppercase hover:opacity-75 transition-opacity"
                    style={{ color: '#dcd8c0' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#dcd8c0' }} />
                    {project.live} ↗
                  </a>
                )}
                {project.badge && (
                  <span className="font-mono text-[9px] tracking-[.15em] uppercase border border-outline/30 px-2 py-0.5 text-on-surface-variant/60">
                    {t.works.award}
                  </span>
                )}
              </div>
            </div>

            {/* Tag'ler */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="font-mono text-[9px] tracking-[.12em] uppercase border border-outline-variant/15 px-2 py-1 text-on-surface-variant/45">
                  {tag}
                </span>
              ))}
            </div>

            {/* Açıklama */}
            <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(220,216,192,0.70)' }}>
              {t.works[project.descKey]}
            </p>

            {/* Teknik detaylar */}
            {project.extraDetails?.length > 0 && (
              <div className="border-t border-outline-variant/10 pt-6 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {project.extraDetails.map(d => (
                    <div key={d.label} className="flex flex-col gap-1">
                      <span className="font-mono text-[9px] tracking-[.2em] uppercase text-on-surface-variant/35">
                        {d.label}
                      </span>
                      <span className="font-mono text-[11px] text-on-surface/75">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Butonlar */}
            <div className="flex flex-wrap gap-3">
              {project.liveHref && (
                <a
                  href={project.liveHref}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-target flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary font-mono text-[10px] font-bold tracking-[.12em] uppercase hover:opacity-80 transition-opacity"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-on-primary animate-pulse" />
                  Live ↗
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-target px-6 py-2.5 border border-on-surface/25 text-on-surface font-mono text-[10px] tracking-[.12em] uppercase hover:bg-on-surface/5 transition-colors"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </div>

          {/* Kapat butonu */}
          <button
            onClick={onClose}
            className="cursor-target absolute top-4 right-4 w-9 h-9 flex items-center justify-center border border-outline-variant/20 text-on-surface-variant/50 hover:text-on-surface hover:border-outline/40 transition-all font-mono text-lg"
          >
            ×
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
