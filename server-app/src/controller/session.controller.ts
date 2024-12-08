import { get } from "lodash";
import { Request, Response } from "express";
import {
  createSession,
  createAccessToken,
  updateSession,
  findSessions,
} from "../services/session.service";
import { sign } from "../utils/jwt.util";
import { validatePassword } from "../services/user.service";
import {flexutils} from "../utils/flexutils";

export async function createUserSessionHandler(req: Request, res: Response) {
  if (!flexutils.requiresAuth) {
    return res.status(405).send(flexutils.API_NOT_SUPPORTED);
  }
  // validate the email and password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid username or password");
  }

  // Create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create access token
  const accessToken = createAccessToken({
    user,
    session,
  });

  // create refresh token
  const refreshToken = sign(session, {
    expiresIn: process.env.RefreshTokenTtl, // 1 year
  });

  // send refresh & access token back
  return res.send({ accessToken, refreshToken });
}

export async function invalidateUserSessionHandler(
  req: Request,
  res: Response
) {
  if (!flexutils.requiresAuth) {
    return res.status(405).send(flexutils.API_NOT_SUPPORTED);
  }

  const sessionId = get(req, "user.session");

  await updateSession({ _id: sessionId }, { valid: false });

  return res.sendStatus(200);
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  if (!flexutils.requiresAuth) {
    return res.status(405).send(flexutils.API_NOT_SUPPORTED);
  }

  const userId = get(req, "user._id");

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}
