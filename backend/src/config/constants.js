export const ROLES = { USER: "user", ADMIN: "admin" };

export const TX_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  CANCELLED: "cancelled",
};

export const INVESTMENT_STATUS = {
  ACTIVE: "active",
  MATURED: "matured",
  CLOSED: "closed",
};

// Yields are posted daily by the profitDistributor worker.
export const YIELD_FREQUENCY = { DAILY: "daily" };
