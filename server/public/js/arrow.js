var first=0;
$(document).ready(function(){
	var velocity=$('#velocity')[0].value
	$('#velocity').on("input change", function(){
		$('#velocityValue')[0].value=$(this)[0].value
		velocity=$(this)[0].value
	})


	$('button').on('mousedown', function(e) {
    	switch($(this).attr("id")) {
    		case "keyboard_key_left":
    			$("#keyboard_key_left").css("background","green");
	        	//console.log("left hw");
    			startGo("left", velocity);
    			break;
    		case "keyboard_key_up":
    		$("#keyboard_key_up").css("background","green");
	        	//console.log("up hw");
    			startGo("forth", velocity);
    			break;
    		case "keyboard_key_right":
    		$("#keyboard_key_right").css("background","green");
	        	//console.log("right hw");
    			startGo("right", velocity);
    			break;
    		case "keyboard_key_down":
    			$("#keyboard_key_down").css("background","green");
	        	//console.log("down hw");
    			startGo("back", velocity);
    			break;
    		case "start":
    			startStreaming();
    			break;
    		case "stop":
    			stopStreaming();
    			break;
    		case "screenshot":
    			getScreenshot();
    			break;
    		default: 
    			//console.log("DEFAULT_KEY");
    			return;
    	}
    	//e.preventDefault(); 
	})
	$('button').on('mouseup', function(e) {
    		switch($(this).attr("id")) {
    		case "keyboard_key_left":
    			$("#keyboard_key_left").css("background","white");
	        	//console.log("stop left hw");
	        	stopGo();
    			break;
    		case "keyboard_key_up":
    		$("#keyboard_key_up").css("background","white");
	        	//console.log("stop up hw");
	        	stopGo();
    			break;
    		case "keyboard_key_right":
    		$("#keyboard_key_right").css("background","white");
	        	//console.log("stop right hw");
	        	stopGo();
    			break;
    		case "keyboard_key_down":
    			$("#keyboard_key_down").css("background","white");
	        	//console.log("stop down hw");
	        	stopGo();
    			break;
    	}
    	e.preventDefault(); 
	});
	
	$(document).keydown(function(e) {
		
	    switch(e.which) {
	        case 37: // left
	        	$("#keyboard_key_left").css("background","green");
	        	//console.log("left");
	        	startGo("left", velocity);
	        	break;

	        case 38: // up
	        	$("#keyboard_key_up").css("background","green");    	
				//console.log("up");
				startGo("forth", velocity);
	        	break;

	        case 39: // right
	        	$("#keyboard_key_right").css("background","green");
	        	//console.log("right");
	        	startGo("right", velocity);
	        	break;

	        case 40: // down
	        	$("#keyboard_key_down").css("background","green");
	        	//console.log("down");
	        	startGo("back", velocity);
	        	break;

	        default: 
	        	//console.log("DEFAULT_ARROW");
	        	return; // exit this handler for other keys
	    }
	    e.preventDefault(); // prevent the default action (scroll / move caret)
	});
	$(document).keyup(function(e) {
	    switch(e.which) {
	        case 37: // left
	        	$("#keyboard_key_left").css("background","white");
	        	//console.log("stopGoLeft");
	        	stopGo();
	        	break;

	        case 38: // up
	        	$("#keyboard_key_up").css("background","white");
	        	//console.log("stopGo");
	        	stopGo();
	        	break;

	        case 39: // right
	        	$("#keyboard_key_right").css("background","white");
	        	//console.log("stopGoRight");
	        	stopGo();
	        	break;

	        case 40: // down
	        	$("#keyboard_key_down").css("background","white");
	        	//console.log("stopGoBack");
	        	stopGo();
	        	break;

	        default: 
	        	//console.log("DEFAULT_ARROW");
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


function startGo(direction, vel) {
	if(first==0) {
		first++;
		
		$.get("/startGo", {direction, vel}, function(data, status){
			console.log("FRONTEND STARTGO -> direction "+direction + " vel "+vel);
		});
				
	}
}

function stopGo() {
	vel=0;
	$.get("/stopGo", {vel},function(data, status){
	    first=0;
	    console.log("FRONTEND STOPGO -> vel "+vel);
   	});	
}
function startStreaming() {
	$.get("/startStream", function(data, status){
	    console.log("FRONTEND STARTSTREAM");
   	});
}
function stopStreaming() {
	$.get("/stopStream", function(data, status){
	    console.log("FRONTEND STOPSTREAM");
   	});
}
function getScreenshot() {
	$.get("/getScreen", function(data, status){
	    console.log("FRONTEND SCREENSHOT");
   	});
}
