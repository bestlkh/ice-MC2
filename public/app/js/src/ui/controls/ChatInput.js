var $ = require('jquery');
var md5 = require('blueimp-md5');

class ChatInput {
    constructor(dom){
        this._dom = $(dom)
        this._dom.attr('contenteditable', true);
    }

    addBlock(content, attr = {}, style = {}){
        var block = $("<span>");
        block.addClass("input-inline-block")
        block.html(content)
        block.attr("contenteditable", false)
        for (attr_key in attr) {
            block.attr(attr_key, attr[attr_key])
        }
        for (style_key in style) {
            block.attr(style_key, style[style_key])
        }
        this._dom.append(block)
    }
}

module.exports = ChatInput;