var alertify = require('alertifyjs');

class Alert {

    /**
     * Construct alert
     * @param title
     * @param message
     * @param callback
     */
    constructor(title, message = null, callback = null){
        if(message && callback){
            this.title = title;
            this.message = message;
            this.callback = callback;
        } else if(message) {
            this.title = title;
            this.message = message;
            this.callback = function(){};
        } else {
            this.title = 'Alert';
            this.message = title;
            this.callback = function(){};
        }
    }

    /**
     * Show the dialog
     */
    show(){
        alertify.alert(this.title, this.message, this.callback);
    }

    /**
     * Show the alert without new
     * @param title
     * @param message
     * @param callback
     */
    static spawn(title, message = null, callback = null){
        if(message && callback){
            alertify.alert(title, message, callback);
        } else if(message) {
            alertify.alert(title, message);
        } else {
            alertify.alert("Alert", title);
        }
    }
}

module.exports = Alert;