const { ipcMain } = require("electron")
const { ProjectWriteService, ProjectReadService } = require("../../repository/project.repo")

function addProject(event, args) {
  const data = ProjectWriteService.addProject(args)
  event.sender.send("handel:addProject", data);
}

async function getProjects(event, args) {
  const data = await ProjectReadService.getProjects();
  event.sender.send("handel:getProjects", data);
}

//renderer listners
ipcMain.on("addProject", addProject)
ipcMain.on("getProjects", getProjects)


