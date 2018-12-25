'use strict';

const inject = require('gulp-inject');
var merge = require('lodash').merge;
const series = require('stream-series');
var sort = require('gulp-sort');

var defaults = {
    srcGlob: './src/**',
    destDir: './src/',
    destGlob: 'files--map',
    startTag: '/* inject:sass */',
    relative: true,
    name: 'inject'
};
  
  
  module.exports = function(gulp, options) {
    var opts = merge({}, defaults, options);
    var srcGlob = opts.srcGlob;
    var destGlob = opts.destGlob;
    var destDir = opts.destDir;
    var startTag = opts.startTag;
    var relative = opts.relative;
    var name = opts.name;


    gulp.task(name, function() {
        var stream = gulp.src(srcGlob, {read:false})
        return gulp
            .src(destGlob)
            .pipe(sort())
            .pipe(inject(series(stream),{
                starttag: startTag,
                relative: relative
            }))
            .pipe(gulp.dest(destDir));
    });

  };

