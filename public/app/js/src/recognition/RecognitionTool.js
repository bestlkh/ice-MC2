const SymbolTypes = require('./enums/SymbolTypes');
const BracketTypes = require('./enums/BracketTypes');
const Expression = require('./Expression');
const Symbol = require('./Symbol');
const RegionTypes = require('./enums/RegionTypes');
const Constant = require('./constant');
const SymbolFactory = require('./SymbolFactory');

const Symbols = require('../driver/data/Symbols');

class RecognitionTool {
    /**
     * returns the next index of ls that is the next symbol in baseline given s
     * @param {[Symbol]} ls sorted baseline symbols
     * @param {...number} s the starting index
     * @returns the next baseline symbol index of ls, if nothing is found -1
     */
    static hor(ls, s) {
        if (ls[s].type === SymbolTypes.FRACTION ||
                (ls[s].type === SymbolTypes.BRACKET && ls[s].bracketType == BracketTypes.OPEN) ||
                    ls[s].type === SymbolTypes.OPERATOR) {
            var wall = ls[s].getWallCopy();
            var newWall = wall;
            newWall.left = ls[s].maxX;
            var st = RecognitionTool.start(ls, newWall);
            if (st == -1) {
                return -1;
            }
            return RecognitionTool.overlap(st, ls[s].wall, ls);
        }
        var index = 0;
        while (index < ls.length) {
            if (RecognitionTool.isInRegion(ls[s].wall, ls[index]) && !ls[index].marked) {
                if (ls[s].maxX <= ls[index].minX) {
                    if (ls[s].minY + 2/5 * ls[s].height <= ls[index].y
                        && ls[index].y < ls[s].maxY - ls[s].height * 1/5)
                        return RecognitionTool.overlap(index, ls[s].wall, ls);
                }
            }
            index++;
        }
        return -1;
    }

    /**
     * Returns the starting index of Baseline Tree given the boundaries in wall.
     * @param {[Symbol]} ls
     * @param {Object} wall
     * @returns index or -1 if not found any starting index.
     */
    static start(ls, wall){
        var leftMostIndex = -1;
        var limitIndex = -1;
        var i = 0;
        var overlapIndex = -1;
        var n = ls.length;
        while (leftMostIndex == -1 && i < n) {
            if (!ls[i].marked && RecognitionTool.isInRegion(wall, ls[i])) {
                leftMostIndex = i;
            }
            else {
                i += 1;
            }
        }

        if (leftMostIndex == -1 || limitIndex == leftMostIndex) {
            return leftMostIndex;
        }
        while (i < n && limitIndex == -1) {
            if (!ls[i].marked && ls[i].type === SymbolTypes.LIMIT &&
            RecognitionTool.isInRegion(wall, ls[i]))
                limitIndex = i;
            else
                i += 1;
        }

        if (limitIndex == -1 || limitIndex == leftMostIndex) {
            return RecognitionTool.overlap(leftMostIndex, wall, ls);
        }

        var upperThreshold = ls[limitIndex].maxY;
        var lowerThreshold = ls[limitIndex].minY;
        while (i > leftMostIndex) {
            i = i - 1;
            if (ls[i].y < upperThreshold && ls[i].y >= lowerThreshold) {
                overlapIndex = i;
            }
        }
        if (overlapIndex < limitIndex && overlapIndex != -1) {
            return RecognitionTool.overlap(leftMostIndex, wall, ls);
        } else {
            return RecognitionTool.overlap(limitIndex, wall, ls);
        }
    }

    /**
     * Returns the main index after checking vertically for any overlap
     * @param {number} index main index
     * @param {*} wall boundary
     * @param {[Symbol]} ls list of Symbols
     * @returns the mainline's index in ls
     */
    static overlap(index, wall, ls) {
        var i = index;
        var top = wall.top;
        var bottom = wall.bottom;
        var stop = false;
        var n = ls.length;
        var maxLength;
        if (ls[index].type === SymbolTypes.FRACTION) {
            maxLength = ls[index].width;
        } else {
            maxLength = ls[index].width;
        }

        var mainLine = -1;
        while (i > 0 && !stop) {
            if (ls[i - 1].maxX < ls[index].minX) {
                stop = true;
            } else {
                i -= 1;
            }
        }
        while (i < n && ls[i].minX < ls[index].maxX) {
            if (!ls[i].marked &&
            ls[i].type === SymbolTypes.Fraction &&
            ls[i].y > top &&
            ls[i].y <= bottom &&
            ls[i].minX <= ls[index].x &&
            ls[i].width > maxLength) {
                maxLength = ls[i].width;
                mainLine = i;
            } else {
                i++;
            }
        }

        if (mainLine == -1) {
            return index;
        } else {
            return mainLine;
        }
    }

