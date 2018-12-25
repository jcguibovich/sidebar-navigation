const path = require('path');
const config = require('../config');
const paths = config.paths;
const kitchenSrc = path.resolve(paths.root, 'kitchen');
const kitchenDest = path.resolve(paths.build);
const kitchenPatterns = path.resolve(kitchenSrc, 'patterns');



module.exports = {
  kitchenSrc,
  kitchenDest,
  paths,
  //globs:config.globs,
  'build:style:kitchen': {
      src: [path.resolve(kitchenSrc, 'assets/styles/**/*.scss')],
      dest: path.resolve(kitchenDest, 'assets'),
      name: 'build:style:kitchen'
  },
  clean:{
    src: kitchenDest
  },
  serve: {
    plugins: {
      browserSync: {
        open: true,
        notify: false,
        logPrefix: 'FRAMEKIT',
        files: path.resolve(kitchenDest, '**/*.{css|html}'),
        server: { baseDir: kitchenDest }
      }
    }
  },
  globs:{
    js: path.resolve(kitchenSrc, 'assets/scripts/**/*.js'),
    img: path.resolve(kitchenSrc, 'assets/img/**/*')
  },
  watch: {
    watchers: [
      {
        match: [path.resolve(paths.src, '**/*.scss'),'!**/_all.scss'],
        tasks: ['build']
      },
      {
        match: [path.resolve(kitchenSrc, 'assets/styles/**/*.scss'),path.resolve(paths.src, 'framekit.scss'),'!**/*_all.scss'],
        tasks: ['build:style:kitchen']
      },
      {
        match: [path.resolve(kitchenSrc, 'data/**/*'),path.resolve(kitchenSrc, 'pages/**/*'), path.resolve(kitchenSrc, 'templates/**/*'), path.resolve(kitchenSrc, '**/*.{html,md,hbs}'),'!**/*_all.scss'],
        tasks: ['kitchen']
      }
    ]
  },
  beautifier: {
    /* eslint-disable camelcase */
    indent_char: ' ',
    indent_size: 2,
    indent_with_tabs: false,
    max_preserve_newlines: 1,
    wrap_line_length: 0,
    unformatted: `a abbr acronym address b bdo big cite code col del dfn dt em font
      h1 h2 h3 h4 h5 h6 i img ins kbd mark pre q s samp small span
      strike strong sub sup tt u var`.split(' ')
    /* eslint-enable camelcase */
  },
  src: {
    patterns: {
      basedir: kitchenPatterns,
      glob: path.resolve(kitchenPatterns, '**/*.{html,md,hbs}')
    },
    pages: {
      basedir: path.resolve(kitchenSrc, 'pages'),
      glob: path.resolve(kitchenSrc, 'pages/**/*.{html,md,hbs}')
    },
    data: {
      basedir: path.resolve(kitchenSrc, 'data'),
      glob: path.resolve(kitchenSrc, 'data/**/*')
    },
    templates: {
      basedir: path.resolve(kitchenSrc, 'templates'),
      glob: path.resolve(kitchenSrc, 'templates/**/*.hbs')
    }
  },
  dest: {
    root: kitchenDest,
    pages: kitchenDest,
    patterns: kitchenDest,
    collections: kitchenDest,
  },
  fieldParsers: {
    notes: 'markdown'
  }
}
