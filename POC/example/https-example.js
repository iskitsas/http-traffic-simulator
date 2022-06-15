const https = require('https');

const options = {
    hostname: 'encrypted.google.com',
    port: 443,
    path: '/',
    method: 'GET'
};

const req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (e) => {
    console.error(e);
});
req.end();