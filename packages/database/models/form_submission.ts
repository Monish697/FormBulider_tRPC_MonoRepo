import { pgTable, uuid, varchar, timestamp, json, text } from "drizzle-orm/pg-core";
import { formsTable } from "./form";

export const formSubmissionsTable = pgTable("form_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  formId: uuid("form_id").references(() => formsTable.id, { onDelete: "cascade" }).notNull(),
  
  respondentEmail: varchar("respondent_email", { length: 255 }), // Optional for anonymous forms
  responses: json("responses").notNull(),
  
  ipAddress: varchar("ip_address", { length: 45 }), // Length 45 handles IPv6 mapping
  userAgent: text("user_agent"), // Analytics

  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export type SelectFormSubmission = typeof formSubmissionsTable.$inferSelect;
export type InsertFormSubmission = typeof formSubmissionsTable.$inferInsert;
