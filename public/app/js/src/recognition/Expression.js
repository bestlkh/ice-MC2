const SymbolTypes = require('./enums/SymbolTypes');
const RegionTypes = require('./enums/RegionTypes');

class Expression{

      /**
     * Construct the driver instance.
     * @param region_type
     */
    constructor(region_type=RegionTypes.ROOT) {
        this.region_type = region_type;
        this.region_name = region_type; // alias
        this.wall = {
            'left': 0,
            'bottom': Infinity,
            'right': Infinity,
            'top': 0
        } // maybe create a Wall class.

        this.symbols = [];
    }

    /**
     * Add a new Symbol in this Expression.
     * @param {Symbol} symbol
     */
    addSymbol(symbol) {
        this.symbols.push(symbol);
    }

    /**
     * Set this.Wall with given parameters.
     * @param left this must be a wall if it is the only parameter
     * @param [top]
     * @param [right]
     * @param [bottom]
     */
    setWall(left, top, right, bottom) {
        if (left.left) { // given a wall
            this.wall = left;
            return;
        }
        if (left.length && left.length == 3) {
            this.wall.left = left[0][0];
            this.wall.bottom = left[0][1];
            this.wall.right = left[1][0];
            this.wall.top = left[1][1];
            return;
        }
        this.wall = {
            'left': left,
            'bottom': bottom,
            'right': right,
            'top': top
        };
    }
    /**
     * Returns true iff symbol has at 1 or more elements.
     * @returns {boolean}
     */
    hasElement() {
        return this.symbols.length > 0;
    }
    /** This applys func if this passes regionCondFunc, and each symbol in each region passes condFunc
     * Also this can be improved, but it requires some function changes in svg editor
     * @param func
     * @param [regionCondFunc]
     * @param [condFunc]
    */
    apply(func, regionCondFunc, condFunc) {
        if(!condFunc) {
            condFunc = function() {
                return true;
            }
        }
        if(!regionCondFunc) {
            regionCondFunc = function() {
                return true;
            }
        }
    
        for (var i = 0; i < this.symbols.length; i++) {
            if(this.symbols[i].value === "lim") {
                var test = false;
                for (var j = 0; j < this.symbols[i].subSymbols.length; j++) {
                    if (condFunc(this.symbols[i].subSymbols[j])) {
                        func(this.symbols[i].subSymbols[j]);
                        this.symbols[i].subSymbols[j].apply(func, function(region) {return true;}, condFunc);
                        test = true;
                    } else{
                        this.symbols[i].subSymbols[j].apply(func, regionCondFunc, condFunc);
                    }
                }
                if (test) {
                    this.symbols[i].apply(func, function(region) {return true;}, condFunc);
                } else{
                    this.symbols[i].apply(func, regionCondFunc, condFunc);
                }
            } else {
                if (condFunc(this.symbols[i])) {
                    func(this.symbols[i]);
                    this.symbols[i].apply(func, function(region) {return true;}, condFunc);
                } else{
                    this.symbols[i].apply(func, regionCondFunc, condFunc);
                }
            }
        }
    }
}
module.exports = Expression;

