import { Request, Response } from "express";
import { Game } from "../models/game";
import HttpStatusCodes, { StatusCodes } from 'http-status-codes'
import { startGameBodySchema } from "../zodSchemas/game.zod";
import { Content } from "../models/content";


type createGameBody = typeof startGameBodySchema._type
export const createGame = async (req: Request, res: Response) => {
  const { themeId }: createGameBody = req.body;
  try {
    const game = new Game({
      theme: themeId,
      score: 0,
      startTime: Date.now(),
      endTime: 0,
      moves: 0
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

export const moveInGame = async (req: Request, res: Response) => {
  try {
    const { gameId, selectedCardIds} = req.body

    // find the game
    const game = await Game.findById(gameId)

    if(!game) {
      res.status(HttpStatusCodes.NOT_FOUND).json({
        message: "Game not found"
      })
      return
    }

    // see if move is correct
    const content = await Content.find({
      _id: {
        $in: selectedCardIds
      }
    })

    const firstCard = content[0]
    const secondCard = content[1]

    if(firstCard.value !== secondCard.value) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Invalid cards"
      })
    } 
    game.moves += 1
    game.score += 1

    if(game.moves === 18) {
      game.endTime = Date.now()
    }
    await game.save()
    res.status(HttpStatusCodes.OK).json(game)

  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error moving in game', error });
  }
}