import { ObjectId } from "mongoose"

export interface IContent {
  title: string
  value: string
  url: string
  theme: ObjectId
  createdAt: Date
  description?: string
  isActive?: boolean
}

export type CreateContentServiceDto = Omit<IContent, 'createdAt'>;
