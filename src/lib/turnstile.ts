const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const PLACEHOLDERS = new Set(["your_turnstile_site_key", "your_turnstile_secret_key"]);

function readEnv(name: string) {
  const value = process.env[name]?.trim() ?? "";
  return value && !PLACEHOLDERS.has(value) ? value : "";
}

export function readTurnstileSiteKey() {
  return readEnv("TURNSTILE_SITE_KEY");
}

export function readTurnstileSecretKey() {
  return readEnv("TURNSTILE_SECRET_KEY");
}

export async function verifyTurnstileToken(token: string, remoteIp: string) {
  const secret = readTurnstileSecretKey();
  if (!secret || !token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!response.ok) return false;
    const result = await response.json().catch(() => null) as { success?: boolean } | null;
    return result?.success === true;
  } catch {
    return false;
  }
}
