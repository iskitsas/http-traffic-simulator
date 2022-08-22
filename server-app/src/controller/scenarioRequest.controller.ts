import fs from "fs"
import { Worker } from "worker_threads";
import path from "path"
import { Response } from "express";
import log from "../logger";

export async function scenarioHandler(req: any, res: Response) {
  try {
    const scenarioIndex = req.body.scenarioIndex
    const parsedData = JSON.parse(req.files.flexfile.data)
    if (scenarioIndex > parsedData.scenario.length - 1)
      throw Error("index out of bound");
    const scenarioId = parsedData.scenario[scenarioIndex]._id
    let required_requests = parsedData.requests.filter((request: any, index: number) => request.scenarioId === scenarioId)
    required_requests = required_requests.length > 1 ? required_requests : required_requests[0]
    const required_data = {
      projects: parsedData.project,
      scenario: parsedData.scenario[scenarioIndex],
      requests: required_requests
    }
    fs.writeFileSync("temp/config.flex", JSON.stringify(required_data))
    let worker: Worker;
    if (Array.isArray(required_requests))
      worker = new Worker(path.join(__dirname, "../../tests/multi-requests.js"))
    else
      worker = new Worker(path.join(__dirname, "../../tests/simple-request.js"))
    worker.once("message", async (stats) => {
      res.status(200).json(stats);
    });
    req.on("close", () => {
      worker.terminate()
    })
  } catch (error: any) {
    log.error(error)
    res.status(400).json({ error: error.message || error })
  }

}