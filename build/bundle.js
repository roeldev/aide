'use strict';

var Babelify          = require('babelify');
var Browserify        = require('browserify');
var Gulp              = require('gulp');
var GulpHeader        = require('gulp-header');
var GulpRename        = require('gulp-rename');
var GulpSize          = require('gulp-size');
var GulpUglify        = require('gulp-uglify');
var Path              = require('path');
var VinylBuffer       = require('vinyl-buffer');
var VinylSourceStream = require('vinyl-source-stream');

var Header  = require('./header.js');
var Package = require('../bower.json');

//------------------------------------------------------------------------------

module.exports = function($files)
{
    return $files.map(function($entry)
    {
        var $libname  = Package.name.split('.')[0].toLowerCase();
        var $basename = Path.basename($entry, Path.extname($entry));
        var $filename = $libname + '-' + $basename;
        var $pkgname  = $libname + '.' + $basename;

        var $header     = Header($pkgname);
        var $browserify = Browserify({
            'entries':    $entry,
            'standalone': $pkgname,
            'transform':  [Babelify]
        });

        return $browserify.bundle()
            .pipe( VinylSourceStream($filename +'.js') )
            .pipe( VinylBuffer() )
            .pipe( GulpHeader($header.template, $header.vars) )
            .pipe( GulpSize() )
            .pipe( Gulp.dest('./dist/') )
            // create an uglified version of the packed file
            .pipe( GulpUglify() )
            .pipe( GulpHeader($header.template, $header.vars) )
            .pipe( GulpRename($filename + '.min.js') )
            .pipe( GulpSize() )
            .pipe( Gulp.dest('./dist/') );
    });
};
