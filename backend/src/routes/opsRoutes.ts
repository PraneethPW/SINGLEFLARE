import { Router } from "express";
import { createGenericRecord, createMissingPerson, createVolunteer, getAdminStats, listGenericRecords, listMissingPersons, listVolunteers } from "../controllers/opsController.js";

export const opsRoutes = Router();

opsRoutes.get("/volunteers", listVolunteers);
opsRoutes.post("/volunteers", createVolunteer);
opsRoutes.get("/missing-persons", listMissingPersons);
opsRoutes.post("/missing-persons", createMissingPerson);
opsRoutes.get("/admin/stats", getAdminStats);

for (const path of ["/reports", "/notifications", "/channels", "/ngos", "/admin/audit-logs"]) {
  opsRoutes.get(path, listGenericRecords);
  opsRoutes.post(path, createGenericRecord);
}
