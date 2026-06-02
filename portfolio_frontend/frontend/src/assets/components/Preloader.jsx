import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const obj = { val: 0 };
    const tl = gsap.timeline();

    tl.to(obj, {
      val: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.floor(obj.val)).padStart(2, '0');
        }
      },
    }).to(containerRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 0.8,
      ease: 'power3.inOut',
      delay: 0.15,
      onComplete,
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: '#111109',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      }}
    >
      <div className="flex items-end gap-1">
        <span
          ref={counterRef}
          className="font-mono text-7xl font-bold tabular-nums"
          style={{ color: '#dcd8c0' }}
        >
          00
        </span>
        <span className="font-mono text-3xl mb-3" style={{ color: 'rgba(220,216,192,0.35)' }}>%</span>
      </div>
      <div className="mt-5 w-20 h-[1px] relative overflow-hidden" style={{ background: 'rgba(220,216,192,0.15)' }}>
        <div className="scan-line-inner" />
      </div>
    </div>
  );
};

export default Preloader;
