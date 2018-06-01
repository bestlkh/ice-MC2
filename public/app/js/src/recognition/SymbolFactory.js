const Symbol = require("./Symbol")
const Symbols = require("../driver/data/Symbols");
const AlphanumericSymbol = require('./AlphanumericSymbol');
const BracketSymbol = require('./BracketSymbol');
const FractionSymbol = require('./FractionSymbol');
const LimitSymbol = require('./LimitSymbol');
const OperatorSymbol = require('./OperatorSymbol');
const RootSymbol = require('./RootSymbol');
const SymbolTypes = require('./enums/SymbolTypes');
const Constant = require('./constant');

const ASCENDING = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'b', 'd', 'f', 'h', 'i', 'k', 'l', 't']; // center = miny(top) + 2 * height /3
const DECENDING = ["g", "p", "q", "y"]; // center = miny(top) + height/3
const CENTRED = ["a", "c", "e", "j", "m", "n", "o", "r", "s", "u", "v", "w", "x", "z"]; // anything else is centered.


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

class SymbolFactory {
    /**
     * Creates an Apropriate Symbol.
     * @param {DOM} elem
     * @returns {Symbol}
     */
    static make(elem) {
        if (elem.textContent == " " || elem.tagName == "g")
            return null;
        var rect = svgedit.utilities.getBBox(elem);
        var x = rect.x;
        var y = rect.y;
        var width = rect.width;
        var height = rect.height;
        var value = elem.nodeName == "path" ? elem.id.split('_')[3] : elem.textContent;
        value = elem.id.split(/svg_eqn_\d*_/)[1];
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
                if(!Symbols[value]) {
                    break;
                }
                if (ASCENDING.indexOf(Symbols[value].tex) != -1) {
                    symbol.y = symbol.minY + 2*symbol.height/3;
                } else if (DECENDING.indexOf(Symbols[value].tex) != -1) {
                    symbol.y = symbol.minY + symbol.height/3;
                }
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
}

module.exports = SymbolFactory;