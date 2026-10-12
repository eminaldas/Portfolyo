import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { LINKS } from '../i18n/content';

export default function Navbar() {
  const { t, lang, toggle } = useLanguage();
  const [active, setActive] = useState('hero');
  const [open, setOpen] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    const ids = t.nav.map((n) => n.id);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [t.nav]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/70 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 font-mono text-xs sm:px-10">
        <a href="#hero" className="cursor-target text-fg">
          emin@aldas<span className="text-acc">:~$</span>
        </a>

        <ul className="hidden h-14 items-stretch lg:flex">
          {t.nav.map((n, i) => (
            <li key={n.id} className="flex border-l border-line last:border-r">
              <a
                href={`#${n.id}`}
                className={`cursor-target flex items-center px-5 transition-colors ${
                  active === n.id ? 'bg-acc text-bg' : 'text-muted hover:text-fg'
                }`}
              >
                {String(i).padStart(2, '0')} {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button onClick={toggle} data-magnetic className="cursor-target text-muted hover:text-fg" aria-label="Change language">
            <span className={lang === 'tr' ? 'text-acc' : ''}>TR</span>/<span className={lang === 'en' ? 'text-acc' : ''}>EN</span>
          </button>
          <a href={LINKS.cv} target="_blank" rel="noreferrer" data-magnetic className="cursor-target hidden text-acc sm:inline-block">
            cv.pdf ↓
          </a>
          <button className="cursor-target text-fg lg:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu">
            {open ? '[×]' : '[≡]'}
          </button>
        </div>
      </nav>
      <div ref={barRef} className="h-px origin-left bg-acc" style={{ transform: 'scaleX(0)' }} />

      {open && (
        <ul className="border-t border-line bg-bg font-mono text-sm lg:hidden">
          {t.nav.map((n, i) => (
            <li key={n.id} className="border-b border-line">
              <a href={`#${n.id}`} onClick={() => setOpen(false)} className={`block px-5 py-4 ${active === n.id ? 'text-acc' : 'text-fg'}`}>
                {String(i).padStart(2, '0')} {n.label}
              </a>
            </li>
          ))}
          <li>
            <a href={LINKS.cv} target="_blank" rel="noreferrer" className="block px-5 py-4 text-acc">
              cv.pdf ↓
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
