import crypto from "crypto";

const NETWORKS = {
  BTC: "Bitcoin",
  ETH: "Ethereum (ERC-20)",
  USDT: "Tron (TRC-20)",
};

// Sandbox HD-wallet derivation. A real integration would derive a unique
// address per deposit from an xpub, or request one from a custody provider.
export function deriveAddress({ coin, reference }) {
  const seed = crypto.createHash("sha256").update(`${coin}:${reference}`).digest("hex");
  const prefix = coin === "BTC" ? "bc1q" : coin === "ETH" ? "0x" : "T";
  const address = prefix + seed.slice(0, coin === "ETH" ? 40 : 33);
  return { coin, network: NETWORKS[coin] || coin, address };
}

export const SUPPORTED_COINS = Object.keys(NETWORKS);
