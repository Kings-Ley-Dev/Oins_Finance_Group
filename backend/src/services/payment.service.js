import { Deposit } from "../models/Deposit.js";
import { Withdrawal } from "../models/Withdrawal.js";
import { Transaction } from "../models/Transaction.js";
import { getOrCreateWallet } from "./investment.service.js";
import { generateVirtualAccount } from "./payment/bank/virtualAccount.js";
import { deriveAddress, SUPPORTED_COINS } from "./payment/crypto/dynamicWallet.js";
import { genReference } from "../utils/helpers.js";
import { AppError } from "../utils/AppError.js";
import { TX_STATUS } from "../config/constants.js";
import { notify, notifyAdmins } from "./notification.service.js";
import { emitToUser } from "../sockets/socketHandler.js";

// - Deposits -
// A deposit now starts as a REQUEST. No account details are shown to the user;
// an admin issues them (to the dashboard + email), the user pays and marks it
// paid, then an admin confirms receipt and the wallet is credited.
export async function initBankDeposit(userId, amount) {
  if (amount < 1) throw new AppError("Enter a valid amount", 422);
  const reference = genReference("DEP");
  const deposit = await Deposit.create({ user: userId, method: "bank", amount, reference, flowStatus: "requested" });
  await afterDepositRequest(userId, deposit);
  return deposit;
}

export async function initCryptoDeposit(userId, amount, coin) {
  if (amount < 1) throw new AppError("Enter a valid amount", 422);
  if (!SUPPORTED_COINS.includes(coin)) throw new AppError("Unsupported coin", 422);
  const reference = genReference("DEP");
  const deposit = await Deposit.create({ user: userId, method: "crypto", amount, reference, coin, flowStatus: "requested" });
  await afterDepositRequest(userId, deposit);
  return deposit;
}

async function afterDepositRequest(userId, deposit) {
  await notify(userId, {
    type: "payment",
    title: "Deposit request received",
    body: `We're preparing the ${deposit.method === "crypto" ? `${deposit.coin} ` : ""}deposit details for your $${deposit.amount} deposit (${deposit.reference}). You'll receive them here and by email shortly.`,
  });
  await notifyAdmins({
    type: "payment",
    title: "New deposit request",
    body: `A user requested a $${deposit.amount} ${deposit.method} deposit (${deposit.reference}). Provide the account details to proceed.`,
  });
}

// User confirms they have sent the funds.
export async function markDepositPaid(userId, reference) {
  const deposit = await Deposit.findOne({ reference, user: userId });
  if (!deposit) throw new AppError("Deposit not found", 404);
  if (deposit.flowStatus !== "details_sent") {
    throw new AppError("Deposit details have not been issued yet", 400);
  }
  deposit.flowStatus = "paid";
  deposit.paidAt = new Date();
  await deposit.save();

  await notify(userId, {
    type: "payment",
    title: "Payment marked as sent",
    body: `Thanks - we'll confirm your $${deposit.amount} deposit (${deposit.reference}) once it's received.`,
  });
  await notifyAdmins({
    type: "payment",
    title: "Deposit awaiting confirmation",
    body: `A user marked deposit ${deposit.reference} ($${deposit.amount}) as paid. Confirm once received.`,
  });
  return deposit;
}

// Idempotent: credits the wallet exactly once when a deposit is confirmed.
export async function confirmDeposit(reference) {
  const deposit = await Deposit.findOne({ reference });
  if (!deposit) throw new AppError("Deposit not found", 404);
  if (deposit.status === TX_STATUS.COMPLETED) return deposit; // already credited

  deposit.status = TX_STATUS.COMPLETED;
  deposit.flowStatus = "confirmed";
  deposit.confirmedAt = new Date();
  await deposit.save();

  const wallet = await getOrCreateWallet(deposit.user);
  wallet.available += deposit.amount;
  await wallet.save();

  await Transaction.create({
    user: deposit.user,
    type: "deposit",
    source: deposit.method === "bank" ? "Bank Transfer" : `${deposit.coin} Deposit`,
    amount: deposit.amount,
    status: TX_STATUS.COMPLETED,
  });

  await notify(deposit.user, {
    type: "payment",
    title: "Deposit confirmed",
    body: `$${deposit.amount} has been credited to your wallet.`,
    email: true,
  });
  emitToUser(deposit.user, "wallet:update", { available: wallet.available, invested: wallet.invested });

  return deposit;
}

export function listDeposits(userId) {
  return Deposit.find({ user: userId }).sort({ createdAt: -1 }).limit(25);
}

// - Withdrawals -
export async function requestWithdrawal(userId, { amount, method, destination, coin }) {
  if (amount < 1) throw new AppError("Enter a valid amount", 422);
  const wallet = await getOrCreateWallet(userId);
  if (wallet.available < amount) throw new AppError("Insufficient available balance", 400);

  // Hold the funds immediately; refunded if an admin rejects (Phase 6).
  wallet.available -= amount;
  await wallet.save();

  const reference = genReference("WDR");
  const withdrawal = await Withdrawal.create({ user: userId, amount, method, destination, coin, reference });
  await Transaction.create({
    user: userId,
    type: "withdrawal",
    source: method === "bank" ? "Bank Transfer" : `${coin || "Crypto"} Payout`,
    amount,
    status: TX_STATUS.PENDING,
  });

  await notify(userId, {
    type: "payment",
    title: "Withdrawal requested",
    body: `$${amount} payout is pending approval.`,
  });
  emitToUser(userId, "wallet:update", { available: wallet.available, invested: wallet.invested });

  return withdrawal;
}

export function listWithdrawals(userId) {
  return Withdrawal.find({ user: userId }).sort({ createdAt: -1 }).limit(25);
}
