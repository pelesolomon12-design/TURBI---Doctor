import { NextRequest, NextResponse } from "next/server";
import { mainProduct } from "@/lib/products";

const PAYPAL_API = process.env.PAYPAL_MODE === "live"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

async function getAccessToken() {
  const credentials = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: { Authorization: `Basic ${credentials}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  return data.access_token as string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { shipping } = body;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
    const total = mainProduct.price + mainProduct.shipping;
    const amountILS = (total / 100).toFixed(2);

    const accessToken = await getAccessToken();

    const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          description: mainProduct.name,
          amount: { currency_code: "ILS", value: amountILS },
          custom_id: JSON.stringify({
            name: shipping?.fullName,
            phone: shipping?.phone,
            city: shipping?.city,
            street: shipping?.street,
          }),
        }],
        application_context: {
          return_url: `${siteUrl}/success`,
          cancel_url: `${siteUrl}/cancel`,
        },
      }),
    });

    const data = await res.json();
    const approveLink = data.links?.find((l: { rel: string; href: string }) => l.rel === "approve")?.href;

    if (!approveLink) return NextResponse.json({ error: "PayPal error", raw: data }, { status: 500 });

    return NextResponse.json({ paymentUrl: approveLink });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
