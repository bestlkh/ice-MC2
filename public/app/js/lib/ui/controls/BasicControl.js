'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = require('jquery');
var EventEmitter = require('./../events/EventEmitter');

var BasicControl = function () {
    function BasicControl(dom) {
        _classCallCheck(this, BasicControl);

        this.dom = $(dom);
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
        },
        get: function get() {
            return this._preventDefaultClick;
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