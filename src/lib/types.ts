import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { z } from 'zod'

import { appRouter } from '@/server/api/root'

type RouterInputs = inferRouterInputs<typeof appRouter>
type RouterOutputs = inferRouterOutputs<typeof appRouter>

export type GetAllQuestions = RouterOutputs['question']['getAllQuestions']
export type GetQuestion = RouterOutputs['question']['get']

export const questionSchema = z.object({
  id: z.number(),
  name: z.string(),
  case: z.string(),
  question: z.string(),
  answer: z.string(),
  multipleChoiceOptions: z.string(),
  type: z.string(),
  state: z.string(),
  isTemplate: z.boolean(),
  createdBy: z.number(),
  topics: z.array(
    z.object({
      topic: z.object({ id: z.number(), name: z.string(), info: z.string() }),
    }),
  ),
  tags: z.array(
    z.object({
      tag: z.object({ id: z.number(), name: z.string(), info: z.string() }),
    }),
  ),
})
