var MessageText = require('./MessageText');
var md5 = require('blueimp-md5');

class Message {
    constructor(raw_data){
        this.raw_data = raw_data;
        this.text = new MessageText(raw_data.msg);
        this.read = false;    
    }

    getId(){
        return md5(this.raw_data.msg + this.getTime() + this.getUsername());
    }

    isChat(){
        return this.raw_data.type === 'chat';
    }

    isSystem(){
        return this.raw_data.type === 'system';
    }

    isHidden(){
        return this.raw_data.hidden;
    }

    isOwn(){
        return this.raw_data.ownMsg;
    }

    isInstructor(){
        return this.raw_data.isInstructor;
    }

    isTA(){
        return this.raw_data.isTA;
    }

    getTime(){
        return this.raw_data.msgTime;
    }

    getAvatar(){
        return this.raw_data.userAvatar;
    }

    getInitials(){
        return this.raw_data.initials;
    }

    getUsername(){
        return this.raw_data.username;
    }

    getText(){
        return this.text;
    }

    hasFile(){
        return this.raw_data.hasFile;
    }

    isImageFile() {
        return this.raw_data.isImageFile;
    }

    getFileName(){
        return this.raw_data.filename;
    }

    isAudioFile(){
        return this.raw_data.isMusicFile;
    }

    isPdfFile(){
        return this.raw_data.isPDFFile;
    }
}

module.exports = Message;