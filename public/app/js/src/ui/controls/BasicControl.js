var $ = require('jquery');
var EventEmitter = require('./../events/EventEmitter');

class BasicControl {

    constructor(dom){
        this.dom = $(dom);
        this._visible = true;
        this._preventDefaultClick = false;
        this._onClickEmitter = new EventEmitter();

        // Bind events here
        var self = this;

        // Bind click event
        $(dom).click(function(e){
            if(self._preventDefaultClick){
                e.preventDefault();
            }
            self._onClickEmitter.dispatch(e);
        });
    }

    get visible(){
        return this._visible;
    }

    set visible(val){
        this._visible = val;
        if(val){
            $(this.dom).show();
        } else {
            $(this.dom).hide();
        }
    }

    set preventDefaultClick(val){
        this._preventDefaultClick = val;
    }

    get preventDefaultClick(){
        return this._preventDefaultClick;
    }

    /**
     * Set onClick event handler.
     * @param func
     */
    set onClick(func){
        this._onClickEmitter.handler = func;
    }

}

module.exports = BasicControl;