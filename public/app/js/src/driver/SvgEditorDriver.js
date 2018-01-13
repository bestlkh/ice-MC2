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
                // Set element DOM size and position
                let size = element.getSize();
                let xScale = SvgEditorDriver.getRelativeScale(size.width, config.width);
                let yScale = SvgEditorDriver.getRelativeScale(size.height, config.height);
                element.dom.setAttribute("transform", "scale(" + xScale + " " + yScale + ")");
                let position = element.getPosition();
                // Move element to correct position, third parameter is false so this action cannot be undone
                this._canvas.moveSelectedElements(config.x - position.x, config.y - position.y, false, [element.dom]);
        }

        return element;
    }

    static getRelativeScale(from, to){
        return to / from;
    }
}

module.exports = SvgEditorDriver;