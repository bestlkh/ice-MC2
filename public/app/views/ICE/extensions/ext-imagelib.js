/*
 * ext-imagelib.js
 *
 * Licensed under the Apache License, Version 2
 *
 * Copyright(c) 2010-2018 Alexis Deveria, Jun Zheng
 * Jun Zheng: Made significant changes to original file, so basically this is brand new :)
 *
 */

methodDraw.addExtension("imagelib", function () {

    var uiStrings = methodDraw.uiStrings;

    $.extend(uiStrings, {
        imagelib: {
            title: 'Image Library',
            add_source: 'Import External Library ...',
            show_list: 'Show library list',
            import_single: 'Import single',
            import_multi: 'Import multiple',
            open: 'Open as new document'
        }
    });

    var xlinkns = "http://www.w3.org/1999/xlink";

    var loadedLibs = [];

    function importImage(url) {
        var newImage = svgCanvas.addSvgElementFromJson({
            "element": "image",
            "attr": {
                "x": 0,
                "y": 0,
                "width": 200,
                "height": 200,
                "id": svgCanvas.getNextId(),
                "style": "pointer-events:inherit"
            }
        });
        svgCanvas.clearSelection();
        svgCanvas.addToSelection([newImage]);
        svgCanvas.setImageURL(url);
    }

    /**
     * Prompt to import external library
     * @param e
     */
    function promptExternalImport(e){
        var url = prompt("Please enter your external library URL\nex. https://example.com/lib/my-img-lib.json");
        importExternalLibrary(url).then(function(info){
            alert("Successfully imported external library: " + info.name + " by " + info.author + ".");
        }).catch(function(){

        })
    }

    /**
     * Actually import the library
     * Will resolve if imported, otherwise rejected
     * @param url
     * @returns {Promise<any>}
     */
    function importExternalLibrary(url){
        return new Promise(function(resolve, reject) {
            axios.get(url).then(function(data){
                // TODO: Verify the validity of the library
                loadedLibs.push(data.data);
                reloadImageBrowser();
                resolve({
                    name: data.data.name,
                    author: data.data.author
                });
            }).catch(function(e){
                reject(e);
            })
        })
    }

    /**
     * Make a image library browser button
     * @param lib
     * @param image
     * @returns {void|jQuery|HTMLElement}
     */
    function makeImageLibraryButton(lib, image){
        var button = $("<div class='imglib-browser-button'>");
        var buttonPreviewImage = $("<img>");
        if(image.url){
            buttonPreviewImage.attr('src', image.url);
        } else {
            buttonPreviewImage.attr('src', image.base64);
        }
        button.append(buttonPreviewImage);

        button.append("<div class='imglib-button-overlay'>" + image.title  + "</div>")

        button.mouseup(function(){
            importImage(buttonPreviewImage.attr('src'));
        });

        return button;

    }

    /**
     * Make all the buttons needed
     * @returns {Array}
     */
    function makeImageLibraryButtons() {
        let buttons = [];
        // Loop though all libs
        for(var i = 0; i < loadedLibs.length; i++){
            // Loop though all lib images
            for(var k = 0; k < loadedLibs[i].images.length; k++){
                buttons.push(makeImageLibraryButton(loadedLibs[i], loadedLibs[i].images[k]))
            }
        }
        return buttons;
    }

    function reloadImageBrowser(){
        let buttons = makeImageLibraryButtons();
        let panelBrowser = $("#imglib-browser");
        panelBrowser.html("");
        for(var i = 0; i < buttons.length; i++){
            panelBrowser.append(buttons[i]);
        }
    }

    /**
     * Create the image library UI panel
     * @returns {void|jQuery|HTMLElement}
     */
    function makeImageLibraryPanel() {
        var panel = $("<div id='imglib-panel'></div>");
        var panelTitle = $("<div class='imglib-panel-title'>");
        panelTitle.text(methodDraw.uiStrings.imagelib.title);
        panel.append(panelTitle);

        var panelAddSourceButton = $("<div class='imglib-button'></div>");
        panelAddSourceButton.text(methodDraw.uiStrings.imagelib.add_source);
        panelTitle.append(panelAddSourceButton);

        panelAddSourceButton.mousedown(promptExternalImport);

        var panelBrowser = $("<div id='imglib-browser'>");
        panel.append(panelBrowser);

        return panel;
    }

    function toggleImageLibraryPanel(){
        $("#imglib-panel").toggleClass("shown");
    }


    return {
        buttons: [{
            id: "tool_image",
            type: "mode",
            position: 5,
            title: "Image Library",
            icon: "extensions/ext-shapes.png",
            events: {
                "click": function () {
                    toggleImageLibraryPanel();
                }
            }
        }],
        callback: function () {
            $('body').append(makeImageLibraryPanel());
        }
    }
});
