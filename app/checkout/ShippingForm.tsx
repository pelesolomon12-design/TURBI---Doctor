"use client";

import { useState } from "react";
import { mainProduct, formatPrice } from "@/lib/products";

type ShippingData = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  street: string;
  apartment: string;
  notes: string;
};

const SHIPPING_PRICE = mainProduct.shipping;

function validate(data: ShippingData): Partial<Record<keyof ShippingData, string>> {
  const errors: Partial<Record<keyof ShippingData, string>> = {};
  if (!data.fullName.trim() || data.fullName.trim().length < 2) errors.fullName = "שם מלא נדרש";
  if (!/^05\d{8}$/.test(data.phone.replace(/\s/g, ""))) errors.phone = "מספר טלפון לא תקין (לדוגמה: 0501234567)";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "כתובת מייל לא תקינה";
  if (!data.city.trim()) errors.city = "עיר נדרשת";
  if (!data.street.trim()) errors.street = "רחוב ומספר נדרשים";
  return errors;
}

type Provider = "meshulam" | "paypal";

export default function ShippingForm() {
  const [form, setForm] = useState<ShippingData>({
    fullName: "", phone: "", email: "", city: "", street: "", apartment: "", notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingData, string>>>({});
  const [loading, setLoading] = useState<Provider | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const set = (field: keyof ShippingData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handlePay = async (provider: Provider) => {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(provider);
    setApiError(null);

    try {
      const endpoint = provider === "paypal" ? "/api/create-paypal-order" : "/api/create-meshulam-payment";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: mainProduct.id, shipping: form }),
      });
      const data = await res.json();
      if (data.error) { setApiError(data.error); setLoading(null); return; }
      window.location.href = data.paymentUrl;
    } catch {
      setApiError("שגיאה בחיבור לשרת");
      setLoading(null);
    }
  };

  const total = mainProduct.price + SHIPPING_PRICE;

  return (
    <div className="space-y-8" dir="rtl">
      {/* Order summary */}
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
        <h2 className="font-bold text-gray-800 mb-4 text-lg">סיכום הזמנה</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">{mainProduct.name}</span>
            <span className="font-semibold">{formatPrice(mainProduct.price)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">משלוח</span>
            <span className="font-semibold">{formatPrice(SHIPPING_PRICE)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-base">
            <span>סה&quot;כ</span>
            <span className="text-amber-600">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Shipping form */}
      <div>
        <h2 className="font-bold text-gray-800 mb-5 text-lg">פרטי משלוח</h2>
        <div className="space-y-4">
          <Field label="שם מלא *" error={errors.fullName}>
            <input className={input(errors.fullName)} placeholder="ישראל ישראלי" value={form.fullName} onChange={set("fullName")} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="טלפון *" error={errors.phone}>
              <input className={input(errors.phone)} placeholder="0501234567" value={form.phone} onChange={set("phone")} type="tel" />
            </Field>
            <Field label="מייל *" error={errors.email}>
              <input className={input(errors.email)} placeholder="you@email.com" value={form.email} onChange={set("email")} type="email" />
            </Field>
          </div>

          <Field label="עיר *" error={errors.city}>
            <input className={input(errors.city)} placeholder="תל אביב" value={form.city} onChange={set("city")} />
          </Field>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <Field label="רחוב ומספר *" error={errors.street}>
                <input className={input(errors.street)} placeholder="הרצל 12" value={form.street} onChange={set("street")} />
              </Field>
            </div>
            <Field label="דירה" error={undefined}>
              <input className={input()} placeholder="3" value={form.apartment} onChange={set("apartment")} />
            </Field>
          </div>

          <Field label="הערות למשלוח" error={undefined}>
            <textarea
              className={`${input()} resize-none`}
              rows={2}
              placeholder="קוד אינטרקום, שעות מועדפות..."
              value={form.notes}
              onChange={set("notes")}
            />
          </Field>
        </div>
      </div>

      {/* Payment */}
      <div>
        <h2 className="font-bold text-gray-800 mb-4 text-lg">בחירת אמצעי תשלום</h2>

        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm mb-4 text-center">
            {apiError}
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => handlePay("meshulam")}
            disabled={loading !== null}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-4 rounded-xl transition-colors text-base flex items-center justify-center gap-2"
          >
            {loading === "meshulam" ? "מעבד..." : "🔒 תשלום באשראי"}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">או</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            onClick={() => handlePay("paypal")}
            disabled={loading !== null}
            className="w-full bg-[#FFC439] hover:bg-[#f0b429] disabled:opacity-50 text-[#003087] font-bold py-4 rounded-xl transition-colors text-base flex items-center justify-center gap-2"
          >
            {loading === "paypal" ? "מעבד..." : (
              <span>
                <span className="text-[#003087]">Pay</span><span className="text-[#009cde]">Pal</span>
              </span>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          🔒 התשלום מוצפן ומאובטח · פרטי הכרטיס לא נשמרים אצלנו
        </p>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function input(error?: string) {
  return `w-full border ${error ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"} rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors text-sm`;
}
