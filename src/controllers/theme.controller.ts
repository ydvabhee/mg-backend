import { Request, Response } from "express";
import { Theme } from "../models/theme";
import HttpStatusCodes from 'http-status-codes'
import { createThemeService, getThemeByIdService, getThemesService } from "../services/theme.service";
export const createTheme = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const theme = await createThemeService(name, description);
    res.status(HttpStatusCodes.CREATED).json(theme);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating theme', error });
  }
}

export const getThemes = async (req: Request, res: Response) => {
  try {
    const themes = await getThemesService();
 
    if (themes.length === 0) {
      res.status(HttpStatusCodes.OK).json([]);
      return
    }

    res.status(HttpStatusCodes.OK).json(themes);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching themes', error });
  }
}


export const getThemeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const theme = await getThemeByIdService(id);
    if (!theme) {
      res.status(HttpStatusCodes.NOT_FOUND).json({ message: 'Theme not found' });
      return
    }
    res.status(HttpStatusCodes.OK).json(theme);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching theme', error });
  }
}