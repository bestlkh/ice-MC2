const Symbol = require('./Symbol');
const SymbolTypes = require('./enums/SymbolTypes');

class FractionSymbol extends Symbol {
    /**
     * Construct FractionSymbol instance.

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
