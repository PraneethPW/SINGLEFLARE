import type { Incident, ResourceItem } from "../types/domain";

export const demoIncidents: Incident[] = [
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
  },
  {
    id: "inc-003",
    title: "Bridge route damaged",
    category: "Infrastructure Damage",
    severity: "Medium",
    description: "Alternate route needed for ambulance corridor.",
    lat: 28.5355,
    lng: 77.391,
    status: "new",
    createdAt: new Date().toISOString()
  }
];

export const demoResources: ResourceItem[] = [
  { id: "res-1", name: "Water cans", type: "Water", quantity: 420, location: "Sector 12 depot", status: "available" },
  { id: "res-2", name: "First-aid kits", type: "Medicine", quantity: 88, location: "Mobile Unit A", status: "in-transit" },
  { id: "res-3", name: "Temporary beds", type: "Shelter", quantity: 160, location: "School shelter", status: "available" },
  { id: "res-4", name: "Rescue ropes", type: "Rescue Equipment", quantity: 35, location: "Volunteer base", status: "requested" }
];

export const trendData = [
  { name: "Mon", incidents: 18, resources: 42, response: 16 },
  { name: "Tue", incidents: 28, resources: 58, response: 13 },
  { name: "Wed", incidents: 44, resources: 76, response: 11 },
  { name: "Thu", incidents: 31, resources: 62, response: 12 },
  { name: "Fri", incidents: 55, resources: 91, response: 9 },
  { name: "Sat", incidents: 48, resources: 84, response: 10 }
];
