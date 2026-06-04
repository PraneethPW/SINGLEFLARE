import { Router } from "express";
import { login, register } from "../controllers/authController.js";

export const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/forgot-password", (_req, res) => res.json({ message: "Password reset email queued" }));
authRoutes.post("/reset-password", (_req, res) => res.json({ message: "Password reset complete" }));
authRoutes.post("/email-verification", (_req, res) => res.json({ message: "Email verified" }));
