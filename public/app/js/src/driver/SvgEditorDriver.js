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
        this._elements = {}
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
            // It is a symbol element
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
                element.dom.setAttribute("transform", "scale(" + xScale + "," + yScale + ")");
                this._canvas.recalculateDimensions(element.dom); // TODO: Still need to do proper scaling function
                let position = element.getPosition();
                // Move element to correct position, third parameter is false so this action cannot be undone
                this._canvas.moveSelectedElements(config.x - position.x, config.y - position.y, false, [element.dom]);
                break;
            // It is a image element
            case SvgEditorElementTypes.IMAGE:
                element.id = this._canvas.getNextId() + "_image";
                element.dom = this._canvas.addSvgElementFromJson({
                    "element": "image",
                    "attr": {
                        "x": config.x,
                        "y": config.y,
                        "width": config.width,
                        "height": config.height,
                        "id": element.id,
                        "style": "pointer-events:inherit"
                    }
                });
                this._canvas.setHref(element.dom, config.base64);
                // We add a xlink property so SVG can be parsed properly
                element.dom.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
                break;
        }

        // Push element to local storage
        this._elements[element.id] = element;

        return element;
    }


    /**
     * Find a element by its ID.
     * @param id
     * @returns {SvgEditorElement|boolean}
     */
    findElementById(id){
        if(this._elements[id]){
            return this._elements[id];
        } else {
            return false;
        }
    }

    /**
     * Get all elements of one type.
     * Complexity O(n), do not use this too often.
     * @param type
     */
    findElementsByType(type){
        let result =  [];
        for(let key in this._elements){
            if(this._elements[key].type === type){
                result.push(this._elements[key]);
            }
        }
        return result;
    }

    /**
     * Get all elements in an array.
     * @returns {SvgEditorElement[]}
     */
    getAllElements(){
        let result = [];
        for(let key in this._elements){
            result.push(this._elements[key]);
        }
        return result;
    }

    /**
     * Helper to find relative scale factor.
     * @param from
     * @param to
     * @returns {number}
     */
    static getRelativeScale(from, to){
        return to / from;
    }
}

module.exports = SvgEditorDriver;