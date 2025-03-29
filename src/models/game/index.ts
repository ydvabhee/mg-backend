import { model, Document, Schema} from 'mongoose'
import { IGame } from './game.dto'

const GameSchema: Schema = new Schema<IGame>({
  theme: {
    type: Schema.Types.ObjectId,
    ref: 'Theme',
    required: true,
  },
  score: {
    type: Number,
    default: 0
  },
  startTime: {
    type: Number,
    default: Date.now,
  },
  endTime: {
    type: Number,
    default: 0
  },
  moves: {
    type: Number,
    default: 0
  }
})


export const Game = model<IGame & Document>('Game', GameSchema)