var MINIMAL= 0,
    BASIC = 1,
    DETAILED = 2,
    DISABLED = -1;
var params = {
    appServerHost: '127.0.0.1',
    appServerPort: '80',
    nginxServerHost: '127.0.0.1',
    nginxServerPort: '8080',
    localProxyHost: '127.0.0.1',//used for throttling
    localProxyStartPort: 3127,
    cbHost: '127.0.0.1',
    cbVideoCachePort: '11222',
    cbStatsPort: '11223',
    debugMode:false,
    debugModeLevel:MINIMAL,//MINIMAL:0, BASIC:1, DETAILED:2
    maxSockets:2000
}

function setParam(param,value){
    params[param]=value;
}

exports.setParam = setParam;
exports.params = params;