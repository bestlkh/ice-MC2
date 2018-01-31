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
const UglifyJS   = require("uglify-js");

let browserifyInstances = {};

const LESS_PATH = 'public/app/styles';
const LESS_FILES = [
    ['public/app/styles/chatroom/main.less', 'public/app/styles/chatroom/main.css'],
    ['public/app/styles/ice/main.less', 'public/app/styles/ice/main.css'],
    ['public/app/styles/latex-preview/main.less', 'public/app/styles/latex-preview/main.css']
];

const JS_PATH = 'public/app/js/src';
const JS_WINDOWS_PATH = 'public\\app\\js\\src';
const JS_OUT_PATH = 'public/app/js/lib';
const JS_FILES = [
    ['public/app/js/lib/ui/ui.js', 'public/app/js/lib/ui/ui.bundle.js'],
    ['public/app/js/lib/chat/chat.js', 'public/app/js/lib/chat/chat.bundle.js'],
    ['public/app/js/lib/alert/alert.js', 'public/app/js/lib/alert/alert.bundle.js'],
    ['public/app/js/lib/driver/driver.js', 'public/app/js/lib/driver/driver.bundle.js'],
    ['public/app/js/lib/recognition/tool.js', 'public/app/js/lib/recognition/tool.bundle.js'],
    ['public/app/js/lib/utilities/ImageUtility.js', 'public/app/js/lib/utilities/ImageUtility.bundle.js']
];


/**
 * Compile one LESS file
 * @param input
 * @param output
 */
function compileLess(input, output) {
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
 * @param callback
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
function browserifyJs(input, output, callback){
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
            callback();
        })
    })
}

/**
 * Uglify a JavaScript file
 * @param input
 * @param output
 */
function uglifyJs(input, output){
    fs.readFile(input, 'utf8', function (err, data) {
        if (err) {
            return console.log("Failed to read js " + input);
        } else {
            // Uglify JavaScript
            let result = UglifyJS.minify(data);
            if(result.error){
                console.log("Failed to uglify JavaScript " + result.error)
            } else {
                fs.writeFile(output, result.code, function(err) {
                    if(err) {
                        return console.log("Failed to write JavaScript " + output);
                    } else {
                        return console.log("Javascript uglified " + input);
                    }
                });
            }

        }
    });
}


console.log("This program will watch all LESS & JS files.".green.bold);
console.log("LESS files will be compiled using Less.js.");
console.log("JavaScript files will be transformed using babel, then bundled using browserify.");
console.log("DO NOT EXIT THIS PROGRAM WHEN YOU ARE DEVELOPING".red.bold);
console.log("Ctrl+C (Cmd+C) to exit");
console.log("Enjoy coding! :)".green.bold);


// Just compile all less whenever something changes, this can be optimized, but dev tools.. no one cares.
let lessWatcher = chokidar.watch(LESS_PATH, {ignored: /(^\.)|(\.css)/});
lessWatcher
    .on('change', function(path){
        // Add your less files here
        for (let i = 0; i < LESS_FILES.length; i++){
            compileLess(LESS_FILES[i][0], LESS_FILES[i][1]);
        }
    });

// Compile and bundle all js files.
let jsWatcher = chokidar.watch(JS_PATH, {ignored: /(^|[\/\\])\../});
jsWatcher
    .on('change', function(filePath){
        // We compile that specific JS file
        let relativePath = filePath.replace(JS_PATH, '');
        relativePath = relativePath.replace(JS_WINDOWS_PATH, '');
        compileJs(filePath, JS_OUT_PATH + relativePath, function(){
            // Add files that needs to be bundled here
            for (let i = 0; i < JS_FILES.length; i++){
                browserifyJs(JS_FILES[i][0], JS_FILES[i][1], () => {
                    uglifyJs(JS_FILES[i][1], JS_FILES[i][1]);
                });
            }
        });
    });

// Do it once
for (let i = 0; i < LESS_FILES.length; i++){
    compileLess(LESS_FILES[i][0], LESS_FILES[i][1]);
}

let express = require('express');
let app = express();

/**
 * Endpoint to get all LESS configurations
 */
app.get('/less', function(req, res){
    res.send({
        'path': LESS_PATH,
        'files': LESS_FILES
    });
});

/**
 * Endpoint to get all JavaScript configurations
 */
app.get('/js', function(req, res){
    res.send({
        'path': JS_PATH,
        'windows_path': JS_WINDOWS_PATH,
        'out_path': JS_OUT_PATH,
        'files': JS_FILES
    });
});

app.use('/', express.static(__dirname + '/dev_public'));

app.listen(8081);