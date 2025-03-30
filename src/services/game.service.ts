import { Content } from "../models/content";
import { Game } from "../models/game";
import { IGame } from "../models/game/game.dto";
import { getLogger } from "../utills/logger";


const logger= getLogger()
export const createGameService = async (payload: Omit<IGame, 'theme'> & { theme: string }) => {
  try {
    const game = new Game(payload);
    await game.save();
    return game
  } catch (error) {
    logger.info('Error with createGameService - Error: ', error)
    throw error
  }
}

export const getGameSummaryService = async (id: string) => {
  try {

    const game = await Game.findById(id).select("score startTime endTime moves");
    if (!game) {
      throw new Error("Game not found");
    }

    if (game.endTime === 0) {
      throw new Error("Game not completed");
    }

    const duration = game.endTime - game.startTime;
    const seconds = Math.floor((duration % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, "0");
    const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0");

    return {
      score: game.score,
      time: `${hours}h:${minutes}m:${seconds}s`,
      moves: game.moves,
    };

  } catch (error) {
    logger.info('Error with getGameSummaryService - Error: ', error)
    throw error
  }
};


export const calculateScore  = async (moves: number, score: number ) => {

  const BASE_INCREMENT = 5

  if (moves === 0) {
    return score;
  }

  const newScore = score + BASE_INCREMENT + Math.floor(50 / moves);
  return newScore
}


export const moveInGameService = async (gameId: string, selectedCardIds: string[]) => {
  try {
    const game = await Game.findById(gameId);
    const TOTAL_CARD_PAIRS = 18
    if (!game) {
      throw new Error("Game not found");
    }

    const content = await Content.find({ _id: { $in: selectedCardIds } });
    if (content.length < 2) {
      throw new Error("Invalid move: Must select two cards");
    }

    const [firstCard, secondCard] = content;
    game.moves += 1;
    let validMove = firstCard.value === secondCard.value;
    if (validMove) {
      game.cardMatches += 1;
      game.score = await calculateScore(game.moves, game.score)
      
      if (game.cardMatches === TOTAL_CARD_PAIRS) {
        game.endTime = Date.now();
      }
    }
    await game.save();
    return {
      validMove,
      ...game.toJSON(),
    };

  } catch (error) {
    logger.info('Error with moveInGameService - Error: ', error)
    throw error
  }
};