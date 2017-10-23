var mainLoopHandlers = [];
var touchMoveHandlers = [];


// Fired every 10 milliseconds
function onMainLoop(func){
    mainLoopHandlers.push(func);
}

// On global document touchmove
function onTouchMove(func){
    touchMoveHandlers.push(func);
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