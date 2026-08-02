import api from "./axiosInstance";

export const authApi = {
  login: (payload) => api.post("/auth/login", payload),
  register: (payload) => api.post("/auth/register", payload),
  adminRegister: (payload) => api.post("/auth/admin/register", payload),
  verifyEmail: (payload) => api.post("/auth/verify-email", payload),
  forgotPassword: (payload) => api.post("/auth/forgot-password", payload),
  resetPassword: (payload) => api.post("/auth/reset-password", payload),
  me: () => api.get("/auth/me"),
};
