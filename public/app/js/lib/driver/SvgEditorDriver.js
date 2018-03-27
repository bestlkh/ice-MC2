'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SvgEditorElementFactory = require('./factories/SvgEditorElementFactory');
var SvgEditorElementTypes = require('./enums/SvgEditorElementTypes');

var SvgEditorDriver = function () {

    /**
     * Construct the driver instance.
     * @param canvas
     */
    function SvgEditorDriver() {
        var canvas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _classCallCheck(this, SvgEditorDriver);

        if (canvas == null) {
            this._canvas = svgCanvas;
        } else {
            this._canvas = canvas;
        }
        this._elements = {};
    }

    /**
     * Create a new element.
     * @param type
     * @param config
     * @returns {SvgEditorElement}
     */


    _createClass(SvgEditorDriver, [{
        key: 'createElement',
        value: function createElement(type, config) {
            var element = SvgEditorElementFactory.make(type, config);
            switch (element.type) {
                // It is a symbol element
                case SvgEditorElementTypes.SYMBOL:
                    element.id = this._canvas.getNextId() + "_" + element.getSymbol();
                    element.dom = this._canvas.addSvgElementFromJson({
                        "element": "path",
                        "curStyles": true,
                        "attr": {
                            "d": element.getPathData(),
                            "id": element.id
                        }
                    });
                    // Set element DOM size and position
                    var size = element.getSize();
                    var xScale = SvgEditorDriver.getRelativeScale(size.width, config.width);
                    var yScale = SvgEditorDriver.getRelativeScale(size.height, config.height);
                    element.dom.setAttribute("transform", "scale(" + xScale + "," + yScale + ")");
                    this._canvas.recalculateDimensions(element.dom); // TODO: Still need to do proper scaling function
                    var position = element.getPosition();
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

    }, {
        key: 'findElementById',
        value: function findElementById(id) {
            if (this._elements[id]) {
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

    }, {
        key: 'findElementsByType',
        value: function findElementsByType(type) {
            var result = [];
            for (var key in this._elements) {
                if (this._elements[key].type === type) {
                    result.push(this._elements[key]);
                }
            }
            return result;
        }

        /**
         * Get all elements in an array.
         * @returns {SvgEditorElement[]}
         */

    }, {
        key: 'getAllElements',
        value: function getAllElements() {
            var result = [];
            for (var key in this._elements) {
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

    }], [{
        key: 'getRelativeScale',
        value: function getRelativeScale(from, to) {
            return to / from;
        }
    }]);

    return SvgEditorDriver;
}();

module.exports = SvgEditorDriver;