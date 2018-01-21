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