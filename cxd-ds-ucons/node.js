'use strict';

var SVGSpriter    = require('svg-sprite'),
path              = require('path'),
mkdirp            = require('mkdirp'),
fs                = require('fs'),
config            = {
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
},
spriter = new SVGSpriter(config);

// Register some SVG files with the spriter
var file = 'SVG/'; // <-- Replace with your local file path
spriter.add(path.resolve(file), file, fs.readFileSync(path.resolve(file), {encoding: 'utf-8'}));
// ...

// Compile the sprite
spriter.compile(function(error, result, cssData) {
    
    // Run through all configured output modes
    for (var mode in result) {
        
        // Run through all created resources and write them to disk
        for (var type in result[mode]) {
            mkdirp.sync(path.dirname(result[mode][type].path));
            fs.writeFileSync(result[mode][type].path, result[mode][type].contents);
        }
    }
});