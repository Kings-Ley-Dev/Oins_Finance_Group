import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import { ROLES } from "../config/constants.js";

export function protect(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return next(new AppError("Not authorized", 401));
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    next(new AppError("Invalid or expired token", 401));
  }
}

export function adminOnly(req, res, next) {
  if (req.user?.role !== ROLES.ADMIN) return next(new AppError("Admin access required", 403));
  next();
}
