# Gulp

Most of the Gulp scripts have been abstracted to npm's script runner. However you can directly leverage Gulp to run and create new tasks. This can be done by modifying `gulp.js`. 

## Tasks

### `gulp dev`
Starts up a development server at [localhost:3000](localhost:3000) by default. Does a one time initial compilation of necessary files and starts watchers for HTML, LESS and JavaScript files.

### `gulp deploy`
Compiles necessary files for deployment.

### `gulp styles`
Recompiles LESS files into CSS.

### `gulp scripts`
Bundle and transpile JavaScript files listed in the `JS_FILES` array. Source maps are generated.

### `gulp compile`
Compilation for development. Essentially `gulp styles` and `gulp scripts`

### `gulp scripts-dist`
`gulp scripts` with minification, minus source maps.

### `gulp styles-dist`
`gulp styles` with minification.

### `gulp compile-dist`
Compilation for deployment. Essentially `gulp styles-dist` and `gulp scripts-dist`

### `#!sh gulp clean`
Removes all compiled LESS and JavaScript files.




