leftToolbar = new UI.Toolbar($("#tools_left"));
leftToolbar._getToolButtonMarkup = function(config){
    return "<div class='tool_button' id='" + config.id + "' title='" + config.title + "' style='" + config.style + "'></div>";
};
leftToolbar.addButton({
    id: 'tool_select',
    title: 'Select Tool [V]'
});
leftToolbar.addButton({
    id: 'tool_fhpath',
    title: 'Pencil Tool [P]'
});
leftToolbar.addButton({
    id: 'tool_deletebutton',
    title: 'Undo/Delete Tool [U]',
    style: 'background-image: url(images/undo-arrow.svg);'
});
leftToolbar.addButton({
    id: 'tool_convert',
    title: 'Convert Tool [C]',
    style: 'background-image: url(images/swap.png);'
});
leftToolbar.addButton({
    id: 'tool_toggle_keyboard',
    title: 'Show/Hide Keyboard',
    style: 'background-image: url(images/keyboard-up.svg);'
});
leftToolbar.addButton({
    id: 'tool_send_as_image',
    title: 'Send as Image',
    style: 'background-image: url(images/send_as_img.png);'
});



$("#image-import-input").on('change', function(){
    if (this.files && this.files[0]) {
        var fileReader = new FileReader();
        fileReader.addEventListener("load", function(e) {
            console.log(e.target.result);
            var image = new Image();
            image.src = e.target.result;

            image.onload = function() {
                // access image size here
                var newImage = svgCanvas.addSvgElementFromJson({
                    "element": "image",
                    "attr": {
                        "x": 0,
                        "y": 0,
                        "width": this.width,
                        "height": this.height,
                        "id": svgCanvas.getNextId(),
                        "style": "pointer-events:inherit"
                    }
                });
                svgCanvas.setHref(newImage, e.target.result);
            };
        });

        fileReader.readAsDataURL(this.files[0]);
    }
});