/*
 mobile.js
 Author: Jun Zheng (junthehacker) me at jackzh dot com
 Description: Mobile user interface scripts
 */

var MobileUI = {
    toolbarTopPositionInterval: null,
    mounted: false,
    mount: function(){
        this.mounted = true;
        $("#tools_left, .tool_button, body").addClass("mobile");
        this.toolbarTopPositionInterval = setInterval(function(){
            // Find FloatingLayer position
            var keyboardY = $("#FloatingLayer").position().top;
            $("#tools_left").css({
                'top': keyboardY - 50
            });
        }, 100);
    },
    dismount: function(){
        this.mounted = false;
        $("#tools_left, .tool_button, body").removeClass("mobile");
        clearInterval(this.toolbarTopPositionInterval);
        $("#tools_left").css({
            'top': 30
        });
    },
    bindWindowResize: function(){
        var self = this;
        $(window).on('resize', function(){
            self.autoMount();
        });
        // Call it on start as well.
        this.autoMount();
    },
    autoMount: function(){
        if($(window).width() > MOBILE_UI_MAX_WIDTH){
            this.dismount();
        } else {
            if(!this.mounted){
                this.mount();
            }
        }
    }
};

$(function(){
    MobileUI.bindWindowResize();
    // Ugly fix to highlight tool_select button
    $('#tool_select').addClass('tool_button_current').removeClass('tool_button');
});