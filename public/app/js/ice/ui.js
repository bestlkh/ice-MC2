leftToolbar = new ui.Toolbar($("#tools_left"));
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