const pkg = require('./package.json') //CAN we run all in the json to begin with?
const path = require('path')

var root = path.resolve(__dirname, './')
var src = path.resolve(root, 'src/')

var paths = {
  root: root,
  src: src,
  mods: path.resolve(root, 'node_modules'),
  dist: path.resolve(root, 'dist'),
  build: path.resolve(root, 'build'),
  kitchen: path.resolve(root, 'kitchen'),
  settings: path.resolve(src, 'globals/settings'),
  tools: path.resolve(src, 'globals/tools'),
  base: path.resolve(src, 'base'),
  elements: path.resolve(src, 'elements'),
  objects: path.resolve(src, 'objects'),
  components: path.resolve(src, 'components'),
  utilities: path.resolve(src, 'utilities'),
  globals: path.resolve(src, 'globals'),
  assets: path.resolve(src, 'globals/assets')
}

var sassDeep = '**/*.scss'
var sassShallow = '*.scss'
var ignores = '!**/_all.scss'

var globs = {
  settingsMapping: [path.resolve(paths.settings, '**/_settings.*.scss'), ignores],
  toolsMapping: [path.resolve(paths.src, '**/_tools.*.scss'), ignores],
  baseMapping: [path.resolve(paths.base, sassDeep), ignores],
  elementsMapping: [path.resolve(paths.elements, sassDeep), ignores],
  objectsMapping: [path.resolve(paths.objects, sassDeep), ignores],
  componentMapping: [path.resolve(paths.components, sassDeep), '!**/_*' ],
  utilitiesMapping: [path.resolve(paths.utilities, sassDeep), ignores],
  staticAssets: [path.resolve(paths.mods, 'cxd-ds-ucons/bp-ucons.svg'), 
                 path.resolve(paths.src, 'globals/assets/img/**/*'), 
                 path.resolve(paths.mods, 'cxd-ds-tokens/dist/latest.md')]
}


module.exports = {
  paths: paths,
  globs: globs,
  mappings: {
    settings: {
      srcGlob: globs.settingsMapping,
      destGlob: path.resolve(paths.settings, '_all.scss'),
      destDir: paths.settings,
      name: 'generate:mapping:settings'
    },
    helpers: {
      srcGlob: globs.toolsMapping,
      destGlob: path.resolve(paths.tools, '_all.scss'),
      destDir: paths.tools,
      name: 'generate:mapping:tools'
    },
    base: {
      srcGlob: globs.baseMapping,
      destGlob: path.resolve(paths.base, '_all.scss'),
      destDir: paths.base,
      name: 'generate:mapping:base'
    },
    elements: {
      srcGlob: globs.elementsMapping,
      destGlob: path.resolve(paths.elements, '_all.scss'),
      destDir: paths.elements,
      name: 'generate:mapping:elements'
    },
    objects: {
      srcGlob: globs.objectsMapping,
      destGlob: path.resolve(paths.objects, '_all.scss'),
      destDir: paths.objects,
      name: 'generate:mapping:objects'
    },
    utilities: {
      srcGlob: globs.utilitiesMapping,
      destGlob: path.resolve(paths.utilities, '_all.scss'),
      destDir: paths.utilities,
      name: 'generate:mapping:utilities'
    },
    components: {
      srcGlob: globs.componentMapping,
      destGlob: path.resolve(paths.components, '_all.scss'),
      destDir: paths.components,
      name: 'generate:mapping:components'
    }
  },
  sass: {
    'build:sass': {
      src: path.resolve(paths.src, 'framekit.scss'),
      dest: path.resolve(paths.build, 'assets'),
      name: 'build:sass',
      optimize: false,
      // prefix: 'fk-',
      sassOptions: {
        includePaths: paths.mods,
        sourceComments: true,
        outputStyle: 'nested'
      }
    },
    'build:sass:prod': {
      src: path.resolve(paths.src, 'framekit.scss'),
      dest: path.resolve(paths.dist),
      name: 'build:sass:prod',
      autoprefixer: true,
      optimize: true,
      sassOptions: {
        includePaths: paths.mods,
        outputStyle: 'compressed',
        sourceComments: false
      }
    },
    'build:sass:prod:all': {
      // src: path.resolve(paths.src, 'framekit-all.scss'),
      src: path.resolve(paths.src, 'framekit-all.scss'),
      dest: path.resolve(paths.dist),
      name: 'build:sass:prod:all',
      autoprefixer: true,
      sassOptions: {
        includePaths: paths.mods,
        outputStyle: 'nested',
      }
    },
    'build:sass:all': {
      src: path.resolve(paths.src, '**/*.scss'),
      dest: path.resolve(paths.build, 'css/'),
      name: 'build:sass:all',
      sassOptions: {
        includePaths: paths.mods,
        outputStyle: 'compressed'
      }
    },
    'test': {
      src: path.resolve(paths.root, 'test/sass/*.spec.scss'),
      dest: path.resolve(paths.root, 'test/sass/build/'),
      name: 'test',
      sassOptions: {
        //includePaths: paths.mods,
        //outputStyle: 'compressed'
      }
    }
  },
  clean: {
    src: path.resolve(paths.build)
  },
  javscript: {
    fileName: 'framekit.js',
    jsDeps: [
      path.resolve(paths.mods, 'cxd-ds-ucons/dist/ucon-injector-allicons.js'),
      path.resolve(paths.components, '**/*.js'),
      path.resolve(root, 'src/javascript/components' )
    ]
  }
}