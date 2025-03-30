import { Router } from "express";
import { validateData } from "../middlewares/zodValidation";
import { createTheme, getThemeById, getThemes } from "../controllers/theme.controller";
import { createThemeSchema } from "../zodSchemas/theme.zod";

export const themeRouter = Router();


themeRouter.get("/:id", getThemeById);
themeRouter.get("/", getThemes);
themeRouter.post("/", validateData(createThemeSchema), createTheme);

