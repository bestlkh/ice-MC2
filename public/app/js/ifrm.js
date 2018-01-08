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