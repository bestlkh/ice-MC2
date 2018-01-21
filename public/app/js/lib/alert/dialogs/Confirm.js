'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var alertify = require('alertifyjs');

var Confirm = function () {

    /**
     * Construct
     * @param title
     * @param message
     * @param okCallback
     * @param cancelCallback
     */
    function Confirm(title, message, okCallback) {
        var cancelCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

        _classCallCheck(this, Confirm);

        this.title = title;
        this.message = message;
        this.okCallback = okCallback;
        this.cancelCallback = cancelCallback;
    }

    /**
     * Show the notification
     */


    _createClass(Confirm, [{
        key: 'show',
        value: function show() {
            alertify.confirm(this.title, this.message, this.okCallback, this.cancelCallback).set({ transition: 'zoom' });
        }

        /**
         * Spawn a confirm window
         * @param title
         * @param message
         * @param okCallback
         * @param cancelCallback
         */

    }], [{
        key: 'spawn',
        value: function spawn(title, message, okCallback) {
            var cancelCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

            alertify.confirm(title, message, okCallback, cancelCallback).set({ transition: 'zoom' });
        }
    }]);

    return Confirm;
}();

module.exports = Confirm;