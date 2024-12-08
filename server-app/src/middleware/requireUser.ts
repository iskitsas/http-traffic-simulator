import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import {flexutils} from "../utils/flexutils";

const requiresUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = get(req, "user");
  if (!flexutils.requiresAuth)
    return next()
  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export default requiresUser;
