import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import investmentRoutes from "./investment.routes.js";
import paymentRoutes from "./payment.routes.js";
import adminRoutes from "./admin.routes.js";

const router = Router();
router.get("/health", (req, res) => res.json({ success: true, status: "ok" }));
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/investments", investmentRoutes);
router.use("/payments", paymentRoutes);
router.use("/admin", adminRoutes);
export default router;
