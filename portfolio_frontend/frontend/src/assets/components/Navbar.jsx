

import React from 'react';

function Navbar() {
  return (
    <nav className="fixed w-full top-0 z-50 p-3">
      <div className="bg-zinc-600/30 backdrop-blur-md max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-2xl">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">MyPortfolio</div>

          {/* Menu Items */}
          <div className="hidden md:flex space-x-6 text-gray-600 font-medium">
            <a href="#about" className="text-emerald-50 hover:text-emerald-100 transition">Hakkımda</a>
            <a href="#projects" className="text-emerald-50 hover:text-emerald-100 transition">Projeler</a>
            <a href="#contact" className="text-emerald-50 hover:text-emerald-100 transition">İletişim</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
