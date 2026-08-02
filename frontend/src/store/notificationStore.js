import { create } from "zustand";
import { notificationApi } from "@/api/notificationApi";
import { useAuthStore } from "@/store/authStore";

const isDemo = () => useAuthStore.getState().token === "demo-token";

const DEMO = [
  { id: "d1", type: "payment", title: "Deposit confirmed", body: "$4,000 credited to your wallet.", read: false, createdAt: new Date(Date.now() - 3600e3).toISOString() },
  { id: "d2", type: "earning", title: "Daily yield posted", body: "+$86.40 from Digital Currency.", read: false, createdAt: new Date(Date.now() - 8 * 3600e3).toISOString() },
  { id: "d3", type: "success", title: "Investment created", body: "$5,000 placed in AI Stock.", read: true, createdAt: new Date(Date.now() - 26 * 3600e3).toISOString() },
];

export const useNotificationStore = create((set, get) => ({
  items: [],
  unread: 0,
  load: async () => {
    if (isDemo()) {
      set({ items: DEMO, unread: DEMO.filter((n) => !n.read).length });
      return;
    }
    try {
      const { data } = await notificationApi.list();
      set({ items: data.notifications, unread: data.unread });
    } catch { /* ignore */ }
  },
  // called by the socket when a live notification arrives
  receive: (n) => set((s) => ({ items: [n, ...s.items].slice(0, 30), unread: s.unread + 1 })),
  markRead: async (id) => {
    set((s) => ({
      items: s.items.map((n) => (n.id === id || n._id === id ? { ...n, read: true } : n)),
      unread: Math.max(0, s.unread - 1),
    }));
    if (!isDemo()) notificationApi.markRead(id).catch(() => {});
  },
  markAllRead: async () => {
    set((s) => ({ items: s.items.map((n) => ({ ...n, read: true })), unread: 0 }));
    if (!isDemo()) notificationApi.markAllRead().catch(() => {});
  },
  reset: () => set({ items: [], unread: 0 }),
}));
