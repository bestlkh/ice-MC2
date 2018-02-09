/*
 mobile.js
 Author: Jun Zheng (junthehacker) me at jackzh dot com
 Description: Mobile user interface scripts
 */

var MobileUI = {
    toolbarTopPositionInterval: null,
    mounted: false,
    keyboardShown: false,

    /**
     * () -> void
     * Mount the mobile UI
     */
    mount: function(){
        var self = this;
        this.mounted = true;
        $("#tools_left, .tool_button, body").addClass("mobile");
        this.toolbarTopPositionInterval = setInterval(function(){
            // Find FloatingLayer position
            var keyboardY = $("#FloatingLayer").position().top;
            if(!self.keyboardShown){
                keyboardY = $(window).height();
            }
            $("#tools_left").css({
                'top': keyboardY - 50
            });
        }, 100);
    },

    /**
     * () -> void
     * Dismount the mobile UI
     */
    dismount: function(){
        this.mounted = false;
        $("#tools_left, .tool_button, body").removeClass("mobile");
        clearInterval(this.toolbarTopPositionInterval);
        $("#tools_left").css({
            'top': 30
        });
    },

    /**
     * () -> void
     * Bind browser window resize event, and automatically mount mobile UI
     */
    bindWindowResize: function(){
        var self = this;
        $(window).on('resize', function(){
            self.autoMount();
        });
        // Call it on start as well.
        this.autoMount();
    },

    /**
     * () -> void
     * Mount mobile UI if width > MOBILE_UI_MAX_WIDTH, dismount otherwise
     */
    autoMount: function(){
        if($(window).width() > MOBILE_UI_MAX_WIDTH){
            this.dismount();
        } else {
            if(!this.mounted){
                this.mount();
            }
        }
    },

    /**
     * () -> void
     * Hide the keyboard
     */
    hideKeyboard: function(){
        $(".tools_flyout").css({
            'bottom': -500,
            'opacity': 0
        }, 100);
        $("#tool_toggle_keyboard").css({
            'background-image': 'url(\'images/keyboard-up.svg\')'
        });
        this.keyboardShown = false;
    },

    /**
     * () -> void
     * Show the keyboard
     */
    showKeyboard: function(){
        // for dynamic footer toolbar height
        let keyboard_bottom = $("#tools_left").height();
        $(".tools_flyout").css({
            'bottom':  keyboard_bottom,
            'opacity': 1
        });
        $("#tool_toggle_keyboard").css({
            'background-image': 'url(\'images/keyboard.svg\')'
        });
        this.keyboardShown = true;
    },

    /**
     * () -> void
     * Toggle the keyboard, this method is mainly used to bind tool button events
     */
    toggleKeyboard: function(){
        if(MobileUI.keyboardShown){
            MobileUI.hideKeyboard();
        } else {
            MobileUI.showKeyboard();
        }
    }
};

$(function(){
    $('#tool_select').addClass('tool_button_current').removeClass('tool_button');
});