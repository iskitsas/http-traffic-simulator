import { Request, Response } from "express";
import { omit } from "lodash";
import log from "../logger";
import { createUser } from "../services/user.service";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (e: any) {
    log.error(e)
    return res.send(409).send(e.message);
  }

}