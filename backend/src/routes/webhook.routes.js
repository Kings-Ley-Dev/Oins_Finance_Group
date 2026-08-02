import { Router } from "express";
import { bankWebhook, cryptoWebhook } from "../controllers/webhook.controller.js";

// Mounted with a raw body parser so signatures can be verified (see app.js).
const router = Router();
router.post("/bank", bankWebhook);
router.post("/crypto", cryptoWebhook);
export default router;
