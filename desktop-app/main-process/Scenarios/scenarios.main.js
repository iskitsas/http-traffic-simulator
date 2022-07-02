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

//renderer listners
ipcMain.on("getScenarios", getScenarios)
ipcMain.on("addScenario", addScenario)


