import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { LINKS } from '../i18n/content';
import { prefersReducedMotion } from './ui/hooks';

const IMAGES = { nehaber: '/images/nehaber.png', beavask: '/images/beavask.png' };

// Slide-in panel with the full problem → approach → result story of one project.
export default function CaseStudy({ id, project: p, stack, labels, closeLabel, onClose }) {
  const panelRef = useRef(null);
  const backRef = useRef(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const d = prefersReducedMotion() ? 0 : 1;
    gsap.fromTo(backRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 * d });
    gsap.fromTo(panelRef.current, { xPercent: 100 }, { xPercent: 0, duration: 0.6 * d, ease: 'expo.out' });
    gsap.fromTo(
      panelRef.current.querySelectorAll('[data-reveal]'),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5 * d, stagger: 0.06, delay: 0.2 * d, ease: 'power3.out' },
    );
    panelRef.current.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label={p.name}>
      <div ref={backRef} className="absolute inset-0 bg-bg/80 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="absolute inset-y-0 right-0 w-full max-w-3xl overflow-y-auto border-l border-line bg-bg-2 outline-none"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-bg-2/90 px-6 py-4 font-mono text-xs backdrop-blur sm:px-10">
          <span className="text-muted">~/work/{id}</span>
          <button onClick={onClose} className="cursor-target text-acc hover:text-fg">
            [esc] {closeLabel}
          </button>
        </div>

        <div className="px-6 py-10 sm:px-10">
          <p data-reveal className="font-mono text-xs text-muted">
            {p.tag} · <span className="text-acc">{p.status}</span>
          </p>
          <h2 data-reveal className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl">
            {p.name}
          </h2>
          <p data-reveal className="mt-4 text-base leading-relaxed text-muted sm:text-[17px]">
            {p.summary}
          </p>

          {IMAGES[id] && (
            <div data-reveal className="mt-8 overflow-hidden border border-line">
              <img src={IMAGES[id]} alt={p.name} className="w-full" />
            </div>
          )}

          {p.metrics && (
            <div data-reveal className="mt-8 grid grid-cols-3 border border-line">
              {p.metrics.map(([v, k]) => (
                <div key={k} className="border-r border-line p-4 last:border-r-0">
                  <div className="font-display text-2xl font-bold text-acc sm:text-3xl">{v}</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">{k}</div>
                </div>
              ))}
            </div>
          )}

          <Block label={labels.problem} n="01">
            <p>{p.problem}</p>
          </Block>
          <Block label={labels.approach} n="02">
            <ol className="space-y-3">
              {p.approach.map((a, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-acc">{String(i + 1).padStart(2, '0')}</span>
                  <span>{a}</span>
                </li>
              ))}
            </ol>
          </Block>
          <Block label={labels.result} n="03">
            <p>{p.result}</p>
          </Block>
          <Block label={labels.learned} n="04">
            <p>{p.learned}</p>
          </Block>
          <Block label={labels.stack} n="05">
            <div className="flex flex-wrap gap-2">
              {stack.map((s) => (
                <span key={s} className="border border-line px-3 py-1 font-mono text-xs text-muted">
                  {s}
                </span>
              ))}
            </div>
          </Block>

          {p.links.length > 0 && (
            <div data-reveal className="mt-10 flex flex-wrap gap-3 font-mono text-sm">
              {p.links.map(([txt, key]) => (
                <a key={key} href={LINKS[key]} target="_blank" rel="noreferrer" className="cursor-target border border-line px-4 py-3 hover:border-acc hover:text-acc">
                  {txt}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Block({ label, n, children }) {
  return (
    <section data-reveal className="mt-10 grid gap-3 border-t border-line pt-6 sm:grid-cols-[150px_1fr]">
      <h3 className="font-mono text-xs uppercase tracking-widest text-acc">
        {n} — {label}
      </h3>
      <div className="leading-relaxed text-fg/90">{children}</div>
    </section>
  );
}
