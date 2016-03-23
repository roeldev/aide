/**
 * aide | test/helpers/init.js
 */
'use strict';

// // // // // // // // // // // // // // // // // // // // // // // // // // //

var init = (function()
{
    var _initialized = false;

    return function()
    {
        if (_initialized) return;
        _initialized = true;

        var $link  = document.createElement('link');
        $link.href = '/base/test/helpers/init.css';
        $link.type = 'text/css';
        $link.rel  = 'stylesheet';

        document.getElementsByTagName('head')[0].appendChild($link);
    };
})();
