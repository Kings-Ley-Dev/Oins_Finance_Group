import { Router } from "express";
import {
  register,
  adminRegister,
  login,
  me,
  forgotPassword,
  resetPassword,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { validate } from "../middleware/validator.middleware.js";
import { protect } from "../middleware/auth.middleware.js";
import { registerSchema, adminRegisterSchema, loginSchema } from "../validators/auth.validator.js";

const router = Router();

// ── Actual Paths on Server: /api/v1/auth/... ──

// POST https://api.oinsfinancegroup.com/api/v1/auth/register
router.post("/register", validate(registerSchema), register);

// POST https://api.oinsfinancegroup.com/api/v1/auth/admin/register
router.post("/admin/register", validate(adminRegisterSchema), adminRegister);

// POST https://api.oinsfinancegroup.com/api/v1/auth/login
router.post("/login", validate(loginSchema), login);

// POST https://api.oinsfinancegroup.com/api/v1/auth/forgot-password
router.post("/forgot-password", forgotPassword);

// POST https://api.oinsfinancegroup.com/api/v1/auth/reset-password
router.post("/reset-password", resetPassword);

// POST https://api.oinsfinancegroup.com/api/v1/auth/verify-email
router.post("/verify-email", verifyEmail);

// GET  https://api.oinsfinancegroup.com/api/v1/auth/me
router.get("/me", protect, me);

export default router;
