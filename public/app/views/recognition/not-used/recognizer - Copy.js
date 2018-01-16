var REGIONS = ["ABOVE", "BELOW", "SUPER", "SUBSC", "TLEFT", "BLEFT", "CONTAINS"];
var PT_REGIONS = ["ABOVE", "BELOW", "SUPER", "SUBSC", "ULIMIT", "BLIMIT", "CONTAINS"];

var CENTRED = ["a", "c", "e", "j", "m", "n", "o", "r", "s", "u", "v", "w", "x", "z"];
var DECENDING = ["g", "p", "q", "y"];
var LIMIT = ["sum", "integral"];
var TEX_TEXT = {"sum": "\\sum", "fraction": "\\frac", "root": "\\sqrt", "integral": "\\int"};
var BRACKET = ["lbracket", "rbracket"];
var LINE = ["fraction"];
var ROOT = ["root"];


function getBST() {
    var eqns = document.querySelectorAll('[id^="svg_eqn_"]');
    var items = [];
    for (i = 0; i < eqns.length; i++) {
        if (eqns[i].textContent == " ")
            continue;
        var rect = eqns[i].getBoundingClientRect();
        var item = {
            "minX": rect.left,
            "maxX": rect.right,
            "minY": 760 - rect.bottom,
            "maxY": 760 - rect.top,
            "width": rect.width,
            "height": rect.height,
            "type":"TEXT",
            "value":eqns[i].nodeName == "path" ? eqns[i].id.split('_')[3] : eqns[i].textContent
        }
        item.x = (item.minX + item.maxX)/2;
        item.y = (item.minY + item.maxY)/2;
        if (CENTRED.indexOf(item.value) != -1) {
            item.allignment = "CENTRED";
        } else if (ROOT.indexOf(item.value) != -1) {
            item.allignment = "CENTRED";
            item.type = "ROOT";

        } else if (DECENDING.indexOf(item.value) != -1) {
            item.allignment = "DECENDING";
            item.y = item.minY + 3*(item.maxY - item.minY)/4;
        } else if (LIMIT.indexOf(item.value) != -1) {
            item.allignment = "LIMIT";
            item.type = "LIMIT";
        } else if (LINE.indexOf(item.value) != -1) {
            item.allignment = "LINE";
            item.type = "LINE";
        } else if (BRACKET.indexOf(item.value) != -1) {
            item.allignment = "BRACKET";
            item.type = "BRACKET";
            if(item.value[0] === "l") {
                item.x = item.minX;
            } else {
                item.x = item.maxX;
            }
            item.x
        } else {
            item.allignment = "ASCENDING";
            //item.y = item.minY + (item.maxY - item.minY)/4;
        }
        items.push(item);
    }
    items.sort(function(a, b) {
        var result = a.minX - b.minX;
        if (result == 0) {
            return a.minY - b.minY;
        }
        return result;
    });
    console.log(items);
    var bst = parse(items);
    console.log(bst);
    getParseTree(bst);
    var tex = getTex(bst);
    alert(tex);

};

