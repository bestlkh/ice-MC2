"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = require('../util/User');

var Logger = function () {
    function Logger() {
        _classCallCheck(this, Logger);

        // Create a new user instance
        this._user = new User();
        this._logs = [];
    }

    /**
     * Create a new log
     * @param data
     */


    _createClass(Logger, [{
        key: "log",
        value: function log(data) {
            var toPush = {
                data: data,
                time: new Date().toLocaleString()
            };
            console.log("New log pushed");
            console.log(JSON.stringify(toPush, null, null, 2));
            this._logs.push(toPush);
        }

        /**
         * Template to log an action
         * @param actionName
         * @param extraData
         */

    }, {
        key: "logAction",
        value: function logAction(actionName) {
            var extraData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            this.log({
                action: actionName,
                extra: extraData
            });
        }
    }]);

    return Logger;
}();

module.exports = Logger;