const Symbol = require('./Symbol');
const SymbolTypes = require('./enums/SymbolTypes');

class RootSymbol {
    /**
     * Construct RootSymbol instance.
     * //might require name change to a line
     * @param x
     * @param y
     * @param width
     * @param height
     * @param value
     */
    constructor(x, y, width, height, value) {
        super(x, y, width, height, value, SymbolTypes.ROOT);
    }
}
module.exports = RootSymbol;

// function RootSymbol(x, y, width, height, value) {
//     Symbol.apply(this, [x, y, width, height, value]);
//     //delete(this.region.tleft);
//     //delete(this.region.bleft);
//     this.type = SYMBOL_TYPES.ROOT;
// };

// RootSymbol.prototype = Object.create(Symbol.prototype);
// RootSymbol.prototype.constructor = RootSymbol;