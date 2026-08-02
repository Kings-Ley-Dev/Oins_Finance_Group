// SAMPLE DATA - used to render the dashboard before the Phase 3 investment
// endpoints exist. Replace each export with investmentApi calls when ready.

export const SAMPLE_BALANCE = {
  total: 18450.32,
  invested: 15000,
  available: 2450.32,
  earnings: 3450.32,
};

export const SAMPLE_PORTFOLIO = [
  {
    id: "inv_1",
    asset: "AI Stock",
    assetKey: "ai-stock",
    icon: "Cpu",
    principal: 5000,
    roi: "23.7% - 72.4%",
    accrued: 1284.5,
    progress: 0.62,
    term: "12 months",
    daysLeft: 138,
    status: "active",
  },
  {
    id: "inv_2",
    asset: "Real Estate",
    assetKey: "real-estate",
    icon: "Building2",
    principal: 6000,
    roi: "8.0% - 12.0%",
    accrued: 432.0,
    progress: 0.34,
    term: "9 months",
    daysLeft: 178,
    status: "active",
  },
  {
    id: "inv_3",
    asset: "Digital Currency",
    assetKey: "digital-currency",
    icon: "Bitcoin",
    principal: 4000,
    roi: "10.0% - 40.0%",
    accrued: 1733.82,
    progress: 0.88,
    term: "Daily",
    daysLeft: 22,
    status: "active",
  },
];

// 30-day cumulative earnings curve for the growth chart.
export const SAMPLE_EARNINGS = (() => {
  const out = [];
  let cum = 1850;
  const start = new Date();
  start.setDate(start.getDate() - 29);
  for (let i = 0; i < 30; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    cum += 35 + Math.round(Math.sin(i / 3) * 18 + i * 2.4);
    out.push({ date: d.toISOString().slice(0, 10), value: Math.round(cum * 100) / 100 });
  }
  return out;
})();

export const SAMPLE_TRANSACTIONS = [
  { id: "tx_1", type: "Earning", asset: "Digital Currency", amount: 86.4, status: "completed", date: "2026-06-21" },
  { id: "tx_2", type: "Deposit", asset: "Bank Transfer", amount: 4000, status: "completed", date: "2026-06-18" },
  { id: "tx_3", type: "Earning", asset: "AI Stock", amount: 41.2, status: "completed", date: "2026-06-18" },
  { id: "tx_4", type: "Withdrawal", asset: "USDT", amount: 1200, status: "pending", date: "2026-06-17" },
  { id: "tx_5", type: "Earning", asset: "Real Estate", amount: 12.6, status: "completed", date: "2026-06-16" },
];
