const SvgEditorElementFactory = require('./factories/SvgEditorElementFactory');
const SvgEditorElementTypes   = require('./enums/SvgEditorElementTypes');

class SvgEditorDriver {

    /**
     * Construct the driver instance.
     * @param canvas
     */
    constructor(canvas = null){
        if(canvas == null){
            this._canvas = svgCanvas;
        } else {
            this._canvas = canvas;
        }
    }

    /**
     * Create a new element.
     * @param type
     * @param config
     * @returns {SvgEditorElement}
     */
    createElement(type, config){
        let element = SvgEditorElementFactory.make(type, config);
        switch(element.type){
            case SvgEditorElementTypes.SYMBOL:
                element.id = this._canvas.getNextId() + "_" + element.getSymbol();
                element.dom = this._canvas.addSvgElementFromJson({
                    "element": "path",
                    "curStyles": true,
                    "attr": {
                        "d" : element.getPathData(),
                        "id": element.id,
                    }
                });
        }

        return element;
    }
}

module.exports = SvgEditorDriver;