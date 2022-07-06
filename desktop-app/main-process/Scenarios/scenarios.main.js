const { ipcMain } = require("electron")
const { ScenarioWriteService, ScenarioReadService } = require("../../repository/scenario.repo")

function addScenario(event, args) {
  const data = ScenarioWriteService.addScenario(args)
  event.sender.send("handel:addScenario", data);
}
async function getScenarios(event, args) {
  const data = await ScenarioReadService.getScenarios(args)
  event.sender.send("handel:getScenarios", data);
}

async function deleteScenario(event, args) {
  const data = await ScenarioWriteService.deleteScenario(args);
  event.sender.send("handel:deleteProject", data);
}
//renderer listners
ipcMain.on("addScenario", addScenario)
ipcMain.on("getScenarios", getScenarios)

ipcMain.on("deleteScenario", deleteScenario)