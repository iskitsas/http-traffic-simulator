import { Express, Request, Response } from "express";
import { validateRequest, requiresUser, scenarioValidation } from "../middleware";
import { createUserHandler } from "../controller/user.controller";
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler, } from "../controller/session.controller";
import { scenarioHandler } from "../controller/scenarioRequest.controller";
import { createUserSchema, createUserSessionSchema, } from "../schema/user.schema";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.status(200).send("ok"));
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);// Register user
  app.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler);// Verify user
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);// Get the user's sessions
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);// Logout
  app.post("/api/scenarios", [requiresUser, scenarioValidation()], scenarioHandler)
}