'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * BubbleMenu
 * Author: Jun Zheng
 */

var $ = require('jquery');
var BasicControl = require('./BasicControl');
var BubbleMenuButton = require('./BubbleMenuButton');

var BubbleMenu = function (_BasicControl) {
    _inherits(BubbleMenu, _BasicControl);

    function BubbleMenu(dom, menuButtonDom, buttonContainerDom) {
        var animationSpeed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;

        _classCallCheck(this, BubbleMenu);

        var _this = _possibleConstructorReturn(this, (BubbleMenu.__proto__ || Object.getPrototypeOf(BubbleMenu)).call(this, dom));

        _this.menuButtonDom = $(menuButtonDom);
        _this.buttonContainerDom = $(buttonContainerDom);
        _this.animationSpeed = animationSpeed;
        _this._buttons = [];
        _this._expanded = false;
        _this._animations = [];
        _this._initializeMenuButtonEvents();
        return _this;
    }

    /**
     * Return a list of buttons
     * @returns {Array}
     */


    _createClass(BubbleMenu, [{
        key: 'addButton',


        /**
         * Add a new button to list of buttons
         * @param config
         */
        value: function addButton(config) {
            var button = new BubbleMenuButton($(this._getBubbleMenuButtonMarkup(config)));
            this._buttons.push(button);
            this.buttonContainerDom.append(button.dom);
            return button;
        }

        /**
         * Initialize menu button events, like click
         * @private
         */

    }, {
        key: '_initializeMenuButtonEvents',
        value: function _initializeMenuButtonEvents() {
            var self = this;
            $(this.menuButtonDom).click(function () {
                if (self._expanded) {
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

    }, {
        key: 'expand',
        value: function expand() {
            this._expanded = true;
            this.menuButtonDom.addClass("ui-expanded");
            this._cancelAllAnimations();
            var currentDelay = 0;
            var self = this;
            for (var i = 0; i < this._buttons.length; i++) {
                this._animations.push(setTimeout(function (i) {
                    return function () {
                        self._buttons[i].dom.addClass("shown");
                    };
                }(i), currentDelay));
                currentDelay += this.animationSpeed;
            }
        }

        /**
         * Contract the menu
         * Will remove class ui-expanded to menuButtonDom, and remove class shown to buttons staggered by delay of animationSpeed in reverse.
         * Will always set _expanded to false
         */

    }, {
        key: 'contract',
        value: function contract() {
            this._expanded = false;
            this.menuButtonDom.removeClass("ui-expanded");
            this._cancelAllAnimations();
            var currentDelay = 0;
            var self = this;
            for (var i = this._buttons.length - 1; i >= 0; i--) {
                this._animations.push(setTimeout(function (i) {
                    return function () {
                        self._buttons[i].dom.removeClass("shown");
                    };
                }(i), currentDelay));
                currentDelay += this.animationSpeed;
            }
        }

        /**
         * Clear all animations
         * @private
         */

    }, {
        key: '_cancelAllAnimations',
        value: function _cancelAllAnimations() {
            for (var i = 0; i < this._animations.length; i++) {
                clearTimeout(this._animations[i]);
            }
            this._animations = [];
        }

        /**
         * Return HTML markup for bubble menu button, you can and should always override this.
         * @param config
         * @private
         */

    }, {
        key: '_getBubbleMenuButtonMarkup',
        value: function _getBubbleMenuButtonMarkup(config) {
            return "<div bubble-menu-button>" + config.innerContent + "</div>";
        }
    }, {
        key: 'buttons',
        get: function get() {
            return this._buttons;
        }
    }]);

    return BubbleMenu;
}(BasicControl);

module.exports = BubbleMenu;