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
    var PARENT_WINDOW = parent.window;
    var ACCREDITED_LIB_ENDPOINT = "/api/v1/image-libraries";

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
    var accreditedLibs = [];
    let panelSelector = null;
    let currentSelectedLibrary = "All";

    /**
     * Insert a new image into SVG Canvas
     */
    function importImage(url) {
        var newImage = svgCanvas.addSvgElementFromJson({
            "element": "image",
            "attr": {
                "x": 100,
                "y": 50,
                "width": 200,
                "height": 200,
                "id": svgCanvas.getNextId(),
                "style": "pointer-events:inherit"
            }
        });
        svgCanvas.clearSelection();
        svgCanvas.addToSelection([newImage]);
        svgCanvas.setHref(newImage, url);
        // Have to add this line, otherwise mobile will not work
        newImage.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    }

    /**
     * Reload all accredited libs from API
     * Will automatically reload accreditedLibs variable
     * @returns {Promise<Array>}
     */
    function reloadAccreditedLibraries(){
        return new Promise(function(resolve, reject){
            axios.get(ACCREDITED_LIB_ENDPOINT).then(function(data){
                accreditedLibs = data.data;
                resolve(data.data);
            }).catch(function(e) {
                PARENT_WINDOW.Alert.Notification.spawn("Failed to load accredited image libraries...", "error");
                reject(e);
            });
        });
    }

    /**
     * Prompt to import external library
     * @param e
     */
    function promptExternalImport(e){
        var url = prompt("Please enter your external library URL\nex. https://example.com/lib/my-img-lib.json");
        if(url){
            importExternalLibrary(url).then(function(info){
                alert("Successfully imported external library: " + info.name + " by " + info.author + ".");
            }).catch(function(){
                alert("Failed to import external library.");
            })
        }
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
        let button = $("<div class='imglib-browser-button ignore-touch-conversion'>");
        let currentImageSource = null;
        if(image.url){
            button[0].style.backgroundImage = "url(" + image.url + ")";
            currentImageSource = image.url;
        } else {
            button[0].style.backgroundImage = "url(" + image.base64 + ")";
            currentImageSource = image.base64;
        }

        button.append("<div class='imglib-button-overlay ignore-touch-conversion'>" + image.title  + "</div>")

        button.click(function(){
            importImage(currentImageSource);
            toggleImageLibraryPanel();
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
            if(currentSelectedLibrary !== 'All' && currentSelectedLibrary !== loadedLibs[i].name){
                continue;
            }
            for(var k = 0; k < loadedLibs[i].images.length; k++){
                buttons.push(makeImageLibraryButton(loadedLibs[i], loadedLibs[i].images[k]))
            }
        }
        return buttons;
    }

    /**
     * Reload image browser UI
     */
    function reloadImageBrowser(reloadSelection = true){
        let buttons = makeImageLibraryButtons();
        let panelBrowser = $("#imglib-browser");
        panelBrowser.html("");
        if(reloadSelection){
            panelSelector.html("");
            panelSelector.append("<option value='All'>All</option>")
            for(let i = 0; i < loadedLibs.length; i++) {
                let option = $("<option>" + loadedLibs[i].name + "</option>");
                option.attr('value', loadedLibs[i].name);
                panelSelector.append(option);
            }
        }

        for(var i = 0; i < buttons.length; i++){
            panelBrowser.append(buttons[i]);
        }
    }

    /**
     * Create the image library UI panel
     * @returns {void|jQuery|HTMLElement}
     */
    function makeImageLibraryPanel() {
        let panel = $("<div id='imglib-panel' class='ignore-touch-conversion'></div>");
        let panelTitle = $("<div class='imglib-panel-title'>");
        panelTitle.text(methodDraw.uiStrings.imagelib.title);
        panel.append(panelTitle);

        let panelAddSourceButton = $("<div class='imglib-button'></div>");
        panelAddSourceButton.text(methodDraw.uiStrings.imagelib.add_source);
        panelTitle.append(panelAddSourceButton);

        panelAddSourceButton.mousedown(promptExternalImport);

        let panelBrowser = $("<div id='imglib-browser' class='ignore-touch-conversion'>");
        panel.append(panelBrowser);

        panelSelector = $("<select>");
        panelSelector.append("<option>Loading ...</option>");

        panelSelector.on('change', function(){
            currentSelectedLibrary = $(this).val();
            reloadImageBrowser(false);
        });

        panelTitle.append(panelSelector);

        return panel;
    }

    function toggleImageLibraryPanel(){
        $("#imglib-panel").toggleClass("shown");
        $("#imglib-backdrop").toggleClass("shown");
    }


    return {
        buttons: [{
            id: "tool_image",
            type: "mode",
            position: 5,
            title: "Image Library",
            icon: "extensions/ext-shapes.png",
            events: {
                "mousedown": function () {
                    toggleImageLibraryPanel();
                }
            }
        }],
        callback: function () {
            reloadAccreditedLibraries().then(function(libs){
                // This is our first load, we will load everything that contains
                // auto-load == true
                for(var i = 0; i < libs.length; i++){
                    var lib = libs[i];
                    if(lib['auto-load']){
                        importExternalLibrary(lib['link']).catch(function(e){
                            PARENT_WINDOW.Alert.Notification.spawn("Failed to load image library...");
                        });
                    }
                }
            });
            $('body').append('<div id="imglib-backdrop"></div>');
            $('body').append(makeImageLibraryPanel());
            $("#imglib-backdrop").on('mousedown', function(){
                toggleImageLibraryPanel();
            });
        }
    }
});
