'use strict';
const sass = require('gulp-sass');
const merge = require('lodash').merge;
const cssnano = require('gulp-cssnano');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const postcss = require('gulp-postcss');
const importer = require('postcss-import');
const prefixer = require('postcss-class-prefix');
const use = require('postcss-use');
// const autoprefixer = require('autoprefixer');

var defaults = {
  dest: './dist',
  optimize: false,
  name: 'sass',
  src: './src/main.css',
  prefix: false,
  autoprefixer: false,
  sassOpts: {}
};

module.exports = function(gulp, options) {
  var opts = merge({}, defaults, options);
  var dest = opts.dest;
  var optimize = opts.optimize;
  var name = opts.name;
  var src = opts.src;
  var base = opts.base;
  var prefix = opts.prefix;
  var sassOpts = opts.sassOptions;
  var autoprefixer = opts.autoprefixer;

  var plugins = [importer(), 
    use({ 
      modules: [
        /^autoprefixer/,
        /^postcss/,
        /^precss/,
        /^cssnano/
      ] 
    })];


  // Don't prefix classes formatted as components, utilities or states.
  var prefixOpts = {
    ignore: [/^[^A-Zu-]/, /^(is|has)-/]
  };


  if (prefix) {
    plugins.push(prefixer(prefix, prefixOpts));
  }

  // if (autoprefixer) {
  //   plugins.push(require('autoprefixer'));
  // }

  gulp.task(name, done =>
    gulp
      .src(src)
      .pipe(sass(sassOpts).on('error', sass.logError))
      //.pipe(cssnano(plugins))
      .pipe(postcss(plugins))
      .pipe(gulpif(optimize, cssnano()))
      .pipe(gulp.dest(dest))
  );
};