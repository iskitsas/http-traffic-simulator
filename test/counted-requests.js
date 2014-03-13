var assert = require("assert"),
    should = require('should'),
    trafficSimulator = require('../lib/main.js');

var countResponses=0;

describe('TrafficSimulator-singleRequest', function () {
    describe('#start()', function () {

        it('should create some requests', function (done) {
            this.timeout(4000);

            trafficSimulator.debugMode(false);
            trafficSimulator.numberOfTotalRequestsPerClient(5);
            trafficSimulator.workers(1);
            trafficSimulator.clients(1)
            trafficSimulator.throttleRequests_bps(-1);//-1 for no throttling
            trafficSimulator.delayBetweenRequests(0.1);

            trafficSimulator.start(function (stats) {
                done();
            }, function () {
                var options = {};
                options['host'] = 'www.example.com';
                options['port'] = '80';
                options['path'] = '/';
                options['method'] = 'GET';

                var req = trafficSimulator.request(options, function (response) {
                    should.exist(response);
                    countResponses++
                });
            });
        })
    })
})

