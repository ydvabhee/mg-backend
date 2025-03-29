import { Router } from "express";
import { validateData } from "../middlewares/zodValidation";
import { createTheme, getThemes } from "../controllers/theme.controller";
import { createThemeBodySchema } from "../zodSchemas/theme.zod";

export const themeRouter = Router();


themeRouter.get("/", getThemes);
themeRouter.post("/", validateData(createThemeBodySchema), createTheme);

