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
            }

            return element;
        }
    }]);

    return SvgEditorDriver;
}();

module.exports = SvgEditorDriver;