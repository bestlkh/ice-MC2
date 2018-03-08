const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserify = require('browserify');
const log = require('gulplog');
const tap = require('gulp-tap');
const buffer = require('gulp-buffer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync');

const server = browserSync.create();

// the local server the app is running on
const localServer = 'localhost:8080';

// javascript source files to bundle
const JS_FILES = [
    'public/app/js/src/ui/ui.js', 
    'public/app/js/src/chat/chat.js', 
    'public/app/js/src/alert/alert.js', 
    'public/app/js/src/driver/driver.js', 
    'public/app/js/src/recognition/tool.js', 
    'public/app/js/src/utilities/ImageUtility.js'
];

const paths = {
    styles: {
        src: 'public/app/styles/**/*.less',
        mainSrc: 'public/app/styles/**/*main.less',
        dest: 'public/app/styles'
    },
    bundleScripts: {
        src: JS_FILES,
        dest: 'dist/bs'
    },
    watchScripts: {
        src: 'public/**/*.js',
    },
    lint: {
        src: 'test/**'
    },
    html: {
        src:'public/index.html',
    }
};

const babelVersion = {
    presets: ['es2015']
};

// compile styles to css
function styles() {
    return gulp.src(paths.styles.mainSrc)
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(server.stream());
}

// compiles the main LESS files to CSS
gulp.task('styles', gulp.series(styles));

// reload the page
function reload(done) {
    server.reload();
    done();
}

// initialize the browsersync server to proxy the local server
function serve(done) {
    server.init({
        proxy: localServer
    });
    done();
}


// javascript file bundling with sourcemaps (babel + browserify + uglify) 
gulp.task('scripts', function() {
    return gulp.src(JS_FILES, {read: false}) // no need of reading file because browserify does.
        // transform file objects using gulp-tap plugin
        .pipe(tap(function (file) {
            log.info('bundling ' + file.path);
            // replace file contents with browserify's bundle stream
            file.contents = browserify(file.path, {debug: true}).bundle();
        }))
        // transform streaming contents into buffer contents (because gulp-sourcemaps does not support streaming contents)
        .pipe(buffer())
        .pipe(babel(babelVersion))
        // load and init sourcemaps
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        // write sourcemaps
        .pipe(sourcemaps.write('./'))
        .pipe(rename(function (path) {
            // exclude .bundle extension in .map files
            if (path.extname != '.map') {
                path.basename += '.bundle';
            }
        }))
        .pipe(gulp.dest(paths.bundleScripts.dest));
});

// compile LESS and Javascript
const compile = gulp.series(styles, 'scripts');

// start BrowserSync server
const start = gulp.series(serve);

// watch for Javascript changes 
const scriptWatcher = () => gulp.watch(paths.watchScripts.src, gulp.series(reload));
const scriptTask = gulp.series(scriptWatcher);

// watch for LESS changes
const styleWatcher = () => gulp.watch(paths.styles.src, gulp.series(styles));
const styleTask = gulp.series(styleWatcher);

// watch for HTML changes
const htmlWatcher = () => gulp.watch(paths.html.src, gulp.series(reload));
const htmlTask = gulp.series(htmlWatcher);

// group watcher tasks to run in parallel
const dev = gulp.parallel(scriptTask, styleTask, htmlTask);

// start a development environment
gulp.task('dev', gulp.series(compile, start, dev));

// compiles necessary files for deployment
gulp.task('deploy', gulp.series(compile));

gulp.task('lint', function () {
    return gulp.src(paths.lint.src)
        .pipe(eslint())
        .pipe(eslint.format());
});
