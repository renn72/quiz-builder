import { z } from 'zod'
import { eq } from 'drizzle-orm'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

import { question, topicToQuestion, tagToQuestion, imagesToQuestion, pdfsToQuestion } from '@/server/db/schema'

import { getCurrentUser } from './user'
import { TRPCError } from '@trpc/server'

function isTuple<T>(array: T[]): array is [T, ...T[]] {
  return array.length > 0
}

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
  topics: z.array(topicSchema),
  multipleChoiceOptions: z.array(z.string()),
  tags: z.array(tagSchema),
  images: z.array(imageSchema),
  pdfs: z.array(pdfSchema),
})

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

      const res = await ctx.db
        .insert(question)
        .values({
          name: input.name,
          case: input.case,
          question: input.question,
          type: input.type,
          multipleChoiceOptions: input.multipleChoiceOptions.join('/'),
          isTemplate: true,
          createdBy: user.id,
        })
        .returning({ id: question.id })

      return res

      const questionId = res[0]?.id
      if (!questionId) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create question',
        })
      }

      const topicInputs = input.topics.map((topic) =>
        ctx.db.insert(topicToQuestion).values({
          topicId: topic.id,
          questionId: questionId,
        }),
      )

      if (isTuple(topicInputs)) {
        await ctx.db.batch(topicInputs)
      }

      const tagInputs = input.tags.map((tag) =>
        ctx.db.insert(tagToQuestion).values({
          tagId: tag.id,
          questionId: questionId,
        }),
      )

      if (isTuple(tagInputs)) {
        await ctx.db.batch(tagInputs)
      }

      const imageInputs = input.images.map((image) => ctx.db.insert(imagesToQuestion).values({
        imageId: image.id,
        questionId: questionId,
      }))

      if (isTuple(imageInputs)) {
        await ctx.db.batch(imageInputs)
      }

      const pdfInputs = input.pdfs.map((pdf) => ctx.db.insert(pdfsToQuestion).values({
        pdfId: pdf.id,
        questionId: questionId,
      }))

      if (isTuple(pdfInputs)) {
        await ctx.db.batch(pdfInputs)
      }

      return res
    }),
})
