import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { prisma } from "../database/client.js";
import { createTokens } from "../services/tokenService.js";
import { serializeUser, toDbRole } from "../utils/prismaMapping.js";
import { loginSchema, registerSchema } from "../validators/schemas.js";

export async function register(req: Request, res: Response) {
  const payload = registerSchema.parse(req.body);
  const existing = await prisma.user.findUnique({ where: { email: payload.email } });
  if (existing) return res.status(409).json({ message: "User already exists" });

  const user = await prisma.user.create({
    data: {
    name: payload.name,
    email: payload.email,
    passwordHash: await bcrypt.hash(payload.password, 10),
      role: toDbRole(payload.role) as never
    }
  });
  const tokens = createTokens({ id: user.id, role: user.role });
  return res.status(201).json({ user: serializeUser(user), ...tokens });
}

export async function login(req: Request, res: Response) {
  const payload = loginSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: payload.email } });
  if (!user || !(await bcrypt.compare(payload.password, user.passwordHash))) return res.status(401).json({ message: "Invalid credentials" });
  const tokens = createTokens({ id: user.id, role: user.role });
  return res.json({ user: serializeUser(user), ...tokens });
}
