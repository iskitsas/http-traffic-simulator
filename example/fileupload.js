/**
 * Scenario:
 * Generate requests towards specific domain
 **/
var trafficSimulator = require('flexbench');
var fs = require('fs')

function runTest() {
    trafficSimulator.debugMode(true);
    trafficSimulator.testDuration(5);//-1 for infinite run
    trafficSimulator.workers(1);
    trafficSimulator.clients(1)
    trafficSimulator.throttleRequests_bps(-1);//-1 for no throttling
    trafficSimulator.randomDelayBetweenRequests('0.5-1.1');
    trafficSimulator.setFunc('request', requestFunc);

    trafficSimulator.start();

    trafficSimulator.events.on('end', function (stats) {
        //This function will run on exit/stop, when worker has received a message to offload his stats to his master
        //Get from stats object all exposed metrics
        console.log('Traffic Simulator Results');
        console.log('-------------------------');

        var cArr = Object.keys(stats.counters);

        for (var i = 0; i < cArr.length; i++) {
            var key = cArr[i];
            console.log('counter %s: %s ', key, stats.counters[key]);
        }
        console.log("Exiting..");
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
    const fileData = fs.readFileSync(__dirname + "/" + 'simple-request.js');//taking simple-request.js as a example
    var headers = {
        'Content-Type': 'application/json'
    };
    var options = {};
    options['host'] = 'www.example.com';
    options['port'] = '80';
    options['path'] = '/';
    options['method'] = 'POST';
    options['body'] = JSON.stringify(fileData);
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
    req.end();
}

runTest();