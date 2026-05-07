"use client";

import { useLanguage } from "@/app/providers/LanguageProvider";
import { Lang } from "@/lib/translations";

const langs: { code: Lang; label: string; flag: string }[] = [
  { code: "he", label: "עברית", flag: "🇮🇱" },
  { code: "ar", label: "العربية", flag: "🇮🇱" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-white bg-opacity-5 rounded-xl p-1">
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            lang === l.code
              ? "bg-amber-500 text-gray-900"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
