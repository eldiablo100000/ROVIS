

const routes = require('express').Router();
const { exec } = require('child_process');





routes.get('/', (req, res) => {
//   res.status(200).json({ message: 'Connected!' });
	res.sendFile('public/home.html',{root: __dirname});
});
routes.get('/rovis', (req, res) => {
//   res.status(200).json({ message: 'Connected!' });
	res.sendFile('public/home.html',{root: __dirname});
});
routes.get('/progetto', (req, res) => {
//   res.status(200).json({ message: 'Connected!' });
	res.sendFile('public/progetto.html',{root: __dirname});
});
routes.get('/linkutili', (req, res) => {
//   res.status(200).json({ message: 'Connected!' });
	res.sendFile('public/linkutili.html',{root: __dirname});
});

routes.get('/startGo', (req, res) => {
	res.status(200).json({ message: 'startGo!' });
	startGo(req.query.direction, req.query.vel);
});

routes.get('/stopGo', (req, res) => {
	res.status(200).json({ message: 'stopGo!' });
	stopGo("stopGo",req.query.vel);
});

routes.get('/startStream', (req, res) => {
	res.status(200).json({ message: 'streaming si!' });
	streaming(true);
});
routes.get('/stopStream', (req, res) => {
	res.status(200).json({ message: 'streaming no!' });
	streaming(false);
});
routes.get('/getScreen', (req, res) => {
	res.status(200).json({ message: 'screenshoot!' });
	screenshot();
});
routes.get('/recordings', (req, res) => {
	res.sendFile('recordings/',{root: __dirname});
});



var python_process;
function stopGo(){
	//NON VIENE CHIAMATA LA STOP MOTORS, VIENE SOLO UCCISO IL PROCESSO
	console.log("ROUTES STOPGO")
	python_process.kill('SIGINT');	
}
function startGo(direction,vel) {
		console.log("ROUTES STARTGO -> direction "+direction+" vel "+vel)

		let options = {
  			mode: 'text',
  			pythonOptions: ['-u'], // get print results in real-time
  			args: [direction,vel]
		};
	    var PythonShell = require('python-shell');
	    var pyshell = new PythonShell('AMSpi/movements.py',options);
	    
		pyshell.on("message",function(message) {
			console.log(message);
		});
	    pyshell.end(function (err) {
	        if (err) {
	            console.log(err);
	        }
	    });
	    python_process = pyshell.childProcess;
}
function streaming(bool) {
		console.log("ROUTES STREAMING -> start "+bool+" stop "+!bool)
		if(bool){
			url = "http://localhost:"+process.env.STREAM_PORT+"/"+process.env.STREAM_SECRET
			exec('ffmpeg -f v4l2 -framerate 25 -video_size 640x480 -i /dev/video0 -f mpegts -codec:v mpeg1video -s 640x480 -b:v 1000k -bf 0 '+url,(error, stdout, stderr) => {
			  if (error) {
			    console.error(`exec error: ${error}`);
			    return;
			  }
			  console.log(`stdout: ${stdout}`);
			  console.log(`stderr: ${stderr}`);
			});

		}
		else {
			exec('pkill ffmpeg', (error, stdout, stderr) => {
			  if (error) {
			    console.error(`exec error: ${error}`);
			    return;
			  }
			  console.log(`stdout: ${stdout}`);
			  console.log(`stderr: ${stderr}`);
			});

		}
}
function screenshot() {
		console.log("ROUTES SCREENSHOT")

		exec('pkill ffmpeg', (error, stdout, stderr) => {
		  if (error) {
			console.error(`exec error: ${error}`);
			return;
		  }
		  console.log(`stdout: ${stdout}`);
		  console.log(`stderr: ${stderr}`);
		});
		path = "recordings/"
		format="jpeg"
		exec('ffmpeg -f v4l2 -i /dev/video0 -vframes 1 '+path+Date.now()+"."+format,(error, stdout, stderr) => {
		  if (error) {
			console.error(`exec error: ${error}`);
			return;
		  }
		  console.log(`stdout: ${stdout}`);
		  console.log(`stderr: ${stderr}`);
		});
	
	}
	   	
//IMPORTANTE, STARE ATTENTI A NON CANCELLARE
module.exports = routes;