    /**
     * Returns true iff the element is in the wall.
     * @param {*} wall
     * @param {*} element
     * @returns true iff element is in the wall.
     */
    static isInRegion(wall, element) {
        if (wall.left <= element.x) {
            if (element.x < wall.right) {
                if (wall.top <= element.y){
                    if (element.y <= wall.bottom) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * Returns a Baseline structure tree constructed given a sorted array of Symbols
     * @param {[Symbol]} [ls] sorted array of svg elements, if not given graps all on svg Canvas
     * @returns {Expression}
     */
    static parse(ls=null){
        if(!ls) {
            ls = [];
            var eqns = svgCanvas.getSelectedElems().slice(0);
            if(eqns.__proto__.length == 0) {
                eqns = document.querySelectorAll('[id^="svg_eqn_"]');
            }
            for (let i = 0; i < eqns.length; i++) {
                let e = SymbolFactory.make(eqns[i]);
                if(e) {
                    ls.push(e);
                }
            }
        }
        ls.sort(function(a, b) {
            var result = a.minX - b.minX;
            if (result == 0) {
                return a.minY - b.minY;
            }
            return result;
        });

        var expression = new Expression();
        var stack = [];
        var queue = [];
        var temp1, temp2;
        var parent, symbol, relation;
        var wall = expression.wall;

        var s = RecognitionTool.start(ls, wall);

        if (s != -1) {
            ls[s].setWall(wall); //deep copy
            queue.push([s, expression]);
            ls[s].marked = true;
        }
        while (queue.length != 0) {
            while (queue.length != 0) {
                [temp1, parent] = queue.shift();
                symbol = ls[temp1];
                symbol.marked = true;
                parent.symbols.push(symbol);
                stack.push([temp1, symbol]);
                wall = ls[temp1].wall;
                temp2 = RecognitionTool.hor(ls, temp1);
                while(temp2 != -1) {
                    var oldWall = ls[temp1].wall;
                    ls[temp2].setWall(oldWall);
                    symbol = ls[temp2];
                    var parentSize = parent.symbols.length;
                    /** 
                       if (symbol.value === "m" && parentSize >= 2 && parent.symbols[parentSize - 1].value === "i" && parent.symbols[parentSize - 2].value === "l") {
                        var iSymbol = parent.symbols[parentSize - 1];
                        var lSymbol = parent.symbols[parentSize - 2];
                        var newX = lSymbol.minX;
                        var newY = lSymbol.minY;
                        var newWidth = symbol.x + symbol.width - newX;
                        var newHeight = lSymbol.height;
                        var newLimitSymbol = new LimitSymbol(newX, newY, newWidth, newHeight, "lim");
                        newLimitSymbol.setWall(oldWall);
                        newLimitSymbol.subSymbols = [lSymbol, iSymbol, symbol]; // fix when moving aronud actual symbols.
                        symbol = newLimitSymbol;
                        ls[temp2] = symbol;
                        //console.log(ls.popls.indexOf(parent.symbols[parentSize -2]))
                        //console.log(ls.indexOf(parent.symbols[parentSize -1]))
                        stack.splice(stack.indexOf([ls.indexOf(lSymbol), lSymbol]), 1);
                        stack.splice(stack.indexOf([ls.indexOf(iSymbol), iSymbol]), 1);
                        parent.symbols.pop();
                        parent.symbols.pop();
                    }
                    */
                    parent.symbols.push(symbol);
                    stack.push([temp2, symbol]);
                    ls[temp1].wall.right = ls[temp2].minX;
                    if (ls[temp2].type === SymbolTypes.LIMIT &&
                        (ls[temp1].type === SymbolTypes.BRACKET || ls[temp1].type === SymbolTypes.FRACTION)) {
                        ls[temp2].wall.left = ls[temp1].maxX;
                    }
                    temp1 = temp2;
                    ls[temp1].marked = true;
                    temp2 = RecognitionTool.hor(ls, temp1);
                }
                stack.push("EOBL");
                while(stack.length != 0) {
                    if(stack[stack.length - 1] === "EOBL") {
                        stack.pop();
                    }
                    [temp1, symbol] = stack.pop();
                    var top = symbol.wall.top;
                    var bottom = symbol.wall.bottom;
                    var si = parent.symbols.indexOf(symbol);
                    var right = (si == (parent.symbols.length - 1)) ? symbol.wall.right : parent.symbols[si + 1].minX;
                    var left = symbol.minX;
                    if (symbol.type === Constant.SYMBOL_TYPES.LIMIT) {
                        if (si == 0) {
                            left = wall.left;
                        } else if (parent.symbols[si - 1].type === Constant.SYMBOL_TYPES.BRACKET) {
                            left = parent.symbols[si - 1].maxX;
                        } else if (parent.symbols[si - 1].type === Constant.SYMBOL_TYPES.FRACTION) {
                            left = parent.symbols[si - 1].maxX;
                        }
                    }

                    var minX = symbol.minX;
                    var maxX = symbol.maxX;
                    var minY = symbol.minY;
                    var maxY = symbol.maxY;
                    var upperThreshold = minY + 2/7 * (maxY - minY);
                    var lowerThreshold = maxY - 2/7 * (maxY - minY);

                    var above = [[minX, minY], [maxX, top], RegionTypes.ABOVE];
                    var below = [[minX, bottom], [maxX, maxY], RegionTypes.BELOW];
                    var supers = [[maxX, upperThreshold], [right, top], RegionTypes.SUPER];
                    var subsc = [[maxX, bottom], [right, lowerThreshold], RegionTypes.SUBSC];
                    var tleft = [[left, upperThreshold], [minX, top], RegionTypes.TLEFT];
                    var bleft = [[left, bottom], [minX, lowerThreshold], RegionTypes.BLEFT];
                    var contains = [[minX, maxY], [maxX, minY], RegionTypes.CONTAINS];
                    var region_walls = [above, below, supers, subsc, tleft, bleft, contains];
                    var regions = [RegionTypes.ABOVE, RegionTypes.BELOW, RegionTypes.SUPER, RegionTypes.SUBSC, RegionTypes.TLEFT, RegionTypes.BLEFT, RegionTypes.CONTAINS];
                    for (var i = 0; i < regions.length; i++) {
                        symbol.region[regions[i]].setWall(region_walls[i]);
                        temp2 = RecognitionTool.start(ls, symbol.region[regions[i]].wall);
                        if (temp2 != -1) {
                            ls[temp2].marked = true;
                            ls[temp2].setWall(symbol.region[regions[i]].wall);
                            relation = symbol.region[regions[i]];
                            queue.push([temp2, relation]);
                        }
                    }

                }
            }
        }
        return expression;
    }

    /**
     * Given an Expression (Baseline Structure Tree), generates and returns TEX
     * @param {Expression} [bst] Baseline Structure Tree
     */
    static getTex(bst=RecognitionTool.parse()) {
        var result = "";
        if (bst.symbols){

            if (bst.region_name == RegionTypes.ROOT) {
                result += "$$";
            }
            for (var i = 0; i < bst.symbols.length; i++) {
                var lastTex = RecognitionTool.getTex(bst.symbols[i]);
                result += lastTex;
            }
            if(result.indexOf("lim")>=0){
                    result = result.replace('li ', ' ');
                }

            if (bst.region_name == RegionTypes.ROOT) {
                result += "$$";
                result = result.replace(/arcsin|arccos|arctan|cosh|sinh|tanh|cos|sin|tan/gi, function(x) {return " \\" + x + " ";})
            }
            return result;
        }
        var value = bst.value;
        var symbol = bst;
        var type = bst.type;
        if (type === SymbolTypes.LIMIT) {
            result += (Symbols[value] ? Symbols[value].tex : Constant.TEX_TEXT[value]) + " ";
            if(bst.hasAnyBottom())
                result += "_{" + RecognitionTool.getTex(bst.region[RegionTypes.BLEFT])
                            + RecognitionTool.getTex(bst.region[RegionTypes.BELOW])
                                + RecognitionTool.getTex(bst.region[RegionTypes.SUBSC]) + "} ";
            if(bst.hasAnyTop())
            result += "^{"
                    + RecognitionTool.getTex(bst.region[RegionTypes.TLEFT])
                        + RecognitionTool.getTex(bst.region[RegionTypes.ABOVE])
                            + RecognitionTool.getTex(bst.region[RegionTypes.SUPER]) + "} ";
        } else if (type === SymbolTypes.FRACTION) {
            if (bst.hasAnyTop() && bst.hasAnyBottom()) {
                result += Constant.TEX_TEXT["fraction"];
                result += "{"
                result += RecognitionTool.getTex(bst.region[RegionTypes.TLEFT])
                            + RecognitionTool.getTex(bst.region[RegionTypes.ABOVE])
                                + RecognitionTool.getTex(bst.region[RegionTypes.SUPER]);
                result += "}{";
                result += RecognitionTool.getTex(bst.region[RegionTypes.BLEFT])
                            + RecognitionTool.getTex(bst.region[RegionTypes.BELOW])
                                + RecognitionTool.getTex(bst.region[RegionTypes.SUBSC]);
                result += "} ";
             } else if (bst.hasAnyBottom()) {
                result += Constant.TEX_TEXT['overline'];
                result += "{" + RecognitionTool.getTex(bst.region[RegionTypes.BLEFT])
                                + RecognitionTool.getTex(bst.region[RegionTypes.BELOW])
                                    + RecognitionTool.getTex(bst.region[RegionTypes.SUBSC]) + "}";
            } else if (bst.hasAnyTop()) {
                result += Constant.TEX_TEXT['underline'];
                result += "{" + RecognitionTool.getTex(bst.region[RegionTypes.TLEFT])
                                + RecognitionTool.getTex(bst.region[RegionTypes.ABOVE])
                                    + RecognitionTool.getTex(bst.region[RegionTypes.SUPER]) + "}";
            }
            else {
                result += ' - ';
            }


        } else if (type === SymbolTypes.ROOT) {
            result += (Symbols[value] ? Symbols[value].tex : Constant.TEX_TEXT[value]) + "{" + RecognitionTool.getTex(bst.region[RegionTypes.CONTAINS]) + "} ";
            if (bst.region[RegionTypes.SUPER].hasElement()) {
                result += "^{" + RecognitionTool.getTex(bst.region[RegionTypes.SUPER]) +"} ";
            }
            if (bst.region[RegionTypes.SUBSC].hasElement()) {
                result += "_{" + RecognitionTool.getTex(bst.region[RegionTypes.SUBSC]) +"} ";
            }
        } else if (type === SymbolTypes.BRACKET) {
            result += (Symbols[value] ? Symbols[value].tex : Constant.TEX_TEXT[value]);
            if (symbol.bracketType == Constant.BRACKET_TYPES.CLOSE) {
                if (bst.region[RegionTypes.SUPER].hasElement()) {
                    result += "^{" + RecognitionTool.getTex(bst.region[RegionTypes.SUPER]) +"}";
                }
                if (bst.region[RegionTypes.SUBSC].hasElement()) {
                    result += "_{" + RecognitionTool.getTex(bst.region[RegionTypes.SUBSC]) +"} ";
                }
            }
        } else if (type == SymbolTypes.OPERATOR) {
            result += (Symbols[value] ? Symbols[value].tex : Constant.TEX_TEXT[value]);
        } else {
            result += Symbols[value].tex;
            if (bst.region[RegionTypes.SUPER].hasElement()) {
                result += "^{" + RecognitionTool.getTex(bst.region[RegionTypes.SUPER]) +"}";
            }
            if (bst.region[RegionTypes.SUBSC].hasElement()) {
                result += "_{" + RecognitionTool.getTex(bst.region[RegionTypes.SUBSC]) +"}";
            }
        }
        return result;
    }


}

module.exports = RecognitionTool;
