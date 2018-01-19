"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SvgEditorElement = function () {

    /**
     * Base constructor
     * @param width
     * @param height
     * @param x
     * @param y
     */
    function SvgEditorElement(width, height) {
        var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

        _classCallCheck(this, SvgEditorElement);

        this._width = width;
        this._height = height;
        this._x = x;
        this._y = y;
        this.dom = null;
        this.type = -1;
    }

    /**
     * Get element size
     */


    _createClass(SvgEditorElement, [{
        key: "getSize",
        value: function getSize() {
            throw "Method getSize not implemented";
        }

        /**
         * Get element position
         */

    }, {
        key: "getPosition",
        value: function getPosition() {
            throw "Method getPosition not implemented";
        }
    }]);

    return SvgEditorElement;
}();

module.exports = SvgEditorElement;