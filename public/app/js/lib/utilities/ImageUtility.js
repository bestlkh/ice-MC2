'use strict';

var EXIF = require('exif-js');

function _getFileOrientation(file, callback) {
    var orientation = null;
    EXIF.getData(file, function () {
        EXIF.getAllTags(this);
        orientation = EXIF.getTag(this, 'Orientation');
        callback(orientation);
    });
}

function _rotateImage(img, direction, canvas) {
    // Minimum / maximum rotate times
    var min_step = 0;
    var max_step = 3;
    if (img == null) return;

    var height = img.height;
    var width = img.width;

    var step = 2;
    if (step == null) {
        step = min_step;
    }

    if (direction == 'right') {
        step++;
        step > max_step && (step = min_step);
    } else {
        step--;
        step < min_step && (step = max_step);
    }
    var degree = step * 90 * Math.PI / 180;
    var ctx = canvas.getContext('2d');
    switch (step) {
        case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
        case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
        case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
        case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
    }
}

function iOSOrientationAutoFix(file, callback) {

    _getFileOrientation(file, function (oritentation) {
        var fr = new FileReader();
        fr.readAsDataURL(file);

        fr.addEventListener("load", function () {
            var url = fr.result;
            var img = new Image();
            img.src = url;
            img.onload = function () {

                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);

                if (navigator.userAgent.match(/iphone/i)) {
                    // We fix iphone
                    if (oritentation != "" && oritentation != 1) {
                        switch (oritentation) {
                            case 6:
                                _rotateImage(img, 'left', canvas);
                                break;
                            case 8:
                                _rotateImage(img, 'right', canvas);
                                break;
                            case 3:
                                _rotateImage(img, 'left', canvas);
                                _rotateImage(img, 'left', canvas);
                                break;
                        }
                    }
                    callback(canvas.toDataURL());
                } else {
                    callback(url);
                }
            };
        });
    });
}

module.exports = {
    iOSOrientationAutoFix: iOSOrientationAutoFix
};

window.ImageUtility = module.exports;