import { z } from 'zod'

export const createContentBodySchema = z.object({
  src: z.string().min(2).max(100),
  themeId: z.string().min(2).max(30)
}).strict()


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