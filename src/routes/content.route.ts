import { Router } from "express";
import { validateData } from "../middlewares/zodValidation";
import {  createContentBulkSchema, createContentSchema, getContentByThemeIdSchema } from "../zodSchemas/content.zod";
import { createBulkContent, createContent, getContentsForTheme } from "../controllers/content.controller";

export const contentRouter = Router();

contentRouter.post("/", validateData(createContentSchema), createContent);
contentRouter.post("/bulk", validateData(createContentBulkSchema), createBulkContent);
contentRouter.get("/theme/:themeId", validateData(getContentByThemeIdSchema), getContentsForTheme);