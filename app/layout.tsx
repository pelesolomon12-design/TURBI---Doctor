import type { Metadata } from "next";
import { Geist } from "next/font/google";
import LogoImage from "./components/LogoImage";
import "./globals.css";
import { LanguageProvider } from "./providers/LanguageProvider";
import NavClient from "./components/NavClient";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TURBI — הדרך הטבעית לאיזון והחלמה",
  description: "ערכה טיפולית מקצועית מבוססת מחקר. הזמינו עכשיו עם משלוח עד הבית.",
  icons: { icon: "/hero.jpeg", apple: "/hero.jpeg" },
  openGraph: { images: ["/hero.jpeg"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <NavClient />
          <div className="flex-1 pt-24">{children}</div>
          <FooterClient />
        </LanguageProvider>
      </body>
    </html>
  );
}

function FooterClient() {
  return <FooterInner />;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FooterInner() {
  return (
    <footer className="bg-[#0d1117] border-t border-white border-opacity-5 py-10 px-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <LogoImage size={40} />
        <span className="gold-shimmer font-bold text-2xl tracking-widest">TURBI</span>
      </div>
      <FooterText />
    </footer>
  );
}

import FooterText from "./components/FooterText";
