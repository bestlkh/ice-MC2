'use strict';

var _TEX_TEXT;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = {
    REGION_NAMES: {
        'ROOT': 'root',
        'TLEFT': 'tleft',
        'ABOVE': 'above',
        'SUPERS': 'supers',
        'CONTAINS': 'contains',
        'BLEFT': 'bleft',
        'BELOW': 'below',
        'SUSC': 'subsc'
    },
    SYMBOL_TYPES: {
        'ALPHANUMERIC': 'text',
        'TEXT': 'text',
        'LIMIT': 'limit',
        'FRACTION': 'fraction',
        'BRACKET': 'bracket',
        'ROOT': 'root',
        'OPERATOR': 'operator'
    },
    BRACKET_TYPES: {
        'OPEN': 'open',
        'CLOSE': 'close'
    },

    TEX_TEXT: (_TEX_TEXT = {
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
    }, _defineProperty(_TEX_TEXT, 'lim', ' \\lim '), _defineProperty(_TEX_TEXT, '->', '\\to '), _TEX_TEXT),
    BRACKET: ["lbracket", "(", ")", "rbracket"],
    LINE: ["fraction", "—"],
    ROOT: ["root"],
    LIMIT: ["sum", "∑", "integral", "∫", "lim"],
    OPERATOR: ["+", "±", "∓", '<', '>', '≤', '≥', '=', '×', '→']
};