'use strict';

var Bundle      = require('./build/bundle.js');
var Del         = require('del');
var EventStream = require('event-stream');
var Glob        = require('glob');
var Gulp        = require('gulp');
var RunSequence = require('run-sequence');

//------------------------------------------------------------------------------

// test the bundled files
Gulp.task('test', function()
{
    console.log('test');
});

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

// complete build + test process
Gulp.task('build:test', function($callback)
{
    RunSequence('build', 'test', $callback);
});

Gulp.task('watch', function()
{
    Gulp.watch('src/**/*.js', ['build:test']);
    Gulp.watch('tests/**/*', ['test'])
});
