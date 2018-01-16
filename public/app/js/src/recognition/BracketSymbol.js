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
    }
}
module.exports = BracketSymbol;


// function BracketSymbol(x, y, width, height, value) {
//     Symbol.apply(this, [x + width, y, 0, height, value]);
//     this.type = SYMBOL_TYPES.BRACKET;
//     this.bracketType = BRACKET_TYPES.CLOSE;
//     if (BRACKET.indexOf(value) < BRACKET.length / 2) {
//         this.minX -= width;
//         this.maxX -= width;
//         this.x -= width;
//         this.bracketType = BRACKET_TYPES.OPEN;
//         //delete(this.region.above);
//         //delete(this.region.supers);
//         //delete(this.region.below);
//         //delete(this.region.subsc);
//     }
//     //delete(this.region.tleft);
//     //delete(this.region.contains);
//     //delete(this.region.bleft);
    
// }
// BracketSymbol.prototype = Object.create(Symbol.prototype);
// BracketSymbol.prototype.constructor = BracketSymbol;