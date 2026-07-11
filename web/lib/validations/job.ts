import { z } from "zod";

export const jobSchema = z.object({
  company: z
    .string()
    .trim()
    .min(2, "Company must have at least 2 characters.")
    .max(100, "Company is too long."),

  position: z
    .string()
    .trim()
    .min(2, "Position must have at least 2 characters.")
    .max(100, "Position is too long."),

  location: z.string().optional(),

  salary: z.string().optional(),

  status: z.enum([
    "Wishlist",
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
  ]),

  priority: z.enum(["High", "Medium", "Low"]).optional(),

  link: z
    .string()
    .url("Please enter a valid URL.")
    .or(z.literal(""))
    .optional(),

  notes: z.string().optional(),
});

export type JobFormData = z.infer<typeof jobSchema>;