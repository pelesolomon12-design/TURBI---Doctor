import Link from "next/link";
import ShippingForm from "./ShippingForm";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6" dir="rtl">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-6 inline-flex items-center gap-1">
          → חזרה לדף הבית
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mt-2">
          <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">השלמת הזמנה</h1>
          <ShippingForm />
        </div>
      </div>
    </main>
  );
}
