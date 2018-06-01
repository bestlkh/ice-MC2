module.exports =  {
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

    TEX_TEXT: {
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
    },
    BRACKET: ["lbracket", "(", "symbol_parenleft", "symbol_left_square_bracket", "symbol_right_square_bracket", ")", "rbracket", "symbol_parenright"],
    LINE: ["fraction", "—", "symbol_", "symbol_hyphen"],
    ROOT: ["root", "SQRT"],
    LIMIT: ["sum", "∑", "integral", "∫", "lim", "uppercase_sigma", "symbol_integral"],
    OPERATOR: ["+", "±", "∓", '<', '>', '≤', '≥', '=', '×', '→', "symbol_plusminus_sign", "symbol_plus", "symbol_greater", "symbol_less", "symbol_greaterthan_or_equal_to", "symbol_lessthan_or_equal_to", "symbol_combining_double_rightwards_arrow_below"]
};
