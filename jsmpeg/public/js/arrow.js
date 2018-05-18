$(document).ready(function(){
	$('button').on('mousedown', function() {
    	$(this).css("background","green");
	}).on('mouseup mouseleave', function() {
    	$(this).css("background","white");
	});
	$(document).keydown(function(e) {
	    switch(e.which) {
	        case 37: // left
	        	$("#keyboard_key_left").css("background","green");
	        	break;

	        case 38: // up
	        	$("#keyboard_key_up").css("background","green");
	        	break;

	        case 39: // right
	        	$("#keyboard_key_right").css("background","green");
	        	break;

	        case 40: // down
	        	$("#keyboard_key_down").css("background","green");
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
