const packagePath = process.env.NODE_ENV.trim() === "development" ? "../../lib/main" : "../lib/main"
const trafficSimulator = require(packagePath);
const { parentPort } = require("worker_threads")
const path = require("path")
const fs = require("fs")

function runTest() {
  const stringdata = fs.readFileSync(path.join(__dirname, "../Temp/configs.json"));
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
  const stringdata = fs.readFileSync(path.join(__dirname, "../Temp/configs.json"));
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

  console.log(requestOptions)

  var req = trafficSimulator.multiRequest(requestOptions, 'random', function (response) {
    console.log("Response: %s", response.statusCode);
  });

  req.on('error', function (err) {
    console.log('error:' + err.message);
  });
}



var requestOptions = {
  '1': {
    options: {
      host: 'www.example.com',
      port: '80',
      path: '/',
      method: 'GET',
      headers: {
        "my-dummy-header": '1'
      }
    }
  },
  '2': {
    options: {
      host: 'www.example.com',
      port: '80',
      path: '/dummy',
      method: 'GET',
      headers: {
        "my-dummy-header": '1'
      }
    }
  },
  '3': {
    options: {
      host: 'www.example.com',
      port: '80',
      path: '/dummy',
      method: 'GET',
      headers: {
        "my-dummy-header": '1'
      }
    }
  },
  '4': {
    options: {
      host: 'www.in.gr',
      port: '80',
      path: '/',
      method: 'GET',
      headers: {
        "my-dummy-header": '1'
      }
    }
  },
  '5': {
    options: {
      host: 'www.mobistuff.net',
      port: '80',
      path: '/',
      method: 'GET',
      headers: {
        "my-dummy-header": '1'
      }
    }
  }
}


runTest();