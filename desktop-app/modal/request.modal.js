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
    this.request = new Request(args.scenarioId, args.host, args.method, args.path, args.port, args.requestname, args._id)
    this.requests = []
    try {
      let stringdata = fs.readFileSync(Path.join(__dirname, "../Data/Requests.json"), { encoding: 'utf8', flag: 'r' })
      let parseddata = JSON.parse(stringdata)
      let stringObj = JSON.stringify(this.request)
      parseddata.push(JSON.parse(stringObj))
      this.requests = parseddata;
    } catch (error) {
      let stringObj = JSON.stringify(this.request)
      this.requests.push(JSON.parse(stringObj))
    }
  }

  save() {
    try {
      fs.writeFileSync(Path.join(__dirname, "../Data/Requests.json"), JSON.stringify(this.requests, " "), (err) => {
        if (err) {
          throw err;
        }
      });
      return JSON.stringify(this.request)
    } catch (error) {
      return JSON.stringify(error)
    }
  }
  static update(updatedData) {
    try {
      let stringdata = fs.readFileSync(Path.join(__dirname, "../Data/Requests.json"), { encoding: 'utf8', flag: 'r' })
      let Requests = JSON.parse(stringdata)
      let newRequestsData = Requests.map((data) => {
        if (data._id === updatedData._id){
          return updatedData
        }
        else
          return data
      })

      fs.writeFileSync(Path.join(__dirname, "../Data/Requests.json"), JSON.stringify(newRequestsData, null, 2), (err) => {
        if (err) {
          throw err;
        }
      });
      return updatedData;
    } catch (error) {
      console.log(error)
    }
  }
  static getAll(scenarioId){
    try {
      let stringdata = fs.readFileSync(Path.join(__dirname, "../Data/Requests.json"), { encoding: 'utf8', flag: 'r' })
      let parseddata = JSON.parse(stringdata)
      parseddata = parseddata.filter(data=>data.scenarioId===scenarioId)
      return parseddata
    } catch (error) {
      return []
    }
  }
}


module.exports = { Requests }