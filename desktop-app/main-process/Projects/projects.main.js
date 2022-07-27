const { ipcMain, dialog, Notification } = require("electron")
const path = require("path")
const fs = require("fs")
const { ProjectWriteService, ProjectReadService } = require("../../repository/project.repo");
const { getRequests } = require("../Requests/requests.main");
const { getScenarios } = require("../Scenarios/scenarios.main");
const { win } = require("../start");

function addProject(event, args) {
  const data = ProjectWriteService.addProject(args)
  event.sender.send("handle:addProject", data);
}

async function getProject(event, args) {
  const data = await ProjectReadService.getProject(args);
  event.returnValue = data
}

async function getProjects(event, args) {
  const data = await ProjectReadService.getProjects();
  event.returnValue = data
}

async function updateProject(event, args) {
  const data = await ProjectWriteService.updateProject(args);
  event.sender.send("handle:updateProject", data);
}
async function deleteProject(event, args) {
  const data = await ProjectWriteService.deleteProject(args);
  event.returnValue = data
}
async function exportProject(event, args) {
  let events = { returnValue: [] }
  await getProject(events, args);
  const project = events.returnValue[0];
  await getScenarios(events, project._id);
  const scenarios = events.returnValue;
  const requests = [];
  scenarios.map(async (scenario) => {
    let newEvents = { returnValue: [] };
    await getRequests(newEvents, scenario._id)
    requests.push(...newEvents.returnValue);
  })
  dialog.showSaveDialog(win, { title: "Save path", defaultPath: __dirname + `/${project.projectName}.flexbench.flex`, buttonLabel: "Export" }).then((obj) => {
    if (obj.canceled) {
      event.returnValue = {};
    } else {
      try {
        const filepath = obj.filePath
        fs.writeFileSync(filepath, JSON.stringify({ project: project, scenarios: scenarios, requests: requests }, null, 2))
        new Notification({ title: "Exported", body: "Project exported successfully! 😃 " }).show()
        event.returnValue = { message: "success", error: null }
      } catch (error) {
        new Notification({ title: "Error", body: "Something went wrong!" }).show()
        event.returnValue = { message: null, error: error }
      }
    }
  });

}

function importProject(event, args) {
  try {
    dialog.showOpenDialog([win], { filters: { name: "All File", extension: ["flex"] }, properties: ["openFile"] }).then(result => {
      const fileName = result.filePaths[0]
      if (fileName) {
        let stringdata = fs.readFileSync(fileName, { encoding: 'utf8', flag: 'r' })
        event.returnValue = JSON.parse(stringdata)
      } else {
        event.returnValue = {}
      }
    })
  } catch (error) {
    event.returnValue = {}
  }
}

//renderer listners
ipcMain.on("addProject", addProject)
ipcMain.on("getProject", getProject)
ipcMain.on("getProjects", getProjects)
ipcMain.on("updateProject", updateProject)
ipcMain.on("deleteProject", deleteProject)
ipcMain.on("exportProject", exportProject)
ipcMain.on("importProject", importProject)


