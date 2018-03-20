const Symbol = require('./Symbol');
const SymbolTypes = require('./enums/SymbolTypes');
const BracketTypes = require('./enums/BracketTypes');

class BracketSymbol extends Symbol {
    /**
     * Construct BracketSymbol instance.
     * @param x
     * @param y
     * @param width
     * @param height
     * @param value
     */
    constructor(x, y, width, height, value) {
        super(x, y, width, height, value, SymbolTypes.BRACKET);
        this.bracketType = BracketTypes.CLOSE;
        const BRACKET = ["lbracket", "(", ")", "rbracket"]; // organization needed
        if (BRACKET.indexOf(value) < BRACKET.length / 2) {
            this.minX -= width;
            this.maxX -= width;
            this.x -= width;
            this.bracketType = BracketTypes.OPEN;
        }
        ;
    }
}
module.exports = BracketSymbol;
