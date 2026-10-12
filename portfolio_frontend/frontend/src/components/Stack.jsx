import { useLanguage } from '../i18n/LanguageContext';
import { STACK } from '../data/stack';
import BrandIcon from './ui/BrandIcon';
import InteractiveCard from './ui/InteractiveCard';
import SectionHeading from './ui/SectionHeading';

export default function Stack() {
  const { t } = useLanguage();
  const s = t.stack;
  return (
    <section id="stack" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-10 md:py-32">
      <SectionHeading kicker={s.kicker} title={s.title} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {s.groups.map((g, gi) => (
          <InteractiveCard key={g.name} tilt={6} className="relative rounded-sm border border-line bg-panel/90 p-6 backdrop-blur-sm">
            <p className="font-mono text-xs text-muted">module_{String(gi + 1).padStart(2, '0')}</p>
            <h3 className="mt-2 font-display text-xl font-bold">{g.name}</h3>
            <p className="mt-1 font-mono text-xs text-dim">{g.note}</p>
            <ul className="mt-6 space-y-3">
              {STACK[gi].map((item) => (
                <li key={item.name} className="cursor-target flex items-center gap-3 text-[15px]">
                  <span className="skill-logo" style={{ '--brand': item.hex, '--base': 'var(--color-acc)' }}>
                    <BrandIcon icon={item} size={18} color="var(--logo-color)" />
                  </span>
                  <span className="text-fg/90">{item.name}</span>
                </li>
              ))}
            </ul>
          </InteractiveCard>
        ))}
      </div>
    </section>
  );
}
