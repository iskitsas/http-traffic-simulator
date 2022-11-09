module.exports = {
  addRequest: (configs) => new Promise((resolve, reject) => {
    global.ipcRenderer.send("addRequest", configs);
    global.ipcRenderer.on("handle:addRequest", (event, savedData) => {
      resolve(savedData)
    })
  }),
  getRequests: (scenarioId) => new Promise((resolve, reject) => {
    const response = global.ipcRenderer.sendSync("getRequests", scenarioId)
    if (Array.isArray(response))
      resolve(response);
    resolve([])
  }),
  updateRequest: (newData) => new Promise((resolve, reject) => {
    global.ipcRenderer.send("updateRequest", newData);
    global.ipcRenderer.on("handle:updateRequest", (event, savedData) => {
      resolve(savedData)
    })
  }),
  deleteRequest: (key, value) => new Promise((resolve, reject) => {
    const response = global.ipcRenderer.sendSync("deleteRequest", { key: key, value: value })
    if (response.deleteCount) {
      resolve(response.deleteCount)
    } else if (response.error) {
      reject(response.error)
    } else {
      resolve(0);
    }
  }),
  runRequest: (config) => new Promise((resolve, reject) => {
    const response = global.ipcRenderer.invoke("runRequest", config)
    resolve(response);
  }),
  endRequest: (reqId) => {
    global.ipcRenderer.send("endRequest",reqId)
    return
  }
}

