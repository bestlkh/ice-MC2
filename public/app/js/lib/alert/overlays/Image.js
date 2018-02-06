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
        this._width = null;
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
            closeButton.innerHTML = "<span class=\"typcn typcn-delete\"></span>";
            closeButton.classList.add('control-button');

            var zoomInButton = document.createElement('div');
            zoomInButton.onclick = function (e) {
                // Make the image larger
                image.setAttribute("style", "width: " + image.width * 1.1 + "px;");
            };

            zoomInButton.innerHTML = "<span class=\"typcn typcn-zoom-in-outline\"></span>";
            zoomInButton.classList.add('control-button');

            var zoomOutButton = document.createElement('div');
            zoomOutButton.onclick = function (e) {
                // Make the image smaller
                image.setAttribute("style", "width: " + image.width * 0.9 + "px;");
            };
            zoomOutButton.innerHTML = "<span class=\"typcn typcn-zoom-out-outline\"></span>";
            zoomOutButton.classList.add('control-button');

            controls.appendChild(zoomInButton);
            controls.appendChild(zoomOutButton);
            controls.appendChild(closeButton);

            document.body.appendChild(container);
            container.appendChild(backdrop);
            container.appendChild(image);
            container.appendChild(controls);

            this._width = image.width;
        }
    }]);

    return Image;
}();

module.exports = Image;