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
    id: 'tool_zoom_out',
    title: 'zoom_out',
    style: 'background-image: url(images/zoom_out.svg);'
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
/* leftToolbar.addButton({
    id: 'tool_matrix',
    title: 'Create Matrix',
    style: 'background-image: url(images/grid.png);'
}); */
leftToolbar.addButton({
    id: 'tool_send_mobile',
    title: 'Convert and Send',
    style: 'background-image: url(images/send.png);'
});

if (svgedit.browser.isTouch()) {
    $("#send-sheet-background").mousedown(function(){
        $("#send-sheet").removeClass("shown");
        $(this).removeClass("shown");
    });

    $(".preview-button").mousedown(function(){
        $("#send-sheet").removeClass("shown");
        $("#send-sheet-background").removeClass("shown");
    });
} else {
    $("#send-sheet-background").click(function(){
        $("#send-sheet").removeClass("shown");
        $(this).removeClass("shown");
    });

    $(".preview-button").click(function(){
        $("#send-sheet").removeClass("shown");
        $("#send-sheet-background").removeClass("shown");
    });
}
