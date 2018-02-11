var Remarkable = require('remarkable');
var atob = require('atob');
var btoa = require('btoa');

class MessageText {
    constructor(text){
        this.md = new Remarkable();
        text = text.split("-----MC2 BEGIN ATTACHMENT-----");
        this.text = text[0].replace(/^\n|\n$/g, '');
        if(text.length > 1){
            text = text[1].split("-----MC2 END ATTACHMENT-----");
            this.raw_attachments = text[0].replace(/^\n|\n$/g, '');
        } else {
            this.raw_attachments = "e30=";
        }

        this.rendered_text = this.md.render(this.text);
        this.attachments = JSON.parse(atob(this.raw_attachments));

        if(this.text.match(/^\[mc2-image\]/)){
            this.is_image = true;
        } else {
            this.is_image = false;
        }

        if(this.text.match(/^\$\$[\s\S]*\$\$$/)){
            this.is_equation = true;
        } else {
            this.is_equation = false;
        }
    }

    getRaw(){
        return this.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    getRenderedText(){
        return this.rendered_text;
    }

    getRawAttachments(){
        return this.raw_attachments;
    }

    getAttachments(){
        return this.attachments;
    }

    hasSvgSource(){
        if(this.attachments['svg-source']){
            return true;
        } else {
            return false;
        }
    }

    getSvgSource(){
        return decodeURIComponent(escape(atob(this.attachments['svg-source'])));
    }

    isEquation(){
        return this.is_equation;
    }

    isImage(){
        return this.is_image;
    }

    getImage(){
        var re = /^\[mc2-image\]/;
        return this.text.replace(re, "");
    }

    getTextSize(){
        return this._getByteLen(this.text);
    }

    getAttachmentsSize(){
        return this._getByteLen(this.raw_attachments);
    }

    /**
     * Get byte length of a string in UTF-8 format
     * @param normal_val
     * @returns {number}
     * @private
     */
    _getByteLen(normal_val) {
        // Force string type
        normal_val = String(normal_val);

        var byteLen = 0;
        for (var i = 0; i < normal_val.length; i++) {
            var c = normal_val.charCodeAt(i);
            byteLen += c < (1 <<  7) ? 1 :
                       c < (1 << 11) ? 2 :
                       c < (1 << 16) ? 3 :
                       c < (1 << 21) ? 4 :
                       c < (1 << 26) ? 5 :
                       c < (1 << 31) ? 6 : Number.NaN;
        }
        return byteLen;
    }
}

module.exports = MessageText;