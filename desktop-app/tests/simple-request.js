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

var requestFunc = function () {
    //GENERATE REQUEST FUNCTION
    const stringdata = fs.readFileSync(path.join(appdatapath, `${APP_NAME}/Temp/${process.ppid}${process.env.threadId}.json`));
    const parseddata = JSON.parse(stringdata)
    const requestConfig = parseddata.request

    let headers = {
        "my-dummy-header": '1'
    };
    var options = {};
    options['host'] = requestConfig.host;
    options['port'] = requestConfig.port;
    options['path'] = requestConfig.path;
    options['method'] = requestConfig.method;
    if (requestConfig.header) {
        let headerss = {}
        requestConfig.header.map((head, index) => {
            if (head.key !== "" && head.key !== null)
                headerss[head.key] = head.value
        })
        headers = headerss;
    }
    let bodydata = {}
    if (requestConfig.method !== "GET" && Array.isArray(requestConfig.body)) {
        requestConfig.body?.map(data => {
            if (data.type === "FILE") {
                const fdata = fs.readFileSync(data.value)
                bodydata[data.key] = fdata
            } else
                bodydata[data.key] = data.value
        })
        headers['Content-Type'] = 'application/json'
        options['body'] = JSON.stringify(bodydata);
    }
    if (headers) {
        options['headers'] = headers;
    }
    //you can use the provided request function from HTS, in order 'catch'/count all response codes in a stats object
    var req = trafficSimulator.request(options, function (response) {
        // console.log("Response: %s", response.statusCode);
        response.setEncoding('utf8');
        let chunks;
        response.on('data', function (chunk) {
            chunks += chunk
            // console.log(chunk.length)
        });
        response.on("end", () => {
            let data = { log: chunks.toString(), status: response.statusCode, headers: headers, payload: bodydata }
            fs.appendFileSync(path.join(appdatapath, `${APP_NAME}/Temp/${process.ppid}${process.env.threadId}.txt`),
                JSON.stringify(data) + "<=res=>")
        })
    });

    req.on('error', function (err) {
        console.log('error:' + err.message);
    });
}
runTest()