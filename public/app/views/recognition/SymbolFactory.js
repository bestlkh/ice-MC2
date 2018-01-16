'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Symbol = require("./Symbol")
var AlphanumericSymbol = require('./AlphanumericSymbol');
var BracketSymbol = require('./BracketSymbol');
var Expression = require('./Expression');
var FractionSymbol = require('./FractionSymbol');
var LimitSymbol = require('./LimitSymbol');
var OperatorSymbol = require('./OperatorSymbol');
var RootSymbol = require('./RootSymbol');
var RecognitionTool = require('./RecognitionTool');

var SymbolFactory = function() {
    function SymbolFactory() {
        _classCallCheck(this, SymbolFactory);
    }

    _createClass(SymbolFactory, null, [{
        /**
         * Creates an Apropriate Symbol
         * @param {DOM} elem
         */
        key: 'make',
        value: function make(elem) {
            if (elem.textContent == " " || elem.tagName == "g")
                continue;
            let rect = svgedit.utilities.getBBox(elem);
            let x = rect.x;
            let y = rect.y;
            let width = rect.width;
            let height = rect.height;
            let value = elem.nodeName == "path" ? elem.id.split('_')[3] : elem.textContent;
                                
            let type = RecognitionTool.getSymbolType(value);
            let symbol;
            switch (type) {
                case SYMBOL_TYPES.BRACKET:
                    symbol = new BracketSymbol(x, y, width, height, value);
                    break;
                case SYMBOL_TYPES.FRACTION:
                    sybmol = new FractionSymbol(x, y, width, height, value);
                    break;
                case SYMBOL_TYPES.ROOT:
                    symbol = new RootSymbol(x, y, width, height, value);
                    break;
                case SYMBOL_TYPES.LIMIT:
                    symbol = new LimitSymbol(x, y, width, height, value);
                    break;
                case SYMBOL_TYPES.ALPHANUMERIC:
                    symbol = new AlphanumericSymbol(x, y, width, height, value);
                    break;
                case SYMBOL_TYPES.OPERATOR:
                    symbol = new OperatorSymbol(x, y, width, height, value);
                    break;
                default:
                    throw "Cannot have any other symbol than type.";
                    break;
            }
            return symbol;
        }
    }]);
    return SvgEditorElementFactory;
}

module.exports = SymbolFactory;