var $ = require('jquery');

class Cursor {
    constructor(selector){
        this.dom = $(selector);
    }

    /**
     * Set cursor type
     * @param type
     */
    setType(type){
        this.dom.css({
            cursor: type
        });
    };
}

module.exports = Cursor;