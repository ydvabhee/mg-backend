import { Document, model, Schema } from 'mongoose'
import { ITheme } from './theme.dto'


const ThemeSchema: Schema = new Schema<ITheme>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }})

export const Theme = model<ITheme & Document>('Theme', ThemeSchema)
