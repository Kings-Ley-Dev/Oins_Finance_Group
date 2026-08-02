import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: "global", unique: true },
    maintenanceMode: { type: Boolean, default: false },
    registrationOpen: { type: Boolean, default: true },
    withdrawalsEnabled: { type: Boolean, default: true },
    // Per-asset ROI overrides: { "ai-stock": { roiMin, roiMax } }
    roiOverrides: { type: Map, of: new mongoose.Schema({ roiMin: Number, roiMax: Number }, { _id: false }), default: {} },
  },
  { timestamps: true }
);

settingsSchema.statics.getGlobal = async function () {
  let s = await this.findOne({ key: "global" });
  if (!s) s = await this.create({ key: "global" });
  return s;
};

export const Settings = mongoose.model("Settings", settingsSchema);
