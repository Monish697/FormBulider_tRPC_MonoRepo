import { db, eq } from "@repo/database";
import { formSubmissionsTable } from "@repo/database/models/form_submission";
import { formsTable } from "@repo/database/models/form";
import { submitFormSchema, SubmitFormType } from "./model";

export default class FormSubmissionService {
  public async submitForm(payload: SubmitFormType) {
    const parsed = await submitFormSchema.parseAsync(payload);
    
    // Ensure form exists and is published
    const form = await db.select().from(formsTable).where(eq(formsTable.id, parsed.formId)).then(res => res[0]);
    if (!form) {
      throw new Error("Form not found");
    }
    if (form.status !== "published") {
      throw new Error("Form is not published");
    }

    const res = await db.insert(formSubmissionsTable).values({
      formId: parsed.formId,
      respondentEmail: parsed.respondentEmail,
      responses: parsed.responses,
      ipAddress: parsed.ipAddress,
      userAgent: parsed.userAgent,
    }).returning();
    
    return res[0];
  }

  public async getSubmissionsByFormId(formId: string, userId: string) {
    // Check if the user owns the form first
    const form = await db.select().from(formsTable).where(eq(formsTable.id, formId)).then(res => res[0]);
    if (!form || form.userId !== userId) {
      throw new Error("Unauthorized to view these submissions");
    }

    return await db.select().from(formSubmissionsTable).where(eq(formSubmissionsTable.formId, formId));
  }
}
