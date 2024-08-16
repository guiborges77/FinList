import { z } from "zod";

// Esquema para criação de categoria
export const CreateCategorySchema = z.object({
  name: z.string().min(3).max(20),
  icon: z.string().max(20),
  type: z.enum(["receita", "despesa"]),
});

export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;

// Esquema para exclusão de categoria
export const DeleteCategorySchema = z.object({
  name: z.string().min(1), // Must be a non-empty string
  type: z.enum(["receita", "despesa"]), // Must be either 'income' or 'expense'
});

export type DeleteCategorySchemaType = z.infer<typeof DeleteCategorySchema>;
