import { Router } from "express";
import {
  updateProfile,
  getKyc,
  submitKyc,
  listNotifications,
  markRead,
  markAllRead,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();
router.use(protect);
router.patch("/profile", updateProfile);
router.get("/kyc", getKyc);
router.post("/kyc", upload.array("documents", 3), submitKyc);
router.get("/notifications", listNotifications);
router.patch("/notifications/read-all", markAllRead);
router.patch("/notifications/:id/read", markRead);
export default router;
