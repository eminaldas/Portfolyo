import { useEffect } from 'react';
import { gsap } from 'gsap';
import { isFinePointer, prefersReducedMotion } from './hooks';

// The point the background network is pulled toward (the nearest magnetic button).
// `pull` is 0 when the cursor is not near any button.
export const magnet = { x: 0, y: 0, pull: 0 };

const RADIUS = 110;
const MAX_SHIFT = 10;

// Elements with `data-magnetic` lean toward the cursor as it approaches.
export function useMagnets() {
  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const offsets = new WeakMap();
    let mx = -9999;
    let my = -9999;
    let raf = 0;

    const update = () => {
      raf = 0;
      // Only the nearest button leans toward the cursor, so neighbours never collide.
      let best = null;
      const els = document.querySelectorAll('[data-magnetic]');
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (!r.width) return;
        const off = offsets.get(el) || { x: 0, y: 0 };
        const cx = r.left + r.width / 2 - off.x;
        const cy = r.top + r.height / 2 - off.y;
        const dx = mx - cx;
        const dy = my - cy;
        // distance from the element's edge, not its centre
        const d = Math.hypot(Math.max(Math.abs(dx) - r.width / 2, 0), Math.max(Math.abs(dy) - r.height / 2, 0));
        if (d < RADIUS && (!best || d < best.d)) best = { el, cx, cy, dx, dy, d };
      });
      els.forEach((el) => {
        const off = offsets.get(el) || { x: 0, y: 0 };
        let x = 0;
        let y = 0;
        if (best && best.el === el) {
          const f = 1 - best.d / RADIUS;
          x = gsap.utils.clamp(-MAX_SHIFT, MAX_SHIFT, best.dx * 0.22 * f);
          y = gsap.utils.clamp(-MAX_SHIFT, MAX_SHIFT, best.dy * 0.3 * f);
          magnet.x = best.cx + x;
          magnet.y = best.cy + y;
          best.f = f;
        }
        if (x !== off.x || y !== off.y) {
          offsets.set(el, { x, y });
          gsap.to(el, { x, y, duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
        }
      });
      magnet.pull = best ? best.f : 0;
    };

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);
}
