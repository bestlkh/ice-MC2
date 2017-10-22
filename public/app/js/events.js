var mainLoopHandlers = [];
var touchMoveHandlers = [];


function onMainLoop(func){
    mainLoopHandlers.push(func);
}

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
}, 100);

document.ontouchmove = function(e){
    fireEventChain(touchMoveHandlers, e);
};