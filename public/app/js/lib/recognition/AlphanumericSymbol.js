'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Symbol = require('./Symbol');
var SymbolTypes = require('./enums/SymbolTypes');

var AlphanumericSymbol = function (_Symbol2) {
    _inherits(AlphanumericSymbol, _Symbol2);

    /**
     * Construct AlphanumericSymbol instance.
     * @param x
     * @param y
     * @param width
     * @param height
     * @param value
     */
    function AlphanumericSymbol(x, y, width, height, value) {
        _classCallCheck(this, AlphanumericSymbol);

        return _possibleConstructorReturn(this, (AlphanumericSymbol.__proto__ || Object.getPrototypeOf(AlphanumericSymbol)).call(this, x, y, width, height, value, SymbolTypes.ALPHANUMERIC));
    }

    return AlphanumericSymbol;
}(_Symbol);

module.exports = AlphanumericSymbol;