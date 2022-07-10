const { ipcMain } = require("electron")
const { ProjectWriteService, ProjectReadService } = require("../../repository/project.repo");
const { RequestWriteService } = require("../../repository/request.repo");
const { ScenarioWriteService } = require("../../repository/scenario.repo");
const { deleteScenario } = require("../Scenarios/scenarios.main");

function addProject(event, args) {
  const data = ProjectWriteService.addProject(args)
  event.sender.send("handle:addProject", data);
}

async function getProjects(event, args) {
  const data = await ProjectReadService.getProjects();
  event.sender.send("handle:getProjects", data);
}

async function updateProject(event, args) {
  const data = await ProjectWriteService.updateProject(args);
  event.sender.send("handle:updateProject", data);
}
async function deleteProject(event, args) {
  const data = await ProjectWriteService.deleteProject(args);
  event.sender.send("handle:deleteProject", data);
}

//renderer listners
ipcMain.on("addProject", addProject)
ipcMain.on("getProjects", getProjects)
ipcMain.on("updateProject", updateProject)
ipcMain.on("deleteProject", deleteProject)


