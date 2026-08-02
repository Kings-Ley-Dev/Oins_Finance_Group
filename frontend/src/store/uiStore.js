import { create } from "zustand";

export const useUiStore = create((set) => ({
  sidebarOpen: false,
  toasts: [],
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  pushToast: (t) =>
    set((s) => ({ toasts: [...s.toasts, { id: Date.now(), ...t }] })),
  dismissToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
