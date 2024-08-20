import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

import { tag } from '@/server/db/schema'

import { getCurrentUser } from './user'
import { TRPCError } from '@trpc/server'

export const tagRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        notes: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await getCurrentUser()
      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to create a topic',
        })
      }

      const res = await ctx.db
        .insert(tag)
        .values({
          name: input.name,
          notes: input.notes,
        })
        .returning({ id: tag.id })

      return res
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.topic.findMany({})
    return res
  }),
  get: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.topic.findFirst({
      where: (topic, { eq }) => eq(topic.id, input),
    })
    return res
  }),
})
