// Copyright 2010 Alberto González Palomo http://matracas.org/
// Author: Alberto González Palomo
// 
// English:
//   This Program may be used by anyone in accordance with
//   the terms of the German Free Software License.
// 
//   The License may be obtained under
//   <http://www.d-fsl.org>
// 
// Deutsch:
//   Dieses Programm kann durch jedermann gemäß den Bestimmungen
//   der Deutschen Freien Software Lizenz genutzt werden.
// 
//   Die Lizenz kann unter <http://www.d-fsl.de>
//   abgerufen werden.
// 
function Tacto_editor(viewport)
{
    var self = this;
    // public:
    self.move_to = move_to;
    self.move_by = move_by;
    self.insert = insert;
    self.do_command = do_command;
    self.zoom = zoom;
    self.get_expression = get_expression;
    self.options =
        {
            "lock_rotation": true,
            "live_preview": false,
            "quick_rendering": true
        };
    self.show_cursor = caret_blink;
    self.font_changed = font_changed;
    self.attach_text_input = function (input)
    {
        standard_addEventListener(input);
        input.addEventListener('input',  text_input_change, true);
        input.addEventListener('change', text_input_change, true);
        input.addEventListener('focus', function (event)
                               { window.setTimeout
                                 (function()
                                  { self.show_cursor(true);},
                                  100)
                               },
                               true);
        input.addEventListener('blur', function (event)
                               { formula.focus(); },
                               true);
        input.addEventListener('keydown', function (event)
                               {
                                   if (input.value == "")
                                   {
                                       switch (event.keyCode)
                                       {
                                       case 8:  // Backspace
                                       case 46: // Delete
                                       case 37: // Left
                                       case 38: // Up
                                       case 39: // Right
                                       case 40: // Down
                                           keydown(event);
                                       }
                                   }
                               },
                               true);
    };
    // Cross-browser (actually Internet Explorer)
    // compatibility functions:
    self.standard_addEventListener = standard_addEventListener;
    self.standard_event = standard_event;
    

    // private:
    /////////////////////////////////////////////////////////////////
    // Compatibility functions to abstract browser differences
    
    function standard_addEventListener(item)
    {
        if (!item.addEventListener && item.attachEvent)
        {
            // This is for Internet Explorer:
            item.addEventListener = function(type, code, capture)
            {
                // IE does not support event capture.
                item.attachEvent("on" + type, code);
            }
        }
    }
    
    function standard_event(event)
    {
        if (!event.target && event.srcElement)
        {
            // This is for Internet Explorer:
            event.target = event.srcElement;
        }
        if (!event.currentTarget)
        {
            event.currentTarget = event.target;
        }
        // We could put here the position values in layer[XY],
        // but in WebKit they are read-only.
        if (!event.preventDefault)
        {
            // This is for Internet Explorer:
            event.preventDefault = function ()
            { event.returnValue = false; }
        }
    }
    
    if (!("Node" in window))
    {
        // This is for Internet Explorer:
        // In version 9 it is no longer necessary.
        window.Node =
            {
                // Just the one we need:
                ELEMENT_NODE: 1
                // Others can be added on demand.
            };
    }
    
    function get_text(node)
    {
        // This is for Internet Explorer:
        if ("textContent" in node) return node.textContent;
        else                       return node.innerText;
    }
    function set_text(node, text)
    {
        // This is for Internet Explorer:
        if ("textContent" in node) node.textContent = text;
        else                       node.innerText   = text;
    }
    function append_text(node, text)
    {
        // This is for Internet Explorer:
        if ("textContent" in node) node.textContent += text;
        else                       node.innerText   += text;
    }
    
    function get_target(event)
    {
        // Bug in Safari:
        // http://www.quirksmode.org/js/events_properties.html
        if (event.target.nodeType == event.target.TEXT_NODE)
        {
            return event.target.parentNode;
        }
        else
        {
            return event.target;
        }
    }
    
    // Different browsers report different coordinates for events:
    // http://hartshorne.ca/2006/01/18/javascript_events/
    // Additionally, single-finger touch events still have their
    // coordinates inside the touches array.
    // This function normalizes all that so that the event handling
    // functions receive the same event position in the same
    // coordinate system.
    function compute_position(event)
    {
        var position, x, y;
        if ("touches" in event && event.touches.length > 0)
        {
            x = event.touches.item(0).pageX - viewport.offsetLeft;
            y = event.touches.item(0).pageY - viewport.offsetTop;
        }
        else if ("touchend" == event.type)
        {
            if (!touch) return null;
            x = touch.x;
            y = touch.y;
        }
        else if ("pageX" in event)
        {
            x = event.pageX - viewport.offsetLeft
                + viewport.scrollLeft;
            y = event.pageY - viewport.offsetTop
                + viewport.scrollTop;
        }
        else
        {
            // Internet Explorer
            x = event.x;
            y = event.y;
        }
        var matrix = null;
        if ("webkitTransform" in formula.style)
        {
            matrix = window.getComputedStyle
            (formula, null).webkitTransform;
            // Bug in Google Chrome 8.0.552.215 beta:
            // decimal numbers are localized, so we get commas
            // instead of decimal points, which WebKitCSSMatrix
            // can not parse back.
            matrix = matrix.replace(/([0-9]),([0-9])/g, "$1.$2");
        }
        else if ("MozTransform" in formula.style)
        {
            matrix = window.getComputedStyle
            (formula, null).MozTransform;
        }
        if (matrix && matrix != "none")
        {
            matrix = new CSSMatrix(matrix);
            // matrix(a, b, c, d, e, f) = [ a c e ]
            //                            [ b d f ]
            var f = (matrix.a * matrix.d - matrix.c * matrix.b);
            if (f != 0)
            {
                x = x - matrix.e;
                y = y - matrix.f;
                position =
                    {
                        x: Math.round(( matrix.d * x - matrix.c * y)
                                      / f),
                        y: Math.round((-matrix.b * x + matrix.a * y)
                                      / f)
                    };
            }
            else
            {
                position = { x: Math.round(x - matrix.e),
                             y: Math.round(y - matrix.f) };
            }
        }
        else
        {
            position = { x:x, y:y };
        }
        
        return position;
    }
    
    function compute_font_size(element)
    {
        if ("getComputedStyle" in window)
        {
            var size = window.getComputedStyle(element, null).fontSize;
            return Number(size.replace(/px/, ""));
        }
        else
        {
            // This is for Internet Explorer:
            // We can't use element.currentStyle.fontSize
            // because we get back the size we specified in CSS
            // in mm, not pixels.
            return element.offsetHeight;
        }
    }
    
    if ("WebKitCSSMatrix" in window)
    {
        window.CSSMatrix = WebKitCSSMatrix;
    }
    else if (! ("CSSMatrix" in window))
    {
        // matrix(a, b, c, d, e, f) = [ a c e ]
        //                            [ b d f ]
        window.CSSMatrix = function (css_string)
        {
            if (!css_string || css_string == "none")
            {
                this.a = 1; this.c = 0; this.e = 0;
                this.b = 0; this.d = 1; this.f = 0;
            }
            else
            {
                var tokens = css_string.split(/[^0-9.]+/);
                this.a = tokens[1]; this.c = tokens[3]; this.e = tokens[5];
                this.b = tokens[2]; this.d = tokens[4]; this.f = tokens[6];
            }
            this.toString = function ()
            {
                return ("matrix("
                        + this.a + ", " + this.b + ", "
                        + this.c + ", " + this.d + ", "
                        + this.e + "px, " + this.f + "px)");
            };
        };
    }
    
    function disable_selection(node)
    {
        // Disable selection:
        node.style.userSelect       = "none";// CSS 3
        node.style.MozUserSelect    = "none";// Gecko
        node.style.webkitUserSelect = "none";// Webkit
        node.style.OUserSelect      = "none";// Opera
        // Internet Explorer:
        node.setAttribute("onselectstart", "return false");
    }
    
    // Similar functions are available in DOM Level 3
    function elementChildren(node)
    {
        var children = [];
        var n = node.firstChild;
        while (n)
        {
            if (n.nodeType == Node.ELEMENT_NODE) children.push(n);
            n = n.nextSibling;
        }
        
        return children;
    }
    
    
    /////////////////////////////////////////////////////////////////
    // Core user interface functionality
    
    var formula = document.createElement("div");
    viewport.appendChild(formula);
    viewport.style.overflow = "hidden";
    var handle = { "anchor":null, "sizer":null };
    var item_padding = 0;
    var item_border  = 0;
    var font_pixel_factor = 1;
    var font_pixel_factor_h = 1;
    var font_pixel_factor_accuracy = 0;
    var font_pixel_factor_accuracy_h = 0;
    var min_size = 6;
    var item_class_name = "tacto-item";
    function show_handles(show)
    {
        if (show)
        {
            handle.anchor.style.zIndex = "1";
            handle.sizer .style.zIndex = "1";
            handle.anchor.style.visibility = "visible";
            handle.sizer .style.visibility = "visible";
        }
        else
        {
            handle.anchor.style.zIndex = "-1";
            handle.sizer .style.zIndex = "-1";
            handle.anchor.style.visibility = "hidden";
            handle.sizer .style.visibility = "hidden";
        }
    }
    
    function font_changed()
    {
        font_pixel_factor_accuracy   = 0;
        font_pixel_factor_accuracy_h = 0;
        select_item(null, false);
    }
    function compute_font_pixel_factor(font_size, pixel_size)
    {
        if (pixel_size > font_pixel_factor_accuracy)
        {
            font_pixel_factor = font_size / pixel_size;
            font_pixel_factor_accuracy = pixel_size;
        }
    }
    function compute_font_pixel_factor_h(font_size, pixel_size)
    {
        if (pixel_size > font_pixel_factor_accuracy_h)
        {
            font_pixel_factor_h = font_size / pixel_size;
            font_pixel_factor_accuracy_h = pixel_size;
        }
    }
    
    function move_node(node, x, y)
    {
        node.style.left = String(Math.round(x)) + "px";
        node.style.top  = String(Math.round(y)) + "px";
    }
    function move_nodes_by(nodes, delta_x, delta_y)
    {
        for (var i = 0; i < nodes.length; ++i)
        {
            var node = nodes[i];
            var rect = get_rect(node);
            move_node(node, rect.x + delta_x, rect.y + delta_y);
        }
    }
    
    function create_handle()
    {
        var handle = document.createElement("div");
        handle.setAttribute("class", "handle");
        handle.style.position = "absolute";
        handle.style.minWidth  = "1em";
        handle.style.minHeight = "1em";
        handle.style.border = "medium solid yellow";
        handle.style.border.boxSizing       = "border-box";
        handle.style.border.MozBoxSizing    = "border-box";
        handle.style.border.WebkitBoxSizing = "border-box";
        try { handle.style.background = "rgba(255,255,0,0.5)"; }
        catch (e)
        { /* Alright. This is an old browser like IExplorer 7. */ };
        handle.style.zIndex = "-1";
        handle.style.borderRadius       = "1em";
        handle.style.MozBorderRadius    = handle.style.borderRadius;
        handle.style.WebkitBorderRadius = handle.style.borderRadius;
        handle.style.cursor = "move";
        handle.style.visbility = "hidden";
        
        return handle;
    }
    function insert_handles()
    {
        handle.anchor = create_handle();
        handle.sizer  = create_handle();
        formula.appendChild(handle.anchor);
        formula.appendChild(handle.sizer);
    }
    var move_handles =
        {
            "horizontal": function (rect)
            {
                var center_x, center_y;
                center_x = rect.x + rect.width /2;
                center_y = rect.y + rect.height/2;
                
                move_node(handle.anchor,
                          rect.x   - handle.anchor.offsetWidth,
                          center_y - handle.anchor.offsetHeight /2);
                move_node(handle.sizer,
                          rect.x   + rect.width,
                          center_y - handle.sizer.offsetHeight /2);
            },
            "vertical": function (rect)
            {
                var center_x, center_y;
                center_x = rect.x + rect.width /2;
                center_y = rect.y + rect.height/2;
                move_node(handle.anchor,
                          center_x - handle.anchor.offsetWidth /2,
                          rect.y   - handle.anchor.offsetHeight);
                move_node(handle.sizer,
                          center_x - handle.sizer.offsetWidth /2,
                          rect.y   + rect.height);
            },
            "both": function (rect)
            {
                var center_x, center_y;
                center_x = rect.x + rect.width /2;
                center_y = rect.y + rect.height/2;
                move_node(handle.anchor,
                          rect.x - handle.anchor.offsetWidth,
                          rect.y - handle.anchor.offsetHeight);
                move_node(handle.sizer,
                          rect.x + rect.width,
                          rect.y + rect.height);
            }
        };
    var stretch_dimension = "vertical";
    function set_handles(node)
    {
        if (is_item(node.parentNode)) node = node.parentNode;
        if (is_item(node))
        {
            switch (node.getAttribute("stretch"))
            {
            case "horizontal":
                stretch_dimension = "horizontal";
                break;
            case "vertical":
                stretch_dimension = "vertical";
                break;
            default:
                stretch_dimension = "both";
            }
            move_handles[stretch_dimension](get_rect(node));
        }
    }
    function get_rect(node)
    {
        return {
            "x"     : node.offsetLeft,  "y"     : node.offsetTop,
            "width" : node.offsetWidth, "height": node.offsetHeight
        };
    }
    var get_handle_rect =
        {
            "horizontal": function ()
            {
                var a = handle.anchor, s = handle.sizer;
                var rect = {
                    "x": a.offsetLeft + a.offsetWidth,
                    "y": a.offsetTop  + a.offsetHeight /2
                };
                rect.width  = (s.offsetLeft
                               - rect.x);
                rect.height = (s.offsetTop
                               + handle.sizer.offsetHeight /2
                               - rect.y);
                return rect;
            },
            "vertical": function ()
            {
                var a = handle.anchor, s = handle.sizer;
                var rect = {
                    "x": a.offsetLeft + a.offsetWidth /2,
                    "y": a.offsetTop  + a.offsetHeight
                };
                rect.width  = (s.offsetLeft
                               + s.offsetWidth /2
                               - rect.x);
                rect.height = (s.offsetTop
                               - rect.y);
                return rect;
            },
            "both": function ()
            {
                var a = handle.anchor, s = handle.sizer;
                var rect = {
                    "x": a.offsetLeft + a.offsetWidth,
                    "y": a.offsetTop  + a.offsetHeight
                };
                rect.width  = (s.offsetLeft
                               - rect.x);
                rect.height = (s.offsetTop
                               - rect.y);
                return rect;
            }
        };
    var scale_items = {
        "horizontal": function (nodes, rect)
        {
            var node = nodes[0];
            var previous_rect = get_rect(node);
            if (!rect) rect = get_handle_rect.horizontal();
            var new_height = rect.width * font_pixel_factor;
            node.style.fontSize = String(new_height) + "px";
            var stretch_scale = (line_height / rect.width);
            transform_item(node,
                           "scale(1.0, " + stretch_scale + ")");
            if (node.offsetWidth != rect.width)
            {
                compute_font_pixel_factor_h(new_height,
                                            node.offsetWidth);
                new_height = rect.width * font_pixel_factor_h;
                node.style.fontSize = String(new_height) + "px";
            }
            node.setAttribute("scaled-height",
                              node.offsetHeight * stretch_scale);
            rect.y -= node.clientHeight/2;
            move_nodes_by(nodes,
                          rect.x - previous_rect.x,
                          rect.y - previous_rect.y);
        },
        "vertical": function (nodes, rect)
        {
            var node = nodes[0];
            var previous_rect = get_rect(node);
            if (!rect) rect = get_handle_rect.vertical();
            var new_height = rect.height * font_pixel_factor;
            node.style.fontSize = String(new_height) + "px";
            var stretch_scale = (line_height / rect.height);
            transform_item(node,
                           "scale(" + stretch_scale + ", 1.0)");
            if (node.offsetHeight != rect.height)
            {
                compute_font_pixel_factor(new_height,
                                          node.offsetHeight);
                new_height = rect.height * font_pixel_factor;
                node.style.fontSize = String(new_height) + "px";
            }
            node.setAttribute("scaled-width",
                              node.offsetWidth * stretch_scale);
            rect.x -= node.clientWidth /2;
            move_nodes_by(nodes,
                          rect.x - previous_rect.x,
                          rect.y - previous_rect.y);
        },
        "both": function (nodes, rect)
        {
            var node = nodes[0];
            var previous_rect = get_rect(node);
            if (!rect) rect = get_handle_rect.both();
            var new_height = rect.height * font_pixel_factor;
            node.style.fontSize = String(new_height);// + "px";
            if (node.offsetHeight != rect.height)
            {
                compute_font_pixel_factor(new_height,
                                          node.offsetHeight);
                new_height = rect.height * font_pixel_factor;
                node.style.fontSize = String(new_height) + "px";
            }
            move_nodes_by(nodes,
                          rect.x - previous_rect.x,
                          rect.y - previous_rect.y);
        }
    };
    var item_tag_name = "div"
    function is_item(node)
    {
        return (node
                && node.nodeType == Node.ELEMENT_NODE
                && node.className == item_class_name);
    }
    var caret =
        {
            node: document.createElement("div"),
            x: 0,  y: 0,
            center_y: 0,
            state: 0,
            move_to: function (x, y)
            {
                this.x = x;
                this.y = y;
                move_node(this.node,
                          this.x,
                          this.y - this.center_y);
            }
        };
    caret.node.setAttribute("id", "tacto-cursor");
    var line_height = 20;// pixels
    var opacity_available = "opacity" in document.body.style;
    caret.node
        .setAttribute("style",
                      "position:absolute;padding:0;margin:0;"
                      + "width:0px;cursor:text;opacity:0;");
    caret.node.appendChild(document.createTextNode("|"));
    function caret_blink(reset)
    {
        if (tacto_has_focus && true == reset)
        {
            caret.state = 10;
            if (!caret_blink_interval)
            {
                window.caret_blink = caret_blink;
                caret_blink_interval = window
                    .setInterval("caret_blink()", 100);
            }
        }
        else if (!tacto_has_focus || false == reset)
        {
            if (reset == false) caret.state = 0;
            else                caret.state = 10;
            if (caret_blink_interval)
            {
                window.clearInterval(caret_blink_interval);
                caret_blink_interval = null;
            }
        }
        if (caret.node.firstChild)
        {
            // Compute the font metrics we need:
            line_height = caret.node.offsetHeight;
            min_size = line_height / 2;
            var font_size = compute_font_size(caret.node);
            compute_font_pixel_factor(font_size, line_height);
            cursor_step           = line_height / 3;
            caret.center_y = line_height / 2;
            caret.node.style.height = String(line_height) + "px";
            caret.node.removeChild(caret.node.firstChild);
        }
        if (opacity_available)
        {
            caret.node.style.opacity = caret.state/10;
        }
        else
        {
            caret.node.style.borderColor =
                (caret.state > 5? "yellow" : "transparent");
        }
        if (caret.state > 0) --caret.state;
        else caret.state = 10;
    }
    window.caret_blink = caret_blink;
    var caret_blink_interval;
    formula.appendChild(caret.node);
    var cursor_step = 0;
    
    function move_to(x, y)
    {
        if (!isNaN(x) && !isNaN(y))
        {
            if (x < 0) x = 0;// TODO: expand also to the left/top.
            if (y < 0) y = 0;
            else
            {
                y = Math.round(y / cursor_step) * cursor_step;
            }
            if (formula.offsetWidth  < x+cursor_step)
            {
                formula.style.width  = String(x + 4*cursor_step)+"px";
            }
            if (formula.offsetHeight < y+cursor_step)
            {
                formula.style.height = String(y + 4*cursor_step)+"px";
            }
            caret.move_to(x, y);
            //caret.scrollIntoView();// This blinks in Firefox
        }
    }
    function move_by(delta_x, delta_y)
    {
        move_to(caret.x + delta_x, caret.y + delta_y);
    }
    function insert(content)
    {
        var item;
        if (content.length > 1)
        {
            for (var i = 0; i < content.length; ++i)
            {
                item = insert(content[i]);
            }
            return item;
        }
        switch(content)
        {
        case "^": move_by(0, -cursor_step); return null;
        case "_": move_by(0,  cursor_step); return null;
        case " ": move_by(cursor_step,  0); return null;
        case "":                            return null;
        }
        var x, y;
        x = caret.x;
        y = caret.y - caret.center_y;
        item = document.createElement(item_tag_name);
        item.className = item_class_name;
        item.style.position = "absolute";
        move_node(item, x, y);
        item.style.padding = "0";
        item.style.overflow = "hidden";
        item.style.cursor = "move";
        disable_selection(item);
        if (content == "/") content = "÷";
        if (content == "÷")
        {
            content = "\u2014";// em dash
            item.setAttribute("stretch", "horizontal");
        }
        else if (content.match(/[(){}\[\]∫]/))
        {
            item.setAttribute("stretch", "vertical");
        }
        if (item_tag_name != "input")
        {
            item.appendChild(document.createTextNode(content));
        }
        else
        {
            item.setAttribute("value", content);
            item.style.background = "transparent";
            item.style.border = "none";
            item.style.overflow = "visible";
            item.style.width = "auto";
            item.focus();
        }
        formula.appendChild(item);
        select_item(item, false);
        move_by(item.offsetWidth, 0);
        update();
        if (self.onchange) self.onchange(self);
        
        return item;
    }
    function get_item_at(position)
    {
        var selected_symbol = tree.symbol_at(position);
        if (selected_symbol) return selected_symbol.node;
        else                 return null;
    }
    function select_item_at(position, add_to_selection)
    {
        var node = get_item_at(position);
        if (node && node.hasAttribute("selected")) return;
        select_item(node, add_to_selection);
    }
    function select_items_inside(path, add_to_selection)
    {
        var symbols_inside_path = tree.symbols_inside(path);
        for (var i = 0; i < symbols_inside_path.length; ++i)
        {
            select_item(symbols_inside_path[i].node, add_to_selection);
            add_to_selection = true;
        }
    }
    function select_item(item, add_to_selection)
    {
        if (item && !is_item(item) && is_item(item.parentNode))
        {
            item = item.parentNode;
        }
        var already_selected = false;
        var i;
        i = 0;
        while (i < selected_nodes.length)
        {
            if (selected_nodes[i] == item)
            {
                already_selected = true;
                selected_nodes.splice(i, 1);
            }
            else ++i;
        } 
        
        var node = formula.firstChild;
        while (node)
        {
            if (is_item(node)) node.removeAttribute("selected");
            node = node.nextSibling;
        }
        if (!add_to_selection) selected_nodes = [];
        if (item && !already_selected) selected_nodes.push(item);
        
        if (selected_nodes.length)
        {
            for (i = 0; i < selected_nodes.length; ++i)
            {
                selected_nodes[i].setAttribute("selected",
                                               "selected");
            }
            set_handles(selected_nodes[0]);
            // Disable the manual scaling of numbers etc. for now,
            // as it just confuses users.
            // The handles will be shown only for fraction bars,
            // parentheses and similar things that need to be
            // stretched.
            show_handles(1 == selected_nodes.length
                         && stretch_dimension != "both");
        }
        else
        {
            show_handles(false);
        }
    }
    function del(count)
    {
        if (undefined == count) count = 1;
        var to_delete, abs_count;
        if (selected_nodes.length > 0)
        {
            to_delete = [];
            for (var i = 0; i < selected_nodes.length; ++i)
            {
                to_delete.push(new BSTNode(selected_nodes[i]));
            }
            abs_count = to_delete.length;
            select_item(null, false);
        }
        else
        {
            to_delete = [];
            var rect, x_min, y_min, x_max, y_max;
            x_min = caret.x;
            y_min = caret.y - cursor_step;
            move_by(count * cursor_step, 0);
            x_max = caret.x;
            y_max = caret.y + cursor_step + line_height;
            if (count < 0)
            {
                var temp = x_min;
                x_min = x_max;
                x_max = temp;
            }
            
            var symbols = get_symbols();
            var i, symbol;
            for (i = 0; i < symbols.length; ++i)
            {
                symbol = symbols[i];
                if (symbol.centroid_x <= x_max &&
                    symbol.centroid_x >= x_min &&
                    symbol.centroid_y <= y_max &&
                    symbol.centroid_y >= y_min)
                {
                    to_delete.push(symbol);
                }
            }
            if (to_delete.length < 1) return;
            
            if (count > 0)
            {
                abs_count = count;
                to_delete.sort(function (a, b)
                               { return a.min_x - b.min_x; }
                              );
            }
            else
            {
                abs_count = -count;
                to_delete.sort(function (a, b)
                               { return b.max_x - a.max_x; }
                              );
            }
        }
        
        abs_count = Math.min(abs_count, to_delete.length);
        for (i = 0; i < abs_count; ++i)
        {
            symbol = to_delete[i];
            if (count > 0) move_to(symbol.max_x, symbol.centroid_y);
            else           move_to(symbol.min_x, symbol.centroid_y);
            formula.removeChild(symbol.node);
        }
        update();
        if (self.onchange) self.onchange(self);
    }
    
    var dragging_node = null;
    var drag_offset = { x:0, y:0 };
    function drag_start(node, position)
    {
        caret_blink(false);
        if (is_item(node))
        {
            var rect = get_rect(node);
            drag_offset.x = position.x - (rect.x + rect.width /2);
            drag_offset.y = position.y - (rect.y + rect.height/2);
            dragging_node = node;
        }
        else
        {
            drag_start_handle[stretch_dimension](node, position);
        }
    }
    var drag_start_handle =
        {
            horizontal: function (node, position)
            {
                var rect = get_rect(node);
                if (node == handle.anchor)
                {
                    drag_offset.x =
                        position.x - (rect.x + rect.width    );
                    drag_offset.y =
                        position.y - (rect.y + rect.height /2);
                    dragging_node = node;
                }
                else if (node == handle.sizer)
                {
                    drag_offset.x =
                        position.x - (rect.x                 );
                    drag_offset.y =
                        position.y - (rect.y + rect.height /2);
                    dragging_node = node;
                }
            },
            vertical: function (node, position)
            {
                var rect = get_rect(node);
                if (node == handle.anchor)
                {
                    drag_offset.x =
                        position.x - (rect.x + rect.width /2);
                    drag_offset.y =
                        position.y - (rect.y + rect.height  );
                    dragging_node = node;
                }
                else if (node == handle.sizer)
                {
                    drag_offset.x =
                        position.x - (rect.x + rect.width  /2);
                    drag_offset.y =
                        position.y - (rect.y                 );
                    dragging_node = node;
                }
            },
            both: function (node, position)
            {
                var rect = get_rect(node);
                if (node == handle.anchor)
                {
                    drag_offset.x =
                        position.x - (rect.x + rect.width    );
                    drag_offset.y =
                        position.y - (rect.y + rect.height   );
                    dragging_node = node;
                }
                else if (node == handle.sizer)
                {
                    drag_offset.x =
                        position.x - (rect.x);
                    drag_offset.y =
                        position.y - (rect.y);
                    dragging_node = node;
                }
            }
        };
    var drag_move_handle =
        {
            horizontal: function (rect, position)
            {
                var delta_x = position.x - drag_offset.x;
                var delta_y = position.y - drag_offset.y;
                if (dragging_node == handle.anchor)
                {
                    rect.width  = rect.x + rect.width  - delta_x;
                    rect.height = rect.y + rect.height - delta_y;
                    rect.x = position.x-drag_offset.x;
                    rect.y = position.y-drag_offset.y;
                    rect.width = Math.max(rect.width, min_size);
                }
                else if (dragging_node == handle.sizer)
                {
                    rect.width  = delta_x - rect.x;
                    rect.height = delta_y - rect.y;
                    rect.y = position.y-drag_offset.y;
                    if (rect.width  < min_size)
                    {
                        rect.x -= min_size - rect.width;
                        rect.width  = min_size;
                    }
                }
            },
            vertical: function (rect, position)
            {
                var delta_x = position.x - drag_offset.x;
                var delta_y = position.y - drag_offset.y;
                if (dragging_node == handle.anchor)
                {
                    rect.width  = rect.x + rect.width  - delta_x;
                    rect.height = rect.y + rect.height - delta_y;
                    rect.x = position.x-drag_offset.x;
                    rect.y = position.y-drag_offset.y;
                    rect.height = Math.max(rect.height, min_size);
                }
                else if (dragging_node == handle.sizer)
                {
                    rect.width  = delta_x - rect.x;
                    rect.height = delta_y - rect.y;
                    rect.x = position.x-drag_offset.x;
                    if (rect.height < min_size)
                    {
                        rect.y -= min_size - rect.height;
                        rect.height = min_size;
                    }
                }
            },
            both: function (rect, position)
            {
                var delta_x = position.x - drag_offset.x;
                var delta_y = position.y - drag_offset.y;
                if (dragging_node == handle.anchor)
                {
                    rect.width  = rect.x + rect.width  - delta_x;
                    rect.height = rect.y + rect.height - delta_y;
                    rect.x = delta_x;
                    rect.y = delta_y;
                    rect.width  = Math.max(rect.width,  min_size);
                    rect.height = Math.max(rect.height, min_size);
                }
                else if (dragging_node == handle.sizer)
                {
                    rect.width  = delta_x - rect.x;
                    rect.height = delta_y - rect.y;
                    if (rect.width  < min_size)
                    {
                        rect.x -= min_size - rect.width;
                        rect.width  = min_size;
                    }
                    if (rect.height < min_size)
                    {
                        rect.y -= min_size - rect.height;
                        rect.height = min_size;
                    }
                }
            }
        };
    function drag_move(position)
    {
        if (dragging_node)
        {
            var rect = get_handle_rect[stretch_dimension]();
            var height = rect.height;
            if (is_item(dragging_node))
            {
                rect.x = (position.x - rect.width /2
                          - drag_offset.x);
                rect.y = (position.y - rect.height/2
                          - drag_offset.y);
            }
            else
            {
                drag_move_handle[stretch_dimension](rect,
                                                    position);
            }
            move_handles[stretch_dimension](rect);
            if (selected_nodes.length > 0)
            {
                scale_items[stretch_dimension](selected_nodes,
                                               rect);
            }
            if (self.options.live_preview)
            {
                update();
                if (self.onchange) self.onchange(self);
            }
        }
    }
    function drag_cancel()
    {
        dragging_node = null;
        caret_blink(true);
    }
    function drag_end()
    {
        if (dragging_node && selected_nodes.length > 0)
        {
            scale_items[stretch_dimension](selected_nodes, null);
            set_handles(selected_nodes[0]);
            update();
            if (self.onchange) self.onchange(self);
        }
        drag_cancel();
    }
    
    var gesture_path =
        {
            node:   undefined,
            points: undefined,
            // Bounding box:
            x:      Number.MAX_VALUE, y:       Number.MAX_VALUE,
            width: -Number.MAX_VALUE, height: -Number.MAX_VALUE,
            init: function(point)
            {
                this.x = point.x; this.width  = 0;
                this.y = point.y; this.height = 0;
                if ("pathSegList" in this.node)
                {
                    this.points = [];
                    this.node.pathSegList.clear();
                    this.extend(point);
                }
                else
                {
                    this.update_html_rectangle();
                    this.node.style.display = "block";
                }
                this.node.style.visibility = "visible";
            },
            update_html_rectangle: function ()
            {
                var style = this.node.style;
                style.left   = String(this.x) + "px";
                style.top    = String(this.y) + "px";
                style.width  = String(this.width)  + "px";
                style.height = String(this.height) + "px";
            },
            extend: function (point)
            {
                if (point.x < this.x)
                {
                    this.width += this.x - point.x;
                    this.x = point.x;
                }
                else if (point.x > this.x + this.width)
                {
                    this.width += (point.x
                                   - (this.x + this.width));
                }
                if (point.y < this.y)
                {
                    this.height += this.y - point.y;
                    this.y = point.y;
                }
                else if (point.y > this.y + this.height)
                {
                    this.height += (point.y
                                    - (this.y + this.height));
                }
                if (this.points)
                {
                    this.points.push(point);
                    var segment;
                    if (this.points.length > 1)
                    {
                        segment = this.node.
                            createSVGPathSegLinetoAbs(point.x,
                                                      point.y);
                    }
                    else
                    {
                        segment = this.node.
                            createSVGPathSegMovetoAbs(point.x,
                                                      point.y);
                    }
                    this.node.pathSegList.appendItem(segment);
                }
                else
                {
                    this.update_html_rectangle();
                }
            },
            contains: function (x, y)
            {
                var inside_bounding_box =
                    (x >= this.x && x <= this.x + this.width &&
                     y >= this.y && y <= this.y + this.height);
                if (inside_bounding_box && this.points)
                {
                    // Compute intersection count
                    var intersection_count = 0, a, b;
                    a = this.points[this.points.length-1]
                    for (var i = 0; i < this.points.length; ++i)
                    {
                        b = this.points[i];
                        var ac_y = y - a.y, cb_y = b.y - y;
                        var ac_x = x - a.x, cb_x = b.x - x;
                        if (cb_y == 0)
                        {
                            if (x >= b.x) ++intersection_count;
                        }
                        else if (ac_y > 0 && cb_y > 0
                                 && ac_x/ac_y > cb_x/cb_y)
                        {
                            ++intersection_count;
                        }
                        else if (ac_y < 0 && cb_y < 0
                                 && ac_x/ac_y < cb_x/cb_y)
                        {
                            ++intersection_count;
                        }
                        
                        a = b;
                    }
                    
                    return (intersection_count & 0x01 != 0x00);
                }
                else
                {
                    return inside_bounding_box;
                }
            },
            clear: function ()
            {
                if (this.points) this.node.pathSegList.clear();
                this.node.style.visibility = "hidden";
            }
        };
    try
    {
        gesture_path.node = document.
            createElementNS("http://www.w3.org/2000/svg",
                            "path");
    }
    catch (e)
    {
        // The browser does not support embedded SVG.
        gesture_path.node = document.createElement("div");
    };
    if ("pathSegList" in gesture_path.node)
    {
        gesture_path.node.setAttribute
        ("style", "fill:none;stroke:yellow;stroke-width:2");
        var svg = document.createElementNS
        ("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("style", "width:100%; height:100%");
        svg.appendChild(gesture_path.node);
        formula.appendChild(svg);
    }
    else
    {
        gesture_path.node.
            setAttribute("style",
                         "position:absolute;"
                         + "display:none;padding:0;margin:0;"
                         + "border:thin solid yellow;");
        formula.appendChild(gesture_path.node);
    }
    
    function path_start(position)
    {
        caret_blink(false);
        gesture_path.init(position);
    }
    function path_add(position)
    {
        gesture_path.extend(position);
    }
    function path_cancel()
    {
        gesture_path.clear();
        caret_blink(true);
    }
    function path_end()
    {
        if (gesture_path.points && gesture_path.points.length)
        {
            // Recognize single-touch gestures
            gesture(gesture_path);
        }
        else
        {
            // This is rectangle selection
            select_items_inside(gesture_path, false);
        }
        path_cancel();
    }
    
    var previous_transformation = "";
    function zoom(scale)
    {
        message("zoom " + scale);
        transform(0, 0, 0, 0, scale, 0);
        fix();
    }
    this.zoom = zoom;
    function transform_item(node, transform)
    {
        node.style.transform = transform;
        node.style.webkitTransform = node.style.transform;
        node.style.MozTransform    = node.style.transform;
    }
    function transform(center_x, center_y, x, y, scale, rotation)
    {
        if (self.options.lock_rotation) rotation = 0;
        if ("webkitTransformOrigin" in formula.style)
        {
            var translate_open, translate_close;
            if (self.options.quick_rendering)
            {
                translate_open  = "translate3d(";
                translate_close = ", 0)";
            }
            else
            {
                translate_open  = "translate(";
                translate_close = ")";
            }
            formula.style.webkitTransformOrigin = "0 0";
            formula.style.webkitTransform =
                translate_open
                + (center_x + x) + "px, "
                + (center_y + y) + "px" + translate_close
                + (scale != 1.0?" scale(" + (scale) + ")":"")
                + (rotation?" rotate(" + (rotation) + "deg)":"")
                + " " + translate_open
                + (-center_x) + "px, "
                + (-center_y) + "px" + translate_close
                + " " + previous_transformation;
        }
        else if ("MozTransformOrigin" in formula.style)
        {
            formula.style.MozTransformOrigin = "0 0";
            formula.style.MozTransform =
                "translate("
                + (center_x + x) + "px, "
                + (center_y + y) + "px)"
                + (scale != 1.0?" scale(" + (scale) + ")":"")
                + (rotation?" rotate(" + (rotation) + "deg)":"")
                + " translate("
                + (-center_x) + "px, "
                + (-center_y) + "px)"
                + " " + previous_transformation;
        }
        else
        {
            formula.style.zoom = scale;
        }
    }
    function fix()
    {
        if ("webkitTransform" in formula.style)
        {
            previous_transformation = window
                .getComputedStyle(formula, null)
                .webkitTransform;
        }
        else if ("MozTransform" in formula.style)
        {
            previous_transformation = window
                .getComputedStyle(formula, null)
                .MozTransform;
        }
    }
    
    /////////////////////////////////////////////////////////////////
    // Commands
    
    function do_command(command)
    {
        switch (command)
        {
        case "up":        move_by(             0, -cursor_step); break;
        case "down":      move_by(             0,  cursor_step); break;
        case "left":      move_by(  -cursor_step,            0); break;
        case "right":     move_by(   cursor_step,            0); break;
        case "backtab":   move_by(8*-cursor_step,            0); break;
        case "tab":       move_by(8* cursor_step,            0); break;
        case "delete":    del( 1);                               break;
        case "backspace": del(-1);                               break;
        case "baseline":  move_by(             0,  cursor_step); break;
        }
    }
    
    /////////////////////////////////////////////////////////////////
    // Gesture recognition
    
    function gesture(path)
    {
        // Recognize gestures
        var first_point = path.points[0];
        var last_point  = path.points[path.points.length - 1];
        var tolerance = 5;
        if (path.width > line_height/2 &&
            first_point.x <=  path.x + tolerance &&
            last_point.x  >= (path.x + path.width - tolerance) &&
            path.width / path.height > 5)
        {
            // Fraction bar gesture
            var item = insert("÷");
            scale_items[item.getAttribute("stretch")]([item], path);
            set_handles(item);
        }
        else if (path.width < 2 && path.height < 2)
        {
            // Click selection
            select_item_at(path, true)
            move_to(path.x, path.y);
        }
        else
        {
            // Lasso selection gesture
            select_items_inside(gesture_path, true);
        }
    }
    
    /////////////////////////////////////////////////////////////////
    // Natural language generation
    
    var english_infix =
        {
            "arith1:plus" : " plus ",
            "arith1:minus": " minus ",
            "arith1:times": " times ",
            "arith1:divide":  " divided by ",
            "arith1:power": " to the power of ",
            "relation1:eq": " equals ",
            "relation1:gt": " is greater than ",
            "relation1:lt": " is less than ",
            "nums1:rational": " divided by ",
            "nums1:factorial": " factorial ",
            "algebra1:vector_selector": " sub-",
            "matracas.org:mixed-number": " and "
        };
    var english_function =
        {
            "transc1:sin": " sine of ",
            "transc1:cos": " cosine of "
        };
    var english_symbols =
        {
            "nums1:pi": " pi "
        };
    
    var number_words = {
        "0":"zero", "1":"one",  "2":"two",
        "3":"three", "4":"four", "5":"five",
        "6":"six", "7":"seven", "8":"eight",
        "9":"nine", "10":"ten", "11":"eleven",
        "12":"twelve", "13":"thirteen",
        "14":"fourteen", "15":"fifteen",
        "16":"sixteen", "17":"seventeen",
        "18":"eighteen", "19":"nineteen",
        "20":"twenty", "30":"thirty",
        "40":"forty", "50":"fifty",
        "60":"sixty", "70":"seventy",
        "80":"eighty", "90":"ninety"
    };
    function om_to_english(om)
    {
        var text = "";
        
        var i, children;
        switch (om.localName)
        {
        case "OMOBJ":
            text += om_to_english(om.firstChild);
            break;
        case "OMI":
            text += number_to_english(om.firstChild.nodeValue);
            break;
        case "OMF":
            text += number_to_english(om.getAttribute("dec"));
            break;
        case "OMV":
        case "OMS":
            text += om.getAttribute("name");
            break;
        case "OME":
            text += "error";
            break;
        case "OMA":
            children = elementChildren(om);
            if (children.length < 1) break;
            if (children[0].localName == "OMV")
            {
                text += children[0].getAttribute("name")
                    + " of";
            }
            else
            {
                var symbol_name
                    = children[0].getAttribute("cd") + ":"
                    + children[0].getAttribute("name");
                if (symbol_name == "arith1:power")
                {
                    var exponent = om_to_english(children[2]);
                    if (exponent == "two")
                    {
                        text += (om_to_english(children[1])
                                 + " squared");
                    }
                    else if (exponent == "three")
                    {
                        text += (om_to_english(children[1])
                                 + " cubed");
                    }
                    else
                    {
                        text += (om_to_english(children[1])
                                 + english_infix[symbol_name]
                                 + exponent
                                );
                    }
                }
                else if (symbol_name == "algebra1:vector_selector")
                {
                    var index = om_to_english(children[2]);
                    text += (om_to_english(children[1])
                             + english_infix[symbol_name]
                             + index
                            );
                }
                else if (symbol_name == "arith1:root")
                {
                    var degree = om_to_english(children[2]);
                    if (degree in english_ordinal)
                    {
                        degree = english_ordinal[degree];
                    }
                    else
                    {
                        degree += "-th";
                    }
                    if (degree == "two")
                    {
                        text += ("square root of "
                                 + om_to_english(children[1])
                                );
                    }
                    else if (degree == "three")
                    {
                        text += ("cubic root of "
                                 + om_to_english(children[1])
                                );
                    }
                    else
                    {
                        text += (degree
                                 + english_infix[symbol_name]
                                 + om_to_english(children[2])
                                );
                    }
                }
                else if (symbol_name == "arith1:times"
                         && children[2].nodeName == "OMV")
                {
                    text += (om_to_english(children[1])
                             + " "
                             + om_to_english(children[2])
                            );
                }
                else if (symbol_name in english_infix)
                {
                    if (children.length > 2)
                    {
                        text += (om_to_english(children[1])
                                 + english_infix[symbol_name]
                                 + om_to_english(children[2])
                                );
                    }
                    else
                    {
                        text += (om_to_english(children[1])
                                 + english_infix[symbol_name]
                                );
                    }
                }
                else if (symbol_name in english_function)
                {
                    text += english_function[symbol_name];
                    for (i = 1; i < children.length; ++i)
                    {
                        if (i > 1) text += ", ";
                        text += om_to_english(children[i]);
                    }
                }
            }
            break;
        }
        
        return text;
    }
    
    function number_to_english(digits)
    {
        var text;
        var parts = digits.split(".");
        text = integer_to_english(parts[0]);
        if (parts.length > 1)
        {
            text += " point ";
            for (var i = 1; i < parts.length; ++i)
            {
                text += integer_to_english(parts[i]);
            }
        }
        
        return text;
    }
    
    function integer_to_english(digits)
    {
        var text = "";
        if (digits.length > 6)
        {
            text +=
            integer_to_english(digits.
                               substring(0, digits.length - 6))
                + " million "
                + integer_to_english(digits.
                                     substring(digits.length - 6));
        }
        else if (digits.length > 3)
        {
            text +=
            integer_to_english(digits.
                               substring(0, digits.length - 3))
                + " thousand "
                + integer_to_english(digits.
                                     substring(digits.length - 3));
        }
        else if (digits.length > 2)
        {
            text +=
            integer_to_english(digits.
                               substring(0, digits.length - 2))
                + " hundred "
                + integer_to_english(digits.
                                     substring(digits.length - 2));
        }
        else if (digits.length > 1)
        {
            if (digits in number_words)
            {
                text += number_words[digits];
            }
            else
            {
                text += number_words[digits[0]+"0"];
                if (digits[1] != 0)
                {
                    text += "-" + integer_to_english(digits[1]);
                }
            }
        }
        else
        {
            for (var i = 0; i < digits.length; ++i)
            {
                if (i > 0) text += " ";
                text += number_words[digits[i]];
            }
        }
        
        return text;
    }
    
    /////////////////////////////////////////////////////////////////
    // Speech synthesis
    
    function Voice()
    {
        var self = this;
        
        // Public:
        this.prepare = prepare;
        this.speak = speak;
        this.stop  = stop;
        
        // Private:
        var sequence;
        var current = 0;
        
        var voice_metadata =
            {
                // variant: { token: duration in milliseconds }
                "medial":
                {
                    "and-short": 140, "and": 141,
                    "a": 392, "b": 488,
                    "cosine-of": 693, "cubed": 442,
                    "c": 559, "divided-by": 736,
                    "d": 489, "eighteen": 582,
                    "eight": 236, "eighty": 325,
                    "eleven": 427, "equals": 473,
                    "e": 401, "factorial": 680,
                    "fifteen": 561, "fifty": 450,
                    "five": 399, "forty": 447,
                    "fourteen": 587, "four": 350,
                    "f": 502, "g": 573,
                    "hundred": 439, "h": 537,
                    "is-greater-than": 886, "is-less-than": 760,
                    "i": 463, "j": 599,
                    "k": 554, "l": 471,
                    "million": 478, "minus": 461,
                    "m": 477, "nineteen": 592,
                    "ninety": 498, "nine": 436,
                    "n": 465, "one": 396,
                    "o": 421, "pi": 372,
                    "plus": 427, "point": 460,
                    "p": 562, "q": 581,
                    "r": 473, "seventeen": 644,
                    "seventy": 507, "seven": 477,
                    "sine-of": 553, "sixteen": 585,
                    "sixty": 466, "six": 434,
                    "squared": 468, "square-root-of": 841,
                    "sub": 333, "s": 458,
                    "ten": 303, "thirteen": 542,
                    "thirty": 416, "thousand": 567,
                    "three": 404, "times": 442,
                    "to-the-power-of": 826, "t": 482,
                    "twelve": 454, "twenty": 461,
                    "two": 271, "u": 523,
                    "v": 521, "w": 742,
                    "x": 517, "y": 300,
                    "zero": 490, "z": 534
                },
                
                "final":
                {
                    "and": 312, "a": 372,
                    "b": 461, "cosine-of": 723,
                    "cubed": 418, "c": 515,
                    "divided-by": 669, "d": 454,
                    "eighteen": 371, "eight": 310,
                    "eighty": 422, "eleven": 520,
                    "equals": 1232, "e": 356,
                    "factorial": 781, "fifteen": 627,
                    "fifty": 549, "five": 596,
                    "forty": 531, "fourteen": 616,
                    "four": 407, "f": 469,
                    "g": 488, "hundred": 504,
                    "h": 507, "is-greater-than": 1519,
                    "is-less-than": 1386, "i": 421,
                    "j": 534, "k": 487,
                    "l": 436, "million": 496,
                    "minus": 412, "m": 437,
                    "nineteen": 612, "ninety": 586,
                    "nine": 423, "n": 407,
                    "one": 323, "o": 337,
                    "pi": 414, "plus": 299,
                    "point": 380, "p": 350,
                    "q": 509, "r": 411,
                    "seventeen": 723, "seventy": 669,
                    "seven": 500, "sine-of": 537,
                    "sixteen": 627, "sixty": 593,
                    "six": 415, "squared": 491,
                    "square-root-of": 747, "sub": 285,
                    "s": 405, "ten": 384,
                    "thirteen": 599, "thirty": 506,
                    "thousand": 582, "three": 407,
                    "times": 409, "to-the-power-of": 733,
                    "t": 435, "twelve": 486,
                    "twenty": 569, "two": 305,
                    "u": 454, "v": 460,
                    "w": 685, "x": 439,
                    "y": 252, "zero": 516,
                    "z": 473
                }
                
            };
        
        var max_token_length = 0;
        var i;
        for (i in voice_metadata["medial"])
        {
            if (i.length > max_token_length)
            {
                max_token_length = i.length;
            }
        }
        
        function prepare(text)
        {
            text = text.replace(/[ ]+/g, "-");
            sequence = [];
            var tokens = [];
            var known_tokens = voice_metadata["medial"];
            var start = 0, length;
            for (start = 0; start < text.length; ++start)
            {
                if (text.charCodeAt(start) == 0x2D) continue;
                for (var length = max_token_length;
                     length > 0; --length)
                {
                    var token = text.substr(start, length);
                    if (token in known_tokens)
                    {
                        tokens.push(token);
                        start += length - 1;
                        break;
                    }
                }
                if (length == 0) tokens.push(text.substr(start, 1));
            }
            for (var i = 0; i < tokens.length; ++i)
            {
                if (i+1 < tokens.length) add(tokens[i], "medial");
                else                     add(tokens[i], "final");
            }
        }
        
        function speak()
        {
            current = 0;
            // Initial delay, needed by Safari:
            var initial_delay = 10;
            if (navigator.platform == 'iPad'
                || navigator.platform == 'iPod')
            {
                // Ugly hack, but it does not work otherwise.
                // In Desktop Safari it works fine.
                initial_delay = 1200;
            }
            
            voice_sample_timer = setTimeout(next, initial_delay);
        }
        
        function stop()
        {
            if (voice_sample_timer) clearTimeout(voice_sample_timer);
        }
        
        var voice_sample_timer;
        function next()
        {
            if (current < sequence.length)
            {
                sequence[current][0].play();
                duration = sequence[current][1];
                if (duration > 10 && voice_sample_timer)
                {
                    voice_sample_timer = setTimeout(next, duration);
                }
                ++current;
            }
        }
        
        function add(token, variant)
        {
            if (!(token in voice_metadata[variant]))
            {
                message("Error: speech token '" + token
                        + "' unavailable");
                return;
            }
            var sample = new Audio("voices/"
                                   + variant + "/"
                                   + token + ".wav");
            sample.load();
            sequence.push([sample, voice_metadata[variant][token]]);
        }
    }
    
    
    /////////////////////////////////////////////////////////////////
    // Event handling
    
    var selected_nodes = [];
    var mousedown_position;
    var modes = { NONE:0, DRAG:1, GESTURE:2 };
    var mode = modes.NONE;
    function mousedown(event)
    {
        standard_event(event);
        var node = get_target(event);
        if (node.className == "handle"
            && node.style.visibility != "hidden")
        {
            mousedown_position = compute_position(event);
            mode = modes.DRAG;
            drag_start(node, mousedown_position);
        }
        else
        {
            if (node == formula || node.parentNode == formula)
            {
                mousedown_position = compute_position(event);
                select_item_at(mousedown_position, event.shiftKey);
                if (selected_nodes.length > 0)
                {
                    mode = modes.DRAG;
                    drag_start(selected_nodes[0],
                               mousedown_position);
                }
                else
                {
                    mode = modes.GESTURE;
                    path_start(mousedown_position);
                }
            }
        }
    }
    function mousemove(event)
    {
        switch (mode)
        {
        case modes.DRAG:
            standard_event(event);
            var position = compute_position(event);
            drag_move(position);
            break;
        case modes.GESTURE:
            standard_event(event);
            path_add(compute_position(event));
            break;
        }
    }
    function mouseup(event)
    {
        if (mousedown_position)
        {
            standard_event(event);
            var position = compute_position(event);
            if (position &&
                position.x == mousedown_position.x &&
                position.y == mousedown_position.y)
            {
                move_to(position.x, position.y);
                if (modes.DRAG    == mode) drag_cancel();
                if (modes.GESTURE == mode) path_cancel();
            }
            mousedown_position = undefined;
        }
        switch (mode)
        {
        case modes.DRAG:
            drag_end();
            break;
        case modes.GESTURE:
            path_end();
            break;
        }
        mode = modes.NONE;
    }
    // These values are defined in the DOM3 specification,
    // but it is still a draft and it is not implemented
    // in general apart from Gecko browsers.
    var key_codes = {
        DOM_VK_BACK_SPACE: 0x08,// Not in DOM3
        DOM_VK_TAB:        0x09,// Not in DOM3
        DOM_VK_ENTER:      0x0C,
        DOM_VK_LEFT:       0x25,// Code 0x14 in DOM3
        DOM_VK_RIGHT:      0x27,// Code 0x15 in DOM3
        DOM_VK_UP:         0x26,// Code 0x16 in DOM3
        DOM_VK_DOWN:       0x28,// Code 0x17 in DOM3
        DOM_VK_DELETE:     0x2E // Code 0x0A in DOM3
    };
    var keydown_before = false;
    function keypress(event)
    {
        standard_event(event);
        var key = event.charCode;
        if (key == undefined) key = event.which;
        var consumed = true;
        if (0x20 == key)                         do_command("right");
        else if (0x08 == key && !keydown_before) do_command("backspace");
        else if (0xFF == key && !keydown_before) do_command("delete");
        else if (0x09 == key && event.shiftKey)  do_command("backtab");
        else if (0x09 == key)                    do_command("tab");
        else if (!key && event.keyCode
                 && !keydown_before) return keydown(event);
        else if (key>0x20 && !(event.ctrlKey || event.metaKey))
        {
            insert(String.fromCharCode(key));
        }
        else if (!keydown_before) consumed = false;
        if (consumed) event.preventDefault();
        keydown_before = false;
        
        return !consumed;
    }
    function keydown(event)
    {
        standard_event(event);
        var key = event.keyCode;
        if (!event.keyCode && event.which) key = event.which;
        var consumed = true;
        if (event.ctrlKey|event.altKey|event.metaKey)
        {
            consumed = false;
        }
        else switch (key)
        {
        case key_codes.DOM_VK_RIGHT: do_command("right"); break;
        case key_codes.DOM_VK_LEFT:  do_command("left");  break;
        case key_codes.DOM_VK_UP:    do_command("up");    break;
        case key_codes.DOM_VK_DOWN:  do_command("down");  break;
        case key_codes.DOM_VK_BACK_SPACE:
            do_command("backspace");
            break;
        case key_codes.DOM_VK_DELETE: do_command("delete"); break;
        case key_codes.DOM_VK_TAB:
            if (event.shiftKey) do_command("backtab");
            else                do_command("tab");
            break;
        default: consumed = false;
        }
        if (consumed) event.preventDefault();
        keydown_before = true;
        
        return !consumed;
    }
    var tacto_has_focus = false;
    function focus(event)
    {
        tacto_has_focus = true;
        caret_blink(tacto_has_focus);
    }
    function blur(event)
    {
        tacto_has_focus = false;
        caret_blink(tacto_has_focus);
    }
    
    var touch_initial, touch;
    function touchstart(event)
    {
        if (event.touches.length == 2)
        {
            touch_initial =
                {
                    x: (event.touches.item(0).pageX
                        + event.touches.item(1).pageX)
                        / 2 - viewport.offsetLeft,
                    y: (event.touches.item(0).pageY
                        + event.touches.item(1).pageY)
                        / 2 - viewport.offsetTop,
                };
            touch = { x: touch_initial.x, y: touch_initial.y };
        }
        else if (event.touches.length == 1)
        {
            event.preventDefault();
            mousedown(event);
        }
    }
    function touchmove(event)
    {
        if (event.touches.length == 2)
        {
            if (!touch) touch = { x:0, y:0 };
            touch.x  =
                (event.touches.item(0).pageX
                 + event.touches.item(1).pageX) / 2
                - viewport.offsetLeft;
            touch.y  =
                (event.touches.item(0).pageY
                 + event.touches.item(1).pageY) / 2
                - viewport.offsetTop;
            if (!touch_initial)
            {
                touch_initial = { x: touch.x, y: touch.y };
            }
        }
        else if (event.touches.length == 1)
        {
            mousemove(event);
            event.preventDefault();
        }
    }
    function touchend(event)
    {
        event.preventDefault();
        mousedown_position = null;
        mouseup(event);
    }
    function gesturestart(event)
    {
    }
    function gesturechange(event)
    {
        //standard_event(event);// Not needed
        if (touch_initial && touch)
        {
            transform(touch_initial.x,
                      touch_initial.y,
                      touch.x - touch_initial.x,
                      touch.y - touch_initial.y,
                      event.scale,
                      event.rotation);
        }
    }
    function gestureend(event)
    {
        //standard_event(event);// Not needed
        fix();
        touch_initial = undefined;
        touch         = undefined;
    }
    
    function text_input_change(event)
    {
        standard_event(event);
        var input = event.target;
        if (input.value.length)
        {
            window.setTimeout(function () {
                insert(input.value);
                input.value = "";
            }, 100);
        }
        event.preventDefault();
    }
    
    function text_input_keydown(input, event)
    {
        if (input.value == "")
        {
            switch (event.keyCode)
            {
            case 8:  // Backspace
            case 46: // Delete
            case 37: // Left
            case 38: // Up
            case 39: // Right
            case 40: // Down
                keydown(event);
            }
        }
    }
    
    /////////////////////////////////////////////////////////////////
    // Layout analysis
    
    
    function BSTNode(argument)
    {
        var self = this;
        // public:
        this.is_region = is_region;
        this.is_symbol = is_symbol;
        this.symbol_at = symbol_at;
        this.symbols_inside = symbols_inside;
        
        // Constructor:
        if (undefined == argument) argument = BSTNode.labels.EXPRESSION;
        if (typeof argument == "number")
        {
            // Region nodes:
            self.children = [];
            self.parent = null;
            self.label = argument;
            self.symbol_class = null;
            self.node = null;
            self.min_x  = 0;
            self.min_y  = 0;
            self.max_x  = 0;
            self.max_y  = 0;
            self.width  = 0;
            self.height = 0;
            self.centroid_x = 0;
            self.centroid_y = 0;
        }
        else
        {
            // Symbol nodes:
            self.children = {};
            self.parent = null;
            self.label = get_text(argument);
            if ("÷" == self.label || "—" == self.label)
                self.symbol_class = BSTNode.FRACTION_BAR;
            else if (self.label.match(/[0-9]/))
                self.symbol_class = BSTNode.DIGIT;
            else if (self.label.match(/[=<>⋁⋀→⇒+-]/))
                self.symbol_class = BSTNode.NON_SCRIPTED;
            else if (self.label.match(/[\(\{\[]/))
                self.symbol_class = BSTNode.OPEN_BRACKET;
            else if (self.label.match(/[\)\}\]]/))
                self.symbol_class = BSTNode.CLOSE_BRACKET;
            else if (self.label.match(/[√]/))
                self.symbol_class = BSTNode.ROOT;
            else if (self.label.match(/[Σ∫Π]/))
                self.symbol_class = BSTNode.VARIABLE_RANGE;
            else // We do not need to distinguish ascenders/descenders.
                self.symbol_class = BSTNode.CENTERED;
            self.node = argument;
            var node = self.node;
            self.min_x  = node.offsetLeft;
            self.min_y  = node.offsetTop;
            self.max_x  = node.offsetLeft + node.offsetWidth;
            self.max_y  = node.offsetTop  + node.offsetHeight;
            self.width  = node.offsetWidth;
            self.height = node.offsetHeight;
            self.centroid_x = (self.min_x + self.max_x) / 2;
            self.centroid_y = (self.min_y + self.max_y) / 2;
            for (var i = 0; i < BSTNode.labels.length; ++i)
            {
                self.children[i] = new BSTNode(i);
            }
            if (self.node.hasAttribute("scaled-width"))
            {
                self.width = Number(self.node
                                    .getAttribute("scaled-width"));
                self.min_x = self.centroid_x - self.width / 2;
                self.max_x = self.min_x + self.width;
            }
            if (self.node.hasAttribute("scaled-height"))
            {
                self.height = Number(self.node
                                     .getAttribute("scaled-height"));
                self.min_y = self.centroid_y - self.height / 2;
                self.max_y = self.min_y + self.height;
            }
        }
        
        var super_threshold = -0.25;
        var subsc_threshold =  0.25;
        function determine_position(root, node)
        {
            var delta_y = node.centroid_y - root.centroid_y;
            if (root.symbol_class == BSTNode.OPEN_BRACKET)
            {
                if (root.min_y < node.centroid_y &&
                    root.max_y > node.centroid_y)
                {
                    if (node.symbol_class == BSTNode.CLOSE_BRACKET)
                    {
                        root.symbol_class = BSTNode.BRACKETED;
                    }
                    return BSTNode.labels.CONTAINS;
                }
            }
            else if (node.centroid_x < root.min_x)
            {
                if (delta_y > subsc_threshold * root.height)
                {
                    return BSTNode.labels.BLEFT;
                }
                else if (delta_y < super_threshold * root.height)
                {
                    return BSTNode.labels.TLEFT;
                }
                // else it's on the same base line.
            }
            else if (node.centroid_x > root.max_x)
            {
                if (delta_y > subsc_threshold * root.height)
                {
                    return BSTNode.labels.SUBSC;
                }
                else if (delta_y < super_threshold * root.height)
                {
                    return BSTNode.labels.SUPER;
                }
                // else it's on the same base line.
            }
            else if (root.symbol_class == BSTNode.FRACTION_BAR)
            {
                if (delta_y > 0) return BSTNode.labels.BELOW;
                else             return BSTNode.labels.ABOVE;
            }
            
            return BSTNode.labels.NULL;
        }
        this.insert = function(node)
        {
            if (!node)
            {
                alert("undefined node in insert()");
                return false;
            }
            var position, i;
            if (self.is_region())
            {
                i = self.children.length - 1;
                while (i >= 0 && !self.children[i].insert(node)) --i;
                if (i < 0)
                {
                    // Was not inserted in any child
                    self.add(null, node);
                }
                else
                {
                    self.extend(self.children[i]);
                }
                
                return true;
            }
            else
            {
                position = determine_position(self, node);
                if ((position == BSTNode.labels.SUPER ||
                     position == BSTNode.labels.SUBSC) &&
                    !node.node.hasAttribute("stretch"))
                {
                    var style = node.node.style;
                    var transition = "transform 0.3s linear";
                    style.MozTransition = "-moz-" + transition;
                    style.MozTransform = "scale(0.60)";
                    style.webkitTransition = "-webkit-" + transition;
                    style.webkitTransform = "scale(0.60)";
                }
                if (position != BSTNode.labels.NULL)
                {
                    self.children[position].insert(node);
                    
                    return true;
                }
            }
            
            return false;
        }
        this.extend = function(other)
        {
            if (self.is_region() && 0 == self.children.length)
            {
                self.min_x = other.min_x;
                self.max_x = other.max_x;
                self.min_y = other.min_y;
                self.max_y = other.max_y;
            }
            else
            {
                if (other.min_x < self.min_x) self.min_x = other.min_x;
                if (other.max_x > self.max_x) self.max_x = other.max_x;
                if (other.min_y < self.min_y) self.min_y = other.min_y;
                if (other.max_y > self.max_y) self.max_y = other.max_y;
            }
            self.width  = self.max_x - self.min_x;
            self.height = self.max_y - self.min_y;
            self.centroid_x = (self.min_x + self.max_x) / 2;
            self.centroid_y = (self.min_y + self.max_y) / 2;
        }
        this.merge = function(other)
        {
            if (!self.node) alert("merge: not node: " + self);
            if (self.is_symbol() && other.is_symbol())
            {
                self.label += other.label;
                for (var c in other.children)
                {
                    var region = other.children[c];
                    for (var i = 0; i < region.children.length; ++i)
                    {
                        self.add(c, region.children[i]);
                    }
                }
            }
            self.extend(other);
        }
        this.add = function(position, node)
        {
            var region;
            if (self.is_region())
            {
                region = self;
                // TODO: in the future, use a more capable
                // algorithm for finding the node where
                // this one should be attached,
                // to allow multiple expressions.
                // This is enough if we have only one expression.
                var i, root;
                for (i = 0; i < region.children.length; ++i)
                {
                    root = region.children[i];
                    if (root.min_x > node.centroid_x) break;
                }
                if (node.is_region())
                {
                    var children = node.children;
                    region.children = region.children.slice(0, i)
                        .concat(children.splice(0, children.length),
                                region.children.slice(i)
                               );
                }
                else
                {
                    region.children.splice(i, 0, node);
                }
                region.extend(node);
            }
            else if (self.symbol_class == BSTNode.CLOSE_BRACKET
                     && self.parent
                     && self.parent.symbol_class == BSTNode.BRACKETED)
            {
                self.parent.add(position, node);
                return;
            }
            else
            {
                region = self.children[position];
                region.add(null, node);
            }
            node.parent = self;
        }
        this.toString = function()
        {
            var text = "";
            var i;
            if (self.is_region())
            {
                if (self.children.length > 0)
                {
                    text += BSTNode.labels[self.label];
                    text += "(";
                    for (i = 0; i < self.children.length; ++i)
                    {
                        if (i > 0) text += ", ";
                        text += self.children[i];
                    }
                    text += ") ";
                }
            }
            else
            {
                text += "[" + self.label + "]";
                var children_text = "";
                for (i in self.children)
                {
                    children_text += self.children[i];
                }
                if (children_text) text += "{" + children_text + "} ";
            }
            
            return text;
        }
        
        // private:
        function is_region() { return (self.node == null); }
        function is_symbol() { return (self.node != null); }
        var best_fit;
        function symbol_at(position)
        {
            best_fit = { symbol:null, distance:Number.MAX_VALUE };
            find_best_fit(self, position, best_fit);
            
            return best_fit.symbol;
        }
        function find_best_fit(node, position, best_fit)
        {
            var i;
            if (node.is_region())
            {
                for (i = 0; i < node.children.length; ++i)
                {
                    find_best_fit(node.children[i],
                                  position, best_fit);
                }
            }
            else
            {
                if (position.x >= node.min_x &&
                    position.x <= node.max_x &&
                    position.y >= node.min_y &&
                    position.y <= node.max_y)
                {
                    var minkowski_distance =
                        Math.abs(node.centroid_x - position.x) +
                        Math.abs(node.centroid_y - position.y);
                    if (minkowski_distance < best_fit.distance)
                    {
                        best_fit.symbol   = node;
                        best_fit.distance = minkowski_distance;
                    }
                }
                
                for (i in node.children)
                {
                    find_best_fit(node.children[i],
                                  position, best_fit);
                }
            }
        }
        function symbols_inside(path)
        {
            return collect_symbols_inside(path, self, []);
        }
        function collect_symbols_inside(path, node, nodes)
        {
            var i;
            if (node.is_region())
            {
                for (i = 0; i < node.children.length; ++i)
                {
                    collect_symbols_inside(path, node.children[i],
                                           nodes);
                }
            }
            else
            {
                if (path.contains(node.centroid_x, node.centroid_y))
                {
                    nodes.push(node);
                }
                
                for (i in node.children)
                {
                    collect_symbols_inside(path, node.children[i],
                                           nodes);
                }
            }
            
            return nodes;
        }
    }
    BSTNode.labels = ["NULL", "ABOVE", "BELOW", "SUPER", "SUBSC",
                      "UPPER", "LOWER", "TLEFT", "BLEFT",
                      "CONTAINS", "EXPRESSION"];
    for (var i = 0; i < BSTNode.labels.length; ++i)
    {
        BSTNode.labels[BSTNode.labels[i]] = i;
    }
    BSTNode.FRACTION_BAR   = 1;
    BSTNode.DIGIT          = 2;
    BSTNode.NON_SCRIPTED   = 3;
    BSTNode.OPEN_BRACKET   = 4;
    BSTNode.ROOT           = 5;
    BSTNode.VARIABLE_RANGE = 6;
    BSTNode.CENTERED       = 7;
    // Additional node types not defined in DRACULAE:
    BSTNode.INTEGER        = 8;
    BSTNode.REAL           = 9;
    BSTNode.FUNCTION       = 10;
    BSTNode.CLOSE_BRACKET  = 11;
    BSTNode.BRACKETED      = 12
    
    function get_symbols()
    {
        var nodes = [];
        var node = formula.firstChild;
        while (node)
        {
            if (is_item(node)) nodes.push(new BSTNode(node));
            node = node.nextSibling;
        }
        
        return nodes;
    }
    
    var tree;
    function update()
    {
        tree = new BSTNode();
        var symbols = get_symbols();
        symbols.sort(function (a,b) { return(a.min_x-b.min_x); });
        var i;
        for (i = 0; i < symbols.length; ++i)
        {
            if (!symbols[i].node.hasAttribute("stretch"))
            {
                symbols[i].node.style.MozTransform = "scale(1.0)";
                symbols[i].node.style.webkitTransform = "scale(1.0)";
            }
            tree.insert(symbols[i]);
        }
    }
    
    function get_expression(formats)
    {
        if (!tree) update();
        
        var om, english_text;
        var expression = {};
        for (var i = 0; i < formats.length; ++i)
        {
            var format = formats[i];
            switch (format)
            {
            case "pmml":
                try       { expression[format] = to_MathML(tree); }
                catch (e) { expression[format] = e.toString();    }
                break;
            case "openmath":
                try       { if (!om) om = to_OpenMath(tree); }
                catch (e) { expression[format] = String(e);  }
                if (om) expression[format] = om;
                break;
            case "bst":
                try       { expression[format] = tree;         }
                catch (e) { expression[format] = e.toString(); }
                break;
            case "text":
                try
                {
                    expression[format] = [];
                    if (!om) om = to_OpenMath(tree);
                    for (var n = 0; n < om.length; ++n)
                    {
                        english_text = om_to_english(om[n]);
                        expression[format].push(english_text);
                    }
                }
                catch (e) { expression[format] = e.toString(); }
                break;
            case "voice":
                try
                {
                    if (!om) om = to_OpenMath(tree);
                    if (!english_text) english_text = om_to_english(om[0]);
                    expression[format] = new Voice();
                    expression.voice.prepare(english_text);
                }
                catch (e) { expression[format] = e.toString(); }
            };
        }
        
        update();// Restore tree after combining symbols.
        
        return expression;
    }
    
    function combine_symbols(symbols)
    {
        var i = 0;
        while (i < symbols.length)
        {
            var previous, next;
            var child = symbols[i];
            if (BSTNode.DIGIT == child.symbol_class
                && previous
                && (previous.symbol_class == BSTNode.DIGIT
                    || previous.symbol_class == BSTNode.INTEGER
                    || previous.symbol_class == BSTNode.REAL)
               )
            {
                previous.merge(child);
                if (BSTNode.DIGIT == previous.symbol_class)
                {
                    previous.symbol_class = BSTNode.INTEGER;
                }
                symbols.splice(i, 1);
            }
            else if (("," == child.label || "." == child.label)
                     && previous
                     && (previous.symbol_class == BSTNode.DIGIT
                         || previous.symbol_class == BSTNode.INTEGER)
                     && i+1 < symbols.length && (next = symbols[i+1])
                     && next.symbol_class == BSTNode.DIGIT
                     && next.min_x - child.max_x < previous.width)
            {
                previous.merge(child);
                previous.symbol_class = BSTNode.REAL;
                symbols.splice(i, 1);
            }
            else
            {
                previous = child;
                ++i;
            }   
        }
    }
    
    /////////////////////////////////////////////////////////////////
    // MathML translation
    
    var ns_MathML = "http://www.w3.org/1998/Math/MathML";
    function create_mathml_element(name)
    {
        return document.createElementNS(ns_MathML, name);
    }
    function to_MathML(bst_node)
    {
        var nodes;
        var i;
        if (!bst_node)
        {
            nodes.push(create_mathml_element("merror"));
            set_text(nodes[nodes.length-1], "no bst_node");
        }
        else if (bst_node.is_region())
        {
            var math_nodes = [], last_math_node;
            var previous, digits;
            for (i = 0; i < bst_node.children.length; ++i)
            {
                var child = bst_node.children[i];
                if (("," == child.label || "." == child.label)
                    && previous
                    && previous.symbol_class == BSTNode.DIGIT)
                {
                    last_math_node = math_nodes[math_nodes.length-1];
                    if (last_math_node.nodeName == "mn")
                    {
                        append_text(last_math_node, ".");
                        continue;// Do not update previous
                    }
                }
                else if (previous
                         && previous.symbol_class == BSTNode.DIGIT
                         && previous.symbol_class == child.symbol_class
                        )
                {
                    last_math_node = math_nodes[math_nodes.length-1];
                    if (last_math_node.nodeName == "mn")
                    {
                        append_text(last_math_node, child.label);
                    }
                }
                else
                {
                    math_nodes = math_nodes.concat
                    (to_MathML(bst_node.children[i]));
                }
                previous = child;
            }
            if (BSTNode.labels.EXPRESSION == bst_node.label)
            {
                var math = create_mathml_element("math");
                for (i = 0; i < math_nodes.length; ++i)
                {
                    math.appendChild(math_nodes[i]);
                }
                nodes = [math];
            }
            else
            {
                nodes = math_nodes;
            }
        }
        else if (bst_node.is_symbol())
        {
            var mathml;
            switch (bst_node.symbol_class)
            {
            case BSTNode.DIGIT:
                mathml = create_mathml_element("mn");
                break;
            case BSTNode.CENTERED:
                mathml = create_mathml_element("mi");
                break;
            case BSTNode.FRACTION_BAR:
            case BSTNode.NON_SCRIPTED:
            case BSTNode.ROOT:
            case BSTNode.VARIABLE_RANGE:
                mathml = create_mathml_element("mo");
                break;
            case BSTNode.BRACKETED:
                mathml = create_mathml_element("mfenced");
                break;
            case BSTNode.OPEN_BRACKET:
            case BSTNode.CLOSE_BRACKET:
                return [];
                break;
            default:
                alert("Error: unhandled symbol class "
                      + bst_node.symbol_class
                      + " for " + bst_node.label);
                return nodes;
            }
            set_text(mathml, bst_node.label);
            var r_contains, r_super, r_subsc, r_above, r_below;
            r_contains = bst_node.children[BSTNode.labels.CONTAINS];
            r_super = bst_node.children[BSTNode.labels.SUPER];
            r_subsc = bst_node.children[BSTNode.labels.SUBSC];
            r_above = bst_node.children[BSTNode.labels.ABOVE];
            r_below = bst_node.children[BSTNode.labels.BELOW];
            if (bst_node.symbol_class == BSTNode.BRACKETED
                && r_contains && r_contains.children.length)
            {
                set_text(mathml, "");
                mathml.appendChild(mrow(to_MathML(r_contains)));
            }
            if (bst_node.symbol_class == BSTNode.FRACTION_BAR
                && r_above && r_above.children.length
                && r_below && r_below.children.length)
            {
                var mfrac = create_mathml_element("mfrac");
                mfrac.appendChild(mrow(to_MathML(r_above)));
                mfrac.appendChild(mrow(to_MathML(r_below)));
                mathml = mfrac;
            }
            if (r_super && r_super.children.length)
            {
                var msup = create_mathml_element("msup");
                msup.appendChild(mathml);
                msup.appendChild(mrow(to_MathML(r_super)));
                mathml = msup;
            }
            if (r_subsc && r_subsc.children.length)
            {
                var msub = create_mathml_element("msub");
                msub.appendChild(mathml);
                msub.appendChild(mrow(to_MathML(r_subsc)));
                mathml = msub;
            }
            if (mathml) nodes = [mathml];
            else        nodes = [];
        }
        else
        {
            // Error
            alert("to_MathML(): Unkown bst_node type: " + bst_node);
        }
        
        return nodes;
    }
    function mrow(nodes)
    {
        var mrow;
        if (1 == nodes.length)
        {
            mrow = nodes[0];
        }
        else
        {
            mrow = create_mathml_element("mrow");
            for (var i = 0; i < nodes.length; ++i)
            {
                mrow.appendChild(nodes[i]);
            }
        }
        
        return mrow;
    }
    
    /////////////////////////////////////////////////////////////////
    // OpenMath translation
    
    var ns_OpenMath = "http://www.openmath.org/OpenMath";
    var openmath_symbols =
        {
            "+": ["arith1","plus"], "-": ["arith1","minus"],
            "×": ["arith1","times"], "·": ["arith1","times"],
            "÷": ["arith1","divide"], "/": ["arith1","divide"],
            "—": ["arith1","divide"],
            "=": ["relation1","eq"],
            ">": ["relation1","gt"], "<": ["relation1","lt"],
            "!": ["nums1","factorial"],
            "π": ["nums1","pi"]
        };
    var operators =
        {
            // cd:name [precedence, arity_postfix, arity_prefix, right_assoc]
            "arith1":
            {"plus" : [10, 1, 1, false],  "minus": [10, 1, 1, false],
             "times": [20, 1, 1, false], "divide": [20, 1, 1, false]},
            "nums1":
            {"factorial": [30, 1, 0, true]},
            "relation1":
            {"eq": [5, 1, 1, false],
             "gt": [5, 1, 1, false], "lt": [5, 1, 1, false]},
            "matracas.org":
            {"mixed-number": [100, 1, 1, false]}
        };
    function OM(element_name)
    {
        return document.createElementNS(ns_OpenMath, element_name);
    }
    function OMI(digits)
    {
        var node = OM("OMI");
        node.appendChild(document.createTextNode(digits));
        return node;
    }
    function OMF(digits)
    {
        var node = OM("OMF");
        node.setAttribute("dec", digits);
        return node;
    }
    function OMV(name)
    {
        var node = OM("OMV");
        node.setAttribute("name", name);
        return node;
    }
    function OMS(cd, name)
    {
        var node = OM("OMS");
        node.setAttribute("cd",   cd);
        node.setAttribute("name", name);
        return node;
    }
    function om_cd(node)   { return node.getAttribute("cd");   }
    function om_name(node) { return node.getAttribute("name"); }
    
    function OMSTRING(text)
    {
        var node = OM("OMSTRING");
        node.appendChild(document.createTextNode(text));
        return node;
    }
    function OME(description)
    {
        var node = OM("OME");
        node.appendChild(OMS("error", "runtime"));
        node.appendChild(OMSTRING(description));
        return node;
    }
    function parse_operators(math_nodes)
    {
        var operator_stack = [];
        var argument_stack = [];
        var last_operator_precedence = 0;
        var last_node_was_argument = false;
        var i, j;
        i = 0;
        while (i <= math_nodes.length)
        {
            var node, op;
            op = null;
            if (i < math_nodes.length)
            {
                node = math_nodes[i];
                if ("OMS" == node.localName)
                {
                    op = operators[om_cd(node)][om_name(node)];
                }
            }
            else
            {
                node = null;
                op = [0,0,0,false];// EOF
            }
            if (!op && last_node_was_argument)
            {
                // This is the operator when two objects are juxtaposed.
                if (math_nodes[i-1].localName == "OMI"
                    && node.localName == "OMA" && node.firstChild
                    && "nums1"    == om_cd(node.firstChild)
                    && "rational" == om_name(node.firstChild))
                {
                    node = OMS("matracas.org", "mixed-number");
                    op = operators["matracas.org"]["mixed-number"];
                    --i;
                }
                else
                {
                    node = OMS("arith1", "times");
                    op = operators["arith1"]["times"];
                    --i;
                }
            }
            ++i;
            
            if (!op)
            {
                last_node_was_argument = true;
                argument_stack.push(node);
            }
            while (op)
            {
                last_node_was_argument = false;
                var application;
                var right_assoc = op[3];
                if (op[0] > last_operator_precedence
                    || (op[0] == last_operator_precedence
                        && right_assoc)
                    || operator_stack.length < 1)
                {
                    // Shift:
                    if (node) operator_stack.push({"node":node,
                                                   "op":op});
                    last_operator_precedence = op[0];
                    op = null;
                }
                else
                {
                    // Reduce:
                    var last = operator_stack.pop();
                    application = OM("OMA");
                    application.appendChild(last.node);
                    var begin = (argument_stack.length
                                 - last.op[2] - last.op[1]);
                    if (begin < 0) begin = 0;// Error: missing arguments
                    for (j = begin; j < argument_stack.length; ++j)
                    {
                        application.appendChild(argument_stack[j]);
                    }
                    argument_stack
                        .splice(begin,
                                argument_stack.length - begin,
                                application);
                    if (operator_stack.length > 0)
                    {
                        last = operator_stack[operator_stack.length - 1];
                        last_operator_precedence = last.op[0];
                    }
                    else
                    {
                        last_operator_precedence = 0;
                    }
                }
            }
        }
        
        return argument_stack;
    }
    function to_OpenMath(bst_node)
    {
        var nodes;
        var i;
        if (!bst_node)
        {
            nodes = [OME("no bst_node")];
        }
        else if (bst_node.is_region())
        {
            var math_nodes = [];
            combine_symbols(bst_node.children);
            for (i = 0; i < bst_node.children.length; ++i)
            {
                var child = bst_node.children[i];
                math_nodes = math_nodes.concat(to_OpenMath(child));
            }
            try
            {
                math_nodes = parse_operators(math_nodes, omobj);
            }
            catch (e)
            {
                // TODO: better error reporting
                math_nodes.push(OME("Syntax error: " + e));
            }
            if (BSTNode.labels.EXPRESSION == bst_node.label)
            {
                var omobj = OM("OMOBJ");
                for (i = 0; i < math_nodes.length; ++i)
                {
                    omobj.appendChild(math_nodes[i]);
                }
                nodes = [omobj];
            }
            else
            {
                nodes = math_nodes;
            }
        }
        else if (bst_node.is_symbol())
        {
            var om, om_cd_name;
            switch (bst_node.symbol_class)
            {
            case BSTNode.DIGIT:
            case BSTNode.INTEGER:
                om = OMI(bst_node.label);
                break;
            case BSTNode.REAL:
                om = OMF(bst_node.label.replace(/[,]/, "."));
                break;
            case BSTNode.CENTERED:
                om_cd_name = openmath_symbols[bst_node.label];
                if (om_cd_name) om = OMS(om_cd_name[0], om_cd_name[1]);
                else            om = OMV(bst_node.label);
                break;
            case BSTNode.FRACTION_BAR:
            case BSTNode.NON_SCRIPTED:
            case BSTNode.ROOT:
            case BSTNode.VARIABLE_RANGE:
            case BSTNode.FUNCTION:
                om_cd_name = openmath_symbols[bst_node.label];
                if (om_cd_name) om = OMS(om_cd_name[0], om_cd_name[1]);
                else            om = OMS("", bst_node.label);
                break;
            case BSTNode.BRACKETED:
                om = null;
                break;
            case BSTNode.OPEN_BRACKET:
            case BSTNode.CLOSE_BRACKET:
                return [];
                break;
            default:
                alert("Error: unhandled symbol class "
                      + bst_node.symbol_class
                      + " for " + bst_node.label);
                // At this point, nodes is undefined. Return that.
                return nodes;
            }
            var r_contains, r_super, r_subsc, r_above, r_below;
            r_contains = bst_node.children[BSTNode.labels.CONTAINS];
            r_super = bst_node.children[BSTNode.labels.SUPER];
            r_subsc = bst_node.children[BSTNode.labels.SUBSC];
            r_above = bst_node.children[BSTNode.labels.ABOVE];
            r_below = bst_node.children[BSTNode.labels.BELOW];
            var application, argument;
            if (bst_node.symbol_class == BSTNode.BRACKETED
                && r_contains && r_contains.children.length)
            {
                om = to_OpenMath(r_contains)[0];
            }
            if (r_subsc && r_subsc.children.length)
            {
                application = OM("OMA");
                application.appendChild(OMS("algebra1",
                                            "vector_selector"));
                application.appendChild(om);
                application.appendChild(to_OpenMath(r_subsc)[0]);
                om = application;
            }
            if (bst_node.symbol_class == BSTNode.FRACTION_BAR
                && r_above && r_above.children.length
                && r_below && r_below.children.length)
            {
                var numerator, denominator;
                numerator   = to_OpenMath(r_above)[0];
                denominator = to_OpenMath(r_below)[0];
                if (numerator.localName == "OMI"
                    && denominator.localName == "OMI")
                {
                    application = OM("OMA");
                    application.appendChild(OMS("nums1",
                                                "rational"));
                    application.appendChild(numerator);
                    application.appendChild(denominator);
                }
                else
                {
                    application = OM("OMA");
                    application.appendChild(om);
                    application.appendChild(numerator);
                    application.appendChild(denominator);
                }
                om = application;
            }
            if (r_super && r_super.children.length)
            {
                application = OM("OMA");
                application.appendChild(OMS("arith1", "power"));
                application.appendChild(om);
                application.appendChild(to_OpenMath(r_super)[0]);
                om = application;
            }
            if (om) nodes = [om];
            else    nodes = [];
        }
        else
        {
            // Error
            alert("to_OpenMath(): Unkown bst_node type: " + bst_node);
            nodes = [];
        }
        
        return nodes;
    }
    

    // Reference materials:
    // Mathematical Markup Language (MathML) Version 2.0
    // http://www.w3.org/TR/MathML/
    // Gecko DOM Reference:
    // https://developer.mozilla.org/en/Gecko_DOM_Reference
    // TouchEvent Class Reference:
    // http://developer.apple.com/library/safari/#documentation/
    //        UserExperience/Reference/TouchEventClassReference/
    //        TouchEvent/TouchEvent.html
    
    
    // Constructor:
    insert_handles();
    
    viewport.style.position = "relative";
    formula.setAttribute("tabindex", "0");
    
    formula.style.position = "absolute";
    formula.style.left = "0";
    formula.style.right = "0";
    formula.style.top = "0";
    formula.style.bottom = "0";
    disable_selection(formula);
    standard_addEventListener(viewport);
    standard_addEventListener(formula);
    viewport.addEventListener("mousedown",     mousedown,     false);
    viewport.addEventListener("mousemove",     mousemove,     false);
    viewport.addEventListener("mouseup",       mouseup,       false);
    viewport.addEventListener("keypress",      keypress,      false);
    viewport.addEventListener("keydown",       keydown,       false);
    formula.addEventListener("focus",         focus,         false);
    formula.addEventListener("blur",          blur,          false);
    viewport.addEventListener("touchstart",    touchstart,    false);
    viewport.addEventListener("touchmove",     touchmove,     false);
    viewport.addEventListener("touchend",      touchend,      false);
    viewport.addEventListener("gesturestart",  gesturestart,  false);
    viewport.addEventListener("gesturechange", gesturechange, false);
    viewport.addEventListener("gestureend",    gestureend,    false);
    viewport.addEventListener("focus",
                              function () { formula.focus(); },
                              false);
    viewport.addEventListener("blur",
                              function () { formula.blur();  },
                              false);
    formula.style.cursor = "text";
    caret_blink(false);
}
