class SvgEditorElement {

    /**
     * Base constructor
     * @param width
     * @param height
     * @param x
     * @param y
     */
    constructor(width=0, height=0, x = 0, y = 0){
        this._width = width;
        this._height = height;
        this._x = x;
        this._y = y;
        this.dom = null;
        this.type = -1;
    }

    /**
     * Get element size
     */
    getSize(){
        throw "Method getSize not implemented";
    }

    /**
     * Get element position
     */
    getPosition(){
        throw "Method getPosition not implemented";
    }
}

module.exports = SvgEditorElement;