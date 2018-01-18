'use strict';

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

var TEX_TEXT = (_TEX_TEXT = {
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

var BRACKET = ["lbracket", "(", ")", "rbracket"];
var LINE = ["fraction", "—"];
var ROOT = ["root"];
var LIMIT = ["sum", "∑", "integral", "∫", "lim"];
var OPERATOR = ["+", "±", "∓", '<', '>', '≤', '≥', '=', '×', '→'];

module.exports = {
    "REGION_NAMES": REGION_NAMES,
    "SYMBOL_TYPES": SYMBOL_TYPES,
    "BRACKET_TYPES": BRACKET_TYPES,
    "TEX_TEXT": TEX_TEXT,
    "BRAKET": BRACKET,
    "LINE": LINE,
    "LIMIT": LIMIT,
    "OPERATOR": OPERATOR
};