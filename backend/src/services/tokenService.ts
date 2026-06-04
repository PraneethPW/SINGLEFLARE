import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function createTokens(user: { id: string; role: string }) {
  return {
    accessToken: jwt.sign(user, env.jwtSecret, { expiresIn: "15m" }),
    refreshToken: jwt.sign(user, env.jwtRefreshSecret, { expiresIn: "30d" })
  };
}
