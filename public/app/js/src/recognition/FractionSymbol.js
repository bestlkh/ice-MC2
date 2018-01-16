const Symbol = require('./Symbol');
const SymbolTypes = require('./enums/SymbolTypes');

class FractionSymbol {
    /**
     * Construct FractionSymbol instance.
     * //might require name change to a line
     * @param x
     * @param y
     * @param width
     * @param height
     * @param value
     */
    constructor(x, y, width, height, value) {
        super(x, y, width, height, value, SymbolTypes.FRACTION);
    }
}
module.exports = FractionSymbol;


// function FractionSymbol(x, y, width, height, value) {
//     Symbol.apply(this, [x, y, width, height, value]);
//     //delete(this.region.contains);
//     this.type = SYMBOL_TYPES.FRACTION;
// }
// FractionSymbol.prototype = Object.create(Symbol.prototype);
// FractionSymbol.prototype.constructor = FractionSymbol;