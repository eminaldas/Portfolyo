import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { content } from './content';

const LanguageContext = createContext(null);

// Only an explicit TR/EN click is remembered; everyone else starts in English.
const STORAGE_KEY = 'site-lang';

const initialLang = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'tr' || saved === 'en') return saved;
  } catch {
    // storage blocked: use the default
  }
  return 'en';
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = useCallback(
    () =>
      setLang((l) => {
        const next = l === 'tr' ? 'en' : 'tr';
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // ignore
        }
        return next;
      }),
    [],
  );
  const value = useMemo(() => ({ lang, t: content[lang], toggle }), [lang, toggle]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);
