// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from 'drizzle-orm'
import { int, sqliteTableCreator, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `qb_${name}`)

export const user = createTable('user', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  clerkId: text('clerk_id'),
  name: text('name', { length: 256 }),
  birthDate: int('birth_date', { mode: 'timestamp' }),
  gender: text('gender'),
  address: text('address'),
  notes: text('notes'),
  instagram: text('instagram'),
  phone: text('phone'),
  email: text('email'),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text('updatedAt'),
})

export const userRelations = relations(user, ({ many }) => ({
  role: many(role),
}))

export const role = createTable('role', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name', { length: 256 }),
  user: int('user_id', { mode: 'number' }).references(() => user.id, {
    onDelete: 'cascade',
  }),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text('updatedAt'),
})

export const rolesRelations = relations(role, ({ one }) => ({
  user: one(user, {
    fields: [role.user],
    references: [user.id],
  }),
}))

export const question = createTable('question', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name', { length: 256 }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
  case: text('case'),
  question: text('question'),
  type: text('type'),
  isTemplate: int('is_template', { mode: 'boolean' }),
  createdBy: int('created_by'),
})

export const questionRelations = relations(question, ({ many }) => ({
  multipleChoiceOptions: many(multipleChoiceOption),
  topics: many(topicToQuestion),
  tags: many(tagToQuestion),
}))

export const multipleChoiceOption = createTable('multiple_choice_option', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name', { length: 256 }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
  questionBank: int('question_id', { mode: 'number' }).references(
    () => question.id,
    {
      onDelete: 'cascade',
    },
  ),
})

export const multipleChoiceOptionRelations = relations(
  multipleChoiceOption,
  ({ one }) => ({
    question: one(question, {
      fields: [multipleChoiceOption.questionBank],
      references: [question.id],
    }),
  }),
)

export const topic = createTable('topic', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name', { length: 256 }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
  info: text('info'),
  createdBy: int('created_by'),
})

export const topicRelations = relations(topic, ({ many }) => ({
  questions: many(topicToQuestion),
  tags: many(tagToQuestion),
}))

export const topicToQuestion = createTable('topic_to_question', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  topic: int('topic_id', { mode: 'number' }).references(() => topic.id, {
    onDelete: 'cascade',
  }),
  question: int('question_id', { mode: 'number' }).references(
    () => question.id,
    {
      onDelete: 'cascade',
    },
  ),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text('updatedAt'),
})

export const topicToQuestionRelations = relations(
  topicToQuestion,
  ({ one }) => ({
    topic: one(topic, {
      fields: [topicToQuestion.topic],
      references: [topic.id],
    }),
    question: one(question, {
      fields: [topicToQuestion.question],
      references: [question.id],
    }),
  }),
)

export const tag = createTable('tag', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name', { length: 256 }),
  notes: text('notes'),
  topic: int('topic_id', { mode: 'number' }).references(() => topic.id, {
    onDelete: 'cascade',
  }),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text('updatedAt'),
})

export const tagRelations = relations(tag, ({ many, one }) => ({
  questions: many(tagToQuestion),
  topic: one(topic, {
    fields: [tag.topic],
    references: [topic.id],
  }),
}))

export const tagToQuestion = createTable('tag_to_question', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  tag: int('tag_id', { mode: 'number' }).references(() => tag.id, {
    onDelete: 'cascade',
  }),
  question: int('question_id', { mode: 'number' }).references(
    () => question.id,
    {
      onDelete: 'cascade',
    },
  ),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text('updatedAt'),
})

export const tagToQuestionRelations = relations(
  tagToQuestion,
  ({ one }) => ({
    tag: one(tag, {
      fields: [tagToQuestion.tag],
      references: [tag.id],
    }),
    question: one(question, {
      fields: [tagToQuestion.question],
      references: [question.id],
    }),
  }),
)
