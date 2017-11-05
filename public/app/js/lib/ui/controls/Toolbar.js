'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToolbarButton = require('./ToolbarButton');

var Toolbar = function () {
    function Toolbar(dom) {
        _classCallCheck(this, Toolbar);

        this.dom = dom;
        this._buttons = [];
    }

    /**
     * Read only buttons attribute
     * @returns {Array}
     */


    _createClass(Toolbar, [{
        key: 'addButton',


        /**
         * Add a new button to toolbar
         * @param config
         */
        value: function addButton(config) {
            var button = new ToolbarButton($(this._getToolButtonMarkup(config)));
            this._buttons.push(button);
            this.dom.append(button.dom);
        }

        /**
         * Get a toolbar button by id
         * @param id
         * @returns {*}
         */

    }, {
        key: 'getButtonById',
        value: function getButtonById(id) {
            for (var i = 0; i < this._buttons.length; i++) {
                if (this._buttons[i].dom.attr('id') === id) {
                    return this.buttons[i];
                }
            }
        }

        /**
         * Get tool button markup, you can always override this.
         * @param config
         * @returns {string}
         * @private
         */

    }, {
        key: '_getToolButtonMarkup',
        value: function _getToolButtonMarkup(config) {
            return "<div toolbar-button>" + config.innerContent + "</div>";
        }
    }, {
        key: 'buttons',
        get: function get() {
            return this._buttons;
        }
    }]);

    return Toolbar;
}();

module.exports = Toolbar;