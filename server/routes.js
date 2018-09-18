

const routes = require('express').Router();





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
	   	
//IMPORTANTE, STARE ATTENTI A NON CANCELLARE
module.exports = routes;
