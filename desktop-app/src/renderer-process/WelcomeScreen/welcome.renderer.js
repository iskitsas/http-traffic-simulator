module.exports = {
  addProject: (name, description) => new Promise((resolve, reject) => {
    const newProject = {
      name: name,
      description: description
    }
    global.ipcRenderer.send("addProject", newProject)
    global.ipcRenderer.on("handel:addProject", (event, savedData) => {
      resolve(savedData)
    })
  }),
  addScenario: (configs) => new Promise((resolve, reject) => {
    global.ipcRenderer.send("addScenario", configs)
    global.ipcRenderer.on("handel:addScenario", (event, savedData) => {
      resolve(savedData)
    })
  }),
  addRequest: (configs) => new Promise((resolve, reject) => {
    global.ipcRenderer.send("addRequest", configs)
    global.ipcRenderer.on("handel:addRequest", (event, savedData) => {
      resolve(savedData)
    })
  }),

}