let moment = require("moment");

class Message {
    constructor(data, session) {
        this.username = session.username;
        this.userAvatar = session.userAvatar;
        this.initials = session.username.slice(0, 2);
        this.msgTime = moment().format('LT');
        this.hasMsg = true;
        this.msg = data.msg;
        this.type = data.type;
    }
}

class ImageMessage extends Message {
    constructor(data, session) {
        super(data, session);

        this.msg = "[mc2-image]"+data.dataUri;
    }

    static validate(data) {
        if (data.dataUri.length > 30*Math.pow(10, 6)) return false;

        return true;
    }
}

module.exports = {Message: Message, ImageMessage: ImageMessage};