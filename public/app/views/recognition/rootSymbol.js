function RootSymbol(x, y, width, height, value) {
    Symbol.apply(this, [x, y, width, height, value]);
    delete(this.region.tleft);
    delete(this.region.bleft);
    this.type = SYMBOL_TYPES.ROOT;
};

RootSymbol.prototype = Object.create(Symbol.prototype);
RootSymbol.prototype.constructor = RootSymbol;