import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter (per IP, per minute)
const rateMap = new Map<string, { count: number; reset: number }>();

const RATE_LIMIT = 10; // max requests per window
const WINDOW_MS = 60_000; // 1 minute

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export function proxy(req: NextRequest): NextResponse {
  // Only rate-limit payment API routes
  if (!req.nextUrl.pathname.startsWith("/api/create-")) {
    return NextResponse.next();
  }

  const ip = getIP(req);
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + WINDOW_MS });
    return NextResponse.next();
  }

  if (entry.count >= RATE_LIMIT) {
    return NextResponse.json(
      { error: "יותר מדי בקשות. נסה שוב בעוד דקה." },
      { status: 429 }
    );
  }

  entry.count++;
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/create-paypal-order", "/api/create-meshulam-payment"],
};
