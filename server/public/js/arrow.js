$(document).ready(function(){
	$('button').on('mousedown', function() {
    	$(this).css("background","green");
	}).on('mouseup mouseleave', function() {
    	$(this).css("background","white");
	});
	var first=0;
	$(document).keydown(function(e) {
		
	    switch(e.which) {
	        case 37: // left
	        	$("#keyboard_key_left").css("background","green");
	        	console.log("left");
	        	break;

	        case 38: // up
	        	$("#keyboard_key_up").css("background","green");    	
				console.log("up");
				if(first==0) {
					first++;
					console.log("go")
		        	$.get("/go", function(data, status){
		        		console.log("go inviato con successo");
	        		    //console.log("Data: " + data + "\nStatus: " + status);
	        		    
	            	});
            	}
	        	break;

	        case 39: // right
	        	$("#keyboard_key_right").css("background","green");
	        	console.log("right");
	        	break;

	        case 40: // down
	        	$("#keyboard_key_down").css("background","green");
	        	console.log("down");
	        	break;

	        default: return; // exit this handler for other keys
	    }
	    e.preventDefault(); // prevent the default action (scroll / move caret)
	});
	$(document).keyup(function(e) {
	    switch(e.which) {
	        case 37: // left
	        	$("#keyboard_key_left").css("background","white");
	        	break;

	        case 38: // up
	        	$("#keyboard_key_up").css("background","white");
	        	console.log("stopGo");
	        	$.get("/stopGo", function(data, status){
        		    //console.log("Data: " + data + "\nStatus: " + status);
        		    first=0;
        		    console.log("stopGo inviato con successo");
               });	
	        	break;

	        case 39: // right
	        	$("#keyboard_key_right").css("background","white");
	        	break;

	        case 40: // down
	        	$("#keyboard_key_down").css("background","white");
	        	break;

	        default: return; // exit this handler for other keys
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


