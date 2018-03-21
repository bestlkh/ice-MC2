# Gulp
??? "Authors"
    Daniel Hugh (hughdani)

Most of the Gulp scripts have been abstracted to npm's script runner. However you can directly leverage Gulp to run and create new tasks. This can be done by through the `gulp.js` file. 

## Tasks

### `gulp dev`
Starts up a development server at [localhost:3000](localhost:3000) (by default). It then begins a clean compilation of necessary files and starts watchers for HTML, LESS and JavaScript files.

### `gulp deploy`
Compiles necessary files for deployment.

### `gulp styles`
Recompiles LESS files into CSS.

### `gulp scripts`
Bundle and transpile JavaScript files listed in the `JS_FILES` array. Source maps are generated.

### `gulp compile`
Compilation for development. Combintation of `gulp styles` and `gulp scripts`

### `gulp scripts-dist`
`gulp scripts` with minification and without source maps.

### `gulp styles-dist`
`gulp styles` with minification.

### `gulp compile-dist`
Compilation for deployment. Combintation of `gulp styles-dist` and `gulp scripts-dist`.

### `gulp clean`
Removes all compiled LESS and JavaScript files.




