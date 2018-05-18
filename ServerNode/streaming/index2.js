var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');
 
var spawn = require('child_process').spawn;
var proc;

app.use('/', express.static(path.join(__dirname, 'stream')));
 
 
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
 
var sockets = {};
 
io.on('connection', function(socket) {
 
  sockets[socket.id] = socket;
  console.log("Total clients connected : ", Object.keys(sockets).length);
 
  socket.on('disconnect', function() {
    delete sockets[socket.id];
 
    // no more sockets, kill the stream
    if (Object.keys(sockets).length == 0) {
      app.set('watchingFile', false);
      if (proc) proc.kill();
      fs.unwatchFile('./stream/image_stream.jpg');
    }
  });
 
  socket.on('start-stream', function() {
    startStreaming(io);
  });
 
});
 
http.listen(3000, function() {
  console.log('listening on *:3000');
});
 
const LiveCam = require('livecam');
const webcam_server = new LiveCam
({
    // address and port of the webcam UI
    'ui_addr' : '127.0.0.1',
    'ui_port' : 11000,
 
    // address and port of the webcam Socket.IO server
    // this server broadcasts GStreamer's video frames
    // for consumption in browser side.
    'broadcast_addr' : '127.0.0.1',
    'broadcast_port' : 12000,
 
    // address and port of GStreamer's tcp sink
    'gst_tcp_addr' : '127.0.0.1',
    'gst_tcp_port' : 10000,
    
    // callback function called when server starts
    'start' : function() {
        console.log('WebCam server started!');
    },
    
    // webcam object holds configuration of webcam frames
    'webcam' : {
        
        // should frames be converted to grayscale (default : false)
        'grayscale' : true,
        
        // should width of the frame be resized (default : 0)
        // provide 0 to match webcam input
        'width' : 800,
 
        // should height of the frame be resized (default : 0)
        // provide 0 to match webcam input
        'height' : 600,
        
        // should a fake source be used instead of an actual webcam
        // suitable for debugging and development (default : false)
        'fake' : false,
        
        // framerate of the feed (default : 0)
        // provide 0 to match webcam input
        'framerate' : 25
    }
});
webcam_server.broadcast();

function stopStreaming() {
  if (Object.keys(sockets).length == 0) {
    app.set('watchingFile', false);
    if (proc) proc.kill();
    fs.unwatchFile('./stream/image_stream.jpg');
  }
}
 
function startStreaming(io) {
	
 
	webcam_server.broadcast();
 
 
}

