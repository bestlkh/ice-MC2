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
        this.x = this.maxX;
        const BRACKET = ["lbracket", "(", "symbol_parenleft", "symbol_left_square_bracket", "symbol_right_square_bracket", ")", "rbracket", "symbol_parenright"]; // organization needed
        if (BRACKET.indexOf(value) < BRACKET.length / 2) {
            this.x -= this.minX;
            this.bracketType = BracketTypes.OPEN;
        } 
    }
}
module.exports = BracketSymbol;
