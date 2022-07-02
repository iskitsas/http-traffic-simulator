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
    let stringdata = fs.readFileSync(Path.join(__dirname, "../Data/Projects.json"), { encoding: 'utf8', flag: 'r' })
    let parseddata = JSON.parse(stringdata)
    let stringObj = JSON.stringify(this.project)
    parseddata.push(JSON.parse(stringObj))
    this.projects = parseddata;
  }

  save() {
    fs.writeFileSync(Path.join(__dirname, "../Data/Projects.json"), JSON.stringify(this.projects," "), (err) => {
      if (err) {
        throw err;
      }
    });
    return JSON.stringify(this.project)
  }
  
  static getAll(){
    let stringdata = fs.readFileSync(Path.join(__dirname, "../Data/Projects.json"), { encoding: 'utf8', flag: 'r' })
    let parseddata = JSON.parse(stringdata)
    return parseddata
  }
}

module.exports = { Projects }