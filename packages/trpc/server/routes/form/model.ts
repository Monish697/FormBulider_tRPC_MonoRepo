import { z } from "zod";

export const createFormInputModel = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

export const updateFormInputModel = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  visibility: z.enum(["public", "unlisted", "private"]).optional(),
  status: z.enum(["draft", "published", "unpublished"]).optional(),
  elements: z.any().optional(),
  notifyCreator: z.boolean().optional(),
  notifyRespondent: z.boolean().optional(),
  allowedEmails: z.array(z.string().email()).optional(),
});

export const getBySlugInputModel = z.object({
  slug: z.string()
});

export const getByIdInputModel = z.object({
  id: z.string().uuid()
});
