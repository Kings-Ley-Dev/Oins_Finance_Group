import * as pay from "../services/payment.service.js";
import { AppError } from "../utils/AppError.js";

export async function deposit(req, res, next) {
  try {
    const { method, amount, coin } = req.body;
    const dep =
      method === "crypto"
        ? await pay.initCryptoDeposit(req.user.id, amount, coin)
        : await pay.initBankDeposit(req.user.id, amount);
    res.status(201).json({ success: true, deposit: dep });
  } catch (err) {
    next(err);
  }
}

export async function markDepositPaid(req, res, next) {
  try {
    const dep = await pay.markDepositPaid(req.user.id, req.params.reference);
    res.json({ success: true, deposit: dep });
  } catch (err) {
    next(err);
  }
}

export async function deposits(req, res, next) {
  try {
    res.json({ success: true, deposits: await pay.listDeposits(req.user.id) });
  } catch (err) {
    next(err);
  }
}

export async function withdraw(req, res, next) {
  try {
    const w = await pay.requestWithdrawal(req.user.id, req.body);
    res.status(201).json({ success: true, withdrawal: w });
  } catch (err) {
    next(err);
  }
}

export async function withdrawals(req, res, next) {
  try {
    res.json({ success: true, withdrawals: await pay.listWithdrawals(req.user.id) });
  } catch (err) {
    next(err);
  }
}

// DEV ONLY: simulate a provider confirming a deposit (no real gateway in sandbox).
export async function devConfirm(req, res, next) {
  try {
    if (process.env.NODE_ENV === "production") throw new AppError("Not available", 403);
    const dep = await pay.confirmDeposit(req.params.reference);
    res.json({ success: true, deposit: dep });
  } catch (err) {
    next(err);
  }
}
