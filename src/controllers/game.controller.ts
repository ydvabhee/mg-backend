import { Request, Response } from "express";
import { Game } from "../models/game";
import HttpStatusCodes, { StatusCodes } from 'http-status-codes'


export const createGame = async (req: Request, res: Response) => {
  const { theme } = req.body;
  try {
    const game = new Game({
      theme,
    });
    await game.save();
    res.status(HttpStatusCodes.CREATED).json(game);

  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating game', error });
  }
}
export const getGames = async (req: Request, res: Response) => {
  try {
    const games = await Game.find().populate('theme');
    res.status(HttpStatusCodes.OK).json(games);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching games', error });
  }
}

export const getGameById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const game = await Game.findById(id).populate('theme');
    if (!game) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({ message: 'Game not found' });
    }
    res.status(HttpStatusCodes.OK).json(game);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching game', error });
  }
}
export const updateGame = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { score, moves, endTime } = req.body;
  try {
    const game = await Game.findByIdAndUpdate(id, { score, moves, endTime }, { new: true });
    if (!game) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Game not found' });
    }
    res.status(HttpStatusCodes.OK).json(game);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating game', error });
  }
}
