import { Router } from "express";
import { chat } from "../controllers/aiController.js";

export const aiRoutes = Router();

aiRoutes.post("/chat", chat);
