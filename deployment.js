const less       = require('less');
const fs         = require('fs');
const path       = require('path');

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

// Do it once
compileLess('public/app/styles/chatroom/main.less', 'public/app/styles/chatroom/main.css');
compileLess('public/app/styles/ice/main.less', 'public/app/styles/ice/main.css');
compileLess('public/app/styles/latex-preview/main.less', 'public/app/styles/latex-preview/main.css');