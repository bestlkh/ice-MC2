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

// Programmatically modify the textarea size
onMainLoop(function(){
    var containerWidth = $("#text-message-input-area").width();
    var toolButtonTotalWidth = 0;
    $.each($(".message-tool-button"), function(key, val){
        toolButtonTotalWidth += $(val).outerWidth();
    });
    $("#textArea").css({
        'width': containerWidth - toolButtonTotalWidth - 10
    })

    $("#chat_body_div").height($(window).innerHeight() - $("#chatroom-footer").outerHeight() - 45);
});

// Change interface size to adapt the soft keyboard
onChatTextBoxFocus(function(e) {
    setTimeout(function(){
        // $("#chat_body_div").css({
        //     height: window.innerHeight - 100
        // });
        window.scrollTo(0, 0);

        setTimeout(function(){
            // $(".direct-chat-messages").scrollTop($(".direct-chat-messages")[0].scrollHeight);
            // $("#chat_body_div").animate({
            //     scrollTop: $("#chat_body_div")[0].scrollHeight + 100
            // });
        }, 300);
    }, 500);
});

onChatTextBoxBlur(function(e){
    setTimeout(function(){
        // $("#chat_body_div").css({
        //     height: window.innerHeight - 100
        // });
        window.scrollTo(0, 0);
    }, 500);
});

$(window).on('resize', function(){
   window.scrollTo(0, 0);
});