import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const outerRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const animRef = useRef(null);

  useEffect(() => {
    const onMove = e => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);

    const tick = () => {
      if (outerRef.current) {
        outerRef.current.style.transform =
          `translate(${pos.current.x - 7}px, ${pos.current.y - 7}px)`;
      }
      animRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    // hidden on touch devices — only shows where (pointer: fine) is true
    <div
      ref={outerRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] cursor-none hidden md:block"
      style={{
        width: 14,
        height: 14,
        border: '1.5px solid rgba(220,216,192,0.75)',
        background: 'rgba(180,168,136,0.1)',
        willChange: 'transform',
      }}
    />
  );
};

export default CustomCursor;
