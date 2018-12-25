# Blueprint Icons: Utility Icons (ucons)

Table of Contents
1. Overview
2. Usage in HTML
3. Guidelines (for creating icons and naming)
4. Reserved Icon



# 1. Overview
Utility Icons serve call to actions for, in general, click identifiers. They are typically filled in to impove visibilty when small.  In a few cases where an icon is a prosepct to be stateful a outline version is provided.  

Should not be used as decorative elements.  See the Graphic Icons (gcons) or Spot Illustrations for those use cases.  


The *SVG* folder contains the icons as seperate SVGs, but ideal usage is using the SVG Injector located in "injector/dist/" folder. For development or debugging make sure to use the <code>.js and .map</code> files. 

|__

At this time, all edits to the icons needs to be done in an external tool and then brought into the repo. 


### For Edit or New Icon Request submit an email request straight to our Kabaan board. 

<a href="mailto:add-card.FannieMae3358.699210748@lkmail.us?subject=Icon%20Request&amp;body=Your%20Name%3A%20%0AProject%3A%0ARequest%3A">Send a Icon Request</a>




# 2. Usage - SVG Inject

To insert your icons as inline SVGs similar to a font icon do the following:

a. Add the following js file at the bottom of your page just before the closing `</body>` tag

``` html
 <script src="your/path/to/the/ucon-injector.allicons.js"></script>
 ```

b. Then use the format below with the <code>'data-src'</code> as the ucon name. Make sure you use the class name as well and the name of the ucon or it wont work.

``` html
<i class="fk-ucon" data-src="chevron-left"></i>
```

or...

To insert your icons as inline SVGs \(with the `<use>` element\):

a. Copy the `<svg>` element \(that contains symbol definitions\) from 'sprite-factory/sprt-symbol/sprite.symbol.html', below your own HTML's `<body>` tag. After copying this SVG, you can reference your glyphs like the following:

``` html
<svg class="bp-ucon bp-ucon-receipt">
  <use xlink:href="path/to/file/bp-ucons.svg#bp-ucon-receipt"></use>
</svg>
```

If you prefer to reference an external SVG \(containing `<defs>`\) instead of embedding it in HTML, you will need to use *svgxuse.js* in order to support IE 9+. In browsers that don't support referencing external SVGs \(such as IE 9\), this polyfill sends one HTTP request to fetch and cache all symbol definitions. See *demo-external-svg.html* for this approach. This demo references the *symbol-defs.svg* file and uses the aforementioned polyfill. Note that it must be hosted on a web server to work
properly. Learn more aobut this polyfill here: https://github.com/Keyamoon/svgxuse

Resources:
Look in the sprite-factory directory for `<def>`, `<stack>`, `<symbol>` and `<view>` files.

The template directory contains the actual icon format schema for graphic designers in case you would like to contribute or just need the reference. \(see "Build Your Own" below\)

## TODO

- Scripts to auto populate the Designer assets and Sketch Libraries
- Design Sprint to assign reserved icons and create documentation. 




# 3. Guidelines

## Naming
Name should lean towards the context they will be used in 
Dashes are used instead of underlines for spaces in words
Outline versions are always the name with -o
Names are all lowercase
All names should be unique

## Build Your Own
Utility Icons are created on a 24x24 grid with a 2 px padding so max size of actual icon is 20x20.

Favor angles that are 45 degrees`

And try to fit into 1 of 4 basic shapes. Square, Rectangle Horizontal, Rectangle Vertical and Circl. 

Default Stroke sizes in 2px. 
Default overlap visual is 2px, but 1px inner strokes are allowed in certain details. 

Corners are rounded at 2px. Inside corners are squared off. 

Terminal ends are squared off, not rounded


A Illustrator Template is provided for use when creating an Icon.  <br />
![Scheme](template/ucons_tpl_24x24_preview.jpg) 


# 4. Reserved Usage Icons


![Filter](PNG/filter.png) FILTERS
<br />
![Chevron](PNG/chevron-down.png) Expands a UI element, like a accordian. Arrow Points in direction the action will take. 
<br />

![Caret](PNG/caret-down.png) UI elements pop out of this 
<br />

