"use client";

import Link from "next/link";
import { useLanguage } from "@/app/providers/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import LogoImage from "./LogoImage";

export default function NavClient() {
  const { t } = useLanguage();
  return (
    <header className="fixed top-0 w-full z-50 h-24 bg-[#0d1117] bg-opacity-95 backdrop-blur-md border-b border-white border-opacity-5">
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 h-full">
          <LogoImage size={96} />
          <span className="text-white font-bold text-xl tracking-widest gold-shimmer">TURBI</span>
        </Link>

        <nav className="hidden md:flex gap-6 text-sm text-gray-400">
          <Link href="/about" className="hover:text-white transition-colors">{t.nav.about}</Link>
          <Link href="/#testimonials" className="hover:text-white transition-colors">{t.nav.testimonials}</Link>
          <Link href="/contact" className="hover:text-white transition-colors">{t.nav.contact}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link href="/checkout" className="btn-gold px-5 py-2 rounded-xl text-sm flex-shrink-0">
            {t.nav.order}
          </Link>
        </div>
      </div>
    </header>
  );
}
