const SymbolTypes = require('./enums/SymbolTypes');
const RegionTypes = require('./enums/RegionTypes');
const Expression = require('./Expression');

class Symbol {
    /**
     * Abstract Symbol instance.
     * //might require name change to a line
     * @param x
     * @param y
     * @param width
     * @param height
     * @param value
     * @param type
     */
    constructor(x, y, width, height, value, type) {
        if (this.constructor === Symbol) {
            throw new Error("Abstract Class Instatiation Error");
        }
        this.type = type;
        this.minX = x;
        this.minY = y;
        this.maxX = x + width;
        this.maxY = y + height;
        this.value = value;
        this.width = width;
        this.height = height;
        this.x = (this.minX + this.maxX)/2;
        this.y = (this.minY + this.maxY)/2;
        this.region = {};
        for (var region in RegionTypes) {
            this.region[RegionTypes[region]] = new Expression(RegionTypes[region]);
        }
        this.wall = {};
        this.size = width * height;
    }

    /**
     * Returns true iff it has any elements at top
     * @returns {boolean}
     */
    hasAnyTop() {
        return this.region[RegionTypes.TLEFT].hasElement() || this.region[RegionTypes.ABOVE].hasElement() || this.region[RegionTypes.SUPER].hasElement();
    }

    /**
     * Returns true iff it has any elements at bottom
     * @returns {boolean}
     */
    hasAnyBottom() {
        return this.region[RegionTypes.BLEFT].hasElement() || this.region[RegionTypes.BELOW].hasElement() || this.region[RegionTypes.SUBSC].hasElement();
    }

    /** 
     * Sets the wall of this Symbol.
     * @param wall
     */
    setWall(wall) {
        this.wall.top = wall.top;
        this.wall.bottom = wall.bottom;
        this.wall.left = wall.left;
        this.wall.right = wall.right;
    }
    /**
     * Returns a copy of this Symbol's wall
     * @returns {Object}
     */
    getWallCopy() {
        return {
            'top': this.wall.top,
            'bottom': this.wall.bottom,
            'left': this.wall.left,
            'right': this.wall.right,
        };
    }
    /**
     * Applies func for each regions and symbol.
     * @param func
     * @param regionCondFunc
     * @param condFunc
     */
    apply(func, regionCondFunc, condFunc) {
        for (var region_name in this.region){
            if (this.region[region_name].hasElement()) {
                var b = regionCondFunc(this.region[region_name]);
                var combinedCondFunc = function(symbol) {
                    var res = b && condFunc(symbol);
                    return res;
                };
                //if(b)
                    //  this.region[region_name].apply(func, function(region){return true}, combinedCondFunc);
                //else
                    this.region[region_name].apply(func, regionCondFunc, combinedCondFunc);
            }
        }
    }
}
module.exports = Symbol;
