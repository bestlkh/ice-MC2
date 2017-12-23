'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = require('jquery');
var md5 = require('blueimp-md5');

var ChatInput = function () {
    function ChatInput(dom) {
        _classCallCheck(this, ChatInput);

        this._dom = $(dom);
        this._dom.attr('contenteditable', true);
    }

    _createClass(ChatInput, [{
        key: 'addBlock',
        value: function addBlock(content) {
            var attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var block = $("<span>");
            block.addClass("input-inline-block");
            block.html(content);
            block.attr("contenteditable", false);
            for (attr_key in attr) {
                block.attr(attr_key, attr[attr_key]);
            }
            for (style_key in style) {
                block.attr(style_key, style[style_key]);
            }
            this._dom.append(block);
        }
    }]);

    return ChatInput;
}();

module.exports = ChatInput;