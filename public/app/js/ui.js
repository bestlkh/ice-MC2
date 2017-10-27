onMainLoop(function(){
    var ua = window.navigator.userAgent;
    var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    var webkit = !!ua.match(/WebKit/i);
    var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
    if(iOSSafari){
        // Make sure the chat-wrapper do not go over the screen
        $("#chat-wrapper").css({
            'height': window.innerHeight
        });
    }
});

// Change interface size to adapt the soft keyboard
onChatTextBoxFocus(function(e) {
    setTimeout(function(){
        $("#chat_body_div").css({
            height: window.innerHeight - 100
        });
        window.scrollTo(0, 0);
    }, 500);
});

onChatTextBoxBlur(function(e){
    setTimeout(function(){
        $("#chat_body_div").css({
            height: window.innerHeight - 100
        });
        window.scrollTo(0, 0);
    }, 500);
});

$(window).on('resize', function(){
   window.scrollTo(0, 0);
});