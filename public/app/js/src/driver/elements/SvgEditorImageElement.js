const SvgEditorElementTypes                = require('../enums/SvgEditorElementTypes');
const SvgEditorElement                     = require('./SvgEditorElement');
const SvgEditorElementSize                 = require('./SvgEditorElementSize');
const SvgEditorElementPosition             = require('./SvgEditorElementPosition');

/**
 * Class representing an image
 */
class SvgEditorImageElement extends SvgEditorElement {

    /**
     * Construct the image element
     * @param width
     * @param height
     * @param x
     * @param y
     * @param base64
     */
    constructor(width, height, x, y, base64){
        super(width, height, x, y);
        this._base64 = base64;
        this.type = SvgEditorElementTypes.IMAGE;
    }

    /**
     * Returns a SvgEditorElementSize object representing current size of the element.
     * @returns {SvgEditorElementSize}
     */
    getSize(){
        this._reloadSize();
        return new SvgEditorElementSize(this._width, this._height);
    }

    /**
     * Returns a SvgEditorElementPosition object representing current position of the element.
     * @returns {SvgEditorElementPosition}
     */
    getPosition(){
        this._reloadPosition();
        return new SvgEditorElementPosition(this._x, this._y);
    }

    /**
     * Reload size and set the private variable. This requires DOM to be set.
     * @private
     */
    _reloadSize(){
        if(this.dom){
            this._width = this.dom.getBoundingClientRect().width;
            this._height = this.dom.getBoundingClientRect().height;
        }
    }

    /**
     * Reload position and set the private variables. This requires DOM to be set.
     * @private
     */
    _reloadPosition(){
        if(this.dom){
            this._x = this.dom.getBoundingClientRect().left;
            this._y = this.dom.getBoundingClientRect().top;
        }
    }
}

module.exports = SvgEditorImageElement;