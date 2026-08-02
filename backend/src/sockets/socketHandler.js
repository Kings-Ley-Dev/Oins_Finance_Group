import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io = null;

// Attaches Socket.IO to the HTTP server, authenticates each connection with the
// same JWT used for the REST API, and joins each user to a private room.
export function initSockets(httpServer) {
  io = new Server(httpServer, {
    cors: { origin: process.env.CLIENT_URL || "https://oinsfinancegroup.com", credentials: true },
    transports: ["websocket", "polling"],
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("unauthorized"));
    try {
      socket.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch {
      next(new Error("unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    socket.join(`user:${socket.user.id}`);
    socket.emit("connected", { ok: true });
  });

  console.log("[sockets] Socket.IO ready");
  return io;
}

// Emit an event to a single user's room. Safe no-op if sockets aren't running
// (e.g. inside the worker process - production would bridge via a Redis adapter).
export function emitToUser(userId, event, payload) {
  if (!io) return;
  io.to(`user:${userId}`).emit(event, payload);
}
