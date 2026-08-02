// Normalises a bank provider callback payload into a common shape.
export function parseBankCallback(payload) {
  // Real providers send their own schema; map it here.
  return {
    reference: payload.reference || payload.data?.reference,
    status: (payload.status || payload.event || "").toString().toLowerCase(),
    amount: Number(payload.amount || payload.data?.amount || 0),
  };
}
