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
    'sum': '\\sum',
    'fraction': '\\frac',
    'root': '\\sqrt',
    'integral': '\\int',
    'lbracket': '(',
    'rbracket': ')',
    '(': '(',
    ')': ')'
};

const BRACKET = ["lbracket", "(", ")", "rbracket"];
const LINE = ["fraction"];
const ROOT = ["root"];
const LIMIT = ["sum", "integral"];
const OPERATOR = ["+", "-"]

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