import crypto from "crypto";

// Sandbox bank provider. A real integration (e.g. Paystack Dedicated Virtual
// Accounts, Mono, Flutterwave) would call the provider API here and return the
// account they allocate. The interface stays the same.
export function generateVirtualAccount({ reference }) {
  const accountNumber = (
    "90" + crypto.randomBytes(4).readUInt32BE(0).toString().padStart(8, "0")
  ).slice(0, 10);
  const expiresAt = new Date(Date.now() + 24 * 3600 * 1000); // 24h to pay
  return {
    bankName: "Oins Sandbox Bank",
    accountName: "OINS FINANCE GROUP",
    accountNumber,
    expiresAt,
    reference,
  };
}
