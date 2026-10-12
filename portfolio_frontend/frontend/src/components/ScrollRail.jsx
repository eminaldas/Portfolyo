import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { isFinePointer } from './ui/hooks';

// Replaces the native scrollbar on desktop: a thin rail with a tick per section,
// a neon thumb you can drag, and the scroll percentage next to it.
export default function ScrollRail() {
  const { t } = useLanguage();
  const railRef = useRef(null);
  const [state, setState] = useState({ top: 0, size: 1, pct: 0 });
  const [ticks, setTicks] = useState([]);
  const [enabled] = useState(() => isFinePointer());
  const drag = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-scroll-rail');
    let raf = 0;
    const measure = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const size = Math.min(1, window.innerHeight / doc.scrollHeight);
      const p = max > 0 ? window.scrollY / max : 0;
      setState({ top: p * (1 - size), size, pct: Math.round(p * 100) });
      setTicks(
        t.nav
          .map((n) => document.getElementById(n.id))
          .filter(Boolean)
          .map((el) => ({ id: el.id, at: Math.min(1, (el.offsetTop / doc.scrollHeight) || 0) })),
      );
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.documentElement.classList.remove('has-scroll-rail');
    };
  }, [enabled, t.nav]);

  if (!enabled) return null;

  const scrollToRatio = (r) => {
    const doc = document.documentElement;
    window.scrollTo({ top: r * (doc.scrollHeight - window.innerHeight), behavior: 'instant' });
  };

  const onDown = (e) => {
    const rail = railRef.current.getBoundingClientRect();
    const thumbTop = rail.top + state.top * rail.height;
    const thumbH = state.size * rail.height;
    const onThumb = e.clientY >= thumbTop && e.clientY <= thumbTop + thumbH;
    drag.current = { grab: onThumb ? e.clientY - thumbTop : thumbH / 2, rail, thumbH };
    e.currentTarget.setPointerCapture(e.pointerId);
    onMove(e);
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const free = d.rail.height - d.thumbH;
    if (free <= 0) return;
    scrollToRatio(Math.min(1, Math.max(0, (e.clientY - d.rail.top - d.grab) / free)));
  };
  const onUp = () => {
    drag.current = null;
  };

  return (
    <div className="fixed bottom-3 right-1.5 top-[4.25rem] z-40 hidden w-2.5 md:block" aria-hidden="true">
      <div
        ref={railRef}
        className="absolute inset-0 cursor-pointer touch-none"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line-2" />
        {ticks.map((k) => (
          <span key={k.id} className="absolute left-0 h-px w-full bg-dim" style={{ top: `${k.at * 100}%` }} />
        ))}
        <span
          className="absolute left-0 w-full bg-acc shadow-[0_0_10px_var(--color-acc)]"
          style={{ top: `${state.top * 100}%`, height: `${state.size * 100}%`, minHeight: 24 }}
        />
      </div>
      <span
        className="pointer-events-none absolute right-4 -translate-y-1/2 font-mono text-[10px] tabular-nums text-acc"
        style={{ top: `${(state.top + state.size / 2) * 100}%` }}
      >
        {String(state.pct).padStart(2, '0')}%
      </span>
    </div>
  );
}
