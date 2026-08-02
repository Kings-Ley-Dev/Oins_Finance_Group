import { adminApi } from "@/api/adminApi";
import { useAuthStore } from "@/store/authStore";
import * as S from "@/lib/adminSampleData";

const isDemo = () => useAuthStore.getState().token === "demo-admin-token";
const d = (v) => new Promise((r) => setTimeout(() => r(v), 220));

export const adminService = {
  overview: () => (isDemo() ? d(S.ADMIN_OVERVIEW) : adminApi.overview().then((r) => r.data.overview)),
  users: () => (isDemo() ? d(S.ADMIN_USERS) : adminApi.users().then((r) => r.data.users)),
  investments: () => (isDemo() ? d(S.ADMIN_INVESTMENTS) : adminApi.investments().then((r) => r.data.investments)),
  deposits: () => (isDemo() ? d(S.ADMIN_DEPOSITS) : adminApi.deposits().then((r) => r.data.deposits)),
  withdrawals: () => (isDemo() ? d(S.ADMIN_WITHDRAWALS) : adminApi.withdrawals().then((r) => r.data.withdrawals)),
  kyc: () => (isDemo() ? d(S.ADMIN_KYC) : adminApi.kyc().then((r) => r.data.kyc)),
  transactions: () => (isDemo() ? d(S.ADMIN_TRANSACTIONS) : adminApi.transactions().then((r) => r.data.transactions)),
  audit: () => (isDemo() ? d(S.ADMIN_AUDIT) : adminApi.audit().then((r) => r.data.audit)),
  settings: () => (isDemo() ? d(S.ADMIN_SETTINGS) : adminApi.getSettings().then((r) => r.data.settings)),

  banUser: (id, banned) => (isDemo() ? d(true) : adminApi.banUser(id, banned)),
  adjustBalance: (id, delta, note) => (isDemo() ? d(true) : adminApi.adjustBalance(id, delta, note)),
  confirmDeposit: (ref) => (isDemo() ? d(true) : adminApi.confirmDeposit(ref)),
  provideDepositDetails: (ref, details) => (isDemo() ? d(true) : adminApi.provideDepositDetails(ref, details).then((r) => r.data.deposit)),
  rejectDeposit: (ref, reason) => (isDemo() ? d(true) : adminApi.rejectDeposit(ref, reason)),
  decideWithdrawal: (id, decision) => (isDemo() ? d(true) : adminApi.decideWithdrawal(id, decision)),
  decideKyc: (id, decision, note) => (isDemo() ? d(true) : adminApi.decideKyc(id, decision, note)),
  updateSettings: (patch) => (isDemo() ? d(patch) : adminApi.updateSettings(patch).then((r) => r.data.settings)),
};
