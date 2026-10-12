import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './ui/hooks';
import { magnet } from './ui/magnet';

const ACC = [197, 248, 42];
const LINK_DIST = 150;
const MOUSE_DIST = 220;
const MAGNET_DIST = 320;

// Full-screen canvas: drifting nodes form a soft neural graph, signals travel along
// the edges, and nodes near the cursor link up to it.
export default function NeuralBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduced = prefersReducedMotion();
    let w = 0;
    let h = 0;
    let nodes = [];
    let pulses = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(110, Math.max(40, (w * h) / 16000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
      }));
      pulses = [];
    };

    const spawnPulse = () => {
      const a = nodes[(Math.random() * nodes.length) | 0];
      let best = null;
      let bestD = LINK_DIST;
      for (const b of nodes) {
        if (b === a) continue;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < bestD && d > 40) {
          bestD = d;
          best = b;
        }
      }
      if (best) pulses.push({ a, b: best, t: 0, speed: 0.012 + Math.random() * 0.012 });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const pull = magnet.pull;
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          // nodes drift toward a button the cursor is approaching
          if (pull > 0) {
            const d = Math.hypot(magnet.x - n.x, magnet.y - n.y);
            if (d < MAGNET_DIST && d > 24) {
              n.x += ((magnet.x - n.x) / d) * pull * 0.9;
              n.y += ((magnet.y - n.y) / d) * pull * 0.9;
            }
          }
          if (n.x < -20) n.x = w + 20;
          if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          if (n.y > h + 20) n.y = -20;
        }
      }

      // edges
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.16;
            ctx.strokeStyle = `rgba(233,237,230,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // links to cursor
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < MOUSE_DIST) {
          const alpha = (1 - md / MOUSE_DIST) * 0.55;
          ctx.strokeStyle = `rgba(${ACC.join(',')},${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // links to the button the network is being pulled toward
      if (pull > 0) {
        for (const n of nodes) {
          const d = Math.hypot(magnet.x - n.x, magnet.y - n.y);
          if (d < MAGNET_DIST) {
            ctx.strokeStyle = `rgba(${ACC.join(',')},${(1 - d / MAGNET_DIST) * 0.7 * pull})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(magnet.x, magnet.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const near = Math.hypot(n.x - mouse.x, n.y - mouse.y) < MOUSE_DIST;
        ctx.fillStyle = near ? `rgba(${ACC.join(',')},0.9)` : 'rgba(233,237,230,0.35)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? n.r + 0.8 : n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // signals travelling along edges
      if (!reduced) {
        if (pulses.length < 14 && Math.random() < 0.08) spawnPulse();
        pulses = pulses.filter((p) => p.t <= 1);
        for (const p of pulses) {
          p.t += p.speed;
          const x = p.a.x + (p.b.x - p.a.x) * p.t;
          const y = p.a.y + (p.b.y - p.a.y) * p.t;
          const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
          g.addColorStop(0, `rgba(${ACC.join(',')},0.95)`);
          g.addColorStop(1, `rgba(${ACC.join(',')},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.fill();
        }
        raf = requestAnimationFrame(draw);
      }
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (reduced) draw();
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={ref} className="absolute inset-0" />
      {/* faint grid + vignette */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)',
          backgroundSize: '96px 96px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, #000 20%, transparent 75%)',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_45%,color-mix(in_oklab,var(--color-bg)_70%,transparent)_100%)]" />
    </div>
  );
}
