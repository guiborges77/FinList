import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { differenceInDays } from "date-fns";
import { z } from "zod";

export const OverviewQuerySchema = z
  .object({
    from: z.coerce.date(),
    to: z.coerce.date(),
  })
  .refine(
    (args) => {
      const { from, to } = args;
      const days = differenceInDays(to, from);

      // Retorna true se o intervalo de dias for válido, caso contrário false
      return days >= 0 && days <= MAX_DATE_RANGE_DAYS;
    },
    {
      message: `O intervalo de datas deve ser de no máximo ${MAX_DATE_RANGE_DAYS} dias e 'to' não pode ser anterior a 'from'`,
    }
  );
