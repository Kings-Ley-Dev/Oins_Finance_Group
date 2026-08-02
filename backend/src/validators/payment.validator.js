import { z } from "zod";

export const depositSchema = z.object({
  method: z.enum(["bank", "crypto"]),
  amount: z.coerce.number().positive("Enter a valid amount"),
  coin: z.enum(["BTC", "ETH", "USDT"]).optional(),
});

export const withdrawSchema = z.object({
  method: z.enum(["bank", "crypto"]),
  amount: z.coerce.number().positive("Enter a valid amount"),
  destination: z.string().min(4, "Destination is required"),
  coin: z.enum(["BTC", "ETH", "USDT"]).optional(),
});
