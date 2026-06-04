import { Router } from "express";
import { createResource, listResources } from "../controllers/resourceController.js";

export const resourceRoutes = Router();

resourceRoutes.get("/", listResources);
resourceRoutes.post("/", createResource);
