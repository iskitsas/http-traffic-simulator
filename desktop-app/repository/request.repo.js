const uuid = require("uuid")
const { Requests } = require("../modal/request.modal");

class RequestReadService {
  static async getRequests(scenarioId) {
    try {
      const requests = await Requests.getAll(scenarioId)
      return requests
    } catch (error) {
      return []
    }
  }
}
class RequestWriteService {
  static addRequest(args) {
    if (Array.isArray(args.requests)) {
      let responses = []
      args.requests.map(request => {
        const _id = uuid.v4()
        request._id = _id
        const newScenario = new Requests({ ...request, scenarioId: args.scenarioId })
        const res = newScenario.save()
        responses.push(JSON.parse(res))
      })
      return responses
    } else {
      const _id = uuid.v4()
      args._id = _id
      const newScenario = new Requests({ ...args.requests, scenarioId: args.scenarioId })
      const res = newScenario.save()
      return JSON.parse(res)
    }
  }
}

module.exports = { RequestWriteService, RequestReadService }