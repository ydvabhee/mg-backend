import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

export const createContentBodySchema = z.object({
  src: z.string().min(2).max(100),
  themeId: z.string().min(2).max(30)
}).strict()

export const createContentSchema = z.object({
  body: createContentBodySchema
}) 

export const createContentBulkBodySchema = z.object({
  data: z.array(
    z.object({
      src: z.string().min(2).max(200),
      alt: z.string().optional().transform((val) => val?.toLocaleLowerCase()),
    }
    ).strict()
  ).min(1).max(500),
  themeId: z.string().min(2).max(30)
}).strict()


export const createContentBulkSchema = z.object({
  body: createContentBulkBodySchema
}) 

export const getContentByThemeIdParamsSchema = z.object({
  themeId: z.string().refine((val) => isValidObjectId(val), 'Invalid Id in param'),
}).strict()

export const getContentByThemeIdSchema = z.object({
  params: getContentByThemeIdParamsSchema,
})