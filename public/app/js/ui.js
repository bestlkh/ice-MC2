onMainLoop(function(){
    var ua = window.navigator.userAgent;
    var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    var webkit = !!ua.match(/WebKit/i);
    var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
    if(iOSSafari){
        // Weird bug on iOS Safari, so just keep scrolling to top
        // window.scrollTo(0, 0);
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