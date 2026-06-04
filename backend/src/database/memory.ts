import type { Incident, ResourceItem } from "../types/domain.js";

export const incidents: Incident[] = [
  {
    id: "inc-001",
    title: "Flash flood near Riverside Colony",
    category: "Flood",
    severity: "Critical",
    description: "Water level rising around residential blocks. Boat support requested.",
    lat: 28.6139,
    lng: 77.209,
    status: "assigned",
    createdAt: new Date().toISOString()
  },
  {
    id: "inc-002",
    title: "Medical camp shortage",
    category: "Medical",
    severity: "High",
    description: "Insulin, ORS, and antiseptic supplies below 20%.",
    lat: 28.7041,
    lng: 77.1025,
    status: "triaged",
    createdAt: new Date().toISOString()
  }
];

export const resources: ResourceItem[] = [
  { id: "res-1", name: "Water cans", type: "Water", quantity: 420, location: "Sector 12 depot", status: "available" },
  { id: "res-2", name: "First-aid kits", type: "Medicine", quantity: 88, location: "Mobile Unit A", status: "in-transit" },
  { id: "res-3", name: "Temporary beds", type: "Shelter", quantity: 160, location: "School shelter", status: "available" }
];
