const Path = require("path")
const fs = require("fs")
const electron = require("electron")
const userDataPath = electron.app.getPath("userData")

class Scenario {
  constructor(projectId, scenarioname, duration, workers, totalclients, throttling, delay, id) {
    this.projectId = projectId,
      this.scenarioname = scenarioname,
      this.duration = duration,
      this.workers = workers,
      this.totalclients = totalclients,
      this.throttling = throttling,
      this.delay = delay,
      this._id = id
  }
}

class Scenarios {
  constructor(args) {
    this.scenario = new Scenario(args.projectId, args.scenarioname, args.duration, args.workers, args.totalclients, args.throttling, args.delay, args._id)
    this.scenarios = []
    try {
      let stringdata = fs.readFileSync(Path.join(userDataPath, "Data/Scenarios.json"), { encoding: 'utf8', flag: 'r' })
      let parseddata = JSON.parse(stringdata)
      let stringObj = JSON.stringify(this.scenario)
      parseddata.push(JSON.parse(stringObj))
      this.scenarios = parseddata;
    } catch (error) {
      let stringObj = JSON.stringify(this.scenario)
      this.scenarios.push(JSON.parse(stringObj))
    }
  }

  save() {
    try {
      fs.writeFileSync(Path.join(userDataPath, "Data/Scenarios.json"), JSON.stringify(this.scenarios, null, 2), (err) => {
        if (err) {
          throw err;
        }
      });
      return JSON.stringify(this.scenario)
    } catch (error) {
      return ({})
    }
  }
  static getAll(projectId) {
    try {
      let stringdata = fs.readFileSync(Path.join(userDataPath, "Data/Scenarios.json"), { encoding: 'utf8', flag: 'r' })
      let parseddata = JSON.parse(stringdata)
      parseddata = parseddata.filter(data => data.projectId === projectId)
      return parseddata
    } catch (error) {
      return []
    }
  }
  static update(updatedData) {
    try {
      let stringdata = fs.readFileSync(Path.join(userDataPath, "Data/Scenarios.json"), { encoding: 'utf8', flag: 'r' })
      let Scenarios = JSON.parse(stringdata)
      let newScenariosData = Scenarios.map((data) => {
        if (data._id === updatedData._id) {
          return updatedData
        }
        else
          return data
      })

      fs.writeFileSync(Path.join(userDataPath, "Data/Scenarios.json"), JSON.stringify(newScenariosData, null, 2), (err) => {
        if (err) {
          throw err;
        }
      });
      return updatedData;
    } catch (error) {
      return {}
    }
  }
  static delete(key, value) {
    try {
      let stringdata = fs.readFileSync(Path.join(userDataPath, "Data/Scenarios.json"), { encoding: 'utf8', flag: 'r' })
      let scenarios = JSON.parse(stringdata)
      let todelete = [];
      let topersist = [];
      scenarios.map((scenario) => {
        if (scenario[key] !== value)
          topersist.push(scenario);
        else
          todelete.push(scenario);
      })
      fs.writeFileSync(Path.join(userDataPath, "Data/Scenarios.json"), JSON.stringify(topersist, null, 2), (err) => {
        if (err) {
          throw err;
        }
      });
      return { deleteCount: scenarios.length - topersist.length, deletedScenarios: todelete };
    } catch (error) {
      if (error.code === 'ENOENT') {
        return { deleteCount: 0, deletedScenarios: [] }
      } else {
        return { error: error }
      }
    }
  }
}


module.exports = { Scenarios }