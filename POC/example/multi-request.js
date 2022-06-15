/**
 * Scenario:
 * Generate requests towards specific domain
 **/
var trafficSimulator = require('flexbench');


function runTest() {
    trafficSimulator.debugMode(true);
    trafficSimulator.testDuration(5);//-1 for infinite run
    trafficSimulator.workers(1);
    trafficSimulator.clients(2)
    trafficSimulator.throttleRequests_bps(50000);//-1 for no throttling
    trafficSimulator.randomDelayBetweenRequests('0.5-1.1');
    trafficSimulator.setFunc('request', requestFunc);

    trafficSimulator.start();

    trafficSimulator.events.on('end', function (msg) {
        //This function will run on exit/stop, when worker has received a message to offload his stats to his master
        //Get from msg object all exposed metrics
        console.log('\nTraffic Simulator Results');
        console.log('-------------------------');

        var cArr = Object.keys(msg.counters);
        for (var i = 0; i < cArr.length; i++) {
            var key = cArr[i];
            console.log('counter %s: %s ', key, msg.counters[key]);
        }
        console.log("Exiting..");
        process.exit();
    });

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
    var req = trafficSimulator.multiRequest(requestOptions, 'random', function (response) {
        console.log("Response: %s", response.statusCode);
        //response.setEncoding('utf8');
        //response.on('data',function(chunk){
        //    console.log(chunk.length)
        //});
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