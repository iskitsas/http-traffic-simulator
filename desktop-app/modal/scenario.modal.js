const Path = require("path")
const fs = require("fs")

class Scenario {
  constructor(projectId, scenarioname, duration, workers, requestperclient, throttling, delay, id) {
    this.projectId = projectId,
      this.scenarioname = scenarioname,
      this.duration = duration,
      this.workers = workers,
      this.requestperclient = requestperclient,
      this.throttling = throttling,
      this.delay = delay,
      this._id = id
  }
}

class Scenarios {
  constructor(args) {
    this.scenario = new Scenario(args.projectId, args.scenarioname, args.duration, args.workers, args.requestperclient, args.throttling, args.delay, args._id)
    this.scenarios = []
    try {
      let stringdata = fs.readFileSync(Path.join(__dirname, "../Data/Scenarios.json"), { encoding: 'utf8', flag: 'r' })
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
    fs.writeFileSync(Path.join(__dirname, "../Data/Scenarios.json"), JSON.stringify(this.scenarios, " "), (err) => {
      if (err) {
        throw err;
      }
    });
    return JSON.stringify(this.scenario)
  }
  static getAll(projectId) {
    let stringdata = fs.readFileSync(Path.join(__dirname, "../Data/Scenarios.json"), { encoding: 'utf8', flag: 'r' })
    let parseddata = JSON.parse(stringdata)
    parseddata = parseddata.filter(data => data.projectId === projectId)
    return parseddata
  }
}


module.exports = { Scenarios }