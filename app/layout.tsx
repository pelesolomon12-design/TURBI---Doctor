import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TURBI — הדרך הטבעית לאיזון והחלמה",
  description: "ערכה טיפולית מקצועית מבוססת מחקר. הזמינו עכשיו עם משלוח עד הבית.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        {/* Sticky Nav */}
        <header className="fixed top-0 w-full z-50 bg-[#0d1117] bg-opacity-95 backdrop-blur-md border-b border-white border-opacity-5">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="text-white font-bold text-2xl tracking-widest">
              <span className="gold-shimmer">TURBI</span>
            </a>
            <nav className="hidden md:flex gap-8 text-sm text-gray-400">
              <a href="/#about" className="hover:text-white transition-colors">אודות</a>
              <a href="/#testimonials" className="hover:text-white transition-colors">המלצות</a>
              <a href="/#contact" className="hover:text-white transition-colors">צרו קשר</a>
            </nav>
            <a href="/checkout" className="btn-gold px-6 py-2.5 rounded-xl text-sm">
              להזמנה ←
            </a>
          </div>
        </header>

        <div className="flex-1 pt-16">{children}</div>

        <footer className="bg-[#0d1117] border-t border-white border-opacity-5 py-10 px-6 text-center">
          <p className="gold-shimmer font-bold text-2xl tracking-widest mb-2">TURBI</p>
          <p className="text-gray-600 text-sm mb-4">כל הזכויות שמורות © 2025</p>
          <div className="gold-divider max-w-32 mx-auto mb-4" />
          <p className="text-gray-700 text-xs">
            תשלומים מאובטחים · משלוח לכל הארץ · אחריות 30 יום
          </p>
        </footer>
      </body>
    </html>
  );
}
