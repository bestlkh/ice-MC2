/**
 * Image overlay plugin
 * This js code depends on styles/chatroom/image-overlay.less stylesheet
 */

class Image {
    constructor(src){
        this._src = src
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
        closeButton.innerHTML = "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>";
        closeButton.classList.add('control-button');

        controls.appendChild(closeButton);

        document.body.appendChild(container);
        container.appendChild(backdrop);
        container.appendChild(image);
        container.appendChild(controls);
    }
}

module.exports = Image;