// Use the websocket-relay to serve a raw MPEG-TS over WebSockets. You can use
// ffmpeg to feed the relay. ffmpeg -> websocket-relay -> browser
// Example:
// node websocket-relay yoursecret 8081 8082
// ffmpeg -i <some input> -f mpegts http://localhost:8081/yoursecret
var fs = require('graceful-fs');
var	http = require('http');
var	WebSocket = require('ws');
var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes.js');
var app = express();
var PythonShell = require('python-shell');
require('dotenv').config()

app.use("/public", express.static(__dirname + "/public"));

// Routes
// Websocket Server
var socketServer = new WebSocket.Server({port: process.env.WEBSOCKET_PORT, perMessageDeflate: false});
socketServer.connectionCount = 0;
socketServer.on('connection', function(socket, upgradeReq) {
	socketServer.connectionCount++;
	console.log(
		'New WebSocket Connection: ', 
		(upgradeReq || socket.upgradeReq).socket.remoteAddress,
		(upgradeReq || socket.upgradeReq).headers['user-agent'],
		'('+socketServer.connectionCount+' total)'
	);
	socket.on('close', function(code, message){
		socketServer.connectionCount--;
		console.log(
			'Disconnected WebSocket ('+socketServer.connectionCount+' total)'
		);
	});
});
socketServer.broadcast = function(data) {
	socketServer.clients.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(data);
		}
	});
};

// HTTP Server to accept incomming MPEG-TS Stream from ffmpeg
var streamServer = http.createServer( function(request, response) {
	var params = request.url.substr(1).split('/');

	if (params[0] !== process.env.STREAM_SECRET) {
		console.log(
			'Failed Stream Connection: '+ request.socket.remoteAddress + ':' +
			request.socket.remotePort + ' - wrong secret.'
		);
		response.end();
	}

	response.connection.setTimeout(0);
	console.log(
		'Stream Connected: ' + 
		request.socket.remoteAddress + ':' +
		request.socket.remotePort
	);
	request.on('data', function(data){
		socketServer.broadcast(data);
		if (request.socket.recording) {
			request.socket.recording.write(data);
		}
	});
	request.on('end',function(){
		console.log('close');
		if (request.socket.recording) {
			request.socket.recording.close();
		}
	});

	// Record the stream to a local file?
	if (process.env.RECORD_STREAM) {
		var path = 'recordings/' + Date.now() + '.ts';
		request.socket.recording = fs.createWriteStream(path);
	}
}).listen(process.env.STREAM_PORT);

app.use('/', routes);

/*PythonShell.run('AMSpi/controllo_motori.py', null, function (err) {
  		if (err) throw err;
  			console.log('finished');
	});*/

// Turn on that server!
app.listen(process.env.HTML_PORT, () => {
	console.log('App listening on port '+process.env.HTML_PORT);
});
console.log('Listening for incomming MPEG-TS Stream on http://'+process.env.ADDRESS+':'+process.env.STREAM_PORT+'/'+ process.env.STREAM_SECRET);
console.log('Awaiting WebSocket connections on ws://'+process.env.ADDRESS+':'+process.env.WEBSOCKET_PORT+'/');
console.log('Listening for incomming HTTP-Requests on http://'+process.env.ADDRESS+':'+process.env.HTML_PORT+'/');

