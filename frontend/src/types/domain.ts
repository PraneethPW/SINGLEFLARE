export type Role = "Citizen" | "Volunteer" | "NGO" | "Admin" | "First Responder";

export type EmergencyCategory =
  | "Flood"
  | "Earthquake"
  | "Fire"
  | "Cyclone"
  | "Medical"
  | "Missing Person"
  | "Infrastructure Damage";

export type Severity = "Low" | "Medium" | "High" | "Critical";

export interface Incident {
  id: string;
  title: string;
  category: EmergencyCategory;
  severity: Severity;
  description: string;
  lat: number;
  lng: number;
  status: "new" | "triaged" | "assigned" | "resolved";
  createdAt: string;
}

export interface ResourceItem {
  id: string;
  name: string;
  type: "Food" | "Water" | "Medicine" | "Shelter" | "Rescue Equipment";
  quantity: number;
  location: string;
  status: "available" | "requested" | "in-transit" | "distributed";
}

export interface VolunteerProfile {
  id: string;
  name: string;
  email: string;
  skills: string[];
  availability: string;
  currentTask?: string | null;
  responseScore: number;
  createdAt: string;
}

export interface MissingPersonRecord {
  id: string;
  name: string;
  photoUrl?: string | null;
  details: string;
  lastSeen: string;
  matchScore?: number | null;
  createdAt: string;
}
