import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser } from "../services/user.service";
import { flexutils } from '../utils/flexutils'

export async function createUserHandler(req: Request, res: Response) {
  if (!flexutils.requiresAuth)
    return res.status(405).send(flexutils.API_NOT_SUPPORTED);
  try {
    const user = await createUser(req.body);
    return res.status(201).json(omit(user.toJSON(), "password"));
  } catch (e: any) {
    console.log(e)
    return res.status(409).send(e.message);
  }

}
