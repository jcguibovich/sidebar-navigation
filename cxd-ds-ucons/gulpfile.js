
const gulp = require('gulp')
const path = require('path')
const eslint = require('gulp-eslint')
const copy = require('gulp-copy')
const merge = require('merge-stream')
const svgSprite = require('gulp-svg-sprite')
const plumber = require('gulp-plumber')
const del = require('del')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const presPolyfill = require('@babel/polyfill')
const presEnv = require('@babel/preset-env')
// require('@babel/core').transform('code', {
//   plugins: ['@babel/plugin-transform-arrow-functions']
// });
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const pump = require('pump')
const rename = require('gulp-rename')
const runSequence = require('run-sequence')
const jshint = require('gulp-jshint')
const jshintReporter = require('jshint-stylish')
const filelog = require('gulp-filelog')
const exec = require('child_process').exec
const fs = require('fs')

const baseDir = 'assets/SVG/' // <-- Set to your SVG base directory
const svgGlob = '**/*.svg' // <-- Glob to match your SVG files
const outDir = 'sprite-factory' // <-- Main output directory

// CONFIGURE SPRITE OPTIONS
const config = {
  'dest': 'dist',
  'log': 'verbose',
  'mode': {
    'css': {
      'dest': 'sprt-css/',
      'common': 'ukon',
      'sprite': 'css.svg',
      'render': {
        'css': true,
        'scss': true
      },
      'example': true
    },
    'view': {
      'dest': 'sprt-view/',
      'common': 'ukon',
      'sprite': 'view.svg',
      'render': {
        'css': true
      },
      'example': true
    },
    'defs': {
      'dest': 'sprt-defs/',
      'sprite': 'defs.svg',
      'inline': true,
      'example': true
    },
    'symbol': {
      'dest': 'sprt-symbol/',
      'sprite': 'symbol.svg',
      'example': true
    },
    'stack': {
      'dest': 'sprt-stack/',
      'sprite': 'stack.svg',
      'example': true
    }
  }
}

// MAKE SPRITE, DEF, STACK, & SYMBOL
gulp.task('svgsprite', function () {
  return gulp.src(svgGlob, { cwd: baseDir })
    .pipe(plumber())
    .pipe(svgSprite(config)).on('error', function (error) { console.log(error); })
    .pipe(gulp.dest(outDir))
})

var injFile = path.resolve(__dirname, 'src/injector/src/ucon-inject.js')
console.log(injFile)
// MOVE FILES TO TEMP DIRECTORUY
gulp.task('injector:prepare', () => {
  runSequence('injector:files', 'injector:polyfillers')
})
// precopy for transpile
gulp.task('injector:files', () => {
  return gulp.src('src/injector/src/*.js', { base: 'src/injector/src' })
    .pipe(gulp.dest('.temp'))
})
// precopy for transpile
gulp.task('injector:polyfillers', () => {
  return gulp.src('node_modules/babel-polyfill/dist/polyfill.js', { base: 'node_modules/babel-polyfill/dist' })
    .pipe(gulp.dest('.temp'))
})

// CHECK CODE FOR QUALITY
gulp.task('injector:lint', () => {
  return gulp.src('.src/injector/ucon-inject.js')
  // eslint() attaches the lint output to the "eslint" property
  // of the file object so it can be used by other modules.
    .pipe(eslint())
  // eslint.format() outputs the lint results to the console.
  // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
  // To have the process exit with an error code (1) on
  // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError())
})

// BABBEL VIA SHELL
gulp.task('injector:shell:babel', function (cb) {
  exec('./node_modules/.bin/babel src/injector/ --out-dir lib', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

// BABEL THE CODE
gulp.task('injector:babel', () => {
  
  return gulp.src('src/injector/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('framekit-ucons.js'))
    .pipe(gulp.dest('dist/injector'))
    .pipe(sourcemaps.write('dist/injector/maps'))
    .pipe(filelog())
});

// COMBINE FILES

// MAKE IT LEAN
gulp.task('injector:compress', function (cb) {
  pump([
    gulp.src('.temp/framekit.js'),
    uglify(),
    rename({
      suffix: '.min'
      /*
         === OTHER OPTIONS ====
         dirname: 'dist/min',
         basename: 'injector',
         prefix: 'ucon-',
         extname: '.min.js'
      */
    }),
    gulp.dest('dist/injector/')
  ],
  cb
  )
})

// CLEAN THE DIST DIRECTORY BEFORE WRITING TO IT
gulp.task('injector:clean', () => {
  return del(['injector/dist/**/*', '!demo/index.html', '.temp/**/*', 'dist/injector/*', '!injector/dist/archive'], {
    dot: true
  })
})

// BUILD INJECTOR
gulp.task('injector', function (callback) {
  runSequence('injector:clean', 
    'injector:lint',
    'injector:babel',
    'injector:compress', callback
  );
})

// BUILD INJECTOR
gulp.task('injector:demo', function (callback) {
  runSequence(['injector:clean', 'injector:lint'],
    'injector:compile',
    // 'injector:concat',
    // 'injector:compress',
    callback);
})

// gulp.task('injector:lint', function () {
//   var injectorSrcFile = path.resolve(__dirname, 'src/injector/src/ucon-injector-allicons.js')
//   return gulp.src(injectorSrcFile).pipe(jshint('.jshintrc')).pipe(jshint.reporter(jshintReporter, { beep: true })) // will beep if warnings or errors
//     .pipe(jshint.reporter('fail'))
// });

var inFkcss = path.resolve(__dirname, 'node_modules/cxd-ds-framekit/dist/framekit.css')
var outFkcss = 'assets/css/framekit.css'

// destination.txt will be created or overwritten by default.
var copyFramekitCSS = (location) => {
  var cssLocation = location
  fs.copyFile(`${inFkcss}`, `${cssLocation}/${outFkcss}`, (err) => {
    if (err) throw err
    console.log('source.txt was copied to destination.txt')
  })
}

gulp.task('serve:Dev', function () {
  process.env.NODE_ENV = 'dev'
  copyFramekitCSS('src/injector')
  var browserSync = require('browser-sync').create()
  browserSync.init({
    port: 3500,
    server: {
      baseDir: 'src/injector',
      open: true,
      notify: true,
      files: 'demo/**/*.html',
      index: 'index.html'
    }
  })
})

gulp.task('serve:Demo', function () {
  process.env.NODE_ENV = 'demo'
  copyFramekitCSS('demo')
  var browserSync = require('browser-sync').create()
  browserSync.init({
    port: 3501,
    server: {
      baseDir: 'demo/',
      open: true,
      notify: true,
      files: 'demo/**/*.html',
      index: 'index.html'
    }
  })
})

gulp.task('serve:Prod', function () {
  process.env.NODE_ENV = 'prod'
  copyFramekitCSS('dist')
  var browserSync = require('browser-sync').create()
  browserSync.init({
    port: 3502,
    server: {
      baseDir: 'dist/',
      open: true,
      notify: true,
      files: 'demo/**/*.html',
      index: 'index.html'
    }
  })
})

// BUILD INJECTOR
gulp.task('injector', function (callback) {
  require('@babel/polyfill')
  runSequence(['injector:clean', 'injector:lint'],
    // 'injector:compile',
    // 'injector:concat',
    // 'injector:compress',
    'serve:prod',
    callback)
})
