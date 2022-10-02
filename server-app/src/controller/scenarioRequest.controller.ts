import fs from "fs"
import path from "path"
import { Response } from "express";
import { pool } from "../utils/pool";

type ScenarioConfig = {
  scenario: {
    _id: String
  },
  requests: {
    _id: String
  }
}

export async function scenarioHandler(req: any, res: Response) {
  try {
    if (!fs.existsSync(path.join(__dirname, "../../temp"))) {
      fs.mkdirSync(path.join(__dirname, "../../temp"));
    }
    const scenarioConfig: ScenarioConfig = req.scenarioConfig;
    if (Array.isArray(scenarioConfig.requests)) {
      const resp = await pool.createTask("multi")?.runAsync(scenarioConfig)
      res.status(200).json(resp)
    }
    else {
      const resp = await pool.createTask("simple")?.runAsync(scenarioConfig)
      res.status(200).json(resp)
    }
    // req.connection.on('close', function () {
    //   worker.terminate()
    // })
  } catch (error: any) {
    res.status(400).json({ error: error.message || error })
  }

}