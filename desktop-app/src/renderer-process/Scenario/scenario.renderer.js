const { deleteRequest } = require("../Request/request.renderer")

module.exports = {
  addScenario: (scenarioConfig, projectId) => new Promise((resolve, reject) => {
    global.ipcRenderer.send("addScenario", { ...scenarioConfig, projectId })
    global.ipcRenderer.on("handel:addScenario", (event, savedData) => {
      resolve(savedData)
    })
  }),
  getScenarios: (projectId) => new Promise((resolve, reject) => {
    global.ipcRenderer.send("getScenarios", projectId)
    global.ipcRenderer.on("handel:getScenarios", (event, fetchedData) => {
      resolve(fetchedData)
    })
  }),
  deleteScenario: (key, value) => new Promise((resolve, reject) => {
    global.ipcRenderer.send("deleteScenario", { key: key, value: value })
    global.ipcRenderer.on("handel:deleteScenario", (event, deletedData) => {//not able to get scenario id which are deleted here
      if (deletedData.message) {
        deleteRequest("scenarioId",)
      }
      else {
        reject(deletedData.error)
      }
    })
  })
}