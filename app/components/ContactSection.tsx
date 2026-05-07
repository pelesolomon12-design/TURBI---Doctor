"use client";

import { useState } from "react";
import { useLanguage } from "@/app/providers/LanguageProvider";

export default function ContactSection() {
  const { t } = useLanguage();
  const c = t.contact;

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else {
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest text-amber-600 mb-3 fade-in">{c.label}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 fade-in">{c.title}</h2>
          <div className="gold-divider max-w-24 mx-auto mt-4 fade-in" />
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 fade-in">
          {success ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{c.successTitle}</h3>
              <p className="text-gray-500">{c.successDesc}</p>
              <button onClick={() => setSuccess(false)} className="mt-6 text-amber-600 underline text-sm">
                {c.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{c.name}</label>
                  <input
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder={c.namePlaceholder}
                    value={form.name}
                    onChange={set("name")}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{c.phone}</label>
                  <input
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder={c.phonePlaceholder}
                    value={form.phone}
                    onChange={set("phone")}
                    type="tel"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{c.email}</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder={c.emailPlaceholder}
                  value={form.email}
                  onChange={set("email")}
                  type="email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{c.message}</label>
                <textarea
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                  rows={4}
                  placeholder={c.messagePlaceholder}
                  value={form.message}
                  onChange={set("message")}
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold py-4 rounded-xl font-bold text-base"
              >
                {loading ? c.sending : c.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
