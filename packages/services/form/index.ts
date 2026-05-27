import { db, eq, and } from "@repo/database";
import { formsTable, InsertForm } from "@repo/database/models/form";
import { createFormSchema, updateFormSchema, CreateFormType, UpdateFormType } from "./model";

export default class FormService {
  public async createForm(userId: string, payload: CreateFormType) {
    const parsed = await createFormSchema.parseAsync(payload);
    
    const baseSlug = parsed.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "form";
    const randomString = Math.random().toString(36).substring(2, 8);
    const slug = `${baseSlug}-${randomString}`;
    
    const res = await db.insert(formsTable).values({
      userId,
      title: parsed.title,
      description: parsed.description,
      slug,
    }).returning();
    
    return res[0];
  }

  public async getFormsByUser(userId: string) {
    return await db.select().from(formsTable).where(eq(formsTable.userId, userId));
  }
  
  public async getPublicForms() {
    return await db.select()
      .from(formsTable)
      .where(and(eq(formsTable.visibility, "public"), eq(formsTable.status, "published")));
  }
  
  public async getFormBySlug(slug: string) {
    const res = await db.select().from(formsTable).where(eq(formsTable.slug, slug));
    return res[0] || null;
  }
  
  public async getFormById(id: string) {
    const res = await db.select().from(formsTable).where(eq(formsTable.id, id));
    return res[0] || null;
  }

  public async updateForm(id: string, userId: string, payload: UpdateFormType) {
    const parsed = await updateFormSchema.parseAsync(payload);
    
    const form = await this.getFormById(id);
    if (!form || form.userId !== userId) {
      throw new Error("Form not found or unauthorized");
    }
    
    let updateData: Partial<InsertForm> = { ...parsed };
    if (parsed.status === "published" && form.status !== "published") {
      updateData.publishedAt = new Date();
    }
    
    const res = await db.update(formsTable)
      .set(updateData)
      .where(and(eq(formsTable.id, id), eq(formsTable.userId, userId)))
      .returning();
      
    return res[0];
  }
  
  public async deleteForm(id: string, userId: string) {
    const res = await db.delete(formsTable)
      .where(and(eq(formsTable.id, id), eq(formsTable.userId, userId)))
      .returning();
    return res[0] || null;
  }
}
