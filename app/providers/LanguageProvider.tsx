"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, Lang, Translations } from "@/lib/translations";

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "he",
  setLang: () => {},
  t: translations.he,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("he");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang;
    if (saved && translations[saved]) setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dir = translations[lang].dir;
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
