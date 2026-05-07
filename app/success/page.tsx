"use client";

import Link from "next/link";
import { useLanguage } from "@/app/providers/LanguageProvider";

export default function SuccessPage() {
  const { t } = useLanguage();
  const s = t.success;

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{s.title}</h1>
        <p className="text-gray-500 mb-2">{s.desc}</p>
        <p className="text-gray-400 text-sm mb-8">{s.sub}</p>

        <div className="bg-green-50 border border-green-100 rounded-2xl p-4 text-sm text-green-700 mb-8 space-y-1">
          {s.lines.map((line, i) => <p key={i}>{line}</p>)}
        </div>

        <Link href="/" className="btn-gold px-8 py-3 rounded-xl inline-block">
          {s.back}
        </Link>
      </div>
    </main>
  );
}
