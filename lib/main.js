var http = require('http'),
    url = require('url'),
    util = require('util'),
    cluster = require('cluster'),
    numCPUs = require('os').cpus().length,
    events = require('events'),
    exec = require('child_process').exec,
    gh = require('./lib-helper.js'),
    proxy = require('./ThrottleProxy/throttleServer.js'),
    config = require('./config.js');



/**
 * In order to make this test scale, you should optimize how your OS
 * handles networking. Start reading from this url:
 * https://engineering.gosquared.com/optimising-nginx-node-js-and-networking-for-heavy-workloads
 * and pay attention on 'Tuning the network'
 *
 * Keep track of your socket stats:
 *
 * netstat -tan | awk '{print $6}' | sort | uniq -c
 * or
 * ss -s
 *
 * You could also run with some flags and perhaps run global.gc() if you now what are you doing
 * node --nouse-idle-notification --expose-gc traffic_simulator.js
 * */

/**
 * Properties section
 * */

var localProxyHost=config.params.localProxyHost,
    localProxyStartPort=config.params.localProxyStartPort;

var debugMode=config.params.debugMode;

//Command Line Arguments
var cliRun=gh.args('example: $ node traffic_simulator.js start');
var workers=gh.args(2);//numCPUs;
var clients=gh.args(1);
var numberOfTotalRequestsPerClient=gh.args(null);//-1 for infinitive
var maxSockets=gh.args(10000);

var testDuration=gh.args(null)//-1 for infinite run, sec otherwise, eg 120 for 2 minutes test
var delayBetweenRequests=gh.args(2.9);//-1 for no delay [sec]
var randomDelayBetweenRequests=-1;
var throttleRequests_bps=gh.args(-1);//bytes per seconds, if -1 => no throttling | 50000bps=400kbps
var isPipelinedRequest=true;

var countWorkerRequests=0;
var countObj={};
var timers=[];
var minDelay;//ms
var maxDelay;//ms
var isRandomDelay=false;
/**
 * END of Properties section
 * *************************
 * */

/**
 * User Callback functions
 * */
var requestFunc_cb;
var cleanUpOnExit_cb;
var sendWorkerStats_cb;
var workerBackOffPolicy_cb;
var countersStopCondition_cb;
var events = new events.EventEmitter();

var EVENT={
    end:'end',
    error:'error'
}

function incrCounter(id){
    if(countObj[id]!=null){
        countObj[id]++;
    }else{
        countObj[id]=1;
    }
}

function isThrottled(){
    return throttleRequests_bps!=-1;
}

var receivedStopSignal=false;
function clearAllWorkerTimers(){
    if(timers){
        var len=timers.length;
        for(var i=0;i<len;i++){
            clearInterval(timers[i]);
        }
    }
}


function getDelay(){
    var ret=delayBetweenRequests;
    if(isRandomDelay){
        ret=parseFloat((Math.floor((Math.random()*(maxDelay-minDelay))+minDelay)/1000).toFixed(1));
    }
    return ret;
}


// Go through all workers
function eachWorker(callback) {
    if (cluster.isMaster) {
        for (var id in cluster.workers) {
            callback(cluster.workers[id]);
        }
    }
}

/**
 * Asynchronous stop of execution
 * */
function stop(){
    if(cluster.isMaster){
        //send stop message to all workers
        eachWorker(function(worker) {
            gh.consola.basic(util.format('Master sending stop signal to Worker[%s]',worker.id));
            worker.send({ stopExecution: 'true' });//Master asks workers to stop execution
        });
    }
}

