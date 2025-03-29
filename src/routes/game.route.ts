import { Router } from "express";
import { validateData } from "../middlewares/zodValidation";
import { createGame, getGameSummary, moveInGame } from "../controllers/game.controller";
import { moveInGameSchema, startedGameSchema, summaryGameSchema } from "../zodSchemas/game.zod";

export const gameRouter = Router();

gameRouter.post("/", validateData(startedGameSchema), createGame)
gameRouter.post("/move", validateData(moveInGameSchema), moveInGame)
gameRouter.get("/summary/:id", validateData(summaryGameSchema), getGameSummary)