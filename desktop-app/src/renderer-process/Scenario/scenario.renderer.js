const { deleteRequest } = require("../Request/request.renderer")

module.exports = {
  addScenario: (scenarioConfig, projectId) => new Promise((resolve, reject) => {
    global.ipcRenderer.send("addScenario", { ...scenarioConfig, projectId })
    global.ipcRenderer.on("handle:addScenario", (event, savedData) => {
      resolve(savedData)
    })
  }),
  getScenarios: (projectId) => new Promise((resolve, reject) => {
    const response = global.ipcRenderer.sendSync("getScenarios", projectId)
    if (Array.isArray(response))
      resolve(response);
    else
      reject("Something went wrong!")
  }),
  updateScenario: (newdata) => new Promise((resolve, reject) => {
    global.ipcRenderer.send("updateScenario", newdata)
    global.ipcRenderer.on("handle:updateScenario", (event, savedData) => {
      resolve(savedData)
    })
  }),
  deleteScenario: (key, value) => new Promise((resolve, reject) => {
    global.ipcRenderer.send("deleteScenario", { key: key, value: value })
    global.ipcRenderer.on("handle:deleteScenario", (event, deletedData) => {
      if (deletedData.deleteCount) {
        deleteRequest("scenarioId", value).then((count) => {
          resolve(deletedData)
        })
      }
      else if (deletedData.error) {
        reject(deletedData.error)
      }
    })
  })
}