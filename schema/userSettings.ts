import { Currencies } from "@/lib/currencies";
import { z } from "zod";

export const UpdateUserCurrencySchema = z.object({
  currency: z
    .string()
    .refine(
      (value) => Currencies.some((c) => c.value === value),
      "Moeda inválida"
    ),
});
