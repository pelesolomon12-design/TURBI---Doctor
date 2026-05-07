import Link from "next/link";
import { mainProduct, formatPrice } from "@/lib/products";
import ScrollAnimator from "./components/ScrollAnimator";
import VideoSection from "./components/VideoSection";

const benefits = [
  { icon: "🌿", title: "100% טבעי", desc: "מרכיבים טבעיים נבחרים בקפידה ללא תוספים מלאכותיים" },
  { icon: "🔬", title: "מבוסס מחקר", desc: "פורמולה שפותחה בשיתוף מומחים ומגובה בנתונים קליניים" },
  { icon: "⚡", title: "תוצאות מהירות", desc: "מרגישים שיפור תוך 30 יום — או מקבלים החזר כספי מלא" },
  { icon: "🛡️", title: "בטוח לשימוש", desc: "עבר בדיקות איכות קפדניות ומאושר על ידי גורמים מקצועיים" },
];

const steps = [
  { num: "01", title: "הזמינו", desc: "בחרו כמות ומלאו את פרטי המשלוח" },
  { num: "02", title: "שלמו בבטחה", desc: "תשלום מאובטח דרך PayPal או משולם" },
  { num: "03", title: "קבלו עד הבית", desc: "משלוח מהיר לכל הארץ תוך 3-5 ימי עסקים" },
  { num: "04", title: "הרגישו את השינוי", desc: "עקבו אחר ההוראות וחוו את התוצאות" },
];

const testimonials = [
  { name: "רחל כ.", text: "אחרי שבועיים בלבד הרגשתי הבדל עצום. מוצר מדהים שממליצה לכולם!", stars: 5 },
  { name: "יוסי מ.", text: "סקפטי בהתחלה, אבל התוצאות דיברו בעד עצמן. שווה כל שקל.", stars: 5 },
  { name: "שירה א.", text: "קיבלתי את הערכה תוך 3 ימים, השירות היה מצוין והמוצר עוד יותר טוב.", stars: 5 },
];

export default function HomePage() {
  const savings = mainProduct.originalPrice
    ? mainProduct.originalPrice - mainProduct.price
    : 0;

  return (
    <main className="min-h-screen" dir="rtl">
      <ScrollAnimator />

      {/* ─── HERO ─── */}
      <section className="bg-hero min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-amber-500 opacity-5 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-blue-500 opacity-5 blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-block bg-amber-500 bg-opacity-20 border border-amber-400 text-amber-300 text-xs font-bold tracking-widest px-4 py-2 rounded-full mb-6 animate-fade-in-down">
            מוצר חדש · מהדורה מוגבלת
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in-down leading-tight">
            {mainProduct.name}
          </h1>

          <p className="gold-shimmer text-2xl md:text-3xl font-semibold mb-6 animate-fade-in-down">
            {mainProduct.tagline}
          </p>

          <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10 animate-fade-in-down">
            {mainProduct.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-down">
            <Link href="/checkout" className="btn-gold px-10 py-4 rounded-2xl text-lg animate-pulse-glow">
              להזמנה עכשיו ←
            </Link>
            <a href="#about" className="border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 px-10 py-4 rounded-2xl text-lg transition-colors">
              קרא עוד
            </a>
          </div>

          {/* Price teaser */}
          <div className="mt-10 flex items-center justify-center gap-4 animate-fade-in-down">
            {mainProduct.originalPrice && (
              <span className="text-gray-500 line-through text-xl">{formatPrice(mainProduct.originalPrice)}</span>
            )}
            <span className="text-white text-3xl font-bold">{formatPrice(mainProduct.price)}</span>
            {savings > 0 && (
              <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                חסכון {formatPrice(savings)}
              </span>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float text-gray-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ─── VIDEO ─── */}
      <VideoSection />

      {/* ─── ABOUT ─── */}
      <section id="about" className="bg-section-alt py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest text-amber-600 mb-3 fade-in">אודות המוצר</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 fade-in">מה בתוך הערכה?</h2>
          <div className="gold-divider max-w-24 mx-auto mb-10 fade-in" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right fade-in">
            {mainProduct.includes.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 card-hover">
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
      <section className="py-20 px-6 bg-section-alt">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest text-amber-600 mb-3 fade-in">למה אנחנו?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 fade-in">היתרונות שלנו</h2>
            <div className="gold-divider max-w-24 mx-auto mt-4 fade-in" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="fade-in text-center bg-white rounded-3xl p-8 card-hover border border-amber-100 shadow-sm">
                <div className="text-5xl mb-4">{b.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 px-6 bg-hero">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest text-amber-400 mb-3 fade-in">תהליך פשוט</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white fade-in">איך זה עובד?</h2>
            <div className="gold-divider max-w-24 mx-auto mt-4 fade-in" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <div key={i} className="fade-in relative bg-white bg-opacity-5 border border-white border-opacity-10 rounded-2xl p-6 text-center hover:bg-opacity-10 transition-all">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-amber-400 border-opacity-50 mb-4">
                  <span className="gold-shimmer font-bold text-base">{s.num}</span>
                </div>
                <h3 className="font-bold text-white text-base mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 px-6 bg-section-alt">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest text-amber-600 mb-3 fade-in">לקוחות מרוצים</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 fade-in">מה אומרים עלינו</h2>
            <div className="gold-divider max-w-24 mx-auto mt-4 fade-in" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="fade-in bg-white rounded-3xl p-7 border border-amber-100 shadow-sm card-hover">
                <div className="flex mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <span key={j} className="text-amber-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <p className="text-gray-400 text-sm font-semibold">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-hero py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">מוכנים להתחיל?</h2>
          <p className="text-gray-400 text-lg mb-10">הזמינו עכשיו וקבלו משלוח עד הבית תוך 3-5 ימי עסקים</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/checkout" className="btn-gold px-12 py-5 rounded-2xl text-xl animate-pulse-glow">
              להזמנה עכשיו · {formatPrice(mainProduct.price)}
            </Link>
          </div>
          <p className="text-gray-600 text-sm mt-6">✓ אחריות 30 יום · ✓ משלוח מהיר · ✓ תשלום מאובטח</p>
        </div>
      </section>
    </main>
  );
}
