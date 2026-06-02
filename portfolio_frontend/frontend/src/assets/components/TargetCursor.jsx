import React, { useEffect, useRef, useState } from 'react';

const TargetCursor = () => {
  const ringRef = useRef(null);
  const posRef  = useRef({ x: -200, y: -200 });
  const currRef = useRef({ x: -200, y: -200 });
  const animRef = useRef(null);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const onMove = e => { posRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);

    const on  = () => setHov(true);
    const off = () => setHov(false);
    const bind = () =>
      document.querySelectorAll('a,button,[data-hover]').forEach(el => {
        el.addEventListener('mouseenter', on);
        el.addEventListener('mouseleave', off);
      });
    bind();
    // re-bind when DOM changes (lazy)
    const mo = new MutationObserver(bind);
    mo.observe(document.body, { childList: true, subtree: true });

    const LERP = 0.10;
    const tick = () => {
      currRef.current.x += (posRef.current.x - currRef.current.x) * LERP;
      currRef.current.y += (posRef.current.y - currRef.current.y) * LERP;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${currRef.current.x}px, ${currRef.current.y}px)`;
      }
      animRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animRef.current);
      mo.disconnect();
    };
  }, []);

  const sz  = hov ? 54 : 34;
  const off = sz / 2;

  return (
    <div
      ref={ringRef}
      className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
      style={{
        width: sz, height: sz,
        marginLeft: -off, marginTop: -off,
        transition: 'width 0.22s ease, height 0.22s ease, margin 0.22s ease',
        willChange: 'transform',
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
        {/* Outer ring */}
        <circle cx="50" cy="50" r="44" fill="none"
          stroke="rgba(220,216,192,0.55)" strokeWidth={hov ? 1.2 : 1.5} />
        {/* Crosshair lines */}
        <line x1="50" y1="2"  x2="50" y2="30" stroke="rgba(220,216,192,0.4)" strokeWidth="1.2" />
        <line x1="50" y1="70" x2="50" y2="98" stroke="rgba(220,216,192,0.4)" strokeWidth="1.2" />
        <line x1="2"  y1="50" x2="30" y2="50" stroke="rgba(220,216,192,0.4)" strokeWidth="1.2" />
        <line x1="70" y1="50" x2="98" y2="50" stroke="rgba(220,216,192,0.4)" strokeWidth="1.2" />
        {/* Center dot */}
        <circle cx="50" cy="50" r={hov ? 2 : 3} fill="rgba(220,216,192,0.75)" />
        {/* Corner ticks when hovering */}
        {hov && <>
          <line x1="50" y1="2"  x2="50" y2="18" stroke="rgba(220,216,192,0.7)" strokeWidth="1.8" />
          <line x1="50" y1="82" x2="50" y2="98" stroke="rgba(220,216,192,0.7)" strokeWidth="1.8" />
          <line x1="2"  y1="50" x2="18" y2="50" stroke="rgba(220,216,192,0.7)" strokeWidth="1.8" />
          <line x1="82" y1="50" x2="98" y2="50" stroke="rgba(220,216,192,0.7)" strokeWidth="1.8" />
        </>}
      </svg>
    </div>
  );
};

export default TargetCursor;
