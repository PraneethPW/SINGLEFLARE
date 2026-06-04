import type { Emergency, Resource, User, Volunteer, MissingPerson } from "@prisma/client";

export function toDbRole(role: string) {
  return role === "First Responder" ? "FirstResponder" : role;
}

export function fromDbRole(role: string) {
  return role === "FirstResponder" ? "First Responder" : role;
}

export function toDbCategory(category: string) {
  return category.replaceAll(" ", "");
}

export function fromDbCategory(category: string) {
  if (category === "MissingPerson") return "Missing Person";
  if (category === "InfrastructureDamage") return "Infrastructure Damage";
  return category;
}

export function toDbStatus(status: string) {
  const normalized = status.replaceAll("-", " ");
  return normalized.split(" ").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
}

export function fromDbStatus(status: string) {
  return status.replace(/[A-Z]/g, (letter, index) => `${index ? "-" : ""}${letter.toLowerCase()}`);
}

export function toDbResourceType(type: string) {
  return type.replaceAll(" ", "");
}

export function fromDbResourceType(type: string) {
  return type === "RescueEquipment" ? "Rescue Equipment" : type;
}

export function serializeUser(user: Pick<User, "id" | "name" | "email" | "role">) {
  return { id: user.id, name: user.name, email: user.email, role: fromDbRole(user.role) };
}

export function serializeEmergency(emergency: Emergency) {
  return {
    id: emergency.id,
    title: emergency.title,
    category: fromDbCategory(emergency.category),
    severity: emergency.severity,
    description: emergency.description,
    lat: emergency.latitude,
    lng: emergency.longitude,
    status: fromDbStatus(emergency.status),
    createdAt: emergency.createdAt.toISOString()
  };
}

export function serializeResource(resource: Resource) {
  return {
    id: resource.id,
    name: resource.name,
    type: fromDbResourceType(resource.type),
    quantity: resource.quantity,
    location: resource.location,
    status: fromDbStatus(resource.status),
    createdAt: resource.createdAt.toISOString()
  };
}

export function serializeVolunteer(volunteer: Volunteer & { user: Pick<User, "name" | "email"> }) {
  return {
    id: volunteer.id,
    name: volunteer.user.name,
    email: volunteer.user.email,
    skills: volunteer.skills,
    availability: volunteer.availability,
    currentTask: volunteer.currentTask,
    responseScore: volunteer.responseScore,
    createdAt: volunteer.createdAt.toISOString()
  };
}

export function serializeMissingPerson(person: MissingPerson) {
  return {
    id: person.id,
    name: person.name,
    photoUrl: person.photoUrl,
    details: person.details,
    lastSeen: person.lastSeen,
    matchScore: person.matchScore,
    createdAt: person.createdAt.toISOString()
  };
}
