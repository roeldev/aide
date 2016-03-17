'use strict';

const Package = require('../bower.json');

//------------------------------------------------------------------------------

const templateParts =
[
    '${pkg.name} v${pkg.version}',
    '${lib}',
    '${pkg.license} License',
    '(c) 2014-${year} ${authors}',
    '${pkg.homepage}'
];

module.exports = function($pkgname)
{
    return {
        'template': '/*! '+ templateParts.join(' | ') +' */\n',

        'vars':
        {
            'pkg':     Package,
            'lib':     $pkgname,
            'authors': Package.authors.join(', '),
            'year':    new Date().getFullYear()
        }
    };
};
