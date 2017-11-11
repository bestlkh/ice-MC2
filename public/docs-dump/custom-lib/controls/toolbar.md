# ui.Toolbar

Toolbar with no styling, the html markup looks like the following:

```html
<Toolbar>
    <ToolbarButton></ToolbarButton>
    <ToolbarButton></ToolbarButton>
    ...
</Toolbar>
```

## Properties

### `dom` [public]

The dom element this control is attatched to.

### `_buttons` [private, ToolbarButton[]]

Array of ToolbarButton attatched to this instance.

## Methods

### `constructor(dom)`

The constructor for Toolbar class.

```js
let toolbar = new ui.Toolbar($("#dom"));
```

### `addButton(config)`

Add a new ToolbarButton to this instance.

