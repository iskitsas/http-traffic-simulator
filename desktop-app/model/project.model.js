const Path = require("path")
const fs = require("fs")
const electron = require("electron")
const userDataPath = electron.app.getPath("userData")

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
      let stringdata = fs.readFileSync(Path.join(userDataPath, "Data/Projects.json"), { encoding: 'utf8', flag: 'r' })
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
    try {
      if (!fs.existsSync(Path.join(userDataPath, "Data"))) {
        fs.mkdirSync(Path.join(userDataPath, "Data"));
      }
      fs.writeFileSync(Path.join(userDataPath, "Data/Projects.json"), JSON.stringify(this.projects, null, 2), (err) => {
        if (err) {
          throw err;
        }
      });
      const stringProject = JSON.stringify(this.project)
      return JSON.parse(stringProject)
    } catch (error) {
      return {}
    }
  }

  static findById(pId) {
    try {
      let stringdata = fs.readFileSync(Path.join(userDataPath, "Data/Projects.json"), { encoding: 'utf8', flag: 'r' })
      let parseddata = JSON.parse(stringdata)
      return parseddata.filter(project => project._id === pId);
    } catch (error) {
      return {}
    }
  }

  static getAll() {
    try {
      let stringdata = fs.readFileSync(Path.join(userDataPath, "Data/Projects.json"), { encoding: 'utf8', flag: 'r' })
      let parseddata = JSON.parse(stringdata)
      return parseddata
    } catch (error) {
      return []
    }
  }

  static update(_id, updatedData) {
    try {
      let stringdata = fs.readFileSync(Path.join(userDataPath, "Data/Projects.json"), { encoding: 'utf8', flag: 'r' })
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
      fs.writeFileSync(Path.join(userDataPath, "Data/Projects.json"), JSON.stringify(newProjectsData, null, 2), (err) => {
        if (err) {
          throw err;
        }
      });
      return newProjectsData[toUpdateIndex];
    } catch (error) {
      return {}
    }
  }

  static delete(_id) {
    try {
      let stringdata = fs.readFileSync(Path.join(userDataPath, "Data/Projects.json"), { encoding: 'utf8', flag: 'r' })
      let projects = JSON.parse(stringdata)
      let newProjectsData = projects.filter(project => project._id !== _id)
      fs.writeFileSync(Path.join(userDataPath, "Data/Projects.json"), JSON.stringify(newProjectsData, null, 2), (err) => {
        if (err) {
          throw err;
        }
      });
      return { deleteCount: projects.length - newProjectsData.length };
    } catch (error) {
      if (error.code === 'ENOENT') {
        return { deleteCount: 0, deletedScenarios: [] }
      } else {
        return { error: error }
      }
    }
  }
}

module.exports = { Projects }