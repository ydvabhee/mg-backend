import { Router } from "express";
import { validateData } from "../middlewares/zodValidation";
import { createGame, moveInGame } from "../controllers/game.controller";
import { moveInGameSchema, startedGameSchema } from "../zodSchemas/game.zod";

export const gameRouter = Router();

gameRouter.post("/", validateData(startedGameSchema), createGame)
gameRouter.post("/move", validateData(moveInGameSchema), moveInGame)