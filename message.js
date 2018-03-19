let moment = require("moment");

/**
 * Class representing a text message
 */
class Message {

    constructor(data, session) {
        this.username = session.username;
        this.userAvatar = session.userAvatar;

        // Generate initials
        let name = session.username.split(" ");
        let initials;
        if(name.length >= 2){
            initials = name[0].substring(0,1).toUpperCase() + name[name.length - 1].substring(0,1).toUpperCase();
        } else {
            initials = session.username.substring(0,2).toUpperCase();
        }
        this.initials = initials;

        this.msgTime = data.msgTime ? data.msgTime : moment().format('LT');
        this.hasMsg = true;
        this.msg = data.msg;
        this.type = data.type;
    }
}

class ImageMessage extends Message {
    static sizeLimit() {
        return 30*Math.pow(10, 6);
    }

    constructor(data, session) {
        super(data, session);

        this.msg = "[mc2-image]"+data.dataUri;
    }

    static validate(data) {
        if (data.dataUri.length > ImageMessage.sizeLimit()) return false;

        return true;
    }
}

module.exports = {Message: Message, ImageMessage: ImageMessage};