# Alert.Notification

/ [Home](../../../) / [Alert Library](../overview) / Alert.Notification

??? "Authors"
    Jun Zheng (junthehacker)

Notification badge class.

![](../../images/notification.png)

## Properties

### `#!js public message`

Notification message.

### `#!js public type`

The type of notification.

### `#!js public delay`

Time in seconds until the notification is dismissed.

### `#!js public callback`

Callback function message is dismissed.

## Methods

### `#!js constructor(message, type, delay, callback)`

The constructor. `type`, `delay` and `callback` are optional.

```javascript
var my_notification = new Alert.Notification("message", "success", 5, function(){
    // Code here
});
```

### `#!js show()`

Show the notification instance.

### `#!js static spawn(message, type, delay, callback)`

Spawn a anonymous notification instance.

The usage is same as constructor, this method does not return anything.

