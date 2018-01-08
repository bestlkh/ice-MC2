var state = 0;

function swapFrame(){
	// var chat = document.getElementById("chatframe");
	// var editor = document.getElementById("editorframe");
	// editor.style.display = "inline";
	// chat.style.display = "none";
	$("#editorframe").addClass("shown");
}

function swapParentFrame(){
    var editor = parent.document.getElementById("editorframe");
    $(editor).removeClass("shown")
}

function swapTool(){
	var SP = document.getElementById("tool_selectpath");
	if(state == 0){
		//alert(5);
		state = 1;
	}
	else{
		//alert(6);
		state = 0;
	}
}

function imageOpen(){
	var chatScreen = document.getElementById("chatframe");
	html2canvas(chatScreen).then(function(canvas) {
	    // Export the canvas to its data URI representation
	    var base64image = canvas.toDataURL("image/png");

	    // Open the image in a new window
	    window.open(base64image, "_blank");
	});
}

function cancelFS(){
	//alert("changing");
	var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if(cancelFullScreen) cancelFullScreen.call(doc);
}