'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SvgEditorSymbols = require('../enums/SvgEditorSymbols');
var SvgEditorElementTypes = require('../enums/SvgEditorElementTypes');
var SvgEditorElement = require('./SvgEditorElement');
var SvgEditorDriverSymbolNotDefinedError = require('../exceptions/SvgEditorDriverSymbolNotDefinedError');
var SvgEditorElementSize = require('./SvgEditorElementSize');
var SvgEditorElementPosition = require('./SvgEditorElementPosition');

var SymbolData = require('../data/Symbols');

/**
 * Class representing a math symbol in the editor.
 */

var SvgEditorSymbolElement = function (_SvgEditorElement) {
    _inherits(SvgEditorSymbolElement, _SvgEditorElement);

    /**
     * Construct the symbol element
     * @param width
     * @param height
     * @param x
     * @param y
     * @param symbol
     */
    function SvgEditorSymbolElement(width, height, x, y) {
        var symbol = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : SvgEditorSymbols.SUM;

        _classCallCheck(this, SvgEditorSymbolElement);

        // Check to see if symbol is defined
        var _this = _possibleConstructorReturn(this, (SvgEditorSymbolElement.__proto__ || Object.getPrototypeOf(SvgEditorSymbolElement)).call(this, width, height, x, y));

        if (SymbolData[symbol]) {
            _this._symbol = symbol;
            _this._symbolData = SymbolData[symbol];
        } else {
            throw new SvgEditorDriverSymbolNotDefinedError();
        }
        _this.type = SvgEditorElementTypes.SYMBOL;
        return _this;
    }

    /**
     * Get symbol path data, used to insert into canvas.
     * @returns {string}
     */


    _createClass(SvgEditorSymbolElement, [{
        key: 'getPathData',
        value: function getPathData() {
            return this._symbolData;
        }

        /**
         * Get current symbol enum value.
         * @returns {number|*}
         */

    }, {
        key: 'getSymbol',
        value: function getSymbol() {
            return this._symbol;
        }

        /**
         * Returns a SvgEditorElementSize object representing current size of the element.
         * @returns {SvgEditorElementSize}
         */

    }, {
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

    return SvgEditorSymbolElement;
}(SvgEditorElement);

module.exports = SvgEditorSymbolElement;