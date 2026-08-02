import mongoose from "mongoose";
import { TX_STATUS } from "../config/constants.js";

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    type: { type: String, enum: ["deposit", "withdrawal", "investment", "earning"], required: true },
    source: { type: String, default: "" }, // asset name or gateway
    amount: { type: Number, required: true },
    status: { type: String, enum: Object.values(TX_STATUS), default: TX_STATUS.COMPLETED },
    investment: { type: mongoose.Schema.Types.ObjectId, ref: "Investment" },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
