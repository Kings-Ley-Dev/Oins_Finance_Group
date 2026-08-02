import { calculationsQueue } from "./queue.js";

// Triggers the global daily profit increment at 00:00.
export async function registerSchedulers() {
  await calculationsQueue.add(
    "daily-profit",
    {},
    { repeat: { pattern: "0 0 * * *" }, removeOnComplete: true }
  );
  console.log("[jobs] daily profit scheduler registered (00:00)");
}
