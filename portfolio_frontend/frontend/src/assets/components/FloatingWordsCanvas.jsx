import React, { useEffect, useRef } from 'react';

const WORDS = [
  'python', 'react', 'fastapi', 'nlp', 'docker', 'redis', 'celery',
  'postgresql', 'angular', 'problem-solver', 'full-stack', 'clean-code',
  'pgvector', 'flask', 'javascript', 'bert', 'git',
];

const LEVELS = [
  'rgba(220,216,192,0.06)',
  'rgba(220,216,192,0.22)',
  'rgba(220,216,192,0.45)',
  'rgba(220,216,192,0.72)',
  'rgba(220,216,192,0.96)',
];

function drawArrow(ctx, x1, y1, x2, y2, opacity) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const headLen = 9;
  const col = `rgba(220,216,192,${opacity})`;

  // Line with dash pattern — daha zarif
  ctx.save();
  ctx.setLineDash([4, 6]);
  ctx.strokeStyle = col;
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.restore();

  // Solid arrowhead
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6));
  ctx.closePath(); ctx.fill();

  // Small circle at origin
  ctx.beginPath();
  ctx.arc(x1, y1, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = col;
  ctx.fill();
}

const FloatingWordsCanvas = ({ anchorsRef }) => {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ anim: null, particles: [], mouse: { x: -9999, y: -9999 }, ctx: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const state  = stateRef.current;
    state.ctx    = ctx;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // kelime genişliklerini ölç
      state.particles.forEach(p => {
        ctx.font = `italic ${p.size}px Georgia, serif`;
        p.textW  = ctx.measureText(p.word).width;
      });
    };

    // Parçacıkları oluştur — daha hızlı başlangıç hızı
    state.particles = WORDS.map(word => {
      const size = 11 + Math.random() * 4;
      ctx.font = `italic ${size}px Georgia, serif`;
      return {
        word,
        x:       Math.random() * (canvas.offsetWidth  || 800),
        y:       Math.random() * (canvas.offsetHeight || 600),
        vx:      (Math.random() - 0.5) * 1.6,          // önceki: 0.4
        vy:      (Math.random() - 0.5) * 1.6,
        size,
        textW:   ctx.measureText(word).width,
        opacity: 0.12 + Math.random() * 0.12,
        hitGlow: 0,   // çarpma parıltısı (0–1, zamanla söner)
      };
    });

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const { width: W, height: H } = canvas;
      const { mouse, particles }    = state;
      ctx.clearRect(0, 0, W, H);

      /* — Parçacıklar arası bağlantı çizgileri — */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(220,216,192,${0.045 * (1 - d / 150)})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }

      /* — Ok çizgileri (anchor → en yakın kelime) — */
      const anchors = anchorsRef?.current ?? [];
      const used    = new Set();
      anchors.forEach(anchor => {
        let nearest = null, minDist = Infinity;
        particles.forEach((p, idx) => {
          if (used.has(idx)) return;
          const d = Math.sqrt((p.x - anchor.x) ** 2 + (p.y - anchor.y) ** 2);
          if (d < minDist && d > 30) { minDist = d; nearest = idx; }
        });
        if (nearest !== null && minDist < 300) {
          used.add(nearest);
          const p = particles[nearest];
          drawArrow(ctx, anchor.x, anchor.y, p.x, p.y, 0.50);
        }
      });

      /* — Her parçacık — */
      particles.forEach(p => {
        const mx = mouse.x, my = mouse.y;

        /* Çarpışma — mouse kelimenin üstündeyse */
        const hx = mx - p.x;                      // fare x - kelimenin sol kenarı
        const hy = my - (p.y - p.size);           // fare y - kelimenin üst kenarı
        const inBoundsX = hx >= -6 && hx <= p.textW + 6;
        const inBoundsY = hy >= -4 && hy <= p.size + 4;

        if (inBoundsX && inBoundsY) {
          /* Rastgele yön + güçlü itme */
          const angle    = Math.random() * Math.PI * 2;
          const strength = 6 + Math.random() * 6;
          p.vx = Math.cos(angle) * strength;
          p.vy = Math.sin(angle) * strength;
          p.hitGlow = 1;
        }

        /* Yakındaki fare — soft repel (dışarıdan yaklaşınca) */
        const cx = p.x + p.textW / 2;
        const cy = p.y - p.size / 2;
        const dx = cx - mx;
        const dy = cy - my;
        const dd = Math.sqrt(dx * dx + dy * dy);
        if (dd < 100 && dd > 0) {
          const f = ((100 - dd) / 100) * 0.25;
          p.vx += (dx / dd) * f;
          p.vy += (dy / dd) * f;
        }

        /* Sönümleme — 0.985 (önceki: 0.97), yavaş yavaş durur */
        p.vx *= 0.985;
        p.vy *= 0.985;

        /* Min hız — tamamen durmasın */
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < 0.4) {
          const a = Math.random() * Math.PI * 2;
          p.vx += Math.cos(a) * 0.08;
          p.vy += Math.sin(a) * 0.08;
        }

        p.x += p.vx;
        p.y += p.vy;

        /* Sınır — wrap */
        if (p.x < -80)       p.x = W + 80;
        if (p.x > W + 80)    p.x = -80;
        if (p.y < -20)       p.y = H + 20;
        if (p.y > H + 20)    p.y = -20;

        /* Çarpma parıltısı solar */
        if (p.hitGlow > 0) p.hitGlow = Math.max(0, p.hitGlow - 0.025);

        /* Render */
        ctx.save();
        ctx.font      = `italic ${p.size}px Georgia, serif`;
        const alpha   = p.opacity + p.hitGlow * 0.55;
        ctx.fillStyle = `rgba(220,216,192,${Math.min(alpha, 1)})`;

        /* Çarpma anında hafif büyür */
        if (p.hitGlow > 0.1) {
          const s = 1 + p.hitGlow * 0.12;
          ctx.translate(p.x + p.textW / 2, p.y - p.size / 2);
          ctx.scale(s, s);
          ctx.fillText(p.word, -p.textW / 2, p.size / 2);
        } else {
          ctx.fillText(p.word, p.x, p.y);
        }
        ctx.restore();
      });

      state.anim = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(state.anim);
      window.removeEventListener('resize', resize);
    };
  }, [anchorsRef]);

  const onMouseMove = e => {
    const r = canvasRef.current.getBoundingClientRect();
    stateRef.current.mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const onMouseLeave = () => { stateRef.current.mouse = { x: -9999, y: -9999 }; };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    />
  );
};

export default FloatingWordsCanvas;
