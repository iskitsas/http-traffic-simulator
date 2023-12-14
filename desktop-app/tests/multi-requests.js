const packagePath = process.env.NODE_ENV?.trim() === "development" ? "../../lib/main" : "../lib/main"
const trafficSimulator = require(packagePath);
const { parentPort, threadId } = require("worker_threads")
const path = require("path")
const fs = require("fs");
const { APP_NAME } = require("../Constants/constants");
const appdatapath = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support/' : process.env.HOME + "/.config/")

function runTest() {
  let filename;
  if (process.env.threadId)
    filename = process.ppid + `${process.env.threadId}`
  else
    filename = process.pid + `${threadId}`

  const stringdata = fs.readFileSync(path.join(appdatapath, `${APP_NAME}/Temp/${filename}.json`));
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
  const stringdata = fs.readFileSync(path.join(appdatapath, `${APP_NAME}/Temp/${process.ppid}${process.env.threadId}.json`));
  const parseddata = JSON.parse(stringdata)
  const requestConfigs = parseddata.request

  let requestOptions = {};
  requestConfigs.map((config, index) => {
    let bodydata = null
    let headers = {}
    if (config.header) {
      let headerss = {}
      config.header.map((head, index) => {
        if (head.key !== "" && head.key !== null)
          headerss[head.key] = head.value
      })
      headers = headerss;
    }
    if (config.method !== "GET" && Array.isArray(config.body)) {
      bodydata = {}
      config.body?.map(data => {
        if (data.type === "FILE") {
          const fdata = fs.readFileSync(data.value)
          bodydata[data.key] = fdata
        } else
          bodydata[data.key] = data.value
      })
      headers['Content-Type'] = 'application/json'
      bodydata = JSON.stringify(bodydata);
    }
    Object.assign(requestOptions, {
      [index + 1]: {
        options: {
          host: config.host,
          port: config.port,
          path: config.path,
          body: bodydata,
          method: config.method,
          headers: headers
        }
      }
    });
  })
  let req_header;
  let req_payload;
  var req = trafficSimulator.multiRequest(requestOptions, 'random', function (response) {
    let chunks = "";
    response.on('data', function (chunk) {
      chunks += chunk
    });
    response.on("end", () => {
      let data = { log: chunks.toString(), status: response.statusCode }
      fs.appendFileSync(path.join(appdatapath, `${APP_NAME}/Temp/${process.ppid}${process.env.threadId}.txt`),
        JSON.stringify(data) + "<=res=>")
    })
  });
  req.on('error', function (err) {
    console.log('error:' + err.message);
  });
}

runTest();