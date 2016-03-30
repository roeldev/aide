/**
 * aide | test/helpers/initTestPage.js
 */
'use strict';

// // // // // // // // // // // // // // // // // // // // // // // // // // //

/**
 * Initializes the test page by setting some default properties.
 */
var initTestPage = (function()
{
    var _initialized = false;

    return function initTestPage()
    {
        if (_initialized) return;
        _initialized = true;

        // console.log('screen: ' + window.screen.width + 'x' + window.screen.height);
        // console.log(document.body);
    };
})();
