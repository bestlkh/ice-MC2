/*
 * ext-shapes.js
 *
 * Licensed under the Apache License, Version 2
 *
 * Copyright(c) 2010 Christian Tzurcanu
 * Copyright(c) 2010 Alexis Deveria
 *
 */

methodDraw.addExtension("shapes", function () {


    var current_d, cur_shape_id;
    var canv = methodDraw.canvas;
    var cur_shape;
    var start_x, start_y;
    var svgroot = canv.getRootElem();
    var lastBBox = {};
    var on = false;

    // This populates the category list
    var categories = {
        basic: '[a-z]',
        numerical: '[0-9]+-()',
        symbols: 'Symbols',
        greek: 'Greek',
        basicMath: "Math"
    };

    var library = {
        'basic': {
            data: {
                "a": "a,N,250,75,225", //**MDP char, Resizeable, height, x, y
                "b": "b,N,250,75,225",
                "c": "c,N,250,75,225",
                "d": "d,N,250,75,225",
                "e": "e,N,250,75,225",
                "f": "f,N,250,75,225",
                "g": "g,N,250,75,225",
                "h": "h,N,250,75,225",
                "i": "i,N,250,75,225",
                "j": "j,N,250,75,225",
                "k": "k,N,250,75,225",
                "l": "l,N,250,75,225",
                "m": "m,N,250,75,225",
                "n": "n,N,250,75,225",
                "o": "o,N,250,75,225",
                "p": "p,N,250,75,225",
                "q": "q,N,250,75,225",
                "r": "r,N,250,75,225",
                "s": "s,N,250,75,225",
                "t": "t,N,250,75,225",
                "u": "u,N,250,75,225",
                "v": "v,N,250,75,225",
                "w": "w,N,250,75,225",
                "x": "x,N,250,75,225",
                "y": "y,N,250,75,225",
                "z": "z,N,250,75,225",
                "left": "\u21e6,N,250,75,225",
                "up": "\u21e7,N,250,75,225",
                "right": "\u21e8,N,250,75,225",
                "down": "\u21e9,N,250,75,225",
                "space": " ,N,250,75,225",


            },
            buttons: []
        },
        'qwerty': {
            data: {
                "1": "1,N,250,75,225",
                "2": "2,N,250,75,225",
                "3": "3,N,250,75,225",
                "4": "4,N,250,75,225",
                "5": "5,N,250,75,225",
                "6": "6,N,250,75,225",
                "7": "7,N,250,75,225",
                "8": "8,N,250,75,225",
                "9": "9,N,250,75,225",
                "0": "0,N,250,75,225",
                "backspace": "\u232B,N,225,20,215",

                "q": "q,N,250,75,225",
                "w": "w,N,250,75,225",
                "e": "e,N,250,75,225",
                "r": "r,N,250,75,225",
                "t": "t,N,250,75,225",
                "y": "y,N,250,75,225",
                "u": "u,N,250,75,225",
                "i": "i,N,250,75,225",
                "o": "o,N,250,75,225",
                "p": "p,N,250,75,225",
                "a": "a,N,250,75,225", //**MDP char, Resizeable, height, x, y
                "s": "s,N,250,75,225",
                "d": "d,N,250,75,225",
                "f": "f,N,250,75,225",
                "g": "g,N,250,75,225",
                "h": "h,N,250,75,225",
                "j": "j,N,250,75,225",
                "k": "k,N,250,75,225",
                "l": "l,N,250,75,225",
                "z": "z,N,250,75,225",
                "x": "x,N,250,75,225",
                "c": "c,N,250,75,225",
                "v": "v,N,250,75,225",
                "b": "b,N,250,75,225",
                "n": "n,N,250,75,225",
                "m": "m,N,250,75,225",
                ".": ".,N,250,75,225",
                "shift": "shift,N,220,10,235",
                "space": " ,N,250,75,225",

                "left": "\u21e6,N,250,75,225",
                "up": "\u21e7,N,250,75,225",
                "right": "\u21e8,N,250,75,225",
                "down": "\u21e9,N,250,75,225",


            },
            buttons: []
        },
        'symbols': {
            data: {
                "i40": "\u2200,R,300,10,300", //**MDP char, Resizeable, height, x, y
                "i42": "\u2202,R,300,10,300",
                "i43": "\u2203,R,300,10,300",
                "i44": "\u2204,R,300,10,300",
                "i45": "\u2205,R,300,10,300",
                "i46": "\u2206,R,300,10,300", //**MDP char, Resizeable, height, x, y
                "i47": "\u2207,R,300,10,300",
                "i48": "\u2208,R,300,10,300",
                "i49": "\u2209,R,300,10,300",
                "i50": "\u220A,R,300,10,300",
                "i51": "\u220B,R,300,10,300",
                "i52": "\u220C,R,300,10,300", //**MDP char, Resizeable, height, x, y
                "i53": "\u220D,R,300,10,300",
                "i55": "\u220F,R,200,20,300",
                "i56": "\u2210,R,200,-30,300",
                "i57": "\u2211,R,200,20,300",
                "i58": "\u2212,R,300,10,300", //**MDP char, Resizeable, height, x, y
                "i59": "\u2213,R,300,10,300",
                "i60": "\u2214,R,300,10,300",
                "i61": "\u2229,R,300,10,300",
                "i62": "\u222A,R,300,10,300",
                "i63": "\u222B,R,200,25,300",
                "i64": "\u2218,R,300,10,300", //**MDP char, Resizeable, height, x, y
                "i65": "\u2219,R,300,10,300",
                "i66": "\u221A,R,300,-10,350",
                "i67": "\u221B,R,300,-10,350",
                "i68": "\u221C,R,300,-10,350",
                "i69": "\u221D,R,300,10,300",
                "i70": "\u221E,R,300,10,300",
                "i71": "\u221F,R,300,10,300",
                "i72": "\u2220,R,300,10,300", //**MDP char, Resizeable, height, x, y
                "i73": "\u2221,R,300,10,300",
                "i74": "\u2222,R,300,10,300",
                "i75": "\u2223,R,300,70,300",
                "i76": "\u2224,R,300,50,300",
                "i77": "\u2225,R,300,50,300"

            },
            buttons: []
        },
        'greek': {
            data: {
                "alpha": "\u03B1,R,300,10,300", //**MDP char, Resizeable, height, x, y
                "beta": "\u03B2,R,300,10,300",
                "gamma": "\u03B3,R,300,10,300",
                "delta": "\u03B4,R,300,10,300",
                "epsilon": "\u03B5,R,300,10,300", //**MDP char, Resizeable, height, x, y
                "zeta": "\u03B6,R,300,10,300",
                "eta": "\u03B7,R,300,10,300",
                "theta": "\u03B8,R,300,10,300",
                "iota": "\u03B9,R,300,10,300", //**MDP char, Resizeable, height, x, y
                "kappa": "\u03Ba,R,300,10,300",
                "lamda": "\u03Bb,R,300,10,300",
                "mu": "\u03Bc,R,300,10,300",
                "nu": "\u03Bd,R,300,10,300", //**MDP char, Resizeable, height, x, y
                "xi": "\u03Be,R,300,10,300",
                "omicron": "\u03Bf,R,300,10,300",
                "pi": "\u03c0,R,300,10,300",
                "rho": "\u03c1,R,300,10,300",
                "sigma": "\u03c3,R,300,10,300", //**MDP char, Resizeable, height, x, y
                "tau": "\u03c4,R,300,10,300",
                "upsilon": "\u03c5,R,300,10,300",
                "phi": "\u03c6,R,300,10,300",
                "chi": "\u03c7,R,300,10,300", //**MDP char, Resizeable, height, x, y
                "psi": "\u03c8,R,300,10,300",
                "omega": "\u03c9,R,300,10,300",

            },
            buttons: []
        },
        'greek2': {
            data: {
                "alpha": "\u03B1,R,300,10,300", //**MDP char, Resizeable, height, x, y
                "beta": "\u03B2,R,300,10,300",
                "gamma": "\u03B3,R,300,10,300",
                "delta": "\u03B4,R,300,10,300",
                "epsilon": "\u03B5,R,300,10,300", //**MDP char, Resizeable, height, x, y
                "zeta": "\u03B6,R,300,10,300",
                "eta": "\u03B7,R,300,10,300",
                "theta": "\u03B8,R,300,10,300",
                "iota": "\u03B9,R,300,10,300", //**MDP char, Resizeable, height, x, y
                "kappa": "\u03Ba,R,300,10,300",
                "lamda": "\u03Bb,R,300,10,300",
                "mu": "\u03Bc,R,300,10,300",
                "nu": "\u03Bd,R,300,10,300", //**MDP char, Resizeable, height, x, y
                "xi": "\u03Be,R,300,10,300",
                "omicron": "\u03Bf,R,300,10,300",
                "pi": "\u03c0,R,300,10,300",
                "rho": "\u03c1,R,300,10,300",
                "sigma": "\u03c3,R,300,10,300", //**MDP char, Resizeable, height, x, y
                "tau": "\u03c4,R,300,10,300",
                "upsilon": "\u03c5,R,300,10,300",
                "phi": "\u03c6,R,300,10,300",
                "chi": "\u03c7,R,300,10,300", //**MDP char, Resizeable, height, x, y
                "psi": "\u03c8,R,300,10,300",
                "omega": "\u03c9,R,300,10,300",

            },
            buttons: []
        },
        'numerical': {
            data: {
                "0": "0,N,250,75,225", //**MDP char, Resizeable, height, x, y
                "1": "1,N,250,75,225",
                "2": "2,N,250,75,225",
                "3": "3,N,250,75,225",
                "4": "4,N,250,75,225",
                "5": "5,N,250,75,225",
                "6": "6,N,250,75,225",
                "7": "7,N,250,75,225",
                "8": "8,N,250,75,225",
                "9": "9,N,250,75,225",
                "0": "0,N,250,75,225",
                "+": "+,N,250,75,225",
                "-": "-,N,250,75,225",
                ".": ".,N,250,75,225",
                "(": "(,N,250,75,225",
                ")": "),N,250,75,225",
                "[": "[,N,250,75,225",
                "]": "],N,250,75,225",
                "=": "=,N,250,75,225",
                "<": "<,N,250,75,225",
                ">": ">,N,250,75,225",
                "≤": "≤,N,250,75,225",
                "≥": "≥,N,250,75,225",

            },
            buttons: []
        },
        'basicMath': {
            data: {
                'root': 'M133.45757,302.23514L127.90965,175.37415L507.30505,174.22819L129.33541,174.2829C130.70946,215.61172 132.08352,256.94053 133.45757,298.26935L115.52818,284.66933L133.45757,302.23514z',
                'sum': 'm126.45467,174.437l-113.5001,134.29466c-2.49984,2.87774 -3,3.35722 -3,4.79624c0,3.35722 3,3.35722 8.99999,3.35722l263.99986,0l27.50014,-76.26003l-7.99999,0c-7.99999,23.02194 -28.99998,41.72712 -56.50014,50.36034c-4.99999,1.91849 -26.99998,9.113 -73.99996,9.113l-135.49978,0l110.99995,-131.41692c2,-2.87774 2.49984,-3.35752 2.49984,-4.79624c0,-1.43902 0,-1.43902 -2,-4.31676l-103.49978,-136.21315l125.99993,0c36.49982,0 109.99995,1.91849 131.99994,58.99388l7.99999,0l-27.50014,-71.46411l-263.99986,0c-8.99999,0 -8.99999,0.47977 -8.99999,9.59248l116.5001,153.95939l0,-0.00001zm0,0',
                'integral': 'm57.64048,207.76384c-3.17348,37.02398 -11.2835,47.24965 -23.97743,47.24965c-2.82087,0 -9.87306,-0.70522 -14.45698,-4.93653c6.69958,-0.70522 8.46262,-5.99436 8.46262,-9.16784c0,-6.34697 -4.93653,-9.52045 -9.16784,-9.52045c-4.58392,0 -9.52045,3.17348 -9.52045,9.87306c0,10.57828 11.2835,18.68829 24.68265,18.68829c21.50917,0 32.08745,-19.74612 37.02398,-39.84485c2.82087,-11.63611 10.93089,-77.22144 13.04654,-102.2567l4.23131,-56.06488c3.17348,-41.25529 10.57828,-46.89704 20.80395,-46.89704c2.11566,0 9.16784,0.35261 14.10437,4.58392c-6.34697,1.05783 -8.11001,6.34697 -8.11001,9.52045c0,6.34697 4.93653,9.16784 9.16784,9.16784c4.58392,0 9.52045,-2.82087 9.52045,-9.52045c0,-10.93089 -11.2835,-18.68829 -25.03526,-18.68829c-21.15656,0 -29.97179,21.86178 -33.8505,38.78703c-2.82087,12.34133 -10.93089,75.811 -12.69394,103.31453zm-4.23131,55.71227',
                'lbracket': 'm139.61088,304.82804c0,-0.93416 0,-1.40123 -5.23987,-6.53906c-37.63175,-37.36608 -47.63513,-93.88227 -47.63513,-139.65571c0,-51.84543 11.43243,-103.69086 49.06419,-140.58985c3.81081,-3.7366 3.81081,-4.20369 3.81081,-5.13783c0,-2.33537 -0.9527,-3.26953 -2.85811,-3.26953c-3.33446,0 -30.48648,20.55134 -48.58784,58.38449c-15.24325,32.69532 -19.05406,65.85771 -19.05406,90.61273c0,23.3538 3.33446,59.31865 20.00676,93.41518c18.57771,36.43192 44.30067,56.04912 47.63513,56.04912c1.90541,0 2.85811,-0.93416 2.85811,-3.26953l0.00001,-0.00001zm0,0',
                'rbracket': 'm224.40576,160.40921c0,-23.08137 -3.52365,-59.35211 -21.14188,-93.73865c-19.12838,-36.74178 -46.81417,-56.52582 -49.83444,-56.52582c-2.01352,0 -3.52365,1.41315 -3.52365,3.29734c0,0.9421 0,1.41315 6.04054,7.06573c31.71283,29.67605 49.83444,77.25195 49.83444,139.90141c0,51.81534 -11.5777,104.57277 -51.34458,142.25665c-4.53041,3.76839 -4.53041,4.23944 -4.53041,5.18154c0,1.88419 1.51014,3.29734 3.52365,3.29734c3.02027,0 32.21621,-20.72614 50.84121,-58.88106c16.61148,-32.9734 20.13513,-66.41784 20.13513,-91.85446l-0.00001,0l0,-0.00002zm0,0',
                'fraction': 'm20,160l270,0',
            },
            buttons: []
        },
        'object': {
            data: {
                'triangle': 'm1,280.375l149,-260.75l149,260.75z',
                'right_triangle': 'm1,299l0,-298l298,298z',
                'diamond': 'm1,150l149,-149l149,149l-149,149l-149,-149z',
                'pentagon': 'm1.00035,116.97758l148.99963,-108.4053l148.99998,108.4053l-56.91267,175.4042l-184.1741,0l-56.91284,-175.4042z',
                'hexagon': 'm1,149.99944l63.85715,-127.71428l170.28572,0l63.85713,127.71428l-63.85713,127.71428l-170.28572,0l-63.85715,-127.71428z',
                'parabola': 'm6.36505,9.9q64.91161,249.5 132.5,249.5t132.5,-249.5',
            },
            buttons: []
        },
    };

    var cur_lib = library.basic;

    var mode_id = 'shapelib';

    function loadIcons() {
        $('#shape_buttons').empty();

        // Show lib ones
        $('#shape_buttons').append(cur_lib.buttons);
    }

    function loadLibrary(cat_id) {

        var lib = library[cat_id];

        // if(!lib) {
        //   $('#shape_buttons').html('Loading...');
        //   $.getJSON('extensions/shapelib/' + cat_id + '.json', function(result, textStatus) {
        //     cur_lib = library[cat_id] = {
        //       data: result.data,
        //       size: result.size,
        //       fill: result.fill
        //     }
        //     makeButtons(cat_id, result);
        //     loadIcons();
        //   });
        //   return;
        // }

        cur_lib = lib;
        if (!lib.buttons.length && (cat_id === "basicMath" || cat_id == "object")) makeButtonsMath(cat_id, lib);
        if (!lib.buttons.length) makeButtons(cat_id, lib);
        loadIcons();
    }

    function makeButtonsMath(cat, shapes) {
        var size = cur_lib.size || 500;
        var fill = cur_lib.fill || false;
        var off = size * .05;
        var vb = [-off, -off, size + off * 2, size + off * 2].join(' ');
        var stroke = fill ? 0 : (size / 30);

        var shape_icon = new DOMParser().parseFromString(
            '<svg xmlns="http://www.w3.org/2000/svg"><svg viewBox="' + vb + '"><path fill="#333" stroke="transparent" stroke-width="' + stroke + '" /><\/svg><\/svg>',
            'text/xml');

        var width = 40;
        var height = 40;
        shape_icon.documentElement.setAttribute('width', width);
        shape_icon.documentElement.setAttribute('height', height);
        var svg_elem = $(document.importNode(shape_icon.documentElement, true));

        var data = shapes.data;

        cur_lib.buttons = [];

        for (var id in data) {
            var path_d = data[id];
            //**MDP ( Nicer Icon for root and fraction
            var icon = svg_elem.clone();
            if (id == 'root') {
                path_d = 'm256.32898,62.26712l99.32593,0l0,-9.29452l-99.32593,0m-131.66045,202.06464l-52.16398,-88.25236c-2.02463,-3.64491 -3.51333,-3.64491 -4.46609,-3.64491c-0.29774,0 -1.78644,0 -5.00203,1.77689l-28.22571,16.35653c-3.81107,2.27807 -3.81107,2.96149 -3.81107,3.64491c0,1.13903 0.83367,2.50587 2.9774,2.50587c1.78644,0 6.78846,-3.1893 10.0636,-4.96619c1.72689,-1.1846 6.19298,-3.64491 9.46812,-5.51292l58.41651,98.32142c2.14373,3.64491 3.63242,3.64491 6.25253,3.64491c4.46609,0 5.41886,-1.36684 7.44349,-4.55614l134.75694,-213.36386c2.02463,-3.1893 2.02463,-4.05496 2.02463,-4.55614c0,-2.27807 -2.44146,-4.55614 -5.95479,-4.55614c-2.32237,0 -4.46609,1.13903 -6.78846,4.78394l-124.99108,198.37417z';

                icon[0].firstChild.innerHTML += '<rect stroke="#000" id="svg_3" height="186" width="80" y="91" x="275" fill-opacity="null" stroke-opacity="null" stroke-width="6.5" fill="none"/>';
                icon[0].firstChild.setAttribute("viewBox", "-25 -25 650 650");
            }
            if (id == 'fraction') path_d = 'm30,140l250,0l0,10l-250,0l0,-10z';
            // **MDP )

            icon.find('path').attr('d', path_d);

            var icon_btn = icon.wrap('<div class="tool_button">').parent().attr({
                id: mode_id + '_' + id,
                title: id
            });


            // Store for later use
            cur_lib.buttons.push(icon_btn[0]);
        }

    }

    function makeButtons(cat, shapes) {
        var size = cur_lib.size || 300;
        var fill = cur_lib.fill || false;
        var off = size * .05;
        var vb = [-off, -off, size + off * 2, size + off * 2].join(' ');
        var stroke = fill ? 0 : (size / 30);

        //  var shape_icon = new DOMParser().parseFromString(
        //    '<svg xmlns="http://www.w3.org/2000/svg"><svg viewBox="' + vb + '"><path fill="#333" stroke="transparent" stroke-width="' + stroke + '" /><\/svg><\/svg>',
        //    'text/xml');
        if (cat !== "basic" && cat !== "numerical") {
            vb = "-15 -15 240 430";
        }
        var shape_icon = new DOMParser().parseFromString(
            '<svg xmlns="http://www.w3.org/2000/svg"><svg viewBox="' + vb + '"><text id="mb" font-family="monospace" font-size="300" y="300" x="20" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">O</text><\/svg><\/svg>',
            'text/xml');

        var width = 25;
        var height = 25;
        shape_icon.documentElement.setAttribute('width', width);
        shape_icon.documentElement.setAttribute('height', height);
        var svg_elem = $(document.importNode(shape_icon.documentElement, true));

        //alert(shape_icon.getElementById('mb').textContent); //**MDP

        var data = shapes.data;

        cur_lib.buttons = [];

        var wrapper = $("<div class='qwerty-wrapper'>");

        var isMobile = false;
        if ($(window).width() <= 732) isMobile = true;

        if (isMobile && cat === 'basic') {
            data = library['qwerty'].data;
        }

        for (var id in data) {
            var path_d = data[id];
            var icon = svg_elem.clone();
            var char_d = data[id].split(",");
            //icon.find('path').attr('d', path_d); //**MDP
            icon.find('text').text(char_d[0]); //**MDP
            icon.find('text').attr('font-size', char_d[2]); //**MDP
            if (cat !== "basic" && cat !== "numerical") icon.find('text').attr('font-size', 350);
            icon.find('text').attr('x', char_d[3]); //**MDP
            icon.find('text').attr('y', char_d[4]); //**MDP

            var icon_btn = icon.wrap('<div class="tool_button">').parent().attr({
                id: mode_id + '_' + id,
                title: id
            });

            icon_btn[0].mathchar = id;
            icon_btn[0].mathdata = path_d;

            if (cat !== 'basic' || !isMobile) cur_lib.buttons.push(icon_btn[0]);
            else {
                if (id === "shift") {
                    icon_btn.find("svg svg").attr("viewBox", "0 0 780 330");
                    icon_btn.find(">svg").attr("width", "80");
                }
                wrapper.append(icon_btn);
                // Store for later use
                if (id === 'p' || id === 'l' || id === '.' || id === 'down' || id === 'backspace') {

                    cur_lib.buttons.push(wrapper[0]);
                    wrapper = $("<div class='qwerty-wrapper'>");
                }
            }
        }

    }

    return {
        svgicons: "extensions/ext-shapes.xml",
        buttons: [{
            id: "tool_shapelib",
            type: "mode_flyout", // _flyout
            position: 4,
            title: "Shape library",
            icon: "extensions/ext-shapes.png",
            events: {
                "click": function () {
                    $('.tools_flyout').show(); //**MDP avoids delay in panel appearing

                    //canv.setMode(mode_id); //**MDP
                    //lert("hello");
                    //canv.setMode('select'); //
                }
            }
        }],
        callback: function () {
            //$('.tools_flyout').hide();
            //$("#tools_shapelib").hide();
            //$("#tools_mathlib").hide();

            var btn_div = $('<div id="shape_buttons">');
            $('#tools_shapelib > *').wrapAll(btn_div);

            var shower = $('#tools_shapelib_show');

            var isOpen = false;

            loadLibrary('basic');


            $("#shape_buttons").bind("touchstart", function (evt) {
                $(evt.target).closest('div.tool_button').css({
                    "background-color": "#cccfcf"
                })
            });

            $("#shape_buttons").bind("touchend", function (evt) {
                $(evt.target).closest('div.tool_button').css({
                    "background-color": "#ebf0ef"
                })
            });

            var isMobile = false;
            if ($(window).width() <= 732) isMobile = true;
            //ToggleFloatingLayer('FloatingLayer',0);


            setInterval(function () {
                var keyboard = $("#tools_shapelib");
                $("#FloatingLayer").css({
                    opacity: keyboard.css("opacity"),
                    visibility: keyboard.css("visibility"),
                    display: keyboard.css("display"),
                    top: keyboard.position().top - 35
                });
            }, 20);

            $(document).on("mouseup", function (e) {

                if (e.target.id.indexOf("_show") !== -1 && e.target.id !== "tools_shapelib_show") {
                    var area = $("#workarea");
                    var content = $("#svgcontent");
                    var vb = content.attr("viewBox").split(" ");
                    vb[1] = "0";
                    content.attr("viewBox", vb.join(" "));
                    area.css({
                        height: "100vh"
                    });
                    isOpen = false
                }
            });

            shower.on("mouseup", function () {

                var area = $("#svgcontent");
                if ($(window).width() <= 732) isMobile = true;
                if (isMobile) {
                    var vb = area.attr("viewBox").split(" ");

                    if (isOpen) {
                        vb[1] = "0";

                        area.attr("viewBox", vb.join(" "));
                        isOpen = false;
                        return;
                    }
                    var height = $("#menu_bar").height();
                    var y = parseInt($("#math_cursor").attr("y"));
                    var keyboard = $("#tools_shapelib");

                    vb[1] = "165";
                    if ((y + height) >= ($(window).height() - (keyboard.height() + 90))) area.attr("viewBox", vb.join(" "));

                    keyboard.css({
                        'opacity': "1"
                    });
                    isOpen = true;
                } else isOpen = !isOpen;

            });

            $("#svgcanvas").bind("mouseup", function (e) {

                if ($(window).width() <= 732) isMobile = true;

                if (isMobile) return;
                var bar = $("#FloatingLayer");
                var math_cursor = svgCanvas.getElem('math_cursor');
                var x = Number(math_cursor.getAttribute('x'));
                var y = Number(math_cursor.getAttribute('y'));
                var height = $("#menu_bar").height();
                var width = $("#tools_left").width();

                if ((x + width) >= ($(window).width() - 400)) x -= 400;
                if ((y + height) >= ($(window).height() - 240)) y -= 285;
                bar.css({
                    'margin-left': x - 3,
                    'margin-top': 0,
                    'top': y + 70
                });
                $("#tools_shapelib").css({
                    'margin-left': x,
                    'margin-top': 0,
                    'top': y + 106
                })
            });

            function groupSymbol(cur_shape_id, current_d, bb_min_x, bb_min_y, bb_max_x, bb_max_y) {
//    var mode = canv.getMode();
//    if(mode !== mode_id) return;

                var x = start_x = bb_min_x;
                var y = start_y = bb_min_y;
                var cur_style = canv.getStyle();
                var sw = 1;
                if (cur_shape_id == 'root' || cur_shape_id == 'fraction') sw = 5;

                cur_shape = canv.addSvgElementFromJson({
                    "element": "path",
                    "curStyles": true,
                    "attr": {
                        "d": current_d,
                        "stroke-width": sw,
                        "fill": 'black',
                        "stroke": 'black',
                        "cursor": 'move',
                        //  "style": 'pointer-events:all',
                        "id": canv.getNextId() + "_" + cur_shape_id,
                        "opacity": cur_style.opacity / 2,
                        "style": "pointer-events:inherit"
                    }
                });
                //cur_shape.setAttribute("d", current_d);
                // Make sure shape uses absolute values
                if (/[a-z]/.test(current_d)) {
                    current_d = cur_lib.data[cur_shape_id] = canv.pathActions.convertPath(cur_shape);
                    cur_shape.setAttribute('d', current_d);
                    canv.pathActions.fixEnd(cur_shape);
                }

                cur_shape.setAttribute('transform', "translate(" + x + "," + y + ") scale(0.005) translate(" + -x + "," + -y + ")");
//      console.time('b');
                canv.recalculateDimensions(cur_shape);
                var tlist = canv.getTransformList(cur_shape);
                lastBBox = cur_shape.getBBox();
                totalScale = {
                    sx: 1,
                    sy: 1
                };
                //  return {
                //    started: true
                //  }


//  var mode = canv.getMode();
//  if(mode !== mode_id) return;

                var zoom = canv.getZoom();
//    var evt = opts.event

                var x = bb_max_x / zoom;
                var y = bb_max_y / zoom;

                var tlist = canv.getTransformList(cur_shape),
                    box = cur_shape.getBBox(),
                    left = box.x, top = box.y, width = box.width,
                    height = box.height;
                var dx = (x - start_x), dy = (y - start_y);

                var newbox = {
                    'x': Math.min(start_x, x),
                    'y': Math.min(start_y, y),
                    'width': Math.abs(x - start_x),
                    'height': Math.abs(y - start_y)
                };

                var ts = null,
                    tx = 0, ty = 0,
                    sy = height ? (height + dy) / height : 1,
                    sx = width ? (width + dx) / width : 1;

                var sx = newbox.width / lastBBox.width;
                var sy = newbox.height / lastBBox.height;

                sx = sx || 1;
                sy = sy || 1;

                // Not perfect, but mostly works...

                if (x < start_x) {
                    tx = lastBBox.width;
                }
                if (y < start_y) ty = lastBBox.height;

                // update the transform list with translate,scale,translate
                var translateOrigin = svgroot.createSVGTransform(),
                    scale = svgroot.createSVGTransform(),
                    translateBack = svgroot.createSVGTransform();

                translateOrigin.setTranslate(-(left + tx), -(top + ty));
                /* if(evt.shiftKey) {
                 replaced = true
                 var max = Math.min(Math.abs(sx), Math.abs(sy));
                 sx = max * (sx < 0 ? -1 : 1);
                 sy = max * (sy < 0 ? -1 : 1);
                 if (totalScale.sx != totalScale.sy) {
                 var multiplierX = (totalScale.sx > totalScale.sy) ? 1 : totalScale.sx/totalScale.sy;
                 var multiplierY = (totalScale.sy > totalScale.sx) ? 1 : totalScale.sy/totalScale.sx;
                 sx *= multiplierY
                 sy *= multiplierX
                 }
                 } */
                totalScale.sx *= sx;
                totalScale.sy *= sy;

                if (sx === Infinity || sy === Infinity)
                    scale.setScale(1, 1);
                else
                    scale.setScale(sx, sy);

                scale.setScale(Math.abs(sx), Math.abs(sy));
                translateBack.setTranslate(left + tx, top + ty);
                var N = tlist.numberOfItems;
                tlist.appendItem(translateBack);
                tlist.appendItem(scale);
                tlist.appendItem(translateOrigin);

                canv.recalculateDimensions(cur_shape);
                lastBBox = cur_shape.getBBox();
                canv.runExtensions('elementChanged', {
                    elems: [cur_shape]
                });
                canv.ungroupSelectedElement();
                canv.addToSelection([cur_shape]);
                canv.groupSelectedElements('g', false);
                canv.groupedElement = canv.getSelectedElems()[0];
            }

            // Do mouseup on parent element rather than each button
            $('#shape_buttons').mouseup(function (evt) {
                var btn = $(evt.target).closest('div.tool_button');

                if (!btn.length) return;

                var copy = btn.children().clone().attr({width: 24, height: 24});
                //shower.children(':not(.flyout_arrow_horiz)').remove();
                //shower
                //  .append(copy)
                //  .attr('data-curopt', '#' + btn[0].id) // This sets the current mode
                //  .mouseup();
                //canv.setMode(mode_id);

                cur_shape_id = btn[0].id.substr((mode_id + '_').length);
                current_d = cur_lib.data[cur_shape_id];
                //alert(cur_shape_id);
                //alert(btn[0].data);
                //alert(cur_lib.id);
                //alert(btn[0].mathdata);
                if (cur_shape_id === "shift") {
                    on = !on;

                    if (on) {
                        $("#shape_buttons .tool_button text").each(function (i, item) {
                            item.innerHTML = item.innerHTML.toUpperCase();

                        });
                    } else {
                        $("#shape_buttons .tool_button text").each(function (i, item) {
                            item.innerHTML = item.innerHTML.toLowerCase();

                        });
                    }
                    return;
                }
                if (!btn[0].mathdata) {
                    canv.setMode(mode_id);

                    cur_shape_id = btn[0].id.substr((mode_id + '_').length);
                    current_d = cur_lib.data[cur_shape_id];

                    var selectedElements = canv.getSelectedElems();
                    if (selectedElements.length == 0) {
                        var mode = canv.getMode();
                        if (mode !== mode_id) return;
                        var x = start_x = document.getElementById('math_cursor').getAttribute('x');
                        var y = start_y = document.getElementById('math_cursor').getAttribute('y');
                        var cur_style = canv.getStyle();
                        cur_shape = canv.addSvgElementFromJson({
                            "element": "path",
                            "curStyles": true,
                            "attr": {
                                "d": current_d,
                                "id": canv.getNextId() + "_" + cur_shape_id,
                                "opacity": cur_style.opacity / 2,
                                "cursor": 'move',
                                "style": "pointer-events:inherit",
                                "stroke-width": 1
                            }
                        });
                        //cur_shape.setAttribute("d", current_d);
                        if (cur_shape_id == 'fraction' || cur_shape_id == 'root') cur_shape.setAttribute("stroke-width", 5); //**MDP
                        if (cur_shape_id == 'sum' || cur_shape_id == 'lbracket' || cur_shape_id == 'rbracket') cur_shape.setAttribute("fill", 'black'); //**MDP

                        // Make sure shape uses absolute values
                        if (/[a-z]/.test(current_d)) {
                            current_d = cur_lib.data[cur_shape_id] = canv.pathActions.convertPath(cur_shape);
                            cur_shape.setAttribute('d', current_d);
                            //canv.pathActions.fixEnd(cur_shape);
                        }

                        if (x < 0 || y < 0) {
                            x = y = 10;
                        }

                        cur_shape.setAttribute('transform', "translate(" + x + "," + y + ") scale(0.2) translate(" + -x + "," + -y + ")");
                        //      console.time('b');
                        canv.recalculateDimensions(cur_shape);
                        var tlist = canv.getTransformList(cur_shape);
                        lastBBox = cur_shape.getBBox();
                        totalScale = {
                            sx: 1,
                            sy: 1
                        };
                        canv.setMode('select');

                        canv.selectOnly([cur_shape]);

                        cur_shape = null;
                        current_d = null;
                        $('.tools_flyout').fadeOut();
                        return;
                    }

                    //MDP(
                    if ((cur_shape_id == "root" || cur_shape_id == "integral" || cur_shape_id == "sum" || cur_shape_id == "lbracket" || cur_shape_id == "fraction") && selectedElements.length > 0) {
                        var bb_min_x = Infinity;
                        var bb_min_y = Infinity;
                        var bb_max_x = 0;
                        var bb_max_y = 0;
                        var i = 0;
                        for (i = 0; i < selectedElements.length && selectedElements[i] != null; i++) {
                            var selected = svgedit.utilities.getBBox(selectedElements[i]);
                            if (bb_min_x > selected.x) bb_min_x = selected.x;
                            if (bb_min_y > selected.y) bb_min_y = selected.y;
                            if (bb_max_x < selected.x + selected.width) bb_max_x = selected.x + selected.width;
                            if (bb_max_y < selected.y + selected.height) bb_max_y = selected.y + selected.height;
                        }

                        if (cur_shape_id == "root") {
                            bb_min_x = bb_min_x - 10 - 0.1 * (bb_max_x - bb_min_x);
                            bb_min_y = bb_min_y - 10;
                            bb_max_x = bb_max_x + 10;
                            bb_max_y = bb_max_y + 10;
                        }

                        if (cur_shape_id == "sum") {
                            bb_max_x = bb_min_x - 5;
                            bb_min_x = bb_min_x - 40;
                            var y_midpoint = (bb_max_y + bb_min_y) / 2;
                            bb_min_y = bb_min_y - 5;
                            bb_max_y = bb_max_y + 5;
                        }

                        if (cur_shape_id == "integral") {
                            bb_max_x = bb_min_x - 5;
                            bb_min_x = bb_min_x - 25;
                            var y_midpoint = (bb_max_y + bb_min_y) / 2;
                            bb_min_y = bb_min_y - 5;
                            bb_max_y = bb_max_y + 5;
                        }

                        if (cur_shape_id == "fraction") {
                            bb_min_x = bb_min_x - 5;
                            bb_max_x = bb_max_x + 5;
                            bb_min_y = bb_max_y + 10;
                            bb_max_y = bb_min_y;
                        }

                        if (cur_shape_id == "lbracket") {
                            bbmaxx = bb_min_x - 5;
                            bbminx = bbmaxx - 10;
                            bbminy = bb_min_y - 5;
                            bbmaxy = bb_max_y + 5;

                            groupSymbol(cur_shape_id, current_d, bbminx, bbminy, bbmaxx, bbmaxy);

                            bb_min_x = bb_max_x + 5;
                            bb_max_x = bb_min_x + 10;
                            bb_min_y = bb_min_y - 5;
                            bb_max_y = bb_max_y + 5;

                            cur_shape_id = "rbracket";
                            current_d = cur_lib.data[cur_shape_id];
                        }

                        groupSymbol(cur_shape_id, current_d, bb_min_x, bb_min_y, bb_max_x, bb_max_y);
                        canv.setMode('select');
                        document.getElementById("tool_select").click();
                    }
                    //MDP)
                    cur_shape = null;
                    current_d = null;
                    if(!$(window).width() > 732) $('.tools_flyout').fadeOut();
                    return;
                }
                if (!on) canv.keyPressed(btn[0].mathdata.charAt(0));
                else {
                    canv.keyPressed(btn[0].mathdata.charAt(0).toUpperCase());
                    $("#shape_buttons .tool_button text").each(function (i, item) {
                        item.innerHTML = item.innerHTML.toLowerCase();

                    });
                    on = false;
                }
                //ToggleFloatingLayer('FloatingLayer',1);
                //  methodDraw.clickSelect();
                //  canv.setMode('select');
                //document.getElementById("tool_select").click();


//        $('.tools_flyout').fadeOut();
                //$('.tools_flyout').hide();
                //methodDraw.clickSelect();

                //canv.setMode('select');
            });

//
            //var tab = $('<input id="tabulator" onclick="toggleCats();">-</input><br><br>');
            var shape_cats = $('<div id="shape_cats">');
            var cat_str = '';
            $.each(categories, function (id, label) {
                cat_str += '<div data-cat=' + id + '>' + label + '</div>';
            });

            shape_cats.html(cat_str).children().bind('mouseup', function () {
                var catlink = $(this);
                catlink.siblings().removeClass('current');
                catlink.addClass('current');

                loadLibrary(catlink.attr('data-cat'));
                // Get stuff

                return false;
            });

            shape_cats.children().eq(0).addClass('current');

            $('#tools_shapelib').prepend(shape_cats);
            //$('#tools_shapelib').prepend(tab);
            shower.mouseup(function () {
                //    canv.setMode(current_d ? mode_id : 'select');
                //    canv.setMode('select'); //**MDP
                //    mathodDraw.clickSelect();
            });


            $('#tool_shapelib').remove();

        },
        mouseDown: function (opts) {
//       var mode = canv.getMode();
//       if(mode !== mode_id) return;
//
//       var e = opts.event;
//       var x = start_x = opts.start_x;
//       var y = start_y = opts.start_y;
//       var cur_style = canv.getStyle();
//
//       cur_shape = canv.addSvgElementFromJson({
//         "element": "path",
//         "curStyles": true,
//         "attr": {
//           "d": current_d,
//           "id": canv.getNextId(),
//           "opacity": cur_style.opacity / 2,
//           "style": "pointer-events:none"
//         }
//       });
//       cur_shape.setAttribute("d", current_d);
//       // Make sure shape uses absolute values
//       if(/[a-z]/.test(current_d)) {
//         current_d = cur_lib.data[cur_shape_id] = canv.pathActions.convertPath(cur_shape);
//         cur_shape.setAttribute('d', current_d);
//         canv.pathActions.fixEnd(cur_shape);
//       }
//
//       cur_shape.setAttribute('transform', "translate(" + x + "," + y + ") scale(0.005) translate(" + -x + "," + -y + ")");
// //      console.time('b');
//       canv.recalculateDimensions(cur_shape);
//       var tlist = canv.getTransformList(cur_shape);
//       lastBBox = cur_shape.getBBox();
//       totalScale = {
//         sx: 1,
//         sy: 1
//       };
//       return {
//         started: true
//       }
//       // current_d
//     },
//     mouseMove: function(opts) {
//       var mode = canv.getMode();
//       if(mode !== mode_id) return;
//
//       var zoom = canv.getZoom();
//       var evt = opts.event
//
//       var x = opts.mouse_x/zoom;
//       var y = opts.mouse_y/zoom;
//
//       var tlist = canv.getTransformList(cur_shape),
//         box = cur_shape.getBBox(),
//         left = box.x, top = box.y, width = box.width,
//         height = box.height;
//       var dx = (x-start_x), dy = (y-start_y);
//
//       var newbox = {
//         'x': Math.min(start_x,x),
//         'y': Math.min(start_y,y),
//         'width': Math.abs(x-start_x),
//         'height': Math.abs(y-start_y)
//       };
//
//       var ts = null,
//         tx = 0, ty = 0,
//         sy = height ? (height+dy)/height : 1,
//         sx = width ? (width+dx)/width : 1;
//
//       var sx = newbox.width / lastBBox.width;
//       var sy = newbox.height / lastBBox.height;
//
//       sx = sx || 1;
//       sy = sy || 1;
//
//       // Not perfect, but mostly works...
//
//       if(x < start_x) {
//         tx = lastBBox.width;
//       }
//       if(y < start_y) ty = lastBBox.height;
//
//       // update the transform list with translate,scale,translate
//       var translateOrigin = svgroot.createSVGTransform(),
//         scale = svgroot.createSVGTransform(),
//         translateBack = svgroot.createSVGTransform();
//
//       translateOrigin.setTranslate(-(left+tx), -(top+ty));
//       if(evt.shiftKey) {
//         replaced = true
//         var max = Math.min(Math.abs(sx), Math.abs(sy));
//         sx = max * (sx < 0 ? -1 : 1);
//         sy = max * (sy < 0 ? -1 : 1);
//         if (totalScale.sx != totalScale.sy) {
//           var multiplierX = (totalScale.sx > totalScale.sy) ? 1 : totalScale.sx/totalScale.sy;
//           var multiplierY = (totalScale.sy > totalScale.sx) ? 1 : totalScale.sy/totalScale.sx;
//           sx *= multiplierY
//           sy *= multiplierX
//         }
//       }
//       totalScale.sx *= sx;
//       totalScale.sy *= sy;
//       scale.setScale(sx,sy);
//       translateBack.setTranslate(left+tx, top+ty);
//       var N = tlist.numberOfItems;
//       tlist.appendItem(translateBack);
//       tlist.appendItem(scale);
//       tlist.appendItem(translateOrigin);
//
//       canv.recalculateDimensions(cur_shape);
//       lastBBox = cur_shape.getBBox();
            //      canv.setMode("select")
        },
        mouseUp: function (opts) {
            //   var mode = canv.getMode();
            //   if(mode !== mode_id) return;
            //
            //   if(opts.mouse_x == start_x && opts.mouse_y == start_y) {
            //     return {
            //       keep: false,
            //       element: cur_shape,
            //       started: false
            //     }
            //   }
            //   canv.setMode("select")
            //   return {
            //     keep: true,
            //     element: cur_shape,
            //     started: false
            //   }
        }
    }
});
