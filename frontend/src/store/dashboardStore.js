import { create } from "zustand";
import { fetchSummary } from "@/lib/dashboardService";

export const useDashboardStore = create((set, get) => ({
  status: "idle", // idle | loading | ready | error
  error: null,
  balance: null,
  portfolio: [],
  earnings: [],
  transactions: [],

  load: async (force = false) => {
    const s = get().status;
    if (!force && (s === "loading" || s === "ready")) return;
    set({ status: "loading", error: null });
    try {
      const data = await fetchSummary();
      set({ ...data, status: "ready" });
    } catch (e) {
      set({ status: "error", error: e?.response?.data?.message || "Failed to load dashboard" });
    }
  },

  reset: () =>
    set({ status: "idle", error: null, balance: null, portfolio: [], earnings: [], transactions: [] }),
}));
