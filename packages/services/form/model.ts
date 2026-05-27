import { z } from "zod";

export const createFormSchema = z.object({
  title: z.string().min(1).describe("Form Title"),
  description: z.string().optional().describe("Form Description"),
});

export type CreateFormType = z.infer<typeof createFormSchema>;

export const updateFormSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  visibility: z.enum(["public", "unlisted", "private"]).optional(),
  status: z.enum(["draft", "published", "unpublished"]).optional(),
  elements: z.any().optional(), // Can refine to an explicit schema later if needed
  notifyCreator: z.boolean().optional(),
  notifyRespondent: z.boolean().optional(),
  allowedEmails: z.array(z.string().email()).optional(),
});

export type UpdateFormType = z.infer<typeof updateFormSchema>;
