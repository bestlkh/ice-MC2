const Symbol = require('./Symbol');
const SymbolTypes = require('./enums/SymbolTypes');

class LimitSymbol extends Symbol{
    /**
     * Construct LimitSymbol instance.
     * might require name change to a line
     * @param x
     * @param y
     * @param width
     * @param height
     * @param value
     */
    constructor(x, y, width, height, value) {
        super(x, y, width, height, value, SymbolTypes.LIMIT);

    }
}
module.exports = LimitSymbol;

// function LimitSymbol(x, y, width, height, value) {
//     Symbol.apply(this, [x, y, width, height, value]);
//     //delete(this.region.contains);
//     this.type = SYMBOL_TYPES.LIMIT;
// }
// LimitSymbol.prototype = Object.create(Symbol.prototype);
// LimitSymbol.prototype.constructor = LimitSymbol;