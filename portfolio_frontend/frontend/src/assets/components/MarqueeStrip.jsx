import React from 'react';

const PHRASES = [
  'Pixel-Perfect Code',
  'Crafted, Not Built',
  'No Magic, Just Logic',
  'Build. Ship. Repeat.',
  'Audited & Optimized',
  'Prompt to Production',
  'AI-Driven, Human-Coded',
  'Systems That Scale',
  'Zero Downtime',
  'Live on Production',
  'Dockerized Life',
  'Data in Motion',
  'Secure by Design',
  'Refactor Everything',
  'Keep It Simple',
];

const SEP = <span className="mx-6 text-on-surface/20">·</span>;

const Row = ({ reverse = false, speed = 40 }) => (
  <div className="overflow-hidden whitespace-nowrap">
    <div
      style={{
        display: 'inline-flex',
        animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${speed}s linear infinite`,
        willChange: 'transform',
      }}
    >
      {[...PHRASES, ...PHRASES].map((p, i) => (
        <span key={i} className="inline-flex items-center">
          <span
            style={{
              fontFamily: i % 3 === 0
                ? "'Cormorant', Georgia, serif"
                : i % 3 === 1
                  ? "'IBM Plex Mono', monospace"
                  : "'Space Grotesk', sans-serif",
              fontStyle: i % 3 === 0 ? 'italic' : 'normal',
              fontWeight: i % 3 === 1 ? 400 : 600,
              fontSize: i % 3 === 0 ? 15 : 11,
              letterSpacing: i % 3 === 1 ? '0.12em' : '0.04em',
              textTransform: i % 3 === 1 ? 'uppercase' : 'none',
              color: 'rgba(220,216,192,0.35)',
            }}
          >
            {p}
          </span>
          {SEP}
        </span>
      ))}
    </div>
  </div>
);

const MarqueeStrip = () => (
  <div className="py-4 border-y border-on-surface/[0.07] bg-surface-container-low overflow-hidden select-none">
    <Row speed={45} />
    <div className="mt-2">
      <Row reverse speed={55} />
    </div>
  </div>
);

export default MarqueeStrip;
