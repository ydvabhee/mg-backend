import { Request, Response } from "express";
import HttpStatusCodes from 'http-status-codes'
import { createBulkContentService, createContentService, getContentsForThemeService } from "../services/content.service";


export const createContent = async (req: Request, res: Response) => {
  const { title, value, url, theme, description } = req.body;
  try {
    const content = await createContentService({title, value, url, theme, description});
    res.status(HttpStatusCodes.CREATED).json(content);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating content' });
  }
}

 
export const createBulkContent = async (req: Request, res: Response) => {
  try {
    const createdContents = await createBulkContentService(req.body);
    res.status(HttpStatusCodes.CREATED).json(createdContents);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating contents' });
  }
}
 
export const getContentsForTheme = async (req: Request, res: Response) => { 
  try {
   
    const themeId = req.params.themeId
    let limit = 10;
    const contents = await  getContentsForThemeService(themeId, limit);
    res.status(HttpStatusCodes.OK).json(contents);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching contents' });
  }
}


