import { Request, Response } from "express";
import { Theme } from "../models/theme";
import HttpStatusCodes from 'http-status-codes'

import { Content } from "../models/content";
import { IContent } from "../models/content/content.dto";
import { createContentBulkBodySchema } from "../zodSchemas/content.zod";

import {ObjectId} from 'bson'


export const createContent = async (req: Request, res: Response) => {
  const { title, value, url, theme } = req.body;
  try {
    const content = new Content({
      title,
      value,
      url,
      theme,
    });
    await content.save();
    res.status(HttpStatusCodes.CREATED).json(content);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating content', error });
  }
}

type ContentBulkBody = typeof createContentBulkBodySchema._type;
export const createBulkContent = async (req: Request, res: Response) => {
  const {data, themeId }:ContentBulkBody = req.body;

  const randomIntValue = Math.floor(Math.random() * 10000000);


  // Check if themeId is valid
  const theme = await Theme.findById(themeId);
  if (!theme) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'Invalid themeId' });
    return
  }

  let payload = data.map((content) => ({
    title: content.alt || "",
    value:  Math.floor(Math.random() * randomIntValue).toString(),
    url: content.src,
    createdAt: new Date(),
    theme: themeId,
  }));
  

  payload.push(...payload)

  try {
    const createdContents = await Content.insertMany(payload);
    res.status(HttpStatusCodes.CREATED).json(createdContents);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating contents', error });
  }
}
 
export const getContentsForTheme = async (req: Request, res: Response) => { 
  try {
   
    const themeId = "67e7f615bfae45c265fd6305"
    let limit = 10;

    const contents = await Content.aggregate([
  
      { $match: { "theme": new ObjectId(themeId) } },

      { $group: { 
          _id: "$value", 
          count: { $sum: 1 },
          docs: { $push: "$$ROOT" }  
        } 
      },
      
      { $match: { "count": { $gt: 1 } } },
      { $unwind: "$docs" },
      { $replaceRoot: { newRoot: "$docs" } },
      { $limit: limit }
    ]);

    console.log("Contents: ", contents)

    res.status(HttpStatusCodes.OK).json(contents);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching contents', error });
  }
}
