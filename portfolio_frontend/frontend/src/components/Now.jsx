import { useLanguage } from '../i18n/LanguageContext';
import InteractiveCard from './ui/InteractiveCard';
import SectionHeading from './ui/SectionHeading';

export default function Now() {
  const { t } = useLanguage();
  const n = t.now;
  return (
    <section id="now" className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-10 md:pb-32">
      <SectionHeading kicker={n.kicker} title={n.title} aside={n.updated} />
      <InteractiveCard tilt={1.5} className="relative rounded-sm border border-line bg-panel/90 font-mono backdrop-blur-sm">
        {n.rows.map(([k, v], i) => (
          <div key={k} className="grid gap-2 border-b border-line px-6 py-6 last:border-b-0 sm:grid-cols-[200px_1fr_auto] sm:items-center sm:gap-6">
            <span className="text-xs uppercase tracking-widest text-muted">
              <span className="text-acc">›</span> {k}
            </span>
            <span className="font-sans text-lg text-fg sm:text-2xl">{v}</span>
            <span className="text-xs text-acc">
              <span className="mr-2 inline-block h-2 w-2 animate-pulse-dot rounded-full bg-acc align-middle" style={{ animationDelay: `${i * 0.4}s` }} />
              running
            </span>
          </div>
        ))}
      </InteractiveCard>
    </section>
  );
}
