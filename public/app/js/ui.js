var chatTextboxFocused = false;
var newChatBodyHeight = null;


// Disable scrolling on mobile Webkit browsers
// onTouchMove(function(e){
//
//     e.preventDefault();
// });

var virtualKeyboardHeight = function () {
    var sx = document.body.scrollLeft, sy = document.body.scrollTop;
    var naturalHeight = window.innerHeight;
    window.scrollTo(sx, document.body.scrollHeight);
    var keyboardHeight = naturalHeight - window.innerHeight;
    window.scrollTo(sx, sy);
    return keyboardHeight;
};


onChatTextboxFocus(function(e){
    chatTextboxFocused = true;
    setTimeout(function(){
        newChatBodyHeight = window.innerHeight;
        window.scrollTo(0, 0);
    }, 300)
});

onChatTextboxKeyup(function(e){

});

onChatTextboxBlur(function(e){
    chatTextboxFocused = false;
});

onMainLoop(function(e){
    // $("#chatframe").css({
    //     height: window.innerHeight
    // });
    // $("#chat_body_div").css({
    //     height: $(window).height() - 500
    // });
    if(chatTextboxFocused){
        $("#chat_body_div").css({
            height: newChatBodyHeight - 100
        })
    } else {
        $("#chat_body_div").css({
            height: window.innerHeight - 100
        })
    }
});

