import { Queue } from "bullmq";
import { connection } from "../config/redis.js";

export const calculationsQueue = new Queue("calculations", { connection });
