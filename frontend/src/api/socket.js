import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  path: "/api/socket.io", // Directs socket traffic through the cPanel /api route
  transports: ["polling", "websocket"],
});

export default socket;
