var alertify = require('alertifyjs');

class Confirm {

    /**
     * Construct
     * @param title
     * @param message
     * @param okCallback
     * @param cancelCallback
     */
    constructor(title, message, okCallback, cancelCallback = function(){}){
        this.title = title;
        this.message = message;
        this.okCallback = okCallback;
        this.cancelCallback = cancelCallback;
    }

    /**
     * Show the notification
     */
    show(){
        alertify.confirm(this.title, this.message, this.okCallback, this.cancelCallback).set({transition:'zoom'});
    }

    /**
     * Spawn a confirm window
     * @param title
     * @param message
     * @param okCallback
     * @param cancelCallback
     */
    static spawn(title, message, okCallback, cancelCallback = function(){}){
        alertify.confirm(title, message, okCallback, cancelCallback).set({transition:'zoom'});
    }

}

module.exports = Confirm;