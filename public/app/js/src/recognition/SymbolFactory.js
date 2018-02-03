const Symbol = require("./Symbol")
const AlphanumericSymbol = require('./AlphanumericSymbol');
const BracketSymbol = require('./BracketSymbol');
const FractionSymbol = require('./FractionSymbol');
const LimitSymbol = require('./LimitSymbol');
const OperatorSymbol = require('./OperatorSymbol');
const RootSymbol = require('./RootSymbol');
const SymbolTypes = require('./enums/SymbolTypes');
const Constant = require('./constant');


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
}

module.exports = SymbolFactory;