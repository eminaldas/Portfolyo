import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { content } from './content';

const LanguageContext = createContext(null);

const initialLang = () => {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'tr' || saved === 'en') return saved;
  } catch {
    // storage blocked: fall through to the browser language
  }
  return navigator.language?.toLowerCase().startsWith('tr') ? 'tr' : 'en';
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === 'tr' ? 'en' : 'tr')), []);
  const value = useMemo(() => ({ lang, t: content[lang], toggle }), [lang, toggle]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);
