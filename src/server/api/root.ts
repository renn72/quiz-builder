import { userRouter } from '@/server/api/routers/user'
import { questionRouter } from '@/server/api/routers/question'
import { topicRouter } from '@/server/api/routers/topic'
import { tagRouter } from '@/server/api/routers/tag'
import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  question: questionRouter,
  topic: topicRouter,
  tag: tagRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
