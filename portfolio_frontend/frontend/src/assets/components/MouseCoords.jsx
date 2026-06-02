import React, { useEffect, useRef } from 'react';

const MouseCoords = () => {
  const ref = useRef(null);

  useEffect(() => {
    const onMove = e => {
      if (ref.current) {
        ref.current.textContent = `${e.clientX} × ${e.clientY}`;
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      className="fixed bottom-8 right-8 z-[9990] hidden md:block pointer-events-none select-none"
    >
      <span
        ref={ref}
        style={{
          fontFamily: "'Cormorant', Georgia, serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 13,
          letterSpacing: '0.05em',
          color: 'rgba(220,216,192,0.28)',
        }}
      >
        0 × 0
      </span>
    </div>
  );
};

export default MouseCoords;
