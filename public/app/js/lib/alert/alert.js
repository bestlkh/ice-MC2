'use strict';

var Alert = require('./dialogs/Alert');
var Confirm = require('./dialogs/Confirm');
var Notification = require('./overlays/Notification');
var Image = require('./overlays/Image');

window.Alert = {
    Alert: Alert,
    Confirm: Confirm,
    Notification: Notification,
    Image: Image
};