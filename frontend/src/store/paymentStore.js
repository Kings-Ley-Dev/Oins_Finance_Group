import { create } from "zustand";

export const usePaymentStore = create((set) => ({
  step: "form", // form | bank | crypto
  deposit: null, // the active deposit record returned by the API
  setStep: (step) => set({ step }),
  startDeposit: (deposit) =>
    set({ deposit, step: deposit?.method === "crypto" ? "crypto" : "bank" }),
  reset: () => set({ step: "form", deposit: null }),
}));
