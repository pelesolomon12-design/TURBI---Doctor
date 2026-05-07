"use client";

import { useState } from "react";

type Provider = "meshulam" | "paypal";

async function createPayment(provider: Provider, productId: string): Promise<string> {
  const endpoint = provider === "paypal"
    ? "/api/create-paypal-order"
    : "/api/create-meshulam-payment";

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });

  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.paymentUrl;
}

export default function PayButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState<Provider | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async (provider: Provider) => {
    setLoading(provider);
    setError(null);
    try {
      const url = await createPayment(provider, productId);
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאה");
      setLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm text-center">
          {error}
        </div>
      )}

      {/* Meshulam */}
      <button
        onClick={() => handlePay("meshulam")}
        disabled={loading !== null}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-4 rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
      >
        {loading === "meshulam" ? "מעבד..." : <> 🔒 שלם עם משולם</>}
      </button>

      <div className="flex items-center gap-3 text-gray-300">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm text-gray-400">או</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* PayPal */}
      <button
        onClick={() => handlePay("paypal")}
        disabled={loading !== null}
        className="w-full bg-[#FFC439] hover:bg-[#f0b429] disabled:opacity-50 text-[#003087] font-bold py-4 rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
      >
        {loading === "paypal" ? "מעבד..." : (
          <span>
            <span className="text-[#003087]">Pay</span>
            <span className="text-[#009cde]">Pal</span>
          </span>
        )}
      </button>

      <p className="text-center text-xs text-gray-400 pt-1">
        תשלום מאובטח — פרטי הכרטיס לא נשמרים אצלנו
      </p>
    </div>
  );
}
