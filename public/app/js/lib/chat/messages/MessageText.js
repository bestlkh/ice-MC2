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

        if (this.text.match(/^\[mc2-image\]/)) {
            this.is_image = true;
        } else {
            this.is_image = false;
        }

        if (this.text.match(/^\$\$[\s\S]*\$\$$/)) {
            this.is_equation = true;
        } else {
            this.is_equation = false;
        }
    }

    _createClass(MessageText, [{
        key: 'getRaw',
        value: function getRaw() {
            return this.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
            if (this.attachments['svg-source']) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'getSvgSource',
        value: function getSvgSource() {
            return decodeURIComponent(escape(atob(this.attachments['svg-source'])));
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
    }, {
        key: 'getTextSize',
        value: function getTextSize() {
            return this._getByteLen(this.text);
        }
    }, {
        key: 'getAttachmentsSize',
        value: function getAttachmentsSize() {
            return this._getByteLen(this.raw_attachments);
        }

        /**
         * Get byte length of a string in UTF-8 format
         * @param normal_val
         * @returns {number}
         * @private
         */

    }, {
        key: '_getByteLen',
        value: function _getByteLen(normal_val) {
            // Force string type
            normal_val = String(normal_val);

            var byteLen = 0;
            for (var i = 0; i < normal_val.length; i++) {
                var c = normal_val.charCodeAt(i);
                byteLen += c < 1 << 7 ? 1 : c < 1 << 11 ? 2 : c < 1 << 16 ? 3 : c < 1 << 21 ? 4 : c < 1 << 26 ? 5 : c < 1 << 31 ? 6 : Number.NaN;
            }
            return byteLen;
        }
    }]);

    return MessageText;
}();

module.exports = MessageText;