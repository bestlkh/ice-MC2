'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Symbol = require("./Symbol");
var AlphanumericSymbol = require('./AlphanumericSymbol');
var BracketSymbol = require('./BracketSymbol');
var FractionSymbol = require('./FractionSymbol');
var LimitSymbol = require('./LimitSymbol');
var OperatorSymbol = require('./OperatorSymbol');
var RootSymbol = require('./RootSymbol');
var SymbolTypes = require('./enums/SymbolTypes');
var Constant = require('./constant');

/**
     * returns the type of Symbol given a string value
     * @param {String} value
     * @return {number}
     */
function getSymbolType(value) {
    if (Constant.BRACKET.indexOf(value) != -1) {
        return SymbolTypes.BRACKET;
    }
    if (Constant.LINE.indexOf(value) != -1) {
        return SymbolTypes.FRACTION;
    }
    if (Constant.ROOT.indexOf(value) != -1) {
        return SymbolTypes.ROOT;
    }
    if (Constant.LIMIT.indexOf(value) != -1) {
        return SymbolTypes.LIMIT;
    }
    if (Constant.OPERATOR.indexOf(value) != -1) {
        return SymbolTypes.OPERATOR;
    }
    return SymbolTypes.ALPHANUMERIC;
}

var SymbolFactory = function () {
    function SymbolFactory() {
        _classCallCheck(this, SymbolFactory);
    }

    _createClass(SymbolFactory, null, [{
        key: 'make',

        /**
         * Creates an Apropriate Symbol.
         * @param {DOM} elem
         * @returns {Symbol}
         */
        value: function make(elem) {
            if (elem.textContent == " " || elem.tagName == "g") return null;
            var rect = svgedit.utilities.getBBox(elem);
            var x = rect.x;
            var y = rect.y;
            var width = rect.width;
            var height = rect.height;
            var value = elem.nodeName == "path" ? elem.id.split('_')[3] : elem.textContent;

            var type = getSymbolType(value);
            var symbol;
            switch (type) {
                case SymbolTypes.BRACKET:
                    symbol = new BracketSymbol(x, y, width, height, value);
                    break;
                case SymbolTypes.FRACTION:
                    symbol = new FractionSymbol(x, y, width, height, value);
                    break;
                case SymbolTypes.ROOT:
                    symbol = new RootSymbol(x, y, width, height, value);
                    break;
                case SymbolTypes.LIMIT:
                    symbol = new LimitSymbol(x, y, width, height, value);
                    break;
                case SymbolTypes.ALPHANUMERIC:
                    symbol = new AlphanumericSymbol(x, y, width, height, value);
                    break;
                case SymbolTypes.OPERATOR:
                    symbol = new OperatorSymbol(x, y, width, height, value);
                    break;
                default:
                    throw "Cannot have any other symbol than type.";
                    break;
            }
            symbol.id = elem.id;
            return symbol;
        }
    }]);

    return SymbolFactory;
}();

module.exports = SymbolFactory;