import api from "./axiosInstance";

export const investmentApi = {
  plans: () => api.get("/investments/plans"),
  summary: () => api.get("/investments/summary"),
  portfolio: () => api.get("/investments/portfolio"),
  earnings: () => api.get("/investments/earnings"),
  subscribe: (payload) => api.post("/investments/subscribe", payload),
};
