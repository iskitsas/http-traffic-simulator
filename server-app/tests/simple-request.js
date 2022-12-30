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

var requestFunc = function () {
    //GENERATE REQUEST FUNCTION
    const stringdata = fs.readFileSync(path.join(__dirname, `../temp/${process.ppid}${process.env.threadId}.flex`));
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
    if (requestConfig.method !== "GET" && requestConfig.method !== "DELETE") {
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
        // console.log("Response: %s", response.statusCode);
    });

    req.on('error', function (err) {
        console.log('error:' + err.message);
    });
}

module.exports = { runTest }
