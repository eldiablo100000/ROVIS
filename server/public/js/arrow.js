var first=0;
var VELOCITA=100; //FISSA PER IL MOMENTO
$(document).ready(function(){
	
	//FUNZIONI PER IL CLICK DEI TASTI DA TESTARE. 
	//NOTARE CHE SE SI PASSA IL MOUSE SOPRA UN TASTO SENZA AVER CLICCATO, PARTE COMUNQUE LA STOPGO
	$('button').on('mousedown', function(e) {
    	//$(this).css("background","green");
    	switch($(this).attr("id")) {
    	/*	case "keyboard_key_left":
    			goLeft(VELOCITA);
    			break;
    		case "keyboard_key_up":
    			go(VELOCITA);
    			break;
    		case "keyboard_key_right":
    			goRight(VELOCITA);
    			break;
    		case "keyboard_key_down":
    			goBack(VELOCITA);
    			break;
    	*/	case "start":
    			startStreaming();
    			break;
    		case "stop":
    			stopStreaming();
    			break;
    		case "screenshot":
    			getScreenshot();
    			break;
    		default: 
    			console.log("DEFAULT_KEY");
    			return;
    	}
    	e.preventDefault(); 
	}).on('mouseup mouseleave', function(e) {
    	//$(this).css("background","white");
    	//console.log("StopGo");
    	//stopGo();
    	e.preventDefault(); 
	});
	
	$(document).keydown(function(e) {
		
	    switch(e.which) {
	        case 37: // left
	        	$("#keyboard_key_left").css("background","green");
	        	console.log("left");
	        	goLeft(VELOCITA);
	        	break;

	        case 38: // up
	        	$("#keyboard_key_up").css("background","green");    	
				console.log("up");
				go(VELOCITA);
	        	break;

	        case 39: // right
	        	$("#keyboard_key_right").css("background","green");
	        	console.log("right");
	        	goRight(VELOCITA);
	        	break;

	        case 40: // down
	        	$("#keyboard_key_down").css("background","green");
	        	console.log("down");
	        	goBack(VELOCITA);
	        	break;

	        default: 
	        	console.log("DEFAULT_ARROW");
	        	return; // exit this handler for other keys
	    }
	    e.preventDefault(); // prevent the default action (scroll / move caret)
	});
	$(document).keyup(function(e) {
	    switch(e.which) {
	        case 37: // left
	        	$("#keyboard_key_left").css("background","white");
	        	console.log("stopGoLeft");
	        	stopGo();
	        	break;

	        case 38: // up
	        	$("#keyboard_key_up").css("background","white");
	        	console.log("stopGo");
	        	stopGo();
	        	break;

	        case 39: // right
	        	$("#keyboard_key_right").css("background","white");
	        	console.log("stopGoRight");
	        	stopGo();
	        	break;

	        case 40: // down
	        	$("#keyboard_key_down").css("background","white");
	        	console.log("stopGoBack");
	        	stopGo();
	        	break;

	        default: 
	        	console.log("DEFAULT_ARROW");
	        	return; // exit this handler for other keys
	    }
	    e.preventDefault(); // prevent the default action (scroll / move caret)
	});

});



function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


function goLeft(vel) {
	if(first==0) {
		first++;
		console.log("goLeft")
    	$.get("/goLeft", {vel}, function(data, status){
    		console.log("goLeft inviato con successo");
		    //console.log("Data: " + data + "\nStatus: " + status);
		    
    	});
	}
}
function go(vel) {
	if(first==0) {
		first++;
		console.log("go")
    	$.get("/go", {vel},function(data, status){
    		console.log("go inviato con successo");
		    //console.log("Data: " + data + "\nStatus: " + status);
		    
    	});
	}
}
function goRight(vel) {
	if(first==0) {
		first++;
		console.log("goRight")
    	$.get("/goRight",{vel}, function(data, status){
    		console.log("goRight inviato con successo");
		    //console.log("Data: " + data + "\nStatus: " + status);
		    
    	});
	}
}
function goBack(vel) {
	if(first==0) {
		first++;
		console.log("goBack")
    	$.get("/goBack", {vel},function(data, status){
    		console.log("goBack inviato con successo");
		    //console.log("Data: " + data + "\nStatus: " + status);
		    
    	});
	}	
}
function stopGo() {
	vel=0;
	$.get("/stopGo", {vel},function(data, status){
	    //console.log("Data: " + data + "\nStatus: " + status);
	    first=0;
	    console.log("stopGo inviato con successo");
   	});	
}
function startStreaming() {
	$.get("/startStream", function(data, status){
	    //console.log("Data: " + data + "\nStatus: " + status);
	    console.log("startStream inviato con successo");
   	});
}
function stopStreaming() {
	$.get("/stopStream", function(data, status){
	    //console.log("Data: " + data + "\nStatus: " + status);
	    console.log("stopStream inviato con successo");
   	});
}
function getScreenshot() {
	$.get("/getScreen", function(data, status){
	    //console.log("Data: " + data + "\nStatus: " + status);
	    console.log("getScreen inviato con successo");
   	});
}
