import { io } from "socket.io-client";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";
import { useDashboardStore } from "@/store/dashboardStore";
import { useUiStore } from "@/store/uiStore";

let socket = null;

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export function connectSocket() {
  const token = useAuthStore.getState().token;
  // No live socket in demo mode (no server) or when already connected.
  if (!token || token === "demo-token" || socket) return;

  socket = io(SOCKET_URL, { auth: { token }, transports: ["websocket"], reconnection: true });

  socket.on("notification", (n) => {
    useNotificationStore.getState().receive(n);
    useUiStore.getState().pushToast({ type: n.type === "payment" ? "success" : "info", title: n.title, message: n.body });
  });

  socket.on("wallet:update", () => {
    useDashboardStore.getState().load(true);
  });
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
