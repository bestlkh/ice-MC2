/**
 * Developer tools
 * Run this tool before you start developing :)
 * And do not exit it
 * Author: Jun Zheng
 */

const chokidar   = require('chokidar');
const less       = require('less');
const fs         = require('fs');
const path       = require('path');
const babel      = require("babel-core");
const browserify = require('browserify');
const colors     = require('colors');

let browserifyInstances = {};

/**
 * Compile one LESS file
 * @param input
 * @param output
 */
function compileLess(input, output){
    // Read LESS source from file
    fs.readFile(input, 'utf8', function (err, data) {
        if (err) {
            return console.log("Failed to read less " + input);
        } else {
            // Render LESS
            less.render(data, {filename: input}).then(function(out) {
                // Write CSS
                fs.writeFile(output, out.css, function(err) {
                    if(err) {
                        return console.log("Failed to write CSS " + output);
                    } else {
                        return console.log("LESS compiled " + input);
                    }
                });
            },
            function(error) {
                return console.log("Failed to compile less " + input);
            });
        }
    });
}


/**
 * Compile a JavaScript file using babel
 * @param input
 * @param output
 */
function compileJs(input, output, callback){
    babel.transformFile(input, {}, function (err, result) {
        if(err){
            return console.log("Failed to compile js " + input);
        } else {
            fs.writeFile(output, result.code, function(err) {
                if(err) {
                    return console.log("Failed to write JavaScript " + output);
                } else {
                    callback();
                    return console.log("JavaScript compiled " + input);
                }
            });
        }
    });
}


/**
 * Bundle a JavaScript file using browserify
 * @param input
 * @param output
 */
function browserifyJs(input, output){
    let b;
    if(input in browserifyInstances){
        b = browserifyInstances[input];
    } else {
        b = browserify(input);
        browserifyInstances[input] = b;
    }
    b.bundle(function(err, src){
        if (err) console.log(err.stack);
        console.log(output);
        fs.writeFile(output, src, 'utf8', function(err){
            if (err) console.log(err.stack);
            console.log("Bundled JavaScript " + input);
        })
    })
}


console.log("This program will watch all LESS & JS files.".green.bold);
console.log("LESS files will be compiled using Less.js.");
console.log("JavaScript files will be transformed using babel, then bundled using browserify.");
console.log("DO NOT EXIT THIS PROGRAM WHEN YOU ARE DEVELOPING".red.bold);
console.log("Ctrl+C (Cmd+C) to exit");
console.log("Enjoy coding! :)".green.bold);



// Just compile all less whenever something changes, this can be optimized, but dev tools.. no one cares.
let lessWatcher = chokidar.watch('public/app/styles', {ignored: /(^\.)|(\.css)/});
lessWatcher
    .on('change', function(path){
        // Add your less files here
        compileLess('public/app/styles/chatroom/main.less', 'public/app/styles/chatroom/main.css');
        compileLess('public/app/styles/ice/main.less', 'public/app/styles/ice/main.css');
        compileLess('public/app/styles/latex-preview/main.less', 'public/app/styles/latex-preview/main.css');
    });

// Compile and bundle all js files.
let jsWatcher = chokidar.watch('public/app/js/src', {ignored: /(^|[\/\\])\../});
jsWatcher
    .on('change', function(filePath){
        // We compile that specific JS file
        let relativePath = filePath.replace('public/app/js/src', '');
        relativePath = relativePath.replace('public\\app\\js\\src', '');
        compileJs(filePath, 'public/app/js/lib' + relativePath, function(){
            // Add files that needs to be bundled here
            browserifyJs('public/app/js/lib/ui/ui.js', 'public/app/js/lib/ui/ui.bundle.js');
            browserifyJs('public/app/js/lib/chat/chat.js', 'public/app/js/lib/chat/chat.bundle.js');
            browserifyJs('public/app/js/lib/alert/alert.js', 'public/app/js/lib/alert/alert.bundle.js');
        });
    });

// Do it once
compileLess('public/app/styles/chatroom/main.less', 'public/app/styles/chatroom/main.css');
compileLess('public/app/styles/ice/main.less', 'public/app/styles/ice/main.css');
compileLess('public/app/styles/latex-preview/main.less', 'public/app/styles/latex-preview/main.css');