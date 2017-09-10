function OperatorSymbol(x, y, width, height, value) {
    Symbol.apply(this, [x, y, width, height, value]);
    this.type = SYMBOL_TYPES.OPERATOR;
    delete(this.region.tleft);
    delete(this.region.above);
    delete(this.region.supers);
    delete(this.region.contains);
    delete(this.region.bleft);
    delete(this.region.below);
    delete(this.region.subsc);
}
OperatorSymbol.prototype = Object.create(Symbol.prototype);
OperatorSymbol.prototype.constructor = OperatorSymbol;