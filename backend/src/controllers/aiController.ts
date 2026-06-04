import type { Request, Response } from "express";
import { askOpenRouter } from "../services/aiService.js";
import { aiChatSchema } from "../validators/schemas.js";

export async function chat(req: Request, res: Response) {
  const { message } = aiChatSchema.parse(req.body);
  const answer = await askOpenRouter(message);
  return res.json({ answer });
}
