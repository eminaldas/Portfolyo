

import React from 'react';

function Navbar() {
  return (
    <nav className="fixed  w-full top-0 z-50 animation-navbar">
      <div className="bg-white/50 backdrop-blur-sm w-full mx-auto px-4 sm:px-6 lg:px-8  border-b-2 border-[var(--color-50)] dark:border-[var(--color-800)]">
        <div className="flex justify-around h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-[var(--color-800)] dark:text-[var(--color-200)]">MyPortfolio</div>

          {/* Menu Items */}
          <div className="hidden md:flex space-x-6  font-normal">
            <a href="#about" 
            className="text-[var(--color-800)] hover:text-[var(--color-600)] font-normal transition
            dark:text-[var(--color-200)] dark:hover:text-[var(--color-300)]">Hakkımda</a>
            <a href="#projects" className="text-[var(--color-600)] hover:text-[var(--color-600)] font-normal transition
            dark:text-[var(--color-300)] dark:hover:text-[var(--color-400)]">Projeler</a>
            <a href="#contact" className="text-[var(--color-600)] hover:text-[var(--color-600)] font-normal transition
            dark:text-[var(--color-300)] dark:hover:text-[var(--color-400)]">İletişim</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
