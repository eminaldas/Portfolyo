import { MARQUEE } from '../data/stack';
import BrandIcon from './ui/BrandIcon';

// Two bands flowing in opposite directions. Logos sit to the left of each skill in neon,
// and switch to their brand color on hover.
export default function SkillMarquee() {
  const reversed = [...MARQUEE].reverse();
  return (
    <div className="relative overflow-hidden border-b border-line" aria-label="Skills">
      <Band items={MARQUEE} duration="55s" className="bg-bg/90 py-5 text-acc" iconColor="var(--color-acc)" />
      <Band items={reversed} duration="70s" reverse className="bg-acc py-3 text-bg" iconColor="var(--color-bg)" small />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}

function Band({ items, duration, reverse, className, iconColor, small }) {
  const loop = [...items, ...items];
  return (
    <div lang="en" className={`group flex overflow-hidden ${className}`}>
      <ul
        className="flex shrink-0 animate-marquee items-center gap-12 pr-12 group-hover:[animation-play-state:paused]"
        style={{ '--marquee-duration': duration, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {loop.map((s, i) => (
          <li key={i} className="flex shrink-0 items-center gap-3 font-mono font-bold uppercase tracking-[0.18em]" aria-hidden={i >= items.length}>
            <span className="skill-logo" style={{ '--brand': s.hex, '--base': iconColor }}>
              <BrandIcon icon={s} size={small ? 14 : 22} color="var(--logo-color)" />
            </span>
            <span className={small ? 'text-xs' : 'text-base sm:text-lg'}>{s.name}</span>
            <span className="opacity-50">◆</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
