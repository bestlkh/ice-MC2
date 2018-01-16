'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _TEX_TEXT;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var REGION_NAMES = {
    'ROOT': 'root',
    'TLEFT': 'tleft',
    'ABOVE': 'above',
    'SUPERS': 'supers',
    'CONTAINS': 'contains',
    'BLEFT': 'bleft',
    'BELOW': 'below',
    'SUSC': 'subsc'
};

var SYMBOL_TYPES = {
    'ALPHANUMERIC': 'text',
    'TEXT': 'text',
    'LIMIT': 'limit',
    'FRACTION': 'fraction',
    'BRACKET': 'bracket',
    'ROOT': 'root',
    'OPERATOR': 'operator'
};

var BRACKET_TYPES = {
    'OPEN': 'open',
    'CLOSE': 'close'
};

var TEX_TEXT = exports.TEX_TEXT = (_TEX_TEXT = {
    'sum': ' \\sum ',
    'lim': ' \\lim ',
    '∑': ' \\sum ',
    'fraction': ' \\frac ',
    'root': ' \\sqrt ',
    'integral': ' \\int',
    '∫': ' \\int ',
    'lbracket': ' \\left( ',
    'rbracket': ' \\right) ',
    '(': ' \\left( ',
    ')': ' \\right) ',
    '±': ' \\pm ',
    '∓': ' \\mp ',
    '+': ' + ',
    '×': ' \\times ',
    '—': ' - ',
    'overline': ' \\overline ',
    'underline': ' \\underline ',
    '<': ' \\lt ',
    '≤': ' \\le ',
    '>': ' \\gt ',
    '≥': ' \\ge ',
    '=': ' = ',
    '→': ' \\to '
}, _defineProperty(_TEX_TEXT, 'lim', ' \\lim '), _defineProperty(_TEX_TEXT, '->', '\\to '), _TEX_TEXT);

var BRACKET = exports.BRACKET = ["lbracket", "(", ")", "rbracket"];
var LINE = exports.LINE = ["fraction", "—"];
var ROOT = exports.ROOT = ["root"];
var LIMIT = exports.LIMIT = ["sum", "∑", "integral", "∫", "lim"];
var OPERATOR = exports.OPERATOR = ["+", "±", "∓", '<', '>', '≤', '≥', '=', '×', '→'];

function getSymbolType(value) {
    if (BRACKET.indexOf(value) != -1) {
        return SYMBOL_TYPES.BRACKET;
    }
    if (LINE.indexOf(value) != -1) {
        return SYMBOL_TYPES.FRACTION;
    }
    if (ROOT.indexOf(value) != -1) {
        return SYMBOL_TYPES.ROOT;
    }
    if (LIMIT.indexOf(value) != -1) {
        return SYMBOL_TYPES.LIMIT;
    }
    if (OPERATOR.indexOf(value) != -1) {
        return SYMBOL_TYPES.OPERATOR;
    }
    return SYMBOL_TYPES.ALPHANUMERIC;
};