import React, { useEffect, useRef } from 'react';

const WORDS = [
  'python', 'react', 'fastapi', 'nlp', 'docker', 'redis', 'celery',
  'postgresql', 'angular', 'problem-solver', 'full-stack', 'clean-code',
  'pgvector', 'flask', 'javascript', 'bert', 'git',
];

const FloatingWordsCanvas = () => {
  const canvasRef = useRef(null);
  const stateRef = useRef({ anim: null, particles: [], mouse: { x: -9999, y: -9999 } });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    state.particles = WORDS.map(word => ({
      word,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: 11 + Math.random() * 3,
      opacity: 0.1 + Math.random() * 0.1,
    }));

    const draw = () => {
      const { width: W, height: H } = canvas;
      const { mouse, particles } = state;
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(220,216,192,${0.04 * (1 - d / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120 && d > 0) {
          const f = ((120 - d) / 120) * 0.3;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -60)  p.x = W + 60;
        if (p.x > W+60) p.x = -60;
        if (p.y < -20)  p.y = H + 20;
        if (p.y > H+20) p.y = -20;

        const hd = Math.sqrt((p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2);
        const glow = hd < 80 ? (1 - hd / 80) * 0.35 : 0;

        ctx.font = `italic ${p.size}px Georgia, serif`;
        ctx.fillStyle = `rgba(220,216,192,${p.opacity + glow})`;
        ctx.fillText(p.word, p.x, p.y);
      });

      state.anim = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(state.anim);
      window.removeEventListener('resize', resize);
    };
  }, []);

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
