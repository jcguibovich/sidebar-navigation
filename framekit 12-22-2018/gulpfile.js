const gulp = require('gulp'),
  tasks = require('cxd-core-gulp-tasks'),
  inject = require('gulp-inject'),
  sass = require('node-sass'),
  runSequence = require('run-sequence'),
  path = require('path'),
  series = require('stream-series'),
  log = require('fancy-log'),
  del = require('del'),
  sourcemaps = require('gulp-sourcemaps'),
  rename = require('gulp-rename'),
  // opens up debugging
  plumber = require('gulp-plumber'),
  // shows list of files processeed
  filelog = require('gulp-filelog'),
  // for deploy
  rsync = require('gulp-rsync'),
  zip = require('gulp-zip'),

  pkg = require('./package'),
  config = require('./config'),
  concat = require('gulp-concat'),
  // conditionally handle specific types of assets
  gulpif = require('gulp-if'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-clean-css'),
  gulpStylelint = require('gulp-stylelint'),
  stylelintFormatter = require('stylelint-checkstyle-formatter'),
  postcss = require('postcss')
require('postcss-reporter')({
  clearReportedMessages: true
})

// LAYZ LOADER - get to being lazy on that loading
var gulpLoadPlugins = require('gulp-load-plugins'),
  $ = gulpLoadPlugins(),

  //short cut access to config items
  paths = config.paths,
  globs = config.globs

//require('require-dir')('./gulp');

// Setup linked scripts
require('./kitchen/kitchen-gulpfile');

// REGISTER CORE TASKS 
// loops through array and applys a config element to a core task
// To add a new, add new config obj to config item that mirrors the name in the array. 
//
['clean'].forEach(name =>
  tasks[name](gulp, config[name])
)

// REGISTER STYLE TASKS  
// Automatically sets up sass conversions via config
// To add a new, add new config obj to config in sass section

Object.keys(config.sass).forEach(function (key) {
  tasks.sass(gulp, config.sass[key])
})


// REGISTER MAPPING IMPORTS  
// Automatically sets up injects mapping via config
// To add a new, add new config obj to config in mapping section

var allmaptasks = []
Object.keys(config.mappings).forEach(function (key) {
  tasks.inject(gulp, config.mappings[key])
  allmaptasks.push(config.mappings[key].name)
})

gulp.task('generate:mapping:all', function (callback) {
  runSequence(allmaptasks, callback)
})


// PRIMARY TASKS 
gulp.task('default', ['clean'], function (callback) {
  log.error('BUILDING STYLES ONLY (TO RUN WATCHES AND TESTING PORTAL RUN \'gulp start \') ')
  runSequence('build', callback)
})


gulp.task('start', ['clean'], function (callback) {
  runSequence('build', 'start:kitchen', callback)
})


// Main build engine of system. 
gulp.task('build', function (callback) {
  runSequence('generate:mapping:all', 'build:sass', 'build:sass:prod', 'build:sass:prod:all', 'copy', 'scripts', 'report:css', callback)
})

gulp.task('scripts', function () {
  return gulp.src(config.javscript.jsDeps)
    .pipe(concat(config.javscript.fileName))
    .pipe(gulp.dest(path.resolve(paths.build, 'assets/js')))
})

gulp.task('copy', function () {
  return gulp.src(config.globs.staticAssets)
    .pipe(gulp.dest(path.resolve(paths.build, 'assets/')))
})




// ====== RELEASE FUNCTIONS ==========================
// gulp.task('release', function(callback) {
//     log('BUILDING OUT A RELEASE BUILD' + pkg.version);
//     runSequence('clean:release', 'build:tokens','build:styles', 'build:tokens:all', 'sass:prod', callback);
// });

// REGISTER INDIVIDUAL CLEAN TKTK, CORE TASKS NEEDS TO HANDLE MULTIPLE CLEANS
gulp.task('clean:release', function (callback) {
  del(paths.dist)
  callback()
})


// ====== CSS REPORT  ==========
gulp.task('report:css', function () {
  var analyzeCss = require('gulp-analyze-css')
  gulp.src(path.resolve(paths.build, 'assets/framekit.css'))
    .pipe(analyzeCss({
      outDiretory: path.resolve(paths.kitchen, 'data')
    }))
})

// SASS DOCUMENTATION CREATION  ==========
// var sassdoc = require('sassdoc');

// gulp.task('sassdoc', function () {
//   var options = {
//     build: path.resolve(paths.build, 'styleDocs'),
//     verbose: true,
//     display: {
//       access: ['public', 'private'],
//       alias: true,
//       watermark: false,
//     },
//     groups: {
//       components: 'Components',
//       'undefined': 'Utilities',
//     }
//   };

//   return gulp.src( path.resolve(paths.src, '**/*.scss'))
//     .pipe(sassdoc(options));
// });

// COMPILE IT
gulp.task('build:sass:all', function () {

  return gulp.src(['src/**/*.scss'], {
    base: 'src'
  })
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      precision: 10
    })).on('error', $.sass.logError)
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      remove: false
    }))
    .pipe($.sourcemaps.write('.'))
    .pipe($.filelog())
    .pipe(gulp.dest('assemble/assets/css'))
})