const uuid = require("uuid")
const { Scenarios } = require("../model/scenario.model");

class ScenarioReadService {
  static async getScenarios(projectId) {
    const scenarios = await Scenarios.getAll(projectId)
    return scenarios
  }

}
class ScenarioWriteService {
  static addScenario(args) {
    if (Array.isArray(args.scenarioConfig)) {
      let responses = []
      args.scenarioConfig.map(config => {
        if (!config._id) {
          const _id = uuid.v4()
          config._id = _id
        }
        const newScenario = new Scenarios({ ...config })
        const res = newScenario.save()
        responses.push(JSON.parse(res))
      })
      return responses
    } else {
      if (!args._id) {
        const _id = uuid.v4()
        args._id = _id
      }
      const newScenario = new Scenarios({ ...args.scenarioConfig, ...args })
      const res = newScenario.save()
      return JSON.parse(res)
    }
  }
  static updateScenario(args) {
    const res = Scenarios.update(args)
    return res
  }
  static async deleteScenario(args) {
    const res = await Scenarios.delete(args.key, args.value)
    return res
  }

}

module.exports = { ScenarioWriteService, ScenarioReadService }