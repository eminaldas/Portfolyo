import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../i18n/LanguageContext';
import { prefersReducedMotion } from './ui/hooks';
import { boot } from './ui/boot';

const SEGMENTS = 24;

// Boot screen: a 000 → 100 counter with "model loading" log lines, then the panels split open.
export default function Preloader({ onDone }) {
  const { t } = useLanguage();
  const rootRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const contentRef = useRef(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      boot.p = 1;
      boot.active = false;
      onDone();
      return;
    }
    boot.active = true;
    const counter = { v: 0 };
    const tl = gsap.timeline();
    tl.to(counter, {
      v: 100,
      duration: 2.1,
      ease: 'power2.inOut',
      onUpdate: () => {
        boot.p = counter.v / 100;
        setPct(Math.round(counter.v));
      },
    })
      .to({}, { duration: 0.25 })
      .to(contentRef.current, { opacity: 0, y: -20, duration: 0.35, ease: 'power2.in' })
      .to(topRef.current, { yPercent: -100, duration: 0.8, ease: 'expo.inOut' }, '<0.15')
      .to(bottomRef.current, { yPercent: 100, duration: 0.8, ease: 'expo.inOut' }, '<')
      .add(() => {
        boot.active = false;
        onDone();
      }, '-=0.45')
      .set(rootRef.current, { display: 'none' });
    return () => tl.kill();
  }, [onDone]);

  const lines = t.preloader.lines;
  const shown = Math.min(lines.length, Math.floor((pct / 100) * lines.length) + 1);
  const lit = Math.round((pct / 100) * SEGMENTS);

  return (
    // The panels and the text are separate layers so the background network
    // (raised to z-99 while booting) is drawn between them.
    <div ref={rootRef} aria-hidden="true">
      <div ref={topRef} className="fixed inset-x-0 top-0 z-[98] h-1/2 border-b border-line bg-bg" />
      <div ref={bottomRef} className="fixed inset-x-0 bottom-0 z-[98] h-1/2 bg-bg" />
      <div ref={contentRef} className="fixed inset-0 z-[100] flex h-full flex-col justify-between p-6 font-mono text-xs text-muted sm:p-10">
        <div className="flex justify-between">
          <span>emin@aldas<span className="text-acc">:~$</span> boot</span>
          <span>v2026.10</span>
        </div>

        <div className="mx-auto w-full max-w-xl">
          <div className="flex items-end justify-between">
            <span className="font-mono text-7xl font-bold tabular-nums text-fg sm:text-9xl">
              {String(pct).padStart(3, '0')}
            </span>
            <span className="mb-3 text-acc">%</span>
          </div>
          <div className="mt-5 flex gap-1">
            {Array.from({ length: SEGMENTS }, (_, i) => (
              <span key={i} className={`h-2 flex-1 transition-colors duration-150 ${i < lit ? 'bg-acc' : 'bg-line'}`} />
            ))}
          </div>
          <ul className="mt-6 space-y-1.5">
            {lines.slice(0, shown).map((l, i) => (
              <li key={l} className="flex justify-between">
                <span>
                  <span className="text-acc">›</span> {l}
                </span>
                <span className={i < shown - 1 || pct === 100 ? 'text-acc' : 'animate-blink'}>
                  {i < shown - 1 || pct === 100 ? 'ok' : '…'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between">
          <span>{pct === 100 ? t.preloader.ready : '...'}</span>
          <span>İstanbul, TR</span>
        </div>
      </div>
    </div>
  );
}
