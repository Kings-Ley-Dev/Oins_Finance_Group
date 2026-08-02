import "dotenv/config";
import { connectDB } from "../../config/db.js";
import { registerSchedulers } from "../schedulers.js";
import { profitDistributor } from "./profitDistributor.worker.js";

(async () => {
  await connectDB(process.env.MONGO_URI);
  await registerSchedulers();
  profitDistributor.on("completed", (job, r) =>
    console.log(`[worker] profit posted for ${r?.processed} investments on ${r?.date}`)
  );
  console.log("[worker] profit distributor running");
})();
