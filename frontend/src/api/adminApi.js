import api from "./axiosInstance";

export const adminApi = {
  overview: () => api.get("/admin/overview"),
  users: () => api.get("/admin/users"),
  banUser: (id, banned) => api.patch(`/admin/users/${id}/ban`, { banned }),
  adjustBalance: (id, delta, note) => api.patch(`/admin/users/${id}/balance`, { delta, note }),
  investments: () => api.get("/admin/investments"),
  deposits: () => api.get("/admin/deposits"),
  confirmDeposit: (reference) => api.post(`/admin/deposits/${reference}/confirm`),
  provideDepositDetails: (reference, details) => api.post(`/admin/deposits/${reference}/details`, details),
  rejectDeposit: (reference, reason) => api.post(`/admin/deposits/${reference}/reject`, { reason }),
  withdrawals: () => api.get("/admin/withdrawals"),
  decideWithdrawal: (id, decision) => api.patch(`/admin/withdrawals/${id}/${decision}`),
  kyc: () => api.get("/admin/kyc"),
  decideKyc: (id, decision, note) => api.patch(`/admin/kyc/${id}/${decision}`, { note }),
  transactions: () => api.get("/admin/transactions"),
  audit: () => api.get("/admin/audit"),
  getSettings: () => api.get("/admin/settings"),
  updateSettings: (patch) => api.patch("/admin/settings", patch),
};
