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

    describe("#getId()", function(){
        it('should return valid md5 ID for that message', function() {
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
            assert.equal("fe93576cdab471c4c6f71771cbc0e9f7", msg.getId());
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

describe('MessageText', function(){
    describe('#constructor()', function(){
        it('should initialize a Remarkable instance', function(){
            let txt = new MessageText("test");
            assert.equal("Remarkable", txt.md.constructor.name);
        });
        it('should set text plain if no attachment', function(){
            let txt = new MessageText("test");
            assert.equal("test", txt.text);
        });
        it('should set raw_attachments to e30= if no attachment', function(){
            let txt = new MessageText("test");
            assert.equal("e30=", txt.raw_attachments);
        });
        it('should render text to html', function(){
            let txt = new MessageText("test");
            assert.equal("<p>test</p>\n", txt.rendered_text);
            txt = new MessageText("# test");
            assert.equal("<h1>test</h1>\n", txt.rendered_text);
        });
        it('should parse attachments to json', function(){
            let txt = new MessageText(`test
-----MC2 BEGIN ATTACHMENT-----
eyAidGVzdCI6ICJkYXRhIn0=
-----MC2 END ATTACHMENT-----
            `);
            assert.deepEqual({ 'test': 'data' }, txt.attachments);
        });
        it('should not include attachments in text', function(){
            let txt = new MessageText(`test
-----MC2 BEGIN ATTACHMENT-----
eyAidGVzdCI6ICJkYXRhIn0=
-----MC2 END ATTACHMENT-----
            `);
            assert.equal("test", txt.text);
        });
        it('should detect is_image', function(){
            let txt = new MessageText("[mc2-image]imagedatahere");
            assert.equal(true, txt.is_image);
            txt = new MessageText("test message");
            assert.equal(false, txt.is_image);
        });
        it('should detect is_equation', function(){
            let txt = new MessageText("$$mc^2$$");
            assert.equal(true, txt.is_equation);
            txt = new MessageText("not equation");
            assert.equal(false, txt.is_equation);
        });
    });

    describe("#getRaw()", function(){
        it('should return text content', function(){
            let txt = new MessageText("test");
            assert.equal("test", txt.getRaw());
        });
    });

    describe("#getRenderedText()", function(){
        it('should return rendered html content', function(){
            let txt = new MessageText("test");
            assert.equal("<p>test</p>\n", txt.getRenderedText());
        });
    });

    describe("#getRawAttachments()", function(){
        it('should return raw base64 attachments', function(){
            let txt = new MessageText(`test
-----MC2 BEGIN ATTACHMENT-----
eyAidGVzdCI6ICJkYXRhIn0=
-----MC2 END ATTACHMENT-----
            `);
            assert.equal("eyAidGVzdCI6ICJkYXRhIn0=", txt.getRawAttachments());
        });
    });

    describe("#getAttachments()", function(){
        it('should return JSON attachments', function(){
            let txt = new MessageText(`test
-----MC2 BEGIN ATTACHMENT-----
eyAidGVzdCI6ICJkYXRhIn0=
-----MC2 END ATTACHMENT-----
            `);
            assert.deepEqual({ 'test': 'data' }, txt.getAttachments());
        });
    });

    describe("#hasSvgSource()", function(){
        it('should return true if svg-source is present', function(){
            let txt = new MessageText(`test
-----MC2 BEGIN ATTACHMENT-----
eyAic3ZnLXNvdXJjZSI6ICJkYXRhIn0=
-----MC2 END ATTACHMENT-----
            `);
            assert.equal(true, txt.hasSvgSource());
        });
        it('should return false if svg-source is not present', function(){
            let txt = new MessageText(`test
-----MC2 BEGIN ATTACHMENT-----
eyAidGVzdCI6ICJkYXRhIn0=
-----MC2 END ATTACHMENT-----
            `);
            assert.equal(false, txt.hasSvgSource());
        });
    });

    describe("#getSvgSource()", function(){
        it('should return decoded svg source', function(){
            let txt = new MessageText(`test
-----MC2 BEGIN ATTACHMENT-----
eyAic3ZnLXNvdXJjZSI6ICJZMjl2YkNFPSJ9
-----MC2 END ATTACHMENT-----
            `);
            assert.equal("cool!", txt.getSvgSource());
        });
    });

    describe("#isEquation()", function(){
        it('should return true if is equation', function(){
            let txt = new MessageText(`$$equation$$
-----MC2 BEGIN ATTACHMENT-----
eyAic3ZnLXNvdXJjZSI6ICJZMjl2YkNFPSJ9
-----MC2 END ATTACHMENT-----
            `);
            assert.equal(true, txt.isEquation());
        });
    });

    describe("#isImage()", function(){
        it('should return true if is image', function(){
            let txt = new MessageText(`[mc2-image]testimage
-----MC2 BEGIN ATTACHMENT-----
eyAic3ZnLXNvdXJjZSI6ICJZMjl2YkNFPSJ9
-----MC2 END ATTACHMENT-----
            `);
            assert.equal(true, txt.isImage());
        });
    });

    describe("#getImage()", function(){
        it('should return image content', function(){
            let txt = new MessageText(`[mc2-image]testimage
-----MC2 BEGIN ATTACHMENT-----
eyAic3ZnLXNvdXJjZSI6ICJZMjl2YkNFPSJ9
-----MC2 END ATTACHMENT-----
            `);
            assert.equal('testimage', txt.getImage());
        });
    });

    describe("#_getByteLen()", function(){
        it('should return correct bytes for english words', function(){
            let txt = new MessageText(`[mc2-image]testimage
-----MC2 BEGIN ATTACHMENT-----
eyAic3ZnLXNvdXJjZSI6ICJZMjl2YkNFPSJ9
-----MC2 END ATTACHMENT-----
            `);

            assert.equal(4, txt._getByteLen("test"));
            assert.equal(21, txt._getByteLen("卧槽也是没谁了"));
            assert.equal(27, txt._getByteLen("龍神の剣を喰らえ！"));
        })
    });

    describe("#getTextSize()", function(){
        it('should return correct size for text', function(){
            let txt = new MessageText(`[mc2-image]testimage
-----MC2 BEGIN ATTACHMENT-----
eyAic3ZnLXNvdXJjZSI6ICJZMjl2YkNFPSJ9
-----MC2 END ATTACHMENT-----
            `);

            assert.equal(20, txt.getTextSize());
        })
    })

    describe("#getAttachmentsSize()", function(){
        it('should return correct size for attachments', function(){
            let txt = new MessageText(`[mc2-image]testimage
-----MC2 BEGIN ATTACHMENT-----
eyAic3ZnLXNvdXJjZSI6ICJZMjl2YkNFPSJ9
-----MC2 END ATTACHMENT-----
            `);

            assert.equal(36, txt.getAttachmentsSize());
        })
    })

});