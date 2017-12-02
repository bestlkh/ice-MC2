var ToolbarButton = require('./ToolbarButton');

class Toolbar {
    constructor(dom){
        this.dom = dom;
        this._buttons = [];
    }

    /**
     * Read only buttons attribute
     * @returns {Array}
     */
    get buttons(){
        return this._buttons;
    }

    /**
     * Add a new button to toolbar
     * @param config
     */
    addButton(config){
        var button = new ToolbarButton($(this._getToolButtonMarkup(config)));
        this._buttons.push(button);
        this.dom.append(button.dom);
    }

    /**
     * Get a toolbar button by id
     * @param id
     * @returns {*}
     */
    getButtonById(id){
        for(let i = 0; i < this._buttons.length; i++){
            if(this._buttons[i].dom.attr('id') === id){
                return this.buttons[i];
            }
        }
    }

    /**
     * Get tool button markup, you can always override this.
     * @param config
     * @returns {string}
     * @private
     */
    _getToolButtonMarkup(config){
        return "<div toolbar-button>" + config.innerContent + "</div>";
    }
}

module.exports = Toolbar;