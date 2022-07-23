const packagePath = process.env.NODE_ENV?.trim() === "development" ? "../../lib/main" : "../lib/main"
const trafficSimulator = require(packagePath);
const { parentPort } = require("worker_threads")
const path = require("path")
const fs = require("fs");
const { APP_NAME } = require("../Constants/constants");
const appdatapath = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")

function runTest() {
  const stringdata=fs.readFileSync(path.join(appdatapath, `${APP_NAME}/Temp/configs.json`));
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
  const stringdata=fs.readFileSync(path.join(appdatapath, "flexbench_electron/Temp/configs.json"));
  const parseddata = JSON.parse(stringdata)
  const requestConfigs = parseddata.request

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
            "my-dummy-header": '1'
          }
        }
      }
    });
  })

  var req = trafficSimulator.multiRequest(requestOptions, 'random', function (response) {
    console.log("Response: %s", response.statusCode);
  });

  req.on('error', function (err) {
    console.log('error:' + err.message);
  });
}

runTest();