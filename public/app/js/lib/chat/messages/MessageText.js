'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Remarkable = require('remarkable');
var atob = require('atob');
var btoa = require('btoa');

var MessageText = function () {
    function MessageText(text) {
        _classCallCheck(this, MessageText);

        this.md = new Remarkable();
        text = text.split("-----MC2 BEGIN ATTACHMENT-----");
        this.text = text[0].replace(/^\n|\n$/g, '');
        if (text.length > 1) {
            text = text[1].split("-----MC2 END ATTACHMENT-----");
            this.raw_attachments = text[0].replace(/^\n|\n$/g, '');
        } else {
            this.raw_attachments = "e30=";
        }

        this.rendered_text = this.md.render(this.text);
        this.attachments = JSON.parse(atob(this.raw_attachments));

        this.is_image = this.text.match(/^\[mc2-image\]/);
        this.is_equation = this.text.match(/^\$\$[\s\S]*\$\$$/);
    }

    _createClass(MessageText, [{
        key: 'getRaw',
        value: function getRaw() {
            return this.text;
        }
    }, {
        key: 'getRenderedText',
        value: function getRenderedText() {
            return this.rendered_text;
        }
    }, {
        key: 'getRawAttachments',
        value: function getRawAttachments() {
            return this.raw_attachments;
        }
    }, {
        key: 'getAttachments',
        value: function getAttachments() {
            return this.attachments;
        }
    }, {
        key: 'hasSvgSource',
        value: function hasSvgSource() {
            return this.attachments['svg-source'];
        }
    }, {
        key: 'getSvgSource',
        value: function getSvgSource() {
            return atob(this.attachments['svg-source']);
        }
    }, {
        key: 'isEquation',
        value: function isEquation() {
            return this.is_equation;
        }
    }, {
        key: 'isImage',
        value: function isImage() {
            return this.is_image;
        }
    }, {
        key: 'getImage',
        value: function getImage() {
            var re = /^\[mc2-image\]/;
            return this.text.replace(re, "");
        }
    }]);

    return MessageText;
}();

module.exports = MessageText;