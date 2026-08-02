import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    amount: { type: Number, required: true, min: 1 },
    method: { type: String, enum: ["bank", "crypto"], required: true },
    destination: { type: String, required: true }, // bank account or wallet address
    coin: String,
    status: { type: String, enum: ["pending", "approved", "rejected", "completed"], default: "pending" },
    reference: { type: String, required: true, unique: true, index: true },
    processedAt: Date,
  },
  { timestamps: true }
);

export const Withdrawal = mongoose.model("Withdrawal", withdrawalSchema);
