const { deleteRequest } = require("../Request/request.renderer")

module.exports = {
  addScenario: (scenarioConfig, projectId = "") => new Promise((resolve, reject) => {
    global.ipcRenderer.send("addScenario", { scenarioConfig, projectId })
    global.ipcRenderer.on("handle:addScenario", (event, savedData) => {
      resolve(savedData)
    })
  }),
  getScenarios: (projectId) => new Promise((resolve, reject) => {
    const response = global.ipcRenderer.sendSync("getScenarios", projectId)
    if (Array.isArray(response))
      resolve(response);
    resolve([])
  }),
  updateScenario: (newdata) => new Promise((resolve, reject) => {
    global.ipcRenderer.send("updateScenario", newdata)
    global.ipcRenderer.on("handle:updateScenario", (event, savedData) => {
      resolve(savedData)
    })
  }),
  deleteScenario: (key, value) => new Promise((resolve, reject) => {
    const response = global.ipcRenderer.sendSync("deleteScenario", { key: key, value: value })
    if (response.deleteCount) {
      response.deletedScenarios.map((scenario) => {
        deleteRequest("scenarioId", scenario._id).then(() => {
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    }
    else if (response.error) {
      reject(response.error)
    }
    resolve(0)
  })
}