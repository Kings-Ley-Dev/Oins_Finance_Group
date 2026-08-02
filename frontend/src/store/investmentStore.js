import { create } from "zustand";

export const useInvestmentStore = create((set) => ({
  plans: [],
  portfolio: [],
  setPlans: (plans) => set({ plans }),
  setPortfolio: (portfolio) => set({ portfolio }),
}));
