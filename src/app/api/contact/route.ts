import { NextResponse } from "next/server";
import { deliverContactMessage, mailDeliveryConfigured } from "@/lib/contact-mail";
import { readTurnstileSecretKey, verifyTurnstileToken } from "@/lib/turnstile";
import { rateLimitVisitor } from "@/lib/visitor-rate-limit";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 8_000;

function withCookie(response: NextResponse, setCookie?: string) {
  if (setCookie) response.headers.append("set-cookie", setCookie);
  return response;
}

async function readLimitedBody(request: Request) {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) return null;
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(merged);
}

function textField(body: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    const value = body[key];
    if (typeof value === "string") return value;
  }
  return "";
}

function readFields(raw: string, contentType: string) {
  if (contentType.includes("application/json")) {
    try {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  }
  const params = new URLSearchParams(raw);
  return Object.fromEntries(params.entries());
}

export async function POST(request: Request) {
  const limit = rateLimitVisitor(request.headers.get("cookie"));
  if (limit.limited) {
    return withCookie(NextResponse.json({ ok: false, error: "Zu viele Anfragen" }, { status: 429 }), limit.setCookie);
  }

  const raw = await readLimitedBody(request);
  if (raw === null) {
    return withCookie(NextResponse.json({ ok: false, error: "Anfrage zu groß" }, { status: 413 }), limit.setCookie);
  }

  const body = readFields(raw, request.headers.get("content-type") ?? "");
  const token = textField(body ?? {}, "turnstileToken", "cf-turnstile-response");
  if (!body || token.length < 10 || token.length > 2048) {
    return withCookie(NextResponse.json({ ok: false, error: "Sicherheitsprüfung fehlt" }, { status: 400 }), limit.setCookie);
  }
  if (!readTurnstileSecretKey()) {
    return withCookie(NextResponse.json({ ok: false, error: "Sicherheitsprüfung nicht verfügbar" }, { status: 503 }), limit.setCookie);
  }
  const accepted = await verifyTurnstileToken(token);
  if (!accepted) {
    return withCookie(NextResponse.json({ ok: false, error: "Sicherheitsprüfung fehlgeschlagen" }, { status: 403 }), limit.setCookie);
  }

  const name = textField(body, "name", "your-name");
  const email = textField(body, "email", "your-email");
  const message = textField(body, "message", "your-message");
  const phone = textField(body, "phone", "tel");
  const eventType = textField(body, "eventType", "BusinessorPrivat");
  if (name.trim().length < 2 || !emailPattern.test(email) || message.trim().length < 10 || body.consent !== "on") {
    return withCookie(NextResponse.json({ ok: false, error: "Ungültige Eingaben" }, { status: 400 }), limit.setCookie);
  }
  if (!mailDeliveryConfigured()) {
    return withCookie(NextResponse.json({ ok: false, error: "Der E-Mail-Versand ist noch nicht eingerichtet." }, { status: 503 }), limit.setCookie);
  }

  try {
    await deliverContactMessage({ name: name.trim(), email: email.trim(), phone: phone.trim(), eventType: eventType.trim(), message: message.trim() });
  } catch {
    return withCookie(NextResponse.json({ ok: false, error: "Die Anfrage konnte nicht zugestellt werden." }, { status: 502 }), limit.setCookie);
  }

  console.info("Contact form delivered");
  return withCookie(NextResponse.json({ ok: true }), limit.setCookie);
}
