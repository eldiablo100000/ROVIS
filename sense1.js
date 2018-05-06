var Gpio = require('pigpio').Gpio;
var triggerFRONT = new Gpio(17, {mode: Gpio.OUTPUT});
var echoFRONT = new Gpio(18, {mode: Gpio.INPUT, alert: true});
var triggerBACK = new Gpio(5, {mode: Gpio.OUTPUT});
var echoBACK = new Gpio(6, {mode: Gpio.INPUT, alert: true});
var triggerLEFT = new Gpio(13, {mode: Gpio.OUTPUT});
var echoLEFT = new Gpio(19, {mode: Gpio.INPUT, alert: true});
var triggerRIGHT = new Gpio(22, {mode: Gpio.OUTPUT});
var echoRIGHT = new Gpio(23, {mode: Gpio.INPUT, alert: true});


// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
var MICROSECDONDS_PER_CM = 1e6/34321;

triggerFRONT.digitalWrite(0); // Make sure trigger is low
triggerBACK.digitalWrite(0); // Make sure trigger is low
triggerLEFT.digitalWrite(0); // Make sure trigger is low
triggerRIGHT.digitalWrite(0); // Make sure trigger is low

(function () {
  var startTick;

  echoFRONT.on('alert', function (level, tick) {
    var endTick,
      diff;

    if (level == 1) {
      startTick = tick;
    } else {
      endTick = tick;
      diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      console.log(diff / 2 / MICROSECDONDS_PER_CM);
    }
  });
  echoBACK.on('alert', function (level, tick) {
    var endTick,
      diff;

    if (level == 1) {
      startTick = tick;
    } else {
      endTick = tick;
      diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      console.log(diff / 2 / MICROSECDONDS_PER_CM);
    }
  });
  echoLEFT.on('alert', function (level, tick) {
    var endTick,
      diff;

    if (level == 1) {
      startTick = tick;
    } else {
      endTick = tick;
      diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      console.log(diff / 2 / MICROSECDONDS_PER_CM);
    }
  });
  echoRIGHT.on('alert', function (level, tick) {
    var endTick,
      diff;

    if (level == 1) {
      startTick = tick;
    } else {
      endTick = tick;
      diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      console.log(diff / 2 / MICROSECDONDS_PER_CM);
    }
  });
}());

// Trigger a distance measurement once per second
setInterval(function () {
  triggerFRONT.trigger(10, 1); // Set trigger high for 10 microseconds
  triggerRIGHT.trigger(10, 1); // Set trigger high for 10 microseconds
  triggerBACK.trigger(10, 1); // Set trigger high for 10 microseconds
  triggerLEFT.trigger(10, 1); // Set trigger high for 10 microseconds
}, 1000);
