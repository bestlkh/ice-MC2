(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const EventEmitter = require('./../events/EventEmitter');

class BasicControl {

    constructor(dom){
        this.dom = dom;
        this._visible = true;
        this._preventDefaultClick = false;
        this._onClickEmitter = new EventEmitter();

        // Bind events here
        let self = this;

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
},{"./../events/EventEmitter":4}],2:[function(require,module,exports){
const ToolbarButton = require('./ToolbarButton');

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
        let button = new ToolbarButton($(this._getToolButtonMarkup(config)));
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
},{"./ToolbarButton":3}],3:[function(require,module,exports){
const BasicControl = require('./BasicControl');

class ToolbarButton extends BasicControl {
    constructor(dom){
        super(dom);
    }
}

module.exports = ToolbarButton;
},{"./BasicControl":1}],4:[function(require,module,exports){
class EventEmitter {
    constructor(){
        this._handlers = [];
    }

    set handler(val){
        this._handlers.push(val);
    }

    /**
     * Dispatch the event
     * @param arg
     */
    dispatch(arg){
        for(let i = 0; i < this._handlers.length; i++){
            this._handlers[i](arg);
        }
    }
}

module.exports = EventEmitter;
},{}],5:[function(require,module,exports){
const BasicControl = require('./controls/BasicControl');
const Toolbar = require('./controls/Toolbar');

module.exports = {
    Toolbar: Toolbar,
    BasicControl: BasicControl
};
},{"./controls/BasicControl":1,"./controls/Toolbar":2}]},{},[5]);
