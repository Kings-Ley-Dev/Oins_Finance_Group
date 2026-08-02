import mongoose from "mongoose";

const docSchema = new mongoose.Schema(
  { label: String, url: String, publicId: String },
  { _id: false }
);

const kycSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    status: { type: String, enum: ["unverified", "pending", "approved", "rejected"], default: "unverified" },
    documents: [docSchema],
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewNote: String,
    submittedAt: Date,
  },
  { timestamps: true }
);

export const KYC = mongoose.model("KYC", kycSchema);
