import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

import {
  topic,
} from '@/server/db/schema'

import { getCurrentUser } from './user'
import { TRPCError } from '@trpc/server'

export const topicRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      name: z.string(),
      info: z.string().optional(),
    }))
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
  getAll: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.topic.findMany({
      with: {
        tags: true,
      },
    })
    return res
  }),
  get: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.topic.findFirst({
      where: (topic, {eq}) => eq(topic.id, input),
      with: {
        tags: true,
      },
    })
    return res
  }),
})
