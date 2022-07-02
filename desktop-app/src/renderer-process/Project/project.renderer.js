module.exports = {
  getProjects: () => new Promise((resolve, reject) => {
    global.ipcRenderer.send("getProjects", {})
    global.ipcRenderer.on("handel:getProjects", (event, fetchedData) => {
      resolve(fetchedData)
    })
  }),
  addProject: (name, description) => new Promise((resolve, reject) => {
    const newProject = {
      name: name,
      description: description
    }
    global.ipcRenderer.send("addProject", newProject)
    global.ipcRenderer.on("handel:addProject", (event, savedData) => {
      resolve(savedData)
    })
  })
}