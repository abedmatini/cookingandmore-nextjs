import { createHmac, randomBytes, timingSafeEqual } from "crypto";

const COOKIE = "cam_visitor";
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;
const anonymousHits: number[] = [];

type Ticket = { n: number; t: number };

function secret() {
  const dedicated = process.env.VISITOR_TICKET_SECRET?.trim() ?? "";
  if (dedicated.length >= 16) return dedicated;
  const turnstile = process.env.TURNSTILE_SECRET_KEY?.trim() ?? "";
  if (turnstile.length >= 16 && turnstile !== "your_turnstile_secret_key") return `visitor:${turnstile}`;
  const holder = globalThis as typeof globalThis & { __camVisitorSecret?: string };
  if (!holder.__camVisitorSecret) holder.__camVisitorSecret = randomBytes(32).toString("hex");
  return holder.__camVisitorSecret;
}

function sign(ticket: Ticket) {
  const body = `${ticket.n}.${ticket.t}`;
  const mac = createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${mac}`;
}

function readTicket(value: string | undefined): Ticket | "invalid" | "missing" {
  if (!value) return "missing";
  const parts = value.split(".");
  if (parts.length !== 3) return "invalid";
  const [count, started, mac] = parts;
  if (!/^\d{1,6}$/.test(count) || !/^\d{13}$/.test(started) || !mac) return "invalid";
  const expected = createHmac("sha256", secret()).update(`${count}.${started}`).digest("base64url");
  const given = Buffer.from(mac);
  const wanted = Buffer.from(expected);
  if (given.length !== wanted.length || !timingSafeEqual(given, wanted)) return "invalid";
  return { n: Number(count), t: Number(started) };
}

function cookieHeader(value: string) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE}=${value}; HttpOnly; SameSite=Lax; Path=/; Max-Age=2592000${secure}`;
}

function cookieValue(header: string | null) {
  const pair = header?.split(";").map(part => part.trim()).find(part => part.startsWith(`${COOKIE}=`));
  if (!pair) return undefined;
  try {
    return decodeURIComponent(pair.slice(COOKIE.length + 1));
  } catch {
    return undefined;
  }
}

export function rateLimitVisitor(cookieHeaderValue: string | null) {
  const now = Date.now();
  const ticket = readTicket(cookieValue(cookieHeaderValue));
  if (ticket === "invalid") return { limited: true as const };
  if (ticket === "missing") {
    while (anonymousHits.length > 0 && now - anonymousHits[0] >= WINDOW_MS) anonymousHits.shift();
    if (anonymousHits.length >= MAX_REQUESTS) return { limited: true as const };
    anonymousHits.push(now);
    return { limited: false as const, setCookie: cookieHeader(sign({ n: 1, t: now })) };
  }
  const next = now - ticket.t >= WINDOW_MS ? { n: 1, t: now } : { n: ticket.n + 1, t: ticket.t };
  return {
    limited: next.n > MAX_REQUESTS,
    setCookie: cookieHeader(sign(next)),
  };
}
