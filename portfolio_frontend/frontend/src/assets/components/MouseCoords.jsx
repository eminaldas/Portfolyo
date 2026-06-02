import React, { useEffect, useRef } from 'react';

const MouseCoords = () => {
  const xRef = useRef(null);
  const yRef = useRef(null);

  useEffect(() => {
    const onMove = e => {
      if (xRef.current) xRef.current.textContent = e.clientX;
      if (yRef.current) yRef.current.textContent = e.clientY;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      className="fixed bottom-7 right-8 z-[9990] hidden md:flex items-center gap-1 pointer-events-none select-none"
      style={{
        fontFamily: "'Cormorant', Georgia, serif",
        fontStyle: 'italic',
        fontWeight: 300,
        fontSize: 16,
        color: 'rgba(220,216,192,0.55)',
        letterSpacing: '0.04em',
      }}
    >
      <span>X</span>
      <span style={{ color: 'rgba(220,216,192,0.30)', margin: '0 2px' }}>:</span>
      <span ref={xRef}>0</span>
      <span style={{ color: 'rgba(220,216,192,0.30)', margin: '0 6px' }}>·</span>
      <span>Y</span>
      <span style={{ color: 'rgba(220,216,192,0.30)', margin: '0 2px' }}>:</span>
      <span ref={yRef}>0</span>
    </div>
  );
};

export default MouseCoords;
