function LimitSymbol(x, y, width, height, value) {
    Symbol.apply(this, [x, y, width, height, value]);
    delete(this.region.contains);
    this.type = SYMBOL_TYPES.LIMIT;
}
LimitSymbol.prototype = Object.create(Symbol.prototype);
LimitSymbol.prototype.constructor = LimitSymbol;