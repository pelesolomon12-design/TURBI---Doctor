"use client";

import { useState } from "react";
import { mainProduct, formatPrice } from "@/lib/products";
import { useLanguage } from "@/app/providers/LanguageProvider";

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

type Provider = "meshulam" | "paypal";

export default function ShippingForm() {
  const { t } = useLanguage();
  const c = t.checkout;

  const [form, setForm] = useState<ShippingData>({
    fullName: "", phone: "", email: "", city: "", street: "", apartment: "", notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingData, string>>>({});
  const [loading, setLoading] = useState<Provider | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  function validate(data: ShippingData): Partial<Record<keyof ShippingData, string>> {
    const errs: Partial<Record<keyof ShippingData, string>> = {};
    if (!data.fullName.trim() || data.fullName.trim().length < 2) errs.fullName = c.errors.fullName;
    if (!/^05\d{8}$/.test(data.phone.replace(/\s/g, ""))) errs.phone = c.errors.phone;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = c.errors.email;
    if (!data.city.trim()) errs.city = c.errors.city;
    if (!data.street.trim()) errs.street = c.errors.street;
    return errs;
  }

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
    <div className="space-y-8">
      {/* Order summary */}
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
        <h2 className="font-bold text-gray-800 mb-4 text-lg">{c.summary}</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">{mainProduct.name}</span>
            <span className="font-semibold">{formatPrice(mainProduct.price)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{c.shipping}</span>
            <span className="font-semibold">{formatPrice(SHIPPING_PRICE)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-base">
            <span>{c.total}</span>
            <span className="text-amber-600">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Shipping form */}
      <div>
        <h2 className="font-bold text-gray-800 mb-5 text-lg">{c.shippingTitle}</h2>
        <div className="space-y-4">
          <Field label={c.fields.fullName} error={errors.fullName}>
            <input className={input(errors.fullName)} placeholder={c.placeholders.fullName} value={form.fullName} onChange={set("fullName")} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label={c.fields.phone} error={errors.phone}>
              <input className={input(errors.phone)} placeholder={c.placeholders.phone} value={form.phone} onChange={set("phone")} type="tel" />
            </Field>
            <Field label={c.fields.email} error={errors.email}>
              <input className={input(errors.email)} placeholder={c.placeholders.email} value={form.email} onChange={set("email")} type="email" />
            </Field>
          </div>

          <Field label={c.fields.city} error={errors.city}>
            <input className={input(errors.city)} placeholder={c.placeholders.city} value={form.city} onChange={set("city")} />
          </Field>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <Field label={c.fields.street} error={errors.street}>
                <input className={input(errors.street)} placeholder={c.placeholders.street} value={form.street} onChange={set("street")} />
              </Field>
            </div>
            <Field label={c.fields.apartment} error={undefined}>
              <input className={input()} placeholder={c.placeholders.apartment} value={form.apartment} onChange={set("apartment")} />
            </Field>
          </div>

          <Field label={c.fields.notes} error={undefined}>
            <textarea
              className={`${input()} resize-none`}
              rows={2}
              placeholder={c.placeholders.notes}
              value={form.notes}
              onChange={set("notes")}
            />
          </Field>
        </div>
      </div>

      {/* Payment */}
      <div>
        <h2 className="font-bold text-gray-800 mb-4 text-lg">{c.paymentTitle}</h2>

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
            {loading === "meshulam" ? c.processing : `🔒 ${c.payCredit}`}
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
            {loading === "paypal" ? c.processing : (
              <span>
                <span className="text-[#003087]">Pay</span><span className="text-[#009cde]">Pal</span>
              </span>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">{c.secureNote}</p>
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
