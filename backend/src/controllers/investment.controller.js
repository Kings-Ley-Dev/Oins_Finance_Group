import * as service from "../services/investment.service.js";
import { PLANS, roiLabel } from "../config/plans.js";

export function listPlans(req, res) {
  res.json({
    success: true,
    plans: PLANS.map((p) => ({
      key: p.key,
      name: p.name,
      icon: p.icon,
      roi: roiLabel(p),
      term: p.frequency === "daily" ? "Daily" : `${Math.round(p.termDays / 30)} months`,
    })),
  });
}

export async function subscribe(req, res, next) {
  try {
    const { investment, wallet } = await service.subscribe(req.user.id, req.body);
    res.status(201).json({ success: true, investment, balance: { available: wallet.available, invested: wallet.invested } });
  } catch (err) {
    next(err);
  }
}

export async function portfolio(req, res, next) {
  try {
    res.json({ success: true, portfolio: await service.getPortfolio(req.user.id) });
  } catch (err) {
    next(err);
  }
}

export async function summary(req, res, next) {
  try {
    res.json({ success: true, ...(await service.getSummary(req.user.id)) });
  } catch (err) {
    next(err);
  }
}

export async function earnings(req, res, next) {
  try {
    res.json({ success: true, earnings: await service.getEarningsSeries(req.user.id, 30) });
  } catch (err) {
    next(err);
  }
}
