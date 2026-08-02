import { Worker } from "bullmq";
import { connection } from "../../config/redis.js";
import { Investment } from "../../models/Investment.js";
import { EarningsLog } from "../../models/EarningsLog.js";
import { Transaction } from "../../models/Transaction.js";
import { dailyYield } from "../../utils/calculations.js";
import { INVESTMENT_STATUS } from "../../config/constants.js";

// Loops active investments and posts the daily yield to the append-only ledger,
// mirroring each posting as an `earning` transaction for the activity feed.
export const profitDistributor = new Worker(
  "calculations",
  async (job) => {
    if (job.name !== "daily-profit") return;
    const today = new Date().toISOString().slice(0, 10);
    const active = await Investment.find({ status: INVESTMENT_STATUS.ACTIVE });

    let posted = 0;
    for (const inv of active) {
      const amount = dailyYield({
        principal: inv.principal,
        roiPercent: inv.roiPercent,
        termDays: inv.termDays,
      });
      try {
        await EarningsLog.create({ user: inv.user, investment: inv._id, amount, postedFor: today });
        inv.accrued += amount;
        await inv.save();
        await Transaction.create({
          user: inv.user,
          type: "earning",
          source: inv.assetName,
          amount,
          investment: inv._id,
        });
        posted++;
      } catch (e) {
        if (e.code !== 11000) throw e; // unique guard => already posted today
      }
    }
    return { processed: active.length, posted, date: today };
  },
  { connection }
);
