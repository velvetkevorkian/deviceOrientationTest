
var host = window.document.location.host.replace(/:.*/, '');
var ws = new WebSocket('ws://' + host + ':8887/');
var msg = {};
ws.onopen = function () {
   //ws.send('connected!');
};
ws.onmessage = function (event) {
    console.log(event.data);
};

function init() {
    if (window.DeviceOrientationEvent) {
        document.getElementById("doEvent").innerHTML = "DeviceOrientation";
        // Listen for the deviceorientation event and handle the raw data
        window.addEventListener('deviceorientation', function (eventData) {
            // gamma is the left-to-right tilt in degrees, where right is positive
            var tiltLR = eventData.gamma,

            // beta is the front-to-back tilt in degrees, where front is positive
            tiltFB = eventData.beta,

            // alpha is the compass direction the device is facing in degrees
            dir = eventData.alpha

            // call our orientation event handler
            deviceOrientationHandler(tiltLR, tiltFB, dir);
        }, false);
    } else {
        document.getElementById("doEvent").innerHTML = "Not supported on your device or browser.  Sorry."
    }

    if ((window.DeviceMotionEvent) || ('listenForDeviceMovement' in window)) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    } else {
        document.getElementById("dmEvent").innerHTML = "Not supported on your device or browser.  Sorry."
    }



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

function deviceMotionHandler(eventData) {
    var info, xyz = "[X, Y, Z]";

    // Grab the acceleration including gravity from the results
    var acceleration = eventData.acceleration;
    info = xyz.replace("X", round(acceleration.x));
    info = info.replace("Y", round(acceleration.y));
    info = info.replace("Z", round(acceleration.z));
    document.getElementById("moAccel").innerHTML = info;

    
    // Grab the acceleration including gravity from the results
    var accelerationWithGravity = eventData.accelerationIncludingGravity;
    info = xyz.replace("X", round(accelerationWithGravity.x));
    info = info.replace("Y", round(accelerationWithGravity.y));
    info = info.replace("Z", round(accelerationWithGravity.z));
    document.getElementById("moAccelGrav").innerHTML = info;

    // Grab the acceleration including gravity from the results
    var rotation = eventData.rotationRate;
    info = xyz.replace("X", round(rotation.alpha));
    info = info.replace("Y", round(rotation.beta));
    info = info.replace("Z", round(rotation.gamma));
    document.getElementById("moRotation").innerHTML = info;

    info = eventData.interval;
    document.getElementById("moInterval").innerHTML = info;
    
    msg.accelX = acceleration.x;
    msg.accelY = acceleration.y;
    msg.accelZ = acceleration.z;
    
    msg.gravAccelX = accelerationWithGravity.x;
    msg.gravAccelY = accelerationWithGravity.y;
    msg.gravAccelZ = accelerationWithGravity.z;
    
    msg.rotationRateX = rotation.alpha;
    msg.rotationRateY = rotation.beta;
    msg.rotationRateZ = rotation.gamma;
    
    
//     var msg = {
//        tiltLR: rotation.alpha,
//        tiltFB: rotation.beta,
//        dir: rotation.gamma
//    };
//    ws.send(JSON.stringify(msg));
}

function round(val) {
    var amt = 10;
    return Math.round(val * amt) / amt;
}

init();