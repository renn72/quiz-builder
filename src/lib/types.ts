import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { appRouter } from '@/server/api/root'

type RouterInputs = inferRouterInputs<typeof appRouter>
type RouterOutputs = inferRouterOutputs<typeof appRouter>

export type GetAllQuestions = RouterOutputs['question']['getAllQuestions']
export type GetQuestion = RouterOutputs['question']['get']
