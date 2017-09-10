var state = 0;

function swapFrame(){
	var chat = document.getElementById("chatframe");
	var editor = document.getElementById("editorframe");
	editor.style.display = "inline";
	chat.style.display = "none";
	simulateFullScreen();
}

function swapParentFrame(){
    var chat = parent.document.getElementById("chatframe");
    var editor = parent.document.getElementById("editorframe");
    editor.style.display = "none";
    chat.style.display = "inline";
    cancelFS();
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

function uploadToChat(img){
	
}

function downloadLogs(){
	var hiddenElement = document.createElement('a');

	hiddenElement.href = 'data:attachment/text,' + encodeURI(chatLog);
	hiddenElement.target = '_blank';
	hiddenElement.download = 'MC2.LOG - '+Date()+'.txt';
	hiddenElement.click();
}

function PDFDL(){
	var doc = new jsPDF();
	doc.setFont('Courier');
	doc.setFontSize(8);
	doc.text(chatLog, 10, 10);
	doc.save('MC2-LOG.pdf');
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

function simulateFullScreen(){
	var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
	
	if(!requestFullScreen)
		return;
    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      requestFullScreen.call(docEl);
    }
    else {
      cancelFullScreen.call(doc);
    }
}

function cancelFS(){
	//alert("changing");
	var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if(cancelFullScreen) cancelFullScreen.call(doc);
}