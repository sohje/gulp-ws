# gulp-ws
[![npm version](https://badge.fury.io/js/gulp-ws.svg)](https://badge.fury.io/js/gulp-ws) [![Build Status](https://travis-ci.org/sohje/gulp-ws.svg?branch=master)](https://travis-ci.org/sohje/gulp-ws)

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
        .pipe(gulp.dest('src/'));
});
```

## License

MIT © [Nikolay Spiridonov](https://github.com/sohje)
