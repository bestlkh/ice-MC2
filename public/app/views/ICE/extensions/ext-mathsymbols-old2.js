/*
 * ext-shapes.js
 *
 * Licensed under the Apache License, Version 2
 *
 * Copyright(c) 2010 Christian Tzurcanu
 * Copyright(c) 2010 Alexis Deveria
 *
 */

methodDraw.addExtension("mathsymbols", function() {


  var current_d, cur_shape_id;
  var canv = methodDraw.canvas;
  var cur_shape;
  var start_x, start_y;
  var svgroot = canv.getRootElem();
  var lastBBox = {};

  // This populates the category list
  var categories = {
    basic: 'Resizeable',
//    object: 'Objects',
//    symbol: 'Symbols',
//    arrow: 'Arrows',
//    flowchart: 'Flowchart',
//    nature: 'Nature',
//    game: 'Cards & Chess',
//    dialog_balloon: 'Dialog balloons',
//    music: 'Music',
//    weather: 'Weather &amp; Time',
//    ui: 'User Interface',
//    social: 'Social Web'
  };

//  'integral': 'm57.64048,207.76384c-3.17348,37.02398 -11.2835,47.24965 -23.97743,47.24965c-2.82087,0 -9.87306,-0.70522 -14.45698,-4.93653c6.69958,-0.70522 8.46262,-5.99436 8.46262,-9.16784c0,-6.34697 -4.93653,-9.52045 -9.16784,-9.52045c-4.58392,0 -9.52045,3.17348 -9.52045,9.87306c0,10.57828 11.2835,18.68829 24.68265,18.68829c21.50917,0 32.08745,-19.74612 37.02398,-39.84485c2.82087,-11.63611 10.93089,-77.22144 13.04654,-102.2567l4.23131,-56.06488c3.17348,-41.25529 10.57828,-46.89704 20.80395,-46.89704c2.11566,0 9.16784,0.35261 14.10437,4.58392c-6.34697,1.05783 -8.11001,6.34697 -8.11001,9.52045c0,6.34697 4.93653,9.16784 9.16784,9.16784c4.58392,0 9.52045,-2.82087 9.52045,-9.52045c0,-10.93089 -11.2835,-18.68829 -25.03526,-18.68829c-21.15656,0 -29.97179,21.86178 -33.8505,38.78703c-2.82087,12.34133 -10.93089,75.811 -12.69394,103.31453zm-4.23131,55.71227',
//  'root': 'm256.32898,62.26712l99.32593,0l0,-9.29452l-99.32593,0m-131.66045,202.06464l-52.16398,-88.25236c-2.02463,-3.64491 -3.51333,-3.64491 -4.46609,-3.64491c-0.29774,0 -1.78644,0 -5.00203,1.77689l-28.22571,16.35653c-3.81107,2.27807 -3.81107,2.96149 -3.81107,3.64491c0,1.13903 0.83367,2.50587 2.9774,2.50587c1.78644,0 6.78846,-3.1893 10.0636,-4.96619c1.72689,-1.1846 6.19298,-3.64491 9.46812,-5.51292l58.41651,98.32142c2.14373,3.64491 3.63242,3.64491 6.25253,3.64491c4.46609,0 5.41886,-1.36684 7.44349,-4.55614l134.75694,-213.36386c2.02463,-3.1893 2.02463,-4.05496 2.02463,-4.55614c0,-2.27807 -2.44146,-4.55614 -5.95479,-4.55614c-2.32237,0 -4.46609,1.13903 -6.78846,4.78394l-124.99108,198.37417z',
//  'newroot': 'mm30.42757,133.2743l1.06742,31.10769l7.47195,-119.24615l199.60768,-3.45641l-201.74252,0l-5.33711,117.51795l-1.06742,-25.92308z'
//  'fraction' : 'm20,160l270,0',

  var library = {
    'basic': {
      data: {
        'root': 'm39.71071,344.57253l5.44504,31.89999l19.96522,-342.2l470.08975,-5.79999l-468.27475,2.89998l-21.78022,336.40001l-5.44504,-23.19998z',
        'sum' : 'm126.45467,174.437l-113.5001,134.29466c-2.49984,2.87774 -3,3.35722 -3,4.79624c0,3.35722 3,3.35722 8.99999,3.35722l263.99986,0l27.50014,-76.26003l-7.99999,0c-7.99999,23.02194 -28.99998,41.72712 -56.50014,50.36034c-4.99999,1.91849 -26.99998,9.113 -73.99996,9.113l-135.49978,0l110.99995,-131.41692c2,-2.87774 2.49984,-3.35752 2.49984,-4.79624c0,-1.43902 0,-1.43902 -2,-4.31676l-103.49978,-136.21315l125.99993,0c36.49982,0 109.99995,1.91849 131.99994,58.99388l7.99999,0l-27.50014,-71.46411l-263.99986,0c-8.99999,0 -8.99999,0.47977 -8.99999,9.59248l116.5001,153.95939l0,-0.00001zm0,0',
        'lbracket' : 'm139.61088,304.82804c0,-0.93416 0,-1.40123 -5.23987,-6.53906c-37.63175,-37.36608 -47.63513,-93.88227 -47.63513,-139.65571c0,-51.84543 11.43243,-103.69086 49.06419,-140.58985c3.81081,-3.7366 3.81081,-4.20369 3.81081,-5.13783c0,-2.33537 -0.9527,-3.26953 -2.85811,-3.26953c-3.33446,0 -30.48648,20.55134 -48.58784,58.38449c-15.24325,32.69532 -19.05406,65.85771 -19.05406,90.61273c0,23.3538 3.33446,59.31865 20.00676,93.41518c18.57771,36.43192 44.30067,56.04912 47.63513,56.04912c1.90541,0 2.85811,-0.93416 2.85811,-3.26953l0.00001,-0.00001zm0,0',
        'rbracket' : 'm224.40576,160.40921c0,-23.08137 -3.52365,-59.35211 -21.14188,-93.73865c-19.12838,-36.74178 -46.81417,-56.52582 -49.83444,-56.52582c-2.01352,0 -3.52365,1.41315 -3.52365,3.29734c0,0.9421 0,1.41315 6.04054,7.06573c31.71283,29.67605 49.83444,77.25195 49.83444,139.90141c0,51.81534 -11.5777,104.57277 -51.34458,142.25665c-4.53041,3.76839 -4.53041,4.23944 -4.53041,5.18154c0,1.88419 1.51014,3.29734 3.52365,3.29734c3.02027,0 32.21621,-20.72614 50.84121,-58.88106c16.61148,-32.9734 20.13513,-66.41784 20.13513,-91.85446l-0.00001,0l0,-0.00002zm0,0',
        'fraction' : 'm20,160l270,0',
      	'triangle': 'm1,280.375l149,-260.75l149,260.75z',
				'right_triangle': 'm1,299l0,-298l298,298z',
				'diamond': 'm1,150l149,-149l149,149l-149,149l-149,-149z',
				'pentagon': 'm1.00035,116.97758l148.99963,-108.4053l148.99998,108.4053l-56.91267,175.4042l-184.1741,0l-56.91284,-175.4042z',
				'hexagon': 'm1,149.99944l63.85715,-127.71428l170.28572,0l63.85713,127.71428l-63.85713,127.71428l-170.28572,0l-63.85715,-127.71428z',
			},
      buttons: []
    }
  };

  var cur_lib = library.basic;

  var mode_id = 'mathlib';

  function loadIcons() {
    $('#math_buttons').empty();

    // Show lib ones
    $('#math_buttons').append(cur_lib.buttons);
  }

  function loadLibrary(cat_id) {

    var lib = library[cat_id];

    if(!lib) {
      $('#math_buttons').html('Loading...');
      $.getJSON('extensions/mathlib/' + cat_id + '.json', function(result, textStatus) {
        cur_lib = library[cat_id] = {
          data: result.data,
          size: result.size,
          fill: result.fill
        }
        makeButtons(cat_id, result);
        loadIcons();
      });
      return;
    }

    cur_lib = lib;
    if(!lib.buttons.length) makeButtons(cat_id, lib);
    loadIcons();
  }

  function makeButtons(cat, shapes) {
    var size = cur_lib.size || 300;
    var fill = cur_lib.fill || false;
    var off = size * .05;
    var vb = [-off, -off, size + off*2, size + off*2].join(' ');
    var stroke = fill ? 0: (size/30);

    var shape_icon = new DOMParser().parseFromString(
      '<svg xmlns="http://www.w3.org/2000/svg"><svg viewBox="' + vb + '"><path fill="#333" stroke="transparent" stroke-width="' + stroke + '" /><\/svg><\/svg>',
      'text/xml');

    var width = 40;
    var height = 40;
    shape_icon.documentElement.setAttribute('width', width);
    shape_icon.documentElement.setAttribute('height', height);
    var svg_elem = $(document.importNode(shape_icon.documentElement,true));

    var data = shapes.data;

    cur_lib.buttons = [];

    for(var id in data) {
      var path_d = data[id];
      //**MDP ( Nicer Icon for root and fraction
      if (id=='root') path_d = 'm256.32898,62.26712l99.32593,0l0,-9.29452l-99.32593,0m-131.66045,202.06464l-52.16398,-88.25236c-2.02463,-3.64491 -3.51333,-3.64491 -4.46609,-3.64491c-0.29774,0 -1.78644,0 -5.00203,1.77689l-28.22571,16.35653c-3.81107,2.27807 -3.81107,2.96149 -3.81107,3.64491c0,1.13903 0.83367,2.50587 2.9774,2.50587c1.78644,0 6.78846,-3.1893 10.0636,-4.96619c1.72689,-1.1846 6.19298,-3.64491 9.46812,-5.51292l58.41651,98.32142c2.14373,3.64491 3.63242,3.64491 6.25253,3.64491c4.46609,0 5.41886,-1.36684 7.44349,-4.55614l134.75694,-213.36386c2.02463,-3.1893 2.02463,-4.05496 2.02463,-4.55614c0,-2.27807 -2.44146,-4.55614 -5.95479,-4.55614c-2.32237,0 -4.46609,1.13903 -6.78846,4.78394l-124.99108,198.37417z';
      if (id=='fraction') path_d = 'm30,140l250,0l0,10l-250,0l0,-10z';
      // **MDP )
      var icon = svg_elem.clone();
      icon.find('path').attr('d', path_d);

      var icon_btn = icon.wrap('<div class="tool_button">').parent().attr({
        id: mode_id + '_' + id,
        title: id
      });


      // Store for later use
      cur_lib.buttons.push(icon_btn[0]);
    }

  }


  return {
    svgicons: "extensions/ext-mathsymbols.xml",
    buttons: [{
      id: "tool_mathlib",
      type: "mode_flyout", // _flyout
      position: 3,
      title: "Math library",
      icon: "extensions/ext-mathlib.png",
      events: {
        "click": function() {
          canv.setMode(mode_id);
        }
      }
    }],
    callback: function() {
  //    $('.tools_flyout').hide();
  //    $("#tools_shapelib").hide();
  //    $("#tools_mathlib").hide();

      var btn_div = $('<div id="math_buttons">');
      $('#tools_mathlib > *').wrapAll(btn_div);

      var shower = $('#tools_mathlib_show');


      loadLibrary('basic');

      // Do mouseup on parent element rather than each button
      $('#math_buttons').mouseup(function(evt) {


        var btn = $(evt.target).closest('div.tool_button');

        if(!btn.length) return;

        var copy = btn.children().clone().attr({width: 24, height: 24});
        //**MDP  COMMENTED OUT TO STOP SWITCHING BUTTON
        // shower.children(':not(.flyout_arrow_horiz)').remove();
        // shower
        //   .append(copy)
        //   .attr('data-curopt', '#' + btn[0].id) // This sets the current mode
        //   .mouseup();
         canv.setMode(mode_id);

        cur_shape_id = btn[0].id.substr((mode_id+'_').length);
        current_d = cur_lib.data[cur_shape_id];

//**MDP(
        var selectedElements = canv.getSelectedElems();
    //    if ((cur_shape_id == "root" ||  cur_shape_id == "sum" || cur_shape_id == "lbracket" || cur_shape_id == "fraction") && selectedElements.length > 0) {

    if ((cur_shape_id == "root") && selectedElements.length > 0) {

          var selectedBBoxes = new Array(1);;
          var bb_min_x = 10000;
          var bb_min_y = 10000;
          var bb_max_x = 0;
          var bb_max_y = 0;

          var i = selectedElements.length;
          for (i=0; i < selectedElements.length; i++) {
            var selected = selectedElements[i];
            if (selected != null) {
              var selectedBB = svgedit.utilities.getBBox(selected);
              if (bb_min_x > selectedBB.x) bb_min_x = selectedBB.x;
              if (bb_min_y > selectedBB.y) bb_min_y = selectedBB.y;
              if (bb_max_x < selectedBB.x + selectedBB.width) bb_max_x = selectedBB.x+selectedBB.width;
              if (bb_max_y < selectedBB.y + selectedBB.height) bb_max_y = selectedBB.y+selectedBB.height;
            }
          }

          cur_shape = canv.addSvgElementFromJson({
            "element": "path",
            "curStyles": true,
            "attr": {
              "d": current_d,
              "id": canv.getNextId(),
              //    "opacity": 1,
              "style": "pointer-events:inherit"
            }
          });

          if(/[a-z]/.test(current_d)) {
            current_d = canv.pathActions.convertPath(cur_shape);
            cur_shape.setAttribute('d', current_d);
            canv.pathActions.fixEnd(cur_shape);
          }

          var bbox = svgedit.utilities.getBBox(cur_shape);

          var x = bb_min_x;
          var y = bb_min_y;
          var width = bb_max_x - bb_min_x;
          var height = bb_max_y - bb_min_y;

          var sx = width/bbox.width;
          var sy = height/bbox.height;


          if (cur_shape_id == "root") {
            x = x - width*0.20;
            y = y - height*0.15;
            cur_shape.setAttribute('transform', "translate(" + x + "," + y + ") scale(" + sx*1.2 + ", " + sy*1.2 + ") translate(" + -0 + "," + 0 + ")");
            canv.recalculateDimensions(cur_shape);
            cur_shape.getBBox();
            cur_shape.setAttribute('transform', "translate(" + x + "," + y + ")");
            canv.recalculateDimensions(cur_shape);
            //cur_shape.getBBox();
          }

          if (cur_shape_id == "sum") {
            x = x - width*0.5;
            cur_shape.setAttribute('transform', "translate(" + x + "," + y + ") scale(" + sy + ", " + sy + ") translate(" + -0 + "," + 0 + ")");
            canv.recalculateDimensions(cur_shape);
            cur_shape.getBBox();
            cur_shape.setAttribute('transform', "translate(" + x + "," + y + ")");
            canv.recalculateDimensions(cur_shape);
            //cur_shape.getBBox();
          }

          // if (cur_shape_id == "lbracket") {
          //   x = x - width;
          //   cur_shape.setAttribute('transform', "translate(" + x + "," + y + ") scale(" + 0.1 + ", " + sy + ") translate(" + -0 + "," + 0 + ")");
          //   canv.recalculateDimensions(cur_shape);
          //   cur_shape.getBBox();
          //   cur_shape.setAttribute('transform', "translate(" + x + "," + y + ")");
          //   canv.recalculateDimensions(cur_shape);
          //   //cur_shape.getBBox();
          // }
          //
          //
          if (cur_shape_id == "fraction") {
            y=y+height*0.25;
            x=x-width*0.2;
            cur_shape.setAttribute('transform', "translate(" + x + "," + y + ") scale(" + sx*1.2 + ") translate(" + -0 + "," + 0 + ")");
            canv.recalculateDimensions(cur_shape);
            cur_shape.getBBox();
            cur_shape.setAttribute('transform', "translate(" + x + "," + y + ")");
            canv.recalculateDimensions(cur_shape);
            //cur_shape.getBBox();
          }



          document.getElementById("tool_select").click();

        }
//**MDP)

        $('.tools_flyout').fadeOut();

      });

//
      var math_cats = $('<div id="math_cats">');
      var cat_str = '';

      $.each(categories, function(id, label) {
        cat_str += '<div data-cat=' + id + '>' + label + '</div>';
      });

      math_cats.html(cat_str).children().bind('mouseup', function() {
        var catlink = $(this);
        catlink.siblings().removeClass('current');
        catlink.addClass('current');

        loadLibrary(catlink.attr('data-cat'));
        // Get stuff

        return false;
      });

      math_cats.children().eq(0).addClass('current');

      $('#tools_mathlib').prepend(math_cats);

      shower.mouseup(function() {
        canv.setMode(current_d ? mode_id : 'select');
      });


      $('#tool_mathlib').remove();

      var h = $('#tools_mathlib').height();
      $('#tools_mathlib').css({
        'margin-top': -(h/2),
        'margin-left': 3
      });


    },
    mouseDown: function(opts) {
      var mode = canv.getMode();
      if(mode !== mode_id) return;

      var e = opts.event;
      var x = start_x = opts.start_x;
      var y = start_y = opts.start_y;
      var cur_style = canv.getStyle();
      cur_shape = canv.addSvgElementFromJson({
        "element": "path",
        "curStyles": true,
        "attr": {
          "d": current_d,
          "id": canv.getNextId(),
          "opacity": cur_style.opacity / 2,
          "style": "pointer-events:none"
        }
      });
      cur_shape.setAttribute("d", current_d);
      // Make sure shape uses absolute values
      if(/[a-z]/.test(current_d)) {
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
      return {
        started: true
      }
      // current_d
    },
    mouseMove: function(opts) {
      var mode = canv.getMode();
      if(mode !== mode_id) return;

      var zoom = canv.getZoom();
//      var evt = opts.event

      var x = opts.mouse_x/zoom;
      var y = opts.mouse_y/zoom;

      var tlist = canv.getTransformList(cur_shape),
        box = cur_shape.getBBox(),
        left = box.x, top = box.y, width = box.width,
        height = box.height;
      var dx = (x-start_x), dy = (y-start_y);

      var newbox = {
        'x': Math.min(start_x,x),
        'y': Math.min(start_y,y),
        'width': Math.abs(x-start_x),
        'height': Math.abs(y-start_y)
      };

      var ts = null,
        tx = 0, ty = 0,
        sy = height ? (height+dy)/height : 1,
        sx = width ? (width+dx)/width : 1;

      var sx = newbox.width / lastBBox.width;
      var sy = newbox.height / lastBBox.height;

      sx = sx || 1;
      sy = sy || 1;

      // Not perfect, but mostly works...

      if(x < start_x) {
        tx = lastBBox.width;
      }
      if(y < start_y) ty = lastBBox.height;

      // update the transform list with translate,scale,translate
      var translateOrigin = svgroot.createSVGTransform(),
        scale = svgroot.createSVGTransform(),
        translateBack = svgroot.createSVGTransform();

      translateOrigin.setTranslate(-(left+tx), -(top+ty));
      // if(evt.shiftKey) {
      //   replaced = true
      //   var max = Math.min(Math.abs(sx), Math.abs(sy));
      //   sx = max * (sx < 0 ? -1 : 1);
      //   sy = max * (sy < 0 ? -1 : 1);
      //   if (totalScale.sx != totalScale.sy) {
      //     var multiplierX = (totalScale.sx > totalScale.sy) ? 1 : totalScale.sx/totalScale.sy;
      //     var multiplierY = (totalScale.sy > totalScale.sx) ? 1 : totalScale.sy/totalScale.sx;
      //     sx *= multiplierY
      //     sy *= multiplierX
      //   }
      // }
      totalScale.sx *= sx;
      totalScale.sy *= sy;
      scale.setScale(sx,sy);
      translateBack.setTranslate(left+tx, top+ty);
      var N = tlist.numberOfItems;
      tlist.appendItem(translateBack);
      tlist.appendItem(scale);
      tlist.appendItem(translateOrigin);

      canv.recalculateDimensions(cur_shape);
      lastBBox = cur_shape.getBBox();
    },
    mouseUp: function(opts) {
      var mode = canv.getMode();
      if(mode !== mode_id) return;

      if(opts.mouse_x == start_x && opts.mouse_y == start_y) {
        return {
          keep: false,
          element: cur_shape,
          started: false
        }
      }
      canv.setMode("select")
      return {
        keep: true,
        element: cur_shape,
        started: false
      }
    }
  }
});
