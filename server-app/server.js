const express = require("express")
const app = express();
const fs = require("fs")
const fileupload = require('express-fileupload');
const { Worker } = require("worker_threads");
const path = require("path");
const PORT = process.env.PORT || 8080;
let totalclientshandeling=0;

const validate = (data) => {
  let error = {
    haserror: false,
    scenario: {},
    requests: data.requests.map(() => { return {} })//initializing empty array of objects
  };
  if (!data.scenario.workers) {
    error.scenario.workers = "undefined";
    error.haserror = true
  }
  if (!data.scenario.totalclients) {
    error.scenario.totalclients = "undefined";
    error.haserror = true
  }
  if (!data.scenario.duration) {
    error.scenario.duration = "undefined";
    error.haserror = true
  }
  if (!data.scenario.throttling) {
    error.scenario.throttling = "undefined";
    error.haserror = true
  }
  if (!data.scenario.delay) {
    error.scenario.delay = "undefined";
    error.haserror = true
  }

  data.requests.map((req, index) => {
    if (!req.port) {
      error.requests[index].port = "undefined"
      error.haserror = true
    }
    if (!req.host) {
      error.requests[index].host = "undefined"
      error.haserror = true
    }
    if (!req.method) {
      error.requests[index].method = "undefined"
      error.haserror = true
    }
    if (!req.path) {
      error.requests[index].path = "undefined"
      error.haserror = true
    }
  })
  return error
}

app.use(express.json());
app.use(fileupload());

app.get('/', (req, res) => {
  res.status(200).send("Hello client!").end()
})

app.post('/traffictest', (req, res) => {
  totalclientshandeling++;
  try {
    const parsedData = JSON.parse(req.files.media.data)
    if (parsedData.project && parsedData.scenario && parsedData.requests) {
      const invalid = validate(parsedData)
      if (invalid.haserror) {
        totalclientshandeling--;
        res.status(400).json({ error: invalid })
      } else {
        fs.writeFileSync("config.flex", req.files.media.data)
        let worker;
        if (Array.isArray(parsedData.requests))
          worker = new Worker(path.join(__dirname, "./tests/multi-requests.js"))
        else
          worker = new Worker(path.join(__dirname, "./tests/simple-request.js"))

        worker.once("message", async (stats) => {
          totalclientshandeling--;
          res.status(200).json(stats);
        });
        req.on("close", () => {
          totalclientshandeling--;
          worker.terminate()
        })
      }
    } else {
      res.status(400).json({ error: "Invalid file" })
    }
  } catch (error) {
    res.status(500).json({ error: error })
  }

})

app.listen(PORT, () => console.log(`Server running at ${PORT}`))