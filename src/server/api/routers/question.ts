import { z } from 'zod'
import { eq } from 'drizzle-orm'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

import {
  question,
} from '@/server/db/schema'

import { getCurrentUser } from './user'
import { TRPCError } from '@trpc/server'

function isTuple<T>(array: T[]): array is [T, ...T[]] {
  return array.length > 0
}

const createSchema = z.object({
  name: z.string().min(2),
  creatorId: z.number(),
  federation: z.string(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  date: z.date(),
  daysOfCompetition: z.number().nonnegative().int().min(1),
  platforms: z.number().nonnegative().int().min(1),
  rules: z.string().optional(),
  notes: z.string(),
  events: z.string(),
  equipment: z.string(),
  formular: z.string(),
  wc_male: z.string().optional(),
  currentState: z.string(),
  competitorLimit: z.number().nonnegative().int().optional(),
  venue: z.string().optional(),
  divisions: z
    .array(
      z.object({
        name: z.string(),
        minAge: z.number().positive().or(z.string()),
        maxAge: z.number().positive().or(z.string()),
        info: z.string(),
      }),
    )
    .nonempty(),
  wc_female: z.string().optional(),
  wc_mix: z.string().optional(),
})


export const competitionRouter = createTRPCRouter({
})
