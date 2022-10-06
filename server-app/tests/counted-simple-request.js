/**
 * Scenario:
 * Generate requests towards specific domain
 **/
var trafficSimulator = require('flexbench');


function runTest() {
    trafficSimulator.debugMode(true);
    trafficSimulator.numberOfTotalRequestsPerClient(100);
    trafficSimulator.workers(1);
    trafficSimulator.clients(2)
    trafficSimulator.throttleRequests_bps(50000);//-1 for no throttling
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
}

/**
 * Create your generate request function here
 * */
var requestFunc = function () {
    //GENERATE REQUEST FUNCTION
    var headers = {
        "my-dummy-header": '1'
    };
    var options = {};
    options['host'] = 'www.example.com';
    options['port'] = '80';
    options['path'] = '/';
    options['method'] = 'GET';
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

runTest();