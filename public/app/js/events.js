var mainLoopHandlers = [];
var touchMoveHandlers = [];

var chatTextboxFocusHandlers = [];
var chatTextboxBlurHandlers = [];
var chatTextboxKeyupHandlers = [];

var chatRoomLoadedHandlers = [];


function onMainLoop(func){
    mainLoopHandlers.push(func);
}

function onTouchMove(func){
    touchMoveHandlers.push(func);
}

function onChatRoomLoaded(func){
    chatRoomLoadedHandlers.push(func);
}

function onChatTextboxFocus(func){
    chatTextboxFocusHandlers.push(func);
}

function onChatTextboxBlur(func){
    chatTextboxBlurHandlers.push(func);
}

function onChatTextboxKeyup(func){
    chatTextboxKeyupHandlers.push(func);
}


function fireEventChain(chain, e){
    for(i = 0; i < chain.length; i++){
        chain[i](e);
    }
}

$(function(){
    // Main loop
    setInterval(function(){
        fireEventChain(mainLoopHandlers);
    }, 100);

    // ontouchmove mobile event
    document.ontouchmove = function(e){
        fireEventChain(touchMoveHandlers, e);
    };

    $("#chat_body_div").ontouchmove = function(e) {
        e.stopPropagation();
    };

    onChatRoomLoaded(function(){
        // on chat textbox focus
        $("#textArea").focus(function(e){
            fireEventChain(chatTextboxFocusHandlers, e);
        });
        $("#textArea").blur(function(e){
            fireEventChain(chatTextboxBlurHandlers, e);
        });
        $("#textarea").on('keyup', function(e){
            fireEventChain(chatTextboxKeyupHandlers, e);
        });
    })
});