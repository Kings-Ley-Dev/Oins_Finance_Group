import mongoose from "mongoose";
import { TX_STATUS } from "../config/constants.js";

const depositSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    method: { type: String, enum: ["bank", "crypto"], required: true },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, default: "USD" },
    reference: { type: String, required: true, unique: true, index: true },
    status: { type: String, enum: Object.values(TX_STATUS), default: TX_STATUS.PENDING },
    // Admin-driven deposit flow:
    // requested -> details_sent -> paid -> confirmed (or rejected)
    flowStatus: {
      type: String,
      enum: ["requested", "details_sent", "paid", "confirmed", "rejected"],
      default: "requested",
      index: true,
    },
    // Deposit account details issued by an admin (bank or crypto).
    accountDetails: {
      bankName: String,
      bankAddress: String,
      accountName: String,
      accountNumber: String,
      accountAddress: String,
      routingOrSwift: String,
      coin: String,
      network: String,
      address: String,
      instructions: String,
    },
    detailsSentAt: Date,
    paidAt: Date,
    rejectedAt: Date,
    rejectionReason: String,
    // bank
    virtualAccount: {
      bankName: String,
      accountName: String,
      accountNumber: String,
      expiresAt: Date,
    },
    // crypto
    coin: String,
    network: String,
    address: String,
    provider: { type: String, default: "sandbox" },
    confirmedAt: Date,
  },
  { timestamps: true }
);

export const Deposit = mongoose.model("Deposit", depositSchema);
