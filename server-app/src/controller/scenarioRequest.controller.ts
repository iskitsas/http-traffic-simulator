import fs from "fs"
import { Worker } from "worker_threads";
import path from "path"
import { Response } from "express";
import log from "../logger";


type ScenarioConfig = {
  scenario: string,
  requests: string
}

export async function scenarioHandler(req: any, res: Response) {
  try {
    if (!fs.existsSync(path.join(__dirname, "../../temp"))) {
      fs.mkdirSync(path.join(__dirname, "../../temp"));
    }
    const scenarioConfig: ScenarioConfig = req.scenarioConfig;
    fs.writeFileSync(path.join(__dirname, "../../temp/config.flex"), JSON.stringify(scenarioConfig))
    let worker: Worker;
    if (Array.isArray(scenarioConfig.requests))
      worker = new Worker(path.join(__dirname, "../../tests/multi-requests.js"))
    else
      worker = new Worker(path.join(__dirname, "../../tests/simple-request.js"))
    worker.once("message", async (stats) => {
      res.status(200).json(stats);
    });
    req.connection.on('close', function () {
      worker.terminate()
    })
  } catch (error: any) {
    log.error(error)
    res.status(400).json({ error: error.message || error })
  }

}