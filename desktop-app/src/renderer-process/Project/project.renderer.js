const { deleteScenario } = require("../Scenario/scenario.renderer")

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
  }),
  updateProject: (name, description, _id) => new Promise((resolve, reject) => {
    const updatedProject = {
      name: name,
      description: description,
      _id: _id
    }
    global.ipcRenderer.send("updateProject", updatedProject)
    global.ipcRenderer.on("handel:updateProject", (event, savedData) => {
      resolve(savedData)
    })
  }),
  deleteProject: (projectId) => new Promise((resolve, reject) => {
    global.ipcRenderer.send("deleteProject", projectId)
    global.ipcRenderer.on("handel:deleteProject", async(event, deletedData) => {
      if (deletedData.message){
        const res = await deleteScenario("projectId",projectId)
      }
      else{
        reject(deletedData.error)
      }
    })
  })
}