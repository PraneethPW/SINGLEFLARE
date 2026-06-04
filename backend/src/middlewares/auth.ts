import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Missing access token" });

  try {
    req.user = jwt.verify(token, env.jwtSecret) as { id: string; role: string };
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid access token" });
  }
}

export function allowRoles(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) return res.status(403).json({ message: "Forbidden" });
    return next();
  };
}
