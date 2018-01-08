'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var alertify = require('alertifyjs');

var Alert = function () {

    /**
     * Construct alert
     * @param title
     * @param message
     * @param callback
     */
    function Alert(title) {
        var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        _classCallCheck(this, Alert);

        if (message && callback) {
            this.title = title;
            this.message = message;
            this.callback = callback;
        } else if (message) {
            this.title = title;
            this.message = message;
            this.callback = function () {};
        } else {
            this.title = 'Alert';
            this.message = title;
            this.callback = function () {};
        }
    }

    /**
     * Show the dialog
     */


    _createClass(Alert, [{
        key: 'show',
        value: function show() {
            alertify.alert(this.title, this.message, this.callback).set({ transition: 'zoom' });
        }

        /**
         * Show the alert without new
         * @param title
         * @param message
         * @param callback
         */

    }], [{
        key: 'spawn',
        value: function spawn(title) {
            var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            if (message && callback) {
                alertify.alert(title, message, callback).set({ transition: 'zoom' });
            } else if (message) {
                alertify.alert(title, message).set({ transition: 'zoom' });
            } else {
                alertify.alert("Alert", title).set({ transition: 'zoom' });
            }
        }
    }]);

    return Alert;
}();

module.exports = Alert;