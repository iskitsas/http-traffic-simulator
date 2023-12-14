var Throttle = require('throttle');
var http = require('http');
var https = require('https');
var url = require('url');

function processWildcards(match) {
    var patternString = match
        // Escape existing RegEx characters
        .replace(/\\/g, '\\\\')
        .replace(/\//g, '\\/')
        .replace(/\^/g, '\\^')
        .replace(/\$/g, '\\$')
        .replace(/\+/g, '\\+')
        .replace(/\./g, '\\.')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/\=/g, '\\=')
        .replace(/\!/g, '\\!')
        .replace(/\|/g, '\\|')
        .replace(/\{/g, '\\{')
        .replace(/\}/g, '\\}')
        .replace(/\,/g, '\\,')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]')
        .replace(/\-/g, '\\-')
        // Convert wildcard chars to RegEx sequences
        .replace(/\?/g, '.')
        .replace(/\*/g, '.*');
    return new RegExp('^' + patternString + '$');
}

/**
 * Incoming connection handler
 * @param {http.IncomingMessage} request
 * @param {http.ServerResponse} response
 * @param {Throttle} throttle for incoming data
 * @param {Throttle} outgoing for outgoing data
 * @param {Function} matcher callback for filtering request through throttle
 */
function connectionHandler(request, response, throttle, outgoing, matcher) {

    var options = url.parse(request.url);
    options.method = request.method;
    options.headers = request.headers;

    if (request.headers.host)
        options.host = request.headers.host;
    if (request.headers.port)
        options.port = request.headers.port;
    if (request.headers.path)
        options.path = request.headers.path;
    if (request.headers.method)
        options.method = request.headers.method;

    var proxyRequest;

    if (request.headers.port === "443") {
        proxyRequest = https.request(options);
    } else {
        proxyRequest = http.request(options);
    }

    proxyRequest.on('response', function (proxyResponse) {
        var throttleEnabled = matcher ? matcher(request.url) : true;
        response.setHeader('x-throttle-proxy', throttleEnabled ? 'throttled' : 'skipped');
        response.setHeader('via', 'throttle-proxy');
        response.writeHead(proxyResponse.statusCode, proxyResponse.headers);
        if (throttleEnabled) {
            proxyResponse.pipe(throttle).pipe(response);
        } else {
            proxyResponse.pipe(response);
        }
    });

    proxyRequest.on('error', function (err) {
        response.writeHead(500);
        response.end();
    });

    if (outgoing) {
        request.pipe(outgoing).pipe(proxyRequest);
    } else {
        request.pipe(proxyRequest);
    }

}

/**
 * Server factory
 * @param {Number} speed
 * @param {String} [pattern]
 * @param {Boolean} [skip]
 * @type {Function}
 */
module.exports = exports = function (speed, outgoing, pattern, skip) {
    var matcher = (function () {
        if (!pattern) {
            return false;
        }
        var rx = processWildcards(pattern);
        return function (url) {
            var val = rx.test(url);
            return skip ? !val : val;
        };
    }());
    return http.createServer(function (request, response) {
        connectionHandler(
            request, response,
            new Throttle(speed),
            outgoing ? new Throttle(outgoing) : null,
            matcher);
    });
};
