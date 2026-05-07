import { NextRequest, NextResponse } from "next/server";

const MESHULAM_APPROVE_API = "https://sandbox.meshulam.co.il/api/light/server/1.0/approveTransaction/";

export async function POST(req: NextRequest) {
  try {
    // Meshulam sends form-encoded data
    const formData = await req.formData();

    const transactionCode = formData.get("transactionCode") as string;
    const paymentSum = formData.get("paymentSum") as string;
    const paymentDesc = formData.get("paymentDesc") as string;
    const fullName = formData.get("fullName") as string;
    const payerEmail = formData.get("payerEmail") as string;

    console.log("[Meshulam Webhook] Transaction received:", {
      transactionCode,
      paymentSum,
      paymentDesc,
      fullName,
      payerEmail,
    });

    // Approve the transaction (required by Meshulam)
    const approveForm = new FormData();
    approveForm.append("pageCode", process.env.MESHULAM_PAGE_CODE!);
    formData.forEach((value, key) => {
      approveForm.append(key, value as string);
    });

    const approveRes = await fetch(MESHULAM_APPROVE_API, {
      method: "POST",
      body: approveForm,
    });

    const approveText = await approveRes.text();
    console.log("[Meshulam Webhook] Approve response:", approveText);

    // TODO: save transaction to database here

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook error";
    console.error("[Meshulam Webhook] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
