const fs = require("fs");
const libpath = process.env.NODE_ENV?.trim() === "dockerDevelopment" ? '../dist/lib/main.js':'../../lib/main.js';
const trafficSimulator = require(libpath);
const log = require("../logger")
const { parentPort } = require("worker_threads")
const path = require("path")

function runTest() {
    const stringdata = fs.readFileSync(path.join(__dirname,"../temp/config.flex"));
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
    const stringdata = fs.readFileSync(path.join(path.join(__dirname,"../temp/config.flex")));
    const parseddata = JSON.parse(stringdata)
    const requestConfig = parseddata.requests

    let headers = {
        "my-dummy-header": '1'
    };
    var options = {};
    options['host'] = requestConfig.host;
    options['port'] = requestConfig.port;
    options['path'] = requestConfig.path;
    options['method'] = requestConfig.method;
    if (requestConfig.method !== "GET"&&requestConfig.method !== "DELETE") {
        options['body'] = JSON.stringify(requestConfig.body);
        headers = {
            'Content-Type': 'application/json'
        }
    }
    if (headers) {
        options['headers'] = headers;
    }
    //you can use the provided request function from HTS, in order 'catch'/count all response codes in a stats object
    var req = trafficSimulator.request(options, function (response) {
        log.info("Response: %s", response.statusCode);
    });

    req.on('error', function (err) {
        console.log('error:' + err.message);
    });
}
runTest()