const path = require('path')
const { ipcMain } = require("electron")
const { Worker } = require('worker_threads');
const fs = require("fs")
const electron = require("electron")
const userDataPath = electron.app.getPath("userData")
const { RequestWriteService, RequestReadService } = require("../../repository/request.repo");
let worker;
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
    fs.writeFileSync(path.join(userDataPath, "Temp/configs.json"), JSON.stringify(data), (err) => {
      if (err) {
        throw err;
      }
    });
    const templatepath = Array.isArray(args.request) ? '../../tests/multi-requests.js' : '../../tests/simple-request.js'
    worker = new Worker(path.join(__dirname, templatepath));
    const status = new Promise((resolve, reject) => {
      worker.once("message", async (stats) => {
        resolve(stats)
      });
    })
    return status
  } catch (error) {
    return error
  }
}

async function endRequest() {
  if (worker)
    worker.terminate();
}


//renderer listners
ipcMain.on("addRequest", addRequest)
ipcMain.on("getRequests", getRequests)
ipcMain.on("updateRequest", updateRequest)
ipcMain.on("deleteRequest", deleteRequest)
ipcMain.handle("runRequest", runRequest)
ipcMain.handle("endRequest", endRequest)

module.exports = { getRequests }

