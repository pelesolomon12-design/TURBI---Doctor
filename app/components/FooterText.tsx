"use client";

import { useLanguage } from "@/app/providers/LanguageProvider";

export default function FooterText() {
  const { t } = useLanguage();
  return (
    <>
      <p className="text-gray-600 text-sm mb-4">{t.footer.rights}</p>
      <div className="gold-divider max-w-32 mx-auto mb-4" />
      <p className="text-gray-700 text-xs">{t.footer.trust}</p>
    </>
  );
}
