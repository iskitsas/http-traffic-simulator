var http = require('http'),
    fs = require('fs'),
    util = require('util'),
    exec = require('child_process').exec,
    KeepAliveAgent = require('agentkeepalive'),
    config = require('./config.js');


var keepAliveAgent = new KeepAliveAgent({
    maxSockets: 2000
});

var consoleDebug = config.params.debugMode;

var argvCnt = 2;
function args(value) {
    var ret = process.argv[argvCnt] ? process.argv[argvCnt] : value;
    if (isNumber(value)) {
        if (isInteger(value)) {
            ret = parseInt(ret);
        } else if (isFloat(value)) {
            ret = parseFloat(ret);
        } else if (isBoolean(value)) {
            ret = ret == 'true' ? true : false;
        }
    }
    argvCnt++;
    return ret;
}

function isInteger(n) {
    return ((typeof n === 'number') && (n % 1 === 0));
}

function isFloat(n) {
    return ((typeof n === 'number') && (n % 1 !== 0));
}

function isNumber(n) {
    return (typeof n === 'number');
}

function isBoolean(n) {
    return (typeof n === 'boolean');
}
function forEachObject(arr, i, delay, cb, finishCb) {
    var objectId = arr[i];
    cb(i, objectId);

    if (i < arr.length) {
        setTimeout(function () {
            forEachObject(arr, i + 1, delay, cb, finishCb)
        }, delay);
    } else {
        //finish
        finishCb(i);
    }
}

var consola = {
    detailed: function (out) {
        toPrintOrNot(2, out);
    },
    basic: function (out) {
        toPrintOrNot(1, out);
    },
    minimal: function (out) {
        toPrintOrNot(0, out);
    },
    error: function (out) {
        toPrintOrNot(999, out);
    }
}



var debugLevel = config.params.debugModeLevel;
var shouldDebug = config.params.debugMode && config.params.debugModeLevel >= 0;

function toPrintOrNot(level, out) {
    if ((debugLevel >= level || level == 999) && shouldDebug) {
        console.log(out);
    }
}

exports.consola = consola;
exports.args = args;
exports.debugLevel = function (value) { debugLevel = value };
exports.shouldDebug = function (value) { shouldDebug = value };
exports.keepAliveAgent = keepAliveAgent;
exports.consoleDebug = function (value) { consoleDebug = value };
