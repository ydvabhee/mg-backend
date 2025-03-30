import { ObjectId } from "mongoose";

export interface IGame {
  theme: ObjectId
  score: number
  startTime: number
  endTime: number
  moves: number
}

