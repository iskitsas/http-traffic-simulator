const Path = require("path")
const fs = require("fs")
const electron = require("electron")
const userDataPath = electron.app.getPath("userData")

class Request {
  constructor(scenarioId, url, protocol, host, method, path, port, requestName, body, header, _id) {
    this.scenarioId = scenarioId,
      this.requestName = requestName,
      this.url = url,
      this.protocol = protocol,
      this.host = host,
      this.method = method,
      this.path = path,
      this.port = port,
      this.body = body,
      this.header = header,
      this._id = _id
  }
}

class Requests {
  constructor(args) {
    this.request = new Request(args.scenarioId, args.url, args.protocol, args.host, args.method, args.path, args.port, args.requestName, args.body || [], args.header || [], args._id)
    this.requests = []
    try {
      let stringdata = fs.readFileSync(Path.join(userDataPath, "Data/Requests.json"), { encoding: 'utf8', flag: 'r' })
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
      fs.writeFileSync(Path.join(userDataPath, "Data/Requests.json"), JSON.stringify(this.requests, null, 2), (err) => {
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
      let stringdata = fs.readFileSync(Path.join(userDataPath, "Data/Requests.json"), { encoding: 'utf8', flag: 'r' })
      let Requests = JSON.parse(stringdata)
      let newRequestsData = Requests.map((data) => {
        if (data._id === updatedData._id) {
          return updatedData
        }
        else
          return data
      })

      fs.writeFileSync(Path.join(userDataPath, "Data/Requests.json"), JSON.stringify(newRequestsData, null, 2), (err) => {
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
      let stringdata = fs.readFileSync(Path.join(userDataPath, "Data/Requests.json"), { encoding: 'utf8', flag: 'r' })
      let Requests = JSON.parse(stringdata)
      let newRequestsData = Requests.filter(data => data[key] !== value)
      fs.writeFileSync(Path.join(userDataPath, "Data/Requests.json"), JSON.stringify(newRequestsData, null, 2), (err) => {
        if (err) {
          throw err;
        }
      });
      return { deletecount: Requests.length - newRequestsData.length };
    } catch (error) {
      if (error.code === 'ENOENT') {
        return { deleteCount: 0, deletedScenarios: [] }
      } else {
        return { error: error }
      }
    }
  }
  static getAll(scenarioId) {
    try {
      let stringdata = fs.readFileSync(Path.join(userDataPath, "Data/Requests.json"), { encoding: 'utf8', flag: 'r' })
      let parseddata = JSON.parse(stringdata)
      parseddata = parseddata.filter(data => data.scenarioId === scenarioId)
      return parseddata
    } catch (error) {
      return []
    }
  }
}


module.exports = { Requests }