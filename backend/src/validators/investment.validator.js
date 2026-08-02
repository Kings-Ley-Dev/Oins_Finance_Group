import { z } from "zod";

export const subscribeSchema = z.object({
  assetKey: z.string().min(1, "assetKey is required"),
  principal: z.coerce.number().min(100, "Minimum investment is $100"),
});
