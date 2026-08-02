import mongoose from "mongoose";

// Append-only micro-ledger: one record per investment per day for the chart.
const earningsLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    investment: { type: mongoose.Schema.Types.ObjectId, ref: "Investment", index: true },
    amount: { type: Number, required: true },
    postedFor: { type: String, required: true }, // YYYY-MM-DD, unique per investment
  },
  { timestamps: true }
);

earningsLogSchema.index({ investment: 1, postedFor: 1 }, { unique: true });

export const EarningsLog = mongoose.model("EarningsLog", earningsLogSchema);
