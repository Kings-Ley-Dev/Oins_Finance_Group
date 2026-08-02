import mongoose from "mongoose";
import { Investment } from "../models/Investment.js";
import { Wallet } from "../models/Wallet.js";
import { Transaction } from "../models/Transaction.js";
import { EarningsLog } from "../models/EarningsLog.js";
import { PLAN_MAP, roiLabel, roiMidpoint } from "../config/plans.js";
import { Settings } from "../models/Settings.js";
import { AppError } from "../utils/AppError.js";
import { INVESTMENT_STATUS } from "../config/constants.js";
import { notify } from "./notification.service.js";
import { emitToUser } from "../sockets/socketHandler.js";

export async function getOrCreateWallet(userId) {
  let wallet = await Wallet.findOne({ user: userId });
  if (!wallet) wallet = await Wallet.create({ user: userId });
  return wallet;
}

// Lock principal from the wallet and open a new investment.
export async function subscribe(userId, { assetKey, principal }) {
  const plan = PLAN_MAP[assetKey];
  if (!plan) throw new AppError("Unknown investment plan", 404);
  if (principal < 100) throw new AppError("Minimum investment is $100", 422);

  // Apply admin ROI override for this asset, if configured.
  let effective = plan;
  try {
    const settings = await Settings.getGlobal();
    const ov = settings.roiOverrides?.get?.(assetKey);
    if (ov && ov.roiMin != null && ov.roiMax != null) {
      effective = { ...plan, roiMin: ov.roiMin, roiMax: ov.roiMax };
    }
  } catch { /* settings optional */ }

  const wallet = await getOrCreateWallet(userId);
  if (wallet.available < principal) {
    throw new AppError("Insufficient available balance - deposit first", 400);
  }

  const maturityDate = new Date();
  maturityDate.setDate(maturityDate.getDate() + plan.termDays);

  const investment = await Investment.create({
    user: userId,
    assetKey: plan.key,
    assetName: plan.name,
    icon: plan.icon,
    principal,
    roiPercent: roiMidpoint(effective),
    roiLabel: roiLabel(effective),
    termDays: plan.termDays,
    maturityDate,
    status: INVESTMENT_STATUS.ACTIVE,
  });

  wallet.available -= principal;
  wallet.invested += principal;
  await wallet.save();

  await Transaction.create({
    user: userId,
    type: "investment",
    source: plan.name,
    amount: principal,
    investment: investment._id,
  });

  await notify(userId, {
    type: "success",
    title: "Investment created",
    body: `$${principal} placed in ${plan.name}.`,
  });
  emitToUser(userId, "wallet:update", { available: wallet.available, invested: wallet.invested });

  return { investment, wallet };
}

export async function getPortfolio(userId) {
  const items = await Investment.find({ user: userId }).sort({ createdAt: -1 });
  return items.map(shapeInvestment);
}

function shapeInvestment(inv) {
  const now = Date.now();
  const total = inv.termDays * 24 * 3600 * 1000;
  const elapsed = now - new Date(inv.startDate).getTime();
  const progress = Math.max(0, Math.min(1, elapsed / total));
  const daysLeft = Math.max(0, Math.ceil((new Date(inv.maturityDate).getTime() - now) / 86400000));
  return {
    id: inv._id,
    asset: inv.assetName,
    assetKey: inv.assetKey,
    icon: inv.icon,
    principal: inv.principal,
    roi: inv.roiLabel,
    accrued: inv.accrued,
    term: `${Math.round(inv.termDays / 30)} months`,
    daysLeft,
    progress,
    status: inv.status,
  };
}

// Single call powering the whole dashboard.
export async function getSummary(userId) {
  const [wallet, portfolio, earnings, transactions] = await Promise.all([
    getOrCreateWallet(userId),
    getPortfolio(userId),
    getEarningsSeries(userId, 30),
    Transaction.find({ user: userId }).sort({ createdAt: -1 }).limit(8),
  ]);

  const accruedTotal = portfolio.reduce((s, p) => s + p.accrued, 0);
  const balance = {
    invested: wallet.invested,
    available: wallet.available,
    earnings: accruedTotal,
    total: wallet.available + wallet.invested + accruedTotal,
  };

  return {
    balance,
    portfolio,
    earnings,
    transactions: transactions.map((t) => ({
      id: t._id,
      type: t.type[0].toUpperCase() + t.type.slice(1),
      asset: t.source,
      amount: t.amount,
      status: t.status,
      date: t.createdAt.toISOString().slice(0, 10),
    })),
  };
}

// Cumulative daily earnings across all of the user's investments.
export async function getEarningsSeries(userId, days = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days + 1);
  const logs = await EarningsLog.find({
    user: userId,
    createdAt: { $gte: new Date(since.toISOString().slice(0, 10)) },
  }).sort({ postedFor: 1 });

  // sum per day, then accumulate
  const perDay = new Map();
  for (const l of logs) perDay.set(l.postedFor, (perDay.get(l.postedFor) || 0) + l.amount);

  const series = [];
  let cum = 0;
  for (let i = 0; i < days; i++) {
    const d = new Date(since);
    d.setDate(since.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    cum += perDay.get(key) || 0;
    series.push({ date: key, value: Math.round(cum * 100) / 100 });
  }
  return series;
}
