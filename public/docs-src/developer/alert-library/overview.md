# Alert Library Overview

/ [Home](../../) / Alert Library

??? "Authors"
    Jun Zheng (junthehacker)

??? "Dependencies"
    Alertify.js CSS Theme
    
    Alertify is bundled with this plugin.
    
Alert library provides some alert functionality that extends the default `alert` and `prompt`.

Alert library is loaded in `index.html` by default, but you can simply link the `alert.bundle.js` to include in your page. All classes are attatched to `window.Alert`.

## Get Started

### Display Alert

```javascript
var my_alert = new Alert.Alert("Title", "Message", function(){
   // What happens if user press ok. 
});
my_alert.show();
```

### Display Alert Without `new`

```javascript
Alert.Alert.spawn("Title", "Message", function(){
   // What happens if user press ok 
});
```

Notifications are the same, just use `Alert.Notification`, for more information, checkout the detailed class doc.

## Classes

### Dialogs

* [Alert](dialogs/alert)

### Overlays

* [Notification](overlays/notification)