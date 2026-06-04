import type { Request, Response } from "express";
import { prisma } from "../database/client.js";
import { serializeMissingPerson, serializeVolunteer } from "../utils/prismaMapping.js";
import { missingPersonSchema, volunteerSchema } from "../validators/schemas.js";

export async function listVolunteers(_req: Request, res: Response) {
  const volunteers = await prisma.volunteer.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
    take: 100
  });
  return res.json(volunteers.map(serializeVolunteer));
}

export async function createVolunteer(req: Request, res: Response) {
  const payload = volunteerSchema.parse(req.body);
  const user = await prisma.user.upsert({
    where: { email: payload.email },
    update: { name: payload.name, role: "Volunteer" },
    create: {
      name: payload.name,
      email: payload.email,
      passwordHash: "volunteer-created-from-ops",
      role: "Volunteer"
    }
  });
  const volunteer = await prisma.volunteer.upsert({
    where: { userId: user.id },
    update: {
      skills: payload.skills.split(",").map((skill) => skill.trim()).filter(Boolean),
      availability: payload.availability,
      currentTask: payload.currentTask
    },
    create: {
      userId: user.id,
      skills: payload.skills.split(",").map((skill) => skill.trim()).filter(Boolean),
      availability: payload.availability,
      currentTask: payload.currentTask
    },
    include: { user: { select: { name: true, email: true } } }
  });
  req.app.get("io")?.emit("volunteer:updated", serializeVolunteer(volunteer));
  return res.status(201).json(serializeVolunteer(volunteer));
}

export async function listMissingPersons(_req: Request, res: Response) {
  const people = await prisma.missingPerson.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return res.json(people.map(serializeMissingPerson));
}

export async function createMissingPerson(req: Request, res: Response) {
  const payload = missingPersonSchema.parse(req.body);
  const person = await prisma.missingPerson.create({
    data: {
      name: payload.name,
      photoUrl: payload.photoUrl || null,
      details: payload.details,
      lastSeen: payload.lastSeen,
      matchScore: Math.round((70 + Math.random() * 26) * 10) / 10
    }
  });
  const serialized = serializeMissingPerson(person);
  req.app.get("io")?.emit("missing-person:created", serialized);
  return res.status(201).json(serialized);
}

export async function getAdminStats(_req: Request, res: Response) {
  const [users, emergencies, resources, volunteers, missingPersons, reports, ngos, notifications] = await Promise.all([
    prisma.user.count(),
    prisma.emergency.count(),
    prisma.resource.count(),
    prisma.volunteer.count(),
    prisma.missingPerson.count(),
    prisma.report.count(),
    prisma.nGO.count(),
    prisma.notification.count()
  ]);
  return res.json({ users, emergencies, resources, volunteers, missingPersons, reports, ngos, notifications });
}

export function createGenericRecord(req: Request, res: Response) {
  return res.status(201).json({ id: crypto.randomUUID(), ...req.body, createdAt: new Date().toISOString() });
}

export function listGenericRecords(req: Request, res: Response) {
  return res.json([]);
}
