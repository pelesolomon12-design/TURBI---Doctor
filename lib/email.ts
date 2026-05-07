import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.ORDERS_EMAIL ?? "orders@turbi.com";

export async function sendOrderEmail(order: {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  street: string;
  apartment?: string;
  notes?: string;
  amount: string;
  provider: string;
  transactionId?: string;
}) {
  await resend.emails.send({
    from: "TURBI <noreply@turbi.com>",
    to: TO,
    subject: `הזמנה חדשה מ-${order.fullName} · ${order.amount}`,
    html: `
      <div dir="rtl" style="font-family:Arial;max-width:600px;margin:auto;padding:24px;border:1px solid #eee;border-radius:12px">
        <h2 style="color:#c9a84c">הזמנה חדשה התקבלה! 🎉</h2>
        <hr style="border-color:#eee"/>
        <h3>פרטי לקוח</h3>
        <p><b>שם:</b> ${order.fullName}</p>
        <p><b>טלפון:</b> ${order.phone}</p>
        <p><b>מייל:</b> ${order.email}</p>
        <h3>כתובת למשלוח</h3>
        <p><b>עיר:</b> ${order.city}</p>
        <p><b>רחוב:</b> ${order.street}${order.apartment ? ` דירה ${order.apartment}` : ""}</p>
        ${order.notes ? `<p><b>הערות:</b> ${order.notes}</p>` : ""}
        <h3>פרטי תשלום</h3>
        <p><b>סכום:</b> ${order.amount}</p>
        <p><b>ספק:</b> ${order.provider}</p>
        ${order.transactionId ? `<p><b>מזהה עסקה:</b> ${order.transactionId}</p>` : ""}
        <hr style="border-color:#eee"/>
        <p style="color:#999;font-size:12px">TURBI · מערכת הזמנות אוטומטית</p>
      </div>
    `,
  });
}

export async function sendContactEmail(contact: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  await resend.emails.send({
    from: "TURBI <noreply@turbi.com>",
    to: TO,
    subject: `פנייה חדשה מ-${contact.name}`,
    html: `
      <div dir="rtl" style="font-family:Arial;max-width:600px;margin:auto;padding:24px;border:1px solid #eee;border-radius:12px">
        <h2 style="color:#c9a84c">פנייה חדשה מאתר TURBI</h2>
        <hr style="border-color:#eee"/>
        <p><b>שם:</b> ${contact.name}</p>
        <p><b>מייל:</b> ${contact.email}</p>
        ${contact.phone ? `<p><b>טלפון:</b> ${contact.phone}</p>` : ""}
        <p><b>הודעה:</b></p>
        <p style="background:#f9f9f9;padding:12px;border-radius:8px">${contact.message}</p>
        <hr style="border-color:#eee"/>
        <p style="color:#999;font-size:12px">TURBI · מערכת יצירת קשר</p>
      </div>
    `,
  });
}
