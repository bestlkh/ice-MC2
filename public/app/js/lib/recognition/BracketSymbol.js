'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Symbol = require('./Symbol');
var SymbolTypes = require('./enums/SymbolTypes');
var BracketTypes = require('./enums/BracketTypes');

var BracketSymbol = function (_Symbol2) {
    _inherits(BracketSymbol, _Symbol2);

    /**
     * Construct BracketSymbol instance.
     * @param x
     * @param y
     * @param width
     * @param height
     * @param value
     */
    function BracketSymbol(x, y, width, height, value) {
        _classCallCheck(this, BracketSymbol);

        var _this = _possibleConstructorReturn(this, (BracketSymbol.__proto__ || Object.getPrototypeOf(BracketSymbol)).call(this, x, y, width, height, value, SymbolTypes.BRACKET));

        _this.bracketType = BracketTypes.CLOSE;
        var BRACKET = ["lbracket", "(", ")", "rbracket"]; // organization needed
        if (BRACKET.indexOf(value) < BRACKET.length / 2) {
            _this.minX -= width;
            _this.maxX -= width;
            _this.x -= width;
            _this.bracketType = BracketTypes.OPEN;
        }
        return _this;
    }

    return BracketSymbol;
}(_Symbol);

module.exports = BracketSymbol;