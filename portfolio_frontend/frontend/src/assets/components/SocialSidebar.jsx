import React from 'react';
import { motion } from 'framer-motion';

const SocialSidebar = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed bottom-0 left-8 z-40 hidden md:flex flex-col items-center gap-6"
    >
      <div className="flex flex-col gap-5 p-3 rounded-full bg-surface-container-high/60 backdrop-blur-md border border-outline-variant/30 shadow-2xl">
        <a href="https://github.com/eminaldas" target="_blank" rel="noreferrer" className="text-on-surface hover:text-primary transition-colors hover:-translate-y-1 transform duration-200 bg-surface-container p-2.5 rounded-full border border-outline-variant/40 hover:shadow-[0_0_15px_rgba(204,151,255,0.4)] flex items-center justify-center">
          <span className="material-symbols-outlined text-2xl" data-icon="code">code</span>
        </a>
        <a href="https://linkedin.com/in/muhammedeminaldas" target="_blank" rel="noreferrer" className="text-on-surface hover:text-secondary transition-colors hover:-translate-y-1 transform duration-200 bg-surface-container p-2.5 rounded-full border border-outline-variant/40 hover:shadow-[0_0_15px_rgba(58,223,250,0.4)] flex items-center justify-center">
          <span className="material-symbols-outlined text-2xl" data-icon="work">work</span>
        </a>
        <a href="mailto:eminaldas575@gmail.com" className="text-on-surface hover:text-tertiary transition-colors hover:-translate-y-1 transform duration-200 bg-surface-container p-2.5 rounded-full border border-outline-variant/40 hover:shadow-[0_0_15px_rgba(255,111,126,0.4)] flex items-center justify-center">
          <span className="material-symbols-outlined text-2xl" data-icon="mail">mail</span>
        </a>
      </div>
      <div className="w-px h-24 bg-gradient-to-b from-outline-variant/80 to-transparent mt-2"></div>
    </motion.div>
  );
};

export default SocialSidebar;
