import axios from "axios";
import type { Incident, MissingPersonRecord, ResourceItem, Role, VolunteerProfile } from "../types/domain";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5153/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("signalflare-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function fetchIncidents() {
  const { data } = await api.get<Incident[]>("/emergencies");
  return data;
}

export async function createIncident(payload: Omit<Incident, "id" | "createdAt" | "status">) {
  const { data } = await api.post<Incident>("/emergencies", payload);
  return data;
}

export async function fetchResources() {
  const { data } = await api.get<ResourceItem[]>("/resources");
  return data;
}

export async function createResource(payload: Omit<ResourceItem, "id">) {
  const { data } = await api.post<ResourceItem>("/resources", payload);
  return data;
}

export async function askEmergencyAI(message: string) {
  const { data } = await api.post<{ answer: string }>("/ai/chat", { message });
  return data.answer;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: Role;
  };
  accessToken: string;
  refreshToken: string;
}

export async function loginUser(payload: { email: string; password: string }) {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function registerUser(payload: { name: string; email: string; password: string; role: Role }) {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data;
}

export async function requestPasswordReset(email: string) {
  const { data } = await api.post<{ message: string }>("/auth/forgot-password", { email });
  return data.message;
}

export async function fetchVolunteers() {
  const { data } = await api.get<VolunteerProfile[]>("/volunteers");
  return data;
}

export async function createVolunteer(payload: { name: string; email: string; skills: string; availability: string; currentTask?: string }) {
  const { data } = await api.post<VolunteerProfile>("/volunteers", payload);
  return data;
}

export async function fetchMissingPersons() {
  const { data } = await api.get<MissingPersonRecord[]>("/missing-persons");
  return data;
}

export async function createMissingPerson(payload: { name: string; photoUrl?: string; details: string; lastSeen: string }) {
  const { data } = await api.post<MissingPersonRecord>("/missing-persons", payload);
  return data;
}

export async function fetchAdminStats() {
  const { data } = await api.get<Record<string, number>>("/admin/stats");
  return data;
}
