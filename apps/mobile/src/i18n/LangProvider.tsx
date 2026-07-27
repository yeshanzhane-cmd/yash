import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Lang, StringKey, t } from './strings';

type LangContextValue = {
  lang: Lang;
  isRTL: boolean;
  setLang: (lang: Lang) => void;
  t: (key: StringKey) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

/**
 * Layout mirroring is handled per-screen with `isRTL` rather than
 * `I18nManager.forceRTL`, which requires a native reload — not viable
 * inside a single Expo Go demo session switching languages live.
 */
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
  }, []);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      isRTL: lang === 'ar',
      setLang,
      t: (key: StringKey) => t(key, lang),
    }),
    [lang, setLang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
