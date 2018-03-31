'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageText = require('./MessageText');
var md5 = require('blueimp-md5');

var Message = function () {
    function Message(raw_data) {
        _classCallCheck(this, Message);

        this.raw_data = raw_data;
        this.text = new MessageText(raw_data.msg);
        this.read = false;
    }

    _createClass(Message, [{
        key: 'getId',
        value: function getId() {
            return md5(this.raw_data.msg + this.getTime() + this.getUsername());
        }
    }, {
        key: 'isChat',
        value: function isChat() {
            return this.raw_data.type === 'chat';
        }
    }, {
        key: 'isSystem',
        value: function isSystem() {
            return this.raw_data.type === 'system';
        }
    }, {
        key: 'isHidden',
        value: function isHidden() {
            return this.raw_data.hidden;
        }
    }, {
        key: 'isOwn',
        value: function isOwn() {
            return this.raw_data.ownMsg;
        }
    }, {
        key: 'isInstructor',
        value: function isInstructor() {
            return this.raw_data.isInstructor;
        }
    }, {
        key: 'isTA',
        value: function isTA() {
            return this.raw_data.isTA;
        }
    }, {
        key: 'getTime',
        value: function getTime() {
            return this.raw_data.msgTime;
        }
    }, {
        key: 'getAvatar',
        value: function getAvatar() {
            return this.raw_data.userAvatar;
        }
    }, {
        key: 'getInitials',
        value: function getInitials() {
            return this.raw_data.initials;
        }
    }, {
        key: 'getUsername',
        value: function getUsername() {
            return this.raw_data.username;
        }
    }, {
        key: 'getText',
        value: function getText() {
            return this.text;
        }
    }, {
        key: 'hasFile',
        value: function hasFile() {
            return this.raw_data.hasFile;
        }
    }, {
        key: 'isImageFile',
        value: function isImageFile() {
            return this.raw_data.isImageFile;
        }
    }, {
        key: 'getFileName',
        value: function getFileName() {
            return this.raw_data.filename;
        }
    }, {
        key: 'isAudioFile',
        value: function isAudioFile() {
            return this.raw_data.isMusicFile;
        }
    }, {
        key: 'isPdfFile',
        value: function isPdfFile() {
            return this.raw_data.isPDFFile;
        }
    }]);

    return Message;
}();

module.exports = Message;