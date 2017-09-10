function BracketSymbol(x, y, width, height, value) {
    Symbol.apply(this, [x + width, y, 0, height, value]);
    this.type = SYMBOL_TYPES.BRACKET;
    this.bracketType = BRACKET_TYPES.CLOSE;
    if (BRACKET.indexOf(value) < BRACKET.length / 2) {
        this.minX -= width;
        this.maxX -= width;
        this.x -= width;
        this.bracketType = BRACKET_TYPES.OPEN;
        delete(this.region.above);
        delete(this.region.supers);
        delete(this.region.below);
        delete(this.region.subsc);
    }
    delete(this.region.tleft);
    delete(this.region.contains);
    delete(this.region.bleft);
    
}
BracketSymbol.prototype = Object.create(Symbol.prototype);
BracketSymbol.prototype.constructor = BracketSymbol;