import { useRef } from 'react';
import { isFinePointer, prefersReducedMotion } from './hooks';

// Card with a mouse-following glow, a light 3D tilt and a running border beam on hover.
export default function InteractiveCard({ as = 'div', className = '', tilt = 4, children, ...rest }) {
  const Tag = as;
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || !isFinePointer()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
    if (tilt && !prefersReducedMotion()) {
      el.style.transform = `perspective(1100px) rotateX(${(0.5 - y) * tilt}deg) rotateY(${(x - 0.5) * tilt}deg)`;
    }
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = '';
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group beam-border spotlight transition-transform duration-300 ease-out will-change-transform ${className}`}
      {...rest}
    >
      <Corners />
      {children}
    </Tag>
  );
}

// Tiny bracket corners that slide in on hover.
function Corners() {
  const base = 'pointer-events-none absolute h-2.5 w-2.5 border-acc opacity-0 transition-all duration-300 group-hover:opacity-100';
  return (
    <>
      <span className={`${base} left-2 top-2 border-l border-t group-hover:left-3 group-hover:top-3`} />
      <span className={`${base} right-2 top-2 border-r border-t group-hover:right-3 group-hover:top-3`} />
      <span className={`${base} bottom-2 left-2 border-b border-l group-hover:bottom-3 group-hover:left-3`} />
      <span className={`${base} bottom-2 right-2 border-b border-r group-hover:bottom-3 group-hover:right-3`} />
    </>
  );
}
