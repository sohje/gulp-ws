'use strict';
var WebSocket = require('ws');
var assign = require('object-assign');
var through = require('through2');
var gutil = require('gulp-util');

module.exports = function(options) {
    options = assign({}, options);
    if (options.host === undefined) {
        throw new gutil.PluginError('gulp-ws', '`host` required');
    }

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new gutil.PluginError('gulp-ws', 'Streaming not supported'));
            return;
        }

        var ws = new WebSocket(options.host);
        if (!ws.supports.binary) {
            cb(new gutil.PluginError('gulp-ws', 'Binary transfer not supported'));
            return;
        }

        ws.on('open', function open() {
            ws.send(file.contents, {binary: true, mask: true}, function ack(error) {
                if (!error) {
                    if (options.verbose) {
                        gutil.log('File transfer successful')
                    }
                    ws.close();
                    cb(null, file);
                } else {
                    cb(new gutil.PluginError('gulp-ws', 'Error sending file ' + file.path));
                    return;
                }
            });
        })
        ws.on('error', function error(error) {
            cb(new gutil.PluginError('gulp-ws', error, {fileName: file.path}));
            return;
        })
    }, function(cb) {
        cb();
    });
}
