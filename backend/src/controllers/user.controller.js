import { User } from "../models/User.js";
import { KYC } from "../models/KYC.js";
import { uploadBuffer } from "../config/cloudinary.js";
import * as notifications from "../services/notification.service.js";
import { notify } from "../services/notification.service.js";
import { AppError } from "../utils/AppError.js";

export async function updateProfile(req, res, next) {
  try {
    const allowed = (({ fullName, phone, country }) => ({ fullName, phone, country }))(req.body);
    const user = await User.findByIdAndUpdate(req.user.id, allowed, { new: true });
    res.json({ success: true, user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
}

// - KYC -
export async function getKyc(req, res, next) {
  try {
    const kyc = await KYC.findOne({ user: req.user.id });
    res.json({ success: true, kyc: kyc || { status: "unverified", documents: [] } });
  } catch (err) {
    next(err);
  }
}

export async function submitKyc(req, res, next) {
  try {
    const files = req.files || [];
    if (!files.length) throw new AppError("Upload at least one document", 422);
    const labels = [].concat(req.body.labels || []);

    const documents = [];
    for (let i = 0; i < files.length; i++) {
      const up = await uploadBuffer(files[i].buffer, "oins/kyc");
      documents.push({ label: labels[i] || `Document ${i + 1}`, url: up.url, publicId: up.publicId });
    }

    const kyc = await KYC.findOneAndUpdate(
      { user: req.user.id },
      { documents, status: "pending", submittedAt: new Date() },
      { new: true, upsert: true }
    );

    await notify(req.user.id, { type: "kyc", title: "KYC submitted", body: "Your documents are under review." });
    res.status(201).json({ success: true, kyc });
  } catch (err) {
    next(err);
  }
}

// - Notifications -
export async function listNotifications(req, res, next) {
  try {
    const [items, unread] = await Promise.all([
      notifications.listNotifications(req.user.id),
      notifications.unreadCount(req.user.id),
    ]);
    res.json({ success: true, notifications: items, unread });
  } catch (err) {
    next(err);
  }
}

export async function markRead(req, res, next) {
  try {
    await notifications.markRead(req.user.id, req.params.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

export async function markAllRead(req, res, next) {
  try {
    await notifications.markAllRead(req.user.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
