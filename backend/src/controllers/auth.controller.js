import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import { ROLES } from "../config/constants.js";

function signToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

function publicUser(u) {
  return { id: u._id, fullName: u.fullName, email: u.email, role: u.role };
}

export async function register(req, res, next) {
  try {
    const { fullName, email, password, phone = "", country = "" } = req.body;
    const exists = await User.findOne({ email });
    if (exists) throw new AppError("Email already registered", 409);

    const user = await User.create({ fullName, email, password, phone, country });
    const token = signToken(user);
    res.status(201).json({ success: true, token, user: publicUser(user) });
  } catch (err) {
    next(err);
  }
}

// Hidden admin registration. Requires a shared signup code (ADMIN_SIGNUP_CODE)
// so the endpoint cannot be used to self-promote even if the URL is discovered.
export async function adminRegister(req, res, next) {
  try {
    const { fullName, email, password, code } = req.body;
    if (!process.env.ADMIN_SIGNUP_CODE || code !== process.env.ADMIN_SIGNUP_CODE) {
      throw new AppError("Invalid admin signup code", 403);
    }
    const exists = await User.findOne({ email });
    if (exists) throw new AppError("Email already registered", 409);

    const user = await User.create({ fullName, email, password, role: ROLES.ADMIN });
    const token = signToken(user);
    res.status(201).json({ success: true, token, user: publicUser(user) });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      throw new AppError("Invalid credentials", 401);
    }
    if (user.banned) throw new AppError("This account has been suspended", 403);
    const token = signToken(user);
    res.json({ success: true, token, user: publicUser(user) });
  } catch (err) {
    next(err);
  }
}

export async function me(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) throw new AppError("User not found", 404);
    res.json({ success: true, user: publicUser(user) });
  } catch (err) {
    next(err);
  }
}

// - Account recovery (Phase 2 wiring; email token delivery lands in Phase 5) -
export async function forgotPassword(req, res) {
  // Always respond the same way so we don't reveal whether an email exists.
  // TODO(Phase 5): generate a signed token and email a reset link via mailer.
  res.json({ success: true, message: "If the account exists, a reset link has been sent." });
}

export async function resetPassword(req, res, next) {
  try {
    const { token, password } = req.body;
    if (!token || !password) throw new AppError("Token and new password are required", 422);
    // TODO(Phase 5): verify token, look up user, set new password.
    res.json({ success: true, message: "Password has been reset." });
  } catch (err) {
    next(err);
  }
}

export async function verifyEmail(req, res, next) {
  try {
    const { token } = req.body;
    if (!token) throw new AppError("Verification token is required", 422);
    // TODO(Phase 5): verify token and flip user.isEmailVerified = true.
    res.json({ success: true, message: "Email verified." });
  } catch (err) {
    next(err);
  }
}
