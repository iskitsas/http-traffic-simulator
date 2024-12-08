var cluster = require('cluster'),
    numCPUs = require('os').cpus().length;

function start() {
    if ((cluster.isMaster)) {
        var worker;
        for (var i = 1; i <= numCPUs; i++) {
            worker = cluster.fork(process.env.DIED);
        }
    } else {
        // Include Express
        var express = require('express');
        // Create a new Express application
        var app = express();
        //Serving files in ./public
        app.use(express.static(__dirname + '/public'));
        // Add a basic route
        app.get('/payload', function (req, res) {
            //res.send('Hello World!');
            res.redirect('static/payload.avi')
        });

        // Bind to a port
        var port = 8080;
        app.listen(port);
        console.log('[Worker %s | port %s] Server is up!', cluster.worker.id, port);
    }
}

start();