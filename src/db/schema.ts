import { sql } from 'drizzle-orm';
import { check, integer, pgEnum, pgTable, text, timestamp, primaryKey, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const projectTable = pgTable('project', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const statusEnum = pgEnum('status', ['todo', 'ongoing', 'under-review', 'done']);

export const taskTable = pgTable(
  'task',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    status: statusEnum().notNull(),
    duration: integer('duration'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    projectId: uuid('project_id').notNull().references(() => projectTable.id),
    creatorId: uuid('creator_id').notNull().references(() => userTable.id),
    asigneeId: uuid('asignee_id').references(() => userTable.id),
  },
  (table) => [
    {
      durationCheckConstraint: check('duration_check', sql`${table.duration} > 0`),
    },
  ],
);

export const userTable = pgTable(
  'user',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').notNull().unique(),
    passwordHash: text('password').notNull(),
    name: text('name').notNull(),
  }
);

export const userToProject = pgTable(
  'userToProject',
  {
    userId: uuid('user_id').notNull().references(() => userTable.id),
    projectId: uuid('project_id').notNull().references(() => projectTable.id),
  }, (table) => [
    primaryKey({columns: [table.userId, table.projectId]}),
  ]
);

export const insertUserSchema = createInsertSchema(userTable);
export type InsertUserType = z.infer<typeof insertUserSchema>;
export const selectUserSchema = createSelectSchema(userTable);
export type SelectUserType = z.infer<typeof selectUserSchema>;
export const obscuredUserSchema = selectUserSchema.omit({ passwordHash: true });
export type ObscuredUserType = z.infer<typeof obscuredUserSchema>;

export const insertTaskSchema = createInsertSchema(taskTable);
export type InsertTaskType = z.infer<typeof insertTaskSchema>;
export const selectTaskSchema = createSelectSchema(taskTable);
export type SelectTaskType = z.infer<typeof selectTaskSchema>;

export const insertProjectSchema = createInsertSchema(projectTable);
export type InsertProjectType = z.infer<typeof insertProjectSchema>;
export const selectProjectSchema = createSelectSchema(projectTable);
export type SelectProjectType = z.infer<typeof selectProjectSchema>;