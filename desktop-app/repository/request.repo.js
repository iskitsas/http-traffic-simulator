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
        const newRequest = new Requests({ ...request, scenarioId: args.scenarioId })
        const res = newRequest.save()
        responses.push(JSON.parse(res))
      })
      return responses
    } else {
      const _id = uuid.v4()
      const newRequest = new Requests({ ...args.requests, _id: _id, scenarioId: args.scenarioId })
      const res = newRequest.save()
      return JSON.parse(res)
    }
  }
  static updateRequest(args) {
    const res = Requests.update(args)
    return res
  }
  static deleteRequest(args) {
    const res = Requests.delete(args.key, args.value)
    return res
  }
}

module.exports = { RequestWriteService, RequestReadService }