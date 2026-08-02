import crypto from "crypto";

// Human-friendly unique reference, e.g. OINS-7F3K9A2B
export function genReference(prefix = "OINS") {
  return `${prefix}-${crypto.randomBytes(5).toString("hex").toUpperCase()}`;
}

// HMAC-SHA256 signature over a raw payload string.
export function signPayload(rawBody, secret) {
  return crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
}

// Timing-safe verification of a provider webhook signature.
export function verifySignature(rawBody, signature, secret) {
  if (!signature) return false;
  const expected = signPayload(rawBody, secret);
  const a = Buffer.from(expected);
  const b = Buffer.from(String(signature));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
