const uuidv4 = require('uuid-v4');

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

class User {
    constructor(){
        if(getCookie('mc2-dc-identifier')){
            this._identifier = getCookie('mc2-dc-identifier')
        } else {
            this._identifier = uuidv4()
            setCookie('mc2-dc-identifier', this._identifier, 365);
        }
        console.log("Data collection identifier generated " + this._identifier);
    }

    /**
     * Get user identifier, usually UUID v4
     * @returns {*}
     */
    getIdentifier(){
        return this._identifier;
    }
}

module.exports = User;