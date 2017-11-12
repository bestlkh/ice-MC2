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