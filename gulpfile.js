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
const browserSync = require('browser-sync');
const del = require('del');
// const eslint = require('gulp-eslint');

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

// all javascript files excluding bundled files
const VANILLA_FILES = ['public/app/**/*.js', '!(public/app/js/src/**/*.*)'];

const paths = {
    styles: {
        watch: {
            src: 'public/app/styles/**/*.less',
        },
        src: 'public/app/**/*main.less',
        dest: 'public/app/dist/css',
    },
    scripts: {
        bundle: {
            watch: {
                src: 'public/app/js/src/**/*.js',
            },
            src: JS_FILES,
            dest: 'public/app/dist/js',
        },
        vanilla: {
            src: VANILLA_FILES,
        },
    },
    html: {
        src: 'public/**/*.html',
    },
    clean: {
        all: 'public/app/dist',
        styles: 'public/app/dist/css',
        scripts: 'public/app/dist/js',
    },
    // lint: {
    //     src: 'test/**'
    // },
};

const babelVersion = {
    presets: ['es2015'],
};

const serve = (done) => {
    server.init({
        proxy: localServer,
    });
    done();
};

const reload = (done) => {
    server.reload();
    done();
};

const styles = () => {
    return gulp.src(paths.styles.src)
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
        }))
        .pipe(rename(function(path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(server.stream());
};

const stylesDist = () => {
    return gulp.src(paths.styles.src)
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
        }))
        .pipe(cleanCss())
        .pipe(rename(function(path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(server.stream());
};

const scripts = () => {
    return gulp.src(paths.scripts.bundle.src)
        // load and init sourcemaps
        .pipe(sourcemaps.init({loadMaps: true}))
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
        // write sourcemaps
        .pipe(sourcemaps.write('./'))
        .pipe(rename(function(path) {
            // exclude .bundle extension in .map files
            if (path.extname != '.map') {
                path.basename += '.bundle';
            }
        }))
        .pipe(gulp.dest(paths.scripts.bundle.dest));
};

const scriptsDist = () => {
    return gulp.src(paths.scripts.bundle.src)
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
        .pipe(uglify())
        .pipe(rename(function(path) {
            // exclude .bundle extension in .map files
            if (path.extname != '.map') {
                path.basename += '.bundle';
            }
        }))
        .pipe(gulp.dest(paths.scripts.bundle.dest));
};

const clean = () => del([paths.clean.all]);
const cleanStyles = () => del([paths.clean.styles]);
const cleanScripts = () => del([paths.clean.scripts]);

gulp.task('clean', gulp.series(clean));

gulp.task('styles', gulp.series(cleanStyles, styles));
gulp.task('styles-dist', gulp.series(cleanStyles, stylesDist));
gulp.task('scripts', gulp.series(cleanScripts, scripts));
gulp.task('scripts-dist', gulp.series(cleanScripts, scriptsDist));

gulp.task('compile', gulp.series(styles, scripts));
gulp.task('compile-dist', gulp.series(stylesDist, scriptsDist));

// start BrowserSync server
const start = gulp.series(serve);

// the types of file watchers
const bundleScriptWatcher = () => {
    return gulp.watch(paths.scripts.bundle.watch.src, gulp.series(scripts, reload));
};
const vanillaScriptWatcher = () => {
    return gulp.watch(paths.scripts.vanilla.src, gulp.series(reload));
};
const styleWatcher = () => {
    return gulp.watch(paths.styles.watch.src, gulp.series(styles));
};
const htmlWatcher = () => {
    return gulp.watch(paths.html.src, gulp.series(reload));
};

const bundleScriptTask = gulp.series(bundleScriptWatcher);
const vanillaScriptTask = gulp.series(vanillaScriptWatcher);
const styleTask = gulp.series(styleWatcher);
const htmlTask = gulp.series(htmlWatcher);

// group watcher tasks to run in parallel
const watchers = gulp.parallel(bundleScriptTask, vanillaScriptTask, styleTask, htmlTask);

// start a development environment
gulp.task('dev', gulp.series(clean, 'compile', start, watchers));

// compiles necessary files for deployment
gulp.task('deploy', gulp.series(clean, 'compile-dist'));

// gulp.task('lint', function () {
//     return gulp.src(paths.lint.src)
//         .pipe(eslint())
//         .pipe(eslint.format());
// });
