import { z } from "zod";

export const createFormSubmissionInputModel = z.object({
  formId: z.string().uuid(),
  respondentEmail: z.string().email().optional(),
  responses: z.any(),
});

export const getSubmissionsInputModel = z.object({
  formId: z.string().uuid()
});
