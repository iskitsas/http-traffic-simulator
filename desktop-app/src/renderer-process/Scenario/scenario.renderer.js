module.exports={
  addScenario: (configs) => new Promise((resolve, reject) => {
    global.ipcRenderer.send("addScenario", configs)
    global.ipcRenderer.on("handel:addScenario", (event, savedData) => {
      resolve(savedData)
    })
  }),
  getScenarios:(projectId)=>new Promise((resolve,reject)=>{
    global.ipcRenderer.send("getScenarios", projectId)
    global.ipcRenderer.on("handel:getScenarios", (event, fetchedData) => {
      resolve(fetchedData)
    })
  })
}