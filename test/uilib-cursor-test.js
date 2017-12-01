let assert = require('assert');
let jsdom = require('mocha-jsdom');

describe('Cursor', function(){
    describe('#constructor()', function(){
        let Cursor;
        jsdom();

        before(function () {
            Cursor = require('../public/app/js/src/ui/misc/Cursor');
        });

        it('should select dom element', function(){
            let div = document.createElement('div');
            div.id = "testId";
            document.body.appendChild(div);
            let cursor = new Cursor("#testId");
            assert.equal("testId", cursor.dom.attr('id'));
        });
    });

    describe('#setType()', function(){
        let Cursor;
        jsdom();

        before(function () {
            Cursor = require('../public/app/js/src/ui/misc/Cursor');
        });

        it('should set pointer style to inline CSS', function(){
            let div = document.createElement('div');
            div.id = "testId";
            document.body.appendChild(div);
            let cursor = new Cursor("#testId");
            cursor.setType("pointer");
            assert.equal("cursor: pointer;", cursor.dom.attr('style'));
        });
    });
});