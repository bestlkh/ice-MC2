# UI.BasicControl

/ [Home](../../../) / [UI Library](../overview) / UI.BasicControl

??? "Authors"
    Jun Zheng (junthehacker)

Basic control class, this is the parent class for most controls.

Mostly useless by itself.

## Properties

### `#!js public dom`

The dom element this control is attatched to.

### `#!js private boolean get set _visible`

The visibility state of the control.
When using the setter, it will automatically run jQuery show or hide method on dom.

### `#!js private boolean get set _preventDefaultClick`

If true, onClick event will prevent system default click event.

### `#!js private EventEmitter _onClickEmitter`

onClick event emitter instance.


## Methods

### `#!js constructor(dom)`

The constructor for BasicControl class.

```js
let control = new ui.BasicControl($("#dom"));
```

### `#!js set onClick(func)`

Set onClick event handler, you can set multiple handlers, they will be fired in order.

```js
control.onClick = function(e){
    console.log("Clicked!");
}
```


