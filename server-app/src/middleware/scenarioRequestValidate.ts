import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "../logger";

const scenarioValidation = (scenarioSchema: AnySchema) => async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    await scenarioSchema.validate(JSON.parse(req.files.flexfile.data))
    return next();
  } catch (e: any) {
    log.error(e);
    return res.status(400).send(e.errors);
  }
}
export default scenarioValidation;