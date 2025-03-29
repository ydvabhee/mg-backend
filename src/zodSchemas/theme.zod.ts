import { z } from 'zod'
import { ITheme } from '../models/theme/theme.dto'

export const createThemeBodySchema = z.object({
  name: z.string().min(2).max(100).transform((val) => val.toLocaleLowerCase()),
  description: z.string().optional().transform((val) => val?.toLocaleLowerCase()),
}) 


export const createThemeSchema = z.object({
  body: createThemeBodySchema
})