import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Lang } from '../types';
import { t as translate, type DictKey } from '../i18n/translations';

type LangContextValue = {
  lang: Lang;
  t: (key: DictKey) => string;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

const LANG_KEY = 'laven-lang';

function readInitialLang(): Lang {
  try {
    const stored = window.localStorage.getItem(LANG_KEY);
    if (stored === 'ar' || stored === 'en') return stored;
  } catch {
    /* storage unavailable */
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try {
      window.localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* storage unavailable */
    }
  }, [lang]);

  const value: LangContextValue = {
    lang,
    t: (key: DictKey) => translate(lang, key),
    setLang: setLangState,
    toggleLang: () => setLangState((l) => (l === 'en' ? 'ar' : 'en')),
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
