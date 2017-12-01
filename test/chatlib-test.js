let assert = require('assert');
let Message = require('../public/app/js/src/chat/messages/Message');
let MessageText = require('../public/app/js/src/chat/messages/MessageText');

describe('Message', function() {
    describe('#constructor()', function() {
        it('should set raw_data and text properties', function() {
            let msg = new Message({
                'msg': "test message"
            });
            assert.deepEqual({ 'msg': "test message" }, msg.raw_data);
            assert.equal("test message", msg.raw_data.msg);
        });

        it('text property should be the type of MessageText', function(){
            let msg = new Message({
                'msg': "test message"
            });
            assert.equal("MessageText", msg.text.constructor.name);
        });
    });

    describe('#isChat()', function() {
        it('should return true if type is chat', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "chat"
            });
            assert.equal(true, msg.isChat());
        });
        it('should return false if type is not chat', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "something else"
            });
            assert.equal(false, msg.isChat());
        });
    });

    describe('#isSystem()', function() {
        it('should return true if type is system', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "system"
            });
            assert.equal(true, msg.isSystem());
        });
        it('should return false if type is not system', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "chat"
            });
            assert.equal(false, msg.isSystem());
        });
    });

    describe('#isHidden()', function() {
        it('should return true if message is hidden', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "chat",
                "hidden": true
            });
            assert.equal(true, msg.isHidden());
        });
        it('should return false if message is not hidden', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "chat",
                "hidden": false
            });
            assert.equal(false, msg.isHidden());
        });
    });

    describe('#isOwn()', function() {
        it('should return true if message is own message', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "chat",
                "hidden": true,
                "ownMsg": true
            });
            assert.equal(true, msg.isOwn());
        });
        it('should return false if message is not own message', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "chat",
                "hidden": false,
                "ownMsg": false
            });
            assert.equal(false, msg.isOwn());
        });
    });

    describe('#isInstructor()', function() {
        it('should return true if message is instructor message', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "chat",
                "hidden": false,
                "ownMsg": true,
                "isInstructor": true
            });
            assert.equal(true, msg.isInstructor());
        });
        it('should return false if message is not instructor message', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "chat",
                "hidden": false,
                "ownMsg": true,
                "isInstructor": false
            });
            assert.equal(false, msg.isInstructor());
        });
    });

    describe('#isTA()', function() {
        it('should return true if message is TA message', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "chat",
                "hidden": false,
                "ownMsg": true,
                "isInstructor": false,
                "isTA": true
            });
            assert.equal(true, msg.isTA());
        });
        it('should return false if message is not TA message', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "chat",
                "hidden": false,
                "ownMsg": true,
                "isInstructor": false,
                "isTA": false
            });
            assert.equal(false, msg.isTA());
        });
    });

    describe('#getTime()', function() {
        it('should return msgTime in raw_data', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "chat",
                "hidden": false,
                "ownMsg": true,
                "isInstructor": false,
                "isTA": true,
                "msgTime": "2017 11 12 9:00"
            });
            assert.equal("2017 11 12 9:00", msg.getTime());
        });
    });

    describe('#getAvatar()', function() {
        it('should return userAvatar in raw_data', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "chat",
                "hidden": false,
                "ownMsg": true,
                "isInstructor": false,
                "isTA": true,
                "msgTime": "2017 11 12 9:00",
                "userAvatar": "test avatar"
            });
            assert.equal("test avatar", msg.getAvatar());
        });
    });

    describe('#getInitials()', function() {
        it('should return initials in raw_data', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "chat",
                "hidden": false,
                "ownMsg": true,
                "isInstructor": false,
                "isTA": true,
                "msgTime": "2017 11 12 9:00",
                "userAvatar": "test avatar",
                "initials": "JZ"
            });
            assert.equal("JZ", msg.getInitials());
        });
    });

    describe('#getUsername()', function() {
        it('should return username in raw_data', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "chat",
                "hidden": false,
                "ownMsg": true,
                "isInstructor": false,
                "isTA": true,
                "msgTime": "2017 11 12 9:00",
                "userAvatar": "test avatar",
                "initials": "JZ",
                "username": "test username"
            });
            assert.equal("test username", msg.getUsername());
        });
    });

    describe('#hasFile()', function() {
        it('should return hasFile in raw_data', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "chat",
                "hidden": false,
                "ownMsg": true,
                "isInstructor": false,
                "isTA": true,
                "msgTime": "2017 11 12 9:00",
                "userAvatar": "test avatar",
                "initials": "JZ",
                "username": "test username",
                "hasFile": false
            });
            assert.equal(false, msg.hasFile());
        });
    });

    describe('#isImageFile()', function() {
        it('should return isImageFile in raw_data', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "chat",
                "hidden": false,
                "ownMsg": true,
                "isInstructor": false,
                "isTA": true,
                "msgTime": "2017 11 12 9:00",
                "userAvatar": "test avatar",
                "initials": "JZ",
                "username": "test username",
                "hasFile": false,
                "isImageFile": true
            });
            assert.equal(true, msg.isImageFile());
        });
    });

    describe('#isAudioFile()', function() {
        it('should return isMusicFile in raw_data', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "chat",
                "hidden": false,
                "ownMsg": true,
                "isInstructor": false,
                "isTA": true,
                "msgTime": "2017 11 12 9:00",
                "userAvatar": "test avatar",
                "initials": "JZ",
                "username": "test username",
                "hasFile": false,
                "isImageFile": true,
                "isMusicFile": false
            });
            assert.equal(false, msg.isAudioFile());
        });
    });

    describe('#isPdfFile()', function() {
        it('should return isPDFFile in raw_data', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "chat",
                "hidden": false,
                "ownMsg": true,
                "isInstructor": false,
                "isTA": true,
                "msgTime": "2017 11 12 9:00",
                "userAvatar": "test avatar",
                "initials": "JZ",
                "username": "test username",
                "hasFile": false,
                "isImageFile": true,
                "isMusicFile": false,
                "isPDFFile": true
            });
            assert.equal(true, msg.isPdfFile());
        });
    });

    describe('#getFileName()', function() {
        it('should return filename in raw_data', function() {
            let msg = new Message({
                'msg' : "test message",
                'type': "chat",
                "hidden": false,
                "ownMsg": true,
                "isInstructor": false,
                "isTA": true,
                "msgTime": "2017 11 12 9:00",
                "userAvatar": "test avatar",
                "initials": "JZ",
                "username": "test username",
                "hasFile": false,
                "isImageFile": true,
                "filename": "test.txt"
            });
            assert.equal("test.txt", msg.getFileName());
        });
    });
});