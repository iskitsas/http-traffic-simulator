import { Express, Request, Response } from "express";
import { validateRequest, requiresUser, scenarioValidation } from "../middleware";
import { createUserHandler } from "../controller/user.controller";
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler, } from "../controller/session.controller";
import { scenarioHandler } from "../controller/scenarioRequest.controller";
import { createUserSchema, createUserSessionSchema, } from "../schema/user.schema";
import { scenarioSchema } from "../schema/scenarioRequest.schema";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);// Register user
  app.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler);// Register user
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);// Get the user's sessions
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);// Logout
  app.post("/api/scenarios", [scenarioValidation(scenarioSchema)], scenarioHandler)
}