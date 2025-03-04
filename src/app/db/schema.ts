import { sql } from 'drizzle-orm';
import { check, integer, pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const projectTable = pgTable('project', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const statusEnum = pgEnum('status', ['todo', 'inprogress', 'done']);

export const taskTable = pgTable(
  'task',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    status: statusEnum().notNull(),
    duration: integer('duration'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    projectId: integer('project_id').notNull().references(() => projectTable.id),
  },
  (table) => [
    {
      durationCheckConstraint: check('duration_check', sql`${table.duration} > 0`),
    },
  ],
)