module.exports = {
  addRequest: (configs) => new Promise((resolve, reject) => {
    console.log("add request")
    global.ipcRenderer.send("addRequest", configs);
    global.ipcRenderer.on("handle:addRequest", (event, savedData) => {
      resolve(savedData)
    })
  }),
  getRequests: (scenarioId) => new Promise((resolve, reject) => {
    console.log("get request")
    const response = global.ipcRenderer.sendSync("getRequests", scenarioId)
    if (Array.isArray(response))
      resolve(response);
    resolve([])
  }),
  updateRequest: (newData) => new Promise((resolve, reject) => {
    console.log("update request")
    global.ipcRenderer.send("updateRequest", newData);
    global.ipcRenderer.on("handle:updateRequest", (event, savedData) => {
      resolve(savedData)
    })
  }),
  deleteRequest: (key, value) => new Promise((resolve, reject) => {
    console.log("delete request")
    const response = global.ipcRenderer.sendSync("deleteRequest", { key: key, value: value })
    if (response.deleteCount) {
      resolve(response.deleteCount)
    } else if (response.error) {
      console.log(response.error, "in error of request")
      reject(response.error)
    } else {
      resolve(0);
    }
  }),
  runRequest: (config) => new Promise((resolve, reject) => {
    const response = global.ipcRenderer.invoke("runRequest", config)
    console.log(response)
    resolve(response);
  })
}

