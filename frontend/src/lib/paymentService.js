import { paymentApi } from "@/api/paymentApi";
import { useAuthStore } from "@/store/authStore";

const isDemo = () => useAuthStore.getState().token === "demo-token";
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const ref = () => "DEP-" + Math.random().toString(16).slice(2, 12).toUpperCase();

// Create a deposit REQUEST. No account details are returned - an admin issues
// them to the dashboard + email, then the user marks the deposit as paid.
export async function initDeposit({ method, amount, coin }) {
  if (isDemo()) {
    await delay(280);
    return { method, amount: Number(amount), coin: method === "crypto" ? coin : undefined, reference: ref(), flowStatus: "requested" };
  }
  const { data } = await paymentApi.deposit({ method, amount: Number(amount), coin });
  return data.deposit;
}

export async function listMyDeposits() {
  if (isDemo()) { await delay(200); return []; }
  const { data } = await paymentApi.deposits();
  return data.deposits;
}

export async function markDepositPaid(reference) {
  if (isDemo()) { await delay(280); return { demo: true }; }
  const { data } = await paymentApi.markPaid(reference);
  return data.deposit;
}

export async function confirmDepositDev(reference) {
  if (isDemo()) { await delay(280); return { demo: true }; }
  const { data } = await paymentApi.devConfirm(reference);
  return data;
}

export async function requestWithdrawal(payload) {
  if (isDemo()) { await delay(280); return { demo: true }; }
  const { data } = await paymentApi.withdraw(payload);
  return data;
}
