// Drift-free daily yield. ROI stored as annual-equivalent percent; here we
// derive a flat daily increment over the plan term for predictable accrual.
export function dailyYield({ principal, roiPercent, termDays }) {
  const total = (Number(principal) * Number(roiPercent)) / 100;
  const perDay = total / Number(termDays);
  // round to 2 dp to avoid floating drift across the ledger
  return Math.round(perDay * 100) / 100;
}
