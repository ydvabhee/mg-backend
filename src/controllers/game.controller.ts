import { Request, Response } from "express";
import { Game } from "../models/game";
import HttpStatusCodes, { StatusCodes } from 'http-status-codes'
import { startGameBodySchema } from "../zodSchemas/game.zod";
import { Content } from "../models/content";
import { createGameService, getGameSummaryService, moveInGameService } from "../services/game.service";
import { Types } from "mongoose";
// import { ObjectId } from "bson";

type createGameBody = typeof startGameBodySchema._type
export const createGame = async (req: Request, res: Response) => {
  const { themeId }: createGameBody = req.body;
  try {
    const game = await createGameService({
      theme: themeId,
      score: 0,
      startTime: Date.now(),
      endTime: 0,
      moves: 0,
      cardMatches: 0
    });

    await game.save();
    res.status(HttpStatusCodes.CREATED).json(game);

  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating game', error });
  }
}

export const getGameSummary = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const gameSummary = await getGameSummaryService(id);
    res.status(HttpStatusCodes.OK).json(gameSummary);
  } catch (error: any) {
    res.status(
      error.message === "Game not found"
        ? HttpStatusCodes.NOT_FOUND
        : error.message === "Game not completed"
        ? HttpStatusCodes.BAD_REQUEST
        : HttpStatusCodes.INTERNAL_SERVER_ERROR
    ).json({ message: error.message });
  }
};

export const moveInGame = async (req: Request, res: Response) => {
  try {
    const { gameId, selectedCardIds } = req.body;
    const result = await moveInGameService(gameId, selectedCardIds);
    res.status(HttpStatusCodes.OK).json(result);

  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error moving in game', error });
  }
}