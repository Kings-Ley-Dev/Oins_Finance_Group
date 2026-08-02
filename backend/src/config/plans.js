// Canonical investment plan catalog. roiMin/roiMax are the advertised range;
// roiPercent (midpoint) is the representative total return used for accrual.
const months = (n) => n * 30;

export const PLANS = [
  { key: "agro-farming",      name: "Agro Farming",      icon: "Tractor",    roiMin: 8.5,  roiMax: 15.6, termDays: months(7),  frequency: "term" },
  { key: "oil-gas",           name: "Oil & Gas",         icon: "Fuel",       roiMin: 15.0, roiMax: 35.0, termDays: months(12), frequency: "term" },
  { key: "real-estate",       name: "Real Estate",       icon: "Building2",  roiMin: 8.0,  roiMax: 12.0, termDays: months(9),  frequency: "term" },
  { key: "digital-currency",  name: "Digital Currency",  icon: "Bitcoin",    roiMin: 10.0, roiMax: 40.0, termDays: 30,         frequency: "daily" },
  { key: "ai-stock",          name: "AI Stock",          icon: "Cpu",        roiMin: 23.7, roiMax: 72.4, termDays: months(12), frequency: "term" },
  { key: "mineral-resources", name: "Mineral Resources", icon: "Gem",        roiMin: 33.5, roiMax: 54.5, termDays: months(12), frequency: "term" },
  { key: "digital-banking",   name: "Digital Banking",   icon: "CreditCard", roiMin: 40.0, roiMax: 70.0, termDays: months(12), frequency: "term" },
  { key: "lending",           name: "Lending",           icon: "HandCoins",  roiMin: 8.5,  roiMax: 17.3, termDays: months(12), frequency: "term" },
];

export const PLAN_MAP = Object.fromEntries(PLANS.map((p) => [p.key, p]));

export const roiLabel = (p) => `${p.roiMin.toFixed(1)}% - ${p.roiMax.toFixed(1)}%`;
export const roiMidpoint = (p) => Math.round(((p.roiMin + p.roiMax) / 2) * 10) / 10;
