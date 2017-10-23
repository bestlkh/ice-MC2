var mainLoopHandlers = [];
var touchMoveHandlers = [];
var chatTextBoxFocusHandlers = [];
var chatTextBoxBlurHandlers = [];
var chatRoomInterfaceLoadedHandlers = [];

// Fired every 10 milliseconds
function onMainLoop(func){
    mainLoopHandlers.push(func);
}

// On global document touchmove
function onTouchMove(func){
    touchMoveHandlers.push(func);
}

function onChatTextBoxFocus(func){
    chatTextBoxFocusHandlers.push(func);
}

function onChatTextBoxBlur(func){
    chatTextBoxBlurHandlers.push(func);
}

function onChatRoomInterfaceLoaded(func){
    chatRoomInterfaceLoadedHandlers.push(func);
}

function fireEventChain(chain, e){
    for(i = 0; i < chain.length; i++){
        chain[i](e);
    }
}

setInterval(function(){
    fireEventChain(mainLoopHandlers);
}, 10);


$(document).bind('touchmove', function(e){
    fireEventChain(touchMoveHandlers, e);
});

onChatRoomInterfaceLoaded(function(){
    // Register all events related to chat room interface
    $(".chat-text-box").on('focus', function(e){
        fireEventChain(chatTextBoxFocusHandlers, e);
    });

    $(".chat-text-box").on('blur', function(e){
        fireEventChain(chatTextBoxBlurHandlers, e);
    });
});