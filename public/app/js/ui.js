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
        if($(window).width() > 732){
            // Include all tool buttons
            $.each($(".message-tool-button").not("#send-message-button").not("#equation-editor-button").not("#text-message-input-extra-symbols .latex-editor-symbol-button"), function(key, val){
                toolButtonTotalWidth += $(val).outerWidth();
            });
        } else {
            // Include all tool buttons
            $.each($(".message-tool-button").not("#send-message-button").not("#text-message-input-extra-symbols .latex-editor-symbol-button"), function(key, val){
                toolButtonTotalWidth += $(val).outerWidth();
            });
        }
    } else {
        if($(window).width() > 732){
            // Include all tool buttons
            $.each($(".message-tool-button").not(".latex-editor-symbol-button").not("#equation-editor-button"), function(key, val){
                toolButtonTotalWidth += $(val).outerWidth();
            });
        } else {
            // Include all tool buttons
            $.each($(".message-tool-button").not(".latex-editor-symbol-button"), function(key, val){
                toolButtonTotalWidth += $(val).outerWidth();
            });
        }
    }


    if($("#text-message-input-area").hasClass("latex-editor-shown")){
        $(".latex-editor-symbol-button").show();
        $("#textArea").css({
            'width': ''
        });
        $("#send-message-button").css({
            'width': containerWidth - toolButtonTotalWidth - 32
        });
    } else {
        $(".latex-editor-symbol-button").hide();
        $("#textArea").css({
            'width': containerWidth - toolButtonTotalWidth - 32
        });
        $("#send-message-button").css({
            'width': ''
        });
    }

    tippy('.chat-text-menu button', {
        size: 'large',
        touchHold: true
    });
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
        return `<div id=${config.id} class=chat-menu-button title=${config.title}> ${config.innerContent} </div>`
    };

    let chatMembersButton = chatMenu.addButton({
        id: "online-users",
        title: "'Online Users'",
        innerContent: "<i class=\"fa fa-users\" ></i>"
    });
    
    let logoutButton = chatMenu.addButton({
        id: "logout-button",
        title: "Logout",
        innerContent: "<i class=\"fa fa-sign-out\" ></i>"
    });

    chatMembersButton.onClick = function(){
        angular.element($("#chat-wrapper")).scope().toggleCustom();
    };

    // Log the user out
    logoutButton.onClick = function(){
        Alert.Confirm.spawn("Are you sure?", "Are you sure you want to logout?", function(){
            angular.element($("#chat-wrapper")).scope().logout();
        });
    };

    tippy('.chat-menu-button', {
        size: 'large',
        touchHold: true,
        placement: 'left'
    });
}
