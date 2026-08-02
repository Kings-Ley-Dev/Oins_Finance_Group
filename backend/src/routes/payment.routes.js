import { Router } from "express";
import { deposit, markDepositPaid, deposits, withdraw, withdrawals, devConfirm } from "../controllers/payment.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validator.middleware.js";
import { depositSchema, withdrawSchema } from "../validators/payment.validator.js";

const router = Router();
router.use(protect);
router.post("/deposit", validate(depositSchema), deposit);
router.get("/deposits", deposits);
router.post("/deposits/:reference/paid", markDepositPaid);
router.post("/withdraw", validate(withdrawSchema), withdraw);
router.get("/withdrawals", withdrawals);
router.post("/dev/confirm/:reference", devConfirm); // dev-only confirmation
export default router;