function start() {

    //basic configuration error handling
    var err;
    if(workers == null){
        err='Workers value is not set. Valid values are [1+,]. eg. trafficSimulator.workers(1);';
    }else if(clients == null){
        err='Clients value is not set. Valid values are [1+,]. eg. trafficSimulator.workers(1);'
    }else if(testDuration==null && numberOfTotalRequestsPerClient==null){
        err='At least test duration or number of total requests should be set.';
    }

    if(err){
        events.emit(EVENT.error,err);
        throw err;
    }

    if(randomDelayBetweenRequests && randomDelayBetweenRequests!='-1' && randomDelayBetweenRequests.indexOf('-')!==-1){
        var p=randomDelayBetweenRequests.split('-');
        minDelay=parseInt(p[0])*1000;
        maxDelay=parseInt(p[1])*1000;
        isRandomDelay=true;
    }
    http.globalAgent.maxSockets=maxSockets;
    var clientsPerWorker=parseInt((clients/workers).toFixed());
    var startTime=new Date().getTime()/1000;//sec
    var numberOfTotalRequestsPerWorker=numberOfTotalRequestsPerClient>0?numberOfTotalRequestsPerClient*clientsPerWorker:-1;

    if (cluster.isMaster) {
        var workerMessages={};

        for (var i = 1; i <= workers; i++) {
            var worker = cluster.fork(); //spawn child processes!
            if(isThrottled()){
                gh.consola.minimal("Trottle-Proxy Worker "+i);
                proxy(throttleRequests_bps,throttleRequests_bps).listen(localProxyStartPort+i);//start proxy server for throttling
            }
            attachWorkerHandler(worker,i,workerMessages);
        }

        function attachWorkerHandler(w, i, wm) {
            //handle worker messages
            w.on('message', function (msg) {
                wm[i] = msg;
            });
        }

        function aggregateAllCounters(wm){
            var stats={
                counters:{}
            }

            var objArr=Object.keys(wm);
            var len=Object.keys(wm).length;

            for(var i=0;i<len;i++){
                var key= objArr[i];

                var cArr=Object.keys(wm[key].out.report);
                for(var j=0;j<cArr.length;j++){
                    var ckey=cArr[j];

                    if(!stats.counters[ckey]){
                        stats.counters[ckey]=0;
                    }
                    stats.counters[ckey]+=wm[key].out.report[ckey];
                }

                if(cleanUpOnExit_cb){
                    stats=cleanUpOnExit_cb(wm[key],stats);
                }
            }
            return stats;
        }

        //callback after receiving messages from all workers
        var intId = setInterval(function () {
            if (Object.keys(workerMessages).length == workers) {
                events.emit(EVENT.end, aggregateAllCounters(workerMessages))
                clearInterval(intId);
                //process.exit();
            }
        }, 500);

    } else {//WORKER
        var id = cluster.worker.id;
        var base = clientsPerWorker * (id - 1);
        var endBase = clientsPerWorker * id;

        process.on('message', function (msg) {
            if (msg.stopExecution) {
                gh.consola.basic(util.format('Worker[%s] received stop signal', id));
                receivedStopSignal = true;
            }
        });

        //check for test duration
        setInterval(function(){
            var thisTime=new Date().getTime()/1000;//sec
            var secondsPassed=thisTime-startTime;
            if( (testDuration>0 && secondsPassed>testDuration) ||
                (numberOfTotalRequestsPerWorker>0 && countWorkerRequests>=numberOfTotalRequestsPerWorker) ||
                receivedStopSignal ){

                if(numberOfTotalRequestsPerWorker>0){
                    //wait until all requests have responded
                    var passedSec=0;
                    setInterval(function(){
                        passedSec++;
                        if(receivedStopSignal){
                            gh.consola.minimal(util.format('[Worker%s] Test stopped by user. Time elapsed: %s sec. Total worker requests: %s. %s' +
                                'Shutting down..',id,secondsPassed.toFixed(), countWorkerRequests,printResponseCodeReport()));
                            sendWorkersStats(id,sendWorkerStats_cb);
                            process.exit();
                        }else{
                            if(countersStopCondition_cb!=null){
                                if(countersStopCondition_cb(countObj)){
                                    gh.consola.minimal(util.format('[Worker%s] Test completed successfully. Time elapsed: %s sec. Total worker requests: %s. %s' +
                                        'Shutting down..',id,secondsPassed.toFixed(), countWorkerRequests,printResponseCodeReport()));
                                    sendWorkersStats(id,sendWorkerStats_cb);
                                    process.exit();
                                }else if(passedSec>30){
                                    //if more than 30 sec have passed after completing the requests, and not all responses have been aligned, give up the test
                                    gh.consola.minimal(util.format('[Worker%s] Test completed abnormally. Check counted requests. Time elapsed: %s sec. Total worker requests: %s. %s' +
                                        'Forcing Shutdown..',id,secondsPassed.toFixed(), countWorkerRequests,printResponseCodeReport()));
                                    sendWorkersStats(id,sendWorkerStats_cb);
                                    process.exit();
                                }
                            }else{
                                sendWorkersStats(id,sendWorkerStats_cb);
                                process.exit();
                            }
                        }
                    },1000);
                }else{
                    //exit immediately when time is over. Some requests will drop
                    //normalizing exit
                    clearAllWorkerTimers();
                    var passedSec=0;
                    setInterval(function(){
                        passedSec++;

                        if(receivedStopSignal){
                            gh.consola.minimal(util.format('[Worker%s] Test stopped by user. Time elapsed: %s sec. Total worker requests: %s. %s' +
                                'Shutting down..',id,secondsPassed.toFixed(), countWorkerRequests,printResponseCodeReport()));
                            sendWorkersStats(id,sendWorkerStats_cb);
                            process.exit();
                        }else{
                            if(countersStopCondition_cb!=null){
                                if(countersStopCondition_cb(countObj)){
                                    gh.consola.minimal(util.format('[Worker%s] Test completed successfully. Time elapsed: %s sec. Total worker requests: %s. %s' +
                                        'Shutting down..',id,secondsPassed.toFixed(), countWorkerRequests,printResponseCodeReport()));
                                    sendWorkersStats(id,sendWorkerStats_cb);
                                    process.exit();
                                }else if(passedSec>30){
                                    //if more than 30 sec have passed after completing the requests, and not all responses have been aligned, give up the test
                                    gh.consola.minimal(util.format('[Worker%s] Test completed abnormally. Check counted requests. Time elapsed: %s sec. Total worker requests: %s. %s' +
                                        'Forcing Shutdown..',id,secondsPassed.toFixed(), countWorkerRequests,printResponseCodeReport()));
                                    sendWorkersStats(id,sendWorkerStats_cb);
                                    process.exit();
                                }
                            } else{
                                sendWorkersStats(id,sendWorkerStats_cb);
                                process.exit();
                            }
                        }
                    },1000);
                }
            }
        },1000);

        if(workerBackOffPolicy_cb){
            workerBackOffPolicy_cb(id);
        }

        if(delayBetweenRequests==-1){
            delayBetweenRequests=0.05;//add 50ms delay if no delay between requests is selected
        }

        /**
         * CREATE CLIENTS TO GENERATE REQUESTS
         * */
        var objectId;
        for(var i=base; i<endBase;i++){
            if (numberOfTotalRequestsPerClient > 0) {
                createCountedRequests(0,function(){
                    if(requestFunc_cb){
                        requestFunc_cb();
                    }
                });
            } else {
                if(!isPipelinedRequest){//CLIENT WILL GENERATE REQUESTS WITH (RANDOM*) DELAYS WITHOUT WAITING FOR THE RESPONSE
                    timers[i]=
                        setInterval(function () {
                            countWorkerRequests++;
                            if(requestFunc_cb){
                                requestFunc_cb();
                            }
                        }, 1000 * getDelay());
                }else{ //CLIENT WILL GENERATE NEXT REQUEST AFTER GETTING THE RESPONSE OF THE PREVIOUS REQUEST. HE WILL ALSO ADD A (RANDOM*) DELAY
                    createPipelinedRequest(function(){
                        countWorkerRequests++;
                        if(requestFunc_cb){
                            requestFunc_cb();
                        }
                    });
                }
            }
        }
    }
}

