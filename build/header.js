'use strict';

var Package = require('../bower.json');

//------------------------------------------------------------------------------

var _templateParts = [
    '${pkg.name} v${pkg.version}',
    '${pkg.license} License',
    '(c) 2014-${year} ${authors}',
    '${pkg.homepage}'
];

module.exports = function($pkgname)
{
    var $pkg = Package;
    $pkg.name = $pkgname;

    return {
        'template': '/*! '+ _templateParts.join(' | ') +' */\n',

        'vars': {
            'pkg':     $pkg,
            'authors': Package.authors.join(', '),
            'year':    new Date().getFullYear()
        }
    };
};
