import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["Citizen", "Volunteer", "NGO", "Admin", "First Responder"]).default("Citizen")
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const emergencySchema = z.object({
  title: z.string().min(3),
  description: z.string().min(8),
  category: z.enum(["Flood", "Earthquake", "Fire", "Cyclone", "Medical", "Missing Person", "Infrastructure Damage"]),
  severity: z.enum(["Low", "Medium", "High", "Critical"]),
  lat: z.number(),
  lng: z.number()
});

export const aiChatSchema = z.object({
  message: z.string().min(3).max(4000)
});

export const resourceSchema = z.object({
  name: z.string().min(2),
  type: z.enum(["Food", "Water", "Medicine", "Shelter", "Rescue Equipment"]),
  quantity: z.coerce.number().int().min(0),
  location: z.string().min(2),
  status: z.enum(["available", "requested", "in-transit", "distributed"]).default("available")
});

export const volunteerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  skills: z.string().min(2),
  availability: z.string().min(2),
  currentTask: z.string().optional()
});

export const missingPersonSchema = z.object({
  name: z.string().min(2),
  photoUrl: z.string().url().optional().or(z.literal("")),
  details: z.string().min(4),
  lastSeen: z.string().min(2)
});
