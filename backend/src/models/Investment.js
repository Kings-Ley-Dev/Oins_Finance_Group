import mongoose from "mongoose";
import { INVESTMENT_STATUS } from "../config/constants.js";

const investmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    assetKey: { type: String, required: true },
    assetName: { type: String, required: true },
    icon: { type: String, default: "" },
    principal: { type: Number, required: true, min: 100 },
    roiPercent: { type: Number, required: true }, // representative total return %
    roiLabel: { type: String, default: "" },
    termDays: { type: Number, required: true },
    accrued: { type: Number, default: 0 },
    startDate: { type: Date, default: Date.now },
    maturityDate: { type: Date, required: true },
    status: { type: String, enum: Object.values(INVESTMENT_STATUS), default: INVESTMENT_STATUS.ACTIVE },
  },
  { timestamps: true }
);

export const Investment = mongoose.model("Investment", investmentSchema);
