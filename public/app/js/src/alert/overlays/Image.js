/**
 * Image overlay plugin
 * This js code depends on styles/chatroom/image-overlay.less stylesheet
 */

class Image {
    constructor(src){
        this._src = src
        this._width = null
    }

    /**
     * Show the image overlay
     */
    show(){

        // Check to see if #image-overlay already exists
        if(document.getElementById("image-overlay")){
            throw "Image overlay already exists";
        }

        let container = document.createElement("div");
        container.classList.add('img-overlay-container');
        container.setAttribute("id", "image-overlay");
        let backdrop = document.createElement("div");
        backdrop.classList.add('backdrop');
        let image = document.createElement("img");
        image.setAttribute("src", this._src);
        image.classList.add('image-body');

        let controls = document.createElement("div");
        controls.classList.add('controls-bar');

        let closeButton = document.createElement('div');
        closeButton.onclick = function(e){
            let element = document.getElementById("image-overlay");
            element.outerHTML = "";
        };
        closeButton.innerHTML = "<span class=\"typcn typcn-delete\"></span>";
        closeButton.classList.add('control-button');

        let zoomInButton = document.createElement('div');
        zoomInButton.onclick = function(e){
            // Make the image larger
            image.setAttribute("style", "width: " + image.width * 1.1 + "px;");
        };

        zoomInButton.innerHTML = "<span class=\"typcn typcn-zoom-in-outline\"></span>";
        zoomInButton.classList.add('control-button');

        let zoomOutButton = document.createElement('div');
        zoomOutButton.onclick = function(e){
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
}

module.exports = Image;