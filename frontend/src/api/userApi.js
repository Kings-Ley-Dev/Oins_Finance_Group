import api from "./axiosInstance";

export const userApi = {
  updateProfile: (payload) => api.patch("/users/profile", payload),
  getKyc: () => api.get("/users/kyc"),
  submitKyc: (formData) =>
    api.post("/users/kyc", formData, { headers: { "Content-Type": "multipart/form-data" } }),
};
