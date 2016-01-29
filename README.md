# gulp-ws
Transfer files over websockets

## Install

```
$ npm install --save-dev gulp-ws
```


## Usage

```js
var gulp = require('gulp');
var gws = require('gulp-ws');

gulp.task('task', function () {
    return gulp.src('src/*')
        .pipe(gws({host: 'ws://localhost/'}))
        .pipe(gutil.noop());
});
```