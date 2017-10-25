var hamburgerMenuOpenHandlers = [];
var hamburgerMenuCloseHandlers = [];

function fireEventChain(chain, e){
    for(i = 0; i < chain.length; i++){
        chain[i](e);
    }
}

function onHamburgerMenuOpen(func){
    hamburgerMenuOpenHandlers.push(func);
}

function onHamburgerMenuClose(func){
    hamburgerMenuCloseHandlers.push(func);
}


$(function(){
    // Register hamburger menu events
    $('#menu-button').on('mouseenter touchstart', function() {
        if($(document.body).hasClass('menu-open')){
            $(document.body).removeClass('menu-open');
            fireEventChain(hamburgerMenuCloseHandlers);
        } else {
            $(document.body).addClass('menu-open');
            fireEventChain(hamburgerMenuOpenHandlers);
        }
    });
});