import { NextRequest, NextResponse } from "next/server";
import { mainProduct } from "@/lib/products";

const MESHULAM_API = "https://sandbox.meshulam.co.il/api/light/server/1.0/createPaymentProcess/";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { shipping } = body;

    const userId = process.env.MESHULAM_USER_ID!;
    const pageCode = process.env.MESHULAM_PAGE_CODE!;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
    const testMode = process.env.MESHULAM_TEST_MODE === "true" ? "True" : "False";

    const total = mainProduct.price + mainProduct.shipping;
    const amountInNIS = (total / 100).toFixed(2);

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("pageCode", pageCode);
    formData.append("sumToPay", amountInNIS);
    formData.append("Description", mainProduct.name);
    formData.append("productName", mainProduct.name);
    formData.append("successUrl", `${siteUrl}/success`);
    formData.append("cancelUrl", `${siteUrl}/cancel`);
    formData.append("notifyUrl", `${siteUrl}/api/meshulam-webhook`);
    formData.append("testMode", testMode);
    if (shipping?.fullName) formData.append("payerName", shipping.fullName);
    if (shipping?.phone) formData.append("payerPhone", shipping.phone);
    if (shipping?.email) formData.append("payerEmail", shipping.email);

    const response = await fetch(MESHULAM_API, { method: "POST", body: formData });
    const text = await response.text();

    let data: { data?: { link?: string }; ReturnCode?: number; Description?: string };
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: "Invalid response from Meshulam", raw: text }, { status: 500 });
    }

    console.log("[Meshulam] Response:", JSON.stringify(data));
    if (data?.ReturnCode !== 0 || !data?.data?.link) {
      return NextResponse.json({ error: data?.Description ?? "Meshulam error", code: data?.ReturnCode }, { status: 500 });
    }

    return NextResponse.json({ paymentUrl: data.data.link });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
