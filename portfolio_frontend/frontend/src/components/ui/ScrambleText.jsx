import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './hooks';

const GLYPHS = '01<>/\\{}[]#$%&*+=?ABCDEFGHIJKLMNOPRSTUVYZ';

// "Decodes" text from random glyphs into the final string, left to right.
export default function ScrambleText({ text, start = true, delay = 0, duration = 900, className, as = 'span' }) {
  const Tag = as;
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!start) {
      el.textContent = text.replace(/\S/g, ' ');
      return;
    }
    if (prefersReducedMotion()) {
      el.textContent = text;
      return;
    }
    let raf;
    let t0;
    const tick = (ts) => {
      if (!t0) t0 = ts + delay;
      const p = Math.min(Math.max((ts - t0) / duration, 0), 1);
      const revealed = Math.floor(p * text.length);
      let out = '';
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (i < revealed || ch === ' ') out += ch;
        else if (ts < t0) out += ' ';
        else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, start, delay, duration]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text}
    </Tag>
  );
}
