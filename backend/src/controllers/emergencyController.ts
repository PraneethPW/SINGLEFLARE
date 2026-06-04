import type { Request, Response } from "express";
import { prisma } from "../database/client.js";
import type { AuthRequest } from "../middlewares/auth.js";
import { serializeEmergency, toDbCategory, toDbStatus } from "../utils/prismaMapping.js";
import { emergencySchema } from "../validators/schemas.js";

export async function listEmergencies(_req: Request, res: Response) {
  const emergencies = await prisma.emergency.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return res.json(emergencies.map(serializeEmergency));
}

export async function createEmergency(req: AuthRequest, res: Response) {
  const payload = emergencySchema.parse(req.body);
  const incident = await prisma.emergency.create({
    data: {
      title: payload.title,
      description: payload.description,
      category: toDbCategory(payload.category) as never,
      severity: payload.severity as never,
      latitude: payload.lat,
      longitude: payload.lng,
      photos: [],
      creatorId: req.user?.id
    }
  });
  const serialized = serializeEmergency(incident);
  req.app.get("io")?.emit("incident:created", serialized);
  return res.status(201).json(serialized);
}

export async function updateEmergencyStatus(req: Request, res: Response) {
  const id = String(req.params.id);
  const exists = await prisma.emergency.findUnique({ where: { id } });
  if (!exists) return res.status(404).json({ message: "Incident not found" });
  const incident = await prisma.emergency.update({
    where: { id },
    data: { status: toDbStatus(req.body.status ?? "new") as never }
  });
  const serialized = serializeEmergency(incident);
  req.app.get("io")?.emit("incident:updated", serialized);
  return res.json(serialized);
}