function sendWorkersStats(workerId,sendWorkerStatsCallback){
    var msg={
        out:{
            worker:workerId,
            report:{}
        }
    };

    //callback to pass stored/tracked objects
    if(sendWorkerStatsCallback){
        msg=sendWorkerStatsCallback(msg);
    }
    msg.out.report=countObj;
    process.send(msg);
}

function createCountedRequests(thisClientRequests,cb){
    thisClientRequests++;
    if (thisClientRequests > numberOfTotalRequestsPerClient) {
        //stop condition
    }else{
        countWorkerRequests++;
        setTimeout(function(){
            if(cb){
                cb();
            }
            createCountedRequests(thisClientRequests,cb);
        }, 1000 * getDelay());
    }
}

function createPipelinedRequest(cb){
    setTimeout(function(){
        cb();
        createPipelinedRequest(cb)
    },1000*getDelay());
}

/**
 * General function to create a request. Extends standard http.request, enhanced by throttling feature.
 * @param options Options for the request function
 * @param cb  Callback to handle response
 * */
function request(options,cb){
    var _options={};
    if(isThrottled()){
        var host=options.host;
        var port=options.port;
        var path=options.path;
        var method=options.method;
        var proxyPort=localProxyStartPort+cluster.worker.id;
        _options.host=localProxyHost;
        _options.port=proxyPort;
        if(options.headers !=null){
            _options.headers=options.headers;
        }else{
            _options.headers={};
        }
        _options.headers['host']=host;
        _options.headers['port']=port;
        _options.headers['path']=path;
        _options.headers['method']=method;
    }else{
        _options=options;
    }
    _options['agent']=gh.keepAliveAgent;

    var req = http.request(_options, function (response) {
        response.on('end', function () {
            incrCounter(response.statusCode);
        });

        if(cb){
            cb(response);
        }
        response.resume();
    });

    req.end();
    return req;
}

