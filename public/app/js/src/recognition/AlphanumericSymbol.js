const Symbol = require('./Symbol');
const SymbolTypes = require('./enums/SymbolTypes');

class AlphanumericSymbol extends Symbol{
    /**
     * Construct AlphanumericSymbol instance.
     * @param x
     * @param y
     * @param width
     * @param height
     * @param value
     */
    constructor(x, y, width, height, value) {
        super(x, y, width, height, value, SymbolTypes.ALPHANUMERIC);
    }
}
module.exports = AlphanumericSymbol;
