import { z } from 'zod'
import { currentUser } from '@clerk/nextjs/server'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { user } from '@/server/db/schema'

function isTuple<T>(array: T[]): array is [T, ...T[]] {
  return array.length > 0
}

const createSchema = z.object({
  name: z.string(),
  birthDate: z.date().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  instagram: z.string().optional(),
  openlifter: z.string().optional(),
  notes: z.string().optional(),
  email: z.string().optional(),
})

export const userRouter = createTRPCRouter({
  getCurrentUser: publicProcedure.query(async ({ ctx }) => {
    const clerkUser = await currentUser()
    if (!clerkUser) {
      return false
    }
    const res = await ctx.db.query.user.findFirst({
      where: (user, { eq }) => eq(user.clerkId, clerkUser.id),
    })
    if (!res) {
      const newUser = await ctx.db
        .insert(user)
        .values({
          clerkId: clerkUser.id,
          name: clerkUser.fullName,
        })
        .returning({ id: user.id })
      const id = newUser[0]?.id || 0
      const newRes = await ctx.db.query.user.findFirst({
        where: (user, { eq }) => eq(user.id, id),
      })
      return newRes
    }
    return res
  }),
  // createUserAdmin: publicProcedure.mutation(async ({ ctx }) => {
  //     const user = await currentUser()
  //     if (!user) {
  //         return false
  //     }
  //     const res = await ctx.db.insert(user).values({
  //         clerkId: user.id,
  //         name: user.fullName,
  //     })
  //
  //     return res
  // }),
  // isAdmin: publicProcedure.query(async ({ ctx }) => {
  //     const user = await currentUser()
  //     if (!user) {
  //         return false
  //     }
  //     if (user.privateMetadata?.admin == 'true') {
  //         console.log('true')
  //         return true
  //     }
  //     return false
  // }),
  // createUser: publicProcedure.input(createSchema).mutation(async ({ ctx, input }) => {
  //     const res = await ctx.db.insert(user).values({
  //         ...input,
  //     })
  //
  //     return res
  // }),
})

export const getCurrentUser = async () => {
  const u = await currentUser()
  return await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.clerkId, u?.id || ''),
  })
}
