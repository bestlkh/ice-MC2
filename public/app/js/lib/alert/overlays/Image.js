"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Image overlay plugin
 * This js code depends on styles/chatroom/image-overlay.less stylesheet
 */

var Image = function () {
    function Image(src) {
        _classCallCheck(this, Image);

        this._src = src;
    }

    /**
     * Show the image overlay
     */


    _createClass(Image, [{
        key: "show",
        value: function show() {

            // Check to see if #image-overlay already exists
            if (document.getElementById("image-overlay")) {
                throw "Image overlay already exists";
            }

            var container = document.createElement("div");
            container.classList.add('img-overlay-container');
            container.setAttribute("id", "image-overlay");
            var backdrop = document.createElement("div");
            backdrop.classList.add('backdrop');
            var image = document.createElement("img");
            image.setAttribute("src", this._src);
            image.classList.add('image-body');

            var controls = document.createElement("div");
            controls.classList.add('controls-bar');

            var closeButton = document.createElement('div');
            closeButton.onclick = function (e) {
                var element = document.getElementById("image-overlay");
                element.outerHTML = "";
            };
            closeButton.innerHTML = "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>";
            closeButton.classList.add('control-button');

            controls.appendChild(closeButton);

            document.body.appendChild(container);
            container.appendChild(backdrop);
            container.appendChild(image);
            container.appendChild(controls);
        }
    }]);

    return Image;
}();

module.exports = Image;