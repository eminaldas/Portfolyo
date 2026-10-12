import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/LanguageContext';
import SectionHeading from './ui/SectionHeading';
import { prefersReducedMotion } from './ui/hooks';

gsap.registerPlugin(ScrollTrigger);

// Short, stable "commit hash" for each entry.
const hash = (s) => {
  let h = 2166136261;
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
};

export default function Experience() {
  const { t, lang } = useLanguage();
  const e = t.experience;
  const listRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: listRef.current, start: 'top 75%', end: 'bottom 60%', scrub: true } },
      );
      gsap.utils.toArray('[data-commit]').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
    }, listRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section id="experience" className="border-y border-line bg-bg/70 backdrop-blur-[2px]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-10 md:py-32">
        <SectionHeading kicker={e.kicker} title={e.title} />
        <ol ref={listRef} className="relative ml-2 sm:ml-4">
          <span className="absolute left-0 top-0 h-full w-px bg-line" />
          <span ref={lineRef} className="absolute left-0 top-0 h-full w-px origin-top bg-acc" />
          {e.items.map((it, i) => (
            <li key={it.role + it.date} data-commit className="cursor-target group relative pb-12 pl-8 last:pb-0 sm:pl-12">
              <span
                className={`absolute -left-[5px] top-1.5 h-[11px] w-[11px] rounded-full border-2 border-acc transition-colors group-hover:bg-acc ${i === 0 ? 'bg-acc' : 'bg-bg'}`}
              />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted">
                <span className="text-warn">commit {hash(it.role + it.date)}</span>
                <span>{it.date}</span>
                <span className="border border-line px-2 py-0.5 uppercase tracking-wider text-acc">{it.tag}</span>
              </div>
              <div className="mt-3 grid gap-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-10">
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight transition-colors group-hover:text-acc sm:text-2xl">{it.role}</h3>
                  <p className="mt-1 font-mono text-sm text-muted">@ {it.org}</p>
                </div>
                <p className="leading-relaxed text-muted">{it.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
