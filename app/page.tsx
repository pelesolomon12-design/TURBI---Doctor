"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/products";
import { useLanguage } from "./providers/LanguageProvider";
import ScrollAnimator from "./components/ScrollAnimator";
import VideoSection from "./components/VideoSection";

export default function HomePage() {
  const { t } = useLanguage();
  const price = 29900;
  const originalPrice = 39900;
  const savings = originalPrice - price;

  return (
    <main className="min-h-screen">
      <ScrollAnimator />

      {/* ─── HERO ─── */}
      <section className="bg-hero min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-amber-500 opacity-5 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-blue-500 opacity-5 blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-block bg-amber-500 bg-opacity-20 border border-amber-400 text-amber-300 text-xs font-bold tracking-widest px-4 py-2 rounded-full mb-6 animate-fade-in-down">
            {t.hero.badge}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in-down leading-tight">
            {t.hero.title}
          </h1>
          <p className="gold-shimmer text-2xl md:text-3xl font-semibold mb-6 animate-fade-in-down">
            {t.hero.tagline}
          </p>
          <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10 animate-fade-in-down">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-down">
            <Link href="/checkout" className="btn-gold px-10 py-4 rounded-2xl text-lg animate-pulse-glow">
              {t.hero.cta}
            </Link>
            <a href="#about" className="border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 px-10 py-4 rounded-2xl text-lg transition-colors">
              {t.hero.readMore}
            </a>
          </div>
          <div className="mt-10 flex items-center justify-center gap-4 animate-fade-in-down">
            <span className="text-gray-500 line-through text-xl">{formatPrice(originalPrice)}</span>
            <span className="text-white text-3xl font-bold">{formatPrice(price)}</span>
            <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              {t.hero.savings} {formatPrice(savings)}
            </span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float text-gray-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Dark → Light transition */}
      <div className="h-24 bg-gradient-to-b from-[#16213e] to-[#f2ede4]" />

      {/* ─── VIDEO ─── */}
      <VideoSection />

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest text-amber-600 mb-3 fade-in">{t.about.label}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 fade-in">{t.about.title}</h2>
          <div className="gold-divider max-w-24 mx-auto mb-10 fade-in" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right fade-in">
            {t.product.includes.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-2xl p-5 shadow-sm border border-amber-100 card-hover">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-600 text-sm font-bold">{i + 1}</span>
                </div>
                <span className="text-gray-800 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest text-amber-600 mb-3 fade-in">{t.benefits.label}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 fade-in">{t.benefits.title}</h2>
            <div className="gold-divider max-w-24 mx-auto mt-4 fade-in" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.benefits.items.map((b, i) => (
              <div key={i} className="fade-in text-center bg-white rounded-3xl p-8 card-hover border border-amber-100 shadow-sm">
                <div className="text-5xl mb-4">{b.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Light → Dark transition */}
      <div className="h-24 bg-gradient-to-b from-[#f2ede4] to-[#0d1117]" />

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 px-6 bg-hero">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest text-amber-400 mb-3 fade-in">{t.steps.label}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white fade-in">{t.steps.title}</h2>
            <div className="gold-divider max-w-24 mx-auto mt-4 fade-in" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.steps.items.map((s, i) => (
              <div key={i} className="fade-in text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-amber-400 border-opacity-40 mb-5 group-hover:border-opacity-80 transition-all duration-300">
                  <span className="gold-shimmer font-bold text-lg">{s.num}</span>
                </div>
                <h3 className="font-bold text-white text-base mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark → Light transition */}
      <div className="h-24 bg-gradient-to-b from-[#16213e] to-[#f2ede4]" />

      {/* ─── TESTIMONIALS ─── */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest text-amber-600 mb-3 fade-in">{t.testimonials.label}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 fade-in">{t.testimonials.title}</h2>
            <div className="gold-divider max-w-24 mx-auto mt-4 fade-in" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.testimonials.items.map((item, i) => (
              <div key={i} className="fade-in bg-white rounded-3xl p-7 border border-amber-100 shadow-sm card-hover">
                <div className="flex mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-amber-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 italic">&ldquo;{item.text}&rdquo;</p>
                <p className="text-gray-400 text-sm font-semibold">— {item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Light → Dark transition */}
      <div className="h-24 bg-gradient-to-b from-[#f2ede4] to-[#0d1117]" />

      {/* ─── CTA ─── */}
      <section className="bg-hero py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.cta.title}</h2>
          <p className="text-gray-400 text-lg mb-10">{t.cta.desc}</p>
          <Link href="/checkout" className="btn-gold px-12 py-5 rounded-2xl text-xl animate-pulse-glow inline-block">
            {t.hero.cta} · {formatPrice(price)}
          </Link>
          <p className="text-gray-600 text-sm mt-6">{t.cta.trust}</p>
        </div>
      </section>
    </main>
  );
}
