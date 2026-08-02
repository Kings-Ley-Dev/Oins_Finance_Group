import api from "./axiosInstance";

export const paymentApi = {
  deposit: (payload) => api.post("/payments/deposit", payload),
  deposits: () => api.get("/payments/deposits"),
  markPaid: (reference) => api.post(`/payments/deposits/${reference}/paid`),
  withdraw: (payload) => api.post("/payments/withdraw", payload),
  withdrawals: () => api.get("/payments/withdrawals"),
  devConfirm: (reference) => api.post(`/payments/dev/confirm/${reference}`),
};
