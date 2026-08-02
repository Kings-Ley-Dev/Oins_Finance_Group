import { Router } from "express";
import * as c from "../controllers/admin.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = Router();
router.use(protect, adminOnly);

router.get("/overview", c.overview);

router.get("/users", c.users);
router.patch("/users/:id/ban", c.banUser);
router.patch("/users/:id/balance", c.adjustBalance);

router.get("/investments", c.investments);

router.get("/deposits", c.deposits);
router.post("/deposits/:reference/confirm", c.confirmDeposit);
router.post("/deposits/:reference/details", c.provideDepositDetails);
router.post("/deposits/:reference/reject", c.rejectDeposit);

router.get("/withdrawals", c.withdrawals);
router.patch("/withdrawals/:id/:decision", c.decideWithdrawal); // decision = approve | reject

router.get("/kyc", c.kyc);
router.patch("/kyc/:id/:decision", c.decideKyc);

router.get("/transactions", c.transactions);
router.get("/audit", c.audit);

router.get("/settings", c.getSettings);
router.patch("/settings", c.updateSettings);

export default router;
