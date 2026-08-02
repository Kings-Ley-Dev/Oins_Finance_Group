import { verifySignature } from "../utils/helpers.js";
import { parseBankCallback } from "../services/payment/bank/bankWebhook.js";
import { parseCryptoCallback } from "../services/payment/crypto/cryptoWebhook.js";
import { confirmDeposit } from "../services/payment.service.js";

const SIG_HEADER = "x-oins-signature";

function readVerified(req) {
  const raw = Buffer.isBuffer(req.body) ? req.body.toString("utf8") : JSON.stringify(req.body);
  const secret = process.env.PAYMENT_WEBHOOK_SECRET || "";
  if (!verifySignature(raw, req.headers[SIG_HEADER], secret)) {
    const err = new Error("Invalid signature");
    err.statusCode = 401;
    throw err;
  }
  return JSON.parse(raw);
}

export async function bankWebhook(req, res, next) {
  try {
    const payload = readVerified(req);
    const { reference, status } = parseBankCallback(payload);
    if (["success", "completed", "paid"].includes(status)) await confirmDeposit(reference);
    res.json({ received: true });
  } catch (err) {
    next(err);
  }
}

export async function cryptoWebhook(req, res, next) {
  try {
    const payload = readVerified(req);
    const { reference, status } = parseCryptoCallback(payload);
    if (status === "confirmed") await confirmDeposit(reference);
    res.json({ received: true });
  } catch (err) {
    next(err);
  }
}
