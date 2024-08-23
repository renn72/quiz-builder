import { z } from 'zod'
import { eq } from 'drizzle-orm'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

import {
  question,
  topic,
  tag,
  topicToQuestion,
  tagToQuestion,
  imagesToQuestion,
  pdfsToQuestion,
} from '@/server/db/schema'

import { getCurrentUser } from './user'
import { TRPCError } from '@trpc/server'

function isTuple<T>(array: T[]): array is [T, ...T[]] {
  return array.length > 0
}

const createTagSchema = z.object({
  name: z.string(),
  notes: z.string().optional(),
  topicId: z.number(),
})

const createTopicSchema = z.object({
  name: z.string(),
  info: z.string().optional(),
})

const topicSchema = z.object({
  id: z.number(),
})

const tagSchema = z.object({
  id: z.number(),
})

const imageSchema = z.object({
  id: z.number(),
})

const pdfSchema = z.object({
  id: z.number(),
})

const createSchema = z.object({
  name: z.string(),
  case: z.string(),
  question: z.string(),
  type: z.string(),
  topics: z.array(topicSchema).optional(),
  multipleChoiceOptions: z.array(z.string()).optional(),
  tags: z.array(tagSchema).optional(),
  image: z.string().optional(),
  pdf: z.string().optional(),
})

const createQuestion = async (input, ctx, user) => {
  const res = await ctx.db
    .insert(question)
    .values({
      name: input.name,
      case: input.case,
      question: input.question,
      type: input.type,
      multipleChoiceOptions: input.multipleChoiceOptions?.join('/'),
      isTemplate: true,
      createdBy: user.id,
    })
    .returning({ id: question.id })

  const questionId = res[0]?.id
  if (!questionId) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to create question',
    })
  }

  const topicInputs = input.topics?.map((topic) =>
    ctx.db.insert(topicToQuestion).values({
      topicId: topic.id,
      questionId: questionId,
    }),
  )

  if (topicInputs && isTuple(topicInputs)) {
    await ctx.db.batch(topicInputs)
  }

  const tagInputs = input.tags?.map((tag) =>
    ctx.db.insert(tagToQuestion).values({
      tagId: tag.id,
      questionId: questionId,
    }),
  )

  if (tagInputs && isTuple(tagInputs)) {
    await ctx.db.batch(tagInputs)
  }

  if (input.image) {
    await ctx.db.insert(imagesToQuestion).values({
      imageId: Number(input.image),
      questionId: questionId,
    })
  }
  if (input.pdf) {
    await ctx.db.insert(pdfsToQuestion).values({
      pdfId: Number(input.pdf),
      questionId: questionId,
    })
  }
  return res
}

