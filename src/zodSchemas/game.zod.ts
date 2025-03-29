import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

export const startGameBodySchema = z.object({
  themeId: z.string().min(2).max(30)
}).strict()


export const startedGameSchema = z.object({
  body: startGameBodySchema,
})


export const moveInGameBodySchema = z.object({
  gameId: z.string().min(2).max(30),
  selectedCardIds: z.array(z.string()).min(2).max(2)
}).strict()

export const moveInGameSchema = z.object({
  body: moveInGameBodySchema,
})

export const summaryGameParamsSchema = z.object({
  id: z.string().refine((val) => isValidObjectId(val), 'Invalid Id in param'),
}).strict()

export const summaryGameSchema = z.object({
  params: summaryGameParamsSchema,
})

