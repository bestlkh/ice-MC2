var latexEditor;
var chatMenu;
var ua = window.navigator.userAgent;
var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
var webkit = !!ua.match(/WebKit/i);
var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

var isMobile = $(window).width() < 732;
var chatInput;


if(window.navigator.userAgent.match(/Android 4/) && !window.navigator.userAgent.match(/Chrome/)){
    alert("Your browser is not supported by this application, please install one of the following browsers:\n" + "- Android Built-in Browser on Android 6.0+\n- Google Chrome\n- iOS Safari")
}

// Programmatically modify the textarea size
onMainLoop(function(){
    var containerWidth = $("#text-message-input-area").width();
    var toolButtonTotalWidth = 0;
    if($("#text-message-input-area").hasClass("latex-editor-shown")) {
        // Exclude the send button
        $.each($(".message-tool-button").not("#send-message-button"), function(key, val){
            toolButtonTotalWidth += $(val).outerWidth();
        });
    } else {
        // Include all tool buttons
        $.each($(".message-tool-button"), function(key, val){
            toolButtonTotalWidth += $(val).outerWidth();
        });
    }
    if($("#text-message-input-area").hasClass("latex-editor-shown")){
        $("#textArea").css({
            'width': ''
        });
        $("#send-message-button").css({
            'width': containerWidth - toolButtonTotalWidth - 30
        });
    } else {
        $("#textArea").css({
            'width': containerWidth - toolButtonTotalWidth - 30
        });
        $("#send-message-button").css({
            'width': ''
        });
    }

    tippy('.direct-chat-text-menu button', {
        size: 'large',
        touchHold: true
    });
});

// Resize dcs to let messages go from bottom to top
onMainLoop(function(){
    var containerHeight = $("#chat-body-div").height();
    var innerHeight = $("#dcs").outerHeight();
    if(containerHeight > innerHeight){
        $("#dcs").css({
            'margin-top': containerHeight - innerHeight
        })
    } else {
        $("#dcs").css({
            'margin-top': ''
        })
    }
});

// Change interface size to adapt the soft keyboard
onChatTextBoxFocus(function(e) {
    $("#chat-body-div").animate({
        scrollTop: $("#chat-body-div")[0].scrollHeight + 100
    });
});

onChatRoomInterfaceLoaded(function(){
    tippy('.message-tool-button', {
        size: 'large',
        touchHold: true
    });

    latexEditor = new CodeMirror($("#latex-editor-area")[0], {
        lineNumbers: true,
        mode:  "stex"
    });

    latexEditor.on('change', function(e) {
        $("#textArea").val(latexEditor.getValue());
    });

    // Android height 100% to fix overlap issue with bottom tool bar
    if(isMobile && window.navigator.userAgent.match(/Android/)) {
        $("#editor-frame").css({
            'height': '100%'
        })
    }

    chatInput = new UI.ChatInput("#chatroom-input-test")
});

$(window).on('resize', function(){
   window.scrollTo(0, 0);
});

showMessageRawNewWindow = function(raw){
    window.open().document.write("<pre style='word-wrap: break-word'>" + atob(raw) + "</pre>");
};


function initializeChatMenu(){
    chatMenu = new UI.BubbleMenu("#chat-menu", "#chat-menu-toggle", "#chat-menu-button-container", 50);
    chatMenu._getBubbleMenuButtonMarkup = function(config){
        return "<div id='" + config.id + "' class='chat-menu-button'>" + config.innerContent + "</div>"
    };

    var chatMembersButton = chatMenu.addButton({
        id: "test",
        innerContent: "<i class=\"fa fa-users\" aria-hidden=\"true\"></i>"
    });

    var chatHistoryButton = chatMenu.addButton({
        id: "chat-history-button",
        innerContent: "<i class=\"fa fa-history\" aria-hidden=\"true\"></i>"
    });

    chatHistoryButton.onClick = function(){
        historyWindow = window.open();
        historyWindow.document.write("<pre>" + chatLog + "</pre>")
    }

    chatMembersButton.onClick = function(){
        angular.element($("#chat-wrapper")).scope().toggleCustom();
    }
}
