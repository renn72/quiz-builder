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
  answer: text('answer'),
  multipleChoiceOptions: text('multiple_choice_options'),
  type: text('type'),
  state: text('state'),
  isTemplate: int('is_template', { mode: 'boolean' }),
  createdBy: int('created_by'),
})

export const answer = createTable('answer', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  questionId: int('question_id', { mode: 'number' }).references(
    () => question.id,
  ),
  answer: text('answer'),
  case: text('case'),
  question: text('question'),
  multipleChoiceOptions: text('multiple_choice_options'),
  type: text('type'),
  state: text('state'),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
})

export const answerRelations = relations(answer, ({ one }) => ({
  question: one(question, {
    fields: [answer.questionId],
    references: [question.id],
  }),
}))

export const questionRelations = relations(question, ({ many }) => ({
  answers: many(answer),
  topics: many(topicToQuestion),
  tags: many(tagToQuestion),
  images: many(imagesToQuestion),
  pdfs: many(pdfsToQuestion),
}))

export const images = createTable('images', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  url: text('url'),
})

export const imagesRelations = relations(images, ({ many }) => ({
  questions: many(imagesToQuestion),
}))

export const imagesToQuestion = createTable('images_to_question', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  imageId: int('image_id', { mode: 'number' }).references(() => images.id, {
    onDelete: 'cascade',
  }),
  questionId: int('question_id', { mode: 'number' }).references(
    () => question.id,
    {
      onDelete: 'cascade',
    },
  ),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
})

export const imagesToQuestionRelations = relations(
  imagesToQuestion,
  ({ one }) => ({
    image: one(images, {
      fields: [imagesToQuestion.imageId],
      references: [images.id],
    }),
    question: one(question, {
      fields: [imagesToQuestion.questionId],
      references: [question.id],
    }),
  }),
)

export const pdfs = createTable('pdfs', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  url: text('url'),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
})

export const pdfsRelations = relations(pdfs, ({ many }) => ({
  questions: many(pdfsToQuestion),
}))

export const pdfsToQuestion = createTable('pdfs_to_question', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  pdfId: int('pdf_id', { mode: 'number' }).references(() => pdfs.id, {
    onDelete: 'cascade',
  }),
  questionId: int('question_id', { mode: 'number' }).references(
    () => question.id,
    {
      onDelete: 'cascade',
    },
  ),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
})

export const pdfsToQuestionRelations = relations(pdfsToQuestion, ({ one }) => ({
  pdf: one(pdfs, {
    fields: [pdfsToQuestion.pdfId],
    references: [pdfs.id],
  }),
  question: one(question, {
    fields: [pdfsToQuestion.questionId],
    references: [question.id],
  }),
}))

export const topic = createTable('topic', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name', { length: 256 }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  info: text('info'),
  createdBy: int('created_by'),
})

export const topicRelations = relations(topic, ({ many }) => ({
  questions: many(topicToQuestion),
  tags: many(tag),
}))

export const topicToQuestion = createTable('topic_to_question', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  topicId: int('topic_id', { mode: 'number' }).references(() => topic.id, {
    onDelete: 'cascade',
  }),
  questionId: int('question_id', { mode: 'number' }).references(
    () => question.id,
    {
      onDelete: 'cascade',
    },
  ),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
})

export const topicToQuestionRelations = relations(
  topicToQuestion,
  ({ one }) => ({
    topic: one(topic, {
      fields: [topicToQuestion.topicId],
      references: [topic.id],
    }),
    question: one(question, {
      fields: [topicToQuestion.questionId],
      references: [question.id],
    }),
  }),
)

export const tag = createTable('tag', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name', { length: 256 }),
  notes: text('notes'),
  topicId: int('topic_id', { mode: 'number' }).references(() => topic.id, {
    onDelete: 'cascade',
  }),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
})

export const tagRelations = relations(tag, ({ many, one }) => ({
  questions: many(tagToQuestion),
  topic: one(topic, {
    fields: [tag.topicId],
    references: [topic.id],
  }),
}))

export const tagToQuestion = createTable('tag_to_question', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  tagId: int('tag_id', { mode: 'number' }).references(() => tag.id, {
    onDelete: 'cascade',
  }),
  questionId: int('question_id', { mode: 'number' }).references(
    () => question.id,
    {
      onDelete: 'cascade',
    },
  ),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
})

export const tagToQuestionRelations = relations(tagToQuestion, ({ one }) => ({
  tag: one(tag, {
    fields: [tagToQuestion.tagId],
    references: [tag.id],
  }),
  question: one(question, {
    fields: [tagToQuestion.questionId],
    references: [question.id],
  }),
}))
