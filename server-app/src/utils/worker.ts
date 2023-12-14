import { runTest as multiRequest } from "../../tests/multi-requests";
import { runTest as simpleRequest } from "../../tests/simple-request";

const cluster = require("cluster")
const worker = require("worker_threads")
const { parentPort, threadId } = worker
const fs = require("fs")
const path = require("path");

type ScenarioConfig = {
  scenario: string,
  requests: string
}

try {
  if (cluster.isMaster) {
    parentPort.on('message', (msg: any) => {
      const { task, data } = msg
      // console.log(`running task on thread ${threadId}`)
      const scenarioConfig: ScenarioConfig = data;
      fs.writeFileSync(path.join(__dirname, `../../temp/${threadId}.txt`), JSON.stringify({ path: task }))
      fs.writeFileSync(path.join(__dirname, `../../temp/${process.pid}${threadId}.flex`), JSON.stringify(scenarioConfig))
      if (task === "multi")
        multiRequest()
      else
        simpleRequest()

    })
  }
  else {
    const task = fs.readFileSync(path.join(__dirname, `../../temp/${process.env.threadId}.txt`))
    if (JSON.parse(task).path === "multi")
      multiRequest()
    else
      simpleRequest()
  }
} catch (error) {
  console.log(error)
}
