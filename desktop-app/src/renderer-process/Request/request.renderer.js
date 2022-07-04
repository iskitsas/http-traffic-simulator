module.exports={
  addRequest: (configs) => new Promise((resolve, reject) => {
    console.log(configs)
    global.ipcRenderer.send("addRequest", configs);
    global.ipcRenderer.on("handel:addRequest", (event, savedData) => {
      resolve(savedData)
    })
  }),
  getRequests:(scenarioId)=>new Promise((resolve,reject)=>{
    global.ipcRenderer.send("getRequests", scenarioId);
    global.ipcRenderer.on("handel:getRequests", (event, fetchedData) => {
      resolve(fetchedData)
    })
  }),
  runRequest:(config)=>new Promise((resolve,reject)=>{
    global.ipcRenderer.send("runRequest",config);
    global.ipcRenderer.on("handel:runRequest", (event, response) => {
      resolve(response)
    })
  })
}