var multiReqPointer;
/**
 * @param requestOptions
 * @param mode ['rr'|'random']
 * rr: roundRobbin
 * random: normalized distribution
 * @param cb Callback
 * */
function multiRequest(requestOptions,mode,cb){
    var _mode=mode!=null?mode:'random'
    var arr=Object.keys(requestOptions);
    var len=arr.length;
    var req;
    if(_mode=='rr'){
        var pointer=0;
        if(multiReqPointer!=null){
            pointer=multiReqPointer;
        }
        var key=arr[pointer];
        console.log(key)
        var options=requestOptions[key].options;

        req=request(options,cb);
        multiReqPointer=getNextPointer(pointer,len);
    }else {
        var randomReqKey=getRandomItem(arr);

        var options=requestOptions[randomReqKey].options;
        req=request(options,cb);
    }
    return req;
}

function getNextPointer(curr,len){
    var ret=0;
    if(curr==(len-1)){
        ret=0;
    }else if(curr<len){
        ret=curr+1;
    }
    return ret;
}

function getRandomItem(arr){
    var value;
    var len=arr.length;
    if(len>0){
        var i=Math.floor((Math.random()*len)+0);
        value=arr[i];
    }
    return value;
}

function printResponseCodeReport(){
    var out="";
    var cArr=Object.keys(countObj);
    for(var i=0; i<cArr.length;i++){
        var key=cArr[i];
        out+= (out!=""?', \n':'')+key+': '+countObj[key];
    }
    return "\nResponses\n" +
              "---------\n"+out+"\n";
}

function createUniqueHash(value){
    var workerId=cluster.worker.id;
    var dateStamp=new Date().getTime()/1000;//sec
    return value+'_'+workerId+'_'+dateStamp;
}

if(cliRun=='start'){
    start(function(){});
}

var FUNC={
    request:'request',
    cleanup:'cleanup',
    sendWorkerStats:'sendWorkerStats',
    workerBackOffPolicy:'workerBackOffPolicy',
    countersStopCondition:'countersStopCondition'
}
/**
 * Set user functions on handles
 * */
function setHandler(handle,cb){
    if(handle==FUNC.request){
        requestFunc_cb=cb;
    }else if(handle==FUNC.cleanup){
        cleanUpOnExit_cb=cb;
    }else if(handle==FUNC.sendWorkerStats){
        sendWorkerStats_cb=cb;
    }else if(handle==FUNC.workerBackOffPolicy){
        workerBackOffPolicy_cb=cb;
    }else if(handle==FUNC.countersStopCondition){
        countersStopCondition_cb=cb;
    }
}

exports.start=start;
exports.stop = stop;
exports.events = events;
exports.EVENT = EVENT;
exports.FUNC = FUNC;
exports.debugMode = function(value){debugMode=value};
exports.cliRun = function(value){cliRun=value};
exports.workers = function(value){workers=value};
exports.clients = function(value){clients=value};
exports.numberOfTotalRequestsPerClient = function(value){numberOfTotalRequestsPerClient=value};
exports.maxSockets = function(value){maxSockets=value};
exports.testDuration = function(value){testDuration=value};
exports.delayBetweenRequests = function(value){delayBetweenRequests=value};
exports.randomDelayBetweenRequests = function(value){randomDelayBetweenRequests=value};
exports.throttleRequests_bps = function(value){throttleRequests_bps=value};
exports.isPipelinedRequest = function(value){isPipelinedRequest=value};
exports.debugMode = function(value){debugMode=value; gh.consoleDebug(value); gh.shouldDebug(value)};
exports.request=request;
exports.multiRequest=multiRequest;
exports.isThrottled=isThrottled;
exports.incrCounter=incrCounter;
exports.setFunc=setHandler;
exports.requestFunc=function(cb){requestFunc_cb=cb;}
exports.cleanUpOnExitFunc=function(cb){cleanUpOnExit_cb=cb;}
exports.sendWorkerStatsFunc=function(cb){sendWorkerStats_cb=cb;}
exports.workerBackOffPolicyFunc=function(cb){workerBackOffPolicy_cb=cb;}
exports.countersStopConditionFunc=function(cb){countersStopCondition_cb=cb;}



