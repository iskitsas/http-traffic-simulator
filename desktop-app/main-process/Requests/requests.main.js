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
    // Log the function call and its arguments
    console.log('runRequest called with args:', args);

    const data = {
      request: args.request,
      scenario: args.scenario
    };

    // Log the temp directory path
    const tempDir = path.join(userDataPath, "Temp");
    console.log('Temp directory:', tempDir);

    // Check and create the temp directory if it doesn't exist
    if (!fs.existsSync(tempDir)) {
      console.log('Creating Temp directory');
      fs.mkdirSync(tempDir);
    }

    let templatepath;
    let worker_id;

    // Determine the template path and worker ID
    if (Array.isArray(args.request)) {
      templatepath = '../../tests/multi-requests.js';
      worker_id = args.scenario._id;
    } else {
      templatepath = '../../tests/simple-request.js';
      worker_id = args.request._id;
    }
    console.log('Template path:', templatepath);

    // Initialize the worker
    let temp_worker = new Worker(path.join(__dirname, templatepath));
    workers.push({ worker: temp_worker, _id: worker_id });

    // Log the filepath for the request configuration
    let filename = process.pid + `${temp_worker.threadId}`;
    let filepath = path.join(tempDir, `${filename}.json`);
    console.log('Filepath for request config:', filepath);

    // Write the request configuration to a file
    fs.writeFileSync(filepath, JSON.stringify(data), (err) => {
      if (err) {
        console.error('Error writing request config file:', err);
        throw err;
      }
    });

    // Return the result using a Promise
    const status = new Promise((resolve, reject) => {
      temp_worker.once("message", async (stats) => {
        console.log('Worker message received:', stats);

        deleteTempConfigFile(worker_id);
        popRequest(filepath);

        try {
          const logsPath = path.join(tempDir, `${filename}.txt`);
          const logs = fs.readFileSync(logsPath);
          stats['logs'] = logs.toString() || "";
          popRequest(logsPath);
        } catch (error) {
          console.error('Error reading logs:', error);
          stats["logs"] = "";
        }

        resolve(stats);
      });

      // Log worker errors
      temp_worker.on('error', (error) => {
        console.error('Worker error:', error);
        reject(error);
      });
    });

    return status;
  } catch (error) {
    console.error('Error in runRequest:', error);
    return { error: error.message };
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