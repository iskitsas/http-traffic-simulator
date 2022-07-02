const Path = require("path")
const fs = require("fs")

class Request {
  constructor(scenarioId, host, method, path, port, requestname, _id) {
    this.scenarioId = scenarioId,
      this.requestName = requestname,
      this.host = host,
      this.method = method,
      this.path = path,
      this.port = port,
      this._id = _id
  }
}

class Requests {
  constructor(args) {
    this.scenario = new Request(args.scenarioId, args.host, args.method, args.path, args.port, args.requestname, args._id)
    let stringdata = fs.readFileSync(Path.join(__dirname, "../Data/Requests.json"), { encoding: 'utf8', flag: 'r' })
    let parseddata = JSON.parse(stringdata)
    let stringObj = JSON.stringify(this.scenario)
    parseddata.push(JSON.parse(stringObj))
    this.scenarios = parseddata;
  }

  save() {
    fs.writeFileSync(Path.join(__dirname, "../Data/Requests.json"), JSON.stringify(this.scenarios, " "), (err) => {
      if (err) {
        throw err;
      }
    });
    return JSON.stringify(this.scenario)
  }
  static getAll(scenarioId){
    let stringdata = fs.readFileSync(Path.join(__dirname, "../Data/Requests.json"), { encoding: 'utf8', flag: 'r' })
    let parseddata = JSON.parse(stringdata)
    parseddata = parseddata.filter(data=>data.scenarioId===scenarioId)
    return parseddata
  }
}


module.exports = { Requests }