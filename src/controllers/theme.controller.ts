import { Request, Response } from "express";
import { Theme } from "../models/theme";
import HttpStatusCodes from 'http-status-codes'
export const createTheme = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    const theme = new Theme({
      name,
      description,
    });
    await theme.save();
    res.status(HttpStatusCodes.CREATED).json(theme);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating theme', error });
  }
}

export const getThemes = async (req: Request, res: Response) => {
  try {
    const themes = await Theme.find();
 
    if (themes.length === 0) {
      res.status(HttpStatusCodes.OK).json([]);
    }

    res.status(HttpStatusCodes.OK).json(themes);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching themes', error });
  }
}

export const getThemeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const theme = await Theme.findById(id);
    if (!theme) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({ message: 'Theme not found' });
    }
    res.status(HttpStatusCodes.OK).json(theme);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching theme', error });
  }
}