(function() {
  this.screenPicker = (function() {
    function screenPicker(options) {
      var ref, ref1;
      if (options == null) {
        options = {};
      }
      $.screenarea.iconSize = (ref = options.iconSize) != null ? ref : 25;
      $.screenarea.assetsPath = (ref1 = options.assetsPath) != null ? ref1 : '';
      this.generatescreenIconSets(options);
      if (!options.screenable_selector) {
        options.screenable_selector = '[data-screenable=true]';
      }
      this.options = options;
    }

    screenPicker.prototype.discover = function() {
      var isiOS;
      isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isiOS) {
        return;
      }
      return $(this.options.screenable_selector).screenarea($.extend({
        screenPopup: this,
        norealTime: true
      }, this.options));
    };

    screenPicker.prototype.generatescreenIconSets = function(options) {
      var column, dataItem, hex, i, icons, j, name, reverseIcons, row, totalColumns;
      icons = {};
      reverseIcons = {};
      i = void 0;
      j = void 0;
      hex = void 0;
      name = void 0;
      dataItem = void 0;
      row = void 0;
      column = void 0;
      totalColumns = void 0;
      j = 0;
      while (j < Config.screenCategories.length) {
        totalColumns = Config.screenCategorySpritesheetDimens[j][1];
        i = 0;
        while (i < Config.screenCategories[j].length) {
          dataItem = Config.screen[Config.screenCategories[j][i]];
          name = dataItem[1][0];
          row = Math.floor(i / totalColumns);
          column = i % totalColumns;
          icons[':' + name + ':'] = [j, row, column, ':' + name + ':'];
          reverseIcons[name] = dataItem[0];
          i++;
        }
        j++;
      }
      $.screenarea.icons = icons;
      return $.screenarea.reverseIcons = reverseIcons;
    };

    screenPicker.prototype.colonToUnicode = function(input) {
      if (!input) {
        return '';
      }
      if (!Config.rx_colons) {
        Config.init_unified();
      }
      return input.replace(Config.rx_colons, function(m) {
        var val;
        val = Config.mapcolon[m];
        if (val) {
          return val;
        } else {
          return '';
        }
      });
    };

    screenPicker.prototype.appendUnicodeAsImageToElement = function(element, input) {
      var k, len, split_on_unicode, text, val;
      if (!input) {
        return '';
      }
      if (!Config.rx_codes) {
        Config.init_unified();
      }
      split_on_unicode = input.split(Config.rx_codes);
      for (k = 0, len = split_on_unicode.length; k < len; k++) {
        text = split_on_unicode[k];
        val = '';
        if (Config.rx_codes.test(text)) {
          val = Config.reversemap[text];
          if (val) {
            val = ':' + val + ':';
            val = $.screenarea.createIcon($.screenarea.icons[val]);
          }
        } else {
          val = document.createTextNode(text);
        }
        element.append(val);
      }
      return input.replace(Config.rx_codes, function(m) {
        var $img;
        val = Config.reversemap[m];
        if (val) {
          val = ':' + val + ':';
          $img = $.screenarea.createIcon($.screenarea.icons[val]);
          return $img;
        } else {
          return '';
        }
      });
    };

    screenPicker.prototype.colonToImage = function(input) {
      if (!input) {
        return '';
      }
      if (!Config.rx_colons) {
        Config.init_unified();
      }
      return input.replace(Config.rx_colons, function(m) {
        var $img;
        if (m) {
          $img = $.screenarea.createIcon($.screenarea.icons[m]);
          return $img;
        } else {
          return '';
        }
      });
    };

    return screenPicker;

  })();

}).call(this);
