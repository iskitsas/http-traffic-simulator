const fs = require("fs");
const libpath = process.env.NODE_ENV.trim() === "dockerDevelopment" ? '../dist/lib/main.js':'../../lib/main.js';
const trafficSimulator = require(libpath);
const log = require("../logger")
const { parentPort } = require("worker_threads")
const path = require("path")

function runTest() {
  const stringdata = fs.readFileSync(path.join(__dirname, "../temp/config.flex"));
  const parseddata = JSON.parse(stringdata)
  const scenario = parseddata.scenario

  trafficSimulator.debugMode(true);
  trafficSimulator.testDuration(scenario.duration);//-1 for infinite run
  trafficSimulator.workers(scenario.workers);
  trafficSimulator.clients(scenario.totalclients)
  trafficSimulator.throttleRequests_bps(parseInt(scenario.throttling));//-1 for no throttling
  trafficSimulator.randomDelayBetweenRequests(scenario.delay);
  trafficSimulator.setFunc('request', requestFunc);

  trafficSimulator.start();

  trafficSimulator.events.on('end', function (stats) {
    parentPort.postMessage(stats)
    process.exit();
  })

  //stop test after specific period or condition\
  setTimeout(function () {
    trafficSimulator.stop();
  }, 20 * 1000);

}

/**
 * Create your generate request function here
 * */
var requestFunc = function () {
  //GENERATE REQUEST FUNCTION
  //use random or roundrobbin ['random' | 'rr']
  const stringdata = fs.readFileSync(path.join(__dirname, "../temp/config.flex"));
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
    log.info("Response: %s", response.statusCode)
  });

  req.on('error', function (err) {
    console.log('error:' + err.message);
  });
}

runTest();