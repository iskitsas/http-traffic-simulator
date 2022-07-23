const uuid = require("uuid")
const { Projects } = require("../model/project.model");

class ProjectReadService {
  static async getProject(args) {
    const project = await Projects.findById(args)
    return project;
  }
  static async getProjects(args) {
    const projects = await Projects.getAll()
    return projects;
  }
}

class ProjectWriteService {
  static addProject(args) {
    if (!args._id) {
      const _id = uuid.v4()
      args._id = _id
    }
    const newProject = new Projects(args)
    const res = newProject.save()
    return res
  }
  static updateProject(args) {
    const res = Projects.update(args._id, { name: args.name, description: args.description })
    return res
  }
  static async deleteProject(args) {
    const res = await Projects.delete(args)
    return res
  }
}

module.exports = { ProjectWriteService, ProjectReadService }