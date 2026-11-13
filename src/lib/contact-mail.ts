import nodemailer from "nodemailer";

const RECIPIENT = "welcome@cookingandmore.de";

export type ContactMessage = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  message: string;
};

function oneLine(value: string, max = 200) {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

export function mailDeliveryConfigured() {
  return Boolean(process.env.SMTP_PASSWORD?.trim());
}

export async function deliverContactMessage(message: ContactMessage) {
  const password = process.env.SMTP_PASSWORD?.trim();
  if (!password) return false;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER?.trim() || RECIPIENT;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST?.trim() || "smtp.ionos.de",
    port,
    secure: port === 465,
    auth: { user, pass: password },
  });
  await transporter.sendMail({
    from: `"Cooking and More" <${user}>`,
    to: RECIPIENT,
    replyTo: message.email,
    subject: `Neue Anfrage von ${oneLine(message.name)}`,
    text: [
      "Neue Anfrage über das Kontaktformular",
      "",
      `Name: ${oneLine(message.name)}`,
      `E-Mail: ${oneLine(message.email)}`,
      `Telefon: ${oneLine(message.phone) || "-"}`,
      `Art der Veranstaltung: ${oneLine(message.eventType) || "-"}`,
      "",
      message.message.trim().slice(0, 4000),
    ].join("\n"),
  });
  return true;
}
