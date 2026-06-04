import type { Request, Response } from "express";
import { prisma } from "../database/client.js";
import { serializeResource, toDbResourceType, toDbStatus } from "../utils/prismaMapping.js";
import { resourceSchema } from "../validators/schemas.js";

export async function listResources(_req: Request, res: Response) {
  const resources = await prisma.resource.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return res.json(resources.map(serializeResource));
}

export async function createResource(req: Request, res: Response) {
  const payload = resourceSchema.parse(req.body);
  const resource = await prisma.resource.create({
    data: {
      name: payload.name,
      type: toDbResourceType(payload.type) as never,
      quantity: payload.quantity,
      location: payload.location,
      status: toDbStatus(payload.status) as never
    }
  });
  const serialized = serializeResource(resource);
  req.app.get("io")?.emit("resource:updated", serialized);
  return res.status(201).json(serialized);
}
