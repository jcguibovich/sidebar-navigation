# Core Gulp Tasks

**Note:** Requires `node >=4.0.0`

## Usage
TODO Apply proper url
```
npm install --save-dev FLK/core-gulp-tasks.git
```

```js
/* gulpfile.js */

var gulp = require('gulp');
var tasks = require('core-gulp-tasks');

/**
 * Register the tasks you need to use.
 */

tasks.css(gulp, {
  // Task options
});

tasks.js(gulp, {
  // Task options
});

gulp.task('default', ['css', 'js']);
```


Map multiple core tasks, they act as gulp modules, ex below  gulp.clean runs the core gulp task
```
// Register core tasks
['clean', 'copy', 'js', 'serve', 'watch'].forEach(name =>
  tasks[name](gulp, config[name])
);

```



```
gulp --tasks

Tasks for gulpfile.js
├── css
├── js
└── default
```
