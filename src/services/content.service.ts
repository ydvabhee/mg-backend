import { Content } from "../models/content";
import { CreateContentServiceDto } from "../models/content/content.dto";
import { Theme } from "../models/theme";
import {ObjectId} from 'bson'
import { createContentBulkBodySchema } from "../zodSchemas/content.zod";
import { getLogger } from "../utills/logger";


const logger= getLogger()
export const createContentService = async (data: CreateContentServiceDto) => {
  try {
    const content = new Content(data);
    await content.save();
    return content
  } catch (error) {
    logger.info('Error with createContentService - Error: ', error)
    throw error
  }
}

export const createBulkContentService = async (body: typeof createContentBulkBodySchema._type) => {
  try {
    const {data, themeId } = body;
    const randomIntValue = Math.floor(Math.random() * 10000000);

    // Check if themeId is valid
    const theme = await Theme.findById(themeId);
    if (!theme) {
      throw new Error("Invalid themeId");
    }
  
    let payload = data.map((content) => ({
      title: content.alt || "",
      value:  Math.floor(Math.random() * randomIntValue).toString(),
      url: content.src,
      createdAt: new Date(),
      theme: themeId,
    }));
    
    payload.push(...payload)
    const createdContents = await Content.insertMany(payload);
    return createdContents
    
  } catch (error) {
    logger.info('Error with createBulkContentService - Error: ', error)
    throw error
  }
}


export const getContentsForThemeService = async (themeId: string, limit: number) => {
  try {
    const contents = await Content.aggregate([
  
      { $match: { "theme": new ObjectId(themeId), isActive: true } },

      { $group: { 
          _id: "$value", 
          count: { $sum: 1 },
          docs: { $push: "$$ROOT" }  
        } 
      },

      { $match: { "count": { $gt: 1 } } },
      { $unwind: "$docs" },
      { $replaceRoot: { newRoot: "$docs" } },
      { $project: { _id: 1, title:1, description: 1, url: 1 } },
      { $limit: limit }
    ]);

    return contents
  } catch (error) {
    logger.info('Error with getContentsForThemeService - Error: ', error)
    throw error
  }
}