import { publicProcedure, router, protectedProcedure } from "../../trpc";
import { createFormSubmissionInputModel, getSubmissionsInputModel } from "./model";
import { formSubmissionService } from "../../services";

export const formSubmissionRouter = router({
  create: publicProcedure
    .input(createFormSubmissionInputModel)
    .mutation(async ({ input, ctx }) => {
      // In a real app, you might want to extract IP from req, but for now we pass undefined or use what's in input if provided by client (though not secure)
      return await formSubmissionService.submitForm({
        ...input,
        ipAddress: undefined, // Or extracted from context if added
        userAgent: undefined, // Or extracted from context if added
      });
    }),
    
  getByFormId: protectedProcedure
    .input(getSubmissionsInputModel)
    .query(async ({ input, ctx }) => {
      return await formSubmissionService.getSubmissionsByFormId(input.formId, ctx.user!.id);
    })
});
