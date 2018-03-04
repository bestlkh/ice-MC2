const SvgEditorElementTypes  = require('../enums/SvgEditorElementTypes');
const SvgEditorSymbolElement = require('../elements/SvgEditorSymbolElement');
const SvgEditorImageElement  = require('../elements/SvgEditorImageElement');

class SvgEditorElementFactory {
    static make(type, config){
        switch(type){
            /**
             * For this case, 5 configurations are required:
             * (float) width             - Element width in pixels
             * (float) height            - Element height in pixels
             * (float) x                 - Element x position in pixels, from left
             * (float) y                 - Element y position in pixels, from top
             * (SvgEditorSymbols) symbol - Symbol this element represents
             */
            case SvgEditorElementTypes.SYMBOL:
                return new SvgEditorSymbolElement(config.width, config.height, config.x, config.y, config.symbol);
            case SvgEditorElementTypes.IMAGE:
                return new SvgEditorImageElement(config.width, config.height, config.x, config.y, config.base64);
        }
    }
}

module.exports = SvgEditorElementFactory;