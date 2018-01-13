const SvgEditorSymbols                     = require('../enums/SvgEditorSymbols');
const SvgEditorElementTypes                = require('../enums/SvgEditorElementTypes');
const SvgEditorElement                     = require('./SvgEditorElement');
const SvgEditorDriverSymbolNotDefinedError = require('../exceptions/SvgEditorDriverSymbolNotDefinedError');
const SvgEditorElementSize                 = require('./SvgEditorElementSize');
const SvgEditorElementPosition             = require('./SvgEditorElementPosition');

const SymbolData                           = require('../data/Symbols');

/**
 * Class representing a math symbol in the editor.
 */
class SvgEditorSymbolElement extends SvgEditorElement {

    /**
     * Construct the symbol element
     * @param width
     * @param height
     * @param x
     * @param y
     * @param symbol
     */
    constructor(width, height, x, y, symbol = SvgEditorSymbols.SUM){
        super(width, height, x, y);
        // Check to see if symbol is defined
        if(SymbolData[symbol]){
            this._symbol     = symbol;
            this._symbolData = SymbolData[symbol];
        } else {
            throw new SvgEditorDriverSymbolNotDefinedError();
        }
        this.type = SvgEditorElementTypes.SYMBOL;
    }

    /**
     * Get symbol path data, used to insert into canvas.
     * @returns {string}
     */
    getPathData(){
        return this._symbolData;
    }

    /**
     * Get current symbol enum value.
     * @returns {number|*}
     */
    getSymbol(){
        return this._symbol;
    }

    /**
     * Returns a SvgEditorElementSize object representing current size of the element.
     * @returns {SvgEditorElementSize}
     */
    getSize(){
        return new SvgEditorElementSize(this._width, this._height);
    }

    /**
     * Returns a SvgEditorElementPosition object representing current position of the element.
     * @returns {SvgEditorElementPosition}
     */
    getPosition(){
        return new SvgEditorElementPosition(this._x, this._y);
    }

}

module.exports = SvgEditorSymbolElement;