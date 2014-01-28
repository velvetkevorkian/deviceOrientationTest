var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: 8080
    });
wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        var decoded = JSON.parse(message);
        console.log('tiltLR: ' + decoded.tiltLR + ' tiltFB: ' + decoded.tiltFB + ' dir: ' + decoded.dir);
    });
    //ws.send('something');
});