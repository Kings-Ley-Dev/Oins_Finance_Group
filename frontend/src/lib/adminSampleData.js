// SAMPLE admin data for demo-admin preview (no backend).
export const ADMIN_OVERVIEW = { users: 2547, totalDeposits: 4820500, totalInvested: 3910000, withdrawalsPending: 7, activeInvestments: 1382, kycPending: 12 };

export const ADMIN_USERS = [
  { id: "u1", fullName: "Marcus Brown", email: "demo@oinsfinance.com", role: "user", banned: false, available: 2450.32, invested: 15000, createdAt: "2026-02-11" },
  { id: "u2", fullName: "Aïcha Diallo", email: "aicha@example.com", role: "user", banned: false, available: 880, invested: 6200, createdAt: "2026-03-02" },
  { id: "u3", fullName: "Liam O'Connor", email: "liam@example.com", role: "user", banned: true, available: 0, invested: 0, createdAt: "2026-01-19" },
  { id: "u4", fullName: "Admin", email: "admin@oinsfinance.com", role: "admin", banned: false, available: 0, invested: 0, createdAt: "2026-01-01" },
];

export const ADMIN_WITHDRAWALS = [
  { id: "w1", user: { fullName: "Marcus Brown", email: "demo@oinsfinance.com" }, amount: 500, method: "crypto", coin: "USDT", destination: "TXdemo…0000", status: "pending", createdAt: "2026-06-21" },
  { id: "w2", user: { fullName: "Aïcha Diallo", email: "aicha@example.com" }, amount: 1200, method: "bank", destination: "DE89…4032", status: "pending", createdAt: "2026-06-20" },
  { id: "w3", user: { fullName: "Liam O'Connor", email: "liam@example.com" }, amount: 300, method: "crypto", coin: "BTC", destination: "bc1q…9f2", status: "completed", createdAt: "2026-06-15" },
];

export const ADMIN_DEPOSITS = [
  { reference: "DEP-A1B2C3", user: { fullName: "Marcus Brown" }, method: "bank", amount: 4000, status: "completed", createdAt: "2026-06-18" },
  { reference: "DEP-D4E5F6", user: { fullName: "Aïcha Diallo" }, method: "crypto", coin: "ETH", amount: 1500, status: "pending", createdAt: "2026-06-22" },
];

export const ADMIN_INVESTMENTS = [
  { id: "i1", user: { fullName: "Marcus Brown" }, assetName: "AI Stock", principal: 5000, roiLabel: "23.7% - 72.4%", accrued: 1284.5, status: "active" },
  { id: "i2", user: { fullName: "Aïcha Diallo" }, assetName: "Real Estate", principal: 6000, roiLabel: "8.0% - 12.0%", accrued: 432, status: "active" },
];

export const ADMIN_KYC = [
  { id: "k1", user: { fullName: "Marcus Brown", email: "demo@oinsfinance.com" }, status: "pending", submittedAt: "2026-06-20", documents: [{ label: "Government ID (front)" }, { label: "Proof of address" }] },
];

export const ADMIN_TRANSACTIONS = [
  { id: "t1", user: { fullName: "Marcus Brown" }, type: "deposit", source: "Bank Transfer", amount: 4000, status: "completed", createdAt: "2026-06-18" },
  { id: "t2", user: { fullName: "Aïcha Diallo" }, type: "investment", source: "Real Estate", amount: 6000, status: "completed", createdAt: "2026-06-17" },
  { id: "t3", user: { fullName: "Marcus Brown" }, type: "earning", source: "AI Stock", amount: 6.68, status: "completed", createdAt: "2026-06-22" },
];

export const ADMIN_AUDIT = [
  { id: "a1", actor: { fullName: "Admin" }, action: "withdrawal.approve", target: "w3", createdAt: "2026-06-15" },
  { id: "a2", actor: { fullName: "Admin" }, action: "user.ban", target: "u3", createdAt: "2026-01-20" },
];

export const ADMIN_SETTINGS = { maintenanceMode: false, registrationOpen: true, withdrawalsEnabled: true, roiOverrides: {} };
