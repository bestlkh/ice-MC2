const Symbol = require('./Symbol');
const SymbolTypes = require('./enums/SymbolTypes');

class OperatorSymbol extends Symbol{
    /**
     * Construct OperatorSymbol instance.
     * //might require name change to a line
     * @param x
     * @param y
     * @param width
     * @param height
     * @param value
     */
    constructor(x, y, width, height, value) {
        super(x, y, width, height, value, SymbolTypes.OPERATOR);
    }
}
module.exports = OperatorSymbol;
