"use client";

import Link from "next/link";
import { useLanguage } from "@/app/providers/LanguageProvider";

export default function CancelPage() {
  const { t } = useLanguage();
  const c = t.cancel;

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-12 max-w-md w-full text-center">
        <div className="text-7xl mb-6">↩️</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{c.title}</h1>
        <p className="text-gray-500 mb-8">{c.desc}</p>

        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          {c.back}
        </Link>
      </div>
    </main>
  );
}
