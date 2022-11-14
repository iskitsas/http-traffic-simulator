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
    const { worker, taskComplete } = pool.getworker();
    if (!worker) {//if no worker is idle
     return res.status(500).json({ error: "site busy try again latter" })
    }
    let resp: any;
    if (Array.isArray(scenarioConfig.requests)) {
      resp = await new Promise(((res, rej) => {
        worker.postMessage({ task: "multi", data: scenarioConfig })
        worker.on("message", (data: any) => {
          res(data)
          taskComplete(worker.threadId)
        })
      }))
    }
    else {
      resp = await new Promise(((res, rej) => {
        worker.postMessage({ task: "simple", data: scenarioConfig })
        worker.on("message", (data: any) => {
          res(data)
          taskComplete(worker.threadId)
        })
      }))
    }
    res.status(200).json(resp)
  } catch (error: any) {
    res.status(400).json({ error: error.message || error })
  }

}