import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
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

  return (
    <motion.div
      className="fixed inset-0 z-[9950] flex items-end sm:items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(17,17,9,0.88)', backdropFilter: 'blur(10px)' }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="relative w-full sm:max-w-xl border border-outline-variant/20 bg-surface-container"
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="px-6 py-6">

          {/* Numara + başlık */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span
                className="font-mono text-[9px] tracking-[.2em] uppercase block mb-1"
                style={{ color: 'rgba(220,216,192,0.35)' }}
              >
                {project.num}
              </span>
              <h2
                className="font-headline font-black uppercase tracking-[-1px]"
                style={{ fontSize: 'clamp(20px, 3vw, 28px)' }}
              >
                {t.works[project.titleKey]}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-outline-variant/20 text-on-surface-variant/40 hover:text-on-surface hover:border-outline/40 transition-all font-mono text-base mt-1"
            >
              ×
            </button>
          </div>

          {/* Tag'ler */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map(tag => (
              <span key={tag} className="font-mono text-[9px] tracking-[.12em] uppercase border border-outline-variant/15 px-2 py-0.5 text-on-surface-variant/40">
                {tag}
              </span>
            ))}
          </div>

          {/* Açıklama */}
          <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(220,216,192,0.65)' }}>
            {t.works[project.descKey]}
          </p>

          {/* Butonlar */}
          <div className="flex gap-2 pt-4 border-t border-outline-variant/10">
            {project.liveHref && (
              <a
                href={project.liveHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2 bg-primary text-on-primary font-mono text-[10px] font-bold tracking-[.12em] uppercase hover:opacity-80 transition-opacity"
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
                className="px-5 py-2 border border-on-surface/20 text-on-surface font-mono text-[10px] tracking-[.12em] uppercase hover:bg-on-surface/5 transition-colors"
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
