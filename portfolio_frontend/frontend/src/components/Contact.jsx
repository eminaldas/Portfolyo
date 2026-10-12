import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { LINKS } from '../i18n/content';
import ScrambleText from './ui/ScrambleText';
import Socials from './ui/Socials';
import { useInView } from './ui/hooks';

// Keeps hyphenated words like "e-posta" on one line.
function NoBreakHyphens({ text }) {
  return text.split(/(\S+-\S+)/).map((part, i) =>
    i % 2 ? <span key={i} className="whitespace-nowrap">{part}</span> : part,
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const [copied, setCopied] = useState(false);
  const [ref, inView] = useInView(0.3);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${LINKS.email}`;
    }
  };

  return (
    <section id="contact" className="border-t border-line bg-bg/45">
      <div ref={ref} className="mx-auto max-w-[1440px] px-5 py-24 sm:px-10 md:py-36">
        <p className="font-mono text-[13px] text-acc">// {c.kicker}</p>
        <h2 className="mt-6 font-display text-[clamp(2.4rem,8vw,7.5rem)] font-bold uppercase leading-[1.02] tracking-[-0.03em]">
          <ScrambleText text={c.title1} start={inView} className="block" />
          <span className="my-1 inline-block bg-acc px-3 text-bg sm:px-4">
            <ScrambleText text={c.title2} start={inView} delay={300} />
          </span>
          <ScrambleText text={c.title3} start={inView} delay={600} className="text-outline block" />
        </h2>
        <p className="mt-10 max-w-xl text-base leading-relaxed text-muted">
          <NoBreakHyphens text={c.lead} />
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <a href={`mailto:${LINKS.email}`} data-magnetic className="cursor-target group flex flex-1 items-center justify-between gap-4 border border-line bg-panel/80 px-5 py-5 transition-colors hover:border-acc sm:max-w-xl">
            <span className="font-mono text-base break-all text-fg sm:text-xl">{LINKS.email}</span>
            <span className="text-2xl text-acc transition-transform group-hover:translate-x-1">→</span>
          </a>
          <button onClick={copy} data-magnetic className="cursor-target border border-line px-5 py-4 font-mono text-sm text-muted transition-colors hover:border-acc hover:text-acc">
            {copied ? c.copied : c.copy}
          </button>
          <a href={LINKS.cv} target="_blank" rel="noreferrer" data-magnetic className="cursor-target bg-acc px-5 py-4 text-center font-mono text-sm font-bold text-bg">
            {c.cv} ↓
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-6 font-mono text-sm">
          <Socials size={16} withHandle className="flex-wrap gap-x-6 gap-y-2" />
          <a href={LINKS.nehaber} target="_blank" rel="noreferrer" className="cursor-target text-muted hover:text-acc">nehaber.dev ↗</a>
        </div>
      </div>
    </section>
  );
}
