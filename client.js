var host = window.document.location.host.replace(/:.*/, '');
var ws = new WebSocket('ws://' + host + ':8887/');
var msg = {
    tiltLR: 0,
    tiltFB: 0,
    dir: 0
};

ws.onopen = function () {
    //ws.send('connected!');
};
ws.onmessage = function (event) {
    console.log(event.data);
};

function init() {
    document.getElementById("doEvent").innerHTML = "DeviceOrientation";
    window.addEventListener('deviceorientation', function (eventData) {
        var tiltLR = eventData.gamma,
            tiltFB = eventData.beta,
            dir = eventData.alpha

            deviceOrientationHandler(tiltLR, tiltFB, dir);
    }, false);
}

function deviceOrientationHandler(tiltLR, tiltFB, dir) {
    document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
    document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
    document.getElementById("doDirection").innerHTML = Math.round(dir);
    msg.tiltLR = tiltLR;
    msg.tiltFB = tiltFB;
    msg.dir = dir;
    ws.send(JSON.stringify(msg));
}


function round(val) {
    var amt = 10;
    return Math.round(val * amt) / amt;
}

function checkSupport() {
    var wsSupport = false,
        orientationSupport = false;

    var b = document.querySelectorAll('body');
    if (window.DeviceOrientationEvent) {
        orientationSupport = true;
    } else {
        var w = window.querySelector('#orientationWarning');
        w.classList.remove('hide');
        w.classList.add('show');
    }

    if (window.WebSocket) {
        wsSupport = true;
    }


    if (wsSupport && orientationSupport) {
        var j = document.querySelector('#join');
        window.addEventListener(j, function(click){
            j.preventDefault();
            init();    
        });
        j.classList.remove('hide');
        j.classList.add('show');
    }
}

checkSupport();
//init();