import { Router } from "express";
import { createEmergency, listEmergencies, updateEmergencyStatus } from "../controllers/emergencyController.js";

export const emergencyRoutes = Router();

emergencyRoutes.get("/", listEmergencies);
emergencyRoutes.post("/", createEmergency);
emergencyRoutes.patch("/:id/status", updateEmergencyStatus);
