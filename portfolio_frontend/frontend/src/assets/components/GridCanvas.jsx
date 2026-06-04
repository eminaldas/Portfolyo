import React, { useEffect, useRef } from 'react';

const CELL = 40;
const FADE_MS = 1600;

const GridCanvas = () => {
  const canvasRef = useRef(null);
  const stateRef = useRef({ cells: new Map(), mouse: null, anim: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = e => {
      stateRef.current.mouse = { x: e.clientX, y: e.clientY };
      const key = `${Math.floor(e.clientX / CELL)},${Math.floor(e.clientY / CELL)}`;
      stateRef.current.cells.set(key, Date.now());
    };
    window.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      const { cells, mouse } = stateRef.current;

      // Fading trail cells
      cells.forEach((time, key) => {
        const age = now - time;
        if (age > FADE_MS) { cells.delete(key); return; }
        const alpha = (1 - age / FADE_MS) * 0.09;
        const [cx, cy] = key.split(',').map(Number);
        ctx.fillStyle = `rgba(180,168,136,${alpha})`;
        ctx.fillRect(cx * CELL + 1, cy * CELL + 1, CELL - 2, CELL - 2);
      });

      // Active cell under cursor — brighter
      if (mouse) {
        const cx = Math.floor(mouse.x / CELL);
        const cy = Math.floor(mouse.y / CELL);
        ctx.fillStyle = 'rgba(180,168,136,0.13)';
        ctx.fillRect(cx * CELL + 1, cy * CELL + 1, CELL - 2, CELL - 2);
      }

      stateRef.current.anim = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(stateRef.current.anim);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none hidden md:block"
      style={{ zIndex: 1 }}
    />
  );
};

export default GridCanvas;
