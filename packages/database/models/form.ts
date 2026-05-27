import { pgTable, uuid, varchar, timestamp, boolean, text, json, jsonb, integer, pgEnum } from "drizzle-orm/pg-core";
import { usersTable } from "./user";

export const visibilityEnum = pgEnum("visibility", ["public", "unlisted", "private"]);
export const statusEnum = pgEnum("status", ["draft", "published", "unpublished"]);

export const formsTable = pgTable("forms", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
  
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  
  visibility: visibilityEnum("visibility").notNull().default("public"),
  status: statusEnum("status").notNull().default("draft"),
  
  elements: json("elements").notNull().default([]),
  
  notifyCreator: boolean("notify_creator").notNull().default(true),
  notifyRespondent: boolean("notify_respondent").notNull().default(false),
  
  visits: integer("visits").notNull().default(0), // Analytics
  
  allowedEmails: jsonb("allowed_emails").default([]),
  
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export type SelectForm = typeof formsTable.$inferSelect;
export type InsertForm = typeof formsTable.$inferInsert;
