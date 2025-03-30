import { Theme } from "../models/theme";
import { getLogger } from "../utills/logger";

const logger = getLogger()
export const createThemeService = async (name: string, description: string) => {
  try {
    const theme = new Theme({ name, description });
    return await theme.save();
  } catch (error) {
    logger.info('Error with createThemeService - Error: ', error)
    throw error
  }
};

export const getThemesService = async () => {
  try {
    return await Theme.find();
  } catch (error) {
    logger.info('Error with getThemesService - Error: ', error)
    throw error
  }
};  

export const getThemeByIdService = async (id: string) => {
  try {
    return await Theme.findById(id);
  } catch (error) {
    logger.info('Error with getThemeByIdService - Error: ', error)
    throw error
  }
};