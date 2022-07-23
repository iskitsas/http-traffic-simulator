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

var requestFunc = function () {
    //GENERATE REQUEST FUNCTION
    const stringdata=fs.readFileSync(path.join(appdatapath, "flexbench_electron/Temp/configs.json"));
    const parseddata = JSON.parse(stringdata)
    const requestConfig = parseddata.request

    var headers = {
        "my-dummy-header": '1'
    };
    var options = {};
    options['host'] = requestConfig.host;
    options['port'] = requestConfig.port;
    options['path'] = requestConfig.path;
    options['method'] = requestConfig.method;
    if (headers) {
        options['headers'] = headers;
    }
    //you can use the provided request function from HTS, in order 'catch'/count all response codes in a stats object
    var req = trafficSimulator.request(options, function (response) {
        console.log("Response: %s", response.statusCode);
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log(chunk.length)
        });
    });

    req.on('error', function (err) {
        console.log('error:' + err.message);
    });
}
runTest()