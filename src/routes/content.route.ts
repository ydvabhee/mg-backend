import { Router } from "express";
import { validateData } from "../middlewares/zodValidation";
import { createContentBodySchema, createContentBulkBodySchema } from "../zodSchemas/content.zod";
import { createBulkContent, createContent, getContentsForTheme } from "../controllers/content.controller";

export const contentRouter = Router();

contentRouter.post("/", validateData(createContentBodySchema), createContent);
contentRouter.post("/bulk", validateData(createContentBulkBodySchema), createBulkContent);
contentRouter.get("/", getContentsForTheme);