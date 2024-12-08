const fs = require("fs");
const libpath = '../lib/main.js';
const trafficSimulator = require(libpath);
const { parentPort, threadId } = require("worker_threads")
const path = require("path")

function runTest() {
  let filename;
  if (process.env.threadId)
    filename = process.ppid + `${process.env.threadId}`
  else
    filename = process.pid + `${threadId}`
  const stringdata = fs.readFileSync(path.join(__dirname, `../temp/${filename}.flex`));
  const parseddata = JSON.parse(stringdata)
  const scenario = parseddata.scenario

  trafficSimulator.debugMode(true);
  trafficSimulator.testDuration(scenario.duration);//-1 for infinite run
  trafficSimulator.workers(scenario.workers);
  trafficSimulator.clients(scenario.totalclients)
  trafficSimulator.throttleRequests_bps(parseInt(scenario.throttling));//-1 for no throttling
  trafficSimulator.randomDelayBetweenRequests(scenario.delay);
  trafficSimulator.setFunc('request', requestFunc);

  trafficSimulator.start(threadId);

  trafficSimulator.events.on('end', function (stats) {
    parentPort.postMessage(stats)
  })
}

/**
 * Create your generate request function here
 * */
var requestFunc = function () {
  //GENERATE REQUEST FUNCTION
  //use random or roundrobbin ['random' | 'rr']
  const stringdata = fs.readFileSync(path.join(__dirname, `../temp/${process.ppid}${process.env.threadId}.flex`));
  const parseddata = JSON.parse(stringdata)
  const requestConfigs = parseddata.requests

  let requestOptions = {};
  requestConfigs.map((config, index) => {
    Object.assign(requestOptions, {
      [index + 1]: {
        options: {
          host: config.host,
          port: config.port,
          path: config.path,
          method: config.method,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      }
    });
    if (config.method !== "GET" && config.method !== "DELETE") {
      requestOptions[index + 1].options.body = JSON.stringify(config.body)
    }
  })
  var req = trafficSimulator.multiRequest(requestOptions, 'random', function (response) {
    // console.log(`Response: ${response.statusCode}`)
  });

  req.on('error', function (err) {
    console.log('error:' + err.message);
  });
}

module.exports = {runTest}
