'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SvgEditorSymbols = require('../enums/SvgEditorSymbols');
var SvgEditorElement = require('./SvgEditorElement');
var SvgEditorDriverSymbolNotDefinedError = require('../exceptions/SvgEditorDriverSymbolNotDefinedError');

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
        var symbol = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "SUM";

        _classCallCheck(this, SvgEditorSymbolElement);

        var _this = _possibleConstructorReturn(this, (SvgEditorSymbolElement.__proto__ || Object.getPrototypeOf(SvgEditorSymbolElement)).call(this, width, height, x, y));

        if (!symbol in SvgEditorSymbols) {
            throw new SvgEditorDriverSymbolNotDefinedError();
        } else {
            _this._symbol = symbol;
        }
        return _this;
    }

    _createClass(SvgEditorSymbolElement, [{
        key: 'getSize',
        value: function getSize() {}
    }, {
        key: 'getPosition',
        value: function getPosition() {}
    }]);

    return SvgEditorSymbolElement;
}(SvgEditorElement);

module.exports = SvgEditorSymbolElement;