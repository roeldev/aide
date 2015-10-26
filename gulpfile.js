'use strict';

var Babelify          = require('babelify');
var Browserify        = require('browserify');
var Gulp              = require('gulp');
var GulpHeader        = require('gulp-header');
var GulpRename        = require('gulp-rename');
var GulpSize          = require('gulp-size');
var GulpUglify        = require('gulp-uglify');
var VinylBuffer       = require('vinyl-buffer');
var VinylSourceStream = require('vinyl-source-stream');
var Path              = require('path');
var Package           = require('./bower.json');

//------------------------------------------------------------------------------

Gulp.task('build', function()
{
    var $filename = Path.basename(Package.main, '.js');

    var $headerTemplate = [
        '${pkg.name} v${pkg.version}',
        '${pkg.license} License',
        '(c) 2014-${year} ${authors}',
        '${pkg.homepage}'
    ].join(' | ');

    var $headerVars = {
        'pkg':     Package,
        'authors': Package.authors.join(', '),
        'year':    new Date().getFullYear()
    };

    var $browserify = Browserify({
        'entries':    './src/index.js',
        'standalone': Package.name,
        'transform':  [Babelify]
    });

    return $browserify.bundle()
        .pipe( VinylSourceStream($filename + '.js') )
        .pipe( VinylBuffer() )
        .pipe( GulpHeader('/*! '+ $headerTemplate +' */\n', $headerVars) )
        .pipe( GulpSize() )
        .pipe( Gulp.dest('./dist/') )
        // create an uglified version of the packed file
        .pipe( GulpUglify() )
        .pipe( GulpHeader('/*! '+ $headerTemplate +' */\n', $headerVars) )
        .pipe( GulpRename($filename + '.min.js') )
        .pipe( GulpSize() )
        .pipe( Gulp.dest('./dist/') );
});
