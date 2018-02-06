const User = require('../util/User')

class Logger {
    constructor(){
        // Create a new user instance
        this._user = new User();
        this._logs = [];
    }


    /**
     * Create a new log
     * @param data
     */
    log(data){
        let toPush = {
            data: data,
            time: new Date().toLocaleString()
        };
        console.log("New log pushed");
        console.log(JSON.stringify(toPush, null, null, 2))
        this._logs.push(toPush);
    }

    /**
     * Template to log an action
     * @param actionName
     * @param extraData
     */
    logAction(actionName, extraData = null){
        this.log({
            action: actionName,
            extra: extraData
        });
    }


}

module.exports = Logger;