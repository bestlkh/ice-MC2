var MessageText = function(text){

    text = text.split("-----MC2 BEGIN ATTACHMENT-----");
    this.text = text[0].replace(/^\n|\n$/g, '');
    if(text.length > 1){
        text = text[1].split("-----MC2 END ATTACHMENT-----");
        this.raw_attachments = text[0].replace(/^\n|\n$/g, '');
    } else {
        this.raw_attachments = "e30=";
    }

    this.attachments = JSON.parse(atob(this.raw_attachments));


    this.is_image = this.text.match(/^\[mc2-image\]/);

    this.is_equation = this.text.match(/^\$\$.*\$\$$/);

    this.getRaw = function(){
        return this.text;
    };

    this.getRawAttachments = function(){
        return this.raw_attachments;
    };

    this.getAttachments = function(){
        return this.attachments;
    };

    this.hasSvgSource = function(){
        return this.attachments['svg-source'];
    };

    this.getSvgSource = function(){
        return atob(this.attachments['svg-source']);
    };

    this.isEquation = function(){
        return this.is_equation;
    };

    this.isImage = function(){
        return this.is_image;
    };

    this.getImage = function(){
        var re = /^\[mc2-image\]/;
        return this.text.replace(re, "");
    };


};