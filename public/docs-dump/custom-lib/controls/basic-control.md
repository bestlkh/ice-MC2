# ui.BasicControl

Basic control class, this is the parent class for most controls.

Mostly useless by itself.

## Properties

### `dom` [public]

The dom element this control is attatched to.

### `_visible` [private, boolean, get, set]

The visibility state of the control.
When using the setter, it will automatically run jQuery show or hide method on dom.

### `_preventDefaultClick` [private, boolean, get, set]

If true, onClick event will prevent system default click event.

### `_onClickEmitter` [private, EventEmitter]

onClick event emitter instance.


## Methods

### `constructor(dom)`

The constructor for BasicControl class.

```js
let control = new ui.BasicControl($("#dom"));
```

### `set onClick(func)`

Set onClick event handler, you can set multiple handlers, they will be fired in order.

```js
control.onClick = function(e){
    console.log("Clicked!");
}
```


