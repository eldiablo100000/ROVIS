var usonic = require('r-pi-usonic');
var sensor = usonic.sensor(18, 17, 1000);
setTimeout(function() {
    console.log('Distance: ' + sensor().toFixed(2) + ' cm');
}, 60);
