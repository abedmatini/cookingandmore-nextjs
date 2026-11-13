import { NextResponse } from "next/server";
import { readTurnstileSecretKey, verifyTurnstileToken } from "@/lib/turnstile";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 8_000;
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;
const recentRequests: number[] = [];

function isRateLimited() {
  const now = Date.now();
  while (recentRequests.length > 0 && now - recentRequests[0] >= WINDOW_MS) recentRequests.shift();
  recentRequests.push(now);
  return recentRequests.length > MAX_REQUESTS;
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

export async function POST(request: Request) {
  if (isRateLimited()) {
    return NextResponse.json({ ok: false, error: "Zu viele Anfragen" }, { status: 429 });
  }

  const raw = await readLimitedBody(request);
  if (raw === null) {
    return NextResponse.json({ ok: false, error: "Anfrage zu groß" }, { status: 413 });
  }

  const body = (() => {
    try {
      return JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return null;
    }
  })();
  const token = body && (typeof body.turnstileToken === "string" ? body.turnstileToken : typeof body["cf-turnstile-response"] === "string" ? body["cf-turnstile-response"] : "");
  if (!body || typeof token !== "string" || token.length < 10 || token.length > 2048) {
    return NextResponse.json({ ok: false, error: "Sicherheitsprüfung fehlt" }, { status: 400 });
  }
  if (!readTurnstileSecretKey()) {
    return NextResponse.json({ ok: false, error: "Sicherheitsprüfung nicht verfügbar" }, { status: 503 });
  }
  const accepted = await verifyTurnstileToken(token);
  if (!accepted) {
    return NextResponse.json({ ok: false, error: "Sicherheitsprüfung fehlgeschlagen" }, { status: 403 });
  }

  if (typeof body.name !== "string" || body.name.trim().length < 2 ||
      typeof body.email !== "string" || !emailPattern.test(body.email) ||
      typeof body.message !== "string" || body.message.trim().length < 10 ||
      body.consent !== "on") {
    return NextResponse.json({ ok: false, error: "Ungültige Eingaben" }, { status: 400 });
  }

  console.info("Contact form accepted");
  return NextResponse.json({ ok: true });
}
