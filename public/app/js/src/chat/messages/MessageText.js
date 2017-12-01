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

        this.is_image = this.text.match(/^\[mc2-image\]/);
        this.is_equation = this.text.match(/^\$\$[\s\S]*\$\$$/);
    }

    getRaw(){
        return this.text;
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
        return this.attachments['svg-source'];
    }

    getSvgSource(){
        return atob(this.attachments['svg-source']);
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
}

module.exports = MessageText;