function parse(ls){
    var root = {
        "children": [],
        //"region": "TREE_ROOT"
    };
    var stack = [];
    var queue = [];
    var temp1, temp2;
    var parent, symbol, relation;
    var r = [[0, 0], [Infinity, Infinity]];

    var s = start(ls, r);

    if (s != -1) {
        ls[s].wall = [[r[0][0], r[0][1]], [r[1][0], r[1][1]]]; //deep copy
        queue.push([s, root]);
        ls[s].marked = true;
    }
    while (queue.length != 0) {
        while (queue.length != 0) {
            [temp1, parent] = queue.shift();
            symbol = {
                "symbol":  ls[temp1],
                "value": ls[temp1].value,
                "children": [],
                //"region": "BASELINE"
            };
            parent.children.push(symbol);
            stack.push([temp1, symbol]);
            r = [[ls[temp1].wall[0][0], ls[temp1].wall[0][1]], [ls[temp1].wall[1][0], ls[temp1].wall[1][1]]];
            temp2 = hor(ls, temp1);
            while(temp2 != -1) {
                ls[temp2].marked = true;
                var oldWall = ls[temp1].wall;
                ls[temp2].wall = [[oldWall[0][0], oldWall[0][1]], [oldWall[1][0], oldWall[1][1]]];
                symbol = {
                    "symbol": ls[temp2],
                    "value": ls[temp2].value,
                    "children": [],
                    //"region": "BASELINE"
                };
                parent.children.push(symbol);
                stack.push([temp2, symbol]);
                ls[temp1].wall[1][0] = ls[temp2].minX;
                if (ls[temp2].type === "LIMIT" && 
                (ls[temp1].type === "BRACKET" || ls[temp1].type === "LINE")) {
                    ls[temp2].wall[0][0] = ls[temp1].maxX;
                }
                temp1 = temp2;
                temp2 = hor(ls, temp1);
            }
            stack.push("EOBL");
            while(stack.length != 0) {
                if(stack[stack.length - 1] === "EOBL") {
                    stack.pop();
                }
                [temp1, symbol] = stack.pop();
                var [top, bottom] = [r[1][1], r[0][1]];
                var si = parent.children.indexOf(symbol);
                var right = (si == (parent.children.length - 1)) ? r[1][0] : parent.children[si + 1].symbol.minX;
                var left = symbol.symbol.minX;
                if (symbol.symbol.type === "LIMIT") {
                    if (si == 0) {
                        left = r[0][0];
                    } else if (parent.children[si - 1].symbol.type === "BRAKET") {
                        left = parent.children[si - 1].symbol.maxX;
                    } else if (parent.children[si - 1].symbol.type === "LINE") {
                        left = parent.children[si - 1].symbol.maxX;
                    }
                }
                
                var minX = symbol.symbol.minX;
                var maxX = symbol.symbol.maxX;
                var minY = symbol.symbol.minY;
                var maxY = symbol.symbol.maxY;
                var lowerThreshold = minY + 2/5 * (maxY - minY);
                var upperThreshold = maxY - 2/5 * (maxY - minY);

                var above = [[minX, maxY], [maxX, top], "ABOVE"];
                var below = [[minX, bottom], [maxX, minY], "BELOW"];
                var supers = [[maxX, upperThreshold], [right, top], "SUPER"];
                var subsc = [[maxX, bottom], [right, lowerThreshold], "SUBSC"];
                var tleft = [[left, upperThreshold], [minX, top], "TLEFT"];
                var bleft = [[left, bottom], [minX, lowerThreshold], "BLEFT"];
                var contains = [[minX, minY], [maxX, maxY], "CONTAINS"];

                var regions = [above, below, supers, subsc, tleft, bleft, contains];
                for (var i = 0; i < regions.length; i++) {
                    temp2 = start(ls, regions[i]);
                    if (temp2 != -1) {
                        ls[temp2].marked = true;
                        ls[temp2].wall = regions[i];
                        relation = {
                            "children": [],
                            //"region": regions[i][2]
                        };
                        //symbol.children.push(relation);
                        symbol[regions[i][2]] = relation;
                        queue.push([temp2, relation]);
                    }
                }
                
            }
        }
    }
    return root;
}

function isInRegion(r, element) {
    var [left, bottom] = r[0];
    var [right, top] = r[1];
    if (left <= element.x) {
        if (element.x < right) {
            if (bottom <= element.y){
                if (element.y <= top) {
                    return true;
                }
            }
        }
    }
    return false;
}

