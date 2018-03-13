var state = 0;

function swapFrame(){
	// var chat = document.getElementById("chatframe");
	// var editor = document.getElementById("math-editor");
	// editor.style.display = "inline";
	// chat.style.display = "none";
	$("#math-editor").addClass("shown");
}

function swapParentFrame(){
    var editor = parent.document.getElementById("math-editor");
    $(editor).removeClass("shown")
}