// Normalises a blockchain/crypto provider callback into a common shape.
export function parseCryptoCallback(payload) {
  const confirmations = Number(payload.confirmations ?? payload.data?.confirmations ?? 0);
  return {
    reference: payload.reference || payload.data?.reference,
    confirmations,
    status: confirmations >= 1 ? "confirmed" : "pending",
    amount: Number(payload.amount || payload.data?.amount || 0),
  };
}
