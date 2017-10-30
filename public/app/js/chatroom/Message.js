/**
 * Author: Jun Zheng (junthehacker)
 * Detailed documentation: https://github.com/bestlkh/ice-MC2/wiki/Message-Class
 *
 * @param raw_data
 * @constructor
 */

var Message = function(raw_data){
    this.raw_data = raw_data;
    this.text = new MessageText(raw_data.msg);

    /**
     * Is this a chat message?
     * @returns {boolean}
     */
    this.isChat = function(){
        return this.raw_data.type === 'chat';
    };

    /**
     * Is this a system message?
     * @returns {boolean}
     */
    this.isSystem = function(){
        return this.raw_data.type === 'system';
    };

    /**
     * Is this a hidden message?
     */
    this.isHidden = function(){
        return this.raw_data.hidden;
    };

    /**
     * Is this message our own message?
     * @returns {*|boolean}
     */
    this.isOwn = function(){
        return this.raw_data.ownMsg;
    };

    /**
     * Is this message sent by an instructor?
     * @returns {*|boolean}
     */
    this.isInstructor = function(){
        return this.raw_data.isInstructor;
    };

    /**
     * Is this message sent by a TA?
     * @returns {*}
     */
    this.isTA = function(){
        return this.raw_data.isTA;
    };

    /**
     * Get message sent time.
     * @returns {*}
     */
    this.getTime = function(){
        return this.raw_data.msgTime;
    };

    /**
     * Get user avatar file.
     */
    this.getAvatar = function(){
        return this.raw_data.userAvatar;
    };

    /**
     * Get initials.
     * @returns {*|string}
     */
    this.getInitials = function(){
        return this.raw_data.initials;
    };

    this.getUsername = function(){
        return this.raw_data.username;
    };


    /**
     * Get text version of the message.
     * @returns {*|string|string}
     */
    this.getText = function(){
        return this.text;
    };

    /**
     * Does this message have file?
     * @returns {*}
     */
    this.hasFile = function(){
        return this.raw_data.hasFile;
    };

    /**
     * is attachment an image file?
     * @returns {*|boolean}
     */
    this.isImageFile = function(){
        return this.raw_data.isImageFile;
    };

    /**
     * Get attachment file name.
     */
    this.getFileName = function(){
        return this.raw_data.filename;
    };

    /**
     * Is attachment an audio file.
     * @returns {boolean|*}
     */
    this.isAudioFile = function(){
        return this.raw_data.isMusicFile;
    };

    /**
     * Is attachment a PDF?
     * @returns {boolean|*}
     */
    this.isPdfFile = function(){
        return this.raw_data.isPDFFile;
    };

};