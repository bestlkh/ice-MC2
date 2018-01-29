let Alert = require('./dialogs/Alert');
let Confirm = require('./dialogs/Confirm');
let Notification = require('./overlays/Notification');
let Image = require('./overlays/Image');


window.Alert = {
    Alert: Alert,
    Confirm: Confirm,
    Notification: Notification,
    Image: Image
};