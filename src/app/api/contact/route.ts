import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.name !== "string" || body.name.trim().length < 2 ||
      typeof body.email !== "string" || !emailPattern.test(body.email) ||
      typeof body.message !== "string" || body.message.trim().length < 10 ||
      body.consent !== "on") {
    return NextResponse.json({ ok: false, error: "Ungültige Eingaben" }, { status: 400 });
  }

  // Email provider integration point: pass the validated payload to Resend,
  // Postmark, Nodemailer, or the owner's preferred transactional email service.
  console.info("Contact form accepted", {
    name: body.name,
    email: body.email,
    eventType: body.eventType,
  });
  return NextResponse.json({ ok: true });
}
