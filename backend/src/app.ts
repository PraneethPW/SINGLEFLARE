import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env.js";
import { errorHandler } from "./middlewares/error.js";
import { aiRoutes } from "./routes/aiRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import { emergencyRoutes } from "./routes/emergencyRoutes.js";
import { opsRoutes } from "./routes/opsRoutes.js";
import { resourceRoutes } from "./routes/resourceRoutes.js";

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: env.frontendUrl, credentials: true }));
  app.use(express.json({ limit: "5mb" }));
  app.use(rateLimit({ windowMs: 60_000, max: 180 }));

  app.get("/health", (_req, res) => res.json({ status: "ok", service: "signalflare-api" }));
  app.use("/api/auth", authRoutes);
  app.use("/api/emergencies", emergencyRoutes);
  app.use("/api/resources", resourceRoutes);
  app.use("/api/ai", aiRoutes);
  app.use("/api", opsRoutes);

  const swaggerSpec = swaggerJsdoc({
    definition: {
      openapi: "3.0.0",
      info: { title: "SignalFlare API", version: "1.0.0" }
    },
    apis: []
  });
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use(errorHandler);
  return app;
}
