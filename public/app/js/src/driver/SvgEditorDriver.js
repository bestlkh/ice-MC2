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
                        "stroke-width": 0,
                        "d" : element.getPathData(),
                        "id": element.id,
                    }
                });
                this._canvas.recalculateDimensions(element.dom);
                let size = element.getSize();
                let loc = element.getPosition();
                console.log(1, loc, size)
                let xScale = 0.1;// SvgEditorDriver.getRelativeScale(size.width, 12);
                let tlist = this._canvas.getTransformList(element.dom);

                let svgroot = this._canvas.getRootElem();
                let translateOrigin = svgroot.createSVGTransform(),
                    scale = svgroot.createSVGTransform(),
                    translateBack = svgroot.createSVGTransform();
                translateOrigin.setTranslate(-loc.x, -loc.y);
                scale.setScale(xScale, xScale);
                translateBack.setTranslate(config.x, config.y + (size.height * xScale));
                tlist.appendItem(translateBack);
                tlist.appendItem(scale);
                tlist.appendItem(translateOrigin);
                canv.recalculateDimensions(element.dom);

                loc = element.getPosition();
                size = element.getSize();
                console.log(2, loc, size)



                // Set element DOM size and position
                // let size = element.getSize();
                // let xScale = 0.1;// SvgEditorDriver.getRelativeScale(size.width, 12);
                // // let yScale = SvgEditorDriver.getRelativeScale(size.height, config.height);
                // // element.dom.setAttribute("transform", "scale(" + xScale + "," + yScale + ")");
                // let x = element.dom.getBBox().x;
                // let y = element.dom.getBBox().y;
                // element.dom.setAttribute("transform", "trasnlate(" + x + ", " + y + ") scale(" + xScale + "," + xScale + ") trasnlate(" + -x + ", " + -y + ")");
                // console.log(2, element.dom.parentNode.innerHTML);
                // this._canv.runExtensions('elementChanged', {
                //     elems: [cur_shape]
                // });
                // this._canvas.recalculateDimensions(element.dom); 
                // console.log(3, element.dom.parentNode.innerHTML);   
                // let position = element.getPosition();
                // this._canvas.selectOnly([element.dom], false);
                // Move element to correct position, third parameter is false so this action cannot be undone
            //   this._canvas.moveSelectedElements(config.x - position.x, config.y - position.y, false);
            //     // this._canvas.recalculateAllSelectedDimensions();
            //     this._canvas.recalculateDimensions(element.dom); // TODO: Still need to do proper scaling function
            //    // this._canvas.call("transition", selectedElements);
                // this._canvas.clearSelection(true);
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