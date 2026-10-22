import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";
import { relations } from "drizzle-orm";

// Note (Note Category)
export const note = pgTable("note", {
  id: text("id").primaryKey(),
  noteCategoryId: text('note_category_id').notNull().references(() => noteCategory.id, {onDelete: 'cascade'}),
  name: text("name").notNull(),
  image: text("image"),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Note Category (Project)
export const noteCategory = pgTable("noteCategory", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => project.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Event (Outline)
export const event = pgTable("event", {
  id: text("id").primaryKey(),
  outlineId: text("outline_id")
    .notNull()
    .references(() => outline.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  storyDate: text("story_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Outline (Project)
export const outline = pgTable("outline", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => project.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Page (Project)
export const page = pgTable("pages", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => project.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  image: text("image"),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Authors
export const projectAuthor = pgTable(
  "project_author",
  {
    projectId: text("project_id")
      .notNull()
      .references(() => project.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.projectId, table.userId] })],
);

// Base Project
export const project = pgTable("project", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Relations
export const projectRelations = relations(project, ({ many }) => ({
  pages: many(page),
  outlines: many(outline),
  projectAuthors: many(projectAuthor),
  noteCategories: many(noteCategory),
}));

export const pageRelations = relations(page, ({ one }) => ({
  project: one(project, {
    fields: [page.projectId],
    references: [project.id],
  }),
}));

export const outlineRelations = relations(outline, ({ one, many }) => ({
  project: one(project, {
    fields: [outline.projectId],
    references: [project.id],
  }),
  events: many(event),
}));

export const eventRelations = relations(event, ({ one }) => ({
  outline: one(outline, {
    fields: [event.outlineId],
    references: [outline.id],
  }),
}));

export const projectAuthorRelations = relations(projectAuthor, ({ one }) => ({
  project: one(project, {
    fields: [projectAuthor.projectId],
    references: [project.id],
  }),
  user: one(user, {
    fields: [projectAuthor.userId],
    references: [user.id],
  }),
}));

export const noteCategoryRelations = relations(noteCategory, ({ one, many }) => ({
  project: one(project, {
    fields: [noteCategory.projectId],
    references: [project.id]
  }),
  notes: many(note)
}));

export const noteRelations = relations(note, ({ one }) => ({
  noteCategory: one(noteCategory, {
    fields: [note.noteCategoryId],
    references: [noteCategory.id]
  })
}))
