import { useLanguage } from '../i18n/LanguageContext';
import { useClock } from './ui/hooks';
import Socials from './ui/Socials';

export default function Footer() {
  const { t } = useLanguage();
  const clock = useClock();
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-5 py-6 font-mono text-xs text-muted sm:px-10">
        <span>© {new Date().getFullYear()} {t.footer.rights}</span>
        <Socials size={15} />
        <span>
          İstanbul <span className="text-acc">{clock}</span>
        </span>
      </div>
    </footer>
  );
}
