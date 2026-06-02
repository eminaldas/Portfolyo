import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
  const overlayRef  = useRef(null);
  const counterRef  = useRef(null);
  const labelRef    = useRef(null);
  const barFillRef  = useRef(null);
  const cornerTLRef = useRef(null);
  const cornerBRRef = useRef(null);

  useEffect(() => {
    const obj = { val: 0 };
    const tl = gsap.timeline();

    // Köşe dekorasyonları — fade in
    tl.fromTo(
      [cornerTLRef.current, cornerBRRef.current],
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' },
      0,
    );

    // Label fade in
    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      0.1,
    );

    // Sayaç 00 → 100
    tl.to(
      obj,
      {
        val: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          const v = Math.floor(obj.val);
          if (counterRef.current) counterRef.current.textContent = v;
          if (barFillRef.current) barFillRef.current.style.transform = `scaleX(${v / 100})`;
        },
      },
      0.2,
    );

    // 100'de kısa bekleme
    tl.to({}, { duration: 0.35 });

    // Sayaç + label yukarı çıkıp kaybolur
    tl.to(
      [counterRef.current, labelRef.current],
      { opacity: 0, y: -24, duration: 0.45, ease: 'power2.in', stagger: 0.06 },
    );

    // Tüm overlay fade out
    tl.to(
      overlayRef.current,
      { opacity: 0, duration: 0.55, ease: 'power2.inOut', onComplete },
    );

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: '#111109' }}
    >
      {/* Köşe dekorasyon — sol üst */}
      <div
        ref={cornerTLRef}
        className="absolute top-8 left-8 flex flex-col gap-1 opacity-0"
      >
        <div className="w-8 h-[1px]" style={{ background: 'rgba(220,216,192,0.2)' }} />
        <div className="w-[1px] h-8 ml-0" style={{ background: 'rgba(220,216,192,0.2)' }} />
      </div>

      {/* Köşe dekorasyon — sağ alt */}
      <div
        ref={cornerBRRef}
        className="absolute bottom-8 right-8 flex flex-col items-end gap-1 opacity-0"
      >
        <div className="w-[1px] h-8" style={{ background: 'rgba(220,216,192,0.2)' }} />
        <div className="w-8 h-[1px]" style={{ background: 'rgba(220,216,192,0.2)' }} />
      </div>

      {/* Merkez içerik */}
      <div className="flex flex-col items-center select-none">
        {/* Büyük sayı — Cormorant italic thin */}
        <span
          ref={counterRef}
          style={{
            fontFamily: "'Cormorant', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 200,
            fontSize: 'clamp(110px, 18vw, 192px)',
            color: '#dcd8c0',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
          }}
        >
          0
        </span>

        {/* Yüzde etiketi — mono */}
        <span
          ref={labelRef}
          className="opacity-0"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.28em',
            color: 'rgba(220,216,192,0.35)',
            textTransform: 'uppercase',
            marginTop: 16,
          }}
        >
          yükleniyor
        </span>
      </div>

      {/* Alt progress çizgisi */}
      <div
        className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden"
        style={{ background: 'rgba(220,216,192,0.08)' }}
      >
        <div
          ref={barFillRef}
          className="h-full w-full origin-left"
          style={{
            background: 'rgba(220,216,192,0.5)',
            transform: 'scaleX(0)',
            transition: 'none',
          }}
        />
      </div>

      {/* Sol taraf — site adı dikey */}
      <div
        className="absolute left-8 bottom-12 hidden sm:block"
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 9,
          letterSpacing: '0.25em',
          color: 'rgba(220,216,192,0.2)',
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
        }}
      >
        eminaldas.dev
      </div>
    </div>
  );
};

export default Preloader;