function start(ls, r){
    var leftMostIndex = -1;
    var limitIndex = -1;
    var i = 0;
    var overlapIndex = -1;
    var n = ls.length;
    while (leftMostIndex == -1 && i < n) {
        if (!ls[i].marked && isInRegion(r, ls[i])) {
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
        if (!ls[i].marked && ls[i].type === "LIMIT" && 
        isInRegion(r, ls[i]))
            limitIndex = i;
        else
            i += 1;
    }

    if (limitIndex == -1 || limitIndex == leftMostIndex) {
        return overlap(leftMostIndex, r, ls);
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
        return overlap(leftMostIndex, r, ls);
    } else {
        return overlap(limitIndex, r, ls);
    }
}

function overlap(index, r, ls) {
    var i = index;
    var top = r[1][1];
    var bottom = r[0][1];
    var stop = false;
    var n = ls.length;
    var maxLength;
    if (ls[index].type === "LINE") {
        maxLength = ls[index].width;
    } else {
        maxLength = -1;
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
        ls[i].type === "LINE" &&
        ls[i].y < top &&
        ls[i].y >= bottom && 
        ls[i].minX <= ls[index].minX &&
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

function hor(ls, s) {
    if (ls[s].type === "LINE" || ls[s].type === "BRACKET") {
        var r = ls[s].wall;
        var newR = [[ls[s].maxX, r[0][1]], [r[1][0], r[1][1]]];
        var st = start(ls, newR);
        if (st == -1) {
            return -1;
        }
        return overlap(st, ls[s].wall, ls);
    }
    var index = 0;
    while (index < ls.length) {
        if (isInRegion(ls[s].wall, ls[index]) && !ls[index].marked) {
            if (ls[s].maxX <= ls[index].minX) {
                if (ls[s].minY + 1/5 * ls[s].height <= ls[index].y && ls[index].y < ls[s].maxY - ls[s].height * 2/5)
                return overlap(index, ls[s].wall, ls);
            }
        }
        index++;
    }
    return -1;


}

function getParseTree(bst) {
    var symbol;
    var type;
    if(!bst.symbol) {
        for (var i = 0; i < bst.children.length; i++) {
            getParseTree(bst.children[i]);
        }
        return;
    }
    symbol = bst.symbol;
    type = bst.symbol.type;
    if (type === "LIMIT") {
        var ulimit = [], blimit = [];
        var UREGION = ["TLEFT", "ABOVE", "SUPER"];
        var BREGION = ["BLEFT", "BELOW", "SUBSC"];
        for (var i = 0; i < UREGION.length; i++) {
            if(bst[UREGION[i]]) {
                for (var j = 0; j < bst[UREGION[i]].children.length; j++) {
                    ulimit.push(bst[UREGION[i]].children[j]);
                }
                delete bst[UREGION[i]];
            }
            if (bst[BREGION[i]]) {
                for (var j = 0; j < bst[BREGION[i]].children.length; j++) {
                    blimit.push(bst[BREGION[i]].children[j]);
                }
                delete bst[BREGION[i]];
            }
        }
        bst["ULIMIT"] = {"children": ulimit};
        bst["BLIMIT"] = {"children": blimit};
    }

    for (var i = 0; i < PT_REGIONS.length; i++) {
        //console.log(PT_REGIONS[i]);
        if (bst[PT_REGIONS[i]]) {
            //console.log("in");
            for (var j = 0; j < bst[PT_REGIONS[i]].children.length; j++) {
                getParseTree(bst[PT_REGIONS[i]].children[j]);
            }
        }
    }


}

function getTex(bst) {
    var result = "";
    //if (!bst) {
      //  return result;
    //}
    //console.log(bst);
    if (bst && !bst.symbol){
        for (var i = 0; i < bst.children.length; i++) {
            result += getTex(bst.children[i]);
        }
        return result;
    }
    var value = bst.value;
    var symbol = bst.symbol;
    var type = bst.symbol.type;

    if (type === "LIMIT") {
        result += TEX_TEXT[value] + "_{" + getTex(bst.BLIMIT) + "}";
        result += "^{" + getTex(bst.ULIMIT) + "}";
    } else if (type === "LINE") {
        result += TEX_TEXT[value];
        result += "{" 
        if (bst.ABOVE) {
            result += getTex(bst.ABOVE);
         } 
        result += "}{";
        if (bst.BELOW) {
            result += getTex(bst.BELOW);
        }
        result += "}";

    } else if (type === "ROOT") {
        result += TEX_TEXT[value] + "{" + getTex(bst.CONTAINS) + "}";
        if (bst.SUPER) {
            result += "^{" + getTex(bst.SUPER) +"}";
        }
        if (bst.SUBSC) {
            result += "_{" + getTex(bst.SUBSC) +"}";
        }
    } else {
        result += value;
        if (bst.SUPER) {
            result += "^{" + getTex(bst.SUPER) +"}";
        }
        if (bst.SUBSC) {
            result += "_{" + getTex(bst.SUBSC) +"}";
        }
    }
    return result;
}
