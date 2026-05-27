import { z } from "zod";

export const submitFormSchema = z.object({
  formId: z.string().uuid(),
  respondentEmail: z.string().email().optional(),
  responses: z.any(), // JSON containing form responses
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
});

export type SubmitFormType = z.infer<typeof submitFormSchema>;
