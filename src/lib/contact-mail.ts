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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fieldRow(label: string, value: string) {
  return `<tr>
    <td style="padding:12px 0;border-bottom:1px solid #eee;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6b6b6b;width:160px;vertical-align:top;">${label}</td>
    <td style="padding:12px 0;border-bottom:1px solid #eee;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#262626;vertical-align:top;">${value}</td>
  </tr>`;
}

function renderContactHtml(message: ContactMessage, messageText: string) {
  const name = escapeHtml(oneLine(message.name));
  const email = escapeHtml(oneLine(message.email));
  const phone = escapeHtml(oneLine(message.phone) || "-");
  const eventType = escapeHtml(oneLine(message.eventType) || "-");
  return `<!DOCTYPE html>
<html lang="de">
<body style="margin:0;padding:0;background:#f7f5f2;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f5f2;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;">
          <tr>
            <td style="background:#262626;padding:22px 24px;font-family:Arial,Helvetica,sans-serif;">
              <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#cfa670;">Cooking and More</div>
              <div style="margin-top:6px;font-size:22px;line-height:1.3;color:#ffffff;">Neue Anfrage</div>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 24px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${fieldRow("Name", name)}
                ${fieldRow("E-Mail", `<a href="mailto:${email}" style="color:#262626;text-decoration:underline;">${email}</a>`)}
                ${fieldRow("Telefon", phone)}
                ${fieldRow("Art der Veranstaltung", eventType)}
              </table>
              <div style="margin-top:22px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6b6b6b;">Nachricht</div>
              <div style="margin-top:8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#262626;white-space:pre-wrap;">${escapeHtml(messageText)}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function mailDeliveryConfigured() {
  return Boolean(process.env.SMTP_PASSWORD?.trim());
}

export async function deliverContactMessage(message: ContactMessage) {
  const password = process.env.SMTP_PASSWORD?.trim();
  if (!password) return false;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER?.trim() || RECIPIENT;
  const messageText = message.message.trim().slice(0, 4000);
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
    html: renderContactHtml(message, messageText),
  });
  return true;
}
