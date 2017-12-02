/**
 * BubbleMenu
 * Author: Jun Zheng
 */

var $ = require('jquery');
var BasicControl = require('./BasicControl');
var BubbleMenuButton = require('./BubbleMenuButton');

class BubbleMenu extends BasicControl {
    constructor(dom, menuButtonDom, buttonContainerDom, animationSpeed = 50){
        super(dom);
        this.menuButtonDom = $(menuButtonDom);
        this.buttonContainerDom = $(buttonContainerDom);
        this.animationSpeed = animationSpeed;
        this._buttons = [];
        this._expanded = false;
        this._animations = [];
        this._initializeMenuButtonEvents();
    }

    /**
     * Return a list of buttons
     * @returns {Array}
     */
    get buttons(){
        return this._buttons;
    }

    /**
     * Add a new button to list of buttons
     * @param config
     */
    addButton(config){
        var button = new BubbleMenuButton($(this._getBubbleMenuButtonMarkup(config)));
        this._buttons.push(button);
        this.buttonContainerDom.append(button.dom);
        return button;
    }

    /**
     * Initialize menu button events, like click
     * @private
     */
    _initializeMenuButtonEvents(){
        var self = this;
        $(this.menuButtonDom).click(function(){
            if(self._expanded){
                self.contract();
            } else {
                self.expand();
            }
        });
    }

    /**
     * Expand the menu
     * Will add class ui-expanded to menuButtonDom, and add class shown to buttons staggered by delay of animationSpeed.
     * Will always set _expanded to true
     */
    expand(){
        this._expanded = true;
        this.menuButtonDom.addClass("ui-expanded");
        this._cancelAllAnimations();
        var currentDelay = 0;
        var self = this;
        for(var i = 0; i < this._buttons.length; i++){
            this._animations.push(setTimeout((function(i){
                return function(){
                    self._buttons[i].dom.addClass("shown");
                }
            })(i), currentDelay));
            currentDelay += this.animationSpeed;
        }
    }

    /**
     * Contract the menu
     * Will remove class ui-expanded to menuButtonDom, and remove class shown to buttons staggered by delay of animationSpeed in reverse.
     * Will always set _expanded to false
     */
    contract(){
        this._expanded = false;
        this.menuButtonDom.removeClass("ui-expanded");
        this._cancelAllAnimations();
        var currentDelay = 0;
        var self = this;
        for(var i = this._buttons.length - 1; i >= 0; i--){
            this._animations.push(setTimeout((function(i){
                return function(){
                    self._buttons[i].dom.removeClass("shown");
                }
            })(i), currentDelay));
            currentDelay += this.animationSpeed;
        }
    }

    /**
     * Clear all animations
     * @private
     */
    _cancelAllAnimations(){
        for(var i = 0; i < this._animations.length; i++){
            clearTimeout(this._animations[i]);
        }
        this._animations = [];
    }

    /**
     * Return HTML markup for bubble menu button, you can and should always override this.
     * @param config
     * @private
     */
    _getBubbleMenuButtonMarkup(config) {
        return "<div bubble-menu-button>" + config.innerContent + "</div>";
    }

}

module.exports = BubbleMenu;