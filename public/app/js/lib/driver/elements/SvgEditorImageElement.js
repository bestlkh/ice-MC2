'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SvgEditorElementTypes = require('../enums/SvgEditorElementTypes');
var SvgEditorElement = require('./SvgEditorElement');
var SvgEditorElementSize = require('./SvgEditorElementSize');
var SvgEditorElementPosition = require('./SvgEditorElementPosition');

/**
 * Class representing an image
 */

var SvgEditorImageElement = function (_SvgEditorElement) {
    _inherits(SvgEditorImageElement, _SvgEditorElement);

    /**
     * Construct the image element
     * @param width
     * @param height
     * @param x
     * @param y
     * @param base64
     */
    function SvgEditorImageElement(width, height, x, y, base64) {
        _classCallCheck(this, SvgEditorImageElement);

        var _this = _possibleConstructorReturn(this, (SvgEditorImageElement.__proto__ || Object.getPrototypeOf(SvgEditorImageElement)).call(this, width, height, x, y));

        _this._base64 = base64;
        _this.type = SvgEditorElementTypes.IMAGE;
        return _this;
    }

    /**
     * Returns a SvgEditorElementSize object representing current size of the element.
     * @returns {SvgEditorElementSize}
     */


    _createClass(SvgEditorImageElement, [{
        key: 'getSize',
        value: function getSize() {
            this._reloadSize();
            return new SvgEditorElementSize(this._width, this._height);
        }

        /**
         * Returns a SvgEditorElementPosition object representing current position of the element.
         * @returns {SvgEditorElementPosition}
         */

    }, {
        key: 'getPosition',
        value: function getPosition() {
            this._reloadPosition();
            return new SvgEditorElementPosition(this._x, this._y);
        }

        /**
         * Reload size and set the private variable. This requires DOM to be set.
         * @private
         */

    }, {
        key: '_reloadSize',
        value: function _reloadSize() {
            if (this.dom) {
                this._width = this.dom.getBoundingClientRect().width;
                this._height = this.dom.getBoundingClientRect().height;
            }
        }

        /**
         * Reload position and set the private variables. This requires DOM to be set.
         * @private
         */

    }, {
        key: '_reloadPosition',
        value: function _reloadPosition() {
            if (this.dom) {
                this._x = this.dom.getBoundingClientRect().left;
                this._y = this.dom.getBoundingClientRect().top;
            }
        }
    }]);

    return SvgEditorImageElement;
}(SvgEditorElement);

module.exports = SvgEditorImageElement;