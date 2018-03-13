const gulp = require('gulp');
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserify = require('browserify');
const log = require('gulplog');
const tap = require('gulp-tap');
const buffer = require('gulp-buffer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const bro = require('gulp-bro');
// const eslint = require('gulp-eslint');
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
    'public/app/js/src/recognition/Tool.js',
    'public/app/js/src/utilities/ImageUtility.js',
];

const paths = {
    styles: {
        src: 'public/app/styles/**/*.less',
        mainSrc: 'public/app/**/*main.less',
        dest: 'public/app/dist/css',
    },
    bundleScripts: {
        src: JS_FILES,
        dest: 'public/app/dist/js',
    },
    watchScripts: {
        src: 'public/**/!(*.bundle).js',
    },
    // lint: {
    //     src: 'test/**'
    // },
    html: {
        src: 'public/**/*.html',
    },
};

const babelVersion = {
    presets: ['es2015'],
};


/**
 * Initialize the browsersync server to proxy the local server
 * @param {*} done
 */
function serve(done) {
    server.init({
        proxy: localServer,
    });
    done();
}


/**
 * Tell the browsersync server to reload the page
 * @param {*} done
 */
function reload(done) {
    server.reload();
    done();
}


const styles = () => {
    return gulp.src(paths.styles.mainSrc)
        .pipe(less())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
        }))
        .pipe(cleanCss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(server.stream());
};

const scripts = () => {
    return gulp.src(JS_FILES)
        .pipe(babel(babelVersion))
        .pipe(bro())
        .pipe(rename(function(path) {
            // exclude .bundle extension in .map files
            if (path.extname != '.map') {
                path.basename += '.bundle';
            }
        }))
        .pipe(gulp.dest(paths.bundleScripts.dest));
};

const scriptsDist = () => {
    return gulp.src(JS_FILES)
        // transform file objects using gulp-tap plugin
        .pipe(tap(function(file) {
            log.info('bundling ' + file.path);
            // replace file contents with browserify's bundle stream
            file.contents = browserify(file.path, {debug: true}).bundle();
        }))
        // transform streaming contents into buffer contents
        // (because gulp-sourcemaps does not support streaming contents)
        .pipe(buffer())
        .pipe(babel(babelVersion))
        // load and init sourcemaps
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        // write sourcemaps
        .pipe(sourcemaps.write('./'))
        .pipe(rename(function(path) {
            // exclude .bundle extension in .map files
            if (path.extname != '.map') {
                path.basename += '.bundle';
            }
        }))
        .pipe(gulp.dest(paths.bundleScripts.dest));
};


gulp.task('styles', gulp.series(styles));

gulp.task('scripts', gulp.series(scripts));

gulp.task('scripts-dist', gulp.series(scriptsDist));

gulp.task('compile', gulp.series('styles', 'scripts-dist'));

// start BrowserSync server
const start = gulp.series(serve);

const scriptWatcher = () => {
    return gulp.watch(paths.watchScripts.src, gulp.series(scripts, reload));
};
const styleWatcher = () => {
    return gulp.watch(paths.styles.src, gulp.series(styles));
};
const htmlWatcher = () => {
    return gulp.watch(paths.html.src, gulp.series(reload));
};

const scriptTask = gulp.series(scriptWatcher);
const styleTask = gulp.series(styleWatcher);
const htmlTask = gulp.series(htmlWatcher);

// group watcher tasks to run in parallel
const dev = gulp.parallel(scriptTask, styleTask, htmlTask);

// start a development environment
gulp.task('dev', gulp.series('compile', start, dev));

// compiles necessary files for deployment
gulp.task('prod', gulp.series('compile'));

// gulp.task('lint', function () {
//     return gulp.src(paths.lint.src)
//         .pipe(eslint())
//         .pipe(eslint.format());
// });
