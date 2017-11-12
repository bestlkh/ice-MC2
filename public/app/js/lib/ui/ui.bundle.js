(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ui = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = require('./../events/EventEmitter');

var BasicControl = function () {
    function BasicControl(dom) {
        _classCallCheck(this, BasicControl);

        this.dom = dom;
        this._visible = true;
        this._preventDefaultClick = false;
        this._onClickEmitter = new EventEmitter();

        // Bind events here
        var self = this;

        // Bind click event
        $(dom).click(function (e) {
            if (self._preventDefaultClick) {
                e.preventDefault();
            }
            self._onClickEmitter.dispatch(e);
        });
    }

    _createClass(BasicControl, [{
        key: 'visible',
        get: function get() {
            return this._visible;
        },
        set: function set(val) {
            this._visible = val;
            if (val) {
                $(this.dom).show();
            } else {
                $(this.dom).hide();
            }
        }
    }, {
        key: 'preventDefaultClick',
        set: function set(val) {
            this._preventDefaultClick = val;
        }

        /**
         * Set onClick event handler.
         * @param func
         */

    }, {
        key: 'onClick',
        set: function set(func) {
            this._onClickEmitter.handler = func;
        }
    }]);

    return BasicControl;
}();

module.exports = BasicControl;
},{"./../events/EventEmitter":4}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToolbarButton = require('./ToolbarButton');

var Toolbar = function () {
    function Toolbar(dom) {
        _classCallCheck(this, Toolbar);

        this.dom = dom;
        this._buttons = [];
    }

    /**
     * Read only buttons attribute
     * @returns {Array}
     */


    _createClass(Toolbar, [{
        key: 'addButton',


        /**
         * Add a new button to toolbar
         * @param config
         */
        value: function addButton(config) {
            var button = new ToolbarButton($(this._getToolButtonMarkup(config)));
            this._buttons.push(button);
            this.dom.append(button.dom);
        }

        /**
         * Get a toolbar button by id
         * @param id
         * @returns {*}
         */

    }, {
        key: 'getButtonById',
        value: function getButtonById(id) {
            for (var i = 0; i < this._buttons.length; i++) {
                if (this._buttons[i].dom.attr('id') === id) {
                    return this.buttons[i];
                }
            }
        }

        /**
         * Get tool button markup, you can always override this.
         * @param config
         * @returns {string}
         * @private
         */

    }, {
        key: '_getToolButtonMarkup',
        value: function _getToolButtonMarkup(config) {
            return "<div toolbar-button>" + config.innerContent + "</div>";
        }
    }, {
        key: 'buttons',
        get: function get() {
            return this._buttons;
        }
    }]);

    return Toolbar;
}();

module.exports = Toolbar;
},{"./ToolbarButton":3}],3:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicControl = require('./BasicControl');

var ToolbarButton = function (_BasicControl) {
    _inherits(ToolbarButton, _BasicControl);

    function ToolbarButton(dom) {
        _classCallCheck(this, ToolbarButton);

        return _possibleConstructorReturn(this, (ToolbarButton.__proto__ || Object.getPrototypeOf(ToolbarButton)).call(this, dom));
    }

    return ToolbarButton;
}(BasicControl);

module.exports = ToolbarButton;
},{"./BasicControl":1}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this._handlers = [];
    }

    _createClass(EventEmitter, [{
        key: "dispatch",


        /**
         * Dispatch the event
         * @param arg
         */
        value: function dispatch(arg) {
            for (var i = 0; i < this._handlers.length; i++) {
                this._handlers[i](arg);
            }
        }
    }, {
        key: "handler",
        set: function set(val) {
            this._handlers.push(val);
        }
    }]);

    return EventEmitter;
}();

module.exports = EventEmitter;
},{}],5:[function(require,module,exports){
'use strict';

var Toolbar = require('./controls/Toolbar');

module.exports = {
    Toolbar: Toolbar
};
},{"./controls/Toolbar":2}]},{},[5])(5)
});