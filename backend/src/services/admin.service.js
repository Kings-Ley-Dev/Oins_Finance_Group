import { User } from "../models/User.js";
import { Wallet } from "../models/Wallet.js";
import { Investment } from "../models/Investment.js";
import { Transaction } from "../models/Transaction.js";
import { Deposit } from "../models/Deposit.js";
import { Withdrawal } from "../models/Withdrawal.js";
import { KYC } from "../models/KYC.js";
import { Settings } from "../models/Settings.js";
import { AuditLog } from "../models/AuditLog.js";
import { confirmDeposit } from "./payment.service.js";
import { getOrCreateWallet } from "./investment.service.js";
import { notify } from "./notification.service.js";
import { AppError } from "../utils/AppError.js";
import { INVESTMENT_STATUS, TX_STATUS } from "../config/constants.js";

export function audit(actorId, action, target = "", meta = {}) {
  return AuditLog.create({ actor: actorId, action, target, meta });
}

// - Overview vitals -
export async function overview() {
  const [users, deposits, withdrawalsPending, activeInvestments, kycPending] = await Promise.all([
    User.countDocuments(),
    Deposit.aggregate([{ $match: { status: TX_STATUS.COMPLETED } }, { $group: { _id: null, total: { $sum: "$amount" } } }]),
    Withdrawal.countDocuments({ status: "pending" }),
    Investment.countDocuments({ status: INVESTMENT_STATUS.ACTIVE }),
    KYC.countDocuments({ status: "pending" }),
  ]);
  const invested = await Investment.aggregate([
    { $match: { status: INVESTMENT_STATUS.ACTIVE } },
    { $group: { _id: null, total: { $sum: "$principal" } } },
  ]);
  return {
    users,
    totalDeposits: deposits[0]?.total || 0,
    totalInvested: invested[0]?.total || 0,
    withdrawalsPending,
    activeInvestments,
    kycPending,
  };
}

// - Users -
export async function listUsers() {
  const users = await User.find().sort({ createdAt: -1 }).limit(100).lean();
  const wallets = await Wallet.find({ user: { $in: users.map((u) => u._id) } }).lean();
  const wByUser = Object.fromEntries(wallets.map((w) => [String(w.user), w]));
  return users.map((u) => ({
    id: u._id,
    fullName: u.fullName,
    email: u.email,
    role: u.role,
    banned: !!u.banned,
    createdAt: u.createdAt,
    available: wByUser[String(u._id)]?.available || 0,
    invested: wByUser[String(u._id)]?.invested || 0,
  }));
}

export async function setBan(actorId, userId, banned) {
  const user = await User.findByIdAndUpdate(userId, { banned }, { new: true });
  if (!user) throw new AppError("User not found", 404);
  await audit(actorId, banned ? "user.ban" : "user.unban", String(userId));
  return user;
}

export async function adjustBalance(actorId, userId, delta, note = "") {
  const wallet = await getOrCreateWallet(userId);
  wallet.available += Number(delta);
  if (wallet.available < 0) throw new AppError("Adjustment would make balance negative", 400);
  await wallet.save();
  await Transaction.create({
    user: userId,
    type: Number(delta) >= 0 ? "deposit" : "withdrawal",
    source: "Admin adjustment",
    amount: Math.abs(Number(delta)),
    status: TX_STATUS.COMPLETED,
  });
  await audit(actorId, "user.adjustBalance", String(userId), { delta, note });
  await notify(userId, { type: "payment", title: "Balance adjusted", body: `An admin adjusted your balance by $${delta}.` });
  return wallet;
}

// - Ledgers -
export const listInvestments = () =>
  Investment.find().populate("user", "fullName email").sort({ createdAt: -1 }).limit(100);
export const listDeposits = () =>
  Deposit.find().populate("user", "fullName email").sort({ createdAt: -1 }).limit(100);
export const listWithdrawals = () =>
  Withdrawal.find().populate("user", "fullName email").sort({ createdAt: -1 }).limit(100);
export const listTransactions = () =>
  Transaction.find().populate("user", "fullName email").sort({ createdAt: -1 }).limit(200);
export const listAudit = () =>
  AuditLog.find().populate("actor", "fullName email").sort({ createdAt: -1 }).limit(200);

// - Deposits: manual confirmation -
export async function manualConfirmDeposit(actorId, reference) {
  const dep = await confirmDeposit(reference);
  await audit(actorId, "deposit.manualConfirm", reference);
  return dep;
}