export const questionRouter = createTRPCRouter({
  createQuestion: publicProcedure
    .input(createSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await getCurrentUser()
      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to create a question',
        })
      }

      console.log('input', input)

      const res = await ctx.db
        .insert(question)
        .values({
          name: input.name,
          case: input.case,
          question: input.question,
          type: input.type,
          multipleChoiceOptions: input.multipleChoiceOptions?.join('/'),
          isTemplate: true,
          createdBy: user.id,
        })
        .returning({ id: question.id })

      const questionId = res[0]?.id
      if (!questionId) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create question',
        })
      }

      const topicInputs = input.topics?.map((topic) =>
        ctx.db.insert(topicToQuestion).values({
          topicId: topic.id,
          questionId: questionId,
        }),
      )

      if (topicInputs && isTuple(topicInputs)) {
        await ctx.db.batch(topicInputs)
      }

      const tagInputs = input.tags?.map((tag) =>
        ctx.db.insert(tagToQuestion).values({
          tagId: tag.id,
          questionId: questionId,
        }),
      )

      if (tagInputs && isTuple(tagInputs)) {
        await ctx.db.batch(tagInputs)
      }

      if (input.image) {
        await ctx.db.insert(imagesToQuestion).values({
          imageId: Number(input.image),
          questionId: questionId,
        })
      }
      if (input.pdf) {
        await ctx.db.insert(pdfsToQuestion).values({
          pdfId: Number(input.pdf),
          questionId: questionId,
        })
      }
      return res
    }),
  createManyQuestions: publicProcedure
    .input(z.array(createSchema))
    .mutation(async ({ input: manyInput, ctx }) => {
      const user = await getCurrentUser()
      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to create a question',
        })
      }

      let count = 1

      for (const input of manyInput) {
        console.log(count)
        count++
        const res = await ctx.db
          .insert(question)
          .values({
            name: input.name,
            case: input.case,
            question: input.question,
            type: input.type,
            multipleChoiceOptions: input.multipleChoiceOptions?.join('/'),
            isTemplate: true,
            createdBy: user.id,
          })
          .returning({ id: question.id })

        const questionId = res[0]?.id
        if (!questionId) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to create question',
          })
        }

        const topicInputs = input.topics?.map((topic) =>
          ctx.db.insert(topicToQuestion).values({
            topicId: topic.id,
            questionId: questionId,
          }),
        )

        if (topicInputs && isTuple(topicInputs)) {
          await ctx.db.batch(topicInputs)
        }

        const tagInputs = input.tags?.map((tag) =>
          ctx.db.insert(tagToQuestion).values({
            tagId: tag.id,
            questionId: questionId,
          }),
        )

        if (tagInputs && isTuple(tagInputs)) {
          await ctx.db.batch(tagInputs)
        }

        if (input.image) {
          await ctx.db.insert(imagesToQuestion).values({
            imageId: Number(input.image),
            questionId: questionId,
          })
        }
        if (input.pdf) {
          await ctx.db.insert(pdfsToQuestion).values({
            pdfId: Number(input.pdf),
            questionId: questionId,
          })
        }
      }

      return true
    }),
  getAllQuestions: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.question.findMany({
      orderBy: (question, { desc }) => [desc(question.createdAt)],
      with: {
        topics: {
          with: {
            topic: true,
          },
        },
        tags: {
          with: {
            tag: true,
          },
        },
        images: {
          with: {
            image: true,
          },
        },
        pdfs: {
          with: {
            pdf: true,
          },
        },
      },
    })
    return res
  }),
  get: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.question.findFirst({
      where: (question, { eq }) => eq(question.id, input),
      with: {
        topics: {
          with: {
            topic: true,
          },
        },
        tags: {
          with: {
            tag: true,
          },
        },
        images: {
          with: {
            image: true,
          },
        },
        pdfs: {
          with: {
            pdf: true,
          },
        },
      },
    })
    return res
  }),
  createTopic: publicProcedure
    .input(createTopicSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await getCurrentUser()
      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to create a topic',
        })
      }

      const res = await ctx.db
        .insert(topic)
        .values({
          name: input.name,
          info: input.info,
          createdBy: user.id,
        })
        .returning({ id: topic.id })

      return res
    }),
  createManyTopics: publicProcedure
    .input(z.array(createTopicSchema))
    .mutation(async ({ input, ctx }) => {
      const user = await getCurrentUser()
      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to create a topic',
        })
      }

      const data = input.map((i) =>
        ctx.db.insert(topic).values({
          name: i.name,
          info: i.info,
          createdBy: user.id,
        }),
      )

      if (isTuple(data)) {
        const res = await ctx.db.batch(data)
        return res
      }

      return false
    }),
  createTag: publicProcedure
    .input(createTagSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await getCurrentUser()
      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to create a tag',
        })
      }

      const res = await ctx.db
        .insert(tag)
        .values({
          name: input.name,
          notes: input.notes,
          topicId: input.topicId,
        })
        .returning({ id: tag.id })

      return res
    }),
  createManyTags: publicProcedure
    .input(z.array(createTagSchema))
    .mutation(async ({ input, ctx }) => {
      const user = await getCurrentUser()
      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to create a tag',
        })
      }

      const data = input.map((i) =>
        ctx.db.insert(tag).values({
          name: i.name,
          notes: i.notes,
          topicId: i.topicId,
        }),
      )

      if (isTuple(data)) {
        const res = await ctx.db.batch(data)
        return res
      }

      return false
    }),
})
