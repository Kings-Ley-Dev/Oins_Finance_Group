import { Router } from "express";
import { listPlans, subscribe, portfolio, summary, earnings } from "../controllers/investment.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validator.middleware.js";
import { subscribeSchema } from "../validators/investment.validator.js";

const router = Router();
router.get("/plans", listPlans);
router.use(protect); // everything below requires auth
router.get("/summary", summary);
router.get("/portfolio", portfolio);
router.get("/earnings", earnings);
router.post("/subscribe", validate(subscribeSchema), subscribe);
export default router;
