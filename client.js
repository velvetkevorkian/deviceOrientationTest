var ws, msg;

function init() {
    var host = window.document.location.host.replace(/:.*/, '');
    ws = new WebSocket('ws://' + host + ':8887/');

    ws.onopen = function () {
        //ws.send('connected!');
        playIntro();
    };
    ws.onmessage = function (event) {
        console.log(event.data);
        setColor(event.data);
    };


    msg = {
        tiltLR: 0,
        tiltFB: 0,
        dir: 0
    };

    window.addEventListener('deviceorientation', function (eventData) {
        var tiltLR = eventData.gamma,
            tiltFB = eventData.beta,
            dir = eventData.alpha

            deviceOrientationHandler(tiltLR, tiltFB, dir);
    }, false);
}

function deviceOrientationHandler(tiltLR, tiltFB, dir) {
    msg.tiltLR = tiltLR;
    msg.tiltFB = tiltFB;
    msg.dir = dir;
    if (ws.readyState === 1) {
        ws.send(JSON.stringify(msg));
    }
}

function setColor(color) {
    var c = "#" + color;
    console.log("hello");
    var b = document.querySelector('body');
    b.style.backgroundColor = c;
}

function playIntro() {
    var joinLink = document.querySelector('#join');
    joinLink.classList.remove('show');
    joinLink.classList.add('hide');



    var introOne = document.querySelector("#instructionOne");
    introOne.classList.remove('hide');
    introOne.classList.add('show');
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
        var w = document.querySelector('#orientationWarning');
        w.classList.add('show');
        w.classList.remove('hide');
    }


    if (window.WebSocket) {
        wsSupport = true;
    } else {
        var w = document.querySelector('#websocketWarning');
        w.classList.add('show');
        w.classList.remove('hide');
    }


    if (wsSupport && orientationSupport) {
        var j = document.querySelector('#join');
        window.addEventListener('click', function (e) {
            e.preventDefault();
            if (ws === undefined) {
                init();
            }
        });
        j.classList.remove('hide');
        j.classList.add('show');
    }
}

checkSupport();