const REGION_NAMES = {
    'ROOT': 'root',
    'TLEFT': 'tleft',
    'ABOVE': 'above',
    'SUPERS': 'supers',
    'CONTAINS': 'contains',
    'BLEFT': 'bleft',
    'BELOW': 'below',
    'SUSC': 'subsc'
};

const SYMBOL_TYPES = {
    'ALPHANUMERIC': 'text',
    'TEXT': 'text',
    'LIMIT': 'limit',
    'FRACTION': 'fraction',
    'BRACKET': 'bracket',
    'ROOT': 'root',
    'OPERATOR': 'operator'
};

const BRACKET_TYPES = {
    'OPEN': 'open',
    'CLOSE': 'close'
};

const TEX_TEXT = {
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
    '→': ' \\to ',
    'lim': ' \\lim ',
    '->': '\\to '
};

const BRACKET = ["lbracket", "(", ")", "rbracket"];
const LINE = ["fraction", "—"];
const ROOT = ["root"];
const LIMIT = ["sum", "∑", "integral", "∫", "lim"];
const OPERATOR = ["+", "±", "∓", '<', '>', '≤', '≥', '=', '×', '→']

module.exports = {
    "REGION_NAMES": REGION_NAMES,
    "SYMBOL_TYPES": SYMBOL_TYPES,
    "BRACKET_TYPES": BRACKET_TYPES,
    "TEX_TEXT": TEX_TEXT,
    "BRACKET": BRACKET,
    "LINE": LINE,
    "LIMIT": LIMIT,
    "OPERATOR": OPERATOR,
    "ROOT": ROOT
}