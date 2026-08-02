import { investmentApi } from "@/api/investmentApi";
import { useAuthStore } from "@/store/authStore";
import {
  SAMPLE_BALANCE,
  SAMPLE_PORTFOLIO,
  SAMPLE_EARNINGS,
  SAMPLE_TRANSACTIONS,
} from "@/lib/sampleData";

const isDemo = () => useAuthStore.getState().token === "demo-token";
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function fetchSummary() {
  if (isDemo()) {
    await delay(280);
    return {
      balance: SAMPLE_BALANCE,
      portfolio: SAMPLE_PORTFOLIO,
      earnings: SAMPLE_EARNINGS,
      transactions: SAMPLE_TRANSACTIONS,
    };
  }
  const { data } = await investmentApi.summary();
  return {
    balance: data.balance,
    portfolio: data.portfolio,
    earnings: data.earnings,
    transactions: data.transactions,
  };
}

export async function subscribePlan(payload) {
  if (isDemo()) {
    await delay(280);
    return { demo: true };
  }
  const { data } = await investmentApi.subscribe(payload);
  return data;
}
