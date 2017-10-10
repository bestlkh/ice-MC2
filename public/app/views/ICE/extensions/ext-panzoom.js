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
    var zoom = 1;
    var zoomInc = 0.25;

    var isMobile = false;
    if ($(window).width() <= 732) isMobile = true;

    if (isMobile) {

        // $panzoom = $("#svgroot").panzoom({
        //     transition: true,
        //     duration: 200,
        //     easing: "ease-in-out",
        //     disablePan: true,
        //     animate: true
        // });

        $("#workarea").css({
            overflow: "hidden"
        })
    }

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
                    var isMobile = false;
                    if ($(window).width() <= 732) isMobile = true;

                    if (!isMobile) return;
                    canv.setMode("pan");


                    var workarea = $("#svgroot");

                    // var options = {
                    //     preventDefault: true
                    // };
                    // var hammer = new Hammer(workarea[0], options);
                    // console.log('hammer');
                    //
                    // hammer.get('pinch').set({ enable: true });
                    // hammer.on("pinch", function (e) {
                    //     alert.log(e.scale);
                    // });



                    if ($panzoom && $panzoom.panzoom("isDisabled")) {
                        $panzoom.panzoom("enable");
                    }
                    else if (!$panzoom) {
                        $panzoom = $("#svgroot").panzoom({


                            transition: true,
                            duration: 200,
                            easing: "ease-in-out",
                            disablePan: true,
                            animate: true
                        });


                    }


                    workarea.css({
                        'transform-origin': '0% 0% 0px'
                    });
                },
                "click": function () {

                    var isMobile = false;
                    if ($(window).width() <= 732) isMobile = true;


                    canv.setMode("pan");



                    var workarea = $("#svgroot");


                    if ($panzoom && $panzoom.panzoom("isDisabled")) {
                        $panzoom.panzoom("enable");
                    }
                    else if (!$panzoom) {
                        $panzoom = $("#svgroot").panzoom({


                            transition: true,
                            duration: 200,
                            easing: "ease-in-out",
                            disablePan: true,
                            animate: true
                        });

                        var options = {
                            preventDefault: true
                        };
                        var hammer = new Hammer(workarea[0], options);

                        hammer.get('pinch').set({ enable: true });
                        hammer.on("pinch", function (e) {
                            alert(e.scale);
                            $panzoom.panzoom("zoom", e.scale);
                            workarea.attr({
                                width: 1920 * e.scale * 2,
                                height: 1040 * e.scale * 2
                            });
                            workarea.css({
                                'transform-origin': '0% 0% 0px'
                            });
                            $("#svgcanvas").css({
                                width: 1920 * e.scale,
                                height: 1040 * e.scale
                            })
                        });
                        if (isMobile)  {


                            return;
                        }
                        workarea.bind("mouseup", function (e) {

                            var mode = canv.getMode();

                            if (mode === "pan") {
                                if (e.shiftKey) zoom -= zoomInc;
                                else zoom += zoomInc;
                                if (zoom < 0.5) zoom = 0.5;
                                else if (zoom > 16) zoom = 16;

                                $panzoom.panzoom("zoom", zoom);
                                workarea.attr({
                                    width: 1920 * zoom * 2,
                                    height: 1040 * zoom * 2
                                });
                                workarea.css({
                                    'transform-origin': '0% 0% 0px'
                                });
                                $("#svgcanvas").css({
                                    width: 1920 * zoom,
                                    height: 1040 * zoom
                                })
                            }

                        });

                        var svg = $("#svgcanvas");

                        svg.css({
                            cursor: "zoom-in"
                        });

                        $(document).on('keydown keyup', function(e){

                            var mode = canv.getMode();

                            if (mode === "pan") {
                                if (e.shiftKey) {

                                    svg.css({
                                        cursor: "zoom-out"
                                    });

                                }
                                else {
                                    svg.css({
                                        cursor: "zoom-in"
                                    });

                                }
                            }
                        });
                    }



                    workarea.css({
                        'transform-origin': '0% 0% 0px'
                    });


                }
            }
        }],
        callback: function () {

            $(document).bind("mouseup", function (e) {

                setTimeout(function () {
                    var mode = canv.getMode();
                    if (mode !== "pan") {
                        if (!$panzoom) return;
                        $panzoom.panzoom("disable");
                        var svg = $("#svgcanvas");
                        svg.css({
                            cursor: "text"
                        });
                    }
                }, 100);

            });



        },
        mouseDown: function (opts) {

        },
        mouseMove: function (opts) {


        }
    }
});