'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var alertify = require('alertifyjs');

var Notification = function () {

    /**
     * Construct the notification object
     * @param message
     * @param type
     * @param delay
     * @param callback
     */
    function Notification(message) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';
        var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
        var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

        _classCallCheck(this, Notification);

        this.message = message;
        this.type = type;
        this.delay = delay;
        this.callback = callback;
    }

    /**
     * Show the notification
     */


    _createClass(Notification, [{
        key: 'show',
        value: function show() {
            alertify.notify(this.message, this.type, this.delay, this.callback);
        }

        /**
         * Spawn a notification without new
         * @param message
         * @param type
         * @param delay
         * @param callback
         */

    }], [{
        key: 'spawn',
        value: function spawn(message) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';
            var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
            var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

            alertify.notify(message, type, delay, callback);
        }
    }]);

    return Notification;
}();

module.exports = Notification;
//# sourceMappingURL=Notification.js.map