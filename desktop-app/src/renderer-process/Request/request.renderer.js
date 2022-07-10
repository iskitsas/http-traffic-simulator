module.exports={
  addRequest: (configs) => new Promise((resolve, reject) => {
    global.ipcRenderer.send("addRequest", configs);
    global.ipcRenderer.on("handle:addRequest", (event, savedData) => {
      resolve(savedData)
    })
  }),
  getRequests:(scenarioId)=>new Promise((resolve,reject)=>{
    resolve(global.ipcRenderer.sendSync("getRequests", scenarioId));
  }),
  updateRequest:(newData)=>new Promise((resolve,reject)=>{
    global.ipcRenderer.send("updateRequest", newData);
    global.ipcRenderer.on("handle:updateRequest", (event, savedData) => {
      resolve(savedData)
    })
  }),
  deleteRequest: (key, value) => new Promise((resolve, reject) => {
    global.ipcRenderer.send("deleteRequest", { key: key, value: value })
    global.ipcRenderer.on("handle:deleteRequest", (event, deletedData) => {
      if (deletedData.message) {
        resolve(deletedData)
      }
      else {
        reject(deletedData.error)
      }
    })
  }),
  runRequest:(config)=>new Promise((resolve,reject)=>{
    global.ipcRenderer.send("runRequest",config);
    global.ipcRenderer.on("handle:runRequest", (event, response) => {
      resolve(response)
    })
  })
}

