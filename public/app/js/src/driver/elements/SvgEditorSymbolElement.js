const SvgEditorSymbols = require('../enums/SvgEditorSymbols');
const SvgEditorElement = require('./SvgEditorElement');
const SvgEditorDriverSymbolNotDefinedError = require('../exceptions/SvgEditorDriverSymbolNotDefinedError');

class SvgEditorSymbolElement extends SvgEditorElement {

    /**
     * Construct the symbol element
     * @param width
     * @param height
     * @param x
     * @param y
     * @param symbol
     */
    constructor(width, height, x, y, symbol = "SUM"){
        super(width, height, x, y);
        if(!symbol in SvgEditorSymbols){
            throw new SvgEditorDriverSymbolNotDefinedError();
        } else {
            this._symbol = symbol;
        }
    }

    getSize(){

    }

    getPosition(){

    }
}

module.exports = SvgEditorSymbolElement;