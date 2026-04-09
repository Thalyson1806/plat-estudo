import { pgTable, uuid, varchar, text, timestamp, unique, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  nome: varchar('nome', { length: 100 }).notNull(),
  sobrenome: varchar('sobrenome', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  senha_hash: text('senha_hash').notNull(),
  turma: varchar('turma', { length: 50 }).notNull(),
  curso: varchar('curso', { length: 100 }).notNull(),
  role: varchar('role', { length: 20 }).default('user').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export const progress = pgTable('progress', {
  id: uuid('id').defaultRandom().primaryKey(),
  user_id: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  topic_slug: varchar('topic_slug', { length: 100 }).notNull(),
  completed_at: timestamp('completed_at').defaultNow().notNull(),
}, (t) => [unique().on(t.user_id, t.topic_slug)]);

export const threads = pgTable('threads', {
  id: uuid('id').defaultRandom().primaryKey(),
  user_id: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  body: text('body').notNull(),
  topic_slug: varchar('topic_slug', { length: 100 }),
  subject_slug: varchar('subject_slug', { length: 100 }),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const replies = pgTable('replies', {
  id: uuid('id').defaultRandom().primaryKey(),
  thread_id: uuid('thread_id').references(() => threads.id, { onDelete: 'cascade' }).notNull(),
  user_id: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  body: text('body').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export const subjects = pgTable('subjects', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  emoji: varchar('emoji', { length: 10 }).notNull(),
  created_by: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export const subjectTopics = pgTable('subject_topics', {
  id: uuid('id').defaultRandom().primaryKey(),
  subject_id: uuid('subject_id').references(() => subjects.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  order_index: integer('order_index').default(0).notNull(),
  created_by: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type Thread = typeof threads.$inferSelect;
export type Reply = typeof replies.$inferSelect;
export type Subject = typeof subjects.$inferSelect;
export type SubjectTopic = typeof subjectTopics.$inferSelect;
