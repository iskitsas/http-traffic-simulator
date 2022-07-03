const Path = require("path")
const fs = require("fs")
class Project {
  constructor(name, description, id) {
    this.projectName = name,
      this.description = description,
      this._id = id
  }
}

class Projects {
  constructor(args) {
    this.project = new Project(args.name, args.description, args._id)
    this.projects = []
    try {
      let stringdata = fs.readFileSync(Path.join(__dirname, "../Data/Projects.json"), { encoding: 'utf8', flag: 'r' })
      let parseddata = JSON.parse(stringdata)
      let stringObj = JSON.stringify(this.project)
      parseddata.push(JSON.parse(stringObj))
      this.projects = parseddata;
    } catch (error) {
      let stringObj = JSON.stringify(this.project)
      this.projects.push(JSON.parse(stringObj))
    }
  }

  save() {
    fs.writeFileSync(Path.join(__dirname, "../Data/Projects.json"), JSON.stringify(this.projects, " "), (err) => {
      if (err) {
        throw err;
      }
    });
    const stringProject = JSON.stringify(this.project)
    return JSON.parse(stringProject)
  }

  static getAll() {
    let stringdata = fs.readFileSync(Path.join(__dirname, "../Data/Projects.json"), { encoding: 'utf8', flag: 'r' })
    let parseddata = JSON.parse(stringdata)
    return parseddata
  }
  static update(_id, updatedData) {
    let stringdata = fs.readFileSync(Path.join(__dirname, "../Data/Projects.json"), { encoding: 'utf8', flag: 'r' })
    let projects = JSON.parse(stringdata)
    let toUpdateIndex;
    let newProjectsData = projects.map((data, index) => {
      if (data._id === _id) {
        toUpdateIndex = index
        data.projectName = updatedData.name
        data.description = updatedData.description
      }
      return data
    })

    fs.writeFileSync(Path.join(__dirname, "../Data/Projects.json"), JSON.stringify(newProjectsData, " "), (err) => {
      if (err) {
        throw err;
      }
    });

    return newProjectsData[toUpdateIndex];
  }
}

module.exports = { Projects }