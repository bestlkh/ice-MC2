'use strict';

var BasicControl = require('./controls/BasicControl');
var Toolbar = require('./controls/Toolbar');
var Cursor = require('./misc/Cursor');

var BubbleMenu = require('./controls/BubbleMenu');
var BubbleMenuButton = require('./controls/BubbleMenuButton');
var ChatInput = require('./controls/ChatInput');

window.UI = {
    Toolbar: Toolbar,
    BasicControl: BasicControl,
    Cursor: Cursor,
    BubbleMenu: BubbleMenu,
    BubbleMenuButton: BubbleMenuButton,
    ChatInput: ChatInput
};