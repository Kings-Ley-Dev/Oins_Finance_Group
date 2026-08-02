export const formatUSD = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);

export const formatCrypto = (n, symbol = "BTC") =>
  `${(Number(n) || 0).toFixed(6)} ${symbol}`;

export const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const formatPct = (n) => `${(Number(n) || 0).toFixed(2)}%`;
