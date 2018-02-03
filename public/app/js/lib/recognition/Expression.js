'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SymbolTypes = require('./enums/SymbolTypes');
var RegionTypes = require('./enums/RegionTypes');

var Expression = function () {

    /**
    * Construct the driver instance.
    * @param region_type
    */
    function Expression() {
        var region_type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : RegionTypes.ROOT;

        _classCallCheck(this, Expression);

        this.region_type = region_type;
        this.region_name = region_type; // alias
        this.wall = {
            'left': 0,
            'bottom': Infinity,
            'right': Infinity,
            'top': 0 // maybe create a Wall class.

        };this.symbols = [];
    }

    /**
     * Add a new Symbol in this Expression.
     * @param {Symbol} symbol
     */


    _createClass(Expression, [{
        key: 'addSymbol',
        value: function addSymbol(symbol) {
            this.symbols.push(symbol);
        }

        /**
         * Set this.Wall with given parameters.
         * @param left this must be a wall if it is the only parameter
         * @param [top]
         * @param [right]
         * @param [bottom]
         */

    }, {
        key: 'setWall',
        value: function setWall(left, top, right, bottom) {
            if (left.left) {
                // given a wall
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

    }, {
        key: 'hasElement',
        value: function hasElement() {
            return this.symbols.length > 0;
        }
        /** This applys func if this passes regionCondFunc, and each symbol in each region passes condFunc
         * Also this can be improved, but it requires some function changes in svg editor
         * @param func
         * @param [regionCondFunc]
         * @param [condFunc]
        */

    }, {
        key: 'apply',
        value: function apply(func, regionCondFunc, condFunc) {
            if (!condFunc) {
                condFunc = function condFunc() {
                    return true;
                };
            }
            if (!regionCondFunc) {
                regionCondFunc = function regionCondFunc() {
                    return true;
                };
            }

            for (var i = 0; i < this.symbols.length; i++) {
                if (this.symbols[i].value === "lim") {
                    var test = false;
                    for (var j = 0; j < this.symbols[i].subSymbols.length; j++) {
                        if (condFunc(this.symbols[i].subSymbols[j])) {
                            func(this.symbols[i].subSymbols[j]);
                            this.symbols[i].subSymbols[j].apply(func, function (region) {
                                return true;
                            }, condFunc);
                            test = true;
                        } else {
                            this.symbols[i].subSymbols[j].apply(func, regionCondFunc, condFunc);
                        }
                    }
                    if (test) {
                        this.symbols[i].apply(func, function (region) {
                            return true;
                        }, condFunc);
                    } else {
                        this.symbols[i].apply(func, regionCondFunc, condFunc);
                    }
                } else {
                    if (condFunc(this.symbols[i])) {
                        func(this.symbols[i]);
                        this.symbols[i].apply(func, function (region) {
                            return true;
                        }, condFunc);
                    } else {
                        this.symbols[i].apply(func, regionCondFunc, condFunc);
                    }
                }
            }
        }
    }]);

    return Expression;
}();

module.exports = Expression;