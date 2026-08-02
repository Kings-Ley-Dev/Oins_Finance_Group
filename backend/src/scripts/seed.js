import "dotenv/config";
import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";
import { Wallet } from "../models/Wallet.js";
import { Investment } from "../models/Investment.js";
import { EarningsLog } from "../models/EarningsLog.js";
import { Transaction } from "../models/Transaction.js";
import { Notification } from "../models/Notification.js";
import { Withdrawal } from "../models/Withdrawal.js";
import { KYC } from "../models/KYC.js";
import { PLAN_MAP, roiLabel, roiMidpoint } from "../config/plans.js";
import { dailyYield } from "../utils/calculations.js";

const DEMO_EMAIL = "demo@oinsfinance.com";

async function run() {
  await connectDB(process.env.MONGO_URI);
  console.log("[seed] clearing demo data…");

  let user = await User.findOne({ email: DEMO_EMAIL });
  if (user) {
    await Promise.all([
      Wallet.deleteOne({ user: user._id }),
      Investment.deleteMany({ user: user._id }),
      EarningsLog.deleteMany({ user: user._id }),
      Transaction.deleteMany({ user: user._id }),
      Notification.deleteMany({ user: user._id }),
    ]);
  } else {
    user = await User.create({ fullName: "Marcus Brown", email: DEMO_EMAIL, password: "password123", isEmailVerified: true });
  }

  await Wallet.create({ user: user._id, available: 2450.32, invested: 15000 });

  const picks = [
    { key: "ai-stock", principal: 5000, startedDaysAgo: 224 },
    { key: "real-estate", principal: 6000, startedDaysAgo: 92 },
    { key: "digital-currency", principal: 4000, startedDaysAgo: 26 },
  ];

  for (const pick of picks) {
    const plan = PLAN_MAP[pick.key];
    const start = new Date();
    start.setDate(start.getDate() - pick.startedDaysAgo);
    const maturity = new Date(start);
    maturity.setDate(start.getDate() + plan.termDays);

    const perDay = dailyYield({ principal: pick.principal, roiPercent: roiMidpoint(plan), termDays: plan.termDays });

    const inv = await Investment.create({
      user: user._id,
      assetKey: plan.key,
      assetName: plan.name,
      icon: plan.icon,
      principal: pick.principal,
      roiPercent: roiMidpoint(plan),
      roiLabel: roiLabel(plan),
      termDays: plan.termDays,
      startDate: start,
      maturityDate: maturity,
    });

    // Backfill 30 days of earnings so the chart is populated.
    let accrued = 0;
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      await EarningsLog.create({ user: user._id, investment: inv._id, amount: perDay, postedFor: key });
      await Transaction.create({ user: user._id, type: "earning", source: plan.name, amount: perDay, investment: inv._id, createdAt: d });
      accrued += perDay;
    }
    inv.accrued = Math.round(accrued * 100) / 100;
    await inv.save();
  }

  await Transaction.create({ user: user._id, type: "deposit", source: "Bank Transfer", amount: 4000 });

  await Notification.create([
    { user: user._id, type: "payment", title: "Deposit confirmed", body: "$4,000 credited to your wallet." },
    { user: user._id, type: "earning", title: "Daily yield posted", body: "+$86.40 from Digital Currency." },
    { user: user._id, type: "success", title: "Investment created", body: "$5,000 placed in AI Stock.", read: true },
  ]);

  // Admin account
  let adminUser = await User.findOne({ email: "admin@oinsfinance.com" });
  if (!adminUser) {
    adminUser = await User.create({ fullName: "Admin", email: "admin@oinsfinance.com", password: "admin12345", role: "admin", isEmailVerified: true });
  }

  // A pending withdrawal + KYC so the admin panel has items to action
  await Withdrawal.deleteMany({ user: user._id });
  await Withdrawal.create({ user: user._id, amount: 500, method: "crypto", coin: "USDT", destination: "TXdemoWalletAddr000000000000000", reference: "WDR-DEMO0001" });
  await KYC.findOneAndUpdate(
    { user: user._id },
    { status: "pending", submittedAt: new Date(), documents: [{ label: "Government ID (front)", url: "https://sandbox.local/oins/kyc/demo" }] },
    { upsert: true }
  );

  console.log(`[seed] done.\n  user:  ${DEMO_EMAIL} / password123\n  admin: admin@oinsfinance.com / admin12345`);
  process.exit(0);
}

run().catch((e) => { console.error(e); process.exit(1); });
