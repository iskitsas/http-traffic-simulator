const { deleteRequest } = require("../Request/request.renderer")

module.exports = {
  addScenario: (scenarioConfig, projectId) => new Promise((resolve, reject) => {
    global.ipcRenderer.send("addScenario", { ...scenarioConfig, projectId })
    global.ipcRenderer.on("handle:addScenario", (event, savedData) => {
      resolve(savedData)
    })
  }),
  getScenarios: (projectId) => new Promise((resolve, reject) => {
    global.ipcRenderer.send("getScenarios", projectId)
    global.ipcRenderer.on("handle:getScenarios", (event, fetchedData) => {
      resolve(fetchedData)
    })
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
        deleteRequest("scenarioId", value).then((count)=>{
          resolve(deletedData)
        })
      }
      else if (deletedData.error) {
        reject(deletedData.error)
      }
    })
  })
}