// - Deposits: issue account details to the user (dashboard + email) -
export async function provideDepositDetails(actorId, reference, details = {}) {
  const dep = await Deposit.findOne({ reference });
  if (!dep) throw new AppError("Deposit not found", 404);
  if (dep.status === TX_STATUS.COMPLETED) throw new AppError("Deposit already confirmed", 400);

  if (dep.method === "bank") {
    dep.accountDetails = {
      bankName: details.bankName,
      bankAddress: details.bankAddress,
      routingOrSwift: details.routingOrSwift,
      accountName: details.accountName,
      accountNumber: details.accountNumber,
      accountAddress: details.accountAddress,
      instructions: details.instructions,
    };
  } else {
    dep.accountDetails = {
      coin: details.coin || dep.coin,
      network: details.network,
      address: details.address,
      instructions: details.instructions,
    };
  }
  dep.flowStatus = "details_sent";
  dep.detailsSentAt = new Date();
  await dep.save();

  const lines =
    dep.method === "bank"
      ? [
          `Bank: ${dep.accountDetails.bankName || "-"}`,
          dep.accountDetails.bankAddress ? `Bank address: ${dep.accountDetails.bankAddress}` : null,
          dep.accountDetails.routingOrSwift ? `Routing/SWIFT: ${dep.accountDetails.routingOrSwift}` : null,
          `Account name: ${dep.accountDetails.accountName || "-"}`,
          `Account number: ${dep.accountDetails.accountNumber || "-"}`,
          dep.accountDetails.accountAddress ? `Account address: ${dep.accountDetails.accountAddress}` : null,
        ]
      : [
          `Coin: ${dep.accountDetails.coin || "-"}`,
          `Network: ${dep.accountDetails.network || "-"}`,
          `Address: ${dep.accountDetails.address || "-"}`,
        ];
  const body =
    `Here are the details to complete your $${dep.amount} deposit (${dep.reference}):\n` +
    lines.filter(Boolean).join("\n") +
    (dep.accountDetails.instructions ? `\n\n${dep.accountDetails.instructions}` : "") +
    `\n\nAfter sending the funds, return to your dashboard and tap "I've completed the deposit".`;

  await notify(dep.user, { type: "payment", title: "Your deposit details are ready", body, email: true });
  await audit(actorId, "deposit.provideDetails", reference);
  return dep;
}

export async function rejectDeposit(actorId, reference, reason = "") {
  const dep = await Deposit.findOne({ reference });
  if (!dep) throw new AppError("Deposit not found", 404);
  if (dep.status === TX_STATUS.COMPLETED) throw new AppError("Deposit already confirmed", 400);
  dep.flowStatus = "rejected";
  dep.status = TX_STATUS.CANCELLED;
  dep.rejectedAt = new Date();
  dep.rejectionReason = reason;
  await dep.save();
  await notify(dep.user, {
    type: "warning",
    title: "Deposit cancelled",
    body: `Your deposit ${dep.reference} was cancelled.${reason ? ` Reason: ${reason}` : ""}`,
  });
  await audit(actorId, "deposit.reject", reference);
  return dep;
}

// - Withdrawals: approve (release) / reject (refund) -
export async function decideWithdrawal(actorId, id, decision) {
  const w = await Withdrawal.findById(id);
  if (!w) throw new AppError("Withdrawal not found", 404);
  if (w.status !== "pending") throw new AppError("Already processed", 400);

  if (decision === "approve") {
    w.status = "completed";
    w.processedAt = new Date();
    await w.save();
    await Transaction.updateOne(
      { user: w.user, type: "withdrawal", amount: w.amount, status: TX_STATUS.PENDING },
      { status: TX_STATUS.COMPLETED }
    );
    await notify(w.user, { type: "payment", title: "Withdrawal approved", body: `Your $${w.amount} payout has been sent.`, email: true });
  } else {
    // refund the held funds
    const wallet = await getOrCreateWallet(w.user);
    wallet.available += w.amount;
    await wallet.save();
    w.status = "rejected";
    w.processedAt = new Date();
    await w.save();
    await Transaction.updateOne(
      { user: w.user, type: "withdrawal", amount: w.amount, status: TX_STATUS.PENDING },
      { status: TX_STATUS.CANCELLED }
    );
    await notify(w.user, { type: "warning", title: "Withdrawal rejected", body: `Your $${w.amount} request was declined and refunded.` });
  }
  await audit(actorId, `withdrawal.${decision}`, String(id), { amount: w.amount });
  return w;
}

// - KYC review -
export const listKyc = () => KYC.find({ status: { $ne: "unverified" } }).populate("user", "fullName email").sort({ submittedAt: -1 });

export async function decideKyc(actorId, id, decision, note = "") {
  const kyc = await KYC.findById(id);
  if (!kyc) throw new AppError("KYC record not found", 404);
  kyc.status = decision === "approve" ? "approved" : "rejected";
  kyc.reviewedBy = actorId;
  kyc.reviewNote = note;
  await kyc.save();
  await audit(actorId, `kyc.${decision}`, String(id));
  await notify(kyc.user, {
    type: "kyc",
    title: decision === "approve" ? "KYC approved" : "KYC rejected",
    body: decision === "approve" ? "Your identity has been verified." : note || "Please re-submit your documents.",
    email: true,
  });
  return kyc;
}

// - Settings / ROI config -
export const getSettings = () => Settings.getGlobal();

export async function updateSettings(actorId, patch) {
  const s = await Settings.getGlobal();
  ["maintenanceMode", "registrationOpen", "withdrawalsEnabled"].forEach((k) => {
    if (k in patch) s[k] = !!patch[k];
  });
  if (patch.roiOverrides) {
    for (const [key, val] of Object.entries(patch.roiOverrides)) {
      s.roiOverrides.set(key, { roiMin: Number(val.roiMin), roiMax: Number(val.roiMax) });
    }
  }
  await s.save();
  await audit(actorId, "settings.update", "global", patch);
  return s;
}
