import * as admin from "../services/admin.service.js";

const ok = (res, data) => res.json({ success: true, ...data });

export const overview = async (req, res, next) => { try { ok(res, { overview: await admin.overview() }); } catch (e) { next(e); } };
export const users = async (req, res, next) => { try { ok(res, { users: await admin.listUsers() }); } catch (e) { next(e); } };
export const banUser = async (req, res, next) => { try { await admin.setBan(req.user.id, req.params.id, req.body.banned !== false); ok(res, {}); } catch (e) { next(e); } };
export const adjustBalance = async (req, res, next) => { try { const w = await admin.adjustBalance(req.user.id, req.params.id, req.body.delta, req.body.note); ok(res, { wallet: { available: w.available } }); } catch (e) { next(e); } };

export const investments = async (req, res, next) => { try { ok(res, { investments: await admin.listInvestments() }); } catch (e) { next(e); } };
export const deposits = async (req, res, next) => { try { ok(res, { deposits: await admin.listDeposits() }); } catch (e) { next(e); } };
export const confirmDeposit = async (req, res, next) => { try { await admin.manualConfirmDeposit(req.user.id, req.params.reference); ok(res, {}); } catch (e) { next(e); } };
export const provideDepositDetails = async (req, res, next) => { try { const dep = await admin.provideDepositDetails(req.user.id, req.params.reference, req.body); ok(res, { deposit: dep }); } catch (e) { next(e); } };
export const rejectDeposit = async (req, res, next) => { try { await admin.rejectDeposit(req.user.id, req.params.reference, req.body?.reason); ok(res, {}); } catch (e) { next(e); } };
export const withdrawals = async (req, res, next) => { try { ok(res, { withdrawals: await admin.listWithdrawals() }); } catch (e) { next(e); } };
export const decideWithdrawal = async (req, res, next) => { try { await admin.decideWithdrawal(req.user.id, req.params.id, req.params.decision); ok(res, {}); } catch (e) { next(e); } };

export const kyc = async (req, res, next) => { try { ok(res, { kyc: await admin.listKyc() }); } catch (e) { next(e); } };
export const decideKyc = async (req, res, next) => { try { await admin.decideKyc(req.user.id, req.params.id, req.params.decision, req.body.note); ok(res, {}); } catch (e) { next(e); } };

export const transactions = async (req, res, next) => { try { ok(res, { transactions: await admin.listTransactions() }); } catch (e) { next(e); } };
export const audit = async (req, res, next) => { try { ok(res, { audit: await admin.listAudit() }); } catch (e) { next(e); } };

export const getSettings = async (req, res, next) => { try { ok(res, { settings: await admin.getSettings() }); } catch (e) { next(e); } };
export const updateSettings = async (req, res, next) => { try { ok(res, { settings: await admin.updateSettings(req.user.id, req.body) }); } catch (e) { next(e); } };
