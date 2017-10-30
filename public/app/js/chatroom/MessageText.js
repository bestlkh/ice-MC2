var MessageText = function(text){
    this.text = text;
    this.is_image = text.match(/^\[mc2-image\]/);

    this.getRaw = function(){
        return this.text;
    };

    this.isImage = function(){
        return this.is_image;
    };

    this.getImage = function(){
        var re = /^\[mc2-image\]/;
        return this.text.replace(re, "");
    };
};