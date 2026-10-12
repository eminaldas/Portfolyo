export default function BrandIcon({ icon, size = 18, color = 'currentColor', className = '' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color} className={className} aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}
