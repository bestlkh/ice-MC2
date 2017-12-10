let assert = require('assert');
require('./setup-dom');

describe('BubbleMenu', function(){
    describe('#constructor()', function(){
        let BubbleMenu;

        before(function () {
            document.body.innerHTML = "";
            BubbleMenu = require('../public/app/js/src/ui/controls/BubbleMenu');
            // Initialize the dom elements for testing
            let div = document.createElement('div');
            div.id = "bubble-menu-container";
            let menuButton = document.createElement('div');
            menuButton.id = "bubble-menu-button";
            div.appendChild(menuButton);
            let itemContainer = document.createElement('div');
            itemContainer.id = "bubble-menu-item-container";
            div.appendChild(itemContainer);
            document.body.appendChild(div);
        });

        it('should select dom element', function(){
            let menu = new BubbleMenu("#bubble-menu-container", "#bubble-menu-button", "#bubble-menu-item-container", 100);
            assert.equal('bubble-menu-container', menu.dom.attr('id'));
            assert.equal('bubble-menu-button', menu.menuButtonDom.attr('id'));
            assert.equal('bubble-menu-item-container', menu.buttonContainerDom.attr('id'));
        });

        it('should setup required private variables', function(){
            let menu = new BubbleMenu("#bubble-menu-container", "#bubble-menu-button", "#bubble-menu-item-container", 100);
            assert.deepEqual([], menu._buttons);
            assert.equal(false, menu._expanded);
            assert.deepEqual([], menu._animations);
        });

        it('should initialize animationSpeed if nothing specified', function(){
            let menu = new BubbleMenu("#bubble-menu-container", "#bubble-menu-button", "#bubble-menu-item-container");
            assert.equal(50, menu.animationSpeed);
        });

        it('should set animationSpeed if it is specified', function(){
            let menu = new BubbleMenu("#bubble-menu-container", "#bubble-menu-button", "#bubble-menu-item-container", 100);
            assert.equal(100, menu.animationSpeed);
        });
    });

    describe('#get buttons()', function(){
        let BubbleMenu;

        before(function () {
            document.body.innerHTML = "";
            BubbleMenu = require('../public/app/js/src/ui/controls/BubbleMenu');
            // Initialize the dom elements for testing
            let div = document.createElement('div');
            div.id = "bubble-menu-container";
            let menuButton = document.createElement('div');
            menuButton.id = "bubble-menu-button";
            div.appendChild(menuButton);
            let itemContainer = document.createElement('div');
            itemContainer.id = "bubble-menu-item-container";
            div.appendChild(itemContainer);
            document.body.appendChild(div);
        });

        it('should return a list of buttons', function(){
            let menu = new BubbleMenu("#bubble-menu-container", "#bubble-menu-button", "#bubble-menu-item-container", 100);
            assert.deepEqual([], menu.buttons);
            menu._buttons.push(1);
            assert.deepEqual([1], menu.buttons);
        });
    });

    describe('#addButton()', function(){
        let BubbleMenu;

        before(function () {
            document.body.innerHTML = "";
            BubbleMenu = require('../public/app/js/src/ui/controls/BubbleMenu');
            // Initialize the dom elements for testing
            let div = document.createElement('div');
            div.id = "bubble-menu-container";
            let menuButton = document.createElement('div');
            menuButton.id = "bubble-menu-button";
            div.appendChild(menuButton);
            let itemContainer = document.createElement('div');
            itemContainer.id = "bubble-menu-item-container";
            div.appendChild(itemContainer);
            document.body.appendChild(div);
        });

        it('should add a new BubbleMenuButton', function(){
            let menu = new BubbleMenu("#bubble-menu-container", "#bubble-menu-button", "#bubble-menu-item-container", 100);
            menu.addButton({
                innerContent: "test"
            });
            assert.equal(1, menu.buttons.length);
            menu.addButton({
                innerContent: "test"
            });
            assert.equal(2, menu.buttons.length);
            assert.equal("<div bubble-menu-button=\"\">test</div><div bubble-menu-button=\"\">test</div>", menu.buttonContainerDom.html());
        });
    });

    describe('#_initializeMenuButtonEvents()', function(){
        let BubbleMenu;

        before(function () {
            document.body.innerHTML = "";
            BubbleMenu = require('../public/app/js/src/ui/controls/BubbleMenu');
            // Initialize the dom elements for testing
            let div = document.createElement('div');
            div.id = "bubble-menu-container";
            let menuButton = document.createElement('div');
            menuButton.id = "bubble-menu-button";
            div.appendChild(menuButton);
            let itemContainer = document.createElement('div');
            itemContainer.id = "bubble-menu-item-container";
            div.appendChild(itemContainer);
            document.body.appendChild(div);
        });

        it('we cannot test this method as of current date', function(){});
    });

    describe('#expand()', function(){
        let BubbleMenu;

        before(function () {
            BubbleMenu = require('../public/app/js/src/ui/controls/BubbleMenu');
        });

        it('should add ui-expanded to menuButtonDom immediately', function(){
            document.body.innerHTML = "";
            // Initialize the dom elements for testing
            let div = document.createElement('div');
            div.id = "bubble-menu-container";
            let menuButton = document.createElement('div');
            menuButton.id = "bubble-menu-button";
            div.appendChild(menuButton);
            let itemContainer = document.createElement('div');
            itemContainer.id = "bubble-menu-item-container";
            div.appendChild(itemContainer);
            document.body.appendChild(div);
            let menu = new BubbleMenu("#bubble-menu-container", "#bubble-menu-button", "#bubble-menu-item-container", 200);
            menu._getBubbleMenuButtonMarkup = function(config){
                return "<div id='" + config.id + "'>" + config.innerContent + "</div>";
            };
            menu.addButton({
                id: 'test1',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test2',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test3',
                innerContent: 'test'
            });
            menu.expand();
            assert.equal(true, menu.menuButtonDom.hasClass("ui-expanded"));
        });

        it('should populate the list of []_animations', function(){
            document.body.innerHTML = "";
            // Initialize the dom elements for testing
            let div = document.createElement('div');
            div.id = "bubble-menu-container";
            let menuButton = document.createElement('div');
            menuButton.id = "bubble-menu-button";
            div.appendChild(menuButton);
            let itemContainer = document.createElement('div');
            itemContainer.id = "bubble-menu-item-container";
            div.appendChild(itemContainer);
            document.body.appendChild(div);
            let menu = new BubbleMenu("#bubble-menu-container", "#bubble-menu-button", "#bubble-menu-item-container", 200);
            menu._getBubbleMenuButtonMarkup = function(config){
                return "<div id='" + config.id + "'>" + config.innerContent + "</div>";
            };
            menu.addButton({
                id: 'test1',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test2',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test3',
                innerContent: 'test'
            });
            menu.expand();
            assert.equal(3, menu._animations.length);
        });

        it('should set _expanded to true', function(){
            document.body.innerHTML = "";
            // Initialize the dom elements for testing
            let div = document.createElement('div');
            div.id = "bubble-menu-container";
            let menuButton = document.createElement('div');
            menuButton.id = "bubble-menu-button";
            div.appendChild(menuButton);
            let itemContainer = document.createElement('div');
            itemContainer.id = "bubble-menu-item-container";
            div.appendChild(itemContainer);
            document.body.appendChild(div);
            let menu = new BubbleMenu("#bubble-menu-container", "#bubble-menu-button", "#bubble-menu-item-container", 200);
            menu._getBubbleMenuButtonMarkup = function(config){
                return "<div id='" + config.id + "'>" + config.innerContent + "</div>";
            };
            menu.addButton({
                id: 'test1',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test2',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test3',
                innerContent: 'test'
            });
            menu.expand();
            assert.equal(true, menu._expanded);
        });

        it('should add shown class to first button but not rest after 50 milliseconds', function(done){
            document.body.innerHTML = "";
            // Initialize the dom elements for testing
            let div = document.createElement('div');
            div.id = "bubble-menu-container";
            let menuButton = document.createElement('div');
            menuButton.id = "bubble-menu-button";
            div.appendChild(menuButton);
            let itemContainer = document.createElement('div');
            itemContainer.id = "bubble-menu-item-container";
            div.appendChild(itemContainer);
            document.body.appendChild(div);
            let menu = new BubbleMenu("#bubble-menu-container", "#bubble-menu-button", "#bubble-menu-item-container", 200);
            menu._getBubbleMenuButtonMarkup = function(config){
                return "<div id='" + config.id + "'>" + config.innerContent + "</div>";
            };
            menu.addButton({
                id: 'test1',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test2',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test3',
                innerContent: 'test'
            });
            menu.expand();
            setTimeout(function(){
                assert.equal(true, menu._buttons[0].dom.hasClass("shown"));
                assert.equal(false, menu._buttons[1].dom.hasClass("shown"));
                assert.equal(false, menu._buttons[2].dom.hasClass("shown"));
                done();
            }, 50);
        });

        it('should add shown class to first two buttons but not rest after 250 milliseconds', function(done){
            document.body.innerHTML = "";
            // Initialize the dom elements for testing
            let div = document.createElement('div');
            div.id = "bubble-menu-container";
            let menuButton = document.createElement('div');
            menuButton.id = "bubble-menu-button";
            div.appendChild(menuButton);
            let itemContainer = document.createElement('div');
            itemContainer.id = "bubble-menu-item-container";
            div.appendChild(itemContainer);
            document.body.appendChild(div);
            let menu = new BubbleMenu("#bubble-menu-container", "#bubble-menu-button", "#bubble-menu-item-container", 200);
            menu._getBubbleMenuButtonMarkup = function(config){
                return "<div id='" + config.id + "'>" + config.innerContent + "</div>";
            };
            menu.addButton({
                id: 'test1',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test2',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test3',
                innerContent: 'test'
            });
            menu.expand();
            setTimeout(function(){
                assert.equal(true, menu._buttons[0].dom.hasClass("shown"));
                assert.equal(true, menu._buttons[1].dom.hasClass("shown"));
                assert.equal(false, menu._buttons[2].dom.hasClass("shown"));
                done();
            }, 250);
        });
    });

    describe('#contract()', function(){
        let BubbleMenu;

        before(function () {
            BubbleMenu = require('../public/app/js/src/ui/controls/BubbleMenu');
        });

        it('should remove ui-expanded to menuButtonDom immediately', function(){
            document.body.innerHTML = "";
            // Initialize the dom elements for testing
            let div = document.createElement('div');
            div.id = "bubble-menu-container";
            let menuButton = document.createElement('div');
            menuButton.id = "bubble-menu-button";
            div.appendChild(menuButton);
            let itemContainer = document.createElement('div');
            itemContainer.id = "bubble-menu-item-container";
            div.appendChild(itemContainer);
            document.body.appendChild(div);
            let menu = new BubbleMenu("#bubble-menu-container", "#bubble-menu-button", "#bubble-menu-item-container", 200);
            menu._getBubbleMenuButtonMarkup = function(config){
                return "<div id='" + config.id + "'>" + config.innerContent + "</div>";
            };
            menu.addButton({
                id: 'test1',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test2',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test3',
                innerContent: 'test'
            });
            menu.expand();
            menu.contract();
            assert.equal(false, menu.menuButtonDom.hasClass("ui-expanded"));
        });

        it('should populate the list of []_animations', function(){
            document.body.innerHTML = "";
            // Initialize the dom elements for testing
            let div = document.createElement('div');
            div.id = "bubble-menu-container";
            let menuButton = document.createElement('div');
            menuButton.id = "bubble-menu-button";
            div.appendChild(menuButton);
            let itemContainer = document.createElement('div');
            itemContainer.id = "bubble-menu-item-container";
            div.appendChild(itemContainer);
            document.body.appendChild(div);
            let menu = new BubbleMenu("#bubble-menu-container", "#bubble-menu-button", "#bubble-menu-item-container", 200);
            menu._getBubbleMenuButtonMarkup = function(config){
                return "<div id='" + config.id + "'>" + config.innerContent + "</div>";
            };
            menu.addButton({
                id: 'test1',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test2',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test3',
                innerContent: 'test'
            });
            menu.expand();
            menu.contract();
            assert.equal(3, menu._animations.length);
        });

        it('should set _expanded to false', function(){
            document.body.innerHTML = "";
            // Initialize the dom elements for testing
            let div = document.createElement('div');
            div.id = "bubble-menu-container";
            let menuButton = document.createElement('div');
            menuButton.id = "bubble-menu-button";
            div.appendChild(menuButton);
            let itemContainer = document.createElement('div');
            itemContainer.id = "bubble-menu-item-container";
            div.appendChild(itemContainer);
            document.body.appendChild(div);
            let menu = new BubbleMenu("#bubble-menu-container", "#bubble-menu-button", "#bubble-menu-item-container", 200);
            menu._getBubbleMenuButtonMarkup = function(config){
                return "<div id='" + config.id + "'>" + config.innerContent + "</div>";
            };
            menu.addButton({
                id: 'test1',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test2',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test3',
                innerContent: 'test'
            });
            menu.expand();
            menu.contract();
            assert.equal(false, menu._expanded);
        });

        it('should remove shown class to last button but not rest after 50 milliseconds', function(done){
            document.body.innerHTML = "";
            // Initialize the dom elements for testing
            let div = document.createElement('div');
            div.id = "bubble-menu-container";
            let menuButton = document.createElement('div');
            menuButton.id = "bubble-menu-button";
            div.appendChild(menuButton);
            let itemContainer = document.createElement('div');
            itemContainer.id = "bubble-menu-item-container";
            div.appendChild(itemContainer);
            document.body.appendChild(div);
            let menu = new BubbleMenu("#bubble-menu-container", "#bubble-menu-button", "#bubble-menu-item-container", 100);
            menu._getBubbleMenuButtonMarkup = function(config){
                return "<div id='" + config.id + "'>" + config.innerContent + "</div>";
            };
            menu.addButton({
                id: 'test1',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test2',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test3',
                innerContent: 'test'
            });
            menu.expand();
            setTimeout(function(){
                menu.contract();
                setTimeout(function(){
                    assert.equal(true, menu._buttons[0].dom.hasClass("shown"));
                    assert.equal(true, menu._buttons[1].dom.hasClass("shown"));
                    assert.equal(false, menu._buttons[2].dom.hasClass("shown"));
                    done();
                }, 50);
            }, 350);

        });

        it('should remove shown class to last two buttons but not rest after 250 milliseconds', function(done){
            document.body.innerHTML = "";
            // Initialize the dom elements for testing
            let div = document.createElement('div');
            div.id = "bubble-menu-container";
            let menuButton = document.createElement('div');
            menuButton.id = "bubble-menu-button";
            div.appendChild(menuButton);
            let itemContainer = document.createElement('div');
            itemContainer.id = "bubble-menu-item-container";
            div.appendChild(itemContainer);
            document.body.appendChild(div);
            let menu = new BubbleMenu("#bubble-menu-container", "#bubble-menu-button", "#bubble-menu-item-container", 200);
            menu._getBubbleMenuButtonMarkup = function(config){
                return "<div id='" + config.id + "'>" + config.innerContent + "</div>";
            };
            menu.addButton({
                id: 'test1',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test2',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test3',
                innerContent: 'test'
            });
            menu.expand();
            menu.expand();
            setTimeout(function(){
                menu.contract();
                setTimeout(function(){
                    assert.equal(true, menu._buttons[0].dom.hasClass("shown"));
                    assert.equal(false, menu._buttons[1].dom.hasClass("shown"));
                    assert.equal(false, menu._buttons[2].dom.hasClass("shown"));
                    done();
                }, 250);
            }, 350);
        });
    });

    describe('#_cancelAllAnimations()', function(){
        let BubbleMenu;

        before(function () {
            BubbleMenu = require('../public/app/js/src/ui/controls/BubbleMenu');
        });

        it('should cancel and remove all animations', function(){
            document.body.innerHTML = "";
            // Initialize the dom elements for testing
            let div = document.createElement('div');
            div.id = "bubble-menu-container";
            let menuButton = document.createElement('div');
            menuButton.id = "bubble-menu-button";
            div.appendChild(menuButton);
            let itemContainer = document.createElement('div');
            itemContainer.id = "bubble-menu-item-container";
            div.appendChild(itemContainer);
            document.body.appendChild(div);
            let menu = new BubbleMenu("#bubble-menu-container", "#bubble-menu-button", "#bubble-menu-item-container", 200);
            menu._getBubbleMenuButtonMarkup = function(config){
                return "<div id='" + config.id + "'>" + config.innerContent + "</div>";
            };
            menu.addButton({
                id: 'test1',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test2',
                innerContent: 'test'
            });
            menu.addButton({
                id: 'test3',
                innerContent: 'test'
            });
            menu.expand();
            menu._cancelAllAnimations();
            assert.deepEqual([], menu._animations);
        });
    });

});