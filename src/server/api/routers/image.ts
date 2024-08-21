import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

export const imageRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.images.findMany({
    })
    return res
  }),
  get: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.images.findFirst({
      where: (image, { eq }) => eq(image.id, input),
    })
    return res
  }),
})
