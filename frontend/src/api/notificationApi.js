import api from "./axiosInstance";

export const notificationApi = {
  list: () => api.get("/users/notifications"),
  markRead: (id) => api.patch(`/users/notifications/${id}/read`),
  markAllRead: () => api.patch("/users/notifications/read-all"),
};
