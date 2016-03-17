'use strict';

const Babelify          = require('babelify');
const Browserify        = require('browserify');
const Gulp              = require('gulp');
const GulpHeader        = require('gulp-header');
const GulpRename        = require('gulp-rename');
const GulpSize          = require('gulp-size');
const GulpUglify        = require('gulp-uglify');
const Path              = require('path');
const VinylBuffer       = require('vinyl-buffer');
const VinylSourceStream = require('vinyl-source-stream');

const Header  = require('./header.js');
const Package = require('../bower.json');

//------------------------------------------------------------------------------

module.exports = function($files)
{
    return $files.map(function($entry)
    {
        let $libname  = Package.name.split('.')[0].toLowerCase();
        let $basename = Path.basename($entry, Path.extname($entry));
        let $filename = $libname + '-' + $basename;
        let $pkgname  = $libname + '.' + $basename;

        let $header     = Header($pkgname);
        let $browserify = Browserify(
        {
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
