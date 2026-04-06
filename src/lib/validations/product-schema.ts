import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(80, "Product name must be less than 80 characters"),
  price: z.coerce
    .number()
    .positive("Price must be greater than 0")
    .max(1000000, "Price is too large"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(300, "Description must be less than 300 characters"),
  imageUrl: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine((value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }, "Please enter a valid image URL"),
});

export type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormValues = z.output<typeof productSchema>;
