'use strict';

var baseDir  = 'svg/base/dir',   // <-- Set to your SVG base directory
svgGlob      = '**/*.svg',       // <-- Glob to match your SVG files
outDir       = 'output/dir',     // <-- Main output directory
config       = {
    "dest": "sprite-factory",
    "log": "verbose",
    "mode": {
        "css": {
            "dest": "sprite-factory/sprt-css",
            "common": "ukon",
            "sprite": "sprite-factory/sprt-css/css.svg",
            "render": {
                "css": true,
                "scss": true
            },
            "example": true
        },
        "view": {
            "dest": "sprite-factory/sprt-view",
            "common": "ukon",
            "sprite": "sprite-factory/sprt-view/view.svg",
            "render": {
                "css": true
            },
            "example": true
        },
        "defs": {
            "dest": "sprite-factory/sprt-defs",
            "sprite": "sprite-factory/sprt-defs/defs.svg",
            "inline": true,
            "example": true
        },
        "symbol": {
            "dest": "sprite-factory/sprt-symbol",
            "sprite": "sprite-factory/sprt-symbol/symbol.svg",
            "example": true
        },
        "stack": {
            "dest": "sprite-factory/sprt-stack",
            "sprite": "sprite-factory/sprt-stack/stack.svg",
            "example": true
        }
    }
};

module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({

        // svg-sprite configuration
        svg_sprite        : {
            dist          : {
                expand    : true,
                cwd       : baseDir,
                src       : [svgGlob],
                dest      : outDir,
                options   : config
            }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-svg-sprite');

    // By default, compile the sprite(s)
    grunt.registerTask('default', ['svg_sprite']);
};