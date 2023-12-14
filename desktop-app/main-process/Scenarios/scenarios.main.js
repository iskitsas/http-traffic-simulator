const { ipcMain } = require("electron")
const { ScenarioWriteService, ScenarioReadService } = require("../../repository/scenario.repo")

function addScenario(event, args) {
  const data = ScenarioWriteService.addScenario(args)
  event.sender.send("handle:addScenario", data);
}
async function getScenarios(event, args) {
  const data = await ScenarioReadService.getScenarios(args)
  event.returnValue = data
}

async function updateScenario(event, args) {
  const data = await ScenarioWriteService.updateScenario(args)
  event.sender.send("handle:updateScenario", data);
}

async function deleteScenario(event, args) {
  const data = await ScenarioWriteService.deleteScenario(args);
  event.returnValue = data
}
//renderer listners
ipcMain.on("addScenario", addScenario)
ipcMain.on("getScenarios", getScenarios)
ipcMain.on("updateScenario", updateScenario)
ipcMain.on("deleteScenario", deleteScenario)

module.exports = { getScenarios }