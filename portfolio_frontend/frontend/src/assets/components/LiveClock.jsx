import React, { useEffect, useRef } from 'react';

const LiveClock = () => {
  const ref = useRef(null);

  useEffect(() => {
    const tick = () => {
      if (!ref.current) return;
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      ref.current.textContent = `${hh} : ${mm} : ${ss}`;
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="fixed bottom-7 left-1/2 -translate-x-1/2 z-[9990] hidden md:block pointer-events-none select-none"
      style={{
        fontFamily: "'Cormorant', Georgia, serif",
        fontStyle: 'italic',
        fontWeight: 300,
        fontSize: 16,
        color: 'rgba(220,216,192,0.55)',
        letterSpacing: '0.04em',
      }}
    >
      <span ref={ref}>00 : 00 : 00</span>
    </div>
  );
};

export default LiveClock;
