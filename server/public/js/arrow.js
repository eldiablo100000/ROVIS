var first=0;
$(document).ready(function(){
	//FUNZIONI PER IL CLICK DEI TASTI DA TESTARE. 
	//NOTARE CHE SE SI PASSA IL MOUSE SOPRA UN TASTO SENZA AVER CLICCATO, PARTE COMUNQUE LA STOPGO
	/*$('button').on('mousedown', function(e) {
    	$(this).css("background","green");
    	switch($(this).attr("id")) {
    		case "keyboard_key_left":
    			goLeft();
    			break;
    		case "keyboard_key_up":
    			go();
    			break;
    		case "keyboard_key_right":
    			goRight();
    			break;
    		case "keyboard_key_down":
    			goBack();
    			break;
    		default: 
    			console.log("DEFAULT_KEY");
    			return;
    	}
    	e.preventDefault(); 
	}).on('mouseup mouseleave', function(e) {
    	$(this).css("background","white");
    	console.log("StopGo");
    	stopGo();
    	e.preventDefault(); 
	});*/
	
	$(document).keydown(function(e) {
		
	    switch(e.which) {
	        case 37: // left
	        	$("#keyboard_key_left").css("background","green");
	        	console.log("left");
	        	goLeft();
	        	break;

	        case 38: // up
	        	$("#keyboard_key_up").css("background","green");    	
				console.log("up");
				go();
	        	break;

	        case 39: // right
	        	$("#keyboard_key_right").css("background","green");
	        	console.log("right");
	        	goRight();
	        	break;

	        case 40: // down
	        	$("#keyboard_key_down").css("background","green");
	        	console.log("down");
	        	goBack();
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


function goLeft() {
	if(first==0) {
		first++;
		console.log("goLeft")
    	$.get("/goLeft", function(data, status){
    		console.log("goLeft inviato con successo");
		    //console.log("Data: " + data + "\nStatus: " + status);
		    
    	});
	}
}
function go() {
	if(first==0) {
		first++;
		console.log("go")
    	$.get("/go", function(data, status){
    		console.log("go inviato con successo");
		    //console.log("Data: " + data + "\nStatus: " + status);
		    
    	});
	}
}
function goRight() {
	if(first==0) {
		first++;
		console.log("goRight")
    	$.get("/goRight", function(data, status){
    		console.log("goRight inviato con successo");
		    //console.log("Data: " + data + "\nStatus: " + status);
		    
    	});
	}
}
function goBack() {
	if(first==0) {
		first++;
		console.log("goBack")
    	$.get("/goBack", function(data, status){
    		console.log("goBack inviato con successo");
		    //console.log("Data: " + data + "\nStatus: " + status);
		    
    	});
	}	
}
function stopGo() {
	$.get("/stopGo", function(data, status){
	    //console.log("Data: " + data + "\nStatus: " + status);
	    first=0;
	    console.log("stopGo inviato con successo");
   	});	
}
