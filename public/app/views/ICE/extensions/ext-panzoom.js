/*
 * ext-shapes.js
 *
 * Licensed under the Apache License, Version 2
 *
 * Copyright(c) 2010 Christian Tzurcanu
 * Copyright(c) 2010 Alexis Deveria
 *
 */

methodDraw.addExtension("panzoom", function () {
    canv = methodDraw.canvas;
    var $panzoom;

    return {
        svgicons: "extensions/zoom.svg",
        buttons: [{
            id: "tool_panzoom",
            type: "mode", // _flyout
            position: 3,
            title: "Panzoom utility",
            icon: "extensions/zoom.svg",
            events: {
                "mouseup": function () {
                    canv.setMode("pan");
                    $panzoom = $("#svgroot").panzoom({
                        cursor: 'default',
                        increment: 4,
                        minScale: 0.5,
                        maxScale: 16,
                        rangeStep: 2,
                        transition: true,
                        duration: 200,
                        easing: "ease-in-out",
                        focal: {
                            clientX: 108,
                            clientY: 132
                        }
                    });
                }
            }
        }],
        callback: function () {
            $(document).bind("mouseup", function () {
                setTimeout(function () {
                    var mode = canv.getMode();
                    if (mode !== "pan") {
                        if ($panzoom) $panzoom.panzoom("destroy");
                    }
                }, 100);

            })

        },
        mouseDown: function (opts) {

        },
        mouseMove: function (opts) {


        }
    }
});