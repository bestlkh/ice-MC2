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
        alertify.alert(this.title, this.message, this.callback).set({transition:'zoom'});
    }

    /**
     * Show the alert without new
     * @param title
     * @param message
     * @param callback
     */
    static spawn(title, message = null, callback = null){
        if(message && callback){
            alertify.alert(title, message, callback).set({transition:'zoom'});
        } else if(message) {
            alertify.alert(title, message).set({transition:'zoom'});
        } else {
            alertify.alert("Alert", title).set({transition:'zoom'});
        }
    }
}

module.exports = Alert;