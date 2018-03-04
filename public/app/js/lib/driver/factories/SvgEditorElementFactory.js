'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SvgEditorElementTypes = require('../enums/SvgEditorElementTypes');
var SvgEditorSymbolElement = require('../elements/SvgEditorSymbolElement');
var SvgEditorImageElement = require('../elements/SvgEditorImageElement');

var SvgEditorElementFactory = function () {
    function SvgEditorElementFactory() {
        _classCallCheck(this, SvgEditorElementFactory);
    }

    _createClass(SvgEditorElementFactory, null, [{
        key: 'make',
        value: function make(type, config) {
            switch (type) {
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
    }]);

    return SvgEditorElementFactory;
}();

module.exports = SvgEditorElementFactory;