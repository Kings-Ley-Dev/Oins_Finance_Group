import { Notification } from "../models/Notification.js";
import { User } from "../models/User.js";
import { sendMail } from "../config/mailer.js";
import { emitToUser } from "../sockets/socketHandler.js";

// Unified distribution: persists an in-app notification, pushes it over the
// socket in real time, and (optionally) emails the user.
export async function notify(userId, { type = "info", title, body = "", email = false }) {
  const notification = await Notification.create({ user: userId, type, title, body });
  emitToUser(userId, "notification", {
    id: notification._id,
    type,
    title,
    body,
    read: false,
    createdAt: notification.createdAt,
  });

  if (email) {
    const user = await User.findById(userId).select("email");
    if (user?.email) sendMail({ to: user.email, subject: title, text: body }).catch(() => {});
  }
  return notification;
}

// Notify every admin (used for deposit requests / payment confirmations).
export async function notifyAdmins({ type = "info", title, body = "" }) {
  const admins = await User.find({ role: "admin" }).select("_id");
  await Promise.all(admins.map((a) => notify(a._id, { type, title, body })));
}

export function listNotifications(userId, limit = 30) {
  return Notification.find({ user: userId }).sort({ createdAt: -1 }).limit(limit);
}

export function unreadCount(userId) {
  return Notification.countDocuments({ user: userId, read: false });
}

export async function markRead(userId, id) {
  await Notification.updateOne({ _id: id, user: userId }, { read: true });
}

export async function markAllRead(userId) {
  await Notification.updateMany({ user: userId, read: false }, { read: true });
}
