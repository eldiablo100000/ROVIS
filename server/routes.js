

const routes = require('express').Router();
const { exec } = require('child_process');





routes.get('/', (req, res) => {
//   res.status(200).json({ message: 'Connected!' });
  res.sendFile('public/ex3-1.html',{root: __dirname});
});
routes.get('/go', (req, res) => {
  res.status(200).json({ message: 'Go!' });
  go("go");
});
routes.get('/stopGo', (req, res) => {
  res.status(200).json({ message: 'stopGo!' });
  go("stopGo");
});
routes.get('/goBack', (req, res) => {
  res.status(200).json({ message: 'goBack!' });
  go("goBack");
});
routes.get('/goLeft', (req, res) => {
  res.status(200).json({ message: 'goLeft!' });
  go("goLeft");
});
routes.get('/goRight', (req, res) => {
  res.status(200).json({ message: 'goRight!' });
  go("goRight");
});

routes.get('/startStream', (req, res) => {
  res.status(200).json({ message: 'streaming siiii!' });
  streaming(true);
});
routes.get('/stopStream', (req, res) => {
  res.status(200).json({ message: 'streaming noooo!' });
  streaming(false);
});
routes.get('/getScreen', (req, res) => {
  res.status(200).json({ message: 'screenshoooooot!' });
  //screenshot();
});


/*function go(command) {
		var PythonShell = require('python-shell');
		let options = {
  			mode: 'text',
  			pythonOptions: ['-u'], // get print results in real-time
  			args: [command]
		};
		if(command=="stopGo"){
			console.log("provo a fermarlo");
			//PythonShell.terminate();
			console.log("killato");		
		}
		PythonShell.run('AMSpi/movements.py', options, function (err) {
  		if (err) throw err;
  			console.log('finished');
    	});
}*/

var python_process;
function go(command) {
		if(command=="stopGo") {
			//NON VIENE CHIAMATA LA STOP MOTORS, VIENE SOLO UCCISO IL PROCESSO
			python_process.kill('SIGINT');	
		}
		let options = {
  			mode: 'text',
  			pythonOptions: ['-u'], // get print results in real-time
  			args: [command]
		};
	    var PythonShell = require('python-shell');
	    var pyshell = new PythonShell('AMSpi/movements.py',options);
	    
		
	    pyshell.end(function (err) {
	        if (err) {
	            console.log(err);
	        }
	    });
	    python_process = pyshell.childProcess;
}
function streaming(bool) {
		if(bool){
			console.log("yes");
			exec('ffmpeg -f v4l2 -framerate 25 -video_size 640x480 -i /dev/video0 -f mpegts -codec:v mpeg1video -s 640x480 -b:v 1000k -bf 0 http://localhost:8081/ciao', (error, stdout, stderr) => {
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
	   	
//IMPORTANTE, STARE ATTENTI A NON CANCELLARE
module.exports = routes;
