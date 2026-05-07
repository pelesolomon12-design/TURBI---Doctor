"use client";

import Link from "next/link";
import ShippingForm from "./ShippingForm";
import { useLanguage } from "@/app/providers/LanguageProvider";

export default function CheckoutPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-6 inline-flex items-center gap-1">
          {t.checkout.back}
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mt-2">
          <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t.checkout.title}</h1>
          <ShippingForm />
        </div>
      </div>
    </main>
  );
}
