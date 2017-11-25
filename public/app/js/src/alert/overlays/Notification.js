var alertify = require('alertifyjs');

class Notification {

    /**
     * Construct the notification object
     * @param message
     * @param type
     * @param delay
     * @param callback
     */
    constructor(message, type = 'success', delay = 5, callback = function(){}){
        this.message = message;
        this.type = type;
        this.delay = delay;
        this.callback = callback;
    }

    /**
     * Show the notification
     */
    show(){
        alertify.notify(this.message, this.type, this.delay, this.callback);
    }

    /**
     * Spawn a notification without new
     * @param message
     * @param type
     * @param delay
     * @param callback
     */
    static spawn(message, type = 'success', delay = 5, callback = function(){}){
        alertify.notify(message, type, delay, callback);
    }
}

module.exports = Notification;