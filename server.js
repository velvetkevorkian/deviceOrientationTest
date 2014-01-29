var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8080});

wss.on('connection', function (ws) {  
    ws.send('Hello!');
    ws.on('message', function (data, flags) {
        var decoded = JSON.parse(data);
        console.log('tiltLR: ' + decoded.tiltLR + ' tiltFB: ' + decoded.tiltFB + ' dir: ' + decoded.dir);
        //console.log(message);
        ws.send('back at you');
    });
    
    
    
});

