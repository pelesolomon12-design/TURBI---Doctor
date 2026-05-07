"use client";

import { useLanguage } from "@/app/providers/LanguageProvider";

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.aboutPage;

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Title */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-amber-600 mb-3">{a.label}</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{a.title}</h1>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent max-w-24 mx-auto" />
        </div>

        {/* Owner card */}
        <div className="bg-white rounded-3xl border border-amber-100 shadow-sm p-10 flex flex-col md:flex-row gap-10 items-center mb-12">
          {/* Photo placeholder */}
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center border-4 border-amber-300">
              <span className="text-6xl">👤</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{a.ownerName}</h2>
            <p className="text-amber-600 font-semibold mb-4">{a.ownerRole}</p>
            <p className="text-gray-600 leading-relaxed mb-6">{a.ownerBio}</p>

            {/* Contact details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-xl">📞</span>
                <span className="font-medium">{a.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-xl">📧</span>
                <span className="font-medium">{a.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-xl">📍</span>
                <span className="font-medium">{a.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="bg-white rounded-3xl border border-amber-100 shadow-sm p-10">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{a.storyTitle}</h3>
          <p className="text-gray-600 leading-relaxed mb-4">{a.story1}</p>
          <p className="text-gray-600 leading-relaxed">{a.story2}</p>
        </div>

      </div>
    </main>
  );
}
