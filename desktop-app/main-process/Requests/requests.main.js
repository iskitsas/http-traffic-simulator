const path = require('path')
const { ipcMain } = require("electron")
const { Worker } = require('worker_threads');
const fs = require("fs")
const { RequestWriteService, RequestReadService } = require("../../repository/request.repo");

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

function runRequest(event, args) {
  const data = {
    request: args.request,
    scenario: args.scenario
  }
  if (!fs.existsSync(path.join(__dirname, "../../Temp"))) {
    fs.mkdirSync(path.join(__dirname, "../../Temp"));
  }
  fs.writeFileSync(path.join(__dirname, "../../Temp/configs.json"), JSON.stringify(data), (err) => {
    if (err) {
      throw err;
    }
  });
  const templatepath = Array.isArray(args.request) ? '../../tests/multi-requests.js' : '../../tests/simple-request.js'
  const worker = new Worker(path.join(__dirname, templatepath));
  worker.once("message", stats => {
    event.sender.send("handle:runRequest", stats);
  });
}

//renderer listners
ipcMain.on("addRequest", addRequest)
ipcMain.on("getRequests", getRequests)
ipcMain.on("updateRequest", updateRequest)
ipcMain.on("deleteRequest", deleteRequest)
ipcMain.on("runRequest", runRequest)

module.exports = { getRequests }

