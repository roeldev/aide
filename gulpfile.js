'use strict';

var Bundle      = require('./build/bundle');
var Del         = require('del');
var EventStream = require('event-stream');
var Glob        = require('glob');
var Gulp        = require('gulp');

//------------------------------------------------------------------------------

// bundle the main files
Gulp.task('build', function($callback)
{
    // remove all files from the dist folder
    Del('./dist/**/*');

    // bundle all main files and export them to the dist folder
    Glob('./src/[!_]*.js', function($error, $files)
    {
        if ($error) $callback($error);

        EventStream.merge( Bundle($files) )
            .on('end', $callback);
    });
})

Gulp.task('watch', function($callback)
{
    Gulp.watch('src/**/*.js', ['build']);
});
