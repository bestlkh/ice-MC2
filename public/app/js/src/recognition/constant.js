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
    BRACKET: ["lbracket", "(", ")", "rbracket"],
    LINE: ["fraction", "—"],
    ROOT: ["root"],
    LIMIT: ["sum", "∑", "integral", "∫", "lim"],
    OPERATOR: ["+", "±", "∓", '<', '>', '≤', '≥', '=', '×', '→']
};
