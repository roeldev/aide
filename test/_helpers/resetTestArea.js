/**
 * aide | test/helpers/resetTestPage.js
 */
'use strict';

// // // // // // // // // // // // // // // // // // // // // // // // // // //

/**
 * Resets the test page by removing the previously added test div and resetting
 * the body.
 *
 * @return {HtmlElement}
 */
var resetTestPage = (function()
{
    var _div;

    return function resetTestPage()
    {
        if (_div)
        {
            document.body.removeChild(_div);
        }

        // add the test div to the body
        _div = document.createElement('div');
        _div.id = 'test-area';

        document.body.appendChild(_div);

        // reset the body class
        document.body.className = '';

        // reset scroll position
        window.scrollTo(0, 0);

        return _div;
    };
})();
