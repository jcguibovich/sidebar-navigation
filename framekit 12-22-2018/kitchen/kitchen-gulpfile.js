'use strict';

const gulp = require('gulp');
var config = require('./kitchen-config');
var kitchen = require('cxd-kitchen-assemble');
var tasks = require('cxd-core-gulp-tasks');
const helpers = require('cxd-hbs-helpers');
const path = require('path')

const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');


// Append config
Object.assign(config, { helpers });

// REGISTER CORE TASKS
['clean', 'serve','watch'].forEach(name =>
    tasks[name](gulp, config[name])
);

// var staticFiles = [
//     path.resolve(config.paths.mods, 'cxd-ds-ucons/bp-ucons.svg') 
// ]

// //TKTK move src to glob or array
// gulp.task('copy:static', function() {
//     return gulp.src(staticFiles)
//         .pipe(gulp.dest(path.resolve(config.kitchenDest, 'assets')))
// })

//SETS UP KITCHEN STYLES COMPILE
tasks.sass(gulp, config['build:style:kitchen']);


gulp.task('kitchen', () => {
    const result = kitchen(config);
    return result;
});

gulp.task('kitchen:js', function() {
    return gulp.src(config.globs.js)
        .pipe(concat('framekit-kitchen.js'))
        .pipe(gulp.dest(path.resolve(config.kitchenDest, 'assets/js')));
});

// Register frontend composite task
gulp.task('build:kitchen', ['copy:labdocs','kitchen','kitchen:js','build:style:kitchen','copy:img']);

gulp.task('start:kitchen', ['build:kitchen'], done => {
    gulp.start('serve');
    gulp.start('watch');
    done();
});




gulp.task('copy:img', function() {
    return gulp.src(config.globs.img)
        .pipe(gulp.dest(path.resolve(config.paths.build, 'assets/img')));
});


/// Moves over any pre-rendered documentation files. sends it for now to labs. 
/// this is temporary solution. Defining config local
/// neds to be run before kitchen or else risk trigging render again
var docs = path.resolve(config.paths.mods, 'cxd-ds-ucons/demo/demo-stripped.html');

gulp.task('copy:labdocs', function() {
    return gulp.src(docs)
        .pipe(gulp.dest(path.resolve(config.kitchenSrc, 'pages/labs')));
});
  


