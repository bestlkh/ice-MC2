function AlphanumericSymbol(x, y, width, height, value) {
    Symbol.apply(this, [x, y, width, height, value]);

    this.type = SYMBOL_TYPES.TEXT;
    delete(this.region[REGION_NAMES.TLEFT]);
    delete(this.region[REGION_NAMES.BLEFT]);
    delete(this.region[REGION_NAMES.CONTAINS]);
};

AlphanumericSymbol.prototype = Object.create(Symbol.prototype);
AlphanumericSymbol.prototype.constructor = AlphanumericSymbol;