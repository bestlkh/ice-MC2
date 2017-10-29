/* Event dispatchers
 * Author(s): Jun Zheng
 */

var mainLoopHandlers = [];

function onMainLoop(func){
    mainLoopHandlers.push(func);
}

function fireEventChain(chain, e){
    for(i = 0; i < chain.length; i++){
        chain[i](e);
    }
}

setInterval(function(){
    fireEventChain(mainLoopHandlers);
}, 10);
