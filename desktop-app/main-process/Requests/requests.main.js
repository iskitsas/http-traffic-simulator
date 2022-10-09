const path = require('path')
const { ipcMain } = require("electron")
const { Worker } = require('worker_threads');
const fs = require("fs")
const electron = require("electron")
const userDataPath = electron.app.getPath("userData")
const { RequestWriteService, RequestReadService } = require("../../repository/request.repo");
let workers = [];
async function getRequests(event, args) {
  const data = await RequestReadService.getRequests(args)
  event.returnValue = data
}

function addRequest(event, args) {
  const data = RequestWriteService.addRequest(args)
  event.sender.send("handle:addRequest", data);
}
function updateRequest(event, args) {
  const data = RequestWriteService.updateRequest(args)
  event.sender.send("handle:updateRequest", data);
}
function deleteRequest(event, args) {
  const data = RequestWriteService.deleteRequest(args)
  event.returnValue = data
}

async function runRequest(event, args) {
  try {
    const data = {
      request: args.request,
      scenario: args.scenario
    }
    if (!fs.existsSync(path.join(userDataPath, "Temp"))) {
      fs.mkdirSync(path.join(userDataPath, "Temp"));
    }
    let templatepath;
    let worker_id;

    if (Array.isArray(args.request)) {
      templatepath = '../../tests/multi-requests.js'
      worker_id = args.scenario._id
    }
    else {
      templatepath = '../../tests/simple-request.js'
      worker_id = args.request._id
    }

    let temp_worker = new Worker(path.join(__dirname, templatepath))
    workers.push({ worker: temp_worker, _id: worker_id });

    //writing configuration in seperate file for every new request
    //writing the configuration for workers forked by lib/main -> start()
    //because the workers forked by start() can't access the worker_data if sent from here
    let filename = process.pid + `${temp_worker.threadId}`
    let filepath = path.join(userDataPath, `Temp/${filename}.json`)

    fs.writeFileSync(filepath, JSON.stringify(data), (err) => {
      if (err) {
        throw err;
      }
    });

    //returning result 
    const status = new Promise((resolve, reject) => {
      temp_worker.once("message", async (stats) => {
        deleteTempConfigFile(worker_id)
        popRequest(filepath)
        try {
          const logs = fs.readFileSync(path.join(userDataPath, `Temp/${filename}.txt`))
          stats['logs'] = logs.toString() || ""
          popRequest(path.join(userDataPath, `Temp/${filename}.txt`));
          resolve(stats)
        } catch (error) {
          stats["logs"] = ""
          resolve(stats)
        }
      });
    })
    return status
  } catch (error) {
    resolve({ error: error })
    return error
  }
}

function endRequest(event, reqId) {
  try {
    const worker_ = workers.filter(w => w._id === reqId)
    if (worker_[0].worker)
      worker_[0].worker.terminate();
    deleteTempConfigFile(reqId)
    let filename = process.pid + `${worker_[0].worker.threadId}`
    let filepath = path.join(userDataPath, `Temp/${filename}.json`)
    popRequest(filepath)
  } catch (error) {

  }
}


//renderer listners
ipcMain.on("addRequest", addRequest)
ipcMain.on("getRequests", getRequests)
ipcMain.on("updateRequest", updateRequest)
ipcMain.on("deleteRequest", deleteRequest)
ipcMain.handle("runRequest", runRequest)
ipcMain.on("endRequest", endRequest)

module.exports = { getRequests }


const deleteTempConfigFile = (id) => {
  workers = workers.filter(w => w._id !== id)
}

const popRequest = (filepath) => {
  fs.unlink(filepath, (err) => {
    if (err) {
      console.log(err)
    }
  })
}