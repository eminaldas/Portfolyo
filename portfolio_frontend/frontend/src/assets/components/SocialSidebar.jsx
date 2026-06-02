import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';

const LINKS = [
  { icon: faGithub,     href: 'https://github.com/eminaldas',                  label: 'GitHub'    },
  { icon: faLinkedinIn, href: 'https://linkedin.com/in/muhammedeminaldas',       label: 'LinkedIn'  },
  { icon: faInstagram,  href: 'https://instagram.com/',                          label: 'Instagram' },
];

const SocialSidebar = () => (
  <motion.div
    initial={{ opacity: 0, x: -24 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
    className="fixed left-8 bottom-0 z-40 hidden md:flex flex-col items-center"
  >
    {/* Bordered icon stack — matches navbar panel style */}
    <div className="flex flex-col border border-on-surface/20 divide-y divide-on-surface/20">
      {LINKS.map(({ icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="cursor-target group flex items-center justify-center w-10 h-10 text-on-surface/40 hover:text-on-surface hover:bg-on-surface/5 transition-all duration-200"
        >
          <FontAwesomeIcon
            icon={icon}
            className="w-[15px] h-[15px] transition-transform duration-200 group-hover:-translate-y-[2px]"
          />
        </a>
      ))}
    </div>

    {/* Thin vertical line extending to bottom edge */}
    <div className="w-px flex-1 min-h-[80px] bg-gradient-to-b from-on-surface/20 to-transparent" />
  </motion.div>
);

export default SocialSidebar;
