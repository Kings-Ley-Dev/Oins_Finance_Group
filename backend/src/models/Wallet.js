import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    available: { type: Number, default: 0 }, // funds ready to invest/withdraw
    invested: { type: Number, default: 0 },  // principal locked in active plans
    currency: { type: String, default: "USD" },
  },
  { timestamps: true }
);

export const Wallet = mongoose.model("Wallet", walletSchema);
