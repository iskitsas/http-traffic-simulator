const path = require('path')
const { ipcMain } = require("electron")
const { Worker } = require('worker_threads');
const fs = require("fs")
const { RequestWriteService, RequestReadService } = require("../../repository/request.repo");

async function getRequests(event, args) {
  const data = await RequestReadService.getRequests(args)
  event.sender.send("handel:getRequests", data);
}

function addRequest(event, args) {
  const data = RequestWriteService.addRequest(args)
  event.sender.send("handel:addRequest", data);
}

function runRequest(event, args) {
  const data = {
    request: args.request,
    scenario: args.scenario
  }
  fs.writeFileSync(path.join(__dirname, "../../Temp/configs.json"), JSON.stringify(data), (err) => {
    if (err) {
      throw err;
    }
  });
  const worker = new Worker(path.join(__dirname, '../../tests/simple-request.js'));
  worker.once("message", stats => {
    event.sender.send("handel:runRequest", stats);
  });
}

//renderer listners
ipcMain.on("getRequests", getRequests)
ipcMain.on("addRequest", addRequest)
ipcMain.on("runRequest", runRequest)


